import React from 'react';
import logo from './logo.png';
import './App.css';
import { useAuth0 } from "./react-auth0-spa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import ViewArtists from "./components/ViewArtists";
import ViewMovies from "./components/ViewMovies";
import AddArtist from "./components/AddArtist";
import AddMovie from "./components/AddMovie";
import EditArtist from "./components/EditArtist";
import EditMovie from "./components/EditMovie";


function App() {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div className="App">
      < BrowserRouter >
      <header className="App-header">
       
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is the Casting App
        </p>
         < NavBar / >
      </header>
      <Switch>
          <Route path="/" exact />
          <Route path="/Profile" component={Profile} />
          <Route path="/ViewArtists" component={ViewArtists} />
          <Route path="/ViewMovies" component={ViewMovies} />
          <Route path="/AddArtist" component={AddArtist} />
          <Route path="/AddMovie" component={AddMovie} />
          <Route path="/EditArtist" component={EditArtist} />
          <Route path="/EditMovie" component={EditMovie} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
