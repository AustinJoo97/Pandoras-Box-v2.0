import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row} from "react-bootstrap";

import PopulateSearchResults from '../src/SearchResultsDetails';
import { getTokenThenArtists, getTokenThenAlbumGenres } from './api/spotify.js';

// spotify query based on search type
const queryArtists = async (setSeachResults, setLoading) => {
  // get our data values
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get('q')
  const searchType = params.get('type');


  if (searchType === 'artists') {
    try {
      const response = await getTokenThenArtists(searchQuery)
      await setSeachResults(response)
      return setLoading(false);
    } catch (err) {
      console.log(err)
    }

  } else if (searchType === 'albums') {
    try {
      const response = await getTokenThenAlbumGenres(searchQuery)
      await setSeachResults(response)
      return setLoading(false);
    } catch (err) {
      console.log(err)
    }
  } else {
    return console.log('whoops');
  }
}


const ShowSearchScreen = (props) => {
  // create state to hold that data from the query
  const [searchResults, setSeachResults] = useState([])
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    queryArtists(setSeachResults, setLoading)
  }, [searchResults])

  // const params = new URLSearchParams(window.location.search);
  // const searchQuery = params.get('q');
  // const searchType = params.get('type');

  // console.log(searchResults)

  if (isLoading) {
    return (
      <h5>Loading...</h5>
    )
  }

  return (
    <Container>
      <h2 className="show-query">Search results</h2>
      <Row id="searchResults" className="">
        <PopulateSearchResults queryResults={searchResults} queryType="albums" />
        
      </Row>
    </Container>
  
    )
}

export default ShowSearchScreen;