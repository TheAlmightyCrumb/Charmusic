import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Artists() {

    const [artists, setArtists] = useState([]);
    
    const showArtists = async () => {
        const { data } = await axios.get('/artists');
        const artistsArr = data;
        setArtists(artistsArr.map(artist => <li key={artist.id}>{artist.Name}</li>));
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