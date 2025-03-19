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
    const user = new User({ username, email, hashed_password: password });
    await user.save();
    res.status(201).json({ id: user._id, username, email });
  } catch (error) {
    res.status(500).json({ detail: "Registration failed" });
  }
});

// Login
router.post("/token", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
      return res.status(401).json({ detail: "Invalid credentials" });
    }
    const token = jwt.sign({ sub: user.username }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    res.json({ access_token: token, token_type: "bearer" });
  } catch (error) {
    res.status(500).json({ detail: "Login failed" });
  }
});

module.exports = router;