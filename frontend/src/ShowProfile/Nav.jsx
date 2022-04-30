import React from "react";
import "./compStyles.css";

import {useHistory} from "react-router"
import { useState, useEffect } from "react";
import axios from "axios";
import {IsAuth} from "../auth/isAuth";


function Navbar() {
  const history = useHistory();
  const handleLogout = () => {
      localStorage.clear();
      history.push("/home");
  };

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(IsAuth()){
      axios
          .get("/author/profile", {
              headers: {
                  "auth-token": localStorage.token,
                  "Content-Type": "application/json",
              },
          })
          .then((response) => {
              setData(response.data);
              setLoading(false);
          })
          .catch((error) => console.log(error));
        }
        else setLoading(false);
  }, [isLoading]);

  if (isLoading) {
      return (
          <div className="text-center">
              <div className="spinner-border text-info m-3" role="status">
                  <span className="sr-only p-2">Loading...</span>
              </div>
          </div>
      );
  }
  else
  return (
    <div>
      <nav className="navbar nav-margin  navbar-light bg-info">
        <div className="container-fluid nav-pad">
          <a className="navbar-brand" href="/">
            CMT
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>

            {(() => {
              if (IsAuth()) {
                return (
                  <div>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/user">
                      Dashboard
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/myconferences">
                      My Conferences
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/create-conf">
                      Create-new-conference
                    </a>
                  </li>
                  {(() => {
                    if ("profile/"+data._id===window.location.pathname) {
                      return (
                        <li class="nav-item">
                          <a class="nav-link" href="/editprofile">
                            Edit-profile
                          </a>
                        </li>
                      )
                    }
                    else return (
                      <li class="nav-item">
                        <a class="nav-link" href={"/profile/"+data._id}>
                          My-profile
                        </a>
                      </li>
                    )
                  })()}
                  <button onClick={() => handleLogout()} class=" btn  nav-link bbbtn">
                    Logout
                  </button>
                  </div>

                )
              }  else {
                return (
                  <div><li class="nav-item">
                    <a class="nav-link" href="/login">
                      Login
                    </a>
                  </li></div>
                )
              }
            })()}





            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
