import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideSongs from './SideSongs';

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
            Artist: {songInfo.Artist_Name} <br />
            Album: {songInfo.Album_Name} <br />
            {/* <iframe width="560" height="315" src={songInfo.Youtube} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe><br /> */}
            Length: {songInfo.Length}<br />
            Lyrics: {songInfo.Lyrics}
            <SideSongs query={location.search} api={match.params.id} />
        </div>
    )
}
