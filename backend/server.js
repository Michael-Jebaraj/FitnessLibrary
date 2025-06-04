const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Register Step 1: Basic info
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered. Now provide your profile details.", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Register Step 2: Add age, weight, height, goal, trainingDays
app.post('/register/details', async (req, res) => {
  const { userId, age, weight, height, goal, trainingDays } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.age = age;
    user.weight = weight;
    user.height = height;
    user.goal = goal;
    user.trainingDays = trainingDays;

    await user.save();
    res.status(200).json({ message: "Details saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving details", error });
  }
});

// Login: check email and password
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
    const { password: pwd, ...userData } = user.toObject();
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
});

// --- Progress Endpoints ---
// Save or update user's workout progress
app.post('/user/:userId/progress', async (req, res) => {
  try {
    const { progress } = req.body;
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(
      userId,
      { progress: progress },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Progress saved!", progress: user.progress });
  } catch (error) {
    res.status(500).json({ message: "Failed to save progress", error });
  }
});

// Get user's workout progress
app.get('/user/:userId/progress', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const now = new Date();
    const monday = new Date(now);
    monday.setHours(0,0,0,0);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));

    const lastReset = user.lastProgressReset;
    if (!lastReset || new Date(lastReset).getTime() < monday.getTime()) {
      user.progress = {};
      user.lastProgressReset = now;
      await user.save();
    }
    res.json({ progress: user.progress || {} });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch progress", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
