import { useState, useEffect } from 'react'
import Head from 'next/head'

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css'

import PopulateCarousel, { PopulateCarousel2 } from '../src/Carousel';
import { getTokenThenAlbumGenres } from './api/spotify';

// query 3 calls to spotify api to get three different sets of data for the carousel
const grabData = async (setAllAlbums, setLoading) => {
  const promises = {};

  try {
    promises.rock = await getTokenThenAlbumGenres('rock')
    promises.rap = await getTokenThenAlbumGenres('rap')
    promises.jazz = await getTokenThenAlbumGenres('jazz')
    
    const filteredResults = {}

    // filter results and assign to empty object to be passed as props to carousel
    Object.entries(promises).forEach(([key, val]) => {
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
    
    await setAllAlbums(filteredResults)
    setLoading(false);

  } catch (err) {
    console.error(err);
  }
}

export default function Home() {
  const [allAlbums, setAllAlbums] = useState([])
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    grabData(setAllAlbums, setLoading);
  }, [setAllAlbums])

  if (isLoading) {
    return (
      <h5>loading...</h5>
    )
  }

  return (
    <div>
      <PopulateCarousel queryResults={allAlbums.rock} queryTitle="Rock Albums" />
      <PopulateCarousel queryResults={allAlbums.rap} queryTitle="Rap Albums" />
      <PopulateCarousel queryResults={allAlbums.jazz} queryTitle="Jazz Albums" />
    </div>
  )
}
