import Bodypart from "./Bodypart.jsx";
import Navbar from "../Navbar.jsx";
import Table from "./Table.jsx";
import Sidebar from "../Sidebar.jsx";

export default function App() {
  return (
    <div className="APP">
      <Sidebar />
      <div style={{ width: "100%" }} className="card">
        <Navbar />
        <Bodypart />
        <Table />
      </div>
    </div>
  );
}
