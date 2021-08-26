import React from 'react';
import Link from 'next/link'
import { Container, Col, Card, Row} from "react-bootstrap";
import '../styles/ArtistPage.module.css';

const DisplayGenres = ({ artist }) => {
    let allGenres = [];

    if (!artist.genres) {
        return <p>none listed</p>;
    }

    artist.genres.forEach(genre => {
        if (allGenres.length === 0) {
            allGenres = genre
        } else {
            allGenres += `, ${genre}`;
        }
    })
    return (
        <p>Genres: {allGenres}</p>
    )

}

const ViewArtist = ({ artist, albums }) => {

    
    // map through all albums and create card for them
    const ShowAlbums = () => {
        if (albums.length) {
            return albums.map(album => (
                <Col key={album.id} lg="3" className="albumCard">
                    <Link href={`/album?q=${album.id}`} className="text-decoration-none">
                        <Card className="mx-3 cardCarousel">
                            <Card.Body className="albumBody">
                                <div className="embed-responsive">
                                    <span>{album.type}</span>
                                    <Card.Img
                                        className="card-img-top embed-responsive-item"
                                        src={album.images[0].url}
                                        alt={album.name}
                                    />
                                </div>
                                <h4 className="">{album.name}</h4>
                                <p>{album.release_date}</p>
                                <p>Album popularity: {album.total_tracks}</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            ))
        }

        return <p>nothing found here</p>;
    }
    console.log(artist)
    
    return(
        <Container id="artist">
            <Row className="">

                {/* artist info */}
                <Col lg="4" id="artistProfile" className="bg-lightblue mb-5">
                    <Card  className="bg-lightblue artistCard">
                        <Card.Img
                            src={artist.images[0].url}
                            alt={artist.name}
                        />
                        <Card.Body className="artistBody">
                            <h2 className="display-3 ">{artist.name}</h2>
                            <p className="text-muted">Follower count: {artist.followers.total}</p>
                            <p className="text-muted">Artist popularity: {artist.popularity}/100</p>
                            <DisplayGenres artist={artist} />
                            <a href={artist.external_urls.spotify}>View artist on Spotify!</a>
                        </Card.Body>
                    </Card>
                </Col>

                {/* artist discography */}
                <Col className="col-8 discography">
                    <h2>{artist.name}'s discography</h2>
                    <Row className="">
                        <ShowAlbums />
                    </Row>
                </Col>
            </Row>
        </Container>
        // <h2>hi</h2>
    )
}

export default ViewArtist;