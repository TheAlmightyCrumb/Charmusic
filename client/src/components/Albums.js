import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Albums() {

    const [albums, setAlbums] = useState([]);
    
    const showAlbums = async () => {
        const { data } = await axios.get('/albums');
        const albumsArr = data;
        setAlbums(albumsArr.map(album => <li key={album.id}>{album.Album_Name}</li>));
    }

    useEffect(() => {
        showAlbums()
    }, []);
    
    return (
        <ol>
            {albums}
        </ol>
    )
}

