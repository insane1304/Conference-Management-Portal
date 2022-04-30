import React from "react";
import "./compStyles.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";

function EditConf() {

  const [title, setTitle] = useState({});
  const [description, setDescription] = useState({});
  const [venue, setVenue] = useState({});
  const [researchArea, setResearchArea] = useState({});
  const [authors, setAuthors] = useState({});
  const [reviewers, setReviewers] = useState({});
  const [submit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [addAuth, setAddAuth] = useState(false);
  const [addReview, setAddReview] = useState(false);

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = () => {
    // console.log(country)
    setSubmit(true);
    const responseObject={
      title:title,
      description:description,
      venue:venue,
      researchArea:researchArea,

    };
    const path="/author"+window.location.pathname;
    axios
        .post(path, responseObject, {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        })
          .then((res) => {
              alert("Details updated successfully!");
              history.push("/conference/"+res.data+"/mysubmittions");
              setSubmit(false);
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

  const inviteAuthors = ({
    authorEmail,
  }) =>  {
    // console.log(country)
    console.log(authorEmail);
    setAddAuth(true);
    const responseObject={
      email:authorEmail,
    };
    const path="/author/addauthor"+window.location.pathname;
    axios
        .post(path, responseObject, {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        })
          .then((res) => {
            setAuthors(res.data);
            console.log("Author Added!");
            setAddAuth(false);
          })
          .catch((error) => {
              if (error.response) {
                  alert(error.response.data);
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              }
              setAddAuth(false);
          });
  };


  const inviteReviewers = ({
    reviewerEmail,
  }) =>  {
    // console.log(country)
    setAddReview(true);

    const responseObject={
      email:reviewerEmail,
    };
    const path="/author/addreviewer"+window.location.pathname;
    axios
        .post(path, responseObject, {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        })
          .then((res) => {
            setReviewers(res.data);
            console.log("Reviewer Added!");
            setAddReview(false);
          })
          .catch((error) => {
              if (error.response) {
                  alert(error.response.data);
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);

              }
              setAddReview(false);
          });
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };
  const handleVenueChange = e => {
    setVenue(e.target.value);
  };
  const handleResearchAreaChange = e => {
    setResearchArea(e.target.value);
  };


    useEffect(() => {
      const path="/author"+window.location.pathname;
      console.log(path);
        axios
            .get(path, {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
              console.log(response.data);
                setTitle(response.data.title)
                setDescription(response.data.description)
                setVenue(response.data.venue)
                setResearchArea(response.data.researchArea)
                setAuthors(response.data.authors);
                setReviewers(response.data.reviewers);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="spinner-border text-info m-3" role="status">
                    <span className="sr-only p-2">Loading...</span>
                </div>
            </div>
        );
    }

    else{
      console.log(authors);
      console.log(reviewers);
  return (

    <div className="d-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Edit Conference details</h3>
        <hr></hr>

        <div className="form-group row d-margin">
          <label className="col-sm-2 col-form-label">Title/Name</label>
          <div className="">
            <input
              type="text"
              className="form-control"
              id="first-name"
              value={title}
              onChange={handleTitleChange}
              name="title"
              placeholder=""
            />
          </div>
        </div>

        <div className="form-group row d-margin">
          <label className="col-sm-2 col-form-label">Description</label>
          <div className="">
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={handleDescriptionChange}
              id="first-name"
              name="description"
              placeholder=""
            />
          </div>
        </div>

        <div className="form-group row d-margin">
          <label className="col-sm-2 col-form-label">Venue</label>
          <div className="">
            <input
              type="text"
              className="form-control"
              value={venue}
              onChange={handleVenueChange}
              id="first-name"
              name="venue"
              placeholder=""
            />
          </div>
        </div>

        <div className="form-group row d-margin">
          <label className="col-sm-2 col-form-label">Research Area</label>
          <div className="">
            <input
              type="text"
              value={researchArea}
              className="form-control"
              id="first-name"
              onChange={handleResearchAreaChange}
              name="researchArea"
              placeholder=""
            />
          </div>
        </div>

        <div className="form-group ">
          <button disabled={submit} type="submit" className="btn btn-outline-success btn-block">
            Save Changes
          </button>
        </div>
      </form>

              <hr></hr>


              <form onSubmit={handleSubmit(inviteAuthors)}>
              <div className="form-group row make-div-margin">
                <label for="email"className="col-md make-sep">Invite Authors</label>
                <input
                  type="text"
                  className="form-control col-md make-sep"
                  id="first-name"
                  name="authorEmail"
                  ref={register}
                  placeholder="Enter email of user"
                />
                {/* </div> */}
                <button disabled={addAuth} className="btn btn-primary col-md make-sep" tyoe="submit">Add Author</button>
              </div>

              </form>

              <form onSubmit={handleSubmit(inviteReviewers)}>
              <div className="form-group row make-div-margin">
                <label className="col-md make-sep">Invite Reviewers</label>
                <input
                  type="text"
                  className="form-control col-md make-sep"
                  id="first-name"
                  name="reviewerEmail"
                  ref={register}
                  placeholder="Enter email of user"
                />
                {/* </div> */}
                <button disabled={addReview} className="btn btn-primary col-md make-sep" tyoe="submit">Add Reviewer</button>
              </div>
              </form>

              <hr></hr>


      <div>
        <h2>List of Authors in this Conference :</h2>
        <div>
        {authors.map((user) => (
        <p className="iiname" ><a className="link-dark" href={"/profile/"+user._id}>{user.firstName+" "+user.lastName+" ("+user.email+")"}</a></p>
      ))}
        </div>
      </div>
      <br></br>
      <hr></hr>
      <div>
        <h2>List of Reviewers in this Conference :</h2>
        <div>
        {reviewers.map((user) => (
        <p className="iiname"><a className="link-dark" href={"/profile/"+user._id}>{user.firstName+" "+user.lastName+" ("+user.email+")"}</a></p>
      ))}
        </div>
      </div>
    </div>
  );
}
}

export default EditConf;
