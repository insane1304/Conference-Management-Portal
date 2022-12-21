import  { useState } from "react";
import Navbar from "../Navbar.jsx";

import { useEffect } from "react";
import axios from "axios";
import {IsAuth} from "../auth/isAuth.js"

function Feedback() {

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(IsAuth()){

      const responseObject={url:window.location.pathname};
        const path="/author"+window.location.pathname;
        axios
            .post(path, responseObject, {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
              .then((response) => {
                console.log(response.data)
                  setData(response.data);

                  setLoading(false);
              })
              .catch((error) => {
                console.log(error)
                alert(error.response.data);
              });
            }
      else{
        alert("Access Denied")
      }

  }, [isLoading]);


  function fun (date) {
     var ddate= new Date(date);
     return ddate.toDateString()
  }

  if (isLoading) {
      return (
          <div className="text-center">
              <div className="spinner-border text-info m-3" role="status">
                  <span className="sr-only p-2">Loading...</span>
              </div>
          </div>
      );
  }


  return (
    <>
      <div className="card card-margin">
        <div>
          <Navbar />
        </div>
        {/* <div className="card-body"> */}
        <h1 className="feedback-title-ontop">Feedback</h1>
        {/* </div> */}

        <div className="table-margin">
          <hr />
          <table class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th scope="col">Question</th>
                <th scope="col">Given Feedback</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th>How well does the proposal meet the conference theme ?</th>
                <td>{data[0].ans}</td>
              </tr>
              <tr>
                <th scope="row">
                  What is overall conceptual quality of the paper ?
                </th>
                <td>{data[1].ans}</td>
              </tr>
              <tr>
                <th scope="row">
                  Originality, novelty and innovation of the work ?
                </th>
                <td>{data[2].ans}</td>
              </tr>
              <tr>
                <th scope="row">Overall evaluation ?</th>
                <td>{data[3].ans}</td>
              </tr>
              <tr>
                <th scope="row">Grammar ?</th>
                <td>{data[4].ans}</td>
              </tr>
            </tbody>
          </table>
          {/* <p>grey green blue red</p> */}
        </div>
      </div>
    </>
  );
}

export default Feedback;
