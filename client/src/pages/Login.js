import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import '../styles/Login.css'

import Auth from '../utils/auth';

const Login = (props) => {


  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    
    <div className="page">
      <h3>Log In</h3>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/me">to your Profile.</Link>
              </p>
            ) : (
              <div>
                <form onSubmit={handleFormSubmit}>
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
                  <button
                    className="btn btn-block btn-primary"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
                <p>New Here? <button><Link to="/signup">Create Account</Link></button></p>
              </div>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
    </div>
  );
};

export default Login;
