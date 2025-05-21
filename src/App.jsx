import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context.jsx";

import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from "./pages/HomePage";
import BlogPage from "./pages/Blog";
import BlogDetailsPage from "./pages/BlogDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/index.jsx"; 
import AddBlog from "./pages/AddBlog/index.jsx";
import SnippetList from "./pages/Snippet/SnippetList.jsx";
import AddSnippet from "./pages/Snippet/addSnippet.jsx";
import EditSnippet from "./pages/Snippet/editSnippet.jsx";


const ProtectedRoute = ({ children }) => {
  const { isLogin, isLoading } = useContext(MyContext);

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  return isLogin ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route */}
        <Route path="/dashboard/:userId" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/add-blog" element={
          <ProtectedRoute>
            <AddBlog />
          </ProtectedRoute>
        } />

<Route path="/allsnippet" element={
          <ProtectedRoute>
            <SnippetList />
          </ProtectedRoute>
        } />

<Route path="/add-snippet" element={
          <ProtectedRoute>
            <AddSnippet />
          </ProtectedRoute>
        } />

        <Route path="/edit-snippet/:id" element={
  <ProtectedRoute>
    <EditSnippet />
  </ProtectedRoute>
} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
