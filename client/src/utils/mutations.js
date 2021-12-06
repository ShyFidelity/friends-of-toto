import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $bio: String!, $profilePic: String!) {
    addUser(username: $username, email: $email, password: $password, bio: $bio, profilePic: $profilePic) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $bio: String
    $profilePic: String
  ) {
    updateUser(
      bio: $bio
      profilePic: $profilePic
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const NEW_POST = gql`

mutation newPost(
  $postImage: String!
  $postText: String! 

) {
  newPost(
    postImage: $postImage
    postText: $postText
  ) {
    _id
  }
}
`

export const REMOVE_POST = gql`
  mutation removePost($_id: ID!) {
    removePost(_id: $_id) {
      _id
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($username: String!) {
    addFriend(username: $username) {
      token
      user {
        friends
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($username: String!) {
    removeFriend(username: $username) {
      token
      user {
        friends
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($_id: ID!, $commentText: String!) {
    addComment(_id: $_id, commentText: $commentText) {
      _id
    }
  }
`
