import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/MyVehicles.css";

function MyVehicles() {
  const [vehicles, setVehicles] = useState([]);

  // Fetch vehicles from backend
  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/vehicles/");
      if (response.ok) {
        const data = await response.json();
        setVehicles(data);
      } else {
        console.error("Failed to fetch vehicles");
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/deletevehicle/${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Vehicle deleted successfully!");
        // Update state by filtering out deleted vehicle
        setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== id));
      } else {
        alert("Failed to delete vehicle.");
      }
    } catch (err) {
      console.log("Error deleting vehicle:", err);
    }
  };

  return (
    <div className="container">
      <h1>Vehicle Listings</h1>
      <div className="vehicle-list">
        {vehicles.length === 0 ? (
          <p>No vehicles available.</p>
        ) : (
          vehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-card">
              <Link to={`/vehicle/${vehicle.id}`} className="vehicle-details">
                {vehicle.image1 && (
                  <img
                    src={vehicle.image1}
                    alt={vehicle.vehicleName}
                    className="vehicle-image"
                  />
                )}
                <h3>{vehicle.vehicleName}</h3>
                <p><strong>Brand:</strong> {vehicle.brand}</p>
                <p><strong>Type:</strong> {vehicle.type}</p>
                <p><strong>Price:</strong> ${vehicle.price}</p>
              </Link>
              <button 
                className="update-button" 
                onClick={() => window.location.href = `/my-vehicle/${vehicle.id}`}
              >
                Update
              </button>
              <button className="delete-button" onClick={() => handleDelete(vehicle.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyVehicles;
