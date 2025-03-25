const WebSocket = require("ws");
const jwt = require("jsonwebtoken"); 
const User = require("../models/user");
const Message = require("../models/message");
const GroupMember = require("../models/groupMember");

const activeConnections = new Map();
const typingUsers = new Map();

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    // Extract token from query string or headers
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const token = urlParams.get("token") || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      ws.send(JSON.stringify({ error: "No token provided" }));
      ws.close();
      return;
    }

    // Verify token and extract user ID
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      userId = decoded.userId; 
    } catch (err) {
      ws.send(JSON.stringify({ error: "Invalid or expired token" }));
      ws.close();
      return;
    }

    if (!userId) {
      ws.close();
      return;
    }

    // Store WebSocket connection
    if (!activeConnections.has(userId)) activeConnections.set(userId, []);
    activeConnections.get(userId).push(ws);
    User.updateStatus(userId, "online");

    ws.on("message", async (data) => {
      const parsedData = JSON.parse(data);
      const { action } = parsedData;

      if (action === "message") {
        const message = await Message.create({
          content: parsedData.content,
          sender_id: userId,
          group_id: parsedData.group_id || null,
        });
        broadcastMessage(message);
      } else if (action === "typing") {
        const { group_id } = parsedData;
        if (!typingUsers.has(group_id)) typingUsers.set(group_id, []);
        if (!typingUsers.get(group_id).includes(userId)) {
          typingUsers.get(group_id).push(userId);
        }
        broadcastTyping(group_id);
      } else if (action === "stop_typing") {
        const { group_id } = parsedData;
        if (typingUsers.has(group_id)) {
          typingUsers.set(
            group_id,
            typingUsers.get(group_id).filter((id) => id !== userId)
          );
          broadcastTyping(group_id);
        }
      } else if (action === "get_online_users") {
        const onlineUserIds = Array.from(activeConnections.keys());
        const users = await User.find({ _id: { $in: onlineUserIds } }).select(
          "_id username last_seen status"
        );

        const onlineUsersData = users.map((user) => ({
          id: user._id.toString(),
          username: user.username,
          last_seen: user.last_seen ? user.last_seen.toISOString() : null,
          status: user.status,
        }));

        ws.send(
          JSON.stringify({
            type: "online_users",
            data: { users: onlineUsersData },
          })
        );
      }
    });

    ws.on("close", () => {
      const userConnections = activeConnections.get(userId).filter((conn) => conn !== ws);
      if (userConnections.length === 0) {
        activeConnections.delete(userId);
        User.updateStatus(userId, "offline");
        broadcastStatus(userId, "offline");
      } else {
        activeConnections.set(userId, userConnections);
      }
    });
  });

  // Broadcast functions remain unchanged
  function broadcastMessage(message) {
    const messageData = {
      type: "message",
      data: {
        id: message._id,
        content: message.content,
        sender_id: message.sender_id,
        group_id: message.group_id,
        timestamp: message.timestamp.toISOString(),
      },
    };
    if (message.group_id) {
      GroupMember.getMembers(message.group_id).then((members) => {
        members.forEach((userId) => {
          if (activeConnections.has(userId.toString())) {
            activeConnections
              .get(userId.toString())
              .forEach((ws) => ws.send(JSON.stringify(messageData)));
          }
        });
      });
    } else {
      if (activeConnections.has(message.sender_id.toString())) {
        activeConnections
          .get(message.sender_id.toString())
          .forEach((ws) => ws.send(JSON.stringify(messageData)));
      }
    }
  }

  function broadcastTyping(group_id) {
    const data = { type: "typing", group_id, users: typingUsers.get(group_id) || [] };
    GroupMember.getMembers(group_id).then((members) => {
      members.forEach((userId) => {
        if (activeConnections.has(userId.toString())) {
          activeConnections
            .get(userId.toString())
            .forEach((ws) => ws.send(JSON.stringify(data)));
        }
      });
    });
  }

  function broadcastStatus(user_id, status) {
    const data = { type: "status", data: { user_id, status } };
    activeConnections.forEach((wsArray) => {
      wsArray.forEach((ws) => ws.send(JSON.stringify(data)));
    });
  }

  return wss;
}

module.exports = setupWebSocket;
module.exports.activeConnections = activeConnections;