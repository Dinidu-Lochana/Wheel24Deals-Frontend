import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AddVehicle from "./pages/AddVehicle";

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

function Home({ vehicles, formData, handleChange, handleSubmit }) {
  return (
    <div className="container">
      <h1>Vehicle Listings</h1>

      

      {/* Vehicle List */}
      <div className="vehicle-list">
        {vehicles.length === 0 ? (
          <p>No vehicles available.</p>
        ) : (
          vehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-card">
              <h3>{vehicle.vehicleName}</h3>
              <p><strong>Brand:</strong> {vehicle.brand}</p>
              <p><strong>Type:</strong> {vehicle.type}</p>
              <p><strong>No Plate:</strong> {vehicle.noPlate}</p>
              <p><strong>Year:</strong> {vehicle.manufactureYear} / {vehicle.registeredYear}</p>
              <p><strong>Mileage:</strong> {vehicle.mileage} km</p>
              <p><strong>Price:</strong> ${vehicle.price}</p>
              <p><strong>Description:</strong> {vehicle.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    vehicleName: "",
    price: "",
    mileage: "",
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/vehicles/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ vehicleName: "", price: "", mileage: "" }); // Reset form
        fetchVehicles(); // Refresh list
      } else {
        console.log("Error adding vehicle");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              vehicles={vehicles}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route path="/add-vehicle" element={<AddVehicle />} />
      </Routes>
    </Router>
  );
}

export default App;