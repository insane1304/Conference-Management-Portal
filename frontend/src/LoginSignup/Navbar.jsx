import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <nav class="navbar  navbar-dark navbar-custom">
        <div class="container-fluid">
          {/* add path to homepage */}
          <Link to="/" class="navbar-brand">
            CMT
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarText">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a href="/" class="nav-link">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a href="/login" class="nav-link">
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a href="/signup" class="nav-link">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
