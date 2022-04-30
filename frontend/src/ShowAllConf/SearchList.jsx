import React from "react";
import "./compStyles.css";

function SearchList({ filteredResult }) {
  // const filtered = filteredPersons.map((person) => (
  //   <Card key={person.id} person={person} />
  // ));

  return (
    <div className="search-table">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
        {filteredResult.map((conference) => (

            <tr>
              <th scope="row">{conference.key}</th>
              <td>{conference.title}</td>
              <td><a href={"/conference/"+conference.id}>View</a></td>
            </tr>

        ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchList;
