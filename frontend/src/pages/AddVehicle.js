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
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });

  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e, imageField) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [imageField]: reader.result, // Convert to Base64
        }));
        setImagePreviews((prev) => ({
          ...prev,
          [imageField]: reader.result, // Update preview
        }));
      };
      reader.readAsDataURL(file);
    }
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
          image1: "",
          image2: "",
          image3: "",
          image4: "",
          image5: "",
        });
        setImagePreviews({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
          image5: null,
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
        <input type="text" name="vehicleName" placeholder="Vehicle Name" value={formData.vehicleName} onChange={handleChange} maxLength="50" required />
        <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} maxLength="50" required />
        <input type="text" name="type" placeholder="Type (SUV, Sedan, etc.)" value={formData.type} onChange={handleChange} maxLength="30" required />
        <input type="text" name="noPlate" placeholder="License Plate Number" value={formData.noPlate} onChange={handleChange} maxLength="10" required />
        <input type="number" name="manufactureYear" placeholder="Manufacture Year" value={formData.manufactureYear} onChange={handleChange} min="1900" max={new Date().getFullYear()} required />
        <input type="number" name="registeredYear" placeholder="Registered Year" value={formData.registeredYear} onChange={handleChange} min="1900" max={new Date().getFullYear()} required />
        <input type="number" name="mileage" placeholder="Mileage (km)" value={formData.mileage} onChange={handleChange} min="0" required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} min="0" required />
        <textarea name="description" placeholder="Vehicle Description" value={formData.description} onChange={handleChange} maxLength="200" />

        {/* Image Upload Inputs */}
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num}>
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, `image${num}`)} />
            {imagePreviews[`image${num}`] && <img src={imagePreviews[`image${num}`]} alt={`Preview ${num}`} style={{ width: "100px", height: "100px", marginTop: "10px" }} />}
          </div>
        ))}

        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
}

export default AddVehicle;
