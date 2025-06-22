import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { fetchDataFromApi, deleteProject } from '../../../utils/api';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { format } from 'date-fns';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetchDataFromApi("/api/project");
                if (response.error) throw new Error(response.message);
                const sortedProjects = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setProjects(sortedProjects);
            } catch (err) {
                console.error("Error fetching projects:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleDelete = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            const response = await deleteProject(projectId);
            if (response.error) throw new Error(response.message);
            setProjects(projects.filter((project) => project._id !== projectId));
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-gray-800 border border-gray-700 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
                        <p className="text-gray-400 mt-1">You have {projects.length} projects.</p>
                    </div>
                    <button
                        onClick={() => navigate("/dashboard/add-project")}
                        className="flex items-center space-x-2 mt-4 sm:mt-0 px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                        <Plus size={18} />
                        <span>Add New Project</span>
                    </button>
                </div>
                
                {/* Search and Filters */}
                <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-grow">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search projects..." className="w-full pl-11 p-3 bg-gray-700 border border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>

                {/* Projects Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-white">
                        <thead className="bg-gray-700 border-b-2 border-gray-600">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-300">Title</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Status</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Created At</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {loading ? (
                                <tr><td colSpan="4" className="text-center py-8"><LoadingSpinner /></td></tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project._id} className="hover:bg-gray-700/50">
                                        <td className="p-4 align-top">
                                            <p className="font-semibold text-white">{project.title}</p>
                                        </td>
                                        <td className="p-4 align-top">
                                            <span className={`px-2 py-1 text-xs font-medium ${project.status === 'completed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                                                {project.status || 'draft'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-400 align-top">
                                            {format(new Date(project.createdAt), "MM/dd/yyyy")}
                                        </td>
                                        <td className="p-4 text-center align-top">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button onClick={() => navigate(`/dashboard/edit-project/${project._id}`)} className="p-2 text-indigo-400 hover:bg-gray-600">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(project._id)} className="p-2 text-red-400 hover:bg-gray-600">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Projects; 