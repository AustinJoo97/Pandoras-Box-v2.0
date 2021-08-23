import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Col, Card } from "react-bootstrap";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import '../../styles/Carousel.css';
import '../../styles/SearchPage.css';

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

const showArtistCards = (queryResults, queryTitle) => {
    if (!queryResults.items) return null;

    return (
        <Container>
            <Col>
                <h3 className="p-3 pl-2 pt-5  carsouselTitle" >{queryTitle}</h3>
                <Slider {...settingsMin}>
                    {queryResults &&
                        queryResults.items.map((album) => (
                            <Col lg="3" key={album.id} className="albumCard">
                                <Link to={`/album?q=${album.id}`} className="text-decoration-none">
                                    <Card className="mx-3 cardCarousel ">
                                        <Card.Body className="p-0 albumBody text-center">
                                            <div className="embed-responsive">
                                                <Card.Img
                                                    className="card-img-top embed-responsive-item"
                                                    variant="Top"
                                                    name="songName"
                                                    src={album.images[0].url}
                                                />
                                            </div>
                                            <h4>
                                                {album.name}
                                            </h4>
                                            <p>Year released: {album.release_date}</p>
                                            <p>Total tracks: {album.total_tracks}</p>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                </Slider>
            </Col>
        </Container>
    )
}

const ShowAlbumCards = (queryResults, queryTitle) => {
    // console.log(queryResults)
    console.log(queryResults.queryResults[0].albumName)
    return (
        <Container>
            <Col>
                <h3 className="p-3 pl-2 pt-5  carsouselTitle" >{queryTitle}</h3>
                <Slider {...settingsGen}>
                    {queryResults.queryResults &&
                        queryResults.queryResults.map((album) => (
                            <h1 key={album.albumId}>{album.albumName}</h1>
                            // <Col lg="3" key={album.id} className="albumCard">
                            //     <Link to={`/album?q=${album.id}`} className="text-decoration-none">
                            //         <Card className="mx-3 cardCarousel ">
                            //             <Card.Body className="p-0 albumBody text-center">
                            //                 <div className="embed-responsive">
                            //                     <Card.Img
                            //                         className="card-img-top embed-responsive-item"
                            //                         variant="Top"
                            //                         name="songName"
                            //                         src={album.images[0].url}
                            //                     />
                            //                 </div>
                            //                 <h5>
                            //                     {album.name}
                            //                 </h5>
                            //                 <p>Year released: {album.release_date}</p>
                            //                 <p>Total tracks: {album.total_tracks}</p>
                            //             </Card.Body>
                            //         </Card>
                            //     </Link>
                            // </Col>
                        ))}
                </Slider>
            </Col>
        </Container>
    )
}

const showCommentCards = (queryResults, queryTitle) => {
    return (
        <Container>
            <Col>
                <h3 className="p-3 pl-2 pt-5  " >{queryTitle}</h3>
                <Slider {...settingsComments}>
                    {queryResults &&
                        queryResults.items.map((album) => (
                            <Col lg="3" key={album.id} className="albumCard">
                                <Link to={`/album?q=${album.id}`} className="text-decoration-none">
                                    <Card className="mx-3 cardCarousel ">
                                        <Card.Body className="p-0 albumBody">
                                            <div className="embed-responsive">
                                                <Card.Img
                                                    className="card-img-top embed-responsive-item"
                                                    variant="Top"
                                                    name="songName"
                                                    src={album.images[0].url}
                                                />
                                            </div>
                                            <p>
                                                {album.name}
                                            </p>
                                            <p>Year released: {album.release_date}</p>
                                            <p>Total tracks: {album.total_tracks}</p>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                </Slider>
            </Col>
        </Container>
    )
}


// Populate function (statically set to album configuration)
const PopulateCarousel = ({ queryResults, queryTitle }) => {

    return (


        <Container>
            <Col>
                <h3 className="p-3 pl-2 pt-5  carsouselTitle" >{queryTitle}</h3>
                <Slider {...settingsGen}>
                    {queryResults &&
                        queryResults.map((album) => (
                            // <h1 key={album.albumId}>{album.albumName}</h1>
                            <Col lg="3" key={album.albumId} className="albumCard">
                                <Card className="mx-3 cardCarousel ">
                                    <Card.Body className="p-0 albumBody text-center">
                                        <Link to={`/album?q=${album.albumId}`} className="text-decoration-none">
                                            <div className="embed-responsive">
                                                <Card.Img
                                                    className="card-img-top embed-responsive-item"
                                                    variant="Top"
                                                    name={album.albumId}
                                                    src={album.albumImg}
                                                />
                                            </div>
                                            <h5>{album.albumName}</h5>
                                        </Link>
                                        <Link to={`/artist?q=${album.artistId}`} >
                                            <p>by {album.artistName}</p>
                                        </Link>
                                        <p>{album.totalTracks} tracks</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Slider>
            </Col>
        </Container>

    )

}

export default PopulateCarousel;


