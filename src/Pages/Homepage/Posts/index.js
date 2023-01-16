import React, { useEffect } from "react";
import Post from "./Post";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./style";
import { useParams } from "react-router-dom";

function Posts({ setcurrentid }) {
  const { posts, isLoading } = useSelector((state) => state.Posts);
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("profile"));

  const { userid } = useParams();

  // useEffect(() =>{
  //     setUser(JSON.parse(localStorage.getItem('profile')))
  // },[id])

  const userId = user?.result?._id || user?.result?.sub;

  // posts.map(post=>{console.log(post.tags)})
  // console.log(posts)

  return isLoading ? (
    <CircularProgress />
  ) : userid && userId ? (
    <>
      <div>
        <Typography
          variant="h5"
          color="primary"
          style={{ textAlign: "center", margin: "20px", fontWeight: 700 }}
        >
          All of your Posts Listed
        </Typography>
      </div>
      {posts?.length === 0 ? (
        <Typography style={{ textAlign: "center", margin: "20px" }}>
          You have No Post. Create Your Own Post
        </Typography>
      ) : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} md={4}>
              <Post post={post} setcurrentid={setcurrentid} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setcurrentid={setcurrentid} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
