import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Signup.css";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Backend URL

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
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
            const response = await axios.post(`${API_BASE_URL}/signup/`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            alert("Signup successful! Please log in.");
            navigate("/login");
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
