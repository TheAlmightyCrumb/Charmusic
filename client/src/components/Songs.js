import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Songs() {

    const [songs, setSongs] = useState([]);
    
    const showSongs = async () => {
        const { data } = await axios.get('/songs');
        const songsArr = data;
        setSongs(songsArr.map(song => {
            return (
            <div 
            key={song.Song_id}
            >   {song.Title}
            </div>
            )
        }));
    }

    useEffect(() => {
        showSongs()
    }, []);
    
    return (
        <div>
            {songs}
        </div>
    )
}
