import React from "react";

import Body from "./Body.jsx";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar"

function App() {
  return (
    <div className="APP">
    <Sidebar/>
    <div className="card">
    <Navbar/>
      <Body/>
      </div>
    </div>
  );
}

export default App;
