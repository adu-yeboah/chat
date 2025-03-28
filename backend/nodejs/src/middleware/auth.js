const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ detail: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); 
    
    if (!user) return res.status(401).json({ detail: "Invalid token" });
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ detail: "Token has expired" });
    }
    res.status(401).json({ detail: "Invalid token" });
  }
};

module.exports = authMiddleware;