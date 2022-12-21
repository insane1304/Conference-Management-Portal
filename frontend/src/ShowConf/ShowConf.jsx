import "./compStyles.css";
import Bodypart1 from "./Bodypart1.jsx";
import Navbar from "../Navbar.jsx";
import Table1 from "./Table1.jsx";

import Sidebar from "../Sidebar"

export default function App() {
  return (
    <div className="APP">
    <Sidebar/>
    <div className="card">
      <Navbar />
      <Table1 />
    </div>
    </div>
  );
}
