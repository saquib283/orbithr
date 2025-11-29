import React from 'react';
import { FileText, Download, Filter, Calendar, CheckCircle, Clock } from 'lucide-react';
const reportsData = [
    { id: 1, name: 'Monthly Attendance Summary', date: 'Oct 2024', type: 'PDF', size: '2.4 MB', status: 'Ready' },
    { id: 2, name: 'Q3 Performance Review', date: 'Sep 2024', type: 'PDF', size: '1.8 MB', status: 'Ready' },
    { id: 3, name: 'Employee Payroll Export', date: 'Oct 2024', type: 'CSV', size: '450 KB', status: 'Ready' },
    { id: 4, name: 'New Hires Onboarding', date: 'Nov 2024', type: 'PDF', size: '3.2 MB', status: 'Processing' },
    { id: 5, name: 'Department Budget Analysis', date: 'Aug 2024', type: 'XLS', size: '1.1 MB', status: 'Ready' },
];
export default function ReportsDashboard() {
    return (
        <div className="space-y-6 animate-fade-in-up pb-10">
            { }
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">System Reports</h2>
                    <p className="text-gray-400 mt-1">Access and download generated insights.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                        <Calendar size={18} /> Date Range
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all">
                        <FileText size={18} /> Generate New
                    </button>
                </div>
            </div>
            { }
            <div className="w-full bg-[#1e293b]/60 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Report Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Period</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {reportsData.map((report) => (
                            <tr key={report.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{report.name}</p>
                                            <p className="text-xs text-gray-500">{report.size}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">{report.date}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded text-xs font-mono bg-white/5 border border-white/10 text-gray-400">
                                        {report.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {report.status === 'Ready' ? (
                                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                                            <CheckCircle size={14} /> Ready
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
                                            <Clock size={14} /> Processing
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-colors">
                                        <Download size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}