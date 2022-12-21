import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


function Table() {
  const IsAccept=(e)=> {
    // console.log(e.target.value)
    // console.log("conference_id")
    // console.log(e.target.value)
    // console.log("user_id")
    // console.log(e.target.name)
    const conf_id=e.target.value;
    const user_id=e.target.name;
    const role=e.target.id;

    const responseObject={
      conf_id:conf_id,
      user_id:user_id,
      role:role,
    };
    const newData = data.filter(function (el) {
      return el.conference_id !== conf_id &&
             el.user_id !== user_id &&
             el.role !== role;
    });

    setData(newData)
    const path="/author/approve-request";
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

          })
          .catch((error) => {
            console.log(error)
            if(error.response.data){
              alert(error.response.data)
            }
          });

    // console.log(conf_id)
    // console.log(user_id)
    // console.log(role)


  }

  const IsCancel=(e)=> {

    const conf_id=e.target.value;
    const user_id=e.target.name;
    const role=e.target.id;

    const newData = data.filter(function (el) {
      return el.conference_id !== conf_id &&
             el.user_id !== user_id &&
             el.role !== role;
    });

    setData(newData)

    const responseObject={
      conf_id:conf_id,
      user_id:user_id,
      role:role,
    };
    const path="/author/reject-request";
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

          })
          .catch((error) => {
            console.log(error)
            if(error.response.data){
              alert(error.response.data)
            }
          });
  }


  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
      axios
          .get("/author/get-pending-requests", {
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
          .catch((error) => {
            if(error.response.data){
              alert(error.response.data)
            }
            console.log(error)
          });
  }, [isLoading]);

  function fun (date) {
     var ddate= new Date(date);
     return ddate.toDateString()+" "+ddate.toLocaleTimeString()
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
  else
 console.log(data)
  return (
    <div className="table-margin">

      {(() => {
        if (data.length!==0) {
          return (
            <div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="">Conference Title</th>
                  <th scope="">User Name</th>
                  <th scope="">Date & Time of Request</th>
                  <th scope="">Role</th>
                  <th scope="">Decision</th>
                </tr>
              </thead>
              <tbody>

                    {data.map((request) => (

                    <tr>
                      <td><a className="link-dark" href={"/conference/"+request.conference_id}>{request.conference_titile}</a></td>
                      <td><a className="link-dark" href={"/profile/"+request.user_id}>{request.user_firstName+" "+request.user_LastName}</a></td>

                      <td>{fun(request.creation_date)}</td>
                      <td>
                        {request.role}
                      </td>
                      <td>
                      <div>
                        <button
                          style={{ margin: "2px" }}
                          className=" btn pendingrequests-btn btn-outline-success"
                          onClick={IsAccept}
                          name={request.user_id}
                          value={request.conference_id}
                          id={request.role}
                        >
                          Accept
                        </button>
                        <button
                          style={{ margin: "2px" }}
                          className="btn btn-outline-danger pendingrequests-btn"
                          onClick={IsCancel}
                          name={request.user_id}
                          value={request.conference_id}
                          id={request.role}
                        >
                          Cancel
                        </button>
                      </div>
                      </td>
                    </tr>

                  ))}

              </tbody>
            </table>
            </div>
          );
        } else {
          return (
          <h2 style={{textAlign:"center"}}>No Pending Requests! </h2>
          );
        }
      })()}

    </div>
  );
}

export default Table;
