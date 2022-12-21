import Card from "./Card.jsx";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar"

export default function ShowProfile() {
  return (
    <div className="APP">
    <Sidebar/>
    <div className="card">
      <Navbar />
      <Card usertype="author" />
      </div>
    </div>
  );
}
