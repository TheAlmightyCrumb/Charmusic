import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Albums() {

    const [albums, setAlbums] = useState([]);
    
    const showAlbums = async () => {
        const { data } = await axios.get('/albums');
        const albumsArr = data;
        setAlbums(albumsArr.map(album => {
            return (
                <div key={album.Album_id}>
                    <Link to={`/albums/${album.Album_id}`}>
                    <img src={album.Cover_img} className='albumImage' />
                    <div className='albumName'>{album.Album_Name}</div>
                </Link></div>
            );
        }));
    }

    useEffect(() => {
        showAlbums()
    }, []);
    
    return (
        <div className='albumContainer'>
            {albums}
        </div>
    )
}

