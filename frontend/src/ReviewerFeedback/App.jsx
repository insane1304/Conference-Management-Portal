import "./compStyles.css";
import Navbar from "../Navbar.jsx";
import Body from "./Body.jsx";
import Sidebar from "../Sidebar"

export default function App() {
  return (
    <div className="APP">
      <Sidebar />
      <div className="card">
      <Navbar />
      <Body />
      </div>
    </div>
  );
}
