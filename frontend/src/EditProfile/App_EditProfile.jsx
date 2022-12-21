import React from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import EditProfile from "./EditProfile.jsx";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar"

function App_EditProfile() {
  return (
    <div className="APP">
      <Sidebar/>
      <div className="card">

        <Navbar />
        <EditProfile />
      </div>
    </div>
  );
}

export default App_EditProfile;
