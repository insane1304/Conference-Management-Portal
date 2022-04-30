import Card from "./Card.jsx";
import Navbar from "./Nav.jsx";

export default function ShowProfile() {
  return (
    <div>
      <Navbar />
      <Card usertype="author" />
    </div>
  );
}
