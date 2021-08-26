import '../styles/globals.css'
import { ApolloProvider } from "@apollo/client";
import { useApollo } from '../apollo-client'

import Header from '../src/Header'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
  <ApolloProvider client={apolloClient}>
    <Header />
    <Component {...pageProps} />
  </ApolloProvider>
  )
}

export default MyApp
