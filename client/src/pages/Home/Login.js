import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';

import {
  Form,
  Button,

} from "react-bootstrap";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  let userData;

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);

      userData = data;
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
    return;
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
                    <h3 className="">Login</h3>
                    <Form.Group>
                      <label>Email address</label>
                      <Form.Control
                        className="form-input"
                        placeholder="Your email"
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
                      className="btn w-100 btn-success btn-block mt-4"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      Login!
                    </Button>
                    <p className="forgot-password text-right mt-2">
                        Would you like to <a href="/signup">sign up</a> instead?
                    </p>
                  </Form>
                </div>
              </div>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
  );
};

export default Login;
