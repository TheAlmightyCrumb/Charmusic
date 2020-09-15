import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Artists() {

    const [artists, setArtists] = useState([]);
    
    const showArtists = async () => {
        const { data } = await axios.get('/artists');
        const artistsArr = data;
        setArtists(artistsArr.map(artist => <li key={artist.Artist_id}><Link to={`/artists/${artist.Artist_id}`}>{artist.Artist_Name}</Link></li>));
    }

    useEffect(() => {
        showArtists()
    }, []);
    
    return (
        <ol>
            {artists}
        </ol>
    )
}