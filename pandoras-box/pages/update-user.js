import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import UserSettings from '../src/UserSettings';
import SettingsUpdate from '../src/SettingsUpdate';

import {
  Card,
  ListGroup,
  Row,
  Container
} from "react-bootstrap";

import { QUERY_USER, QUERY_ME } from '../src/utils/queries';
import Auth from '../src/utils/auth';

const UpdateUser = ({ userDetails }) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // redirect to personal profile page if username is yours
  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading) {
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

  return (
    <Container>
      <Card className="mb-4 bg-lightblue-dull">
        <Card.Header className="border-bottom">
          <h6 className="m-0">{user.username}'s Profile Settings</h6>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            <Row>
            <UserSettings />
            <SettingsUpdate />
            </Row>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};



export default UpdateUser;
