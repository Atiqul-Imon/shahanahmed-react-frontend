import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromApi, deleteProject } from "../../../utils/api.js";
import SnippetList from "../Snippet/SnippetList.jsx";
import JobListings from "../../components/JobListings.jsx";
import DashboardLayout from "./DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Briefcase, Code, Users } from 'lucide-react';

const StatCard = ({ icon, label, value, color }) => {
    const Icon = icon;
    return (
        <div className={`p-6 rounded-2xl bg-gray-800 border border-gray-700 shadow-soft`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400">{label}</p>
                    <p className="text-3xl font-bold text-gray-200">{value}</p>
                </div>
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${color}`}>
                    <Icon size={24} className="text-white" />
                </div>
            </div>
        </div>
    );
};

const DashboardOverview = () => {
    const [stats, setStats] = useState({ projects: 0, snippets: 0 });

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [projectData, snippetData] = await Promise.all([
                    fetchDataFromApi("/api/project"),
                    fetchDataFromApi("/api/snippet"),
                ]);

                setStats({
                    projects: projectData.data?.length || 0,
                    snippets: snippetData?.length || 0,
                });
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            }
        };
        fetchAllData();
    }, []);

    const chartData = [
        { name: 'Projects', count: stats.projects, fill: '#16a34a' },
        { name: 'Snippets', count: stats.snippets, fill: '#f97316' },
    ];

    const pieChartColors = ['#16a34a', '#f97316'];

    return (
        <DashboardLayout>
            <div className="space-y-10">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-200">Dashboard Overview</h1>
                    <p className="text-gray-400 mt-1">Welcome back! Here's a summary of your content.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={Briefcase} label="Total Projects" value={stats.projects} color="from-green-500 to-green-400" />
                    <StatCard icon={Code} label="Total Snippets" value={stats.snippets} color="from-orange-500 to-orange-400" />
                    <StatCard icon={Users} label="Total Users" value="1" color="from-purple-500 to-purple-400" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-3 bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-soft">
                        <h2 className="text-lg font-semibold text-gray-200 mb-4">Content Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #374151',
                                        color: '#F9FAFB'
                                    }}
                                />
                                <Legend wrapperStyle={{ fontSize: '14px', color: '#9CA3AF' }} />
                                <Bar dataKey="count" name="Total Count" barSize={40} radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="lg:col-span-2 bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-soft">
                        <h2 className="text-lg font-semibold text-gray-200 mb-4">Content Types</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={chartData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                     contentStyle={{
                                        backgroundColor: '#1F2937',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #374151',
                                        color: '#F9FAFB'
                                    }}
                                />
                                <Legend wrapperStyle={{ fontSize: '14px', color: '#9CA3AF' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardOverview;
