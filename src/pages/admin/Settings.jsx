import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, Save, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, updateCredentials, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newUsername: user?.username || '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }

    const { currentPassword, newUsername, newPassword } = formData;
    const result = await updateCredentials(currentPassword, newUsername, newPassword);

    if (result.success) {
      toast.success('Credentials updated successfully!');
      setFormData({
        currentPassword: '',
        newUsername: newUsername,
        newPassword: '',
        confirmPassword: '',
      });
    } else {
      toast.error(result.message || 'Failed to update credentials');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text">Admin Settings</h1>
          <p className="text-gray-400 mt-2">Manage your admin account credentials</p>
        </div>
        <Shield size={32} className="text-primary-500 opacity-50" />
      </div>

      <form onSubmit={handleSubmit} className="bg-dark-700 p-6 rounded-2xl border border-white border-opacity-5 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Update Credentials</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border border-white border-opacity-10 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Enter current password to verify"
                />
                <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>

            <div className="border-t border-white border-opacity-5 pt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">New Username</label>
              <div className="relative">
                <input
                  type="text"
                  name="newUsername"
                  value={formData.newUsername}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border border-white border-opacity-10 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="admin"
                />
                <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border border-white border-opacity-10 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Enter new password"
                />
                <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border border-white border-opacity-10 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Confirm new password"
                />
                <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white border-opacity-5">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white rounded-xl font-medium transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            {isLoading ? 'Saving...' : 'Update Credentials'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
