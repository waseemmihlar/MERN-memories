import { CREATE,UPDATE,DELETE,LIKE,FETCH_ALL,FETCH_ALL_BY_SEARCH, LOADING_START,USERPOST, LOADING_STOP, FETCH_POST, COMMENT} from '../Constants'; 


// eslint-disable-next-line import/no-anonymous-default-export
export default (state ={isLoading:false,posts:[]}, action) => {
    switch (action.type) {
        case LOADING_START:
            return{
                ...state,
                isLoading:true
            }
        case LOADING_STOP:
            return{
                ...state,
                isLoading:false
            }
        case COMMENT:
            return{
                ...state,
                posts:state.posts.map((post)=>{
                    if(post._id===action.payload._id)return action.payload
                    
                    return post
                })
            }  
        case USERPOST:
            return{
                ...state,
                posts:action.payload
            }
        case FETCH_POST:
            return{
                ...state,
                post:action.payload
            }
        case FETCH_ALL:
            return {
                ...state,
                posts:action.payload.data,
                currentPage:action.payload.currentPage,
                noOfPages:action.payload.numberOfPages,
            }
        case FETCH_ALL_BY_SEARCH:
            return {
                ...state,
                posts:action.payload}
        case CREATE:
            return {...state,posts:[...state.posts,action.payload]}

        case UPDATE:
            return {...state,posts:state.posts.map(post => post._id === action.payload._id? action.payload:post)}
        case LIKE:    
            return {...state,posts:state.posts.map(post=>post._id===action.payload._id?action.payload:post)}
        case DELETE:
            return {...state,posts:state.filter(post=>!(post._id===action.payload))}
        default:
            return state;
    }
};


