import React, { useState } from 'react';
import Link from 'next/link';

import {
  Form,
  Button,
  Container,

} from "react-bootstrap";

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../src/utils/mutations';
import Auth from '../src/utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  let userData;

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);

      userData = data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
          <div className="mt-5">
            {userData ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <div className="auth-wrapper">
                <div className="auth-inner">
                <Form onSubmit={handleFormSubmit}>
                  <h3>Sign Up</h3>
                  <Form.Group className="mt-2">
                    <label>Username</label>
                    <Form.Control
                      label="Username"
                      className="form-input"
                      placeholder="Your username"
                      name="username"
                      type="text"
                      value={formState.username}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <label>Email address</label>
                    <Form.Control
                    className="form-input"
                    placeholder="Your Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <label>Password</label>
                    <Form.Control
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    />
                  </Form.Group>
                  <Button
                    className="btn btn-success w-100 btn-block mt-4"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Sign up!
                  </Button>
                  <p className="forgot-password text-right mt-2">
                      Would you like to <a href="/login">login</a> instead?
                  </p>
                </Form>
                </div>
              </div>
            )}

            {error && (
              <Container className="my-3 p-3 bg-danger text-white">
                {error.message}
              </Container>
            )}
          </div>
  );
};

export default Signup;
