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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $username: String!, $bio: String, $profilePic: String) {
    updateUser(_id: $_id, username: $username, bio: $bio, profilePic: $profilePic) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($_id: ID!) {
    removePost(_id: $_id) {
      post
    }
  }
  `;
