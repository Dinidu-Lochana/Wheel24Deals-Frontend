import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css"

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Backend URL

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/login/`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
};

export default Login;
