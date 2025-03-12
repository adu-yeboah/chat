import React, { FormEvent } from "react";
import Link from "next/link";
import { AiTwotoneMail } from "react-icons/ai";

const ForgotPasswordPage: React.FC = () => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Forgot password request submitted");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div className="text-center">
                    <div className="flex justify-center items-center mb-4">
                        {/* You can add a logo or icon here if desired */}
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900">Forgot Password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your email to receive a password reset link.
                    </p>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <AiTwotoneMail size={20} className="text-black" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none rounded-md relative block w-full p-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter Email"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Send Reset Link
                        </button>
                    </div>
                </form>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Remembered your password?{" "}
                    <Link href="/auth" className="font-medium text-purple-600 hover:text-purple-500">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;