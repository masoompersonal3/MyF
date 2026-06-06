import { useState } from 'react';
import { apiClient } from '../../api';

export const AboutManager = ({ content, onUpdate }: { content: any, onUpdate: () => void }) => {
  const [text, setText] = useState(content?.aboutContent || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.updateContent({ aboutContent: text });
      onUpdate();
    } catch (err) {
      console.error('Failed to save', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8" style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.5)' }}>
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">About Me</h2>
      <p className="text-zinc-400 mb-8">Edit the main typewriter text. You can use newline characters for paragraphs.</p>

      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        className="w-full h-96 bg-zinc-950 border border-zinc-700 rounded-2xl p-6 outline-none focus:border-yellow-400 font-mono text-sm resize-y mb-4 text-zinc-300"
        placeholder="Enter your about me text here..."
      />

      <div className="flex justify-between items-center mb-8">
        <span className="text-zinc-500 text-sm">{text.length} characters</span>
      </div>

      <button onClick={handleSave} disabled={saving} className="w-full bg-yellow-400 text-black py-4 rounded-full font-bold uppercase tracking-widest hover:bg-yellow-300 disabled:opacity-50">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};
