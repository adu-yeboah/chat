"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Sidechats from '@/components/sidechats';

// Group interface definition
interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  createdBy: string;
  createdAt: string;
  members: number;
  isPublic: boolean;
  messagesCount: number;
  lastActive: string;
}

export default function Page() {
  const router = useRouter();


  const [group, setGroup] = useState<Group | null>({
    id: "4",
    name: 'General Chat',
    description: 'A place for everyone to hang out and chat',
    avatar: 'https://via.placeholder.com/150',
    createdBy: 'johndoe',
    createdAt: '2023-03-01',
    members: 42,
    isPublic: true,
    messagesCount: 1250,
    lastActive: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (group) {
      setGroup({ ...group, [name]: value });
    }
  };

  const handleTogglePublic = () => {
    if (group) {
      setGroup({ ...group, isPublic: !group.isPublic });
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    // In a real app, this would make an API call to save changes
    console.log('Updated group data:', group);
  };

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Group not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidechats />
       
      </div>
    </>
  );
};

