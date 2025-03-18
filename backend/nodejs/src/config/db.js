const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/chat-app";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;