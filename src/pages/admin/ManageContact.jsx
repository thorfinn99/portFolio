import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const ManageContact = () => {
  const contactInfo = useQuery(api.contact.get);
  const updateContact = useMutation(api.contact.upsert);

  const [form, setForm] = useState({
    email: '', phone: '', location: '', linkedin: '', github: '', twitter: '', website: '', bio: ''
  });
  const [saving, setSaving] = useState(false);

  // Sync form when data loads
  useEffect(() => {
    if (contactInfo) {
      setForm({
        email: contactInfo.email || '', phone: contactInfo.phone || '', location: contactInfo.location || '',
        linkedin: contactInfo.linkedin || '', github: contactInfo.github || '', twitter: contactInfo.twitter || '',
        website: contactInfo.website || '', bio: contactInfo.bio || ''
      });
    }
  }, [contactInfo]);

  const loading = contactInfo === undefined;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.email.trim()) return toast.error('Email is required');
    setSaving(true);
    try {
      await updateContact(form);
      toast.success('Contact information updated!');
    } catch { toast.error('Failed to update'); } finally { setSaving(false); }
  };

  const fields = [
    { label: 'Email *', key: 'email', placeholder: 'swarajvecha@gmail.com', type: 'email' },
    { label: 'Phone', key: 'phone', placeholder: '+91 98765 43210', type: 'tel' },
    { label: 'Location', key: 'location', placeholder: 'India', type: 'text' },
    { label: 'LinkedIn URL', key: 'linkedin', placeholder: 'https://linkedin.com/in/...' },
    { label: 'GitHub URL', key: 'github', placeholder: 'https://github.com/...' },
    { label: 'Twitter/X URL', key: 'twitter', placeholder: 'https://twitter.com/...' },
    { label: 'Portfolio/Website URL', key: 'website', placeholder: 'https://yoursite.com' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white">Contact Information</h1>
        <p className="text-gray-400 mt-1">Update your public contact details and social links</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="glass-card rounded-2xl p-8 max-w-2xl">
          <form onSubmit={handleSave} className="space-y-5">
            {fields.map(f => (
              <div key={f.key}>
                <label className="form-label">{f.label}</label>
                <input
                  className="form-input"
                  type={f.type || 'url'}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm({...form, [f.key]: e.target.value})}
                />
              </div>
            ))}
            <div>
              <label className="form-label">Bio / CTA Text</label>
              <textarea
                className="form-input resize-none"
                rows={3}
                placeholder="Open to new opportunities and collaborations!"
                value={form.bio}
                onChange={e => setForm({...form, bio: e.target.value})}
              />
            </div>
            <button type="submit" disabled={saving} className="btn-gradient">
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save size={16} /> Save Changes</>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageContact;
