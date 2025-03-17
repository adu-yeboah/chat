export interface MessageCreate {
    content?: string;
    group_id?: number;
}

// Full Message type 
export interface Message {
    id: number;
    content: string;
    file_url?: string;
    sender_id: number;
    group_id?: number;
    timestamp: string;
    sender_username?: string;
}

// WebSocket message types
export type WebSocketMessage =
    | {
        type: "message";
        data: Message;
    }
    | {
        type: "typing";
        group_id: number;
        users: number[];
    }
    | {
        type: "status";
        user_id: number;
        status: "online" | "offline";
    };

// WebSocket action payloads 
export interface WebSocketAction {
    action: "message" | "typing" | "stop_typing";
    content?: string;
    group_id?: number;
}