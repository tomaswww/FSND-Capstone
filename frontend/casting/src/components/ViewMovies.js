import React, { Fragment } from 'react';
import {Component} from 'react';
import axios from 'axios';

import logo from './movies.png';

import { Link } from "react-router-dom";
import { useAuth0} from "../react-auth0-spa";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewMovies = () => {
  const { loading, user } = useAuth0();

  

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }
  else {
    const token = getToken()
    /* Here I am currently testing the request sent using requestBin,
    then have to change it to point to localhost:5000 */
    const response = axios.get("https://enopvpo6xlgz.x.pipedream.net", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
    console.log(response.data);
    console.log(token);

    return (
      <Fragment>
          <body className="App-body">
              <img src={logo} alt="movies" />
              <h4>Loged in as: {user.nickname}</h4>
              <span>
                  <div class="card">
                      <div class="card-header">
                          All Movies:
                      </div>
                      <div class="card-body">
                          <h5 class="card-title">Movies Array</h5>
                          <p class="card-text" id="artistsData">ALL THE DATA</p>
                          <a href="/Profile" class="btn btn-primary">Go Back</a>
                      </div>
                  </div>
              </span>
        </body>
      </Fragment>
    );
  };
  };

export default ViewMovies;

const getToken = function () {
  /* Here I need to add the function to getTokenSIlently() but no luck so far */
  const tokenValue = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik56RTBSa1pDTXpZMk5qWTRRelU0T0RFMFJFUTNORVE0TmpFek9FTkdOVFUxTkRZNU9ETkdOdyJ9.eyJuaWNrbmFtZSI6InR3aW5nb3JkIiwibmFtZSI6InR3aW5nb3JkQGhvdG1haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2M2OWRmMWI3ZTdmNWZkOGE3ZjhmOWIyN2Q4ZDg4NDI4P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGdHcucG5nIiwidXBkYXRlZF9hdCI6IjIwMTktMTEtMTdUMDQ6NTY6MTEuNTYzWiIsImVtYWlsIjoidHdpbmdvcmRAaG90bWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9jYXBzdG9uZS1hdXRoLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZGNjNGUxZjk1YmJlZTBlMmJiMmM4MzAiLCJhdWQiOiJpVEZUTjFyUTFrbzV3U1R5M1NRdTg3UGUwbk1XZUtGMyIsImlhdCI6MTU3Mzk2NjU3MywiZXhwIjo1MTczOTY2NTczLCJub25jZSI6In5KNC5pcXhITE0wT1JkRGFqcmdDT0c0UjhnZGxYZ2Rod2N6TmhCQ29PRVYifQ.PuhCK9ryf1fAADFDRI7VdmoBFDwxXAkkOehpvTFnbwgXawXe6py562sB8L-4tlXjL-vo92Ow6kZ63SLW4k3dEbjeeR9OTYXMQ4pbdFBFlkqlsn1ughRK4WIaCq3ORsUGFzQjaoGKYL0E_gaU_E7E8sY8wmEhYwPP3mUJzSeb-N11zyJoUxdxtRgB2L0tSEsKh_-03ilV64GrTK4W1hwCa7y7EvKN8Ovq_biP2w_6GkMHziaVPFRZ48QnECzMJL6PXRIuFb2oAXej99ds5Z1vEJuYFnN0Fy5tgLCNsfh8QQ71QU7dZg55aOLoKTiBYi_c86cFDe9iQaE2_ZQhyoCKXQ";
  return tokenValue;
};