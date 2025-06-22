import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { fetchDataFromApi, deleteSnippet } from '../../../utils/api';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

const Snippets = () => {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const response = await fetchDataFromApi("/api/snippet");
                if (response.error) throw new Error(response.message);
                setSnippets(response);
            } catch (err) {
                console.error("Error fetching snippets:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSnippets();
    }, []);

    const handleDelete = async (snippetId) => {
        if (!window.confirm("Are you sure you want to delete this snippet?")) return;
        try {
            const response = await deleteSnippet(snippetId);
            if (response.error) throw new Error(response.message);
            setSnippets(snippets.filter((snippet) => snippet._id !== snippetId));
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
                        <h1 className="text-2xl font-bold text-gray-800">Manage Snippets</h1>
                        <p className="text-gray-500 mt-1">You have {snippets.length} snippets.</p>
                    </div>
                    <button
                        onClick={() => navigate("/add-snippet")}
                        className="flex items-center space-x-2 btn-primary"
                    >
                        <Plus size={18} />
                        <span>Add New Snippet</span>
                    </button>
                </div>
                
                {/* Search and Filters */}
                <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-grow">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search snippets..." className="w-full pl-11 input-field" />
                    </div>
                </div>

                {/* Snippets Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-600">Title</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Language</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Category</th>
                                <th className="p-4 text-sm font-semibold text-gray-600 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="text-center py-8">Loading...</td></tr>
                            ) : (
                                snippets.map((snippet) => (
                                    <tr key={snippet._id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="p-4 align-top">
                                            <p className="font-semibold text-gray-800">{snippet.title}</p>
                                        </td>
                                        <td className="p-4 align-top">
                                            <span className="badge-accent">{snippet.language || 'N/A'}</span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 align-top">
                                            {snippet.category || 'Uncategorized'}
                                        </td>
                                        <td className="p-4 text-center align-top">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button onClick={() => navigate(`/edit-snippet/${snippet._id}`)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(snippet._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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

export default Snippets; 