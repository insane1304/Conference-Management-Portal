import React from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import UpdatePassword from "./UpdatePassword.jsx";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar"

function App_UpdatePassword() {
  return (
    <div className="APP">
      <Sidebar />
      <div className="card">
      <Navbar />
      <UpdatePassword />
      </div>
    </div>
  );
}

export default App_UpdatePassword;
