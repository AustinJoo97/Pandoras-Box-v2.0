import React from 'react';
import Link from 'next/link'
import { Container, Col, Card } from "react-bootstrap";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from '../styles/Carousel.module.css';

// https://react-slick.neostack.com/docs/api
// slider settings

const settingsGen = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
};

const settingsNew = {
    dots: true,
    infinite: false,
    arrows: true,
    centerMode: false,
    centerPadding: '20px',
    dotsClass: 'slick-dots',
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1
};



// Populate function (statically set to album configuration)
const PopulateCarousel = ({ queryResults, queryTitle }) => {

    return (
        <Container>
            <Col>
                <h3 className={styles.carsouselTitle} >{queryTitle}</h3>
                <Slider {...settingsGen}>
                    <div>
                        {queryResults &&
                            queryResults.map((album) => (
                                <Col lg="3" key={album.albumId} className={styles.albumCard}>
                                        <Card.Body className="p-0 albumBody text-center">
                                            <Link href={`/album?q=${album.albumId}`}>
                                                <div className="embed-responsive">
                                                    <Card.Img
                                                        className="card-img-top embed-responsive-item"
                                                        variant="Top"
                                                        name={album.albumId}
                                                        src={album.albumImg} />
                                                </div>
                                            </Link>
                                            <h5>{album.albumName}</h5>
                                            <Link href={`/artist?q=${album.artistId}`}>
                                                <p>by {album.artistName}</p>
                                            </Link>
                                            <p>{album.totalTracks}</p>
                                        </Card.Body>
                                </Col>
                            ))}
                    </div>
                </Slider>
            </Col>
        </Container>

    )

}


export const PopulateCarousel2 = ({ queryResults, queryTitle }) => {

    return (
        <Container>
            <div>
                <h2>{queryTitle}</h2>
                <Slider {...settingsNew}>
                    {queryResults &&
                        queryResults.map((album) => (
                            <Col length="1" key={album.albumId} className={styles.albumCard} style="width: 70%">
                                <Link href={`/album?q=${album.albumId}`}>
                                    <div>
                                        <img
                                            name={album.albumId}
                                            src={album.albumImg} />
                                        <h5>{album.albumName}</h5>
                                        <p>length: {album.totalTracks} tracks</p>
                                    </div>
                                </Link>
                                <Link href={`/artist?q=${album.artistId}`}>
                                    <p>by {album.artistName}</p>
                                </Link>
                            </Col>
                        ))}
                </Slider>
            </div>


            {/* <Col>
                <h3 className={styles.carsouselTitle} >{queryTitle}</h3>
                <Slider {...settingsGen}>
                    <div>
                        {queryResults &&
                            queryResults.map((album) => (
                                <Col lg="3" key={album.albumId} className={styles.albumCard}>
                                    <Card className={styles.cardCarousel} >
                                        <Card.Body className="p-0 albumBody text-center">
                                            <Link href={`/album?q=${album.albumId}`}>
                                                <div className="embed-responsive">
                                                    <Card.Img
                                                        className="card-img-top embed-responsive-item"
                                                        variant="Top"
                                                        name={album.albumId}
                                                        src={album.albumImg} />
                                                </div>
                                            </Link>
                                            <h5>{album.albumName}</h5>
                                            <Link href={`/artist?q=${album.artistId}`}>
                                                <p>by {album.artistName}</p>
                                            </Link>
                                            <p>{album.totalTracks}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                    </div>
                </Slider>
            </Col> */}
        </Container>

    )

}

export default PopulateCarousel;


