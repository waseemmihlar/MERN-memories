import React, { useState } from "react";
import useStyles from "./style";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Button,
} from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import Input from "./input";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Normal singn in and Sign up
  //--------------------------------Start--------------------------------------------------------

  const [formData, setFormdata] = useState(initialState);

  const [isSignup, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlechange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const switchmode = () => {
    setIsSignUp((presign) => !presign);
    setShowPassword(false);
  };

  const handleshowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  //--------------------------------End Normal isgnin & signout---------------------------------------------------

  // Google Sign IN

  const googleSuccess = async (res) => {
    // const token = res.credential;
    // console.log(token);
    const result = await jwt_decode(res.credential);
    const token = res.credential;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = (err) => {
    console.log("Google Sign in was unsuccessfull.. try again later");
  };

  //-----------------------------------------End google sign in-------------------------------------------------

  const classes = useStyles();
  return (
    <Container maxWidth="xs" component={"main"}>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOpen />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign IN"}</Typography>
        <form className={`${classes.form}`} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handlechange={handlechange}
                  autofocus
                  half
                />
                <Input
                  name="lastName"
                  label="First Name"
                  handlechange={handlechange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handlechange={handlechange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handlechange={handlechange}
              type={showPassword ? "text" : "password"}
              handleshowPassword={handleshowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handlechange={handlechange}
                type="password"
              />
            )}
          </Grid>
          <Button
            sx={{ margin: "15px 0" }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleError}
            type="standard"
            theme="filled_blue"
            width="363px"
            text="continue_with"
            context="signin"
          />

          <Grid container justifyContent="flex-end" margin={"15px 0 0 0"}>
            <Grid item>
              <Button onClick={switchmode}>
                {isSignup
                  ? "Already have an account ? Sign In"
                  : "Don't have an account ? Sign Up "}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
