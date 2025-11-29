import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { Users, Clock, TrendingUp, AlertCircle, Briefcase } from 'lucide-react';

const trendData = [
    { name: 'Jan', score: 85, attendance: 92 },
    { name: 'Feb', score: 88, attendance: 94 },
    { name: 'Mar', score: 87, attendance: 91 },
    { name: 'Apr', score: 90, attendance: 96 },
    { name: 'May', score: 93, attendance: 98 },
    { name: 'Jun', score: 95, attendance: 97 },
];

const deptData = [
    { name: 'Eng', value: 40 },
    { name: 'Sales', value: 30 },
    { name: 'HR', value: 10 },
    { name: 'Ops', value: 20 },
];

const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'];

const StatCard = ({ title, value, sub, icon: Icon, color }) => (
    <div className="group relative bg-[#1e293b]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 overflow-hidden transition-all hover:border-white/10 hover:-translate-y-1">
        <div className={`absolute -right-4 -top-4 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color} transform scale-150`}>
            <Icon size={100} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
                    <Icon size={20} />
                </div>
                <span className="text-sm font-medium text-gray-400">{title}</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-xs text-gray-500">{sub}</p>
        </div>
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0f172a] border border-white/10 p-3 rounded-xl shadow-2xl">
                <p className="text-gray-400 text-xs mb-1">{label}</p>
                <p className="text-cyan-400 font-bold text-sm">
                    Score: {payload[0].value}%
                </p>
                <p className="text-purple-400 font-bold text-sm">
                    Attd: {payload[1]?.value}%
                </p>
            </div>
        );
    }
    return null;
};

export default function AnalyticsDashboard() {
    return (
        <div className="space-y-6 animate-fade-in-up pb-10">

            <div>
                <h2 className="text-3xl font-bold text-white">Workforce Insights</h2>
                <p className="text-gray-400 mt-1">Real-time metrics and performance analysis.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Employees" value="142" sub="+12% from last month" icon={Users} color="text-cyan-400" />
                <StatCard title="Avg Attendance" value="96.8%" sub="+0.4% increase" icon={Clock} color="text-emerald-400" />
                <StatCard title="Performance" value="8.9" sub="Top 10% in industry" icon={TrendingUp} color="text-purple-400" />
                <StatCard title="On Leave" value="4" sub="2 returning next week" icon={AlertCircle} color="text-amber-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                <div className="lg:col-span-2 bg-[#1e293b]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Performance & Attendance</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorAttd" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                <Area type="monotone" dataKey="attendance" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorAttd)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>


                <div className="bg-[#1e293b]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2">Department Split</h3>
                    <div className="flex-1 min-h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deptData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {deptData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Center Text overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-white">4</span>
                            <span className="text-xs text-gray-500 uppercase tracking-widest">Depts</span>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {deptData.map((d, i) => (
                            <div key={d.name} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                <span className="text-sm text-gray-400">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}