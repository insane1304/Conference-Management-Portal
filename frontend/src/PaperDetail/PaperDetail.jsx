import React from "react";
import Cardpaper from "./Cardpaper.jsx";
import Sidebar from "../Sidebar"

import Navbar from "../Navbar.jsx";

function App() {
  return (
    <div className="APP">
      <Sidebar />
      <div className="card">
        <Navbar />
        <Cardpaper />
      </div>
    </div>
  );
}

export default App;
