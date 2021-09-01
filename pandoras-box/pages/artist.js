import { useEffect, useState } from 'react';
import { getTokenThenArtistsDetails, getTokenThenArtistAlbums } from './api/spotify.js';

import ViewArtist from '../src/DisplayArtistView';

// function that grabs artist details as well as all albums
const queryArtist = async (setArtistData, setLoading) => {

    // get qeury search from URL.
    const params = new URLSearchParams(window.location.search);
    const artistId = params.get('q')

    // create empty object to store both of these searches under 'allArtistInfo';
    const allArtistInfo = {};

    // grab data
    allArtistInfo.albums = await getTokenThenArtistAlbums(artistId);
    allArtistInfo.artist = await getTokenThenArtistsDetails(artistId);

    // set state to this new object.
    await setArtistData(allArtistInfo);
    setLoading(false);
}


const ArtistPage = () => {
    const [artistData, setArtistData] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        queryArtist(setArtistData, setLoading)
    }, [setArtistData])
   

    if (isLoading) {
        return (
            <h5>Loading...</h5>
        )
    }
    return (
        <div>
            <ViewArtist artist={artistData.artist} albums={artistData.albums} />
        </div>
    )
}

export default ArtistPage;