import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const emptyForm = {
  title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '', featured: false, order: 1
};

const ManageProjects = () => {
  const projects = useQuery(api.projects.getAll);
  const addProject = useMutation(api.projects.add);
  const updateProject = useMutation(api.projects.update);
  const removeProject = useMutation(api.projects.remove);

  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loading = projects === undefined;

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModal('add'); };
  const openEdit = (p) => {
    setForm({
      title: p.title, description: p.description || '', technologies: (p.technologies || []).join(', '),
      githubUrl: p.githubUrl || '', liveUrl: p.liveUrl || '', imageUrl: p.imageUrl || '',
      featured: p.featured || false, order: p.order || 1
    });
    setEditId(p._id);
    setModal('edit');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Title is required');
    setSaving(true);
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
      order: parseInt(form.order) || 1
    };
    try {
      if (modal === 'add') { await addProject(payload); toast.success('Project added!'); }
      else { await updateProject({ id: editId, ...payload }); toast.success('Project updated!'); }
      setModal(null);
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try { await removeProject({ id }); toast.success('Project deleted'); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">{(projects || []).length} projects</p>
        </div>
        <button onClick={openAdd} className="btn-gradient"><Plus size={18} /> Add Project</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="data-table">
            <thead><tr><th>Title</th><th>Technologies</th><th>Featured</th><th>Actions</th></tr></thead>
            <tbody>
              {(projects || []).map(p => (
                <tr key={p._id}>
                  <td className="text-white font-medium">{p.title}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {(p.technologies || []).slice(0,3).map(t => (
                        <span key={t} className="px-2 py-0.5 rounded text-xs"
                          style={{ background: 'rgba(79,70,229,0.1)', color: '#a78bfa', border: '1px solid rgba(79,70,229,0.2)' }}>
                          {t}
                        </span>
                      ))}
                      {(p.technologies || []).length > 3 && (
                        <span className="text-gray-500 text-xs">+{p.technologies.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td>{p.featured && <Star size={16} className="text-yellow-400" />}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-5 transition-colors"><Pencil size={15} /></button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500 hover:bg-opacity-10 transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(projects || []).length === 0 && <p className="text-center text-gray-500 py-12">No projects yet.</p>}
        </div>
      )}

      {modal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-white">{modal === 'add' ? 'Add' : 'Edit'} Project</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-white"><X size={22} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              {[
                { label: 'Project Title *', key: 'title', placeholder: 'AI Mock Interview Platform' },
                { label: 'GitHub URL', key: 'githubUrl', placeholder: 'https://github.com/...' },
                { label: 'Live URL', key: 'liveUrl', placeholder: 'https://...' },
                { label: 'Image URL', key: 'imageUrl', placeholder: 'https://image.png' },
              ].map(f => (
                <div key={f.key}>
                  <label className="form-label">{f.label}</label>
                  <input className="form-input" placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm({...form, [f.key]: e.target.value})} />
                </div>
              ))}
              <div>
                <label className="form-label">Technologies (comma separated)</label>
                <input className="form-input" placeholder="React.js, Node.js, MongoDB"
                  value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})} />
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea className="form-input resize-none" rows={3} placeholder="Project description..."
                  value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" className="w-4 h-4 accent-violet-500"
                  checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} />
                <label htmlFor="featured" className="text-sm text-gray-300">Featured project</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-gradient flex-1 justify-center">
                  {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Check size={16} /> Save</>}
                </button>
                <button type="button" onClick={() => setModal(null)} className="btn-outline flex-1 justify-center">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
