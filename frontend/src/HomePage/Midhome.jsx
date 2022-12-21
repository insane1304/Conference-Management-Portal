import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./compStyles.css";
import {IsAuth} from "../auth/isAuth";

function Midhome() {
  return (
    <div class="container">
      <br></br>
      <h1 class="">Welcome to CMP </h1>
      {(() => {
        if (IsAuth()) {

        } else{
          return (
            <div class="row">
              <div className="col-6">
              <a href="/login" className="btn btn-outline-dark btn-lg two-buttons">
                Login
              </a>
              </div>
              <div className="col-6">
              <a href="/signup" className="btn btn-outline-dark btn-lg two-buttons">
                Register
              </a>
              </div>
            </div>
          )
        }
      })()}

    </div>
  );
}

export default Midhome;
