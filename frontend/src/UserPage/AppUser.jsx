import React from "react";
import ReactDOM from "react-dom";
import Bodypart1 from "./Bodypart1.jsx";
import Navbar from "../Navbar.jsx";
import Table from "./Table.jsx";
import Sidebar from "../Sidebar"

function AppUser() {
  return (
    <div className="APP">
      <Sidebar/>
      <div className="card">
      <Navbar/>
      <Bodypart1 />
      </div>
    </div>
  );
}

export default AppUser;
