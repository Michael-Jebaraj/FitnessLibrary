import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { clearUserProfile } from "../utils/userProfile";
import "./ProfileSetup.css";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId; // get userId from navigation state

  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    goal: "",
    trainingDays: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.age || isNaN(form.age) || form.age < 10 || form.age > 100) {
      setError("Please enter a valid age (10-100).");
      return;
    }
    if (!form.height || isNaN(form.height) || form.height < 80 || form.height > 250) {
      setError("Please enter a valid height in cm (80-250).");
      return;
    }
    if (!form.weight || isNaN(form.weight) || form.weight < 20 || form.weight > 300) {
      setError("Please enter a valid weight in kg (20-300).");
      return;
    }
    if (!form.goal) {
      setError("Please select your fitness goal.");
      return;
    }
    if (!form.trainingDays || isNaN(form.trainingDays) || form.trainingDays < 2 || form.trainingDays > 7) {
      setError("Please select how many days per week you can train (2-7).");
      return;
    }
    if (!userId) {
      setError("User ID missing. Please register again.");
      return;
    }

    setLoading(true);

    try {
      // Send to backend API
      await axios.post("https://fitnesslibrary.onrender.com/register/details", {
        userId,
        age: Number(form.age),
        height: Number(form.height),
        weight: Number(form.weight),
        goal: form.goal,
        trainingDays: Number(form.trainingDays),
      });

      clearUserProfile();
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.error || err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup-bg">
      <div className="profile-setup-container">
        <div className="profile-setup-header">
          <h1>Welcome!</h1>
          <div className="profile-setup-subtitle">
            We want to know more about you and your plan!
          </div>
        </div>
        <form className="profile-setup-form" onSubmit={handleSubmit}>
          <label>
            Age
            <input
              type="number"
              name="age"
              placeholder="Age (years)"
              value={form.age}
              min={10}
              max={100}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Height
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={form.height}
              min={80}
              max={250}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Weight
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={form.weight}
              min={20}
              max={300}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Fitness Goal
            <select
              name="goal"
              value={form.goal}
              onChange={handleChange}
              required
            >
              <option value="">Select goal</option>
              <option value="fat_loss">Fat Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintain">Maintain</option>
            </select>
          </label>
          <label>
            How many days per week can you train?
            <select
              name="trainingDays"
              value={form.trainingDays}
              onChange={handleChange}
              required
            >
              <option value="">Select days</option>
              <option value="2">2 Days</option>
              <option value="3">3 Days</option>
              <option value="4">4 Days</option>
              <option value="5">5 Days</option>
              <option value="6">6 Days</option>
            </select>
          </label>
          {error && <div className="profile-setup-error">{error}</div>}
          <button className="profile-setup-btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
