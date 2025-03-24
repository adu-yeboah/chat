import { Dispatch, SetStateAction } from "react";
import { User, UserCreate} from "./chat";
import { Message } from "./message";

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
    sendMessage: () => void;
    isConnected: boolean;
    onlineUsers: User[];
}