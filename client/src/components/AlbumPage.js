import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

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
        // <div>
        //     Name: {albumInfo.Album_Name}<br />
        //     Image: <img src={albumInfo.Cover_img} /><br />
        //     Artist: {artistName} <br />
        //     Songs: {songList}
        // </div>
        <div>
        <h1 id='albumName'> {albumInfo.Album_Name} </h1>
        <div id='albumWrapper'>
            <div id='albumImageContainer'>
                <img src={albumInfo.Cover_img} alt={albumInfo.Album_Name} id='albumPageImage' />
            </div>
            <section id='artistSection'>
                <h3 id='artist-of-album'>Albums</h3>
                <div id='artist-container'>
                    {artistName}
                </div>
            </section>
            <section id='songSection'>
                <h3 id='artistSongs'>Songs</h3>
                <div id='songsContainer'>
                   {artistSongs}
                </div>
            </section>
        </div>
    </div>
    )
}
