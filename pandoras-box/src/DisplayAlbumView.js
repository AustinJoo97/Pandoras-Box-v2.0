import React from 'react';
import Link from 'next/link'

import { BsChatDots, BsHeart } from "react-icons/bs"
import { Container, Col, Card, Row, Button } from "react-bootstrap";
import { useMutation } from '@apollo/client';

import '../styles/AlbumPage.module.css';

import { ADD_NEW_FAVORITE } from './utils/mutations';

// add all genres
const DisplayGenres = ({ album }) => {
    let allGenres = [];

    if (!album.genres) {
        return <p>none listed</p>;
    }

    album.genres.forEach(genre => {
        if (allGenres.length === 0) {
            allGenres = genre
        } else {
            allGenres += `, ${genre}`;
        }
    })
    return (
        <p>{allGenres}</p>
    )

}

// will most likely itterate a track length as well
const TrackList = ({ album }) => {
    return album.tracks.items.map((track, idx) => (
        <div key={idx}>
            <span>{idx + 1}. </span>
            <p>{track.name}</p>
        </div>
    ))
}

const ViewAlbum = ({ album }) => {

    const [addNewFavorite, { error }] = useMutation(ADD_NEW_FAVORITE);

    const handleAddFavorite = async () => {
        if(album.genres[0] === undefined && album.genre === undefined){
            console.log('REDEFINING ALBUM GENRE')
            album.genre = '';
        } else {
            album.genre = album.genres[0].name
        }
    
        console.log(album.id, album.name, album.artists[0].name, album.images[0].url, album.genre)
        try {
          const { data } = await addNewFavorite({
            // variables: {...album}
            variables: { 
                // albumID: album._id || album.id,
                albumID: album.id,
                // 2VBcztE58pBKjIDS5oEgFh

                name: album.name,
                // Acid Rap

                // artist: album.artist || album.artists[0].name,
                artist: album.artists[0].name,
                // Chance the Rapper

                // image: album.image || album.images[0].url,
                image: album.images[0].url,
                // https://i.scdn.co/image/ab67616d0000b273d95ab48a8a9de3c4a2cbfe80

                genre: ''
                // ''
            },
          });
    
        } catch (e) {
          console.error(e);
        }
    };

    if (!album.artists) return null;
    console.log(album);
    return (
        <Container id="album">
            <Row className="d-flex">

                <Row id="albumHero" className="justify-content-md-around">

                    {/* album cover, icons, and fav/comments stats */}
                    <Col lg="4" className=" art-card ">
                        <Card className="art-card bg-lightblue">
                            <Card.Body className=" justify-content-center bg-lightblue art-card ">
                                <Card.Img
                                    className="card-img-top"
                                    src={album.image || album.images[0].url}
                                    alt={album.name}
                                    name={album._id || album.id}
                                />

                                <div className="mt-2">
                                    
                                </div>
                                <div className="icon-bar">
                                    <Button className="mx-1">
                                        <BsHeart 
                                        onClick={handleAddFavorite}/>
                                    </Button>
                                    {/* <Button className="mx-1">
                                        <BsChatDots />
                                    </Button> */}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* album information */}
                    <Col lg="8" id="albumInfo">

                        <h3 id="albumTitle" className="">{album.name}</h3>

                        <div>
                            <span>Artist:</span>
                            <Link className="artist-link" href={`/artist?q=${album.artists[0].id}`}>
                                <p>{album.artist || album.artists[0].name}</p>
                            </Link>
                        </div>

                        <div>
                            <span>Release type:</span>
                            <p>{album.album_type}</p>
                        </div>

                        <div>
                            <span>released:</span>
                            <p>{album.release_date}</p>
                        </div>

                        <div>
                            <span>Total tracks:</span>
                            <p>{album.tracks.total}</p>
                        </div>

                        <div>
                            <span>Album popularity:</span>
                            <p>{album.popularity} / 100</p>
                        </div>

                        <div>
                            <span>Record Label:</span>
                            <p>{album.label}</p>
                        </div>


                        <div>
                            <h4><a href={album.external_urls.spotify} className="">Listen on Spotify!</a></h4>
                        </div>
                    </Col>
                </Row>

                {/* track list */}
                <Row id="trackList" className=" justify-content-center mt-5">
                    <section className="col-10">
                        <h2 className="mx-3">Track list</h2>
                        <TrackList album={album} />
                    </section>
                </Row>
            </Row>
        </Container>
    )

}

export default ViewAlbum;