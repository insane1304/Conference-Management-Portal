import React from "react";
import "./compStyles.css";


function Navbar() {
  return (
    <div>
      <nav className="navbar nav-margin navbar-light bg-info">
        <div className="container-fluid nav-pad">
          <a className="navbar-brand" href="/">
            CMP
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li class="nav-item">
              <a class="nav-link" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/allconferences">
                Recent-Conferences
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/login">
                Login
              </a>
            </li>


            </ul>
            <span className="navbar-text">Publications</span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
