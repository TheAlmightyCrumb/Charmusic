import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ArtistPage({match}) {

    const [artistName, setArtistName] = useState('');
    const [artistImage, setArtistImage] = useState('');
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [artistSongs, setArtistSongs] = useState([]);

    const showArtistInfo = async () => {
        const { data } = await axios.get(`/artists/${match.params.id}`);
        setArtistName(data[0].Artist_Name);
        setArtistImage(data[0].Cover_img);
    }

    const showAlbums = async () => {
        const { data } = await axios.get('/albums');
        const albumsArr = data.filter(album => album.Artist_id == match.params.id)
            .map(item => <div key={item.Album_id}><Link to={`/albums/${item.Album_id}`}>{item.Album_Name}</Link></div>);
        setArtistAlbums(albumsArr);
    }

    const showSongs = async () => {
        const { data } = await axios.get('/songs');
        const songsArr = data.filter(song => song.Artist_id == match.params.id)
          .map(item => <div key={item.Song_id}><Link to={`/songs/${item.Song_id}?artist=${item.Artist_id}`}>{item.Title}</Link></div>);
        setArtistSongs(songsArr);
    }

    useEffect(() => {
        showArtistInfo();
        showAlbums();
        showSongs();
    }, []);

    return (
        <div>
            Name: {artistName} <br />
            Image: {artistImage} <br />
            Albums: {artistAlbums}
            Songs: {artistSongs}
        </div>
    )
}
