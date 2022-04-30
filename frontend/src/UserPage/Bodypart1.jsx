import React from "react";
// import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

function Bodypart1() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
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
  else return (
    <div class="bodypart1-margin">
      <h1>{data.firstName+" "+data.lastName}</h1>
      <hr></hr>
      <h2>Welcome to CMP!</h2>
    </div>
  );
}

export default Bodypart1;
