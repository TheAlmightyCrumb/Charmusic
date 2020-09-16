import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Albums() {

    const [albums, setAlbums] = useState([]);
    
    const showAlbums = async () => {
        const { data } = await axios.get('/albums');
        const albumsArr = data;
        setAlbums(albumsArr.map(album => <li key={album.Album_id}><Link to={`/albums/${album.Album_id}`}>{album.Album_Name}</Link></li>));
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

