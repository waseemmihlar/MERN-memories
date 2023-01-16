import React, { useState } from "react";
import {
  Grid,
  Grow,
  Container,
  Paper,
  TextField,
  AppBar,
  Button,
} from "@mui/material";
import Posts from "./Posts";
import Form from "./Form";
import { useDispatch } from "react-redux";
import useStyles from "./style";
import Pagination from "./pagination";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { getPostbySearch } from "../../actions/posts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const classes = useStyles();
  const [currentid, setcurrentid] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userid } = useParams();
  const query = useQuery();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagDelete) => {
    setTags(tags.filter((tag) => tag !== tagDelete));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostbySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeypressed = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Grow in>
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent={"space-between"}
          spacing={3}
          className={classes.mainContainer}
        >
          <Grid item xs={12} sm={7} md={9}>
            <Posts setcurrentid={setcurrentid} />
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <AppBar
              className={classes.appBarSearch}
              color="inherit"
              position="static"
            >
              <TextField
                name="search"
                fullWidth
                onKeyPress={handleKeypressed}
                variant="outlined"
                label="search memories"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                variant="outlined"
                style={{ margin: "16px 0" }}
                onDelete={handleDelete}
                onAdd={handleAdd}
                value={tags}
                label="Search tags"
              />
              <button
                style={{
                  padding: "10px",
                  width: "100%",
                  color: "white",
                  backgroundColor: "#0359a8",
                  borderRadius: "6px",
                  border: "none",
                }}
                onClick={searchPost}
              >
                Search
              </button>
            </AppBar>

            <Form setcurrentid={setcurrentid} currentid={currentid} />
            {!searchQuery && !tags.length && !userid && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
