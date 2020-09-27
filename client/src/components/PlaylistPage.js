import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './PlaylistPage.css';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';
import lengthToTime from '../functions/lengthToTime';

export default function PlaylistPage() {
    
    const [playlistInfo, setPlaylistInfo] = useState([]);
    const [songList, setSongList] = useState([]);

    const { id } = useParams();

    const showPlaylistInfo = async () => {
        const { data } = await axios.get(`/playlists/${id}`);
        console.log('data: ', data);
        let songsArr = [];
        songsArr = data.songs.map(song => {
            // console.log(song.Song_id);
            return (
                <div key={song.id}>
                    <Link to={`/songs/${song.id}?playlist=${id}`} className='playlistPageLink'>
                        <div className='songTitleContainer'>
                            <span className='artistSongTitle'><LibraryMusicSharpIcon /><span style={{marginLeft: "5px"}}>{song.title}</span></span>
                            {/* <span style={{fontSize: "0.8em"}}>{song.Length.substring(3)}</span> */}
                            <span style={{fontSize: "0.8em"}}>{lengthToTime(song.length)}</span>
                        </div>
                    </Link>
                </div>
            )
        });
        setSongList(songsArr);
        setPlaylistInfo(data.playlist);
    }


    useEffect(() => {
        showPlaylistInfo();
    }, []);
    
    return (
        <div>
            <h1 id='playlistName'>{playlistInfo.playlistName}</h1>
            <div id='playlistWrapper'>
                <div id='playlistImageContainer'>
                    <img src={playlistInfo.coverImg} alt={playlistInfo.playlistName} id='playlistPageImage' />
                </div>
                <section id='playlist-song-section'>
                    <h3 id='songs-of-playlist'>Songs</h3>
                    <div id='playlist-song-container'>
                        {songList}
                    </div>
                </section>
            </div>
        </div>
    )
}
