import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromApi, deleteBlog, deleteProject } from "../../../utils/api.js";
import SnippetList from "../Snippet/SnippetList.jsx";
import JobListings from "../../components/JobListings.jsx";
import DashboardLayout from "./DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BookOpen, Briefcase, Code, Users } from 'lucide-react';

const StatCard = ({ icon, label, value, color }) => {
    const Icon = icon;
    return (
        <div className={`p-6 rounded-2xl bg-white border border-gray-200 shadow-soft`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <p className="text-3xl font-bold text-gray-800">{value}</p>
                </div>
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${color}`}>
                    <Icon size={24} className="text-white" />
                </div>
            </div>
        </div>
    );
};

const DashboardOverview = () => {
    const [stats, setStats] = useState({ blogs: 0, projects: 0, snippets: 0 });

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [blogData, projectData, snippetData] = await Promise.all([
                    fetchDataFromApi("/api/blog"),
                    fetchDataFromApi("/api/project"),
                    fetchDataFromApi("/api/snippet"),
                ]);

                setStats({
                    blogs: blogData.data?.length || 0,
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
        { name: 'Blogs', count: stats.blogs, fill: '#3b82f6' },
        { name: 'Projects', count: stats.projects, fill: '#16a34a' },
        { name: 'Snippets', count: stats.snippets, fill: '#f97316' },
    ];

    const pieChartColors = ['#3b82f6', '#16a34a', '#f97316'];

    return (
        <DashboardLayout>
            <div className="space-y-10">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back! Here's a summary of your content.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={BookOpen} label="Total Blogs" value={stats.blogs} color="from-blue-500 to-blue-400" />
                    <StatCard icon={Briefcase} label="Total Projects" value={stats.projects} color="from-green-500 to-green-400" />
                    <StatCard icon={Code} label="Total Snippets" value={stats.snippets} color="from-orange-500 to-orange-400" />
                    <StatCard icon={Users} label="Total Users" value="1" color="from-purple-500 to-purple-400" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-soft">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Content Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #e5e7eb',
                                    }}
                                />
                                <Legend wrapperStyle={{ fontSize: '14px' }} />
                                <Bar dataKey="count" name="Total Count" barSize={40} radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-soft">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Content Types</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={chartData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                     contentStyle={{
                                        backgroundColor: 'white',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #e5e7eb',
                                    }}
                                />
                                <Legend wrapperStyle={{ fontSize: '14px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardOverview;
