import React, { Fragment } from 'react';
import {Component} from 'react';
import logo from './artist.png';

import { Link } from "react-router-dom";
import { useAuth0} from "../react-auth0-spa";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddArtist = () => {
  const { loading, user } = useAuth0();

  

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }
  else {
    var createArtist = function () {
      var name = $("#nameValue").value;
      var age = $("#ageValue").value;
      var gender = $("#genderValue").value;
      /* Still missing to retrieve this info and add to newArtis variable */
      const newArtist = {'name': 'nicholas cage','age': 55,'gender': 'male'};
      console.log(newArtist);
      $.ajax({
        url: 'https://enopvpo6xlgz.x.pipedream.net/',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik56RTBSa1pDTXpZMk5qWTRRelU0T0RFMFJFUTNORVE0TmpFek9FTkdOVFUxTkRZNU9ETkdOdyJ9.eyJpc3MiOiJodHRwczovL2NhcHN0b25lLWF1dGguYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVkY2M0ZTFmOTViYmVlMGUyYmIyYzgzMCIsImF1ZCI6ImNhcHN0b25lIiwiaWF0IjoxNTczOTY3NzAzLCJleHAiOjE1NzM5NzQ5MDMsImF6cCI6ImlURlROMXJRMWtvNXdTVHkzU1F1ODdQZTBuTVdlS0YzIiwic2NvcGUiOiIiLCJwZXJtaXNzaW9ucyI6WyJhZGQ6YWN0b3IiLCJjaGFuZ2U6YWN0b3IiLCJjaGFuZ2U6bW92aWUiLCJkZWxldGU6YWN0b3IiLCJyZWFkOmFjdG9ycyIsInJlYWQ6bW92aWVzIl19.zGJztr-zf59QOZMdnDP64Eu3tpSHWat4W2D2pElwx3T8SU_X_ldsWxwAkQ2qPCf9_UCShRQfqSN62RzJnPm8jCPPc_oE9cAdpaCJo5PWvjmbi-0_lwKbjbmqWZWXFXHde-pSQQjsEbDWtK1PNTyjVLpNQS0Wj3aIEWJ0B2W3vCJ7NakBlQSPjTMn3A6HM4eO6KzDsQ1Q0B4hdk4PqlABvat3F6Q6-XLSDXv-z-5ccN-BCA5rFdDOey9SkW5ALny3_TqH7GmM_s-p-1s72MC3yVibXt39ZEaoVUZt-BfbjixB4cOky9YssXL0_y9TaUfquAZBOPpq63hM5pfEYL4BwA'
        },
        type: 'POST',
        data: JSON.stringify(newArtist),
        contentType: 'application/json',
        success: function (data) {
          alert('Actor succesfully added!')
        }
      });
    }
  return (
    <Fragment>
        <body className="App-body">
            
            <img src={logo} alt="artist" />
            <h4>Loged in as: {user.nickname}</h4>
            <h1>Enter new Artist Info</h1>
            <hr></hr>
            
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="string" class="form-control" id="nameValue" aria-describedby="emailHelp" placeholder="Enter Name" required></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Age</label>
                        <input type="integer" class="form-control" id="ageValue" placeholder="Enter Age" required></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Gender</label>
                        <input type="string" class="form-control" id="genderValue" placeholder="Enter Gender" required></input>
                    </div>
                    <button type="button" class="btn btn-primary" onClick={createArtist}>Submit</button>
                </form>
        </body>
    </Fragment>
  );
};
};

export default AddArtist;

