import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import { Card } from '@mui/material';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButtons() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type={ Card } />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <AddCircle />
        </IconButton>
      </label>
    </Stack>
  );
}