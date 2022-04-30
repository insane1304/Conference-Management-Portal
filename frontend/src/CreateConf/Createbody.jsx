import React from "react";
import "./compStyles.css";

import { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useForm} from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios";

function Createbody() {
  const [submit, setSubmit] = useState(false);

  const { register, handleSubmit , watch } = useForm();
  const history = useHistory();

  function onSubmit() {
    // console.log(country)
    setSubmit(true);
    const title= watch("title");
    const description= watch("description");
    const venue= watch("venue");
    const researchArea= watch("researchArea");
    const startDate= watch("startDate");
    const endDate= watch("endDate");

    const responseObject = {
      title: title,
      description:description,
      venue:venue,
      researchArea:researchArea,
      startDate: startDate,
      endDate: endDate,
     };

    console.log(title);
    axios
        .post("/author/createConf", responseObject, {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        })
          .then((res) => {
              alert("Successfully submitted!");
              history.push("/user");
          })
          .catch((error) => {
              if (error.response) {
                  alert(error.response.data);
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              }
              setSubmit(false);
          });
  };



  return (
    <div className="dcc-margin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group div-padding">
          <label className="margin-everywhere" htmlFor="exampleInputEmail1">
            Title/Name
          </label>
          <input
            type="text"
            name="title"
            className="form-control margin-everywhere"
            placeholder="Title of Conference"
            ref={register}
          ></input>
        </div>

        {/* <div className="form-group">
          <label>Your role</label>
          <input type="text" className="form-control"></input>
        </div> */}

        <div className="form-group div-padding">
          <label className="margin-everywhere" htmlFor="exampleInputEmail1">
            Description
          </label>
          <textarea
            className="form-control margin-everywhere"
            placeholder="Description"
            name="description"
            ref={register}
            rows={5}
          ></textarea>
        </div>

        <div className="form-group div-padding">
          <label className="margin-everywhere" htmlFor="exampleInputEmail1">
            Venue
          </label>
          <input
            type="text"
            name="venue"
            className="form-control margin-everywhere"
            placeholder="Venue"
            ref={register}
          ></input>
        </div>

        <div className="form-group div-padding">
          <label className="margin-everywhere" htmlFor="exampleInputEmail1">
            Research Area
          </label>
          <input
            type="text"
            name="researchArea"
            className="form-control margin-everywhere"
            placeholder="Research Area"
            ref={register}
          ></input>
        </div>


        <div className="row">
          <div className="col-6">
            <label className="Date" for="start">
              Start date:
            </label>

            <input
              className="Date"
              type="date"
              id="start"
              name="startDate"
            />
          </div>
          <div className="col-6">
            <label className="Date" for="start">
              End date:
            </label>

            <input
              className="Date"
              type="date"
              id="end"
              name="endDate"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submit}
          className="btn btn-primary div-padding margin-everywhere bbtn"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Createbody;
