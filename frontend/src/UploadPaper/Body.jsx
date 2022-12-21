import React from "react";
import "./compStyles.css";
import { Component } from "react";
import axios from "axios";

export default class Body extends Component {

  constructor(props) {
      super(props);
      this.onTitleChange = this.onTitleChange.bind(this);
      this.onAbstractChange = this.onAbstractChange.bind(this);
      this.onKeywordsChange = this.onKeywordsChange.bind(this);
      this.onFileChange = this.onFileChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          certpdf: "",
          title: "",
          abstract:"",
          keywords:"",
          submit:false
      };
  }
  onTitleChange(e) {
      this.setState({ ...this.state, title: e.target.value });
  }

  onAbstractChange(e) {
      this.setState({ ...this.state, abstract: e.target.value });
  }

  onKeywordsChange(e) {
      this.setState({ ...this.state, keywords: e.target.value });
  }

  onFileChange(e) {
      this.setState({ ...this.state, certpdf: e.target.files[0] });
      // console.log(this.state.certpdf);
      // console.log(e.target.files[0]);
  }

  onSubmit(e) {
      e.preventDefault();
  //  onSubmit(e) = ({}) => {
  this.setState({ ...this.state, submit: true });
    console.log(this.state.certpdf)
    const formData =new FormData()
    formData.append("file", this.state.certpdf);
    formData.append("title", this.state.title);
    formData.append("abstract", this.state.abstract);
    formData.append("keywords", this.state.keywords);
    formData.append("url", window.location.pathname);

    axios
        .post("/cert/upload", formData, {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
          console.log(res)
            if (res.status === 201) {
                alert("File successfully uploaded!");
            }
            else if (res.status === 200) {
                alert("File successfully uploaded!");
            }
            else if(res.status===400){
              alert(res.error);
            }
            this.setState({ ...this.state, submit: false });
        })
        // .catch((err) => console.log(err));
        .catch((error) => {
            if (error.response) {
                alert(error.response.data);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            this.setState({ ...this.state, submit: false });
        });

  };
  render() {
  return (
    <form onSubmit={this.onSubmit}>
      <div className="bodypart-margin">
        <h1> Details for submission </h1>

        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            Title
          </span>
          <input
            type="text"
            name="title"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            // ref={register}
            onChange={this.onTitleChange}
          ></input>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            Abstract
          </span>
          <input
            type="text"
            name="abstract"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            // ref={register}
            onChange={this.onAbstractChange}
          ></input>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text sspan" id="inputGroup-sizing-default">
            Keywords
          </span>
          <input
            type="text"
            name="keywords"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            // ref={register}
            onChange={this.onKeywordsChange}
          ></input>
        </div>

        <div class="col-12">
          <input type="file"  name="file" onChange={this.onFileChange}  class="form-control" placeholder="Title" ></input>
        </div>

        <div class="col-12">

              <button disabled={this.state.submit}  type="submit" class="btn btn-outline-primary btn-lg bbtncss ">
                Submit
              </button>
              {(() => {
                if (this.state.submit) {
                  return (
                      <div className="text-center">
                          <div className="spinner-border text-info m-3" role="status">

                          </div>
                          <p className="">Submission in progress.. Please wait..</p>
                      </div>
                  );
                }
              })()}
        </div>
      </div>
    </form>
  );
}
}
