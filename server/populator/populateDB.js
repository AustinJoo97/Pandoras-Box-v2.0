// import/initialize necessary modules (mongoose and others) and tokens required to make call to spotify API
const db = require("../config/connection");
const { Album } = require("../models");
const axios = require("axios");
const btoa = require("btoa");

// clientID and clientSecret variables from spotify
const clientId = "10cece6c2f3f4320b2e07f79197c27bb";
const clientSecret = "aeec5e00e5e44eb99fc43891e89e2c5a";

// functionality for retrieving a token from spotify in order to make API call.
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

    getGenres(res.data.access_token);
};

// establish function to get an array of all genres required to get albums to populate DB
const getGenres = async (token) => {
    const result = await axios.get(
        `https://api.spotify.com/v1/browse/categories?country=US&limit=10`,
        {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
        }
    );

    // PASS IN TOKEN VARIABLE AND GENRE IN ORDER TO MAKE API CALLS

    result.data.categories.items.forEach( async (genre) => {
        await getAlbums(token, genre.id);
    });
};

// TOKEN AND GENREID PASSED IN FROM GENRE API CALL
const getAlbums = async (token, genreID) => {
    const { data } = await axios.get(
        `https://api.spotify.com/v1/search?q=${genreID}&type=album&market=US&limit=25`,
        {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
        }
    );
    
    // Taking the results from the album search and mapping its properties to the Album database
    data.albums.items.map(async (album) => {
        await Album.create(
        {
            _id: album.id,
            name: album.name,
            artist: album.artists[0].name,
            genre: genreID,
            images: album.images[0].url
        });
    })
    console.log('all done!');
    process.exit(0);
};

getToken();