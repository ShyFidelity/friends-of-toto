import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
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
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { QUERY_USER } from '../../utils/queries';
import { ADD_FRIEND, REMOVE_FRIEND } from '../../utils/mutations';

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
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(false);

  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: props.postAuthor },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFriendship = () => {
    location.pathname === '/Discover'
      ? addFriend({
          variables: { username: props.postAuthor },
        })
      : removeFriend({
          variables: { username: props.postAuthor },
        });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={data.user.profilePic}
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
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="follow" onClick={handleFriendship}>
          <AddIcon />
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
        </CardContent>
      </Collapse>
    </Card>
  );
}
