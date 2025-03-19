const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const Group = require("./models/group");
const GroupMember = require("./models/groupMember");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload setup
const upload = multer({ dest: "uploads/" });
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use(authRoutes);

// Protected Routes
app.get("/users/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

app.post("/upload-file", authMiddleware, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ detail: "No file uploaded" });
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ file_url: fileUrl });
});

app.post("/groups", authMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const group = await Group.create({ name, creator_id: req.user._id });
    await GroupMember.create({ user_id: req.user._id, group_id: group._id });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ detail: "Group creation failed" });
  }
});

module.exports = app