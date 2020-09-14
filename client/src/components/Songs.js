import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Songs() {

    const [songs, setSongs] = useState([]);
    
    const showSongs = async () => {
        const { data } = await axios.get('/songs');
        const songsArr = data;
        setSongs(songsArr.map(song => <li key={song.id}>{song.Title}</li>));
    }

    useEffect(() => {
        showSongs()
    }, []);
    
    return (
        <ol>
            {songs}
        </ol>
    )
}
