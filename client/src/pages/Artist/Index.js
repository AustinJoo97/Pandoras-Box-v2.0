import { useEffect, useState } from 'react';
import { getTokenThenArtistsDetails, getTokenThenArtistAlbums } from '../utils/API';

import ViewArtist from './DisplayArtistView';


const queryArtist = async (setArtistData, setLoading) => {
    const params = new URLSearchParams(window.location.search);
    const artistId = params.get('q')
    const allArtistInfo = {};

    // grab albums
    allArtistInfo.albums = await getTokenThenArtistAlbums(artistId);


    // search for artist info
    allArtistInfo.artist = await getTokenThenArtistsDetails(artistId);
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