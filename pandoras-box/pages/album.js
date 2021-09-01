import { useEffect, useState } from 'react';
import { getTokenThenSingleAlbumDetails } from './api/spotify.js';

import ViewAlbum from '../src/DisplayAlbumView';

const queryAlbum = async (setAlbum) => {
    const params = new URLSearchParams(window.location.search);
    const albumId = params.get('q')

    const response = await getTokenThenSingleAlbumDetails(albumId);
    setAlbum(response)
}

const AlbumPage = () => {
    const [albumData, setAlbum] = useState([])

    useEffect(() => {
        queryAlbum(setAlbum);
    }, [setAlbum])

    console.log(albumData)
    return (
        <div>
            <ViewAlbum
                album={albumData}
            />
        </div>
    )
}

export default AlbumPage;