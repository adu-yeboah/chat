"use client"
import React, { useState } from 'react';
import Head from 'next/head';

interface Settings {
  username: string;
  email: string;
  notifications: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    username: 'johndoe',
    email: 'john@example.com',
    notifications: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save settings to a backend
    console.log('Settings saved:', settings);
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <Head>
        <title>Chat App - Settings</title>
        <meta name="description" content="Chat application settings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 shadow rounded-lg p-6">
          {/* Account Settings */}
          <div className="space-y-4 pt-9">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={settings.username}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={settings.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-700 px-3 py-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Notifications</span>
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>


          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border cursor-pointer border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Settings
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

