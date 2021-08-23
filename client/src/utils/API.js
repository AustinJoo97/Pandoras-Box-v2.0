const axios = require("axios");
const btoa = require("btoa");

// clientID and clientSecret variables from spotify
const clientId = "10cece6c2f3f4320b2e07f79197c27bb";
const clientSecret = "aeec5e00e5e44eb99fc43891e89e2c5a";

// Get token from spotify then call `getAlbumGenres` to return albums by genre.

export const getTokenThenAlbumGenres = async (genreID) => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
  };

  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    params,
    config
  );

  const getAlbumGenres = async (token, genreID) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${genreID}&type=album&market=US&limit=30`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    //  console.log(data.albums.items)
    return data.albums.items;
  };


  return getAlbumGenres(res.data.access_token, genreID);
};


// Get token from spotify then call `getArtists` to return artists based on query string.
export const getTokenThenArtists = async (artistName) => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
  };

  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    params,
    config
  );

  // Token and artistName passed in as parameters. API call is made to return 30 artist based on user search.
  const getArtists = async (token, artistName) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${artistName}&type=artist&market=US&limit=30`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    //   console.log(data.artists)
    return data.artists;
  };

  return getArtists(res.data.access_token, artistName);
};

// Get token from spotify then call `getArtists` to return artists based on query string.
export const getTokenThenArtistsDetails = async (artistID) => {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
  
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
    };
  
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      config
    );
  
    // Token and artistName passed in as parameters. API call is made to return 30 artist based on user search.
    const getArtistsDetails = async (token, artistID) => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${artistID}`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );
  
        // console.log(data)
      return data;
    };
  
    return getArtistsDetails(res.data.access_token, artistID);
};

// Get token from spotify then call `getArtistAlbums` to return albums based on artistID.
export const getTokenThenArtistAlbums = async (artistID) => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
  };

  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    params,
    config
  );

  // Token and artistID passed in as parameters. API call is made to return albums based on the artist ID.
  const getArtistAlbums = async (token, artistID) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=30`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    // console.log(data.items)
    return data.items;
  };

  return getArtistAlbums(res.data.access_token, artistID);
};

// Get token from spotify then call `getSingleAlbumDetails` to return the album details of a single ablum (requires album ID).
export const getTokenThenSingleAlbumDetails = async (albumID) => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");


  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
  };

  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    params,
    config
  );

  const getSingleAlbumDetails = async (token, albumID) => {
    const { data } = await axios.get(

      `https://api.spotify.com/v1/albums/${albumID}?market=US`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );


    //  console.log(data)
    return data;
  };

  return getSingleAlbumDetails(res.data.access_token, albumID);
};


// ---- CALLS USED FOR TESTING FUNCTIONS!! ----
// getTokenThenAlbumGenres('hiphop')
// getTokenThenArtists('Drake')
// getTokenThenArtistsDetails('0TnOYISbd1XYRBk9myaseg')
// getTokenThenArtistAlbums('0TnOYISbd1XYRBk9myaseg')
// getTokenThenSingleAlbumDetails('4aawyAB9vmqN3uQ7FjRGTy')
