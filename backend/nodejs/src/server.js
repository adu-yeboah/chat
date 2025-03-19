const http = require("http");
const app = require("./app");
const setupWebSocket = require("./websocket/chat");
require("./config/db"); 
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});