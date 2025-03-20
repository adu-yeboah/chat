const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: { type: String, required: true }, 
  is_active: { type: Boolean, default: true },
  status: { type: String, default: "offline" },
  last_seen: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.findByUsername = function (username) {
  return this.findOne({ username }).exec();
};

userSchema.statics.updateStatus = function (id, status) {
  return this.findByIdAndUpdate(id, { status, last_seen: new Date() }, { new: true }).exec();
};

const User = mongoose.model("User", userSchema);
module.exports = User;