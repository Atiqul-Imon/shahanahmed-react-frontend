import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context.jsx";

import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardOverview from "./pages/Dashboard/index.jsx";
import DashboardProjects from "./pages/Dashboard/Projects.jsx";
import DashboardSnippets from "./pages/Dashboard/Snippets.jsx";
import SnippetList from "./pages/Snippet/SnippetList.jsx";
import AddSnippet from "./pages/Snippet/addSnippet.jsx";
import EditSnippet from "./pages/Snippet/editSnippet.jsx";
import AddProject from "./pages/AddProject/index.jsx";
import ProjectPage from "./pages/Project/index.jsx";
import ProjectDetailsPage from "./pages/ProjectDetails/index.jsx";
import EditProject from "./pages/ProjectDetails/EditProject.jsx";
import Contact from "./pages/Contact/index.jsx";


const ProtectedRoute = ({ children }) => {
  const { isLogin, isLoading } = useContext(MyContext);

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  return isLogin ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardOverview /></ProtectedRoute>} />
          <Route path="/dashboard/projects" element={<ProtectedRoute><DashboardProjects /></ProtectedRoute>} />
          <Route path="/dashboard/snippets" element={<ProtectedRoute><DashboardSnippets /></ProtectedRoute>} />
          
          <Route path="/dashboard/add-project" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
          <Route path="/add-snippet" element={<ProtectedRoute><AddSnippet /></ProtectedRoute>} />

          <Route path="/dashboard/edit-project/:id" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
          <Route path="/edit-snippet/:id" element={<ProtectedRoute><EditSnippet /></ProtectedRoute>} />

          {/* This route seems to be unused in the new dashboard, keeping it for now */}
          <Route path="/allsnippet" element={<ProtectedRoute><SnippetList /></ProtectedRoute>} />
          
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
