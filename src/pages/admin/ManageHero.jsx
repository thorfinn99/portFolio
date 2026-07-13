import { useState, useEffect } from 'react';
import { Save, Plus, X, Layout } from 'lucide-react';
import toast from 'react-hot-toast';
import { useData } from '../../context/DataContext';

const ManageHero = () => {
  const { data, updateHero } = useData();

  const [form, setForm] = useState({
    firstName: '', lastName: '', badgeText: '',
    typingStrings: [], description: '',
    linkedin: '', github: '', email: '',
  });
  const [saving, setSaving] = useState(false);
  const [newTyping, setNewTyping] = useState('');

  useEffect(() => {
    if (data.hero) {
      setForm({
        firstName: data.hero.firstName || '',
        lastName: data.hero.lastName || '',
        badgeText: data.hero.badgeText || '',
        typingStrings: data.hero.typingStrings || [],
        description: data.hero.description || '',
        linkedin: data.hero.linkedin || '',
        github: data.hero.github || '',
        email: data.hero.email || '',
      });
    }
  }, [data.hero]);

  const addTypingString = () => {
    const val = newTyping.trim();
    if (!val) return;
    setForm(f => ({ ...f, typingStrings: [...f.typingStrings, val] }));
    setNewTyping('');
  };

  const removeTypingString = (idx) => {
    setForm(f => ({ ...f, typingStrings: f.typingStrings.filter((_, i) => i !== idx) }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim()) return toast.error('First name is required');
    if (form.typingStrings.length === 0) return toast.error('Add at least one typing string');
    setSaving(true);
    try {
      updateHero({
        firstName: form.firstName,
        lastName: form.lastName,
        badgeText: form.badgeText,
        typingStrings: form.typingStrings,
        description: form.description,
        linkedin: form.linkedin,
        github: form.github,
        email: form.email
      });
      toast.success('Hero section updated!');
    } catch {
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white">Hero Section</h1>
        <p className="text-gray-400 mt-1">Edit the main landing page content</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">

        {/* Name */}
        <div className="glass-card rounded-2xl p-6 space-y-5">
          <h2 className="text-lg font-display font-semibold text-white flex items-center gap-2">
            <Layout size={18} className="text-accent-400" /> Name & Badge
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">First Name *</label>
              <input className="form-input" type="text" placeholder="Vecha Laxmi"
                value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
              <p className="text-xs text-gray-500 mt-1">Shown in white</p>
            </div>
            <div>
              <label className="form-label">Last Name *</label>
              <input className="form-input" type="text" placeholder="Swaraj Babu"
                value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
              <p className="text-xs text-gray-500 mt-1">Shown in gradient purple</p>
            </div>
          </div>

          <div>
            <label className="form-label">Badge Text</label>
            <input className="form-input" type="text" placeholder="Available for opportunities"
              value={form.badgeText} onChange={e => setForm({ ...form, badgeText: e.target.value })} />
            <p className="text-xs text-gray-500 mt-1">The pill shown at the top of the hero</p>
          </div>
        </div>

        {/* Typing Strings */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-display font-semibold text-white mb-4">Typing Animation Strings</h2>
          <p className="text-xs text-gray-500 mb-4">These cycle through the "I am a ___" typing animation.</p>

          {/* Existing tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {form.typingStrings.map((s, i) => (
              <span key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-white font-medium"
                style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.35), rgba(139,92,246,0.35))', border: '1px solid rgba(139,92,246,0.3)' }}
              >
                {s}
                <button type="button" onClick={() => removeTypingString(i)}
                  className="text-gray-400 hover:text-red-400 transition-colors">
                  <X size={13} />
                </button>
              </span>
            ))}
            {form.typingStrings.length === 0 && (
              <p className="text-gray-500 text-sm italic">No strings yet — add at least one below.</p>
            )}
          </div>

          {/* Add new */}
          <div className="flex gap-2">
            <input
              className="form-input flex-1"
              type="text"
              placeholder="e.g. Full-Stack Developer"
              value={newTyping}
              onChange={e => setNewTyping(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTypingString(); } }}
            />
            <button type="button" onClick={addTypingString}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all"
              style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.4), rgba(139,92,246,0.4))', border: '1px solid rgba(139,92,246,0.3)' }}>
              <Plus size={16} /> Add
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-display font-semibold text-white mb-4">Description</h2>
          <textarea className="form-input resize-none" rows={4}
            placeholder="Computer Science Engineering student…"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Social Links */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-display font-semibold text-white mb-1">Social Links</h2>

          {[
            { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...' },
            { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/...' },
            { key: 'email', label: 'Email Address', placeholder: 'you@example.com', type: 'email' },
          ].map(f => (
            <div key={f.key}>
              <label className="form-label">{f.label}</label>
              <input className="form-input" type={f.type || 'url'} placeholder={f.placeholder}
                value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
            </div>
          ))}
        </div>

        {/* Save */}
        <button type="submit" disabled={saving} className="btn-gradient">
          {saving ? (
             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
             <><Save size={16} /> Save Changes</>
          )}
        </button>
      </form>
    </div>
  );
};

export default ManageHero;
