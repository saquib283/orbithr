import React, { useState } from 'react';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';

export default function EmployeeGrid({ data, onClick, onEdit, onDelete }) {
    // Track which row has the menu open (by ID)
    const [openMenuId, setOpenMenuId] = useState(null);

    return (
        <div className="w-full bg-[#1e293b]/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl overflow-x-auto custom-scrollbar pb-24">
            {/* Added pb-24 to make space for the dropdown at the bottom */}

            <table className="w-full min-w-[1000px] text-left border-collapse">
                <thead className="bg-white/5 sticky top-0 z-10">
                    <tr>
                        {['Employee', 'Role', 'Department', 'Status', 'Performance', 'Actions'].map((h) => (
                            <th key={h} className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {data.map((emp) => (
                        <tr
                            key={emp.id}
                            onClick={() => onClick(emp)}
                            className="group hover:bg-white/[0.02] cursor-pointer transition-colors"
                        >
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <img src={emp.avatarUrl} alt="" className="w-10 h-10 rounded-full border border-white/10" />
                                    <div>
                                        <p className="font-bold text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">{emp.name}</p>
                                        <p className="text-xs text-gray-500 font-mono">{emp.id}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{emp.role}</td>
                            <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{emp.department}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${emp.status === 'Active'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.2)]'
                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                    }`}>
                                    {emp.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 min-w-[200px]">
                                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${emp.attendance}%` }} />
                                </div>
                            </td>

                            {/* ACTIONS COLUMN */}
                            <td className="px-6 py-4 text-right relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenuId(openMenuId === emp.id ? null : emp.id);
                                    }}
                                    className="p-2 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/10"
                                >
                                    <MoreHorizontal size={20} />
                                </button>

                                {/* Dropdown Menu */}
                                {openMenuId === emp.id && (
                                    <div className="absolute right-8 top-8 w-32 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenuId(null);
                                                onEdit(emp);
                                            }}
                                            className="w-full text-left px-4 py-3 text-xs text-gray-300 hover:bg-white/10 hover:text-white flex gap-2 items-center"
                                        >
                                            <Edit size={14} /> Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenuId(null);
                                                onDelete(emp.id);
                                            }}
                                            className="w-full text-left px-4 py-3 text-xs text-red-400 hover:bg-red-500/10 flex gap-2 items-center border-t border-white/5"
                                        >
                                            <Trash size={14} /> Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Click outside listener to close menus could be added here, but simple toggle works for POC */}
        </div>
    );
}