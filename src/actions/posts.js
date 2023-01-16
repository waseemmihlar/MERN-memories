import * as api from "../Api";
import {COMMENT,CREATE,UPDATE,DELETE,LIKE,FETCH_ALL,FETCH_POST,FETCH_ALL_BY_SEARCH, LOADING_START, LOADING_STOP, USERPOST} from "../Constants";

export const getposts = (page) => async (dispatch) => {
  try {
    dispatch({type:LOADING_START})
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type:LOADING_STOP})
  } catch (error) {
    console.log({ message: error });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({type:LOADING_START})
    const { data } = await api.fetchPost(id);
    console.log(data);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({type:LOADING_STOP})
  } catch (error) {
    console.log({ message: error });
  }
};

export const getPostbySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({type:LOADING_START})
    const {data: { data }} = await api.fetchPostbySearch(searchQuery);

    dispatch({ type: FETCH_ALL_BY_SEARCH, payload: data });
    dispatch({type:LOADING_STOP})
  } catch (error) {
    console.log(error);
  }
};

export const createpost = (post,navigate) => async (dispatch) => {
  try {
    dispatch({type:LOADING_START})
    const { data } = await api.createPost(post);
    navigate(`/posts/${data._id}`)
    dispatch({ type: CREATE, payload: data });
    dispatch({type:LOADING_STOP})
  } catch (error) {
    console.log(error.message);
  }
};

export const updatepost = (id, post) => async (dispatch) => {
  try {
    dispatch({type:LOADING_START})
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
    dispatch({type:LOADING_STOP})
  } catch (error) {
    console.log(error);
  }
};

export const deletepost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });

  } catch (error) {
    console.log(error);
  }
};

export const likepost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost=(comment,id)=>async(dispatch)=>{

  try {
    const {data}=await api.CommentPost(comment,id)
    dispatch({type:COMMENT,payload:data})

    return data.comments;
    
  } catch (error) {
    console.log(error)
  }

}

export const userPosts=(id)=>async(dispatch)=>{

  try {
    dispatch({type:LOADING_START})
    const {data}=await api.UserPosts(id)
    dispatch({type:USERPOST,payload:data})
    dispatch({type:LOADING_STOP})

  } catch (error) {
    
    console.log(error)
  }
    
}



