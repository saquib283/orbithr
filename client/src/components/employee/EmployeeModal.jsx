import React from 'react';
import { X, Mail, Phone, Activity, MapPin } from 'lucide-react';
export default function EmployeeModal({ emp, onClose }) {
    if (!emp) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            { }
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            { }
            <div className="relative w-full max-w-3xl bg-[#0f172a] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-300">
                { }
                <div className="h-40 bg-gradient-to-r from-blue-900 to-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black"></div>
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-white/10 rounded-full text-white transition-colors z-10"><X /></button>
                </div>
                <div className="px-8 pb-8 relative">
                    { }
                    <div className="relative -mt-16 mb-6 flex items-end justify-between">
                        <div className="p-1.5 bg-[#0f172a] rounded-full inline-block">
                            <img src={emp.avatarUrl} alt={emp.name} className="w-32 h-32 rounded-full border-4 border-[#0f172a] object-cover" />
                        </div>
                        <div className="flex gap-3">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold border ${emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                {emp.status}
                            </span>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white">{emp.name}</h2>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-cyan-400 font-medium">{emp.role}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                            <span className="text-gray-400">{emp.department}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                            <span className="text-gray-500 text-sm">{emp.class || 'General'}</span>
                        </div>
                    </div>
                    { }
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        { }
                        <div className="space-y-6">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Personal Details</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Mail size={18} /></div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email Address</p>
                                        <p className="text-sm text-gray-200">{emp.name.toLowerCase().replace(/\s/g, '.')}@orbit.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Phone size={18} /></div>
                                    <div>
                                        <p className="text-xs text-gray-500">Phone</p>
                                        <p className="text-sm text-gray-200">+1 (555) 000-0000</p>
                                    </div>
                                </div>
                                {emp.age && (
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400"><MapPin size={18} /></div>
                                        <div>
                                            <p className="text-xs text-gray-500">Age</p>
                                            <p className="text-sm text-gray-200">{emp.age} Years Old</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        { }
                        <div className="space-y-6">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Performance Metrics</h4>
                            <div className="p-5 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/5">
                                <div className="flex justify-between items-end mb-4">
                                    <div className="flex items-center gap-2 text-emerald-400">
                                        <Activity size={18} />
                                        <span className="font-bold">Attendance Score</span>
                                    </div>
                                    <span className="text-2xl font-bold text-white">{Math.round(emp.attendance)}%</span>
                                </div>
                                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${emp.attendance}%` }} />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Subjects / Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {emp.subjects && emp.subjects.map(sub => (
                                        <span key={sub} className="px-3 py-1.5 bg-[#0f172a] border border-cyan-500/30 text-cyan-400 text-xs rounded-lg shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                                            {sub}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}