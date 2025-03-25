import { useAuth } from "@/context/authContext";
import { Message, User } from "@/types/chat";
import { WebSocketMessage } from "@/types/message";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";


export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) return; 

    const url = process.env.NEXT_PUBLIC_WS_URL;
    const wsUrl = `${url}?token=${token}`; 
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      wsRef.current?.send(JSON.stringify({ action: "get_online_users" }));
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      const data: WebSocketMessage = JSON.parse(event.data);

      if (data.type === "online_users" && data.data?.users) {
        setOnlineUsers(data.data.users);
      } else if (data.type === "status" && data.data?.user_id && data.data?.status) {
        setOnlineUsers((prev) => {
          if (data.data?.status === "online") {
            const existing = prev.find((u) => u.id === data.data?.user_id);
            if (!existing) {
              return [...prev, { id: data.data?.user_id, username: "Unknown", last_seen: null, status: "online" }];
            }
            return prev.map((u) =>
              u.id === data.data?.user_id ? { ...u, status: "online" } : u
            );
          } else if (data.data?.status === "offline") {
            return prev.filter((u) => u.id !== data.data?.user_id);
          }
          return prev;
        });
      } else if (data.type === "message" && data.data) {
        setMessages((prev) => [...prev, data.data as Message]);
      }
    };

    wsRef.current.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    // wsRef.current.onclose = () => {
    //   console.log("WebSocket disconnected");
    //   setIsConnected(false);
    // };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [token]); 

  const sendMessage = (message: { action: string; [key: string]: any }) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  return { isConnected, onlineUsers, sendMessage, messages };
};