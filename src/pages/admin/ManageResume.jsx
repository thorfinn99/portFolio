import { useState, useEffect } from 'react';
import { FileText, Save, ExternalLink, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import SectionState from '../../components/SectionState';

const ManageResume = () => {
  const resume = useQuery(api.resume.get);
  const updateResume = useMutation(api.resume.update);

  const [form, setForm] = useState({ url: '', fileName: 'Swaraj_Resume.pdf' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (resume) {
      setForm({ url: resume.url || '', fileName: resume.fileName || 'Swaraj_Resume.pdf' });
    }
  }, [resume]);

  const loading = resume === undefined;
  const error = resume instanceof Error ? resume : null;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.url.trim()) return toast.error('Resume URL is required');
    setSaving(true);
    try {
      await updateResume(form);
      toast.success('Resume updated!');
    } catch { toast.error('Failed to update'); } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white">Resume</h1>
        <p className="text-gray-400 mt-1">Update the downloadable resume PDF link</p>
      </div>

      {(loading || error) ? (
        <SectionState loading={loading} error={error} />
      ) : (
        <div className="max-w-2xl space-y-6">
          {/* Current resume */}
          {form.url && (
            <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(79,70,229,0.2)' }}>
                <FileText size={28} className="text-accent-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{form.fileName}</p>
                <a href={form.url} target="_blank" rel="noopener noreferrer"
                  className="text-accent-400 text-sm hover:text-accent-300 flex items-center gap-1 mt-1">
                  <ExternalLink size={12} />
                  View current resume
                </a>
              </div>
            </div>
          )}

          {/* Update form */}
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-lg font-display font-bold text-white mb-2 flex items-center gap-2">
              <Upload size={20} className="text-accent-400" />
              Update Resume
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Upload your PDF to Google Drive, set it as publicly accessible, then paste the direct link here.
              Or use any other hosting service (OneDrive, Dropbox, etc.)
            </p>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="form-label">Resume PDF URL *</label>
                <input
                  className="form-input"
                  placeholder="https://drive.google.com/file/d/your-file-id/view"
                  value={form.url}
                  onChange={e => setForm({...form, url: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">File Name (displayed to user)</label>
                <input
                  className="form-input"
                  placeholder="Swaraj_Resume.pdf"
                  value={form.fileName}
                  onChange={e => setForm({...form, fileName: e.target.value})}
                />
              </div>

              {/* Tips */}
              <div className="p-4 rounded-xl text-sm text-gray-500 space-y-1"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-gray-400 font-medium mb-2">📌 How to get a Google Drive direct link:</p>
                <p>1. Upload PDF to Google Drive</p>
                <p>2. Right-click → Share → "Anyone with the link"</p>
                <p>3. Copy the link and paste it above</p>
              </div>

              <button type="submit" disabled={saving} className="btn-gradient">
                {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save size={16} /> Update Resume</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageResume;
