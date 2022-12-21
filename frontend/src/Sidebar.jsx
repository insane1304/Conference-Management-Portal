import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./compStyles.css";
import "react-pro-sidebar/dist/css/styles.css";
// import "./styles.scss";
import {IsAuth} from "./auth/isAuth"
import { useEffect } from "react";
import axios from "axios";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarFooter,
  SidebarContent,
  SidebarHeader
} from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
// import "./customStyles.scss";
import { MdPendingActions } from "react-icons/md";
import IMG from "./5015890.jpg";
import {
  FaHome,
  FaInfoCircle,
  FaHouseUser,
  FaGithub,
  FaRegPlusSquare,
  FaUserEdit,
  FaExternalLinkAlt,
  FaExpeditedssl,
  FaUsers,
  FaClipboardList
} from "react-icons/fa";

function Navbar() {
  const [collapsed, setCollapsed] = useState(true);

  const headerStyle = {
    padding: "24px",
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign:"center",
    letterSpacing: "1px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "noWrap"
  };
  const handleMouseEnter = () => {
    // console.log("HI");
    setCollapsed(false);
  };
  const handleMouseExit = () => {
    setCollapsed(true);
  };


  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(IsAuth()){
      axios
          .get("/author/profile", {
              headers: {
                  "auth-token": localStorage.token,
                  "Content-Type": "application/json",
              },
          })
          .then((response) => {
              setData(response.data);
              setLoading(false);
          })
          .catch((error) => console.log(error));
        }
        else setLoading(false);
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
  else
  return (

    <div className="custom-sidebar sticky-top">

      <ProSidebar
        image={IMG}
        collapsed={collapsed}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseExit}
      >
        <SidebarHeader style={headerStyle}>CMP</SidebarHeader>

        <SidebarContent>
        {(() => {
          if (IsAuth()) {
            return (
              <Menu iconShape="circle">
                <MenuItem icon={<FaHome />} ><a href="/">Home</a></MenuItem>
                <MenuItem icon={<FaExternalLinkAlt />}><a href="/allconferences">All conf</a></MenuItem>
                <MenuItem icon={<FaUsers />}><a href="/user">Dashboard</a></MenuItem>

                <MenuItem icon={<FaHouseUser />}><a  href={"/profile/"+data._id}>My Profile</a></MenuItem>
                <MenuItem icon={<FaClipboardList />}><a href="/myconferences">My Conf</a></MenuItem>
                <MenuItem icon={<MdPendingActions />}><a href="/pendingrequests">Pending Requests</a></MenuItem>
                <MenuItem icon={<FaRegPlusSquare />}><a href="/create-conf">Create Conf</a></MenuItem>

                <MenuItem icon={<FaUserEdit />}><a href="/editprofile">Edit Profile</a></MenuItem>
                <MenuItem icon={<FaExpeditedssl />}><a href="/updatepassword">Update Password</a></MenuItem>
              </Menu>

            );
          } else {
            return (
              <Menu iconShape="circle">
                <MenuItem icon={<FaHome />} ><a href="/">Home</a></MenuItem>
                <MenuItem icon={<FaExternalLinkAlt />} ><a href="/allconferences">All conf</a></MenuItem>
              </Menu>
            );
          }
        })()}
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper">
            <a
              href="/"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaInfoCircle />
             <span>About Us</span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
      ;
    </div>
  );
}

export default Navbar;
