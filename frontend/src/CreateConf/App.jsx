import "./compStyles.css";
import Navbar from "../Navbar.jsx";
import Createbody from "./Createbody.jsx";
import Sidebar from "../Sidebar"

export default function App() {
  return (
    <div className="APP">
      <Sidebar />
      <div className ="card">
      <Navbar />
      <Createbody />
      </div>
    </div>
  );
}
