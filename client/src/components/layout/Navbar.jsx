import React, { useState } from 'react';
import { Menu, X, Zap, ChevronDown, ChevronRight } from 'lucide-react'; // Removed Search, Bell imports

export default function Navbar({ activeTab, setActiveTab, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(null);

    const navItems = [
        { label: 'Employees', subItems: ['All Staff', 'Attendance'] },
        { label: 'Analytics', subItems: ['Reports'] },
    ];

    const handleNavClick = (tabName) => {
        setActiveTab(tabName);
        setIsOpen(false);
    };

    return (
        <nav className="sticky top-6 z-50 px-4 mb-8">
            <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('Employees')}>
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <Zap className="text-white fill-white" size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-wide text-white">Orbit<span className="text-cyan-400">HR</span></span>
                </div>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex items-center space-x-2">
                    {navItems.map((item) => (
                        <div key={item.label} className="relative group">
                            <button
                                onClick={() => setActiveTab(item.label)}
                                className={`flex items-center gap-1 px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${activeTab === item.label || (item.subItems.includes(activeTab))
                                        ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {item.label}
                                {item.subItems.length > 0 && <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform" />}
                            </button>

                            {/* Sub-menu Dropdown */}
                            {item.subItems.length > 0 && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-[#1e293b]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                                    <div className="p-1">
                                        {item.subItems.map(sub => (
                                            <button
                                                key={sub}
                                                onClick={(e) => { e.stopPropagation(); handleNavClick(sub); }}
                                                className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                            >
                                                {sub}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Actions (CLEANED UP: Removed Search & Bell) */}
                <div className="hidden md:flex items-center gap-4">
                    <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-colors">
                        Logout
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {isOpen && (
                <div className="absolute top-24 left-4 right-4 bg-[#1e293b] border border-white/10 rounded-2xl p-4 shadow-2xl md:hidden z-50 animate-fade-in-up">
                    {navItems.map(item => (
                        <div key={item.label} className="border-b border-white/5 last:border-0">
                            <div
                                className={`flex items-center justify-between py-3 px-4 rounded-lg cursor-pointer ${activeTab === item.label ? 'text-cyan-400' : 'text-gray-300'
                                    }`}
                                onClick={() => {
                                    if (item.subItems.length > 0) {
                                        setMobileSubMenuOpen(mobileSubMenuOpen === item.label ? null : item.label);
                                    } else {
                                        handleNavClick(item.label);
                                    }
                                }}
                            >
                                <span className="font-medium">{item.label}</span>
                                {item.subItems.length > 0 && (
                                    mobileSubMenuOpen === item.label ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                                )}
                            </div>

                            {item.subItems.length > 0 && mobileSubMenuOpen === item.label && (
                                <div className="bg-black/20 rounded-lg mb-2 mx-2 p-2">
                                    {item.subItems.map(sub => (
                                        <div key={sub} onClick={() => handleNavClick(sub)} className="py-2 px-4 text-sm text-gray-400 hover:text-white cursor-pointer">
                                            {sub}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <button onClick={onLogout} className="w-full py-3 text-center text-red-400 font-bold bg-white/5 rounded-xl">Logout</button>
                    </div>
                </div>
            )}
        </nav>
    );
}