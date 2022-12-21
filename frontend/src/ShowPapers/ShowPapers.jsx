import "./compStyles.css";
import Bodypart2 from "./Bodypart2.jsx";
import Navbar from "../Navbar.jsx";
import Table2 from "./Table2.jsx";
import Sidebar from "../Sidebar"

export default function App2() {
  return (
    <div className="APP">
    <Sidebar/>
    <div className="card">
      <Navbar />
      <Table2 />
    </div>
    </div>
  );
}
