const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
require("dotenv").config();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) return res.status(400).json({ detail: "Username already taken" });
    const user = new User({ username, email, password: password });
    await user.save();
    res.status(201).json({ id: user._id, username, email });
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});


// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  
  try {
    const user = await User.findByUsername(username);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ detail: "Invalid username or password" });
    }
    const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: user._id },process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d", 
    });
    res.status(200).json({ access_token: accessToken, refresh_token: refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ detail: "Server error: " + error.message });
  }
});


// Refresh Token
router.post("/refresh", async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return res.status(401).json({ detail: "No refresh token provided" });
  try {
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ detail: "Invalid refresh token" });
    const newAccessToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ access_token: newAccessToken });
  } catch (error) {
    res.status(401).json({ detail: "Invalid or expired refresh token" });
  }
});

module.exports = router;