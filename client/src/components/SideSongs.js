import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SideSongs({ query, api }) {

    const [list, setList] = useState([]);

    const showList = async () => {
        const { data } = await axios.get(`/songs/${api}${query}`);
        setList(data.map(song => <div key={song.Song_id}><Link to={`/songs/${song.Song_id}${query}`}>{song.Title}</Link></div>))
    }

    useEffect(() => {
        showList()
    }, [api])

    return (
        <div>
            List of side songs: {list}
        </div>
    )
}
