import React, { useEffect, useState } from "react";
import axios from "axios";
import lengthToTime from "../functions/lengthToTime";
import "./Search.css";
import { Link } from "react-router-dom";

export default function Search() {
  const [searchValues, setSearchValues] = useState({});

  const getSearchOptions = async (word) => {
    const { data } = await axios.get(`/search?word=${word}`);
    console.log(data);
    setSearchValues(data);
  };

  useEffect(() => {
    getSearchOptions("*");
  }, []);

  return (
    <>
      <div style={{ width: "400px", margin: "auto" }}>
        <input
          id="searchInput"
          placeHolder="Search..."
          style={{
            width: "100%",
            fontSize: "16px",
            padding: "10px",
            margin: "auto",
          }}
          onChange={(e) => getSearchOptions(e.target.value)}
        />
      </div>
      <div
        style={{
          width: "700px",
          height: "100%",
          display: "flex",
          flexFlow: "row wrap",
          margin: "auto",
          justifyContent: "space-between",
        }}
      >
        <div className="resultContainer">
          <h2 className="resultHeader">Songs</h2>
          {searchValues.songs &&
            searchValues.songs.slice(0, 3).map((song) => {
              return (
                <Link style={{ color: "#BFCEDD", textDecoration: "none" }} to={`/songs/${song["_id"]}`}>
                  <div
                    key={`song${song["_id"]}`}
                    className="foundResultsContainer"
                  >
                    <div className="resultImageContainer">
                      <img
                        className="resultImage"
                        align="left"
                        src={song["_source"].image}
                      />
                    </div>
                    <div className="innerResultTextContainer">
                      <p className="innerResultHeader">
                        {song["_source"].title}
                      </p>
                      <br />
                      <div className="smallTextContainer">
                        <p className="smallResultText">
                          {song["_source"].artist}
                        </p>
                        <p className="smallResultText">
                          {lengthToTime(song["_source"].length)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className="resultContainer">
          <h2 className="resultHeader">Albums</h2>
          {searchValues.albums &&
            searchValues.albums.slice(0, 3).map((album) => {
              return (
                <Link style={{ color: "#BFCEDD", textDecoration: "none" }} to={`/albums/${album["_id"]}`}>
                  <div
                    key={`album${album["_id"]}`}
                    className="foundResultsContainer"
                  >
                    <div className="resultImageContainer">
                      <img
                        className="resultImage"
                        align="left"
                        src={album["_source"].image}
                      />
                    </div>
                    <div className="innerResultTextContainer">
                      <p className="innerResultHeader">
                        {album["_source"].name}
                      </p>
                      <br />
                      <div className="smallTextContainer">
                        <p className="smallResultText">
                          {album["_source"].artist}
                        </p>
                        <p className="smallResultText">
                          {`Released At: ${album["_source"].released}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className="resultContainer">
          <h2 className="resultHeader">Artists</h2>
          {searchValues.artists &&
            searchValues.artists.slice(0, 3).map((artist) => {
              return (
                <Link style={{ color: "#BFCEDD", textDecoration: "none" }} to={`/artists/${artist["_id"]}`}>
                  <div
                    key={`artist${artist["_id"]}`}
                    className="foundResultsContainer"
                  >
                    <div className="resultImageContainer">
                      <img
                        className="resultImage"
                        align="left"
                        src={artist["_source"].image}
                      />
                    </div>
                    <div className="innerResultTextContainer">
                      <p className="innerResultHeader">
                        {artist["_source"].name}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className="resultHeader">
          <h2 className="resultHeader">Playlists</h2>
          {searchValues.playlists &&
            searchValues.playlists.slice(0, 3).map((playlist) => {
              return (
                <Link style={{ color: "#BFCEDD", textDecoration: "none" }} to={`/playlists/${playlist["_id"]}`}>
                  <div
                    key={`playlist${playlist["_id"]}`}
                    className="foundResultsContainer"
                  >
                    <div className="resultImageContainer">
                      <img
                        className="resultImage"
                        align="left"
                        src={playlist["_source"].image}
                      />
                    </div>
                    <div className="innerResultTextContainer">
                      <p className="innerResultHeader">
                        {playlist["_source"].name}
                      </p>
                      <br />
                      <div className="smallTextContainer">
                        <p className="smallResultText">
                          {`${playlist["_source"].songs} Songs`}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}
