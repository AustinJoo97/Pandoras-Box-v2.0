import { gql } from '@apollo/client';

// Working
export const QUERY_USERS = gql`
  query users {
    getUsers {
      _id
      name
      username
      email
      location
      bio
      proPic
      favorites{
        _id
      }
    }
  }
`;

// Working
export const QUERY_USER = gql`
  query user($username: String!) {
    getSingleUser(username: $username) {
      _id
      username
      email
      location
      bio
      favorites{
        _id
      }
    }
  }
`;

// Requires context.user
export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      username
      email
      location
      bio
      proPic
      favorites{
        _id
      }
    }
  }
`;

// Working
export const QUERY_COMMENTS = gql`
  query comments {
    getComments {
      _id
      commentText
      commentDate
      postedBy {
        _id
        username
        location
      }
      albumCommented {
        _id
        name
        artist
      }
    }
  }
`;

// Requires context.user
export const QUERY_USER_COMMENTS = gql`
  query comment {
    getUserComments {
      _id
      commentText
      commentDate
      albumCommented {
        _id
        name
        artist
      }
    }
  }
`;

// Working
export const QUERY_ALBUMS = gql`
  query albums{
    getAlbums{
      _id
      name
      artist
      image
      genre
      comments {
        _id
        commentText
        commentDate
        postedBy {
          _id
          username
          location
        }
      }
    }
  }
`;

// Requires context.user
export const QUERY_FAVORITE_ALBUMS = gql`
  query favorites{
    getFavoritedAlbums{
      _id
      name
      artist
      image
      genre
      comments {
        _id
        commentText
        commentDate
        postedBy {
          _id
          username
          location
        }
      }
    }
  }
`;

// Working
export const QUERY_SINGLE_ALBUM = gql`
  query singleAlbum($albumID: String!){
    getSingleAlbum(albumID: $albumID){
      _id
      name
      artist
      image
      genre
      comments {
        _id
        commentText
        commentDate
        postedBy {
          _id
          username
          location
        }
      }
    }
  }
`;

