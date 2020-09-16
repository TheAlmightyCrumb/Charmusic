import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Songs from './components/Songs';
import Albums from './components/Albums';
import Artists from './components/Artists';
import NavBar from './components/NavBar';
import ArtistPage from './components/ArtistPage';
import SongPage from './components/SongPage';
import AlbumPage from './components/AlbumPage';


function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <NavBar />
        <div id="page">
          <Switch>
            <Route path="/songs" component={Songs} exact />
            <Route path="/albums" component={Albums} exact />
            <Route path="/artists" component={Artists} exact />
            <Route path="/artists/:id" component={ArtistPage} />
            <Route path="/songs/:id" component={SongPage} />
            <Route path="/albums/:id" component={AlbumPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
