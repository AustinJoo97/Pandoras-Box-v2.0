import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Container, Row } from "react-bootstrap";

import PopulateSearch from '../src/SearchResultsDetails';
import { getTokenThenArtists, getTokenThenAlbumGenres, getQueryResults } from './api/spotify.js';

// spotify query based on search type
const queryArtists = async (setSeachResults, setLoading, searchResultsReference) => {
  // get our data values
  


  // if (searchType === 'artists') {
  //   try {
  //     const response = await getTokenThenArtists(searchQuery)
  //     await setSeachResults(response)
  //     searchResultsReference.current = response
  //     return setLoading(false);
  //   } catch (err) {
  //     console.log(err)
  //   }

  // } else if (searchType === 'albums') {
  //   try {
  //     const response = await getTokenThenAlbumGenres(searchQuery)
  //     await setSeachResults(response)
  //     searchResultsReference.current = response
  //     return setLoading(false);
  //   } catch (err) {
  //     console.log(err)
  //   }
  // } else {
  //   return console.log('whoops');
  // }
}


const ShowSearchScreen = ({ query, type}) => {
  // create state to hold that data from the query,
  // ref allows us to avoid infinite call loop in useEffect.
  


  // console.log(searchResultsReference)


  return (
    <Container>
      <h2 className="show-query">Search results</h2>
      <Row id="searchResults" className="">
        <PopulateSearch />

      </Row>
    </Container>

  )
}

export default ShowSearchScreen;