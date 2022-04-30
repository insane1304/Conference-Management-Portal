import { useState } from "react";
import "./compStyles.css";
import Navbar from "./Nav.jsx";

// below three modules are imported for country dropdown
import { useForm } from "react-hook-form";
import axios from "axios";

export default function App() {
  const [isOk, setIsOk] = useState(false);
  const [submit, setSubmit] = useState(true);


  const { register, handleSubmit } = useForm();

  const onSubmit = ({
    email,
  }) => {
    // console.log(country)
    setSubmit(false);
      axios
          .post("/author/forgetpass", {
            email,
          })
          .then((res) => {
              // alert("Successfully registered!");
              setIsOk(true);
              // history.push("/login");
          })
          .catch((error) => {
            setSubmit(true);
              if (error.response) {
                  alert(error.response.data);
              }
          });
  };

  return (
    <div>
      <Navbar />
      <div className="card d-margin">
        <div>
          <h1 className="ph-center">Forgot password</h1>
        </div>
        <hr></hr>
          {(() => {
            if (isOk) {
              return (
                <p className="ph-center">
                  A link has sent to this email, use that link to change
                  password
                </p>
              );
            }
            else return(
                      <form  onSubmit={handleSubmit(onSubmit)}>
              <div className="margin-everywhere">
                <label className="margin-everywhere" htmlFor="exampleInputEmail1">
                  <b>Enter registered email</b>
                </label>
                <input
                  type="email"
                  name="email"
                  ref={register}
                  className="form-control"
                  placeholder="type here"
                ></input>
                {(() => {
                  if (submit) {
                    return (
                      <button  type="submit" class="btn btn-outline-info">
                        Submit
                      </button>
                    );
                  }
                  else return(
                    <button  disabled type="submit" class="btn btn-outline-info">
                      Submit
                    </button>
                  )
                })()}
              </div>
                      </form>
            )
          })()}

      </div>
    </div>
  );
}
