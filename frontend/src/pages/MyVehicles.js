import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../CSS/MyVehicles.css";

function MyVehicles({ vehicles, fetchVehicles }) {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/deletevehicle/${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Vehicle deleted successfully!");
        fetchVehicles(); // Refresh vehicle list
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
                    style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "10px" }}
                  />
                )}
                <h3>{vehicle.vehicleName}</h3>
                <p><strong>Brand:</strong> {vehicle.brand}</p>
                <p><strong>Type:</strong> {vehicle.type}</p>
                <p><strong>Price:</strong> ${vehicle.price}</p>
              </Link>
              <button className="delete-button" onClick={() => handleDelete(vehicle.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyVehicles;
