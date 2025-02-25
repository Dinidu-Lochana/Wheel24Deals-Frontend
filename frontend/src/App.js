import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AddVehicle from "./pages/AddVehicle";
import VehicleDetails from "./pages/VehicleDetails";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Wheels24Deals</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-vehicle">Add Vehicle</Link></li>
        <li><a href="#">My Vehicles</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </nav>
  );
}

function Home({ vehicles }) {
  return (
    <div className="container">
      <h1>Vehicle Listings</h1>
      <div className="vehicle-list">
        {vehicles.length === 0 ? (
          <p>No vehicles available.</p>
        ) : (
          vehicles.map((vehicle) => (
            <Link key={vehicle.id} to={`/vehicle/${vehicle.id}`} className="vehicle-card">
              {vehicle.image1 && (
                <img src={vehicle.image1} alt={vehicle.vehicleName} style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "10px" }} />
              )}
              <h3>{vehicle.vehicleName}</h3>
              <p><strong>Brand:</strong> {vehicle.brand}</p>
              <p><strong>Type:</strong> {vehicle.type}</p>
              <p><strong>Price:</strong> ${vehicle.price}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

function App() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/vehicles/");
      const data = await response.json();
      setVehicles(data);
    } catch (err) {
      console.log("Error fetching vehicles:", err);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home vehicles={vehicles} />} />
        <Route path="/add-vehicle" element={<AddVehicle fetchVehicles={fetchVehicles} />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
