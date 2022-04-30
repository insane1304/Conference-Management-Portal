import React from "react";
import { Link } from "react-router-dom";

import "./index.css";
import "./signup-page.css";
import Navbar from "./Navbar.jsx";

// below three modules are imported for country dropdown
import { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios";

export default function SignUp() {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  // console.log(options);

  const [submit, setSubmit] = useState(true);
  const changeHandler = (value) => {
    setValue(value);
  };

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = ({
    firstName,
    lastName,
      email,
      password,
      contact,
      organisation,
      confirmPassword,
      country=value.label,
  }) => {
    // console.log(country)
    setSubmit(false);
      axios
          .post("/author/register", {
            firstName,
            lastName,
            email,
            password,
            contact,
            organisation,
            confirmPassword,
            country,
          })
          .then((res) => {
              alert("Successfully registered!");
              history.push("/login");
          })
          .catch((error) => {
              if (error.response) {
                  alert(error.response.data);
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              }
              setSubmit(true);
          });

  };


  return (
    <div>
      <Navbar />
      <div class="signup-class">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4>Create New Account</h4>
          <hr />
          {/* Login Information */}
          <h5 style={{ padding: "4" }}>Login Information</h5>
          <div class="row m-2">
            <div class="col-md-6 text-right pt-2 required">Enter Email</div>
            <div class="col-md-6">
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="Email"
                ref={register}
              />
            </div>
          </div>
          <div class="row m-2">
            <div class="col-md-6 text-right pt-2 required">Password</div>
            <div class="col-md-6">
              <input
                class="form-control"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                ref={register}
              />
            </div>
          </div>
          <div class="row m-2">
            <div class="col-md-6 text-right pt-2 required">
              Confirm Password
            </div>
            <div class="col-md-6">
              <input
                class="form-control"
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="Confirm Password"
                ref={register}
              />
            </div>
          </div>
          <hr />

          {/* Personal Information */}

          <h5 style={{ padding: "4" }}>Personal Information</h5>
          <div class="row m-2">
            <div class="col-md-6 text-right pt-2 required">First Name</div>
            <div class="col-md-6">
              <input
                type="text"
                class="form-control"
                id="first-name"
                name="firstName"
                placeholder="First Name"
                ref={register}
              />
            </div>
          </div>
          <div class="row m-2">
            <div class="col-md-6 text-right pt-2 required">Last Name</div>
            <div class="col-md-6">
              <input
                class="form-control"
                type="text"
                id="last-name"
                name="lastName"
                placeholder="Last Name"
                ref={register}
              />
            </div>
          </div>
          <div class="row m-2">
            <div class="col-md-6 text-right pt-2 required">Contact Number</div>
            <div class="col-md-6">
              <input
                class="form-control"
                type="number"
                id="last-name"
                name="contact"
                placeholder=""
                ref={register}
              />
            </div>
          </div>
          <div class="row m-2">
            <div class="col-md-6 text-right pt-2 required">
              Organisation Name
            </div>
            <div class="col-md-6">
              <input
                class="form-control"
                type="text"
                id="org-name"
                name="organisation"
                placeholder="Organisation"
                ref={register}
              />
            </div>
          </div>
          <div class="row m-2">
            <div class="col-md-6 text-right pt-2 required">Country</div>
            <div name="country" class="col-md-6">
              <Select
                name="country"
                options={options}
                value={value}
                onChange={changeHandler}
                ref={register}
              />
              {/* <p>The country name is: {value.label}</p> */}
            </div>
          </div>
          <hr />
          <div class="row mt-3">
            <div class="col">
            {(() => {
              if (submit) {
                return (
                  <button  type="submit" class="btn-css">
                    Register
                  </button>
                );
              }
              else return(
                <button  disabled type="submit" class="btn-css">
                  Register
                </button>
              )
            })()}
            </div>
          </div>
          <hr />
          <div class="row" style={{ textAlign: "center" }}>
            <div class="col-md-12 forgot-password">
              Already Registered? <a href="/login">Login</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
