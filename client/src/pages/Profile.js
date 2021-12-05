import React from 'react';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useProfileContext } from '../utils/GlobalState';
import { UPDATE_PROFILE } from '../utils/actions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProfileSettings from '../components/ProfileSettings/index';
import PersonalPost from '../components/PersonalPost/index';
import StickyHeader from '../components/StickyHeader/index';
import '../styles/Profile.css';

import { QUERY_ME } from '../utils/queries';

export default function Profile() {
  const [state, dispatch] = useProfileContext();

  const { loading, data, refetch } = useQuery(QUERY_ME);

  const { posts } = state;

  useEffect(() => {
    refetch();
  }, [posts, refetch]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PROFILE,
        payload: {
          _id: data.me._id,
          profilePic: data.me.profilePic,
          username: data.me.username,
          bio: data.me.bio,
          posts: data.me.posts
        },
      });
    }
  }, [data, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <StickyHeader />
      <div className="page">
        <Box className="profileBox" style={{ width: "95%" }} sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} sm={6} md={4}>
              <ProfileSettings />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                  {posts ? (
                    posts.map((post) => (
                      <Grid key={post._id} item xs={12} md={6} lg={4}>
                        <PersonalPost
                          key={post._id}
                          postId={post._id}
                          postText={post.postText}
                          postImage={post.postImage}
                        />
                      </Grid>
                    ))
                  ) : (
                    <div>Loading...</div>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
