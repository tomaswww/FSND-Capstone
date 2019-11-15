import React, { Fragment } from 'react';
import {Component} from 'react';

import { useAuth0} from "../react-auth0-spa";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';

    class ViewArtists extends Component {
        getArtists = () => {
            $.ajax({
                url: `http://localhost:5000/artists`, //TODO: update request URL
                type: "GET",
                success: (result) => {
                    this.setState({
                        artists:result
                    })
                    return;
                },
                error: (error) => {
                    alert('Unable to load artists. Please try your request again')
                    return;
                }
            })
        }
        render() {
            return (
            <div>
                <h2>Available Artists</h2>
                <div class = "card">
                    <div class="card-body">Artist array HERE
                    </div>
                </div>
            </div >
            );
        } 
    }

    export default ViewArtists;
  