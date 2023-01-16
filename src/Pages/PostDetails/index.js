import React,{useEffect} from "react"; 
import { useSelector,useDispatch } from "react-redux";
import { Typography,Paper,CircularProgress,Divider } from "@material-ui/core";
import { useParams,useNavigate } from "react-router-dom";
import useStyles from './style'
import moment from 'moment'
import { getPost,getPostbySearch } from "../../actions/posts";
import Comment from './commentSection'


const PostDetails = () => {
  const {post,posts,isLoading}=useSelector((state)=>state.Posts)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const classes=useStyles()
  const {id}=useParams()

  // const post=useSelector((state)=>id?state.Posts.find((post)=>post._id===id):null)

  useEffect(() => {
    dispatch(getPost(id))
  }, [id]);


  useEffect(()=>{
    if(post){
      dispatch(getPostbySearch({search:'none',tags:post.tags.join(',')}))
    }
 
  },[post])



if(!post)return null

if(isLoading){
  return(
  <Paper className={classes.loadingPaper} elevation={6}>
    <CircularProgress size={'5rem'} style={{fontWeight:500}}/>
  </Paper>
  )
}

const openPost=(_id)=>{
  navigate(`/posts/${_id}`)
}

const recommendedPosts=posts.filter(({_id})=>_id!==post._id)


  return(
    <Paper style={{borderRadius:'15px', padding:'20px'}} elevation={6}>
    <div className={classes.card}>
      <div className={classes.section}>
        <Typography variant='h3' component={'h2'}>{post.title}</Typography>
        <Typography color="textSecondary" variant='h6' component={'h2'} gutterBottom>{post.tags.map((tag)=>`#${tag}`)}</Typography>
        <Typography gutterBottom variant='body1' component={'p'}>{post.message}</Typography>
        <Typography variant='h6'>Created By: {post.name}</Typography>
        <Typography variant='body1'>{moment(post.createdAt).fromNow}</Typography>
        <Divider style={{margin:'20px 0'}}/>
        <Typography variant="body1"><strong>Realtime chat -comming soon...</strong></Typography>
        <Divider style={{margin:'20px 0'}}/> 
        <Comment post={post}/>
        <Divider style={{margin:'20px 0'}}/> 
      </div>
      <div className={classes.imageSection}>
      <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}/>
      </div>
    </div>

    {(recommendedPosts?.length) && (
      <div className={classes.section}>
        <Typography variant="h6" gutterBottom>You might also like this</Typography>
        <div className={classes.recommendedPosts}>
          {recommendedPosts.map(({title,message,name,likes,selectedFile,_id})=>(
            <div style={{margin:'20px',cursor:'pointer'}} onClick={()=>openPost(_id)} key={_id}>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="subtitle2">{name}</Typography>
              <Typography variant="subtitle2">{message}</Typography>
              <Typography variant="subtitle1">Likes: {likes.length}</Typography>
            <img src={selectedFile} width={'200px'}/>
            </div>
          ))}
        </div>
      </div>
    ) }
    </Paper>

  )
};

export default PostDetails;
