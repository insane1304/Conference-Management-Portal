import React from "react";
import "./comppStyles.css";
// 0DCAF0
import { useState, useEffect } from "react";
import axios from "axios";

import Rate from "./Rate";


function Cardpaper() {
  const [data, setData] = useState({});
  const [paper, setPaper] = useState({});
  const [conference, setConference] = useState({});
  const [author, setAuthor] = useState({});
  const [rate, setRate] = useState({});
  const [isReviewer, setIsReviewer] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [usersrated, setUsersrated] = useState({});
  const [editable, setEditable] = useState(true);
  const [isLoading, setLoading] = useState(true);

  function getDateAndTime (date) {
     var ddate= new Date(date);
     return ddate.toLocaleDateString()+", " +ddate.toLocaleTimeString();
  }


  useEffect(() => {
    const responseObject={url:window.location.pathname};
      const path="/conference/getpaperdetail"+window.location.pathname;
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
                setPaper(response.data[0]);
                setConference(response.data[2]);
                setAuthor(response.data[1]);
                setRate(response.data[3]);
                console.log(response.data[3])
                setIsReviewer(response.data[4]);
                setIsAuthor(response.data[5]);
                setUsersrated(response.data[6]);
                // console.log("edit")
                // console.log(rate)
                // console.log(editable);
                if(rate.toString()!=="0"){
                  setEditable(false);
                }
                else{
                  // console.log("HIIIIIII");
                  setEditable(true);
                  // console.log(editable);
                }

                setLoading(false);
            })
            .catch((error) => {
              console.log(error)
              alert("INVALID LINK");
            });

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
  else{
    var props;
    if(rate===0){
       props={
        value:rate,
        editable:true,
      }
    }
    else{
       props={
        value:rate,
        editable:false,
      }
    }

  return (
    <div className=" paper-card-custom">
      <div style={{ backgroundColor: "#0DCAF0" }} className="card-header"><strong>
        Conference Name:
        </strong>{ " "+ conference.title}
      </div>
      <div className="card-body">
        <h5 className="card-title">{paper.title}</h5>
        <p className="card-text light-someone">- <a className="link-dark"  href={"/profile/"+author._id}>{author.firstName+" "+author.lastName}</a></p>
        <p className="card-text">
          <strong>Abstract</strong> {paper.abstract}
        </p>
        <p className="card-text">
          <strong>Keywords : </strong>{paper.keywords}
        </p>

        <a href={paper.url} className="btn btn-outline-info custom-button">
          Download Paper
        </a>

        {(() => {
        if (isReviewer || isAuthor) {
          return (
            <div>
              <div><a href={"/myfeedbacks/"+paper._id} className="btn btn-outline-info custom-button">
                Show Feedback
              </a></div>
            </div>
          )
        }
      })()}

        {(() => {
        if (isReviewer) {
          return (
            <div>
            <div><a href={"/givefeedback/"+paper._id} className="btn btn-outline-info custom-button">
              Give Feedback
            </a></div>
            </div>
          )
        }
      })()}




        <div className="d-custom">
          <p>
          <strong> Rate us </strong> : <Rate props={props}/>
          </p>
        </div>

        <div className="d-custom">
          <p>{"Current rating is : "+parseFloat(paper.rating.$numberDecimal).toFixed(1)+" ⭐"}</p>
        </div>

        <hr />
        <div>
          <h3 className="comment-sec">Rating and Reviews </h3>
          {usersrated.map((user) => (

            <div className="feedback-iname">
            <hr />
              <h5>{user.user_firstName+" "+user.user_lastName}</h5>
              <label> Rated : {user.rate.$numberDecimal} ⭐ </label>

              <p>{user.user_feedback}</p>
              <sub>{"Time: "+getDateAndTime(user.creation_date)}</sub>

            </div>

        ))}
        </div>
      </div>
    </div>
  );
}
}

// <p> <sub>{"Time: "+getDateAndTime(user.creation_date)}</sub> </p>

export default Cardpaper;
