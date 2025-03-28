"use client";
import { instance } from "@/service/api";
import { AuthContextType } from "@/types/auth";
import { Token, User, UserCreate } from "@/types/chat";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useWebSocket } from "@/utils/websocket";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [payload, setPayload] = useState<UserCreate>();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(Cookies.get("token") || null);
  const [refreshToken, setRefreshToken] = useState<string | null>(Cookies.get("refresh_token") || null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const { isConnected, onlineUsers, messages, sendMessage } = useWebSocket(user?.id as string);
    
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

  useEffect(() => {
    const interceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response?.status === 401 &&
          error.response?.data?.detail === "Token has expired" &&
          refreshToken &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const { data } = await instance.post<Token>("/refresh", {
              refresh_token: refreshToken,
            });
            setAccessToken(data.access_token);
            Cookies.set("token", data.access_token);
            instance.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
            originalRequest.headers["Authorization"] = `Bearer ${data.access_token}`;
            return instance(originalRequest);
          } catch (refreshError) {
            handleError(refreshError);
            logout();
            router.push("/login");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => instance.interceptors.response.eject(interceptor);
  }, []);



//Login Function
  const login = async (username: string, password: string) => {
    const payload = { username, password };
    try {
      const response = await instance.post<Token>("/login", payload);
      const tokenData = response.data;
      setAccessToken(tokenData.access_token);
      setRefreshToken(tokenData.refresh_token);
      Cookies.set("token", tokenData.access_token);
      if (tokenData.refresh_token) {
        Cookies.set("refresh_token", tokenData.refresh_token);
      }
      setMessage("Login successful");
      setError("");
      router.push("/");
    } catch (err) {
      handleError(err);
    }
  };

// Logout Function
  const logout = async () => {
    try {
      await instance.post("/logout");
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      Cookies.remove("token");
      Cookies.remove("refresh_token");
      delete instance.defaults.headers.common["Authorization"];
      setError("");
      setMessage("Logged out successfully");
      router.push("/login");
    } catch (error) {
      handleError(error);
    }
  };


   // Register user
   const register = async () => {
    if (!payload) return;
    try {
      const response = await instance.post<User>("/register", payload);
      setUser(response.data);
      setMessage(response.data?.detail || "Registration successful");
      setError("");
    } catch (err) {
      handleError(err);
    }
  };


    // Get current user
    const getMe = async () => {
      try {
        const response = await instance.get<User>("/users/me");
        setUser(response.data);
      } catch (err) {
        handleError(err);
      }
    };
  

  const isAuthenticated = !!accessToken;

  const value: AuthContextType = {
    user,
    token: accessToken,
    message,
    error,
    setPayload,
    register,
    login,
    logout,
    getMe,
    isAuthenticated,
    isConnected,
    onlineUsers,
    messages, 
    sendMessage, 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};