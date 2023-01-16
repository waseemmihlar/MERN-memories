import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({ baseURL: "https://muba-server-mernmemories.onrender.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostbySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (post) => API.post("/posts", post);
export const updatePost = (id, updatepost) =>
  API.patch(`/posts/${id}`, updatepost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);
export const CommentPost = (comment, id) =>
  API.post(`/posts/${id}/commentpost`, { comment });
export const UserPosts = (id) => API.get(`/posts/${id}/userposts`);

export const signIn = (formdata) => API.post("/user/signin", formdata);
export const signUp = (formdata) => API.post("/user/signup", formdata);
