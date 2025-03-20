"use client"
import { instance } from "@/service/api";
import { AuthContextType } from "@/types/auth";
import { Token, User, UserCreate } from "@/types/chat";
import React, { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [payload, setPayload] = useState<UserCreate>();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [message, setMessage] = useState<string>();
    const [error, setError] = useState<string | null>(null);

    const router = useRouter()

    const handleError = (err: any) => {
        if (err.response && err.response.data && err.response.data.detail) {
            setError(err.response.data.detail);
        } else if (err.message) {
            setError("Network error: " + err.message);
        } else {
            setError("An unexpected error occurred.");
        }
        console.error("Error:", err);
    };

    // Register user
    const register = async () => {
        if (!payload) return;

        await instance.post("/register", payload)
            .then(response => {
                setUser(response.data);
                setMessage(response.data.detail);
                setError(null);
            })
            .catch(handleError);
    };

    // Login user
    const login = async (username: string, password: string) => {
        const payload = {
            username,
            password
        }
        await instance.post<Token>("/login", payload)
            .then(async response => {
                const tokenData = response.data;
                setToken(tokenData.access_token);
                Cookies.set("token", tokenData.access_token);

                return instance.get<User>("/users/me");
            })
            .then(response => {
                setUser(response.data);
                setMessage("Login Successfully");
                setError(null);
                router.push("/")
            })
            .catch(handleError);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        Cookies.remove("token");
        setError(null);
    };

    const isAuthenticated = !!token;

    const value: AuthContextType = {
        user,
        token,
        message,
        error,
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

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};