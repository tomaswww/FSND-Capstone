import React from 'react';
import { useAuth0} from "../react-auth0-spa";
import {Component} from 'react';
import logo from './movies.png';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';

class MovieForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    var newMovie = {"title":event.target.elements.title.value,
  "release_date":event.target.elements.release_date.value }
  const { getIdTokenClaims } = useAuth0();
  async function asyncCall() {
    const tokenRaw = await getIdTokenClaims();
    const token = tokenRaw["__raw"];
    $.ajax({
      url: 'http://localhost:5000/movies',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      type: 'POST',
      data: JSON.stringify(newMovie),
      contentType: 'application/json',
      success: function () {
        alert('Movie succesfully added!')
        return window.location.reload();
      }
    });
    };
    
  }
  render() {
    return (
      <body className = "App-body" >
        <img src={logo} alt="artist" />
            <h1>Enter new Movie Info</h1>
            <hr></hr>
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            ref={node => (this.inputNode = node)} required
          />
        </label>
        <br></br>
        <label>
          Release Date:
          <input
            type="date"
            name="release_date"
            ref={node => (this.inputNode = node)} required
          />
        </label>
        <br></br>
        <button type="submit">Submit</button>
      </form>
      </body>
    )
  }
}
export default MovieForm;