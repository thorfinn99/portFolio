import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Save, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageFooter = () => {
  const footerData = useQuery(api.footer.get);
  const updateFooter = useMutation(api.footer.update);
  
  const [formData, setFormData] = useState({
    brandName: '',
    subtitle: '',
    linkedin: '',
    github: '',
    email: '',
    location: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (footerData) {
      setFormData({
        brandName: footerData.brandName || '',
        subtitle: footerData.subtitle || '',
        linkedin: footerData.linkedin || '',
        github: footerData.github || '',
        email: footerData.email || '',
        location: footerData.location || '',
      });
    }
  }, [footerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (!formData.brandName) {
        toast.error("Brand name is required!");
        return;
      }
      
      await updateFooter({
        brandName: formData.brandName,
        subtitle: formData.subtitle || undefined,
        linkedin: formData.linkedin || undefined,
        github: formData.github || undefined,
        email: formData.email || undefined,
        location: formData.location || undefined,
      });
      
      toast.success('Footer updated successfully!');
    } catch (error) {
      console.error('Error updating footer:', error);
      toast.error('Failed to update footer');
    } finally {
      setIsSaving(false);
    }
  };

  if (footerData === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Manage Footer</h1>
      </div>

      <div className="bg-[#111118] border border-white/5 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Brand Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                required
                placeholder="e.g. Swaraj Vecha"
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="e.g. Full-Stack Developer & AI Enthusiast"
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">LinkedIn URL</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">GitHub URL</label>
              <input
                type="text"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address (for Mail Icon)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Location (for Copyright text)</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. India"
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageFooter;
