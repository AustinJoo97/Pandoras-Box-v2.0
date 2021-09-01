import { Container, Row } from "react-bootstrap";

import PopulateSearch from '../src/SearchResultsDetails';

// search queries will be handled in Populate search component.
const ShowSearchScreen = () => {

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