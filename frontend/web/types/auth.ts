import { Dispatch, SetStateAction } from "react";
import { User, UserCreate, Message} from "./chat";

export interface AuthContextType {
    user: User | null;
    setPayload:  Dispatch<SetStateAction<UserCreate | undefined>>;
    token: string | null;
    register: () => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    getMe: () => void;
    isAuthenticated: boolean;
    error: string;
    message: string;
    messages: Message[];
    sendMessage: (message: { action: string; [key: string]: any; }) => void;
    isConnected: boolean;
    onlineUsers: User[];
}