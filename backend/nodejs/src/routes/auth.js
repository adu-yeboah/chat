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
  try {
    const user = await User.findByUsername(username);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ detail: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ access_token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ detail: "Server error: " + error.message });
  }
});

module.exports = router;