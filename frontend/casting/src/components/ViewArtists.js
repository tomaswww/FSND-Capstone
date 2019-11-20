import React, { Fragment } from 'react';
import logo from './artist.png';
import { useAuth0}  from "../react-auth0-spa";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';



const ViewArtist = () => {
  const { loading, user } = useAuth0();
  async function asyncCall() {
    const cookies = new Cookies();
    const token = cookies.get('jwt');
    $.ajax({
      url: 'http://127.0.0.1:5000/actors',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        const sizeOfArray = data.Actors.length;
        for (var i = 0; i < sizeOfArray; i++) {
          var paragraph = document.getElementById('artistsData');
          var text = document.createTextNode(' ID: ' + data.Actors[i].id + ', Name: ' + data.Actors[i].name + ', Age: ' + data.Actors[i].age + ', Gender: ' + data.Actors[i].gender);
          paragraph.appendChild(text);
          var br = document.createElement("br");
          paragraph.appendChild(br);
        }
      }
    });
    return token;
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
                <img src={logo} alt="artist" />
                <h4>Loged in as: {user.nickname}</h4>
                <span>
                    <div class="card">
                        <div class="card-header">
                            All Artists:
                        </div>
                        <div class="card-body">
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
  