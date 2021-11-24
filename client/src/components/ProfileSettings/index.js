import React, { useState, useRef } from 'react';
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
import { uploadFile } from 'react-s3';

const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME
const REGION = process.env.REACT_APP_REGION
const ACCESS_KEY = process.env.REACT_APP_ACCESS_ID
const SECRET_ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

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
  const [selectedFile, setSelectedFile] = useState(null);

  const [updateUser] = useMutation(UPDATE_USER);
  
  const inputEl = React.useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileSettings({
      ...profileSettings,
      [name]: value,
    });
  };

  const handleUpload = async (file) => {
    uploadFile(file, config)
        .then(data => {
          setProfileSettings({
            ...profileSettings, 
            profilePic: data.location
          })})
          .then(data => {
            updateUser({
              variables: { ...profileSettings },
            });
          })
        .catch(err => console.error(err))
  }

  const handleEdit = () => {
    setIsEditable(!isEditable);
    if (buttonText === "Edit") {
      setButtonText("Save")
    } else {
      setButtonText("Edit")
      try {
        handleUpload(selectedFile)
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const onImageClick = async () => {
    await inputEl.current.click();
  };

  return (
    <Card className={classes.root}>
      <input
        accept="image/*"
        id="profile-pic-file"
        type="file"
        style={{ display: 'none' }}
        ref={inputEl}
        onChange={handleFileInput}
      />
      <label htmlFor="profile-pic-file">
        <CardActionArea
          disabled={!isEditable}
          onClick={() => onImageClick()}
        >   
          <CardMedia
            component="img"
            className={classes.media}
            image={profileSettings.profilePic}
            title={`${profileSettings.username}'s Profile Pic`}
          />
        </CardActionArea>
      </label>
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
    </Card>
  );
}