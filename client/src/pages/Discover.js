import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_DISCOVER_POSTS } from '../utils/queries';
import { useProfileContext } from '../utils/GlobalState';
import { UPDATE_DISCOVER_POSTS } from '../utils/actions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import StickyHeader from '../components/StickyHeader/index';
import Post from '../components/Post/index';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import discoverDogs from '../images/discoverdogs-01.svg'
import '../styles/discoverFollowing.css'



export default function Discover() {
  const [validation, setValidation] = useState(true);
  const [state, dispatch] = useProfileContext();
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up('xs'))
  const { data: user, refetch: refetchMe } = useQuery(QUERY_ME);
  const userFriends = user?.me.friends;

  const { data: posts, refetch: refetchPosts } = useQuery(QUERY_DISCOVER_POSTS, {
    variables: { friends: userFriends },
    enabled: !!userFriends,
  });
  const dbDiscoverPosts = posts?.discoverPosts;

  const { discoverPosts } = state;

  useEffect(()=>{
    refetchMe();
    refetchPosts();
  },[refetchMe, refetchPosts]);

  useEffect(() => {
    if(dbDiscoverPosts) {
      dispatch({
        type: UPDATE_DISCOVER_POSTS,
        discoverPosts: dbDiscoverPosts
    })
    }
  }, [dbDiscoverPosts, dispatch])

  useEffect(() => {
    if (discoverPosts !== []) {
      setValidation(false)
    }
  }, [discoverPosts])


  return (
    <>
      <StickyHeader />
     
      <div className="page">
      <img className="discoverDogs" src= {discoverDogs} width="300px" alt="2 dogs sniffing each others butts" />
        <h2>
          Look who's at the park today! 
        </h2>
        {validation ? (
          <div>Loading...</div>
        ) : (
          <Box sx={{ flexGrow: 1 }} style={{ width: "75%" }}>
            <Grid container spacing={2} sx={{ justifyContent: 'start'}}>
              {discoverPosts ? (
                discoverPosts.map((post) => (
                  <Grid key={post._id} item xs={12} sm={6} md={4}>
                    <Post
                      key={post._id}
                      postId={post._id}
                      postAuthor={post.postAuthor}
                      postText={post.postText}
                      postImage={post.postImage}
                      postComments={post.comments}
                      discoverPosts={discoverPosts}
                    />
                  </Grid>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </Grid>
          </Box>
        )}
      </div>
    </>
  );
}
