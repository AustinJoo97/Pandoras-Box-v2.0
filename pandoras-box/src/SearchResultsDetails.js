import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { Col, Card, Row } from "react-bootstrap";

import styles from '../styles/SearchPage.module.css';


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

const PopulateSearchResults2 = ({ queryResults, queryType }) => {
    let sanResults;
    queryResults.items ? sanResults = queryResults.items : sanResults = queryResults;
    console.log(queryType)
    // console.log(sanResults[0].images[0].url)
    return sanResults.map(cardData => (
        <Col lg="3" key={cardData.id} className="albumCard">
            <Link href={`/${queryType}?q=${cardData.id}`} className="text-decoration-none">
                <Card>
                    <Card.Body className="albumBody text-center">
                        <div className="embed-responsive">
                            {cardData.images[0]
                                ? <Card.Img
                                    className="card-img-top embed-responsive-item"
                                    src={cardData.images[0].url}
                                    alt={cardData.name}
                                />
                                : <Card.Img
                                    className="card-img-top embed-responsive-item"
                                    src='https://picsum.photos/200'
                                    alt='No picture provided'
                                />
                            }
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

export default PopulateSearchResults2;