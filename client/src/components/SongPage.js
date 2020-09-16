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

    return (
        <div>
            Title: {songInfo.Title} <br />
            Artist: <Link to={`/artists/${songInfo.Artist_id}`}> {songInfo.Artist_Name} </Link><br />
            Album: <Link to={`/albums/${songInfo.Album_id}`}> {songInfo.Album_Name} </Link><br />
            {/* <iframe width="560" height="315" src={songInfo.Youtube} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe><br /> */}
            Length: {songInfo.Length}<br />
            Lyrics: {songInfo.Lyrics}
            <SideSongs query={location.search} idParam={match.params.id} />
        </div>
    )
}
