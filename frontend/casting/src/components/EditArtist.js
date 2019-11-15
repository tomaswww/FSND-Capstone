import React, { Fragment } from 'react';
import {Component} from 'react';
import logo from './artist.png';

import { Link } from "react-router-dom";
import { useAuth0} from "../react-auth0-spa";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddArtist = () => {
  const { loading, user } = useAuth0();

  

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <Fragment>
        <body className="App-body">
            
            <img src={logo} alt="artist" />
            <h4>Loged in as: {user.nickname}</h4>
            <h1>Enter Artist Info</h1>
            <hr></hr>
            
                <form>
                  <div class="form-group">
                        <label for="idValue">Artist ID:</label>
                        <input type="integer" class="form-control" id="idValue" aria-describedby="emailHelp" placeholder="Enter Artist ID"></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="string" class="form-control" id="nameValue" aria-describedby="emailHelp" placeholder="Enter Name"></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Age</label>
                        <input type="integer" class="form-control" id="ageValue" placeholder="Enter Age"></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Gender</label>
                        <input type="string" class="form-control" id="genderValue" placeholder="Enter Gender"></input>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
        </body>
    </Fragment>
  );
};

export default AddArtist;