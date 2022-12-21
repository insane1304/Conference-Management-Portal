import React from "react";
import "./compStyles.css";

function SearchList({
  filteredResult
}) {
  // const filtered = filteredPersons.map((person) => (
  //   <Card key={person.id} person={person} />
  // ));
  function fun(date) {
    var ddate = new Date(date);
    return ddate.toDateString()
  }


  return ( <
    div className = "search-table" >
    <
    table className = "table table-hover" >
    <
    thead >
    <
    tr >

    <
    th scope = "col" > # < /th>
    <
    th scope = "col" > Title < /th>
    <
    th scope = "col" > Research Area < /th>
    <
    th scope = "col" > Description < /th>
    <
    th scope = "col" > Creation Date < /th> <
    th scope = "col" > Link < /th> <
    /tr> <
    /thead> <
    tbody > {
      filteredResult.map((conference,index) => (

        <
        tr >
        <
        td > {
          index+1
        } < /td>
        <
        td > {
          conference.title
        } < /td>
        <
        td > {
          conference.researchArea
        } < /td>
        <
        td > {
          conference.description
        } < /td> <
        td > {
          fun(conference.creation_date)
        } < /td> <
        td > < a href = {
          "/conference/" + conference._id
        } > View < /a></td >
        <
        /tr>

      ))
    } <
    /tbody> <
    /table> <
    /div>
  );
}

export default SearchList;
