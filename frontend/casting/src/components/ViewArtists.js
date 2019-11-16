import React, { Fragment } from 'react';
import {Component} from 'react';
import axios from 'axios';
import logo from './artist.png';
import { Link } from "react-router-dom";
import { useAuth0, Auth0Context,Auth0Provider}  from "../react-auth0-spa";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';



const ViewArtist = () => {
  const { loading, user } = useAuth0();
  

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }
  else {
      const response = axios.get("http://localhost:5000/actors");
      console.log(response.data);
                  
      return (
        <Fragment>
            <script>
              const hello = $.getJSON('https://capstone-auth.auth0.com/oauth/token');
              console.log(hello);
            </script>
            <body className="App-body">
                <img src={logo} alt="artist" />
                <h4>Loged in as: {user.nickname}</h4>
                <h4 id="tokenHere">Token:</h4>
                <span>
                    <div class="card">
                        <div class="card-header">
                            All Artists:
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Artist Array</h5>
                            <p class="card-text" id="artistsData"></p>
                            <a href="/Profile" class="btn btn-primary">Go Back</a>
                        </div>
                    </div>
                </span>
          </body>
        </Fragment>
      );
  };
  };

export default ViewArtist;
  