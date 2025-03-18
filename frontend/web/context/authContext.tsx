"use client"
import { instance } from "@/service/api";
import { AuthContextType } from "@/types/auth";
import { Token, User, UserCreate } from "@/types/chat";
import React, { createContext, useContext, useState, ReactNode } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [payload, setPayload] = useState<UserCreate>()
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Register user
    async function registerUser(): Promise<User> {
        try {
            const response = await instance.post("/register", payload);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || "Registration failed");
        }
    }

    // Login user
    async function loginUser(username: string, password: string): Promise<Token> {
        try {
            const response = await instance.post<Token>("/token", new URLSearchParams({ username, password }));
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || "Login failed");
        }
    }

    const register = async () => {
        try {
            const newUser = await registerUser();
            setUser(newUser);
            console.log("df");
            
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const tokenData = await loginUser(username, password);
            setToken(tokenData.access_token);
            localStorage.setItem("token", tokenData.access_token);

            const userResponse = await instance.get<User>("/users/me");
            setUser(userResponse.data);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    const isAuthenticated = !!token;

    const value: AuthContextType = {
        user,
        token,
        setPayload,
        register,
        login,
        logout,
        isAuthenticated,

    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
