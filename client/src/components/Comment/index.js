import * as React from "react";

import { Avatar } from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { Typography } from "@mui/material";

export default function Comment(props) {
  const {loading, data} = useQuery(QUERY_USER, {
    variables: { username: props.commentAuthor },
  });

  return (
    <div>
        { loading ? ( <div> loading... </div> ) : (
            <Avatar alt="Profile Pic" src={ data.user.profilePic} />
        )}

      <Typography>{props.commentAuthor}</Typography>
      <Typography paragraph>{props.commentText}</Typography>
    </div>
  );
}
