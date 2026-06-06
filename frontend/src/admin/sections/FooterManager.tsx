import { useState } from 'react';
import { apiClient } from '../../api';

export const FooterManager = ({ content, onUpdate }: { content: any, onUpdate: () => void }) => {
  const [links, setLinks] = useState(content?.footerLinks || {
    linkedin: { url: '', visible: true },
    github: { url: '', visible: true },
    instagram: { url: '', visible: false },
  });
  const [saving, setSaving] = useState(false);

  const handleUpdateLink = (platform: string, field: 'url' | 'visible', value: any) => {
    setLinks({
      ...links,
      [platform]: { ...links[platform], [field]: value }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.updateContent({ footerLinks: links });
      onUpdate();
      alert('Saved successfully');
    } catch (err) {
      console.error(err);
      alert('Error saving');
    } finally {
      setSaving(false);
    }
  };

  const platforms = [
    { id: 'linkedin', label: 'LinkedIn', icon: '👔' },
    { id: 'github', label: 'GitHub', icon: '💻' },
    { id: 'instagram', label: 'Instagram', icon: '📸' },
  ];

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8" style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.5)' }}>
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Footer Links</h2>
      <p className="text-zinc-400 mb-8">Manage your social media links. Hidden links will not appear on the website.</p>

      <div className="flex flex-col gap-6 mb-8">
        {platforms.map(p => (
          <div key={p.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{p.icon}</span>
              <span className="font-bold text-white">{p.label}</span>
              <div className="ml-auto flex items-center gap-3">
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Visible</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={links[p.id]?.visible || false} 
                    onChange={e => handleUpdateLink(p.id, 'visible', e.target.checked)} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2 block">{p.label} URL</label>
              <input 
                value={links[p.id]?.url || ''} 
                onChange={e => handleUpdateLink(p.id, 'url', e.target.value)} 
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400 text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSave} disabled={saving} className="w-full bg-yellow-400 text-black py-4 rounded-full font-bold uppercase tracking-widest hover:bg-yellow-300 disabled:opacity-50">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};
