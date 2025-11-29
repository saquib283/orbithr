import React, { useState } from 'react';
// FIX: Revert to standard import. 
// Your updated vite.config.js will now handle this correctly.
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/queries';
import { Zap, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('admin@orbit.com');
    const [password, setPassword] = useState('admin123');
    const [errorMsg, setErrorMsg] = useState('');

    // Apollo Hook
    const [loginFunction, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            // Pass data back to App.jsx to update state
            onLogin(data.login);
        },
        onError: (err) => {
            setErrorMsg(err.message || 'Login failed');
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            await loginFunction({ variables: { email, password } });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" />

            {/* Glass Card */}
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 animate-fade-in-up">

                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 mx-auto mb-4">
                        <Zap className="text-white fill-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
                    <p className="text-gray-400 mt-2">Sign in to access OrbitHR</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {errorMsg && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                            {errorMsg}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
                    </button>
                </form>
            </div>
        </div>
    );
}