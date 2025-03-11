export interface User {
    id: string;
    name: string;
    avatar: string;
    status?: 'active' | 'offline';
  }
  
  export interface Message {
    id: string;
    sender: User;
    content: string;
    timestamp: string;
    isSentByCurrentUser?: boolean;
  }