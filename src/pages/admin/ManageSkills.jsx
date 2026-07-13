import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const CATEGORIES = ['Languages', 'Frontend', 'Backend', 'Database', 'Tools', 'Data Science', 'Other'];

const emptyForm = { name: '', category: 'Languages', level: 'Intermediate', icon: '' };

const ManageSkills = () => {
  const skills = useQuery(api.skills.getAll);
  const addSkill = useMutation(api.skills.add);
  const updateSkill = useMutation(api.skills.update);
  const removeSkill = useMutation(api.skills.remove);

  const [modal, setModal] = useState(null); // 'add' | 'edit' | null
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loading = skills === undefined;

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setModal('add');
  };

  const openEdit = (skill) => {
    setForm({ name: skill.name, category: skill.category, level: skill.level || '', icon: skill.icon || '' });
    setEditId(skill._id);
    setModal('edit');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Name is required');
    setSaving(true);
    try {
      if (modal === 'add') {
        await addSkill(form);
        toast.success('Skill added!');
      } else {
        await updateSkill({ id: editId, ...form });
        toast.success('Skill updated!');
      }
      setModal(null);
    } catch (err) {
      toast.error('Failed to save skill');
    } finally {
        setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await removeSkill({ id });
      toast.success('Skill deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  // Group by category for display
  const grouped = (skills || []).reduce((acc, s) => {
    const cat = s.category || 'Other';
    acc[cat] = acc[cat] || [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Skills</h1>
          <p className="text-gray-400 mt-1">{(skills || []).length} skills in {Object.keys(grouped).length} categories</p>
        </div>
        <button onClick={openAdd} className="btn-gradient">
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(skills || []).map((skill) => (
                <tr key={skill._id}>
                  <td className="text-white font-medium">{skill.name}</td>
                  <td>
                    <span className="px-2 py-1 rounded-md text-xs text-accent-400"
                      style={{ background: 'rgba(139,92,246,0.1)',border: '1px solid rgba(139,92,246,0.2)' }}>
                      {skill.category}
                    </span>
                  </td>
                  <td className="text-gray-400 text-sm">{skill.level}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(skill)}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-5 transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(skill._id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500 hover:bg-opacity-10 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(skills || []).length === 0 && (
            <p className="text-center text-gray-500 py-12">No skills yet. Add your first skill!</p>
          )}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-white">
                {modal === 'add' ? 'Add Skill' : 'Edit Skill'}
              </h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-white">
                <X size={22} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="form-label">Skill Name *</label>
                <input className="form-input" placeholder="e.g. React.js"
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label className="form-label">Category</label>
                <select className="form-input" value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Level</label>
                <select className="form-input" value={form.level}
                  onChange={e => setForm({...form, level: e.target.value})}>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-gradient flex-1 justify-center">
                  {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Check size={16} /> Save</>}
                </button>
                <button type="button" onClick={() => setModal(null)} className="btn-outline flex-1 justify-center">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSkills;
