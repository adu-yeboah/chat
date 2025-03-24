"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { HiMiniUserCircle } from 'react-icons/hi2';
import { useAuth } from '@/context/authContext';

export default function page() {

  const [isEditing, setIsEditing] = useState(false);
  const { user, getMe } = useAuth()

  const handleSave = async () => {
    setIsEditing(false);
    console.log('Updated user data:', user);
  };

  useEffect(() => {
    getMe()
  }, [])

  const handleInputChange = (e: any) => {

  }
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800">
      <Head>
        <title>{user?.username} | Chat App</title>
        <meta name="description" content={`${user?.username}'s profile`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-grey-900 shadow-lg rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <HiMiniUserCircle
                  className="h-24 w-24 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${user.status === 'online'
                    ? 'bg-green-500'
                    : user.status === 'offline'
                      ? 'bg-yellow-500'
                      : 'bg-gray-500'
                    }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  {isEditing ? (
                    <input
                      type="text"
                      name="displayName"
                      value={user.username}
                      onChange={handleInputChange}
                      className="text-2xl font-bold text-gray-900 border rounded-md px-2 py-1"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
                  )}
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isEditing ? 'Save' : 'Edit Profile'}
                  </button>
                </div>
                <p className="text-gray-400 mt-1">@{user.username}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bio Section */}
              {/* <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={user.bio}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2 text-gray-300"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-300">{user.bio}</p>
                )}
              </div> */}

              {/* Stats Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Stats</h2>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-400">Status:</span>
                    <span className="ml-2 text-gray-900 capitalize">{user.status}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-400">last seen:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(user.last_seen).toLocaleDateString()}
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact</h2>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 text-gray-300"
                />
              ) : (
                <p className="text-gray-300">{user.email}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

