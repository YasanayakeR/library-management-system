import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import illustration from "../assets/library_illustration.png";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(username, password);
            toast.success("Login successful!");
            navigate("/");
        } catch (error: any) {
            toast.error(error.response?.data || "Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden font-sans">
            <div className="hidden md:flex md:w-3/5 bg-slate-50 flex-col items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute top-8 left-8 flex items-center gap-3">
                    <img src={logo} alt="ShelfWise Logo" className="w-8 h-8 object-contain" />
                    <span className="text-xl font-bold text-theme-primary tracking-tight">ShelfWise</span>
                </div>

                <div className="z-10 text-center max-w-lg mb-8">
                    <h2 className="text-sm font-bold text-theme-accent uppercase tracking-[0.3em] mb-4">Welcome to</h2>
                    <h1 className="text-5xl font-black text-theme-primary mb-6 leading-tight">
                        Library Management System
                    </h1>
                </div>

                <div className="relative w-full max-w-xl transform hover:scale-105 transition-transform duration-700">
                    <img
                        src={illustration}
                        alt="Library Illustration"
                        className="w-full h-auto drop-shadow-2xl rounded-3xl"
                    />
                </div>
            </div>


            <div className="flex-1 bg-theme-primary flex flex-col items-center justify-center p-8 sm:p-12 lg:p-20 relative">
                <div className="w-full max-w-sm">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-2">Login Page</h2>
                        <p className="text-slate-400 font-medium">Welcome to your Account!</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-10">
                        <div className="relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-theme-accent transition-colors">
                                Username
                            </label>
                            <div className="flex items-center border-b-2 border-slate-700 group-focus-within:border-theme-accent transition-all pb-2">
                                <div className="p-2 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-500 group-focus-within:text-theme-accent">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-transparent text-white focus:outline-none text-lg font-medium placeholder:text-slate-600"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>


                        <div className="relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-theme-accent transition-colors">
                                Password
                            </label>
                            <div className="flex items-center border-b-2 border-slate-700 group-focus-within:border-theme-accent transition-all pb-2">
                                <div className="p-2 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-500 group-focus-within:text-theme-accent">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent text-white focus:outline-none text-lg font-medium placeholder:text-slate-600"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-theme-accent text-theme-primary py-4 rounded-2xl font-black text-lg hover:brightness-110 transform hover:-translate-y-1 transition-all shadow-xl shadow-theme-accent/20 active:scale-95 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed group"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {isLoading ? "Signing in..." : "LOGIN"}
                                {!isLoading && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                )}
                            </span>
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
