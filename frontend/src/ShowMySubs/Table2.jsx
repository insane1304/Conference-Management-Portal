import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Table() {

  const [data, setData] = useState({});

  const [confId, setConfId] = useState({});
  const [isChairperson, setIsChairperson] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [title, setTitle] = useState("");

  const [isData, setIsData] = useState(true);

  const [fetchPaper, setfetch] = useState(false);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const responseObject={url:window.location.pathname};
    const path="author/showmysubs"+window.location.pathname;
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
                setData(response.data.result);
                setConfId(response.data.conf_id);
                setIsChairperson(response.data.isChairperson);
                setIsAuthor(response.data.isAuthor);
                setTitle(response.data.conf_title)
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
    console.log(isAuthor)
    return (
      <div>
      <div class="bodypart-margin">
        <h1>My submissions for the conference "{title}" are here !</h1>
      </div>
    <div class="nav-margin">
    <a href={/conference/+confId} class="btn btn-outline-info">
          Show All Submittions for this conference
        </a>

        {(() => {
            if (isChairperson) {
              return (
                <div>
                <a href={"/editconf/"+confId}  class="btn btn-outline-info">
                  Edit Conf
                </a>
                </div>
              )
            } else if(isAuthor===1 || isAuthor===true){
              return(
              <div>
              <a href={"/conference/"+confId+"/upload"}  class="btn btn-outline-info">
                Upload New Submission
              </a>
              </div>
            )
            }
          })()}

      <table class="table table-hover">
        <thead>
          <tr>
          <th scope="col">#</th>
            <th scope="col">Paper Title</th>
            <th scope="col">Submission Date</th>
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
