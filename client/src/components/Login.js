import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function Login() {

    return (
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
              defaultValue="Username"
              variant="filled"
            />
               <TextField
              required
              id="filled-required"
              label="Required"
              defaultValue="Owner Email"
              variant="filled"
            />
           
            <TextField
              id="filled-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
            />
       </div>
           
        </Box>
      );

}

