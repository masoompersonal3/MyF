import { useState, useEffect } from 'react';
import { apiClient } from '../../api';
import { ConfirmModal } from '../components/ConfirmModal';

export const MessagesManager = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const data = await apiClient.getMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleToggleRead = async (id: string) => {
    await apiClient.markRead(id);
    fetchMessages();
  };

  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });

  const confirmDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const executeDelete = async () => {
    if (deleteConfirm.id) {
      await apiClient.deleteMessage(deleteConfirm.id);
      fetchMessages();
    }
    setDeleteConfirm({ isOpen: false, id: null });
  };

  const filtered = messages.filter(m => {
    if (filter === 'unread') return !m.read;
    if (filter === 'read') return m.read;
    return true;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8" style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.5)' }}>
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Contact Messages</h2>
      
      <div className="flex gap-4 mb-8">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full font-bold text-sm ${filter === 'all' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>All</button>
        <button onClick={() => setFilter('unread')} className={`px-4 py-2 rounded-full font-bold text-sm ${filter === 'unread' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>Unread</button>
        <button onClick={() => setFilter('read')} className={`px-4 py-2 rounded-full font-bold text-sm ${filter === 'read' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>Read</button>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.length === 0 ? <p className="text-zinc-500 italic">No messages found.</p> : filtered.map(m => (
          <div key={m._id} className={`border rounded-2xl p-6 transition-all ${m.read ? 'bg-zinc-950/50 border-zinc-800/50 opacity-70' : 'bg-zinc-900 border-yellow-400/30'}`}>
            <div className="flex justify-between items-start mb-4 cursor-pointer" onClick={() => setExpandedId(expandedId === m._id ? null : m._id)}>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  {!m.read && <span className="w-2 h-2 rounded-full bg-yellow-400"></span>}
                  {m.name}
                </h3>
                <a href={`mailto:${m.email}`} className="text-yellow-400/80 text-sm hover:underline">{m.email}</a>
                <p className="text-zinc-500 text-xs mt-1">{new Date(m.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={(e) => { e.stopPropagation(); handleToggleRead(m._id); }} className="text-zinc-400 hover:text-white font-bold text-sm">
                  {m.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button onClick={(e) => { e.stopPropagation(); confirmDelete(m._id); }} className="text-red-400 hover:text-red-300 font-bold text-sm">Delete</button>
              </div>
            </div>
            {(expandedId === m._id || !m.read) && (
              <div className="mt-4 pt-4 border-t border-zinc-800 text-zinc-300 whitespace-pre-wrap">
                {m.message}
              </div>
            )}
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Message"
        message="Are you sure you want to delete this message permanently? This action cannot be undone."
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, id: null })}
      />
    </div>
  );
};
