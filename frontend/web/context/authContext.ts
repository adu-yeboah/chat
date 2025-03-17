// contexts/AuthContext.tsx
import { Token, User, UserCreate } from "@/types/chat";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the AuthContext
interface AuthContextType {
    user: User | null;
    token: string | null;
    register: (data: UserCreate) => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider props
interface AuthProviderProps {
    children: ReactNode;
}

// Register function
async function registerUser(data: UserCreate): Promise<User> {
    const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
    }
    return response.json();
}

// Login function
async function loginUser(username: string, password: string): Promise<Token> {
    const formData = new URLSearchParams({ username, password });
    const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
    }
    return response.json();
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Load token/user from localStorage on mount (for persistence)
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            // Optionally fetch user data using the token here
        }
    }, []);

    // Register function wrapped for context
    const register = async (data: UserCreate) => {
        try {
            const newUser = await registerUser(data);
            setUser(newUser);
            // After registration, you might want to auto-login (optional)
        } catch (error) {
            console.error("Registration error:", error);
            throw error; // Re-throw to handle in component
        }
    };

    // Login function wrapped for context
    const login = async (username: string, password: string) => {
        try {
            const tokenData = await loginUser(username, password);
            setToken(tokenData.access_token);
            localStorage.setItem("token", tokenData.access_token); // Persist token
            // Fetch user data after login (optional, requires an endpoint)
            const userResponse = await fetch("http://127.0.0.1:8000/users/me", {
                headers: { Authorization: `Bearer ${tokenData.access_token}` },
            });
            if (userResponse.ok) {
                const userData = await userResponse.json();
                setUser(userData);
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error; // Re-throw to handle in component
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    // Derived state
    const isAuthenticated = !!token;

    const value: AuthContextType = {
        user,
        token,
        register,
        login,
        logout,
        isAuthenticated,
    };

    return (<AuthContext.Provider value= { value } > { children } </AuthContext.Provider>);
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};