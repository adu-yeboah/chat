const mongoose = require("mongoose");

const groupMemberSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
});

groupMemberSchema.statics.getMembers = function (group_id) {
  return this.find({ group_id }).select("user_id").then((members) =>
    members.map((m) => m.user_id)
  );
};

const GroupMember = mongoose.model("GroupMember", groupMemberSchema);
module.exports = GroupMember;