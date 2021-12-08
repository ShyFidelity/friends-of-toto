import * as React from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Avatar } from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { Typography } from "@mui/material";

import './comment.css';

export default function Comment(props) {
  const {loading, data} = useQuery(QUERY_USER, {
    variables: { username: props.commentAuthor },
  });

  return (
    <Box className="comment" style={{ width: '95%' }} sx={{ flexGrow: 1 }}>
      <Grid container> 
        <Grid item xs={12} sx={{ justifyContent: 'space-between'}}>
          <Grid className="comment-header" container sx={{ alignItems: 'center' }}>
            <Grid item xs={6}>
              { loading ? ( <div> loading... </div> ) : (
                  <Avatar sx={{ marginLeft: '5px' }} alt="Profile Pic" src={ data.user.profilePic} />
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ textAlign: 'right' }}>{props.commentAuthor}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography paragraph className="comment-text">{props.commentText}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
