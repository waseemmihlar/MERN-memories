import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";

import {
  Button,
  TextField,
  Typography,
  Paper,
  createTheme,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createpost, updatepost, userPosts } from "../../../actions/posts";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useStyles from "./style";

function Form({ currentid, setcurrentid }) {
  const theme = createTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const classes = useStyles();

  const post = useSelector((state) =>
    currentid ? state.Posts.posts.find((p) => p._id === currentid) : null
  );

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

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
      <Paper sx={{ padding: theme.spacing(1) }} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In for create your own memory and Like other's memory
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper
        sx={{
          padding: theme.spacing(1),
          "& .MuiTextField-root": {
            margin: theme.spacing(1),
          },
        }}
        elevation={6}
      >
        <form
          onSubmit={handlesubmit}
          noValidate
          autoComplete="off"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            {currentid ? "Editing" : "Creating"} a Memory
          </Typography>

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
          <Box sx={{ width: "100%", margin: "10px 0" }}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </Box>
          <button type="submit" className={classes.btn}>
            Submit
          </button>
          <button
            className={classes.btn}
            style={{ marginTop: "10px", backgroundColor: "#0395a8" }}
            onClick={clear}
          >
            Clear
          </button>
        </form>
      </Paper>

      <Paper style={{ marginTop: "20px", padding: "10px" }} elevation={6}>
        <Typography variant="h6" color="primary">
          <strong>{user?.result?.name}</strong>
        </Typography>
        <Typography>
          You can see your aploaded Post and Modify it as your wish
        </Typography>
        <button className={classes.btn} onClick={handleUserPost}>
          View Your Post
        </button>
      </Paper>
    </>
  );
}

export default Form;
