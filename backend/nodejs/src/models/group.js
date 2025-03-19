const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;