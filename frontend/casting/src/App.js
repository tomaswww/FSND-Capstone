import React from 'react';
import logo from './logo.png';
import './App.css';
import { useAuth0 } from "./react-auth0-spa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import ViewActors from "./components/ViewActors";
import ViewMovies from "./components/ViewMovies";
import AddActor from "./components/AddActor";
import AddMovie from "./components/AddMovie";
import EditActor from "./components/EditActor";
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
        <p>
          This is the Casting App
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <p></p>
        
         < NavBar / >
      </header>
      <Switch>
          <Route path="/" exact />
          <Route path="/Profile" component={Profile} />
          <Route path="/ViewActors" component={ViewActors} />
          <Route path="/ViewMovies" component={ViewMovies} />
          <Route path="/AddActor" component={AddActor} />
          <Route path="/AddMovie" component={AddMovie} />
          <Route path="/EditActor" component={EditActor} />
          <Route path="/EditMovie" component={EditMovie} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
