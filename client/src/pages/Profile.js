import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProfileSettings from '../components/ProfileSettings/index';
import PersonalPost from '../components/PersonalPost/index';
import StickyHeader from '../components/StickyHeader/index'
import UploadButton from '../components/Upload/UploadButton';
import '../styles/Profile.css'

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

export default function Profile() {
  const { username } = useParams();

  const { loading, data } = useQuery(!username ? QUERY_ME: QUERY_USER, {
    variables: { username: username },
  });

  const profile = data?.me || data?.user || {};
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.username) {
    return (
      <>
        <StickyHeader />
        <div className="page">
        <h3>
          You need to be logged in to see this. Use the navigation links above to
          sign up or log in!
        </h3>
        </div>
      </>
    );
  }

  return (
    <>
      <StickyHeader />
      <div className="page">
      <Box className="profileBox" sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ProfileSettings
              _id={profile._id}
              profilePic={profile.profilePic} 
              username={profile.username}
              bio={profile.bio}
            />
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {profile.posts ? (
                  profile.posts.map((post) =>
                    <Grid 
                      key={post._id}
                      item xs={4}
                    >
                      <PersonalPost
                        key={post._id}
                        postId={post._id}
                        postText={post.postText}
                      />
                    </Grid>
                      )) : (<div>Loading...</div>)
                }  
               </Grid>
             
            </Box>
          </Grid>
        </Grid>
      </Box>
      <UploadButton />
    </div>
    </>
  );
}

