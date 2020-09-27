import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';
import './Songs.css';
import lengthToTime from '../functions/lengthToTime';

export default function Songs() {

    const [songs, setSongs] = useState([]);

    const showSongs = async () => {
        const { data } = await axios.get('/songs');
        const songsArr = data;
        setSongs(songsArr.map(song => {
            return (
            <div key={song.id}>
                <Link to={`/songs/${song.id}`} className='songLink'>
                    <div className='song-title-container'>
                        <span className='song-title'>
                            <LibraryMusicSharpIcon />
                            <span style={{marginLeft: "5px"}}>{song.title}</span>
                        </span>
                        {/* <span style={{fontSize: "0.8em"}}>{song.Length.substring(3)}</span> */}
                        <span style={{fontSize: "0.8em"}}>{lengthToTime(song.length)}</span>
                    </div>
                </Link>
            </div>
            )
        }));
    }

    useEffect(() => {
        showSongs()
    }, []);
    
    return (
        <div className='song-container'>
            {songs}
        </div>
    )
}
