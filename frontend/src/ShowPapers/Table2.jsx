import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import {IsAuth} from "../auth/isAuth"

function Table() {

  const [data, setData] = useState({});
  const [title, setTitle] = useState("");

  const [isMember, setIsMember] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [isLoading, setLoading] = useState(true);

  const requestAuthorRole=()=>{
    if(!IsAuth()){
      alert("Please login to Request")
    }
    else{
      setDisabled(true);
      const responseObject={url:window.location.pathname};
      const path="/author/request-author-role"+window.location.pathname;
      console.log(path)
      axios
          .post(path, responseObject, {
              headers: {
                  "auth-token": localStorage.token,
                  "Content-Type": "application/json",
              },
          })
            .then((response) => {
              console.log(response.data)
              alert(response.data)
              setDisabled(false)
            })
            .catch((error) => {
              console.log(error)
              if(error.response.data){
                // console.log(error.response.data)
                alert(error.response.data)
              }
              setDisabled(false)
            });
    }

  }
  const requestReviwerRole=()=>{
    if(!IsAuth()){
      alert("Please login to Request")
    }
    else{
      setDisabled(true)
      const responseObject={url:window.location.pathname};
      const path="/author/request-reviewer-role"+window.location.pathname;
      console.log(path)
      axios
          .post(path, responseObject, {
              headers: {
                  "auth-token": localStorage.token,
                  "Content-Type": "application/json",
              },
          })
            .then((response) => {
              console.log(response.data)
              alert(response.data)
              setDisabled(false)
            })
            .catch((error) => {
              console.log(error)
              if(error.response.data){
                // console.log(error.response.data)
                alert(error.response.data)
              }
              setDisabled(false)
            });
    }
  }

  useEffect(() => {
    const responseObject={url:window.location.pathname};
    const path="/conference/showpapers"+window.location.pathname;
    console.log(path)
    axios
        .post(path, responseObject, {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        })
          .then((response) => {
            console.log(response.data)
              setData(response.data[0]);
              if(response.data[1]===1 || response.data[1]===true)
              {
                setIsMember(true)
              }
              setTitle(response.data[2])
              setLoading(false);

              if(!IsAuth()){
                console.log("HO");
                setIsMember(false)
                // setDisabled(true)
              }
          })
          .catch((error) => {
            console.log(error)
            if(error.response.data){
              // console.log(error.response.data)
              alert(error.response.data)
            }
          });
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
  else {
    console.log(isMember)
    return (
      <div>
      <div class="bodypart-margin">
        <h1>All submissions for the conference "{title}" are here !</h1>
      </div>
    <div class="nav-margin">
    {(() => {
        if (!isMember) {
          return (
            <div>
              <button onClick={requestAuthorRole} disabled={disabled} class="btn btn-outline-info">
                Request Author Role
              </button>
              <button onClick={requestReviwerRole} disabled={disabled}  class="btn btn-outline-info">
                Request Reviewer Role
              </button>
            </div>
          )
        }
      })()}

      <table class="table table-hover">
        <thead>
          <tr>
          <th scope="col">#</th>
            <th scope="col">Paper Title</th>
            <th scope="col">Creation Date</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
        {data.map((paper,index) => (
        <tr>
        <td>{index+1}</td>
          <td>{paper.title}</td>
          <td>{fun(paper.creation_date)}</td>
          <td>
            <a href={"/paper/"+paper.id}>view</a>
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
