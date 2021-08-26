import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GiAbstract082, GiAbstract020, GiAbstract041 } from "react-icons/gi";

import {
    Card,
    ListGroupItem,
    Col,
} from "react-bootstrap";

import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

  const UserSettings = ({ userDetails }) => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { 
      username: userParam,
      email: userParam,
      location: userParam,
      bio: userParam,
      proPic: userParam,
     },
  });


  // redirect to personal profile page if username is yours
  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

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
    <Col lg={8} className="">
      <Card className="ml-5 mr-5 mt-5 mb-4 pt-3 settingsCard">
        <Card.Header className="text-center  settingsHeader">
          <div className="mb-3 mx-auto">
            <ShowAvatar />
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
    );
  };

  //test information
  UserSettings.defaultProps = {
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


  // UserSettings.defaultProps = {
  //   userDetails: {
  //     name: Auth.getProfile().data.name,
  //     email: Auth.getProfile().data.email,
  //     avatar: "https://via.placeholder.com/150",
  //     location: Auth.getProfile().data.location,
  //     metaTitle: "Description",
  //     metaValue:
  //     Auth.getProfile().data.bio
  //   }
  // };
  
export default UserSettings;
  