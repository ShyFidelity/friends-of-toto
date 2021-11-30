import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import StickyHeader from '../components/StickyHeader/index';
import Post from '../components/Post/index';

export default function Discover() {
  const { loading, data } = useQuery(QUERY_POSTS);

  const posts = data?.posts || [];
  
  return (
    <>
      <StickyHeader />
      <div
      className="page">
      <p>Posts from all account will appear here so you can discover new friends to follow!</p>
      {loading ? (
        <div>Loading...</div>
      ) : (
          <Box 
          sx={{ flexGrow: 1 }}
          style={{ width:'80%' }} 
          >
            <Grid container spacing={2}>
              {posts ? (
                posts.map((post) =>
                <Grid
                  key={post._id} 
                  item xs={4}>
                    <Post 
                      key={post._id}
                      postAuthor={post.postAuthor}
                      postText={post.postText}
                    />
                </Grid>
                    )) : (<div>Loading...</div>)
                  }  
            </Grid>
          </Box>      
      )}
      </div>
    </>
  )
}

