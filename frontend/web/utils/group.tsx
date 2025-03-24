"use client";
import { instance } from "@/service/api";
import { useCallback, useState } from "react";
import { Group } from "@/types/groups";

export const useGroup = () => {
  const [groups, setGroups] = useState<Group[]>();
  const [onlineUsers, setOnlineUsers] = useState([]); 
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);


  const handleError = (err: any) => {
    const errorMessage =
      err.response?.data?.detail || err.message || "An unexpected error occurred";
    setError(errorMessage);
    console.error("Group error:", err);
    return errorMessage;
  };

  // Get all groups under user
  const getGroups = async () => {
    try {
      const response = await instance.get("/groups");
      setGroups(Array.isArray(response.data.groups) ? response.data.groups : []);
      setMessage(response.data.detail);
      setError("");
    } catch (err) {
      // handleError(err);
      setGroups([]);
    }
  };

  // Create Group
  const createGroup = async (name: string) => {
    const payload = {
      name,
    };

    try {
      const response = await instance.post("/group", payload);
      if (response.status === 200) {
        setMessage(response.data.details || "Group created successfully");
      }
    } catch (err) {
      throw err;
    }
  };



  // ger online Users
  const getOnlineUsers = useCallback(async () => {
    try {
      const response = await instance.get("/online-users");
      setOnlineUsers(response.data.users);
      setMessage(response.data.detail);
      setError("");
    } catch (err) {
      handleError(err);
      setOnlineUsers([]);
    }
  }, []);

  
  return {
    message,
    groups,
    onlineUsers,
    createGroup,
    getGroups,
    getOnlineUsers,
    error,
  };
};