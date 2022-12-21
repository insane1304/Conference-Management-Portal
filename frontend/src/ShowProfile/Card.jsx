import "./compStyles.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Card(props) {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const responseObject={url:window.location.pathname};
    const path="/author/showprofile"+window.location.pathname;
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
          .catch((error) =>{
             console.log(error)
             alert("INVALID LINK");
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
  else{
    const logged_user=data[0];
    const searched_user=data[1];
    // console.log(logged_user);
    // console.log(searched_user);
    const conferences=data[2];

  return (
    <div>

      {(() => {
        if (searched_user.length===0){
          return (
            <div >
            <h1>No such user found. Please check the link again.</h1>
            </div>
          );
      }
      else{
        return (
          <div>
          <div class=" card-custom">
            <div class="card-header">Profile Card</div>
            <div class="card-body">
              <h5 class="card-title">{searched_user.firstName+" "+searched_user.lastName}</h5>
              <p class="card-text">{searched_user.email+ " | "+searched_user.contact}</p>
              <p class="card-text">{"Organisation: "+searched_user.organisation}</p>
              {(() => {
                if (logged_user!=[] && searched_user._id === logged_user._id) {
                  return (
                    <a href="/editprofile" class="btn btn-outline-info">
                      Edit Profile
                    </a>
                  );
                }
              })()}
            </div>
        <hr></hr>

        <div className="search-table">
          <h3>All submissions : </h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Paper Title</th>
                <th scope="col">Submission Date</th>
                <th scope="col">Link</th>
              </tr>
            </thead>

            <tbody>
            {conferences.map((paper,index) => (
            <tr>
              <td>{paper.title}</td>
              <td>{fun(paper.creation_date)}</td>
              <td>
                <a href={"/paper/"+paper._id}>view</a>
              </td>
            </tr>

          ))}
            </tbody>
          </table>
        </div>
      </div>
          </div>
        )


      }
    })
      ()

        }

    </div>
  );
}
}

export default Card;
