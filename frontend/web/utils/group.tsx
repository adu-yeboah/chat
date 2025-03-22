"use client";
import { instance } from "@/service/api";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { Group } from "@/types/groups";



export const useGroup = () => {
  const [groups, setGroups] = useState<Group[] | undefined>(undefined);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  const { user } = useAuth();

  // Get all groups under user
  const getGroups = async () => {
    if (!user?.id) {
      setError("User not authenticated");
      return;
    }
    try {
      const response = await instance.get("/group");
      setGroups(response.data);
    } catch (err) {
      setError(err as string);
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

  return {
    message,
    groups,
    createGroup,
    getGroups,
    error, // Expose error state if needed
  };
};