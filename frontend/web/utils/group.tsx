"use client"
import { instance } from "@/service/api"
import { useState } from "react"
import { handleError } from "./error";
import { useAuth } from "@/context/authContext";

export const useGroup = () => {

  const [groups, setGroups] = useState()
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState()

  const {user} = useAuth()
  //Get all groups under user
  function getGroups() {

  }


  // Create Group
  function createGroup(name: string) {
    const payload = {
      name: name,
      creator_id: user?.id
    }
    try {
      instance.post("/group", payload)
        .then(res => {
          if (res.status == 200) {
            setMessage(res.data.details)
          }
        })
    } catch (error) {
      const err = handleError(error)
    }
  }


  return {
    message,
    groups,
    createGroup,
    getGroups,
  }
}