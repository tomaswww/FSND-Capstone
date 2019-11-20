import React from 'react';
import { useAuth0} from "../react-auth0-spa";
import {Component} from 'react';
import logo from './artist.png';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';


class ArtistForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    var newArtist = {"name":event.target.elements.name.value,
  "age": event.target.elements.age.value, "gender": event.target.elements.gender.value
  }
  const cookies = new Cookies();
  const token = cookies.get('jwt');
    $.ajax({
      url: 'http://localhost:5000/actors',
      headers: {
        'Authorization': 'Bearer '+token
      },
      type: 'POST',
      data: JSON.stringify(newArtist),
      contentType: 'application/json',
      success: function () {
        alert('Artist succesfully added!')
        return window.location.reload();
      }
    });
  }
  render() {
    return (
      <body className = "App-body" >
        <img src={logo} alt="artist" />
            <h1>Enter new Artist Info</h1>
            <hr></hr>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            ref={node => (this.inputNode = node)} required
          />
        </label>
        <br></br>
        <label>
          Age:
          <input
            type="number"
            name="age"
            ref={node => (this.inputNode = node)} required
          />
        </label>
        <br></br>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
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
export default ArtistForm;