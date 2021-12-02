import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import UploadImage from '../components/Upload';
import { useMutation } from '@apollo/client';
import { NEW_POST } from '../utils/mutations';


export default function MultilineTextFields() {
  const [newPost, { error, data }] = useMutation(NEW_POST);
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (

    <div>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <div>
        <TextField
          id="filled-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
          variant="filled"
        />
        
      </div>
    
    </Box>
     
    <UploadImage />
    </div>
  );
}
