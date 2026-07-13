import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Code2, FolderKanban, BookOpen,
  Award, GraduationCap, Phone, FileText, LogOut,
  ExternalLink, Menu, X, User, Layout
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, exact: true },
  { path: '/admin/hero', label: 'Hero', icon: <Layout size={18} /> },
  { path: '/admin/about', label: 'About', icon: <User size={18} /> },
  { path: '/admin/skills', label: 'Skills', icon: <Code2 size={18} /> },
  { path: '/admin/projects', label: 'Projects', icon: <FolderKanban size={18} /> },
  { path: '/admin/training', label: 'Training & Exp.', icon: <BookOpen size={18} /> },
  { path: '/admin/certificates', label: 'Certificates', icon: <Award size={18} /> },
  { path: '/admin/education', label: 'Education', icon: <GraduationCap size={18} /> },
  { path: '/admin/contact', label: 'Contact', icon: <Phone size={18} /> },
  { path: '/admin/resume', label: 'Resume', icon: <FileText size={18} /> },
  { path: '/admin/footer', label: 'Footer', icon: <Layout size={18} /> },
  { path: '/admin/settings', label: 'Settings', icon: <User size={18} /> },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white border-opacity-5">
        <span className="gradient-text text-xl font-display font-bold">Admin Panel</span>
        <p className="text-xs text-gray-600 mt-1">Portfolio Manager</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
              isActive(item)
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/20'
                : 'text-gray-400 hover:bg-white hover:bg-opacity-5 hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-white border-opacity-5 space-y-2">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-5 transition-all text-sm"
        >
          <ExternalLink size={18} />
          View Portfolio
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500 hover:bg-opacity-10 transition-all text-sm"
        >
          <LogOut size={18} />
          Logout
        </button>
        <div className="px-4 py-2 text-xs text-gray-600">
          Logged in as <span className="text-accent-400">{user?.username}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-800 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex admin-sidebar flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-dark-700 border-r border-white border-opacity-10">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 overflow-auto">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white border-opacity-5 bg-dark-700">
          <span className="gradient-text text-lg font-display font-bold">Admin Panel</span>
          <button onClick={() => setSidebarOpen(true)} className="text-white p-2">
            <Menu size={22} />
          </button>
        </div>
        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
