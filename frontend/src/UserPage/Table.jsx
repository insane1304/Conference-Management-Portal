import React from "react";
import ReactDOM from "react-dom";

function Table() {
  console.log(    localStorage.getItem('token'));
  return (
    <div class="nav-margin">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Conderence Title</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Conference 1</td>
            <td>
              <a href="#">view</a>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Conference 2</td>
            <td>
              <a href="#">view</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
