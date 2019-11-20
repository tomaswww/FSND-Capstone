import React, { Fragment } from "react";
import { useAuth0} from "../react-auth0-spa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';


const Profile = () => {
  const { loading, user } = useAuth0();
  const { getIdTokenClaims } = useAuth0();
  async function asyncCall() {
    const tokenRaw = await getIdTokenClaims();
    const token = tokenRaw["__raw"];
    const cookies = new Cookies();
    cookies.set('jwt', token, { path: '/' });
    }      

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }
  else {
    return (
      <Fragment>
          <body className="App-body">
              <img src={user.picture} alt="Profile" />
              <h2>{user.nickname}</h2>
              <p>{user.email}</p>
              <span id="containerSpan">
              <p id="tokenFrame"></p>
              </span>
              <span>
                  <div>
                  <button type="button" id="viewActor" class="btn btn-outline-primary btn-block" ><Link to="/ViewActors">View Actors</Link></button>
                  <button type="button" id="viewMovie" class="btn btn-outline-primary btn-block" ><Link to="/ViewMovies">View Movies</Link></button>
                  <button type="button" id="addActor" class="btn btn-outline-primary btn-block" ><Link to="/AddActor">Add Actor</Link></button>
                  <button type="button" id="addMovie" class="btn btn-outline-primary btn-block" ><Link to="/AddMovie">Add Movie</Link></button>
                  <button type="button" id="editActor" class="btn btn-outline-primary btn-block" ><Link to="/EditActor">Edit Actor</Link></button>
                  <button type="button" id="editMovie" class="btn btn-outline-primary btn-block" ><Link to="/EditMovie">Edit Movie</Link></button>
                  </div>
              </span>
        </body>
      </Fragment>
    );
  };
  };

export default Profile;