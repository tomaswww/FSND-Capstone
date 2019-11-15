import React, { Fragment } from 'react';
import {Component} from 'react';
import logo from './artist.png';

import { Link } from "react-router-dom";
import { useAuth0} from "../react-auth0-spa";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewArtist = () => {
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
            <span>
                <div class="card">
                    <div class="card-header">
                        All Artists:
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Artist Array</h5>
                        <p class="card-text" id="artistsData">ALL THE DATA</p>
                        <a href="/Profile" class="btn btn-primary">Go Back</a>
                    </div>
                </div>
            </span>
      </body>
    </Fragment>
  );
};

export default ViewArtist;
  