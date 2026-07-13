import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const emptyForm = { degree: '', institution: '', location: '', startYear: '', endYear: '', grade: '', description: '' };

const ManageEducation = () => {
  const education = useQuery(api.education.getAll);
  const addEducation = useMutation(api.education.add);
  const updateEducation = useMutation(api.education.update);
  const removeEducation = useMutation(api.education.remove);

  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loading = education === undefined;

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModal('add'); };
  const openEdit = (e) => {
    setForm({ degree: e.degree, institution: e.institution, location: e.location || '',
      startYear: e.startYear, endYear: e.endYear, grade: e.grade || '', description: e.description || '' });
    setEditId(e._id); setModal('edit');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.degree.trim() || !form.institution.trim()) return toast.error('Degree and institution required');
    setSaving(true);
    try {
      if (modal === 'add') { await addEducation(form); toast.success('Education added!'); }
      else { await updateEducation({ id: editId, ...form }); toast.success('Education updated!'); }
      setModal(null);
    } catch { toast.error('Failed to save'); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    try { await removeEducation({ id }); toast.success('Deleted'); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Education</h1>
          <p className="text-gray-400 mt-1">{(education || []).length} entries</p>
        </div>
        <button onClick={openAdd} className="btn-gradient"><Plus size={18} /> Add Education</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="data-table">
            <thead><tr><th>Degree</th><th>Institution</th><th>Years</th><th>Grade</th><th>Actions</th></tr></thead>
            <tbody>
              {(education || []).map(edu => (
                <tr key={edu._id}>
                  <td className="text-white font-medium">{edu.degree}</td>
                  <td className="text-accent-400">{edu.institution}</td>
                  <td className="text-gray-500 text-sm">{edu.startYear} — {edu.endYear}</td>
                  <td className="text-green-400 text-sm">{edu.grade || '—'}</td>
                  <td>
                    <div className="flex gap-2">
                       <button onClick={() => openEdit(edu)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-5"><Pencil size={15} /></button>
                       <button onClick={() => handleDelete(edu._id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500 hover:bg-opacity-10"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(education || []).length === 0 && <p className="text-center text-gray-500 py-12">No education entries yet.</p>}
        </div>
      )}

      {modal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-white">{modal === 'add' ? 'Add' : 'Edit'} Education</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-white"><X size={22} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              {[
                { label: 'Degree *', key: 'degree', placeholder: 'B.Tech – Computer Science' },
                { label: 'Institution *', key: 'institution', placeholder: 'Lovely Professional University' },
                { label: 'Location', key: 'location', placeholder: 'Punjab, India' },
                { label: 'Grade / CGPA', key: 'grade', placeholder: '8.5 CGPA' },
              ].map(f => (
                <div key={f.key}>
                   <label className="form-label">{f.label}</label>
                   <input className="form-input" placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm({...form, [f.key]: e.target.value})} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                   <label className="form-label">Start Year</label>
                   <input className="form-input" placeholder="2022" value={form.startYear} onChange={e => setForm({...form, startYear: e.target.value})} />
                </div>
                <div>
                   <label className="form-label">End Year</label>
                   <input className="form-input" placeholder="Present" value={form.endYear} onChange={e => setForm({...form, endYear: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea className="form-input resize-none" rows={2} value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})} />
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

export default ManageEducation;
