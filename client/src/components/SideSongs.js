import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';
import lengthToTime from '../functions/lengthToTime';

export default function SideSongs({ query, idParam }) {

    const [list, setList] = useState([]);

    const showList = async () => {
        if (query) {
            const { data } = await axios.get(`/songs/${idParam}${query}`);
            setList(data.map(song => {
                return (
                    <div key={song.id}>
                        <Link to={`/songs/${song.id}${query}`} className='side-song-link'>
                            <div className='side-song-title-container'>
                                <span className='side-song-title'>
                                    <LibraryMusicSharpIcon />
                                    <span style={{marginLeft: "5px"}}>{song.title}</span>
                                </span>
                                {/* <span style={{fontSize: "0.8em"}}>{song.Length.substring(3)}</span> */}
                                <span style={{fontSize: "0.8em"}}>{lengthToTime(song.length)}</span>
                            </div>
                        </Link>
                    </div>
                );
            }))
        } else {
            const { data } = await axios.get('/songs');
            setList(data.filter(song => song.id != idParam)
                .map(song => {
                    return (
                        <div key={song.id}>
                            <Link to={`/songs/${song.id}`} className='side-song-link'>
                                <div className='side-song-title-container'>
                                    <span className='side-song-title'>
                                        <LibraryMusicSharpIcon />
                                        <span style={{marginLeft: "5px"}}>{song.title}</span>
                                    </span>
                                    {/* <span style={{fontSize: "0.8em"}}>{song.Length.substring(3)}</span> */}
                                    <span style={{fontSize: "0.8em"}}>{lengthToTime(song.length)}</span>
                                </div>
                            </Link>
                        </div>
                    );
                }))
        }
    }

    useEffect(() => {
        showList()
    }, [idParam])

    return (
        <div id='side-songs-container'>
            {list}
        </div>
    )
}
