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
        console.log(data);
        const albumArr = data.map(item => item.Album_Name);
        const distinctAlbumArr = [albumArr[0]];
        for (let i = 1; i < albumArr.length - 1; i++) {
            if (albumArr[i-1] !== albumArr[i]) {
                distinctAlbumArr.push(albumArr[i]);
            }
        }
        setArtistName(data[0].Artist_Name);
        setArtistImage(data[0].Cover_img);
        setArtistAlbums(distinctAlbumArr.map((album, i) => <div key={i}>{album}</div>));
        setArtistSongs(data.map((info, i) => <div key={i}><Link to={`/songs/${info.Song_id}?artist=${info.Artist_id}`}>{info.Title}</Link></div>));
    }

    useEffect(() => {
        showArtistInfo()
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
