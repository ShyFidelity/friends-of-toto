import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useProfileContext } from '../../utils/GlobalState';
import { UPDATE_FRIEND_POSTS, UPDATE_DISCOVER_POSTS } from '../../utils/actions';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { TextField } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QUERY_USER, QUERY_POST } from '../../utils/queries';
import { ADD_FRIEND, REMOVE_FRIEND, ADD_COMMENT } from '../../utils/mutations';
import Comment from '../Comment/index';

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

export default function Post(props) {
  const [, dispatch] = useProfileContext();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [commentExpanded, setCommentExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentState, setCommentState] = useState(false);
 
  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const [addComment] = useMutation(ADD_COMMENT);

  const { loading, data: user } = useQuery(QUERY_USER, {
    variables: { username: props.postAuthor },
  });

  const { data: post, refetch } = useQuery(QUERY_POST, {
    variables: { _id: props.postId }
  })

  const comments = post?.post.comments || [];

  useEffect(() => {
    if (commentState) {
      refetch()
    }
  }, [commentState, refetch])

  if (loading) {
    return <div>Loading...</div>;
  }

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

  const handleFriendship = () => {
    if (
      location.pathname === '/Discover' ||
      location.pathname === '/discover'
    ) {
      addFriend({
        variables: { username: props.postAuthor },
      });
      const newDiscoverPosts = props.discoverPosts.filter(
        (post) => post.postAuthor !== props.postAuthor
      );
      dispatch({
        type: UPDATE_DISCOVER_POSTS,
        discoverPosts: newDiscoverPosts,
      });
    } else {
      removeFriend({
        variables: { username: props.postAuthor },
      });
      const newFriendPosts = props.friendPosts.filter(
        (post) => post.postAuthor !== props.postAuthor
      );
      dispatch({
        type: UPDATE_FRIEND_POSTS,
        friendPosts: newFriendPosts,
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: 'black' }}
            aria-label="recipe"
            src={user.user.profilePic}
          />
        }
        title={<Typography>{props.postAuthor}</Typography>}
      ></CardHeader>
      <CardMedia
        component="img"
        height="194"
        src={props.postImage}
        alt="Paella dish"
      />
      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <IconButton aria-label="follow" onClick={handleFriendship}>
          {location.pathname === '/Discover' ? <AddIcon /> : <RemoveIcon />}
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
      </Collapse>
    </Card>
  );
}
