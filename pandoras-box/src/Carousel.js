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
    arrows: true,
    centerMode: true,
    centerPadding: '0px',
    dotsClass: 'slick-dots',
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 3,
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
            breakpoint: 1140,
            settings: {
                slidesToShow: 4,
            }
        }
    ]
};



// Populate function 
// currently set to handle album data, but can be changed to accommodate other data like artists
export const PopulateCarousel = ({ queryResults, queryTitle }) => {

    return (
        <div className={styles.albumsRow}>
            <h2 className={styles.carsouselTitle}>{queryTitle}</h2>
            <Slider {...settingsNew}>

                {queryResults &&
                    queryResults.map((album) => (
                        <div length="1" key={album.albumId} className={styles.albumCard}>
                            <div>
                                <img
                                    name={album.albumId}
                                    src={album.albumImg} />
                                <Link href={`/album?q=${album.albumId}`}>
                                    <h5>"{album.albumName}"</h5>
                                </Link>

                                <Link href={`/artist?q=${album.artistId}`}>
                                    <p>{album.artistName}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
            </Slider>

        </div>

    )
}

export default PopulateCarousel;


