const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET user progress
router.get("/:userId/progress", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ progress: user.progress || {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST (update) user progress
router.post("/:userId/progress", async (req, res) => {
  try {
    const { progress } = req.body;
    if (typeof progress !== "object") {
      return res.status(400).json({ error: "Invalid progress data" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { progress },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;