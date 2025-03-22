export interface User {
    id: number | string;
    username: string;
    avatar: string;
  }
  
  export interface Message {
    id: string;
    sender: User;
    content: string;
    timestamp: string;
    isSentByCurrentUser?: boolean;
  }

// Base User type 
export interface UserBase {
  username: string;
  email?: string;
}

// User creation type 
export interface UserCreate extends UserBase {
  password: string;
}

// Full User type 
export interface User extends UserBase {
  id: number | string;
  username: string;
  email: string;
  status: "online" | "offline";
  last_seen: string; 
}

export interface Token {
  refresh_token: any;
  access_token: string;
  token_type: string; // Typically "bearer"
}