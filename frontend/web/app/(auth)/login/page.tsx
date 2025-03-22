"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { useFlashMessage } from "flashmessage-js";
import { RiLockPasswordLine, RiUserSmileLine } from "react-icons/ri";

const SignInPage: React.FC = () => {
  const { showFlashMessage } = useFlashMessage();
  const { login, message, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err) {
      showFlashMessage("An unexpected error occurred", "error");
      console.error(err);
    }

  };

  useEffect(() => {
    message && showFlashMessage(message as string, 'info')
    error && showFlashMessage(error as string, 'error')
  }, [message, error])


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
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>

              <div className="mt-1 relative rounded-md shadow-sm">

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiUserSmileLine size={20} className="text-black" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full p-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockPasswordLine size={20} className="text-black" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full p-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-sm font-medium cursor-pointer rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-purple-600 hover:text-purple-500">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;