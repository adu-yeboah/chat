const WebSocket = require("ws");
const User = require("../models/user");
const Message = require("../models/message");
const GroupMember = require("../models/groupMember");

const activeConnections = new Map(); 
const typingUsers = new Map(); 

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const userId = req.url.split("/")[2];
    if (!userId) {
      ws.close();
      return;
    }

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
      }
    });

    ws.on("close", () => {
      activeConnections.set(
        userId,
        activeConnections.get(userId).filter((conn) => conn !== ws)
      );
      User.updateStatus(userId, "offline");
      broadcastStatus(userId, "offline");
    });
  });

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
    const data = { type: "status", user_id, status };
    activeConnections.forEach((wsArray, key) => {
      wsArray.forEach((ws) => ws.send(JSON.stringify(data)));
    });
  }

  return wss;
}

module.exports = setupWebSocket;