import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const TYPES = ['Training', 'Experience'];
const emptyForm = { title: '', organization: '', description: '', startDate: '', endDate: '', type: 'Training', order: 1 };

const ManageTraining = () => {
  const items = useQuery(api.training.getAll);
  const addItem = useMutation(api.training.add);
  const updateItem = useMutation(api.training.update);
  const removeItem = useMutation(api.training.remove);

  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loading = items === undefined;

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModal('add'); };
  const openEdit = (item) => {
    setForm({ title: item.title, organization: item.organization, description: item.description || '',
      startDate: item.startDate || '', endDate: item.endDate || '', type: item.type, order: item.order || 1 });
    setEditId(item._id); setModal('edit');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.organization.trim()) return toast.error('Title and organization required');
    setSaving(true);
    try {
      const payload = { ...form, order: parseInt(form.order) || 1 };
      if (modal === 'add') { await addItem(payload); toast.success('Entry added!'); }
      else { await updateItem({ id: editId, ...payload }); toast.success('Entry updated!'); }
      setModal(null);
    } catch { toast.error('Failed to save'); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try { await removeItem({ id }); toast.success('Deleted');  }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Training & Experience</h1>
          <p className="text-gray-400 mt-1">{(items || []).length} entries</p>
        </div>
        <button onClick={openAdd} className="btn-gradient"><Plus size={18} /> Add Entry</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="data-table">
            <thead><tr><th>Title</th><th>Organization</th><th>Type</th><th>Duration</th><th>Actions</th></tr></thead>
            <tbody>
              {(items || []).map(item => (
                <tr key={item._id}>
                  <td className="text-white font-medium">{item.title}</td>
                  <td className="text-gray-300">{item.organization}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${item.type === 'Experience' ? 'text-green-400 bg-green-500 bg-opacity-10' : 'text-blue-400 bg-blue-500 bg-opacity-10'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="text-gray-500 text-xs">{item.startDate} — {item.endDate || 'Present'}</td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-5"><Pencil size={15} /></button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500 hover:bg-opacity-10"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(items || []).length === 0 && <p className="text-center text-gray-500 py-12">No entries yet.</p>}
        </div>
      )}

      {modal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-display font-bold text-white">{modal === 'add' ? 'Add' : 'Edit'} Entry</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-white"><X size={22} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="form-label">Title *</label>
                <input className="form-input" placeholder="DSA Training" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              </div>
              <div>
                <label className="form-label">Organization *</label>
                <input className="form-input" placeholder="Programming Pathshala" value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} />
              </div>
              <div>
                <label className="form-label">Type</label>
                <select className="form-input" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Start Date</label>
                  <input type="date" className="form-input" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} />
                </div>
                <div>
                  <label className="form-label">End Date</label>
                  <input type="date" className="form-input" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea className="form-input resize-none" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
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

export default ManageTraining;
