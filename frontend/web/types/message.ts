import { User } from "./chat";

export interface MessageCreate {
    content?: string;
    group_id?: number;
}

// Full Message type 
export interface WebSocketMessages {
  type: "online_users" | "status" | "message" | "typing";
  data?: {
    users?: User[];
    user_id?: string;
    status?: string;
    id?: string;
    content?: string;
    sender_id?: string;
    group_id?: string | null;
    timestamp?: string;
  };
}


export interface Message {
  id: string;
  content: string;
  sender_id: string;
  group_id: string | null;
  timestamp: string;
}



// WebSocket action payloads 
export interface WebSocketAction {
    action: "message" | "typing" | "stop_typing";
    content?: string;
    group_id?: number;
}

export interface WebSocketMessage {
  type: "online_users" | "status" | "message" | "typing" | "stop_typing";
  data?: {
    users?: User[];
    user_id?: string;
    status?: string;
    [key: string]: any;
  };
}