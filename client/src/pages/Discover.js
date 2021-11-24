import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';

import Header from '../components/Header/index';
import Post from '../components/Post/index';

export default function Discover() {
  const { loading, data } = useQuery(QUERY_POSTS);

  const posts = data?.posts || [];
  
  return (
    <div>
      <Header />
      <p>Posts from all account will appear here so you can discover new friends to follow!</p>
      {loading ? (
        <div>Loading...</div>
      ) : (
        posts.map((post) => 
        <Post 
          key={post._id}
          postAuthor={post.postAuthor}
          postText={post.postText}
        />)        
      )}
    </div>
  )
}

