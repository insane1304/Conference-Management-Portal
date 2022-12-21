import React from "react";
import ReactDOM from "react-dom";
// import { Router } from "react-router-dom";
import Midhome from "./Midhome.jsx";
import Nav from "../Navbar.jsx";
import Homebody1 from "./Homebody1.jsx";
import Homebody2 from "./Homebody2.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "../Sidebar"

function AppHome() {
  return (
    // <Router>
    <div className="APP">
      <Sidebar/>
      <div className="card">

      <Nav />
      <Homebody1 />
      <Midhome />
      <Homebody2 />
      <Footer />
      {/* </Router> */}
      </div>
    </div>
  );
}

export default AppHome;
