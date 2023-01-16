import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
  ButtonBase,
  Box,
  IconButton,
} from "@mui/material";
import {
  ThumbUpAlt,
  ThumbUpAltOutlined,
  Delete,
  MoreHoriz,
} from "@mui/icons-material";

import moment from "moment";
import { useDispatch } from "react-redux";
import { deletepost, likepost } from "../../../../actions/posts";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Post({ post, setcurrentid }) {
  // const default_image='https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [likes, setLikes] = useState(post.likes);

  const user = JSON.parse(localStorage.getItem("profile"));

  const userId = user?.result?._id || user?.result.sub;
  const likedUser = likes.find((id) => id === userId);

  const handleLike = () => {
    dispatch(likepost(post._id));
    if (likedUser) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };
  const viewDetails = () => {
    return navigate(`/post/${post._id}`); //send post id to page postDetail Page
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `you and ${likes.length - 1} others`
            : `${likes.length} Like${likes.length > 1 ? "s" : ""}`}{" "}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length > 1 ? "Likes" : "Like"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        justifyContent: "space-between",
        height: "100%",
        position: "relative",
      }}
    >
      <ButtonBase
        onClick={viewDetails}
        sx={{ display: "block", textAlign: "initial" }}
      >
        <CardMedia
          image={post.selectedFile}
          title={post.title}
          sx={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backgroundBlendMode: "darken",
            height: "150px",
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            padding: "15px",
            height: "100%",
            top: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              color={"white"}
              sx={{ fontWeight: "" }}
              fontWeight="bold"
            >
              {post.name.split(" ")[0].length > 10
                ? `${post.name.split(" ")[0]} ...`
                : `${post.name.split(" ")[0]} ${post.name
                    .split(" ")[1]
                    .slice(0, 3)}...`}
            </Typography>

            {(user?.result?._id === post.creator ||
              user?.result?.sub === post.creator) && (
              <IconButton
                sx={{ color: "white" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setcurrentid(post._id);
                }}
              >
                <MoreHoriz color="red" />
              </IconButton>
            )}
          </Box>

          <Box>
            <Typography sx={{ color: "white" }}>
              {moment(post.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>

        <Box margin={"10px"}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            padding={"0 16px"}
          >
            {post.title}
          </Typography>
        </Box>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.substring(0, 50)}&nbsp;
            <Link style={{ textDecoration: "none" }} to={`/post/${post._id}`}>
              <Typography color="secondary">
                <strong>See more . . .</strong>
              </Typography>
            </Link>
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Button
          size="small"
          color="primary"
          disabled={!user}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?._id === post.creator ||
          user?.result?.sub === post.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletepost(post._id))}
          >
            <Delete fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
export default Post;
