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
    var editArtist = function () {
      var id = $("#idValue").value;
      var name = $("#nameValue").value;
      var age = $("#ageValue").value;
      var gender = $("#genderValue").value;
      /* Still missing to retrieve this info and add to newArtis variable */
      const newArtist = {};
      if (id) {
        newArtist['id'] = id;
      }
      if (name) {
        newArtist['name'] = name;
      }
      if (age) {
        newArtist['age'] = age;
      }
      if (gender) {
        newArtist['gender'] = gender;
      }
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
          alert('Actor succesfully modified!')
        }
      });
    }
      return (
        <Fragment>
            <body className="App-body">
                
                <img src={logo} alt="artist" />
                <h4>Loged in as: {user.nickname}</h4>
                <h1>Enter Artist Info</h1>
                <h6>NOTE: For editing the Actor info you must know the actor ID</h6>
                <hr></hr>
                
                    <form>
                      <div class="form-group">
                            <label for="idValue">Artist ID:</label>
                            <input type="integer" class="form-control" id="idValue" aria-describedby="emailHelp" placeholder="Enter Artist ID"></input>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="string" class="form-control" id="nameValue" aria-describedby="emailHelp" placeholder="Enter Name"></input>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Age</label>
                            <input type="integer" class="form-control" id="ageValue" placeholder="Enter Age"></input>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Gender</label>
                            <input type="string" class="form-control" id="genderValue" placeholder="Enter Gender"></input>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
            </body>
        </Fragment>
      );
    };
  };

export default AddArtist;