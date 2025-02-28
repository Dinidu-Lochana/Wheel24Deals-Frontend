import { useState } from "react";

function SearchByType() {
  const [searchType, setSearchType] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchType.trim()) {
      setError("Please enter a vehicle type.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/searchvehicle/${searchType}/`);
      if (!response.ok) {
        throw new Error("No vehicles found for this type.");
      }
      const data = await response.json();
      setVehicles(data);
    } catch (err) {
      setError(err.message);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Vehicles by Type</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter vehicle type..."
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="vehicle-list">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-card">
              {vehicle.image1 && <img src={vehicle.image1} alt={vehicle.vehicleName} />}
              <h3>{vehicle.vehicleName}</h3>
              <p><strong>Brand:</strong> {vehicle.brand}</p>
              <p><strong>Type:</strong> {vehicle.type}</p>
              <p><strong>Price:</strong> ${vehicle.price}</p>
            </div>
          ))
        ) : (
          !loading && !error && <p>No vehicles found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchByType;
