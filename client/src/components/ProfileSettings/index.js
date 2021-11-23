import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

import { UPDATE_USER } from '../../utils/mutations';
import Upload from '../Upload/index';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 345,
  },
});

export default function ProfileSettings({ _id, profilePic, username, bio }) {
  const classes = useStyles();

  const [isEditable, setIsEditable] = useState(false);
  const [buttonText, setButtonText] = useState("Edit");
  const [profileSettings, setProfileSettings] = useState({
    _id: _id,
    profilePic: profilePic,
    username: username,
    bio: bio
  });

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileSettings({
      ...profileSettings,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
    if (buttonText === "Edit") {
      setButtonText("Save")
    } else {
      setButtonText("Edit")
      try {
        const { data } = updateUser({
          variables: { ...profileSettings },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={profileSettings.profilePic}
          title={`${username} Profile Pic`}
        />
      </CardActionArea>
      <CardContent>
        <TextField
          required
          id="filled-required"
          label="Username"
          value={profileSettings.username}
          name='username'
          variant="filled"
          disabled={!isEditable}
          onChange={handleChange}
        />
        <TextField
          required
          id="filled"
          label="Bio"
          multiline
          rows={5}
          value={profileSettings.bio}
          name='bio'
          variant="filled"
          disabled={!isEditable}
          onChange={handleChange}
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleEdit}>
          {buttonText}
        </Button>
      </CardActions>
      <Upload />
    </Card>
  );
}