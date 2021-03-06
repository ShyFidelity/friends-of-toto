const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bio: String
    profilePic: String
    posts: [Post]
    friends: [String]
  }

  type Post {
    _id: ID
    postImage: String
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    userPosts(username: String): [Post]
    friendPosts(friends: [String]): [Post]
    discoverPosts(friends: [String]): [Post]
    posts: [Post]
    post(_id: ID!): Post
    me: User
    friends(username: String): [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, bio: String!, profilePic: String!): Auth
    updateUser(
      bio: String
      profilePic: String
    ): Auth
    login(email: String!, password: String!): Auth
    addFriend(username: String!): Auth
    newPost(postImage: String!, postText: String!): Post
    addComment(_id: ID!, commentText: String!): Post
    removeFriend(username: String!): Auth
    removePost(_id: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
