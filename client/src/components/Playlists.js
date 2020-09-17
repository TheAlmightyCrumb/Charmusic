import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Playlists() {

    const [playlists, setPlaylists] = useState([]);

    const showPlaylists = async () => {
        const { data } = await axios.get('/playlists');
        const playlistsArr = data;
        setPlaylists(playlistsArr.map(playlist => <li key={playlist.Playlist_id}><Link to={`/playlists/${playlist.Playlist_id}`}>{playlist.Playlist_Name}</Link></li>));
    }

    useEffect(() => {
        showPlaylists();
    }, []);
    
    return (
        <ol>
            {playlists}
        </ol>
    )
}
