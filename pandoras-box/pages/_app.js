import { ApolloProvider } from "@apollo/client";
import { useApollo } from '../apollo-client'
import Head from 'next/head'


import Header from '../src/Header'
import Footer from '../src/Footer'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Pandora's Box</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>

      <div className="Site relative">
        <Header />
        <div className="Site-content mx-auto w-full ">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  )
}

export default MyApp
