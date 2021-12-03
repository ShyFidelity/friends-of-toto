import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { makeStyles } from '@material-ui/core/styles';
import puppyPaw from '../images/puppypaw.svg'

import Auth from '../utils/auth';
import '../styles/Signup.css'

const useStyles = makeStyles({
  root: {
   width: 500,

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

const Signup = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
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
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      
      <Paper className={classes.root}>
          <h3>Sign Up</h3>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/profile">to your Profile!</Link>
              </p>
            ) : (
              <div>
                <form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.name}
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
                  <button className="submit-btn"
                    type="submit"
                  >
                    Submit 
                    <img style={{ padding: 3}} width="20px" src={puppyPaw} alt="puppy paw" />
                  </button>
                </form>
          
                <p>Already Registered? <button><Link to="/login">Login</Link></button></p>
              </div>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                <p> Ruh-Roh! You didn't fill in all fields!</p>
              </div>
            )}
         
        
        </Paper>
        </Box>
        </div>

  );
};

export default Signup;
