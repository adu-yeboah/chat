const express = require("express");
const authMiddleware = require("../middleware/auth");
const { activeConnections } = require("../websocket/chat");
const router = express.Router()

router.get("/online-users", authMiddleware, (req, res) => {
    const onlineUsers = Array.from(activeConnections.keys());
    res.status(200).json({
        detail: "Online users retrieved successfully",
        users: onlineUsers,
    });
});


module.exports = router