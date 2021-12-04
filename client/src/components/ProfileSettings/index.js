import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useProfileContext } from '../../utils/GlobalState';
import {
  UPDATE_PROFILE_PIC,
  UPDATE_PROFILE_BIO
} from '../../utils/actions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import '../ProfileSettings/ProfileSettings.css'

import { UPDATE_USER } from '../../utils/mutations';
import { uploadFile } from 'react-s3';
import changePic from '../../images/puppyPic.svg';

const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME, 
    region: process.env.REACT_APP_REGION,
    accessKeyId:process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    position: 'relative'
  },
  overlay: {
    height: '100%',
    width: '100%',
    opacity: '0',
    '&:hover' : {
      opacity: '1'
    }
  },
  media: {
    height: 345,
    maxWidth: 345
  },
});

export default function ProfileSettings() {
  const [state, dispatch] = useProfileContext();
  const classes = useStyles();

  const [isEditable, setIsEditable] = useState(false);
  const [buttonText, setButtonText] = useState("Edit");
  const { _id, username, profilePic, bio } = state;

   const [selectedFile, setSelectedFile] = useState(null);

  const [updateUser] = useMutation(UPDATE_USER);

  const inputEl = React.useRef(null);

  useEffect(() => {
    const handleUpload = async (file) => {
      await uploadFile(file, config)
      dispatch({
        type: UPDATE_PROFILE_PIC,
        profilePic: process.env.REACT_APP_URL + file.name
      });
    }
    if (selectedFile) {
      handleUpload(selectedFile)
      updateUser({
        variables: {
          _id: _id,
          username: username,
          bio: bio,
          profilePic: profilePic
        }
      })
    }
  }, [selectedFile])
  
  const handleChange = (event) => {
    const { value } = event.target;
    dispatch({
      type: UPDATE_PROFILE_BIO,
      bio: value
    });
  };

  const handleSave = () => {
    setIsEditable(!isEditable);
    if (buttonText === "Edit") {
      setButtonText("Save")
    } else {
      updateUser({
        variables: {
          _id: _id,
          username: username,
          bio: bio,
          profilePic: profilePic
        }
      })
      setButtonText("Edit")
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
          sx={{ ':hover': {
                '& .overlay': {
                  opacity: '1'
                }
              }
          }}
          onClick={() => onImageClick()}
        >   
          <CardMedia
            component="img"
            className={classes.media}
            image={profilePic}
            title={`${username}'s Profile Pic`}
          />
          <div 
            style={{ position: 'absolute', top: '20px', color: 'black', backgroundColor: 'transparent' }}
            className={classes.overlay}
          ><img alt='' width="80px" src={`${changePic}`}></img></div>
        </CardActionArea>
      </label>
      <CardContent>
        <TextField
          id="filled-required"
          label="Username"
          value={username}
          name='username'
          variant="filled"
          disabled
          onChange={handleChange}
        />
        <TextField
          required
          id="filled"
          label="Bio"
          multiline
          rows={5}
          value={bio}
          name='bio'
          variant="filled"
          disabled={!isEditable}
          onChange={handleChange}
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleSave}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}