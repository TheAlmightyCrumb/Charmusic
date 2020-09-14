import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import Header from './components/Header';
import Songs from './components/Songs';
import Albums from './components/Albums';
import Artists from './components/Artists';
import NavBar from './components/NavBar';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <NavBar />
        <div id="page">
          <Switch>
            <Route path="/songs" component={Songs} exact/>
            <Route path="/albums" component={Albums} exact/>
            <Route path="/artists" component={Artists} exact/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
