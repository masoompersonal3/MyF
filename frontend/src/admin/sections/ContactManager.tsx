import { useState } from 'react';
import { apiClient } from '../../api';

export const ContactManager = ({ content, onUpdate }: { content: any, onUpdate: () => void }) => {
  const [heading, setHeading] = useState(content?.contactHeading || '');
  const [subtitle, setSubtitle] = useState(content?.contactSubtitle || '');
  const [email, setEmail] = useState(content?.contactEmail || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.updateContent({ contactHeading: heading, contactSubtitle: subtitle, contactEmail: email });
      onUpdate();
      alert('Saved successfully');
    } catch (err) {
      console.error(err);
      alert('Error saving');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8" style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.5)' }}>
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Contact Section</h2>
      <p className="text-zinc-400 mb-8">Edit the text displayed in the contact section above the footer.</p>

      <div className="flex flex-col gap-6 mb-8">
        <div>
          <label className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2 block">Heading</label>
          <input 
            value={heading} 
            onChange={e => setHeading(e.target.value)} 
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>
        <div>
          <label className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2 block">Subtitle</label>
          <textarea 
            value={subtitle} 
            onChange={e => setSubtitle(e.target.value)} 
            className="w-full h-32 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400 resize-y"
          />
        </div>
        <div>
          <label className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2 block">Contact Email</label>
          <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      <button onClick={handleSave} disabled={saving} className="w-full bg-yellow-400 text-black py-4 rounded-full font-bold uppercase tracking-widest hover:bg-yellow-300 disabled:opacity-50">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};
