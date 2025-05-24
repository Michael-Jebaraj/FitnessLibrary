import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://fitnesslibrary.onrender.com/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      const userId = response.data.userId;

      setLoading(false);

      // Redirect with userId in state
      navigate("/profile-setup", { state: { userId } });
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Registration failed");
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  return (
    <div className="register-bg">
      <div className="register-container">
        <div className="register-header">
          <span className="register-logo">🏋️‍♂️</span>
          <h1>FitnessLibrary</h1>
          <div className="register-subtitle">
            Create your account and start your fitness journey!
          </div>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
              autoFocus
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              name="confirm"
              placeholder="Confirm your password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </label>
          {error && <div className="register-error">{error}</div>}
          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>
        <div className="register-links">
          <span>
            Already have an account? <Link to="/login">Log in</Link>
          </span>
        </div>
      </div>
      <footer className="register-footer">
        &copy; {new Date().getFullYear()} FitnessLibrary. All rights reserved.
      </footer>
    </div>
  );
};

export default Register;
