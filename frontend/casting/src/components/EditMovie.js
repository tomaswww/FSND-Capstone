import React from 'react';
import logo from './movies.png';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';


class MovieForm extends React.Component {
    handleSubmit = (event) => {
      event.preventDefault()
      var newMovie = {};
      if (event.target.elements.id.value) {
        newMovie['id'] = event.target.elements.id.value;
      }
      if (event.target.elements.title.value) {
        newMovie['title'] = event.target.elements.title.value;
      }
      if (event.target.elements.release_date.value) {
        newMovie['release_date'] = event.target.elements.release_date.value;
      }
    const cookies = new Cookies();
    const token = cookies.get('jwt');
    console.log(token)
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
      }
    render() {
      return (
        <body className = "App-body" >
          <img src={logo} alt="movie" />
              <h1>Enter new Movie Info</h1>
              <h6>NOTE: For editing the Movie info you must know the actor ID</h6>
              <hr></hr>
        <form onSubmit={this.handleSubmit}>
          <label>
            Movie ID:
            <input
              type="number"
              name="id"
              ref={node => (this.inputNode = node)} required
            />
          </label>
          <br></br>
          <label>
            Title:
            <input
              type="text"
              name="title"
              ref={node => (this.inputNode = node)} 
            />
          </label>
          <br></br>
          <label>
            Release Date:
            <input
              type="date"
              name="release_date"
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
  export default MovieForm;
