import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import StickyHeader from '../components/StickyHeader/index';
import Post from '../components/Post/index';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
                  <Item
                    key={post._id} 
                  > 
                    <Post 
                      key={post._id}
                      postAuthor={post.postAuthor}
                      postText={post.postText}
                    />
                  </Item>
                </Grid>
                    )) : (<div>Loading...</div>)
                  }  
            </Grid>
          </Box>
        // posts.map((post) => 
        // <Post 
        //   key={post._id}
        //   postAuthor={post.postAuthor}
        //   postText={post.postText}
        // />)        
      )}
      </div>
    </>
  )
}

