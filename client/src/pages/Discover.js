import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import StickyHeader from '../components/StickyHeader/index';
import Post from '../components/Post/index';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Discover() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('xs'))
  const posts = data?.posts || [];

  return (
      

    <>
      <StickyHeader />
      <div className="page">

        <p>
          Posts from all account will appear here so you can discover new
          friends to follow!
        </p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Box sx={{ flexGrow: 1 }} style={{ width: 900 }}>
            <Grid container spacing={2}>
              {posts ? (
                posts.map((post) => (
                  <Grid key={post._id} item xs={4}>
                    <Post
                      key={post._id}
                      postId={post._id}
                      postAuthor={post.postAuthor}
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
        )}
      </div>
    </>
  );
}
