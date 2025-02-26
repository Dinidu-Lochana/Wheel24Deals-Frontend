import { useNavigate } from "react-router-dom";
import "../CSS/Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome to Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
