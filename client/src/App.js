// Hooks
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';


// pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Artist from './pages/Artist';
import Album from './pages/Album'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Search from './pages/Search'
import Test from './pages/Test';

// components
import Header from './components/Header';
import Footer from './components/Footer';

import UpdateUser from './pages/UpdateUser';

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/login-signup.css";
import "./styles/index.css";



// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});


// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="Site relative">
          {}
          <Header/>
          <div className="Site-content mx-auto w-full ">
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/me">
              <Profile />
            </Route>

            <Route exact path="/profiles/:username">
              <Profile />
            </Route>

            <Route exact path="/settings">
              <UpdateUser />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>
            
            <Route exact path="/artist">
              <Artist />
            </Route>

            <Route exact path="/album">
              <Album />
            </Route>

            <Route exact path="/search">
              <Search />
            </Route>

            <Route exact path="/test">
              <Test />
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
