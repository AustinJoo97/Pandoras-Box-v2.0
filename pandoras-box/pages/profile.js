import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import YourRecentComments from '../components/YourRecentComments';
import UserSettings from '../components/UserSettings';
import PopulateCarousel from '../components/Carousel';

import { GiAbstract082, GiAbstract020, GiAbstract041 } from "react-icons/gi";

import { artistAlbumsSampleData, artistSearchSampleData } from '../utils/sampleData';
import {
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Container
} from "react-bootstrap";

import { QUERY_USER, QUERY_ME, QUERY_USER_COMMENTS, QUERY_FAVORITE_ALBUMS } from '../utils/queries';
import { UPDATE_USER, DELETE_FAVORITE } from '../utils/mutations';
import { getTokenThenSingleAlbumDetails } from '../utils/API'
import Auth from '../utils/auth';

const callSpotify = async (id, albumImages) => {
  await getTokenThenSingleAlbumDetails(id).then(res => {
    albumImages.push({id:id, img:res.images[1].url});
    // return (
    //   <img src={res.images[1].url} alt="no peek"></img>
    // );
  })
}


const grabFavAlbums = async(favArray, setFavoriteAlbums) => {
  // console.log(favArray)
  let arr = []
  favArray.map(album => {
    arr.push(album._id);
  })

  let albumImages = [];
  const unresolvedPromises = arr.map(id => callSpotify(id, albumImages))
  
  await Promise.all(unresolvedPromises)
  console.log(albumImages)
  setFavoriteAlbums(albumImages)
  // return albumImages

}

const divstyle = {
  display: "flex",
  // fontFamily: "Arial"
};

const imgstyle = {
  width: "150px",
  height: "150px",
  padding: "10px"
}

const Profile = ({ userDetails }) => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_ME);
  const { loadingUserComments, userCommentData } = useQuery(QUERY_USER_COMMENTS);
  const { loadingFavoriteAlbums, favoriteAlbumsData } = useQuery(QUERY_FAVORITE_ALBUMS);
  const [ updateUser, { updadteUserError }] = useMutation(UPDATE_USER);
  const [ deleteFavorite, { deleteFavoritesError } ] = useMutation(DELETE_FAVORITE);

  const [favoriteAlbumsList, setFavoriteAlbums] = useState([])
  // const [isLoading, setLoading] = useState(true);

  
  // redirect to personal profile page if username is yours
  const user = data?.me || data?.user || {};
  


  let userComments;
  loadingUserComments ? console.log('Still loading user comments!') : userComments = userCommentData;

  let favoriteAlbums;
  loadingFavoriteAlbums ? console.log('Still loading favorite!') : favoriteAlbums = favoriteAlbumsData;

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading || loadingUserComments || loadingFavoriteAlbums) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const myFavorites = data.me.favorites;
  
  if (!favoriteAlbumsList.length) {
    grabFavAlbums(myFavorites, setFavoriteAlbums)
  }
  // let displayAlbums = grabFavAlbums(myFavorites, setFavoriteAlbums)
  // console.log(displayAlbums)
  
  const ShowAvatar = ({}) => {
    if (user.proPic === "GiAbtract82") {
      return <GiAbstract082 className="avatar" size={120}/>
    } else if (user.proPic === "GiAbtract20"){
      return <GiAbstract020 className="avatar" size={120}/>
    } else {
      return <GiAbstract041 className="avatar" size={120}/>
    } 
  }

  return (
    <Container>
      
      <Card className="mb-4 bg-grey">
        <Card.Header className="border-bottom">
          <h6 className="m-0 profileName text-center">{user.username}'s Profile</h6>
        </Card.Header>
        <Card.Body>
          <ListGroup >
            <Row>
              <Col xs={2} md={4} lg={6} className="">
                  <Card className="ml-5 mr-5 mt-5 mb-4 pt-3 settingsCard">
                    <Card.Header className="text-center  settingsHeader">
                      <div className="mb-3 mx-auto">
                      <ShowAvatar/>
                      </div>
                      <h4 className="mb-0">{Auth.getProfile().data.username}</h4>
                      <span className="d-block mb-2">{user.location}</span>
                    </Card.Header>
                    <Card.Body className="settingsBody">
                        <div className="progress-wrapper">
                          <strong className="text-muted d-block mb-2 ">
                            <Col>
                            <h3>
                              Name :  {user.name}
                            </h3>
                            </Col>
                            <Col>
                            <h3>
                              Email :  {user.email}
                            </h3>
                            </Col>
                          </strong>
                        </div>
                        <h3 className="text-muted d-block mb-2">
                          {userDetails.metaTitle}
                        </h3>
                        <h3>{user.bio}</h3>
                    </Card.Body >
                  </Card>
              </Col>
                
              <div className="col-4 fav-albums" style={divstyle}>
              
                  {favoriteAlbumsList.map(item => (
                    <a href={`/album?q=${item.id}`}><img key={item.id} src={item.img} alt="album" style={imgstyle}></img></a>
                  ))}
              </div>

              {/* <Col xs={2} md={4} lg={6}>
              <PopulateCarousel queryResults={favoriteAlbums} queryType="min" queryTitle="Your Favorite Albums"/>
              </Col> */}
              <YourRecentComments />
            </Row>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

Profile.defaultProps = {
  userDetails: {
    name: "Brandon Ford",
    email: "brandonford617@yahoo.com",
    avatar: "https://via.placeholder.com/150",
    location: "Ashburn Va",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
};

export default Profile;
