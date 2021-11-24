import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      bio
      profilePic
      posts {
        _id
        postText
        postAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      bio
      profilePic
      posts {
        _id
        postText
        postAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query {
    posts {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;
