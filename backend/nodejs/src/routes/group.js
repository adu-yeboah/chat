const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Group = require("../models/group");
const GroupMember = require("../models/groupMember"); // Assuming this model exists
const mongoose = require("mongoose");

// Create a new group
router.post("/group", authMiddleware, async (req, res) => {
  const { name } = req.body;

  try {
    const group = new Group({
      name: name.trim(),
      creator_id: req.user._id,
    });

    await group.save();

    res.status(200).json({
      detail: "Group created successfully",
      group: {
        id: group._id,
        name: group.name,
        creator_id: group.creator_id,
      },
    });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ detail: "Internal server error" });
  }
});

// Add Members
router.post("/:groupId/members", authMiddleware, async (req, res) => {
  const { groupId } = req.params;
  const { userIds } = req.body;

  // Validate input
  if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(400).json({ detail: "Invalid group ID" });
  }
  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ detail: "userIds must be a non-empty array" });
  }
  if (!userIds.every((id) => mongoose.Types.ObjectId.isValid(id))) {
    return res.status(400).json({ detail: "All userIds must be valid ObjectIds" });
  }

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ detail: "Group not found" });
    }

    // Restrict to creator only
    if (group.creator_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ detail: "Only the creator can add members" });
    }

    // Check if all users exist
    const User = require("../models/user"); // Assuming User model exists
    const users = await User.find({ _id: { $in: userIds } });
    if (users.length !== userIds.length) {
      return res.status(400).json({ detail: "One or more users not found" });
    }

    // Create GroupMember entries
    const newMembers = userIds.map((user_id) => ({
      user_id,
      group_id: groupId,
    }));

    // Insert members, ignoring duplicates
    await GroupMember.insertMany(newMembers, { ordered: false, ignoreErrors: true });

    // Get updated member list (assuming getMembers is a static method)
    const memberIds = await GroupMember.getMembers(groupId);

    res.status(200).json({
      detail: "Members added successfully",
      groupId: group._id,
      members: memberIds,
    });
  } catch (error) {
    console.error("Error adding members:", error);
    res.status(500).json({ detail: "Internal server error" });
  }
});

// Get all groups 
router.get("/groups", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    //  Find groups created by the user
    const createdGroups = await Group.find({ creator_id: userId }).select("name _id creator_id");

    //  Find groups the user has joined 
    const joinedGroups = await GroupMember.find({ user_id: userId })
      .populate({
        path: "group_id",
        select: "name _id creator_id",
      })
      .lean(); 

    // Extract group details from joined groups
    const joinedGroupDetails = joinedGroups.map((member) => ({
      id: member.group_id._id,
      name: member.group_id.name,
      creator_id: member.group_id.creator_id,
    }));

    // Combine and deduplicate 
    const allGroups = [
      ...createdGroups.map((g) => ({
        id: g._id,
        name: g.name,
        creator_id: g.creator_id,
        isCreator: true, 
      })),
      ...joinedGroupDetails.map((g) => ({
        id: g.id,
        name: g.name,
        creator_id: g.creator_id,
        isCreator: g.creator_id.toString() === userId.toString(), 
      })),
    ];

    // Remove duplicates by group ID
    const uniqueGroups = Array.from(
      new Map(allGroups.map((group) => [group.id.toString(), group])).values()
    );

    res.status(200).json({
      detail: "Groups retrieved successfully",
      groups: uniqueGroups,
    });
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ detail: "Internal server error" });
  }
});

module.exports = router;