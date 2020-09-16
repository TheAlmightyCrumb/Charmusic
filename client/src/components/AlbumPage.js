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
        const artistId = data[0].Artist_id;
        axios.get(`/artists/${artistId}`).then( res => {
            console.log("res: ", res);
            res = res.data[0];
            setArtistName(res.Artist_Name);
        })
    }

    useEffect(() => {
        showAlbumInfo() 
    }, []);

    return (
        <div>
            {albumInfo.Album_Name}<br />
            {artistName}
        </div>
    )
}
