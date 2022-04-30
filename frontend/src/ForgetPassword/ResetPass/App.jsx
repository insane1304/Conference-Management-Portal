import { useState } from "react";
import "./compStyles.css";
import Navbar from "./Nav.jsx";

import { useForm } from "react-hook-form";
import axios from "axios";


export default function App() {
  const [isOk, setIsOk] = useState(false);
  const [submit, setSubmit] = useState(true);

  const { register, handleSubmit } = useForm();

  const onSubmit = ({
    newPass,
    confirmPass,
  }) => {
      const path="/author"+window.location.pathname;
      console.log(path);
      setSubmit(false);
      axios
          .post(path, {
            newPass,
            confirmPass,
          })
          .then((res) => {
              console.log(res.data);
              setIsOk(true);
          })
          .catch((error) => {
            setSubmit(true);
              if (error.response) {
                  alert(error.response.data);
              }
          });
  };
  return (
    <div>
      <Navbar />
      <div className=" card d-margin">
        <div>
          <h1 className="ph-center">Change password</h1>
        </div>
        <hr></hr>
        {(() => {
          if (isOk) {
            return (
              <p className="ph-center">
                Password changed successfully!.
              </p>
            );
          }
          else return(
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group div-padding">
                <label className="margin-everywhere" htmlFor="exampleInputEmail1">
                  <b>Enter new password</b>
                </label>
                <input
                  type="password"
                  name="newPass"
                  ref={register}
                  className="form-control"
                  placeholder="type here"
                ></input>
              </div>

              <div className="form-group div-padding">
                <label className="margin-everywhere" htmlFor="exampleInputEmail1">
                  <b>Confirm new password</b>
                </label>
                <input
                  type="password"
                  name="confirmPass"
                  ref={register}
                  className="form-control"
                  placeholder="type here"
                ></input>
                <button   type="submit" class="btn">
                  Submit
                </button>
              </div>
              {(() => {
                if (submit) {
                  return (
                    <button  type="submit" class="btn btn-outline-info">
                      Submit
                    </button>
                  );
                }
                else return(
                  <button  disabled type="submit" class="btn btn-outline-info">
                    Submit
                  </button>
                )
              })()}
            </form>
          )
        })()}



      </div>
    </div>
  );
}
