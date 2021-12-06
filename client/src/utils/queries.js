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
        postImage
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
        postImage
        postAuthor
        createdAt
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
      }
      friends
    }
  }
`;

export const QUERY_POSTS = gql`
  query {
    posts {
      _id
      postText
      postImage
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

export const QUERY_POST = gql`
  query post($_id: ID!){
    post (_id: $_id) {
      _id
      postImage
      postText
      postAuthor
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`

export const QUERY_FRIENDS = gql`
  query {
    friends {
      _id
      username
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

export const QUERY_FRIEND_POSTS = gql`
  query friendPosts($friends: [String]) {
    friendPosts(friends: $friends) {
      _id
      postImage
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
