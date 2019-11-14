import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';


const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />
      <h2>{user.nickname}</h2>
      <p>{user.email}</p>
      <span>
        <div>
        <button type="button" class="btn btn-primary" onClick="viewActors()">View Actors</button>
        <button type="button" class="btn btn-primary" onClick="viewMovies()">View Movies</button>
        <button type="button" class="btn btn-primary" onClick="addActors()">Add Actors</button>
        <button type="button" class="btn btn-primary" onClick="addMovies()">Add Movies</button>
        <button type="button" class="btn btn-primary" onClick="editActors()">Edit Actors</button>
        <button type="button" class="btn btn-primary" onClick="editActors()">Edit Movies</button>
        </div>
        <div class="modal fade" id="modalForView" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Results</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="modalText"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">OK</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
      </span>
    </Fragment>
  );
};

export default Profile;