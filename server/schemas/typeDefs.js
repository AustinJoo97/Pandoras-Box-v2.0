const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        name: String
        username: String!
        email: String!
        password: String!
        location: String
        bio: String
        proPic: String
        favorites: [Album]
        comments: [Comment]
    }

    type Comment {
        _id: ID!
        commentText: String!
        commentDate: String!
        postedBy: User
        albumCommented: Album
    }

    type Album {
        _id: String!
        name: String!
        artist: String
        image: String
        genres: [String]
        comments: [Comment]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getUsers: [User]
        getSingleUser(username: String!): User
        me: User
        getComments: [Comment]
        getUserComments: [Comment]
        getAlbums: [Album]
        getFavoritedAlbums: [Album]
        getSingleAlbum(albumID: String): Album
    }

    type Mutation {
        addUser(name: String, username: String!, email: String!, password: String!, location: String, bio: String, proPic: String): Auth
        updateUser(name: String, username: String!, email: String!, password: String, location: String, bio: String, proPic: String): Auth
        login(email: String!, password: String!): Auth
        addNewFavorites(albumID: String!, name: String!, artist: String, image: String, genre: String): User
        deleteFavorite(albumID: String!): User
        addComment(commentText: String!, albumCommented: String!): Comment
        editComment(commentID: ID!, commentText: String!): Comment
        deleteComment(commentID: ID!): Comment
    }
`;