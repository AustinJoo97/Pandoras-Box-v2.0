import React from 'react';
import Link from 'next/link'
import { Container, Col, Card } from "react-bootstrap";
import Slider from "react-slick";

// Import css files
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import '../styles/Carousel.module.css';
// import '../styles/SearchPage.css';

const settingsMin = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const settingsGen = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
};

const settingsComments = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
};



// Populate function (statically set to album configuration)
const PopulateCarousel = ({ queryResults, queryTitle }) => {

    return (

        <div>
            {queryResults &&
                queryResults.map((album) => (
                    <div key={album.albumId}>
                        <Link href={`/album?q=${album.albumId}`}>
                            <img name={album.albumId} src={album.albumImg} />
                        </Link>
                        <h5>{album.albumName}</h5>
                        <Link href={`/artist?q=${album.artistId}`}>
                            <p>by {album.artistName}</p>
                        </Link>
                        <p>{album.totalTracks}</p>
                    </div>
                ))}
        </div>


    )

}

export default PopulateCarousel;


