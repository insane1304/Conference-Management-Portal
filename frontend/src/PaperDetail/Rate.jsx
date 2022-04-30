import React from "react";
import ReactStars from "react-rating-stars-component";
import { confirmAlert } from "react-confirm-alert"; // Import

import "react-confirm-alert/src/react-confirm-alert.css";

import {IsAuth} from "../auth/isAuth";
import axios from "axios";

export default  function Rate({props}){

  // console.log("props");
  // console.log(props.value);

  const secondExample = {
    size: 20,
    count: 5,
    color: "black",
    activeColor: "red",
    value: props.value,
    a11y: true,
    edit: props.editable,
    emptyIcon: <i className="far fa-star" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      var check=IsAuth();
      console.log(check)
      if(check===true){
        var val = newValue;

        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="alert">
              <form >
                <h1 className="alert__title">Confirm to submit</h1>
                <p className="alert__body">Are you sure you eant to submit ?</p>
                <p className="alert__body">
                  Please give your feedback. Your feedback matters!
                </p>
                <input
                  type="text"
                  name="feedback"
                  id="feedback"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  className="form-control"
                  // ref={register}
                ></input>
                <button
                  type="submit"
                  className="btn btn-outline-warning submit-button "
                  onClick={() => {
                    // alert(document.getElementById("feedback").value);
                    const responseObject={
                      val:newValue,
                      feedback:document.getElementById("feedback").value
                    };
                    const path="author/submitrating"+window.location.pathname;
                    axios
                        .post(path, responseObject, {
                            headers: {
                                "auth-token": localStorage.token,
                                "Content-Type": "application/json",
                            },
                        })
                          .then((response) => {
                            console.log(response);
                            alert("Rating Submitted");
                            onClose();
                          })
                          .catch((error) =>{
                            console.log(error);
                            alert("Unable to submit your rating");
                            onClose();
                            // alert(error);
                          }

                          );

                    // this.handleClickDelete();
                    // console.log(`Example 2: new value is ${newValue}`);

                  }}
                >
                  Submit
                </button>

                <button
                  className="btn btn-outline-warning cancel-button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                </form>
              </div>
            );
          }
        });
      }
      else{
        alert("Please login first to rate")
      }
    }
  };

  return (
    <div>
      <ReactStars {...secondExample} />
    </div>
  );
}
