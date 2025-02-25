import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/AddVehicle.css";

function AddVehicle() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleName: "",
    brand: "",
    type: "",
    noPlate: "",
    manufactureYear: "",
    registeredYear: "",
    mileage: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation based on Django
    if (
      (name === "manufactureYear" || name === "registeredYear") &&
      (value < 1900 || value > new Date().getFullYear())
    ) {
      alert("Year must be between 1900 and the current year.");
      return;
    }

    if ((name === "mileage" || name === "price") && value < 0) {
      alert(`${name} cannot be negative.`);
      return;
    }

    if (name === "vehicleName" && value.length > 50) {
      alert("Vehicle name must be 50 characters or less.");
      return;
    }

    if (name === "brand" && value.length > 50) {
      alert("Brand name must be 50 characters or less.");
      return;
    }

    if (name === "type" && value.length > 30) {
      alert("Vehicle type must be 30 characters or less.");
      return;
    }

    if (name === "noPlate" && value.length > 10) {
      alert("License Plate Number must be 10 characters or less.");
      return;
    }

    if (name === "description" && value.length > 200) {
      alert("Description must be 200 characters or less.");
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addVehicle = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/vehicles/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Vehicle added successfully!");
        setFormData({
          vehicleName: "",
          brand: "",
          type: "",
          noPlate: "",
          manufactureYear: "",
          registeredYear: "",
          mileage: "",
          price: "",
          description: "",
        });
        navigate("/");
      } else {
        alert("Failed to add vehicle.");
      }
    } catch (err) {
      console.log("Error:", err);
      alert("An error occurred while adding the vehicle.");
    }
  };

  return (
    <div className="add-vehicle-container">
      <h2>Add Vehicle</h2>
      <form onSubmit={addVehicle} className="add-vehicle-form">
        <input
          type="text"
          name="vehicleName"
          placeholder="Vehicle Name"
          value={formData.vehicleName}
          onChange={handleChange}
          maxLength="50"
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          maxLength="50"
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Type (SUV, Sedan, etc.)"
          value={formData.type}
          onChange={handleChange}
          maxLength="30"
          required
        />
        <input
          type="text"
          name="noPlate"
          placeholder="License Plate Number"
          value={formData.noPlate}
          onChange={handleChange}
          maxLength="10"
          required
        />
        <input
          type="number"
          name="manufactureYear"
          placeholder="Manufacture Year"
          value={formData.manufactureYear}
          onChange={handleChange}
          min="1900"
          max={new Date().getFullYear()}
          required
        />
        <input
          type="number"
          name="registeredYear"
          placeholder="Registered Year"
          value={formData.registeredYear}
          onChange={handleChange}
          min="1900"
          max={new Date().getFullYear()}
          required
        />
        <input
          type="number"
          name="mileage"
          placeholder="Mileage (km)"
          value={formData.mileage}
          onChange={handleChange}
          min="0"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          required
        />
        <textarea
          name="description"
          placeholder="Vehicle Description"
          value={formData.description}
          onChange={handleChange}
          maxLength="200"
        />
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
}

export default AddVehicle;
