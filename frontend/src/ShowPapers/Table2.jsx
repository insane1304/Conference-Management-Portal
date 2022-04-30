import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Table() {

  const [data, setData] = useState({});

  const [paperData, setPaperData] = useState({});

  const [isData, setIsData] = useState(true);

  const [fetchPaper, setfetch] = useState(false);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const responseObject={url:window.location.pathname};
    axios
        .post("/conference/showpapers", responseObject, {
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
          .catch((error) => console.log(error));
  }, [isLoading]);

  // if(isData==false){
    // useEffect(() => {
    //   if(fetchPaper==true){
    //     const responseObject={data:data.paper_urls};
    //     axios
    //         .post("/conference/getpapertitle", responseObject, {
    //             headers: {
    //                 "auth-token": localStorage.token,
    //                 "Content-Type": "application/json",
    //             },
    //         })
    //           .then((response) => {
    //             console.log(response.data)
    //               setPaperData(response.data);
    //               setLoading(false);
    //               setfetch(false);
    //           })
    //           .catch((error) => console.log(error));
    //   }

    // }, [fetchPaper]);

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
    console.log(data)
    return (
    <div class="nav-margin">
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
        {data.map((paper) => (
        <tr>
          <th scope="row">{paper.key+1}</th>
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
  );
}
}
export default Table;
// HREF OF VIEW will be /paper/paper ka id
