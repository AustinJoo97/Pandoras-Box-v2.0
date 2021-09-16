const { AuthenticationError } = require('apollo-server-express');
const { User, Comment, Album } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers  = {
    Query: {
        getUsers: async () => {
            return await User.find().populate('comments');
            // return User.find().populate('favorites').populate('comments');
        },

        getSingleUser: async (parent, { username }) => {
            return await User.findOne({ username }).populate('comments');
        },
        
        me: async (parent, args, context) => {
            if(context.user){
                return await User.findOne({ _id: context.user._id }).populate('favorites', 'comments');
            }
            throw new AuthenticationError('Please login!');
        },

        getComments: async () => {
            return await Comment.find().populate('postedBy', 'albumCommented');
        },

        getUserComments: async (parent, args, context) => {
            if(context.user) {
                const userData = await (await User.findOne({ _id: context.user._id})).populate('comments');

                return userData.comments;
            }
            throw new AuthenticationError('Please login!');
        },

        getAlbums: async () => {
            return await Album.find().populate('comments');
        },

        getFavoritedAlbums: async (parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({ _id: context.user._id }).populate('favorites');

                return userData.favorites;
            }
            throw new AuthenticationError('Please login!');
        },

        getSingleAlbum: async (parent, { albumID }) => {
            return await (await Album.findOne({ _id: albumID })).populate('comments');
        }
    },

    Mutation: {
        addUser: async (parent, { name, username, email, password, location, bio, proPic }) => {
            const user = await User.create({ name, username, email, password, location, bio, proPic });
            const token = signToken(user);
            return { token, user };
        },

        updateUser: async (parent, { name, username, email, password, location, bio, proPic }, context) => {
            if(context.user){
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $set : {
                        name,
                        username,
                        email,
                        password,
                        location,
                        bio,
                        proPic
                    }},
                    {new: true}
                )
        
                const token = signToken(user);
                return { token, user }
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if(!user) {
                throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };

        },

        addNewFavorite: async (parent, { albumID, name, artist, image, genre }, context) => {
            if(context.user){
                const newFavorite = await Album.findOne({_id: albumID})
        
                if(newFavorite === null || newFavorite.name !== name){
                    const addedFavorite = await Album.create({
                        _id: albumID, name, artist, image, genre
                    })
            
                    const updatedUser =  await User.findOneAndUpdate(
                        { _id: context.user._id },
                        {
                            $addToSet: {favorites: addedFavorite}
                        },
                        { new: true }
                    );
        
                    return updatedUser;
                }
            
                const updatedUser =  await User.findOneAndUpdate(
                        { _id: context.user._id },
                        {
                        $addToSet: {favorites: newFavorite._id}
                        },
                        { new: true }
                );
        
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        deleteFavorite: async (parent, { albumID }, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id }).populate('favorites');
          
                userData.favorites.map((album) => {
                    if(album._id === albumID){
                        return User.findOneAndUpdate(
                            {_id: context.user._id},
                            {
                                $pull: { favorites: album}
                            },
                            { new: true }
                        )
                    }
                })
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        addComment: async (parent, { commentText, albumCommented }, context) => {
            if(context.user){
                const userData = await User.findOne({ _id: context.user._id }).populate('comments');
                const newComment = await Comment.create({ 
                    commentText,
                    postedBy: userData,
                    albumCommented, 
                })
          
                return Album.findOneAndUpdate(
                    { _id: albumCommented },
                    {
                    $addToSet: { comments: newComment}
                    },
                    { new: true }
                )
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        editComment: async (parent, { commentID, commentText }, context) => {
            return Comment.findOneAndUpdate(
                {_id: commentID},
                { $set : {commentText: commentText}},
                { new: true }
            )
        },

        deleteComment: async (parent, { commentID }, context) => {
            if (context.user) {
                const userData = User.findOne({ _id: context.user._id }).populate('comments');
        
                userData.comments.map((comment) => {
                    if(comment._id === commentID){
                        const index = userData.comments.indexOf(comment);
                        userData.comments.splice(index, 1)
                    }
                })
        
                return Comment.findOneAndDelete({_id: commentID})
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;