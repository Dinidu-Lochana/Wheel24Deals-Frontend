import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AddVehicle from "./pages/AddVehicle";
import VehicleDetails from "./pages/VehicleDetails";
import MyVehicles from "./pages/MyVehicles";
import UpdateVehicle from "./pages/UpdateVehicle";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Wheels24Deals</h2>
      <ul>
        <li>
          <Link to="/" onClick={() => window.location.reload()}>
            Home
          </Link>
        </li>
        <li><Link to="/add-vehicle">Add Vehicle</Link></li>
        <li><a href="/my-vehicle">My Vehicles</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </nav>
  );
}

function SearchBar({ setSearchQuery, setSearchType, handleSearch }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search by vehicle name..." 
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <input 
        type="text" 
        placeholder="Search by vehicle type..." 
        value={type}
        onChange={(e) => setType(e.target.value.toLowerCase())}
      />
      <button onClick={() => { 
        setSearchQuery(query); 
        setSearchType(type); 
        handleSearch(); 
      }}>
        Search
      </button>
    </div>
  );
}

function Home({ vehicles }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);

  const handleSearch = () => {
    setFilteredVehicles(
      vehicles.filter(vehicle =>
        vehicle.vehicleName.toLowerCase().includes(searchQuery) &&
        vehicle.type.toLowerCase().includes(searchType)
      )
    );
  };

  useEffect(() => {
    setFilteredVehicles(vehicles);
  }, [vehicles]);

  return (
    <div className="container">
      <SearchBar 
        setSearchQuery={setSearchQuery} 
        setSearchType={setSearchType} 
        handleSearch={handleSearch} 
      />
      <h1>Vehicle Listings</h1>
      <div className="vehicle-list">
        {filteredVehicles.length === 0 ? (
          <p>No vehicles found.</p>
        ) : (
          filteredVehicles.map((vehicle) => (
            <Link key={vehicle.id} to={`/vehicle/${vehicle.id}`} className="vehicle-card">
              {vehicle.image1 && (
                <img src={vehicle.image1} alt={vehicle.vehicleName} 
                  style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "10px" }} />
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

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home vehicles={vehicles} />} />
        <Route path="/add-vehicle" element={<AddVehicle fetchVehicles={fetchVehicles} />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        <Route path="/my-vehicle" element={<MyVehicles vehicles={vehicles} fetchVehicles={fetchVehicles} />} />
        <Route path="/my-vehicle/:id" element={<UpdateVehicle fetchVehicles={fetchVehicles} />} />
      </Routes>
    </Router>
  );
}

export default App;
