import React,{useRef,useState} from 'react'
import {Typography,TextField, Button} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import useStyles from './style'
import {commentPost} from '../../actions/posts'

const CommentSection = ({post}) => {
    const classes=useStyles()
    const dispatch=useDispatch()
    const [comments,setComments]=useState(post.comments)
    const [comment,setComment]=useState("")
    const user=JSON.parse(localStorage.getItem('profile'))
    const commentRef=useRef()

    const handleClick=async()=>{
        const finalComment=`${user.result.name} : ${comment}`
        const newComments=await dispatch(commentPost(finalComment,post._id))
 
        setComments(newComments)
        setComment("")
        commentRef.current.scrollIntoView({behavior:"smooth"})
    }

  return (
    <div>
        <div className={classes.commentOuterContainer}>
            <div className={classes.commentInnerContainer}>
                <Typography gutterBottom variant='h6'>Comments</Typography>
                {!comments?(<Typography>No Comment</Typography>): comments.map((comment,index)=>(
                    <Typography key={index} gutterBottom variant='subtitle1'>
                        <strong>{comment.split(' :')[0]} :</strong>{comment.split(' :')[1]}
                    </Typography>
                ))}
                <div ref={commentRef}></div>
            </div>
            {user?(
                     <div style={{width:'70%',}}>
                     <Typography gutterBottom variant='h6'>
                         write a Comment
                     </Typography>
 
                     <TextField 
                     fullWidth
                     minRows={4}
                     variant='outlined'
                     label='Comment'
                     multiline
                     value={comment}
                     onChange={(e)=>setComment(e.target.value)}
                     />
                 <Button style={{margintop:'10px'}} color='primary' fullWidth variant='contained' disabled={!comment} onClick={handleClick}>
                     Comment
                 </Button>
             </div>
            ):<Typography variant='h5' style={{textAlign:'center'}}>Please sign in to add a Comment</Typography>}
           
        </div>
    </div>
  )
}

export default CommentSection











