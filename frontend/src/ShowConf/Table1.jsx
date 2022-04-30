import React from "react";
// import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";


function Table() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
      axios
          .get("/author/myconferences", {
              headers: {
                  "auth-token": localStorage.token,
                  "Content-Type": "application/json",
              },
          })
          .then((response) => {
            console.log(response.data);
              setData(response.data);
              setLoading(false);
          })
          .catch((error) => console.log(error));
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

  else {console.log(data);
  return (
    <div class="nav-margin">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Conderence Title</th>
            <th scope="col">Creation date</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
        {data.map((conference) => (

        <tr>
          <td>{conference.title}</td>

          <td>{fun(conference.creation_date)}</td>
          <td>
            <a href={"/conference/"+conference._id+"/mysubmittions"}>view</a>
          </td>
        </tr>

      ))}
        </tbody>
      </table>
    </div>
  );
}
}
export default Table;
// HREF of view will be /conferences/conference ki id
