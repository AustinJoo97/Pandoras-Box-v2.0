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
    accessibility: true,
    dots: true,
    infinite: true,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    dotsClass: 'slick-dots',
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 4,
    responsive: [
        {
            breakpoint: 1340,
            settings: {
                slidesToShow: 5,
                centerPadding: '5px'
            }
        },
        {
            breakpoint: 980,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 760,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            }
        }
    ]
};



// Populate function 
// currently set to handle album data, but can be changed to accommodate other data like artists
export const PopulateCarousel = ({ queryResults, queryTitle }) => {

    return (
        <Container className="mt-5 carsousel-container">
            <Col>
                <div className={styles.albumsRow}>
                    <h2 className={styles.carsouselTitle}>{queryTitle}</h2>
                    <Slider {...settingsNew}>

                        {queryResults &&
                            queryResults.map((album) => (
                                <Col lg="3" key={album.albumId} className={styles.albumCard}>
                                    <Card className={styles.cardCarousel}>
                                        <Card.Body className= {styles.albumBody}>
                                            <div className="embed-responsive">
                                                <Card.Img
                                                    className="card-img-top embed-responsive-item"
                                                    variant="Top"
                                                    name={album.albumId}
                                                    src={album.albumImg}
                                                />
                                            </div>
                                            <Link href={`/album?q=${album.albumId}`}>
                                                <h5>"{album.albumName}"</h5>
                                            </Link>
                                            <Link href={`/artist?q=${album.artistId}`}>
                                                <h4>{album.artistName}</h4>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                    </Slider>
                </div>
            </Col>
        </Container>
    )
}

export default PopulateCarousel;


