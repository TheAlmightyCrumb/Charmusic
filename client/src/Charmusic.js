import React from 'react';
import './Charmusic.css';
import logo from './c8ffe006-9009-4fc2-aa49-894884473503_200x200.png';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';



function Charmusic() {
  return (
    <div className="App">
      <div className="header">
        <img src={logo} id="logo" alt="logo"/>
        <a className="link" href="https://github.com/TheAlmightyCrumb" target="_blank" rel="noopener noreferrer">@TheAlmightyCrumb on GitHub</a>
      </div>
      <div className="container">
        <div className="left">
          <ul id="menu">
            <li className="menuOption">Songs</li>
            <li className="menuOption">Albums</li>
            <li className="menuOption">Artists</li>
          </ul>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default Charmusic;