// lib/websocket.ts
export function connectWebSocket(userId: number, onMessage: (msg: WebSocketMessage) => void) {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/${userId}`);
    
    ws.onmessage = (event) => {
      const data: WebSocketMessage = JSON.parse(event.data);
      onMessage(data);
    };
    
    return {
      sendMessage: (data: WebSocketAction) => ws.send(JSON.stringify(data)),
      close: () => ws.close(),
    };
  }
  
  // Usage in a component
  import { useEffect } from "react";
  const Chat = () => {
    useEffect(() => {
      const ws = connectWebSocket(1, (msg) => {
        switch (msg.type) {
          case "message":
            console.log("New message:", msg.data.content);
            break;
          case "typing":
            console.log("Users typing in group", msg.group_id, ":", msg.users);
            break;
          case "status":
            console.log(`User ${msg.user_id} is ${msg.status}`);
            break;
        }
      });
      
      // Send a message
      ws.sendMessage({ action: "message", content: "Hello!", group_id: 1 });
      
      return () => ws.close();
    }, []);
    
    return <div>Chat Component</div>;
  };



  async function uploadFile(file: File, token: string): Promise<{ file_url: string }> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://127.0.0.1:8000/upload-file", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error("Upload failed");
    return response.json();
  }