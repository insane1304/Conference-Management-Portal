import React from "react";
import "../index.css";
import "./edit-profile.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useState } from "react";

export default function UpdateProfile() {

  // console.log(options);
  const { submit, setSubmit } = useState(false);
  const { register, handleSubmit } = useForm();

  const history = useHistory();
  const onCancelButton =()=>{
    console.log("HI");
    history.push('/user')
  }
  const onSubmit = ({
    initialPass,
    newPass,
    confirmPass
  }) => {
    // console.log(country)
    setSubmit(true);
    const responseObject={
      initialPass:initialPass,
      newPass:newPass,
      confirmPass:confirmPass
    };
    axios
        .post("author/updatepassword", responseObject, {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        })
          .then((res) => {
              alert("Profile Updated Successfully");
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

  return (
    <div class="edit-signup-class">
      <form onSubmit={handleSubmit(onSubmit)}>

      <h3 className="hh3">Update Password</h3>
      <hr></hr>
      {/* change password */}
      <div className="form-group row">
        <label className="col-form-label">Old password</label>
        <div className="">
          <input
            className="form-control inp-length"
            type="password"
            id="password"
            name="initialPass"
            ref={register}
            placeholder="enter old password"
          />
        </div>
      </div>

      <div className="form-group row">
        <label className=" col-form-label">New password</label>
        <div className="">
          <input
            className="form-control inp-length"
            type="password"
            id="password"
            name="newPass"
            ref={register}
            placeholder="enter new password"
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-form-label">
          Confirm new password
        </label>
        <div className="">
          <input
            className="form-control inp-lentgh"
            type="password"
            id="confirm-password"
            name="confirmPass"
            ref={register}
            placeholder="re-enter new password"
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
