import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useProfileContext } from '../../utils/GlobalState';
import { UPDATE_PERSONAL_POSTS } from '../../utils/actions';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import '../PersonalPost/PersonalPost.css';
import { QUERY_POST } from '../../utils/queries';
import { REMOVE_POST, ADD_COMMENT } from '../../utils/mutations';
import Comment from '../Comment/index';

// import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PersonalPost(props) {
  const [state, dispatch] = useProfileContext();
  const [expanded, setExpanded] = React.useState(false);
  const { posts } = state;
  const hasDeletedPost = useRef(false);
  const [updatedPosts, setUpdatedPosts] = useState([...posts]);
  const [commentExpanded, setCommentExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentState, setCommentState] = useState(false);

  const [removePost] = useMutation(REMOVE_POST);
  const [addComment] = useMutation(ADD_COMMENT);

  const { data: post, refetch } = useQuery(QUERY_POST, {
    variables: { _id: props.postId }
  })

  const comments = post?.post.comments || [];

  useEffect(() => {
    if (commentState) {
      refetch()
    }
  }, [commentState, refetch])

  useEffect(() => {
    if (hasDeletedPost.current) {
      dispatch({
          type: UPDATE_PERSONAL_POSTS,
          posts: updatedPosts
      })
    }
  }, [updatedPosts, dispatch])

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (commentExpanded) {
      setCommentExpanded(!commentExpanded)
    }
  };

  const handleExpandCommentClick = () => {
    setCommentExpanded(!commentExpanded);
  };

  const handleChange = (e) => {
    setNewComment(e.target.value)
  } 

  const handleNewComment = () => {
    addComment({
      variables: { _id: props.postId, commentText: newComment}
    })
    setCommentState(true)
    setNewComment("")
  }

  const handleDelete = async () => {
    try {
      await removePost({
        variables: { _id: props.postId },
      });
      hasDeletedPost.current = true;
      setUpdatedPosts(posts.filter((post)=> post._id !== props.postId ))
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        src={props.postImage}
        alt="your pet"
      />
      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteForeverIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.postText}</Typography>
          <ExpandMore
            expand={commentExpanded}
            onClick={handleExpandCommentClick}
            aria-expanded={commentExpanded}
            aria-label="show comments"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardContent>
      </Collapse>
      <Collapse in={commentExpanded} timeout="auto" unmountOnExit>
          <CardContent>
          <TextField
            id="filled"
            label='comment'
            multiline
            rows={3}
            value={newComment}
            name='comment'
            variant='filled'
            onChange={handleChange}
          />
          <IconButton aria-label="follow" onClick={handleNewComment}>
            <AddIcon />
          </IconButton>
          {comments ? (
            comments.map((comment) => (
              <Comment 
                key={comment._id}
                commentText={comment.commentText}
                commentAuthor={comment.commentAuthor}
              />
              // <div
              //   key={comment._id}
              // >
              // <Typography>{comment.commentAuthor}</Typography>
              // <Typography paragraph>{comment.commentText}</Typography>
              // </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
          </CardContent>
        </Collapse>
    </Card>
  );
}
