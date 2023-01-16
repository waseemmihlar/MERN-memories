import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import makeStyles from "./style";
import { useDispatch } from "react-redux";
import { createpost, updatepost, userPosts } from "../../../actions/posts";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Form({ currentid, setcurrentid }) {
  const location = useLocation();
  const navigate = useNavigate();

  const post = useSelector((state) =>
    currentid ? state.Posts.posts.find((p) => p._id === currentid) : null
  );

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const classes = makeStyles();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const userId = user?.result?._id || user?.result?.sub;

  const handlesubmit = (e) => {
    e.preventDefault();

    if (currentid === 0) {
      dispatch(createpost({ ...postData, name: user.result.name }, navigate));
      clear();
    } else {
      dispatch(updatepost(currentid, { ...postData, name: user.result.name }));
      clear();
    }
  };

  const clear = () => {
    setcurrentid(0);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };

  const handleUserPost = () => {
    dispatch(userPosts(userId));
    navigate(`/posts/${userId}`);
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In for create your own memory and Like other's memory
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6">
          {currentid ? "Editing" : "Creating"} a Memory
        </Typography>
        <form autoComplete="off" className={`${classes.root} ${classes.form}`}>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            minRows={4}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            variant="contained"
            className={`${classes.buttonSubmit}`}
            color="primary"
            fullWidth
            onClick={handlesubmit}
            size="large"
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>

      <Paper style={{ marginTop: "20px", padding: "10px" }} elevation={6}>
        <Typography variant="h6" color="primary">
          <strong>{user?.result?.name}</strong>
        </Typography>
        <Typography>
          {" "}
          You can see your aploaded Post and Modify it as your wish
        </Typography>
        <Button
          onClick={handleUserPost}
          variant="contained"
          color="primary"
          fullWidth
        >
          View Your Post
        </Button>
      </Paper>
    </>
  );
}

export default Form;
