const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  status: { type: String, default: "offline" },
  last_seen: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("hashed_password")) {
    this.hashed_password = await bcrypt.hash(this.hashed_password, 10);
  }
  next();
});

userSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

userSchema.statics.updateStatus = function (id, status) {
  return this.findByIdAndUpdate(id, { status, last_seen: new Date() }, { new: true });
};

const User = mongoose.model("User", userSchema);
module.exports = User;