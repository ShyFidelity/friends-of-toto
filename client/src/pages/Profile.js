import React from 'react';
import Box from '@mui/material/Box';

import Auth from '../utils/auth';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import Header from '../components/Header/index';

const petTypes = [
  {
    value: 'Dog',
    label: 'Dog',
  },
  {
    value: 'Cat',
    label: 'Cat',
  },
  {
    value: 'Bird',
    label: 'Bird',
  },
  {
    value: 'Small Mammal',
    label: 'Small Mammal',
  },
  {
    value: 'Reptile',
    label: 'Reptile',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

export default function Profile() {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [petType, setPetType] = React.useState('Dog');

  const handleChange = (event) => {
    setPetType(event.target.value);
  };

  return (
    <div className="container">
          <button className="btn btn-lg btn-light m-2" onClick={logout}>Logout</button>
          <Header />
          <h2>Hooray! Welcome to Friends of ToTo</h2>
          <p>Tell us more about your friend</p>
        <Box
        className="inputElement"  
        component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
  
          <div>
            <TextField
              required
              id="filled-required"
              label="Required"
              defaultValue="Pet Name"
              variant="filled"
            />
            <TextField
          id="filled-select-currency"
          select
          label="Select"
          value={petType}
          onChange={handleChange}
          helperText="Pet Type"
          variant="filled"
        >
          {petTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="filled-multiline-static"
          label="Bio"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
       </div>
           
        </Box>
    </div>
  );
}

