import React from "react";
import "./compStyles.css";
import LogoImg from "./cmpLogo2.png";
import {useHistory} from "react-router"
import {IsAuth} from "./auth/isAuth"

function Navbar() {
  // const x = "login";
  const history = useHistory();
  const handleLogout = () => {
      localStorage.clear();
      history.push("/home");
  };
  return (
    <div>
      <nav className="navbar color_margin  nav-margin navbar-expand-lg navbar-dark">
        <div className="container-fluid nav-pad">

          <a href="/"> <img className="cmp-logo-img"  src={LogoImg} /> </a>

          {(() => {
            if (IsAuth()) {
              return (
                <button onClick={() => handleLogout()} style={{ fontWeight: "bold" }} class=" btn  nav-link bbbtn navbar-text">
                  Logout
                </button>

              );
            } else {
              return (
                <a
                  style={{ fontWeight: "bold" }}
                  className="nav-link navbar-text"
                  href="/login"
                >
                  Login
                </a>
              );
            }
          })()}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
