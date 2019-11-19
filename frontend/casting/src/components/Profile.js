import React, { Fragment } from "react";
import { useAuth0, Auth0Provider, Auth0Context} from "../react-auth0-spa";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";



const Profile = () => {
  const { loading, user } = useAuth0();
  const { getIdTokenClaims } = useAuth0();
  const { getTokenSilently } = useAuth0();
  async function asyncCall() {
    /* var token = await auth0Client.cache.cache["default::openid profile email"].id_token */
    const accessToken = await getTokenSilently();
    console.log(accessToken);
    
    $.ajax({
      url: 'https://capstone-auth.auth0.com/oauth/token',
      type: 'POST',
      data: JSON.stringify({
        "Code": accessToken,
        "Client ID": 'iTFTN1rQ1ko5wSTy3SQu87Pe0nMWeKF3',
        "Client Secret": 'UOPkywsyMvR5i9Z3g4GrQHKF4YhD7Rbgj_9V7ct0vPpZICDZNGNKoNdin-jYDc51'
      }),
      contentType: 'application/json',
      success: function (data) {
        alert('Actor succesfully modified!')
      }
    });
    return accessToken;
    // expected output: 'resolved'
  }

  

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }
  else {
    asyncCall();
    return (
      <Fragment>
          <body className="App-body">
              <img src={user.picture} alt="Profile" />
              <h2>{user.nickname}</h2>
              <p>{user.email}</p>
              <span id="containerSpan">
              <p id="tokenFrame"></p>
              </span>
              <span>
                  <div>
                  <button type="button" id="viewActor" class="btn btn-outline-primary btn-block" ><Link to="/ViewArtists">View Artists</Link></button>
                  <button type="button" id="viewMovie" class="btn btn-outline-primary btn-block" ><Link to="/ViewMovies">View Movies</Link></button>
                  <button type="button" id="addActor" class="btn btn-outline-primary btn-block" ><Link to="/AddArtist">Add Artist</Link></button>
                  <button type="button" id="addMovie" class="btn btn-outline-primary btn-block" ><Link to="/AddMovie">Add Movie</Link></button>
                  <button type="button" id="editActor" class="btn btn-outline-primary btn-block" ><Link to="/EditArtist">Edit Artist</Link></button>
                  <button type="button" id="editMovie" class="btn btn-outline-primary btn-block" ><Link to="/EditMovie">Edit Movie</Link></button>
                  </div>
              </span>
        </body>
      </Fragment>
    );
  };
  };

export default Profile;