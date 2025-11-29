import React, { useState } from 'react';
import { MoreVertical, Edit, Trash } from 'lucide-react';

export default function EmployeeTile({ data, onClick, onEdit, onDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div
            // Main Card Click -> Opens Modal
            onClick={() => onClick(data)}
            className="group relative bg-[#1e293b]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 cursor-pointer overflow-visible transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl pointer-events-none" />

            {/* Top Row with Context Menu */}
            <div className="flex justify-between items-start mb-6 relative z-20">

                <div className="relative">
                    <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-br from-cyan-400 to-purple-500">
                        <img src={data.avatarUrl} alt={data.name} className="w-full h-full rounded-full object-cover border-2 border-[#1e293b]" />
                    </div>
                    <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#1e293b] ${data.status === 'Active' ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]' : 'bg-amber-400'}`} />
                </div>

                {/* --- BUN BUTTON --- */}
                <div className="relative">
                    <button
                        type="button" // Explicitly define type to prevent form submission issues
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // STOP event from bubbling to card
                            setMenuOpen(!menuOpen);
                        }}
                        className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <MoreVertical size={20} />
                    </button>

                    {/* --- DROPDOWN MENU --- */}
                    {menuOpen && (
                        <div
                            className="absolute right-0 mt-2 w-36 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200"
                            onClick={(e) => e.stopPropagation()} // Safety net: catching clicks inside the menu container itself
                        >
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation(); // CRITICAL: Stop bubble
                                    setMenuOpen(false);
                                    onEdit();
                                }}
                                className="w-full text-left px-4 py-3 text-xs text-gray-300 hover:bg-white/10 hover:text-white flex gap-2 items-center transition-colors"
                            >
                                <Edit size={14} /> Edit
                            </button>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation(); // CRITICAL: Stop bubble
                                    setMenuOpen(false);
                                    onDelete();
                                }}
                                className="w-full text-left px-4 py-3 text-xs text-red-400 hover:bg-red-500/10 flex gap-2 items-center transition-colors border-t border-white/5"
                            >
                                <Trash size={14} /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Info Section */}
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors truncate pr-2">{data.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{data.role}</p>

                <div className="grid grid-cols-2 gap-2 mb-4 bg-black/20 rounded-xl p-3 border border-white/5">
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500">Dept</p>
                        <p className="text-sm font-medium text-gray-200 truncate">{data.department}</p>
                    </div>
                    <div className="text-center border-l border-white/10">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500">Score</p>
                        <p className={`text-sm font-medium ${data.attendance >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {Math.round(data.attendance)}%
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 h-14 overflow-hidden content-start">
                    {data.subjects.slice(0, 3).map(sub => (
                        <span key={sub} className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-400">
                            {sub}
                        </span>
                    ))}
                    {data.subjects.length > 3 && (
                        <span className="text-[10px] px-2 py-1 text-gray-500">+{data.subjects.length - 3}</span>
                    )}
                </div>
            </div>
        </div>
    );
}