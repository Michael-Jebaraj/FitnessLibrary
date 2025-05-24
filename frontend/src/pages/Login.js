import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveUserProfile } from "../utils/userProfile";
import "./Home.css";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://fitnesslibrary.onrender.com/login", form);
      saveUserProfile(response.data.user); // Save user data in localStorage for dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (error) setError("");
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-header">
          <span className="login-logo">🏋️‍♂️</span>
          <h1>FitnessLibrary</h1>
          <div className="login-subtitle">
            Welcome back! Log in to continue your fitness journey.
          </div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={e => handleChange("email", e.target.value)}
              required
              autoFocus
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => handleChange("password", e.target.value)}
              required
            />
          </label>
          {error && <div className="login-error">{error}</div>}
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="login-links">
          <span>
            New to FitnessLibrary? <Link to="/register">Create account</Link>
          </span>
        </div>
      </div>
      <footer className="login-footer">
        &copy; {new Date().getFullYear()} FitnessLibrary. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
