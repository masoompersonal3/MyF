import { useState } from 'react';
import { apiClient } from '../../api';

export const HeroManager = ({ content, onUpdate }: { content: any, onUpdate: () => void }) => {
  const [words, setWords] = useState<string[]>(content?.heroTexts || []);
  const [newWord, setNewWord] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = () => {
    if (newWord.trim() && !words.includes(newWord.trim())) {
      setWords([...words, newWord.trim()]);
      setNewWord('');
    }
  };

  const handleRemove = (wordToRemove: string) => {
    if (words.length > 1) {
      setWords(words.filter(w => w !== wordToRemove));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.updateContent({ heroTexts: words });
      onUpdate();
    } catch (err) {
      console.error('Failed to save', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8" style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.5)' }}>
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Hero Section</h2>
      <p className="text-zinc-400 mb-8">Manage the rotating text words in the top hero section. You must have at least one word.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input 
          type="text" 
          value={newWord} 
          onChange={(e) => setNewWord(e.target.value)} 
          placeholder="e.g. Creator" 
          className="flex-1 bg-zinc-950 border border-zinc-700 rounded-full px-6 py-3 outline-none focus:border-yellow-400"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button onClick={handleAdd} className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-yellow-300 whitespace-nowrap">Add</button>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {words.map((word, idx) => (
          <div key={idx} className="bg-zinc-800 border border-zinc-700 px-6 py-3 rounded-full flex items-center gap-4">
            <span className="font-medium">{word}</span>
            <button 
              onClick={() => handleRemove(word)}
              disabled={words.length === 1}
              className={`text-zinc-400 hover:text-red-400 ${words.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={words.length === 1 ? 'At least one required' : 'Remove'}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleSave} disabled={saving} className="w-full bg-yellow-400 text-black py-4 rounded-full font-bold uppercase tracking-widest hover:bg-yellow-300 disabled:opacity-50">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};
