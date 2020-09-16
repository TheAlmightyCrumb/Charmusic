import React, { useState, useEffect } from 'react'
import axios from 'axios';
import logo from '../c8ffe006-9009-4fc2-aa49-894884473503_200x200.png';
import Carousel from 'react-elastic-carousel';

export default function Home() {

    const [topSongs, setTopSongs] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [topPlaylists, setTopPlaylists] = useState([]);

    const showTopSongs = async () => {
        const { data } = await axios.get('/top/songs');
        const songsArr = data.map(song => <div>{song.Title}</div>
        );
        setTopSongs(songsArr);
    }

    const showTopAlbums = async () => {
        const { data } = await axios.get('/top/albums');
        const albumsArr = data.map(album => <div>{album.Album_Name}</div>
        );
        setTopAlbums(albumsArr);
    }

    const showTopArtists = async () => {
        const { data } = await axios.get('/top/artists');
        const artistsArr = data.map(artist => <div>{artist.Artist_Name}</div>
        );
        setTopArtists(artistsArr);
    }

    const showTopPlaylists = async () => {
        const { data } = await axios.get('/top/playlists');
        const playlistsArr = data.map(playlist => <div>{playlist.Playlist_Name}</div>
        );
        setTopPlaylists(playlistsArr);
    }

    useEffect(() => {
        showTopSongs();
        showTopAlbums();
        showTopArtists();
        showTopPlaylists();
    }, []);

    return (
        <div className='carousel'>
            <Carousel
             itemsToShow={5}
             itemsToScroll={1}
            >
                {topSongs}
            </Carousel>
            <br />
            <Carousel
             itemsToShow={5}
             itemsToScroll={1}
            >
                {topAlbums}
            </Carousel>
            <br />
            <Carousel
             itemsToShow={5}
             itemsToScroll={1}
            >
                {topArtists}
            </Carousel>
            <Carousel
             itemsToShow={5}
             itemsToScroll={1}
            >
                {topPlaylists}
            </Carousel>
        </div>
    )
}
