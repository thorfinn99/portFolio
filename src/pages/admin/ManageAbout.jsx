import { useState, useEffect, useRef } from 'react';
import { Save, Upload, User, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const ManageAbout = () => {
  const aboutInfo = useQuery(api.about.get);
  const updateAbout = useMutation(api.about.update);
  const updatePhoto = useMutation(api.about.updatePhoto);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const [form, setForm] = useState({
    brandName: '', heading: '', bio1: '', bio2: '',
    location: '', degree: '', focus: '', passion: '', photoUrl: '', photoStorageId: undefined
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    if (aboutInfo) {
      setForm({
        brandName: aboutInfo.brandName || '',
        heading: aboutInfo.heading || '',
        bio1: aboutInfo.bio1 || '',
        bio2: aboutInfo.bio2 || '',
        location: aboutInfo.location || '',
        degree: aboutInfo.degree || '',
        focus: aboutInfo.focus || '',
        passion: aboutInfo.passion || '',
        photoUrl: aboutInfo.photoUrl || '',
        photoStorageId: aboutInfo.photoStorageId,
      });
    }
  }, [aboutInfo]);

  const loading = aboutInfo === undefined;

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      return toast.error('Photo must be less than 2MB');
    }
    setUploading(true);
    
    try {
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();

      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
         headers: { "Content-Type": file.type },
         body: file,
      });

      if (!result.ok) throw new Error("Upload failed");

      // Step 3: Get the storage ID from the response
      const { storageId } = await result.json();

      // Step 4: Save the storage ID to the About document
      await updatePhoto({ photoStorageId: storageId, photoUrl: '' });
      
      // Update local preview immediately (use an object URL since the file is local)
      setForm(f => ({ ...f, photoUrl: URL.createObjectURL(file) }));
      toast.success('Photo uploaded securely!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload photo securely');
    } finally {
      setUploading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = async () => {
    setUploading(true);
    try {
      // Clear both the legacy URL and the new storage ID
      await updatePhoto({ photoUrl: '', photoStorageId: undefined });
      setForm(f => ({ ...f, photoUrl: '' }));
      toast.success('Photo removed');
    } catch {
      toast.error('Failed to remove photo');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.heading.trim()) return toast.error('Heading is required');
    setSaving(true);
    try {
      const payload = {
        brandName: form.brandName,
        heading: form.heading,
        bio1: form.bio1,
        bio2: form.bio2,
        location: form.location,
        degree: form.degree,
        focus: form.focus,
        passion: form.passion,
        photoUrl: form.photoUrl
      };
      
      if (form.photoStorageId) {
        payload.photoStorageId = form.photoStorageId;
      } else {
        payload.clearStorageId = true;
      }
      
      await updateAbout(payload);
      toast.success('About section updated!');
    } catch {
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white">About Section</h1>
        <p className="text-gray-400 mt-1">Edit your profile photo and about content</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">

        {/* Profile Photo Upload */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-display font-semibold text-white mb-4 flex items-center gap-2">
            <User size={18} className="text-accent-400" /> Profile Photo
          </h2>

          <div className="flex items-start gap-6">
            {/* Preview */}
            <div
              className="w-28 h-28 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.3), rgba(139,92,246,0.3))' }}
            >
              {form.photoUrl ? (
                <img src={form.photoUrl} alt="Profile preview" className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none'; }} />
              ) : (
                <span className="text-4xl">👨‍💻</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex-1 space-y-3">
              {/* URL input */}
              <div>
                <label className="form-label">Photo URL</label>
                <div className="flex gap-2">
                  <input
                    className="form-input flex-1"
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                    value={form.photoUrl}
                    onChange={e => setForm({ ...form, photoUrl: e.target.value, photoStorageId: undefined })}
                  />
                  {form.photoUrl && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      disabled={uploading}
                      title="Clear photo"
                      className="px-3 py-2 rounded-xl text-red-400 hover:bg-red-500 hover:bg-opacity-10 transition-all"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Paste any public image URL — preview updates instantly</p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 text-xs text-gray-600">
                 <div className="flex-1 h-px bg-white bg-opacity-10" />
                 OR upload from device
                 <div className="flex-1 h-px bg-white bg-opacity-10" />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all w-max whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.4), rgba(139,92,246,0.4))', border: '1px solid rgba(139,92,246,0.3)' }}
                >
                  {uploading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload size={16} />
                  )}
                  {uploading ? 'Uploading…' : 'Upload Photo'}
                </button>
                <p className="text-xs text-gray-500">Max 2MB · JPG, PNG, WebP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="glass-card rounded-2xl p-6 space-y-5">
           <h2 className="text-lg font-display font-semibold text-white mb-1">Content</h2>

          <div>
             <label className="form-label">Navbar Brand Name</label>
             <input
              className="form-input"
              type="text"
              placeholder="e.g. Swaraj Vecha"
              value={form.brandName}
              onChange={e => setForm({ ...form, brandName: e.target.value })}
            />
          </div>

          <div>
             <label className="form-label">Section Heading *</label>
             <input
              className="form-input"
              type="text"
              placeholder="Passionate about Data & Code"
              value={form.heading}
              onChange={e => setForm({ ...form, heading: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">Tip: Write "Passionate about X" — the part after "about" appears highlighted.</p>
          </div>

          <div>
             <label className="form-label">Bio Paragraph 1</label>
             <textarea
              className="form-input resize-none"
              rows={4}
              placeholder="I am a Computer Science Engineering student…"
              value={form.bio1}
              onChange={e => setForm({ ...form, bio1: e.target.value })}
            />
          </div>

          <div>
            <label className="form-label">Bio Paragraph 2</label>
            <textarea
              className="form-input resize-none"
              rows={3}
              placeholder="I focus on problem-solving…"
              value={form.bio2}
              onChange={e => setForm({ ...form, bio2: e.target.value })}
            />
          </div>
        </div>

        {/* Info Cards */}
        <div className="glass-card rounded-2xl p-6">
           <h2 className="text-lg font-display font-semibold text-white mb-4">Quick Info Cards</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'location', label: 'Location', placeholder: 'India' },
              { key: 'degree', label: 'Degree', placeholder: 'B.Tech CSE' },
              { key: 'focus', label: 'Focus', placeholder: 'Full-Stack & AI' },
              { key: 'passion', label: 'Passion', placeholder: 'Problem Solving' },
            ].map(f => (
               <div key={f.key}>
                 <label className="form-label">{f.label}</label>
                 <input
                  className="form-input"
                  type="text"
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                />
              </div>
            ))}
          </div>
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

export default ManageAbout;
