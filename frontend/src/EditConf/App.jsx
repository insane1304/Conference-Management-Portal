import React from "react";
import EditConf from "./EditConf.jsx";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar"

export default function App() {
  return (
    <div className="APP" >
    <Sidebar />
    <div className="card">
      <Navbar />
      <EditConf />
    </div>
    </div>
  );
}
