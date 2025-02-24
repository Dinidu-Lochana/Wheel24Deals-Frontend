import { useEffect, useState } from "react";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Wheels24Deals</h2>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Add Vehicle</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </nav>
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
    <div className="container">
      <Navbar />

      <h1>Vehicle Listings</h1>

      {/* Vehicle Form */}
      <form onSubmit={handleSubmit} className="vehicle-form">
        <input
          type="text"
          name="vehicleName"
          placeholder="Vehicle name"
          value={formData.vehicleName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mileage"
          placeholder="Mileage"
          value={formData.mileage}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Vehicle</button>
      </form>

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

export default App;
