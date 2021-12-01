import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_FRIEND_POSTS } from '../utils/queries';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import StickyHeader from '../components/StickyHeader/index';
import Post from '../components/Post/index';

export default function Following() {
  const { data: user } = useQuery(QUERY_ME);
  const userFriends = user?.me.friends;

  const { isIdle, data: posts } = useQuery(QUERY_FRIEND_POSTS, {
    variables: { friends: userFriends },
    enabled: !!userFriends,
  });
  const friendPosts = posts?.friendPosts;

  return (
    <>
      <StickyHeader />
      <div className="page">
        <p>Posts from accounts you follow will appear here!</p>
        {isIdle ? (
          <div>Loading...</div>
        ) : (
          <Box sx={{ flexGrow: 1 }} style={{ width: '80%' }}>
            <Grid container spacing={2}>
              {friendPosts ? (
                friendPosts.map((post) => (
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
