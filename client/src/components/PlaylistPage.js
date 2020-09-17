import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useHistory } from 'react-router-dom';

export default function PlaylistPage() {
    
    const [playlistInfo, setPlaylistInfo] = useState([]);
    const [songList, setSongList] = useState([]);

    const { id } = useParams();

    const showPlaylistInfo = async () => {
        const { data } = await axios.get('/playlists');
        console.log(data);
        setPlaylistInfo(data.find(playlist => playlist.Playlist_id == id));
    }

    const showSongsList = async () => {
        const songs = await getSongs();
        console.log(songs);
        const { data } = await axios.get(`/playlist/songs/${id}`);
        let songsArr = [];
        for (let i = 0; i < data.length; i++) {
            songsArr.push(songs.find(song => song.Song_id == data[i].Song_id));
        }
        songsArr = songsArr.map(song => {
            console.log(song.Song_id);
            return <div key={song.Song_id}><Link to={`/songs/${song.Song_id}?playlist=${id}`}>{song.Title}</Link></div>
        });
        setSongList(songsArr);
    }

    const getSongs = async () => {
        const { data } = await axios.get('/songs');
        return data;
    }

    useEffect(() => {
        showPlaylistInfo();
        showSongsList();
    }, []);
    
    return (
        <div>
            Image: {playlistInfo.Cover_img}<br />
            Playlist Name: {playlistInfo.Playlist_Name} <br />
            Songs:
            {songList}
        </div>
    )
}
