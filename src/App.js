import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/navbar";
import Home from "./Pages/Homepage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./Pages/PostDetails/";
import Auth from "./Pages/Authpage";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <GoogleOAuthProvider
      clientId={
        "33106839821-u0vh9q12dejrnmnn1epfobmlfmbv4584.apps.googleusercontent.com"
      }
    >
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Navigate to={"/posts"} />} />
            <Route path="/posts" exact element={<Home />} />
            <Route path="/post/:id" exact element={<PostDetails />} />
            <Route path="/posts/search" exact element={<Home />} />
            <Route path="/posts/:userid" exact element={<Home />} />
            <Route
              path="/auth"
              exact
              element={!user ? <Auth /> : <Navigate to={"/posts"} />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
