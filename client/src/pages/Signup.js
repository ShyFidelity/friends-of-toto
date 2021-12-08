import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import puppyPaw from '../images/pawlike.svg';
import totoBlackAndBlue from '../images/totoblackandblue.png';
import Auth from '../utils/auth';
import '../styles/Form.css';

import { uploadFile } from 'react-s3';
import changePic from '../images/puppyPic.svg';

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    position: 'relative',
  },
  overlay: {
    height: '100%',
    width: '100%',
    opacity: '0',
    '&:hover': {
      opacity: '1',
    },
  },
  media: {
    width: 'auto',
    height: 345,
    maxWidth: 345,
  },
});

const Signup = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
  });
  const [profilePic, setProfilePic] = useState(totoBlackAndBlue);

  const [selectedFile, setSelectedFile] = useState(null);

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const inputEl = React.useRef(null);

  useEffect(() => {
    const handleUpload = async (file) => {
      await uploadFile(file, config);
      setProfilePic(process.env.REACT_APP_URL + file.name);
    };
    if (selectedFile) {
      handleUpload(selectedFile);
    }
  }, [selectedFile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const onImageClick = async () => {
    await inputEl.current.click();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState, profilePic },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="page">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: 128,
            height: 128,
          },
        }}
      >
        <div className="signup-login-card">
          <h3>Sign Up</h3>
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/profile">to your Profile!</Link>
            </p>
          ) : (
            <div>
              <form id="newProfile" onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <textarea
                  form="newProfile"
                  className="form-input"
                  placeholder="Tell us more about you!"
                  name="bio"
                  value={formState.bio}
                  rows="3"
                  wrap="soft"
                  onChange={handleChange}
                />
                <Card className={classes.root}>
                  <input
                    accept="image/*"
                    id="new-profile-pic-file"
                    type="file"
                    style={{ display: 'none' }}
                    ref={inputEl}
                    onChange={handleFileInput}
                  />
                  <label htmlFor="new-profile-pic-file">
                    <CardActionArea
                      sx={{
                        ':hover': {
                          '& .overlay': {
                            opacity: '1',
                          },
                        },
                      }}
                      onClick={() => onImageClick()}
                    >
                      <CardMedia
                        component="img"
                        className={classes.media}
                        image={profilePic}
                        title="profile picture"
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '20px',
                          color: 'black',
                          backgroundColor: 'transparent',
                        }}
                        className={classes.overlay}
                      >
                        <img alt="" width="80px" src={`${changePic}`}></img>
                      </div>
                    </CardActionArea>
                  </label>
                </Card>
                <button className="submit-btn" type="submit">
                  Submit
                  <img
                    style={{ padding: 3 }}
                    width="20px"
                    src={puppyPaw}
                    alt="puppy paw"
                  />
                </button>
              </form>

              <p>
                Already Registered?{' '}
                <button className="login-btn">
                  <Link to="/login">Login</Link>
                </button>
              </p>
            </div>
          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              <p> Ruh-Roh! You didn't fill in all fields!</p>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Signup;
