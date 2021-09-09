import React from 'react';
import { useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import { Col, Card, Row, Container } from "react-bootstrap";

import styles from '../styles/SearchPage.module.css';
import { getQueryResults } from '../pages/api/spotify.js';

const queryData = async (setSeachResults, setLoading, searchResultsReference) => {
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
}


const PopulateSearch = () => {

    const [searchResults, setSeachResults] = useState([])
    const [isLoading, setLoading] = useState(true);
    const searchResultsReference = useRef('');

    useEffect(() => {
        queryData(setSeachResults, setLoading, searchResultsReference)
    }, [searchResultsReference])



    console.log(searchResults)
    let sanResults;
    searchResults.items ? sanResults = searchResults.items : sanResults = searchResults;


    if (isLoading) {
        return (
            <h5>Loading...</h5>
        )
    }

    // console.log(searchResultsReference.current)
    return sanResults.map(cardData => (
        <Col lg="3" key={cardData.id} className={styles.albumCard}>
            <Link href={`/${searchResultsReference.current}?q=${cardData.id}`} className="text-decoration-none">
                <Card className={styles.cardCarousel}>
                    <Card.Body className= {styles.albumBody}>
                        <div className="embed-responsive-artist">
                            {cardData.images[0]
                                    ? <Card.Img
                                        className="card-img-top embed-responsive-item-artist"
                                        variant="Top"
                                        src={cardData.images[0].url}
                                        alt={cardData.name}
                                    />
                                    : <Card.Img
                                        className="card-img-top embed-responsive-item-artist"
                                        variant="Top"
                                        src='https://picsum.photos/200'
                                        alt='No picture provided'
                                    />
                                }
                        </div>
                        <Container>
                            <h5>{cardData.name}</h5>
                            <h4>
                                <div>
                                    {cardData.popularity
                                        ? `Popularity: ${cardData.popularity}/100`
                                        : `Release date: ${cardData.release_date}`}
                                </div>
                                <div>
                                    {cardData.followers
                                        ? `Total followers: ${cardData.followers.total}`
                                        : `Total tracks: ${cardData.total_tracks}`}
                                </div>
                            </h4>
                        </Container>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    ))
}

export default PopulateSearch;

const PopulateSearchResults = ({ queryResults, queryType }) => {
    // some management of how results will display here



    // if type "artist", return artist cards
    if (queryType === "artists") {
        console.log(queryResults)

        // CreateAtistSearchResults(queryResults)
        return queryResults.items.map(artist => (
            <Col lg="3" key={artist.id} >
                <Link href={`/artist?q=${artist.id}`} className="text-decoration-none">
                    <Card className="mx-3 cardCarousel">
                        <Card.Body className={styles.albumCard}>
                            <h6>{artist.type}</h6>
                            <div className="embed-responsive">
                                <Card.Img
                                    className="card-img-top embed-responsive-item"
                                    src={artist.images.length ? artist.images[0].url : 'https://picsum.photos/200'}
                                    alt={artist.name}
                                />
                            </div>
                            <h4>{artist.name}</h4>
                            <p>{artist.popularity}/100</p>
                            <p>{artist.followers.total} Followers</p>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        ))


        // if type "album", return album cards
    } else if (queryType === "albums") {
        console.log(queryResults)

        return queryResults.map(album => (
            <Col lg="3" key={album.id} className="albumCard">
                <Link href={`/album?q=${album.id}`} className="text-decoration-none">
                    <Card className="mx-3 cardCarousel">
                        <Card.Body className="albumBody text-center">
                            <div className="embed-responsive">
                                <Card.Img
                                    className="card-img-top embed-responsive-item"
                                    src={album.images[0].url}
                                    alt="hi"
                                />
                            </div>
                            <h3 className="">{album.name}</h3>
                            <p>Year released: {album.release_date}</p>
                            <p>Total tracks: {album.total_tracks}</p>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>

        ))

    } else if (queryType === "test") {

        let sanResults;
        queryResults.items ? sanResults = queryResults.items : sanResults = queryResults;

        // console.log(sanResults[0].images[0].url)
        return sanResults.map(cardData => (
            <Col lg="3" key={cardData.id} className="albumCard">
                <Link href={`/album?q=${cardData.id}`} className="text-decoration-none">
                    <Card>
                        <Card.Body className="albumBody text-center">
                            <div className="embed-responsive">
                                <Card.Img
                                    className="card-img-top embed-responsive-item"
                                    src={cardData.images[0].url || 'https://picsum.photos/200'}
                                    alt={cardData.name}
                                />
                            </div>
                            <Card.Title>{cardData.name}</Card.Title>
                            <div>
                                {cardData.popularity
                                    ? `Popularity: ${cardData.popularity}/100`
                                    : `Release date: ${cardData.release_date}`}
                            </div>
                            <div>
                                {cardData.followers
                                    ? `Total followers: ${cardData.followers.total}`
                                    : `Total tracks: ${cardData.total_tracks}`}
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        ))
    } else {
        return (
            <h2>some other card data</h2>
        )
    }
}



// let artist: {
//     tye: 'artists',
//                 artist.id,
//     artist.type,
//     artist.images.length,
//     artist.images[0].url,
//     artist.name,
//     artist.popularity,
//     artist.followers.total,
// }

// let album: {
//     tye: 'albums',
//                 album.id,
//     album.images[0].url,
//     album.name,
//     album.release_date,
//     album.total_tracks,
// }
