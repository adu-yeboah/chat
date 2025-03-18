"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/authContext";

const SignInPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    login(username, password)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to continue.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don’t have an account? <Link href="/register" className="text-purple-600 hover:text-purple-500">Signup now</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
