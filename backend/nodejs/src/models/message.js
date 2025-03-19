const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: String,
  file_url: String,
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: "Group", default: null },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;