import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
export default function EmployeeFormModal({ isOpen, onClose, onSubmit, initialData, loading }) {
    const [formData, setFormData] = useState({
        name: '',
        role: 'EMPLOYEE',
        department: '',
        status: 'Active',
        age: 25,
        class: '',
        attendance: 100,
        subjects: ''
    });
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                subjects: initialData.subjects ? initialData.subjects.join(', ') : ''
            });
        } else {
            setFormData({ name: '', role: 'EMPLOYEE', department: '', status: 'Active', age: 25, class: '', attendance: 100, subjects: '' });
        }
    }, [initialData, isOpen]);
    if (!isOpen) return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            name: formData.name,
            role: formData.role,
            department: formData.department,
            status: formData.status,
            age: parseInt(formData.age) || 0,
            class: formData.class,
            attendance: parseFloat(formData.attendance) || 0,
            subjects: typeof formData.subjects === 'string'
                ? formData.subjects.split(',').map(s => s.trim()).filter(s => s)
                : []
        };
        onSubmit(submitData);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="text-xl font-bold text-white">{initialData ? 'Edit Employee' : 'Add New Employee'}</h2>
                    <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Full Name</label>
                        <input
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                            placeholder="e.g. Jane Doe"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Role</label>
                            <select
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all appearance-none"
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="EMPLOYEE" className="bg-slate-800">Employee</option>
                                <option value="MANAGER" className="bg-slate-800">Manager</option>
                                <option value="ADMIN" className="bg-slate-800">Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Department</label>
                            <input
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Class / Level</label>
                            <input
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                                value={formData.class}
                                onChange={e => setFormData({ ...formData, class: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Age</label>
                                <input
                                    type="number"
                                    required
                                    min="18"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                    value={formData.age}
                                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Attendance (%)</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    max="100"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                    value={formData.attendance}
                                    onChange={e => setFormData({ ...formData, attendance: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Subjects (Comma separated)</label>
                        <input
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                            placeholder="Sales 101, AWS, GraphQL"
                            value={formData.subjects}
                            onChange={e => setFormData({ ...formData, subjects: e.target.value })}
                        />
                    </div>
                    <div className="pt-6 flex justify-end gap-4 border-t border-white/5">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Save Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}