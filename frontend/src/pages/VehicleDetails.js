import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VehicleDetails = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/vehicles/${id}/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch vehicle");
                }
                const data = await response.json();
                setVehicle(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [id]);

    if (loading) return <p>Loading vehicle details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!vehicle) return <p>No vehicle found</p>;

    // Extract images dynamically
    const images = [];
    for (let i = 1; i <= 5; i++) {
        if (vehicle[`image${i}`]) {
            images.push(vehicle[`image${i}`]);
        }
    }

    return (
        <div className="vehicle-details">
            <h2>{vehicle.vehicleName}</h2>

            {/* Display all images */}
            <div className="vehicle-images">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Vehicle Image ${index + 1}`}
                        style={{ width: "300px", height: "200px", borderRadius: "10px", margin: "10px" }}
                    />
                ))}
            </div>

            <p><strong>Brand:</strong> {vehicle.brand}</p>
            <p><strong>Type:</strong> {vehicle.type}</p>
            <p><strong>Plate Number:</strong> {vehicle.noPlate}</p>
            <p><strong>Manufacture Year:</strong> {vehicle.manufactureYear}</p>
            <p><strong>Registered Year:</strong> {vehicle.registeredYear}</p>
            <p><strong>Mileage:</strong> {vehicle.mileage} km</p>
            <p><strong>Price:</strong> ${vehicle.price}</p>
            <p><strong>Description:</strong> {vehicle.description}</p>
        </div>
    );
};

export default VehicleDetails;
