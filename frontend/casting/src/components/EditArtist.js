import React, { Fragment } from 'react';
import {Component} from 'react';
import logo from './artist.png';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';


class ArtistForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const newArtist = {};
    if (event.target.elements.id.value) {
      newArtist['id'] = event.target.elements.id.value;
    }
    if (event.target.elements.name.value) {
      newArtist['name'] = event.target.elements.name.value;
    }
    if (event.target.elements.age.value) {
      newArtist['age'] = event.target.elements.age.value;
    }
    if (event.target.elements.gender.value) {
      newArtist['gender'] = event.target.elements.gender.value;
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
            <h1>Enter Artist Info</h1>
            <h6>NOTE: For editing the Actor info you must know the actor ID</h6>
            <hr></hr>
      <form onSubmit={this.handleSubmit}>
        <label>
          Artist ID:
          <input
            type="number"
            name="id"
            ref={node => (this.inputNode = node)} required
          />
        </label>
        <br></br>
        <label>
          Name:
          <input
            type="text"
            name="name"
            ref={node => (this.inputNode = node)} 
          />
        </label>
        <br></br>
        <label>
          Age:
          <input
            type="number"
            name="age"
            ref={node => (this.inputNode = node)} 
          />
        </label>
        <br></br>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            ref={node => (this.inputNode = node)} 
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