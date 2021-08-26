import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css'

import PopulateCarousel from '../src/Carousel';
import { getTokenThenAlbumGenres } from './api/spotify';

// query 3 calls to spotify api to get three different sets of data for the carousel
const grabData = async (setAllAlbums, setLoading) => {
  const promises = {};

  try {
    promises.rock = await getTokenThenAlbumGenres('rock')
    promises.rap = await getTokenThenAlbumGenres('rap')
    promises.jazz = await getTokenThenAlbumGenres('jazz')
    
    const filteredResults = {}

    // for each entry in the promise object...
    Object.entries(promises).forEach(([key, val]) => {
      // set promise's name = to an array of the newly named values using map
      filteredResults[key] = val.map(album => ({
        albumName: album.name,
        artistName: album.artists[0].name,
        albumImg: album.images[0].url,
        albumId: album.id,
        artistId: album.artists[0].id,
        totalTracks: album.total_tracks
      })
      )
    })
    // console.log(filteredResults)

    // Set our state as this object of filtered results, turn off loading
    await setAllAlbums(filteredResults)
    setLoading(false);

  } catch (err) {
    console.error(err);
  }
}

export default function Home() {

  const [allAlbums, setAllAlbums] = useState([])
  const [isLoading, setLoading] = useState(true);


  // run function that will start the queries to spotify API
  // what specifically is getting searched is handled in there
  // pass in our stateChange function to hold our data after all all data was fetched
  useEffect(() => {
    grabData(setAllAlbums, setLoading);
  }, [setAllAlbums])

  // console.log(allAlbums.rap)

  if (isLoading) {
    return (
      <h5>loading...</h5>
    )
  }

  return (
    <div>
      <Head>
        <title>Pandora's Box</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PopulateCarousel queryResults={allAlbums.rap} queryTitle="Rap Albums" />
      

     
    </div>
  )
}
