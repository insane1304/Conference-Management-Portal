import React, { useState } from "react";
import Scroll from "./Scroll";
import SearchList from "./SearchList";
import "./compStyles.css";
import Navbar from "../Navbar.jsx";
import Allconf from "./Allconf.jsx";
import {  useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar"


function Search() {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
      axios
          .get("/conference/allconferences", {
              headers: {
                  // "auth-token": localStorage.token,
                  // "Content-Type": "application/json",
              },
          })
          .then((response) => {
            // console.log(response.data);
              setData(response.data);
              setLoading(false);
          })
          .catch((error) => console.log(error));
  }, [isLoading]);

  const filteredResult = data.filter((conference) => {
    return (
      conference.title.toLowerCase().includes(searchField.toLowerCase())
      // ||
      // person.email.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
    console.log(data);
    if (e.target.value === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  function searchList() {
    if (searchShow) {
      return (
        <Scroll>
          <SearchList filteredResult={filteredResult} />
        </Scroll>
      );
    }
  }
  if (isLoading) {
      return (
          <div className="text-center">
              <div className="spinner-border text-info m-3" role="status">
                  <span className="sr-only p-2">Loading...</span>
              </div>
          </div>
      );
  }
  else
  return (
    <div className="APP">
    <Sidebar/>
    <div style={{width:"100%"}}>
      <Navbar />
      <section>
        <div className="App ">
          <h2>Search any available paper or conference</h2>
          <input
            className="input-box"
            type="search"
            placeholder="Search"
            onChange={handleChange}
          />
        </div>
      {(() => {
          if (searchField === "") {
            return <Allconf data={data}/>;
          }
        })()}
        {/* {searchField === "" && !searchShow ? <Allconf /> : " "} */}
        {searchList()}
      </section>
    </div>
    </div>
  );
}

export default Search;
