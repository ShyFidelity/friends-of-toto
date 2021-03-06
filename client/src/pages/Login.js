import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import '../styles/Form.css'
import puppyPaw from '../images/pawlike.svg'

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
    <div className="signup-login-card">
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
                    className="submit-btn"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Submit
                  <img src={puppyPaw} width="20px" alt="puppy paw" />
                  </button>
                </form>
                <p>New Here? <button className="login-btn"><Link to="/signup">Create Account</Link></button></p>
              </div>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
          </div>
    </div>
  );
};

export default Login;
