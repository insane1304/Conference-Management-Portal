import React from "react";
import "../index.css";
import "./edit-profile.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";


export default function EditProfile() {
  // console.log(options);

  const [firstName, setFirstName] = useState({});
  const [lastName, setLastName] = useState({});
  const [organisation, setOrganisation] = useState({});
  const [email, setEmail] = useState({});
  const [contact, setContact] = useState({});
  const [submit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = () => {
    // console.log(country)
    setSubmit(true);
    const responseObject={
      firstName:firstName,
      lastName:lastName,
      email:email,
      contact:contact,
      organisation:organisation
    };
    axios
        .post("/author/editProfile", responseObject, {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        })
          .then((res) => {
              alert("Profile updated successfully!");
              history.push("/user");
          })
          .catch((error) => {
              if (error.response) {
                  alert(error.response.data);
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              }
              setSubmit(false);
          });
  };

  const onCancelButton =()=>{
    console.log("HI");
    history.push('/user')
  }
  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = e => {
    setLastName(e.target.value);
  };
  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handleContactChange = e => {
    setContact(e.target.value);
  };
  const handleOrganisationChange = e => {
    setOrganisation(e.target.value);
  };

  useEffect(() => {
      axios
          .get("/author/profile", {
              headers: {
                  "auth-token": localStorage.token,
                  "Content-Type": "application/json",
              },
          })
          .then((response) => {
            console.log(response.data);
              setFirstName(response.data.firstName);
              setLastName(response.data.lastName);
              setContact(response.data.contact);
              setEmail(response.data.email);
              setOrganisation(response.data.organisation);
              setLoading(false);
          })
          .catch((error) => console.log(error));
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
    <div className="d-center">
      <form onSubmit={handleSubmit(onSubmit)}>

        <h3 className="hh3">Edit Profile</h3>
        <hr></hr>

        <div className="form-group row">
          <label className=" col-form-label">Email</label>
          <div className="">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>

        {/* personal imformation  */}

        <div className="form-group row">
          <label className=" col-form-label">First Name</label>
          <div className="">
            <input
              type="text"
              className="form-control"
              id="first-name"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              ref={register}
              onChange={handleFirstNameChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className=" col-form-label">Last Name</label>
          <div className="">
            <input
              className="form-control"
              type="text"
              id="last-name"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              ref={register}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className=" col-form-label">Contact</label>
          <div className="">
            <input
              className="form-control"
              type="tel"
              id="phone"
              name="contact"
              placeholder=""
              value={contact}
              // pattern="[1-9]{1}[0-9]{9}"
              onChange={handleContactChange}
              ref={register}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className=" col-form-label">Organisation Name</label>
          <div className="">
            <input
              className="form-control"
              type="text"
              id="org-name"
              name="organisation"
              placeholder="Organisation"
              value={organisation}
              onChange={handleOrganisationChange}
              ref={register}
            />
          </div>
        </div>

        <div className="form-group">
          <button
            type="submit"
            disabled={submit}
            className="btn btn-outline-success btn-lg btn-block"
          >
            Save Changes
          </button>
          <button
            type="button"
            disabled={submit}
            onClick={onCancelButton}
            className="btn btn-outline-success btn-lg btn-block"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
