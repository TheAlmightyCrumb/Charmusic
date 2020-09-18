import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './AlbumPage.css';

export default function AlbumPage() {
    
    const [albumInfo, setAlbumInfo] = useState([]);
    const [artistName, setArtistName] = useState('');
    const [songList, setSongList] = useState([]);
     
    const { id } = useParams();

    const showAlbumInfo = async () => {
        const { data } = await axios.get(`/albums/${id}`);
        setAlbumInfo(...data);
        const artist = await axios.get(`/artists/${data[0].Artist_id}`);
        setArtistName(<div><Link to={`/artists/${artist.data[0].Artist_id}`}>{artist.data[0].Artist_Name}</Link></div>);
    }

    const showSongs = async () => {
        const { data } = await axios.get('/songs');
        const songsArr = data.filter(song => song.Album_id == id)
          .map(item => <div key={item.Song_id}><Link to={`/songs/${item.Song_id}?album=${item.Album_id}`}>{item.Title}</Link></div>);
        setSongList(songsArr);
    }

    useEffect(() => {
        showAlbumInfo();
        showSongs();
    }, []);

    return (
        <div>
            Name: {albumInfo.Album_Name}<br />
            Image: <img src={albumInfo.Cover_img} /><br />
            Artist: {artistName} <br />
            Songs: {songList}
        </div>
    )
}
