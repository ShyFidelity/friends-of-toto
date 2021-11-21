import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 345,
  },
});

// const profileSettings = {
//   username: "Maverick",
//   bio: "You are all living in my world. I'm chill, but do what I want"
// }

export default function ProfileSettings() {
  const classes = useStyles();

  const [isEditable, setIsEditable] = useState(false);
  const [buttonText, setButtonText] = useState("Edit");
  const [username, setUsername] = useState("Maverick");
  const [bio, setBio] = useState("You are all living in my world. I'm chill, but do what I want");

  const handleEdit = () => {
    setIsEditable(!isEditable);
    if (buttonText === "Edit") {
      setButtonText("Save")
    } else {setButtonText("Edit")}
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardContent>
        <TextField
          required
          id="filled-required"
          label="Username"
          value={username}
          variant="filled"
          disabled={!isEditable}
          onChange={(e) => {setUsername(e.target.value)}}
        />
        <TextField
          required
          id="filled-required"
          label="Bio"
          multiline
          rows={5}
          value={bio}
          variant="filled"
          disabled={!isEditable}
          onChange={(e) => setBio(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleEdit}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}