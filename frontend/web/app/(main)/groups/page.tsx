"use client"
import React, { useState, useEffect } from 'react';
import GroupsSidechats from '@/components/groupsSidechats';
import EmptyChat from '@/components/ui/emptychat';


export default function Page() {


  if (!true) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Group not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-white">
        <GroupsSidechats />

        <EmptyChat />
      </div>
    </>
  );
};


