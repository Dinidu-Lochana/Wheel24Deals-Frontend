import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/UpdateVehicle.css";

function UpdateVehicle() {
  const { id } = useParams(); // Get vehicle ID from URL
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

  // Fetch existing vehicle details
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${id}/`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data); // Pre-fill form fields with existing data
        } else {
          alert("Failed to load vehicle data.");
        }
      } catch (err) {
        console.error("Error fetching vehicle:", err);
      }
    };

    fetchVehicle();
  }, [id]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image uploads
  const handleImageChange = (e, imageField) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [imageField]: reader.result, // Convert image to Base64
        }));
        setImagePreviews((prev) => ({
          ...prev,
          [imageField]: reader.result, // Update preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Update vehicle details
  const updateVehicle = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updatevehicle/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Vehicle updated successfully!");
        navigate("/my-vehicle");
      } else {
        alert("Failed to update vehicle.");
      }
    } catch (err) {
      console.error("Error updating vehicle:", err);
      alert("An error occurred while updating the vehicle.");
    }
  };

  return (
    <div className="update-vehicle-container">
      <h2>Update Vehicle</h2>
      <form onSubmit={updateVehicle} className="update-vehicle-form">
        <input type="text" name="vehicleName" placeholder="Vehicle Name" value={formData.vehicleName} onChange={handleChange} required />
        <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required />
        <input type="text" name="type" placeholder="Type (SUV, Sedan, etc.)" value={formData.type} onChange={handleChange} required />
        <input type="text" name="noPlate" placeholder="License Plate Number" value={formData.noPlate} onChange={handleChange} required />
        <input type="number" name="manufactureYear" placeholder="Manufacture Year" value={formData.manufactureYear} onChange={handleChange} min="1900" max={new Date().getFullYear()} required />
        <input type="number" name="registeredYear" placeholder="Registered Year" value={formData.registeredYear} onChange={handleChange} min="1900" max={new Date().getFullYear()} required />
        <input type="number" name="mileage" placeholder="Mileage (km)" value={formData.mileage} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Vehicle Description" value={formData.description} onChange={handleChange} />

        {/* Image Upload Inputs */}
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num}>
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, `image${num}`)} />
            {imagePreviews[`image${num}`] || formData[`image${num}`] ? (
              <img src={imagePreviews[`image${num}`] || formData[`image${num}`]} alt={`Preview ${num}`} style={{ width: "100px", height: "100px", marginTop: "10px" }} />
            ) : null}
          </div>
        ))}

        <button type="submit">Update Vehicle</button>
      </form>
    </div>
  );
}

export default UpdateVehicle;
