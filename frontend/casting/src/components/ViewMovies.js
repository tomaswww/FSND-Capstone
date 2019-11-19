import React, { Fragment } from 'react';
import logo from './movies.png';
import { useAuth0} from "../react-auth0-spa";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewMovies = () => {
  const { loading, user } = useAuth0();
  const { getIdTokenClaims } = useAuth0();
  async function asyncCall() {
    const tokenRaw = await getIdTokenClaims();
    const token = tokenRaw["__raw"];
    return token;
    }

  

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }
  else {
      const token = asyncCall();
      /* Here I am currently testing the request sent using requestBin,
      then have to change it to point to localhost:5000 */
      $.ajax({
        url: 'http://127.0.0.1:5000/movies',
        headers: {
          'Authorization': 'Bearer '+token
        },
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
          const sizeOfArray = data.Movies.length;
          for (var i = 0; i < sizeOfArray; i++) {
            var paragraph = document.getElementById('moviesData');
            var text = document.createTextNode(' ID: ' + data.Movies[i].id + ', Title: ' + data.Movies[i].title + ', Release Date: ' + data.Movies[i].release_date);
            paragraph.appendChild(text);
            var br = document.createElement("br");
            paragraph.appendChild(br);
          }
        }
      });
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
                            <p class="card-text" id="moviesData"></p>
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