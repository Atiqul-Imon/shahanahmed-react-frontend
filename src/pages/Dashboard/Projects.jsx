import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { fetchDataFromApi, deleteProject } from '../../../utils/api';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetchDataFromApi("/api/project");
                if (response.error) throw new Error(response.message);
                setProjects(response.data);
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
            <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-200">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Manage Projects</h1>
                        <p className="text-gray-500 mt-1">You have {projects.length} projects.</p>
                    </div>
                    <button
                        onClick={() => navigate("/dashboard/add-project")}
                        className="flex items-center space-x-2 btn-primary"
                    >
                        <Plus size={18} />
                        <span>Add New Project</span>
                    </button>
                </div>
                
                {/* Search and Filters */}
                <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-grow">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search projects..." className="w-full pl-11 input-field" />
                    </div>
                </div>

                {/* Projects Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-600">Title</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Created At</th>
                                <th className="p-4 text-sm font-semibold text-gray-600 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="text-center py-8">Loading...</td></tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project._id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="p-4 align-top">
                                            <p className="font-semibold text-gray-800">{project.title}</p>
                                        </td>
                                        <td className="p-4 align-top">
                                            <span className={`badge ${project.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                                {project.status || 'draft'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 align-top">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-center align-top">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button onClick={() => navigate(`/dashboard/edit-project/${project._id}`)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(project._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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