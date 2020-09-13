import React from 'react';
import './App.css';
import logo from './c8ffe006-9009-4fc2-aa49-894884473503_200x200.png'

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src={logo} id="logo" alt="logo"/>
      </div>
      <div className="container">
        <div className="left"></div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default App;
