import React from "react";

function Allconf({data}) {
  function fun (date) {
     var ddate= new Date(date);
     return ddate.toDateString()
  }

  return (
    <div className="search-table">
      <h3>All conferences : </h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Research Area</th>
            <th scope="col">Description</th>
            <th scope="col">Creation Date</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
        {data.map((conference,index) => (
          // <tbody>
            <tr>
            <td>{index+1}</td>
              <td>{conference.title}</td>
              <td>{conference.researchArea}</td>
              <td>{conference.description}</td>
              <td>{fun(conference.creation_date)}</td>
              <td>
              <a href={"/conference/"+conference._id}>View</a></td>
            </tr>
          // </tbody>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Allconf;
