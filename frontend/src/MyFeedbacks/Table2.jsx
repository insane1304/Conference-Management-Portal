import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Table() {

  const [data, setData] = useState({});


  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const responseObject={url:window.location.pathname};
    const path="/author"+window.location.pathname;
    console.log(path);
    axios
        .post(path, responseObject, {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        })
          .then((response) => {
            console.log(response);
            if(response.status===200){
              console.log(response.data)
                setData(response.data);
                setLoading(false);
            }
            else if(response.status==400){
              alert("INVALID LINK");
            }
          })
          .catch((error) =>{
            console.log(error);
            alert("INVALID LINK");
          }

          );
  }, [isLoading]);



    function fun (date) {
       var ddate= new Date(date);
       return ddate.toDateString()+" - "+ddate.toLocaleTimeString()
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
  else {

    return (
      <div>
      <div class="bodypart-margin">
        <h1>My Feedbacks for the paper are here !</h1>
      </div>
    <div class="nav-margin">

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date & Time of Feedback</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
        {data.map((feedback,index) => (
        <tr>
          <td>{index+1}</td>
          <td>{fun(feedback.creation_date)}</td>
          <td>
            <a href={"/showfeedback"+window.location.pathname+"/"+feedback._id}>View</a>
          </td>
        </tr>

      ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
}
export default Table;
// HREF OF VIEW will be /paper/paper ka id
