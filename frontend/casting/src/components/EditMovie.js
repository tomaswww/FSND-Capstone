import React, { Fragment } from 'react';
import {Component} from 'react';
import logo from './movies.png';

import { Link } from "react-router-dom";
import { useAuth0} from "../react-auth0-spa";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddMovie = () => {
  const { loading, user } = useAuth0();

  

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <Fragment>
        <body className="App-body">
            
            <img src={logo} alt="movie" />
            <h4>Loged in as: {user.nickname}</h4>
            <h1>Enter Movie Info</h1>
            <hr></hr>
            
                <form>
                    <div class="form-group">
                        <label for="idValue">Movie ID:</label>
                        <input type="integer" class="form-control" id="idValue" aria-describedby="emailHelp" placeholder="Enter Movie ID"></input>
                    </div>
                    <div class="form-group">
                        <label for="nameValue">Title:</label>
                        <input type="string" class="form-control" id="nameValue" aria-describedby="emailHelp" placeholder="Enter Name"></input>
                    </div>
                    <div class="form-group">
                        <label for="dateValue">Release Date</label>
                        <input type="date" class="form-control" id="dateValue" placeholder="Enter Date"></input>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
        </body>
    </Fragment>
  );
};

export default AddMovie;