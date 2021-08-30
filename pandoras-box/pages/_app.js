import '../styles/globals.css'
import { ApolloProvider } from "@apollo/client";
import { useApollo } from '../apollo-client'

import Header from '../src/Header'
import Footer from '../src/Footer'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
  <ApolloProvider client={apolloClient}>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </ApolloProvider>
  )
}

export default MyApp
