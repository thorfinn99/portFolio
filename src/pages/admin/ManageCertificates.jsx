import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const emptyForm = { title: '', issuer: '', issuedDate: '', credentialUrl: '', imageUrl: '' };

const ManageCertificates = () => {
  const certs = useQuery(api.certificates.getAll);
  const addCert = useMutation(api.certificates.add);
  const updateCert = useMutation(api.certificates.update);
  const removeCert = useMutation(api.certificates.remove);

  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loading = certs === undefined;

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModal('add'); };
  const openEdit = (c) => {
    setForm({ title: c.title, issuer: c.issuer, issuedDate: c.issuedDate || '', credentialUrl: c.credentialUrl || '', imageUrl: c.imageUrl || '' });
    setEditId(c._id); setModal('edit');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.issuer.trim()) return toast.error('Title and issuer required');
    setSaving(true);
    try {
      if (modal === 'add') { await addCert(form); toast.success('Certificate added!'); }
      else { await updateCert({ id: editId, ...form }); toast.success('Certificate updated!'); }
      setModal(null);
    } catch { toast.error('Failed to save'); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try { await removeCert({ id }); toast.success('Deleted'); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Certificates</h1>
          <p className="text-gray-400 mt-1">{(certs || []).length} certificates</p>
        </div>
        <button onClick={openAdd} className="btn-gradient"><Plus size={18} /> Add Certificate</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="data-table">
            <thead><tr><th>Title</th><th>Issuer</th><th>Issued Date</th><th>Actions</th></tr></thead>
            <tbody>
              {(certs || []).map(cert => (
                <tr key={cert._id}>
                  <td className="text-white font-medium">{cert.title}</td>
                  <td className="text-accent-400">{cert.issuer}</td>
                  <td className="text-gray-500 text-sm">{cert.issuedDate ? new Date(cert.issuedDate).toLocaleDateString() : '—'}</td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(cert)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-5"><Pencil size={15} /></button>
                      <button onClick={() => handleDelete(cert._id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500 hover:bg-opacity-10"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(certs || []).length === 0 && <p className="text-center text-gray-500 py-12">No certificates yet.</p>}
        </div>
      )}

      {modal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-white">{modal === 'add' ? 'Add' : 'Edit'} Certificate</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-white"><X size={22} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
               {[
                { label: 'Certificate Title *', key: 'title', placeholder: 'Introduction to IoT' },
                { label: 'Issuer *', key: 'issuer', placeholder: 'NPTEL / Coursera / Udemy' },
                { label: 'Credential URL', key: 'credentialUrl', placeholder: 'https://...' },
              ].map(f => (
                <div key={f.key}>
                   <label className="form-label">{f.label}</label>
                   <input className="form-input" placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm({...form, [f.key]: e.target.value})} />
                </div>
              ))}
              <div>
                <label className="form-label">Issued Date</label>
                <input type="date" className="form-input" value={form.issuedDate} onChange={e => setForm({...form, issuedDate: e.target.value})} />
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

export default ManageCertificates;
