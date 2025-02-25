import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Wheels24Deals</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-vehicle">Add Vehicle</Link></li>
        <li><Link to="#">My Vehicles</Link></li>
        <li><Link to="#">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
