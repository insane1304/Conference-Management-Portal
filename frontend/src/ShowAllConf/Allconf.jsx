import React from "react";

function Allconf({data}) {
  function fun (date) {
     var ddate= new Date(date);
     return ddate.toDateString()
  }

  return (
    <div className="search-table">
      <h3>All submissions : </h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Creation Date</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
        {data.map((conference) => (
          // <tbody>
            <tr>
              <td>{conference.title}</td>
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
