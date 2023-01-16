import React, { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Button,
  createTheme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_Decode from "jwt-decode";
import memoriesImg from "../Images/memories-Logo.png";
import memoriesText from "../Images/memories-Text.png";
import { deepPurple } from "@mui/material/colors";

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      const decode = jwt_Decode(user.token);

      if (decode.exp * 1000 < new Date().getTime()) handleLogout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const theme = createTheme();

  // const mobileDevice=useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        position: "static",
        borderRadius: 5,
        margin: "30px 0",
        display: "inline-flex",
        flexDirection: "row",
        [theme.breakpoints.down("sm")]: { flexDirection: "column" },
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 50px",
      }}
    >
      <Link to={"/"} sx={{ display: "flex", alignItems: "center" }}>
        <img src={memoriesText} alt="textImg" height={"45px"} />
        <img
          style={{ marginLeft: "15px", marginTop: "5px" }}
          src={memoriesImg}
          alt="pictureImg"
          height={"40px"}
        />
      </Link>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "400px",
          [theme.breakpoints.down("md")]: { width: "auto" },
        }}
      >
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              width: "400px",
              [theme.breakpoints.down("md")]: {
                width: "auto",
                marginTop: "20px",
                justifyContent: "center",
              },
            }}
          >
            <Avatar
              sx={{
                color: theme.palette.getContrastText(deepPurple[500]),
                backgroundColor: deepPurple[500],
              }}
              src={user.result.picture}
              alt={user.result.name}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography variant="h6">{user.result.name}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate("/auth")}
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
