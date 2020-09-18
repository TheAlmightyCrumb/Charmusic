import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideSongs from './SideSongs';
import { Link } from 'react-router-dom';

export default function SongPage({ match, location }) {

    const [songInfo, setSongInfo] = useState([]);

    const showSongInfo = async () => {
        const { data } = await axios.get(`/songs/${match.params.id}`);
        console.log(data);
        setSongInfo(...data);
    }

    useEffect(() => {
        showSongInfo()
    }, [location]);

    const fullScreen = () => {
        const elem = document.querySelector('.media');
        // elem.webkitRequestFullScreen();
        // const dbclick = setInterval(() => { elem.click(); console.log('boo') }, 200);
        // setTimeout(() => clearInterval(dbclick), 1000);
    }

    return (
        <div>
            Title: {songInfo.Title} <br />
            Artist: <Link to={`/artists/${songInfo.Artist_id}`}> {songInfo.Artist_Name} </Link><br />
            Album: <Link to={`/albums/${songInfo.Album_id}`}> {songInfo.Album_Name} </Link><br />
            <iframe onLoad={() => fullScreen()} className='media' src={songInfo.Youtube} frameBorder="0" allow="autoplay"></iframe><br />
            Length: {songInfo.Length}<br />
            Lyrics: {songInfo.Lyrics}
            <SideSongs query={location.search} idParam={match.params.id} />
        </div>
    )
}
