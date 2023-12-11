const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
      getSingleUser: async (parent, { username }) => {
        const foundUser = await User.findOne({ username });
      
          if (!foundUser) {
            throw new Error('Cannot find a user with this id!');
          }
      
          return foundUser;
        },
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('thoughts');
          }
          throw AuthenticationError;
        },
    },
    Mutation: {
      createUser: async (parent, { username, email, password } ) => {

        const user = await User.create( {username, email, password});
        const token = signToken(user);

        return { token, user };
        
      },
      login: async (parent, { email, password }) => {

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "Can't find this user" });
        }

        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
          return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        res.json({ token, user });
      },
      saveBook: async (parent, { book }, { user }) => {
          try {
            const updatedUser = await User.findOneAndUpdate(
              { _id: user._id },
              { $addToSet: { savedBooks: book } },
              { new: true, runValidators: true }
            );
    
            if (!updatedUser) {
              throw new Error("Couldn't find user");
            }
    
            return updatedUser;
          } catch (err) {
            throw new Error(err.message);
          }
        },
        deleteBook: async (_, { bookId }, { user }) => {
          try {
            const updatedUser = await User.findOneAndUpdate(
              { _id: user._id },
              { $pull: { savedBooks: { bookId } } },
              { new: true }
            );
    
            if (!updatedUser) {
              throw new Error("Couldn't find user or book");
            }
    
            return updatedUser;
          } catch (err) {
            throw new Error(err.message);
          }
        },
    },
  };
  
  module.exports = resolvers;