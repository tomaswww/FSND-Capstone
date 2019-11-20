import React from 'react';
import logo from './artist.png';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';


class ActorForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const newActor = {};
    if (event.target.elements.id.value) {
      newActor['id'] = event.target.elements.id.value;
    }
    if (event.target.elements.name.value) {
      newActor['name'] = event.target.elements.name.value;
    }
    if (event.target.elements.age.value) {
      newActor['age'] = event.target.elements.age.value;
    }
    if (event.target.elements.gender.value) {
      newActor['gender'] = event.target.elements.gender.value;
    }
  const cookies = new Cookies();
  const token = cookies.get('jwt');
    $.ajax({
      url: 'http://localhost:5000/actors',
      headers: {
        'Authorization': 'Bearer '+token
      },
      type: 'POST',
      data: JSON.stringify(newActor),
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
        <img src={logo} alt="actor" />
            <h1>Enter Actor Info</h1>
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
export default ActorForm;