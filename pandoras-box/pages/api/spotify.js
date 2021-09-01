const axios = require("axios");
const btoa = require("btoa");

// clientID and clientSecret variables from spotify
const clientId = "10cece6c2f3f4320b2e07f79197c27bb";
const clientSecret = "aeec5e00e5e44eb99fc43891e89e2c5a";


// call function that takes id(query) as an argument
export const getTokenThenAlbumGenres = async (genreID) => {

  // create params and config strings, then use axios and this new constructed url to grab our token.
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

  // function that will take our token and query to construct a url for our request to spotify.
  const getAlbumGenres = async (token, genreID) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${genreID}&type=album&market=US&limit=30`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    return data.albums.items;
  };

  // call this function and return the data that it retrives.
  return getAlbumGenres(res.data.access_token, genreID);
};


// same as above but for artists instead of albums.
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

  const getArtists = async (token, artistName) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${artistName}&type=artist&market=US&limit=30`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    return data.artists;
  };
  return getArtists(res.data.access_token, artistName);
};


// used to grab single artist details
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
  
    const getArtistsDetails = async (token, artistID) => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${artistID}`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );
        return data;
    };
    return getArtistsDetails(res.data.access_token, artistID);
};


// used to grab single artist's albums
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

  const getArtistAlbums = async (token, artistID) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=30`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    return data.items;
  };
  return getArtistAlbums(res.data.access_token, artistID);
};

// used to grab single album details
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
    return data;
  };
  return getSingleAlbumDetails(res.data.access_token, albumID);
};




// Forest's test scripts

// get token should be called within any function, instead of each function having it's own seperate call
const getToken = async () => {
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

  return res.data.access_token;
}


// get search results from spotify, takes query and type as arguments.
export const getQueryResults = async (searchQuery, type) => {

  // define functions for either type of search
  const getArtists = async (query, token) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=artist&market=US&limit=30`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    console.log(data)
    return data.artists;
  }

  const getAlbums = async (query, token) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=album&market=US&limit=30`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    console.log(data)
    return data.albums;
  }

  // call get token function to use when we determine which search we want to run
  const token = await getToken();

  // look at what type of search this, then run that search with query and token.
  if (type === 'artist') {
    return getArtists(searchQuery, token)
  } else if (type === 'album') {
    return getAlbums(searchQuery, token)
  } else {
    return console.log('error');
  }
}


// ---- CALLS USED FOR TESTING FUNCTIONS!! ----
// getTokenThenAlbumGenres('hiphop')
// getTokenThenArtists('Drake')
// getTokenThenArtistsDetails('0TnOYISbd1XYRBk9myaseg')
// getTokenThenArtistAlbums('0TnOYISbd1XYRBk9myaseg')
// getTokenThenSingleAlbumDetails('4aawyAB9vmqN3uQ7FjRGTy')

