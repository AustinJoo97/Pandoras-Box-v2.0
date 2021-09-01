import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Container, Row } from "react-bootstrap";

import PopulateSearchResults2 from '../src/SearchResultsDetails';
import { getTokenThenArtists, getTokenThenAlbumGenres, getQueryResults } from './api/spotify.js';

// spotify query based on search type
const queryArtists = async (setSeachResults, setLoading, searchResultsReference) => {
  // get our data values
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get('q')
  const searchType = params.get('type');


  try {
    const response = await getQueryResults(searchQuery, searchType)
    await setSeachResults(response)
    searchResultsReference.current = searchType;
    return setLoading(false);
  } catch (err) {
    console.log(err)
  }


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


const ShowSearchScreen = (props) => {
  // create state to hold that data from the query,
  // ref allows us to avoid infinite call loop in useEffect.
  const [searchResults, setSeachResults] = useState([])
  const [isLoading, setLoading] = useState(true);
  const searchResultsReference = useRef('');

  useEffect(() => {
    queryArtists(setSeachResults, setLoading, searchResultsReference)
  }, [searchResultsReference])


  // console.log(searchResultsReference)

  if (isLoading) {
    return (
      <h5>Loading...</h5>
    )
  }

  return (
    <Container>
      <h2 className="show-query">Search results</h2>
      <Row id="searchResults" className="">
        <PopulateSearchResults2 queryResults={searchResults} queryType={searchResultsReference.current} />

      </Row>
    </Container>

  )
}

export default ShowSearchScreen;