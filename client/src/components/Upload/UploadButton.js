import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import { Card } from '@mui/material';
import { Link } from 'react-router-dom';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButton() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type={ Card } />
        <IconButton color="secondary" aria-label="upload picture" component={Link} to='/newpost'>
          <AddCircle />
        </IconButton>
      </label>
    </Stack>
  );
}