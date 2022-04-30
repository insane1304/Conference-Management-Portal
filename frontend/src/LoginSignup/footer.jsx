import React from "react";
import "./footer.css";
const d = new Date();
let year = d.getFullYear();

function Footer() {
  return <div class="footer">Copyright © {year}</div>;
}

export default Footer;
