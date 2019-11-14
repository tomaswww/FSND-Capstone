import React from 'react';
import logo from './logo.png';
import './App.css';
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";

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
          Please login to View Casting information
        </p>
         < NavBar / >
      </header>
      <Switch>
          <Route path="/" exact />
          <Route path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
