import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import Header from './components/Header';
import Songs from './components/Songs';
import NavBar from './components/NavBar';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <NavBar />
        <div id="page">
          <Switch>
            <Route path="/songs" component={Songs}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
