import React, { Fragment } from 'react';
import {Component} from 'react';
import logo from './movies.png';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';

class MovieForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    var newMovie = {"title":event.target.elements.title.value,
  "release_date":event.target.elements.release_date.value }
    $.ajax({
      url: 'https://enopvpo6xlgz.x.pipedream.net/',
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik56RTBSa1pDTXpZMk5qWTRRelU0T0RFMFJFUTNORVE0TmpFek9FTkdOVFUxTkRZNU9ETkdOdyJ9.eyJpc3MiOiJodHRwczovL2NhcHN0b25lLWF1dGguYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVkY2M0ZTFmOTViYmVlMGUyYmIyYzgzMCIsImF1ZCI6ImNhcHN0b25lIiwiaWF0IjoxNTczOTY3NzAzLCJleHAiOjE1NzM5NzQ5MDMsImF6cCI6ImlURlROMXJRMWtvNXdTVHkzU1F1ODdQZTBuTVdlS0YzIiwic2NvcGUiOiIiLCJwZXJtaXNzaW9ucyI6WyJhZGQ6YWN0b3IiLCJjaGFuZ2U6YWN0b3IiLCJjaGFuZ2U6bW92aWUiLCJkZWxldGU6YWN0b3IiLCJyZWFkOmFjdG9ycyIsInJlYWQ6bW92aWVzIl19.zGJztr-zf59QOZMdnDP64Eu3tpSHWat4W2D2pElwx3T8SU_X_ldsWxwAkQ2qPCf9_UCShRQfqSN62RzJnPm8jCPPc_oE9cAdpaCJo5PWvjmbi-0_lwKbjbmqWZWXFXHde-pSQQjsEbDWtK1PNTyjVLpNQS0Wj3aIEWJ0B2W3vCJ7NakBlQSPjTMn3A6HM4eO6KzDsQ1Q0B4hdk4PqlABvat3F6Q6-XLSDXv-z-5ccN-BCA5rFdDOey9SkW5ALny3_TqH7GmM_s-p-1s72MC3yVibXt39ZEaoVUZt-BfbjixB4cOky9YssXL0_y9TaUfquAZBOPpq63hM5pfEYL4BwA'
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