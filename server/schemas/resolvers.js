const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('posts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username: username }).populate('posts');
    },
    userPosts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    friendPosts: async (parent, args, context) => {
      if (context.user) {
        return Post.find({
          postAuthor: { $in: [...args.friends] },
        }).sort({ createdAt: -1 });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    discoverPosts: async (parent, args, context) => {
      if (context.user) {
        return Post.find({
          "$nor": [
            {postAuthor: { $in: [...args.friends] }},
            {postAuthor: context.user.username}
          ]
        }).sort({ createdAt: -1 });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id: _id }).populate('comments');
    },
    posts: async (parent, args, context) => {
      return Post.find({postAuthor: {$ne: context.user.username}}).populate('comments').sort({ createdAt: -1 });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({path: 'posts', populate: {path: 'comments'}});
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, bio, profilePic }) => {
      const user = await User.create({ username, email, password, bio, profilePic });
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            ...args
          }
        );
        const token = signToken(user);
        return { token, user };
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addFriend: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: args.username } }
        );

        const token = signToken(user);
        return { token, user };
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    newPost: async (parent, { postImage, postText }, context) => {
    
      if (context.user) {
      
        const post = await Post.create({
          postImage,
          postText,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { _id, commentText }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: _id },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeFriend: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: args.username } }
        );
        const token = signToken(user);
        return { token, user };
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePost: async (parent, { _id }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: _id,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
