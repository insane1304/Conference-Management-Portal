import React from "react";
import { Link } from "react-router-dom";
import "./login-page.css";
import "./index.css";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar"
import{ useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router";

 const Login = () => {

  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [submit, setSubmit] = useState(true);


  const onSubmit = ({ email, password }) => {
    setSubmit(false);
      axios
          .post("/author/login", {
              email,
              password,
          })
          .then((res) => {
                  localStorage.setItem("token", res.data);
                  history.push("/user");

          })
          .catch((err) => {

              console.log({ err });

              alert(err.response.data);
              setSubmit(true)
          });
  };

  return (
    <div className="APP">
    <Sidebar />
    <div className="card">
      <Navbar />
      <div class="login-class">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 style={{ textAlign: "left" }}>Login</h3>
          <hr />
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              ref={register}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              ref={register}
            />
          </div>

          <hr />
            {(() => {
              if (submit) {
                return (
                  <button  type="submit" class="btn-css">
                    Login
                  </button>
                );
              }
              else return(
                <button  disabled type="submit" class="btn-css">
                  Login
                </button>
              )
            })()}


          <hr />
          <div class="row">
            <div class="col-md-6 forgot-password">
              <Link to="/forgetpass">Forgot Password</Link>
            </div>
            <div class="col-md-6 forgot-password">
               <a href="/signup" > New to CMT ? Register</a>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
