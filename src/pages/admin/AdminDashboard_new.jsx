import { Settings, Users, FileText } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminDashboard = () => {
  const { data } = useData();

  const stats = [
    { label: 'Skills', value: (data.skills || []).length, icon: <FileText size={20} /> },
    { label: 'Projects', value: (data.projects || []).length, icon: <FileText size={20} /> },
    { label: 'Education', value: (data.education || []).length, icon: <FileText size={20} /> },
    { label: 'Certificates', value: (data.certificates || []).length, icon: <FileText size={20} /> },
  ];

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
              </div>
              <div className="text-accent-400 opacity-50">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-2xl font-display font-bold text-white mb-6">Welcome to Admin Panel</h2>
        <div className="space-y-4 text-gray-400">
          <p>✅ All your portfolio data is stored locally in your browser using localStorage</p>
          <p>✅ Changes are saved automatically whenever you make edits</p>
          <p>✅ Visit the sections on the left to edit your portfolio content</p>
          <p className="text-yellow-400 text-sm">💡 Tip: Use your browser's developer tools to export/backup your data from localStorage</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
