import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import StickyHeader from '../components/StickyHeader/index';
import Post from '../components/Post/index';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import discoverDogs from '../images/discoverdogs-01.svg'
import '../styles/discoverFollowing.css'



export default function Discover() {
  const { loading, data } = useQuery(QUERY_POSTS);
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up('xs'))
  const posts = data?.posts || [];

  return (
      
 
    <>
      <StickyHeader />
     
      <div className="page">
      <img className="discoverDogs" src= {discoverDogs} width="300px" alt="2 dogs sniffing each others butts" />
        <h2>
          Look who's at the park today! 
        </h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Box sx={{ flexGrow: 1 }} style={{ width: "75%" }}>
            <Grid container spacing={2} sx={{ justifyContent: 'start'}}>
              {posts ? (
                posts.map((post) => (
                  <Grid key={post._id} item xs={12} sm={6} md={4}>
                    <Post
                      key={post._id}
                      postId={post._id}
                      postAuthor={post.postAuthor}
                      postText={post.postText}
                      postImage={post.postImage}
                      postComments={post.comments}
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
