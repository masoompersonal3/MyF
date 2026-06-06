import { useState, useEffect } from 'react';
import { apiClient } from '../../api';
import { ConfirmModal } from '../components/ConfirmModal';

export const EducationManager = ({ content, onUpdate }: { content: any, onUpdate: () => void }) => {
  const [education, setEducation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(content?.timelineTitle || '');
  const [subtitle, setSubtitle] = useState(content?.timelineSubtitle || '');
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ degree: '', institution: '', year: '', percentage: '', status: 'Completed', visible: true, order: 0 });

  const fetchEducation = async () => {
    try {
      const data = await apiClient.getAllEducation();
      setEducation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEducation(); }, []);

  const handleSaveHeaders = async () => {
    await apiClient.updateContent({ timelineTitle: title, timelineSubtitle: subtitle });
    onUpdate();
    alert('Headers saved!');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) await apiClient.updateEducation(editingId, formData);
      else await apiClient.createEducation(formData);
      setShowForm(false);
      fetchEducation();
    } catch (err) {
      console.error(err);
      alert('Failed to save education card');
    }
  };

  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });

  const confirmDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const executeDelete = async () => {
    if (deleteConfirm.id) {
      await apiClient.deleteEducation(deleteConfirm.id);
      fetchEducation();
    }
    setDeleteConfirm({ isOpen: false, id: null });
  };

  const toggleVisibility = async (p: any) => {
    await apiClient.updateEducation(p._id, { visible: !p.visible });
    fetchEducation();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-8">
      {/* Headers Editor */}
      <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8">
        <h2 className="text-xl font-bold mb-6 text-yellow-400">Timeline Headers</h2>
        <div className="flex flex-col gap-4 mb-6">
          <input value={title} onChange={e => setTitle(e.target.value)} className="bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400" placeholder="Title" />
          <input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400" placeholder="Subtitle" />
        </div>
        <button onClick={handleSaveHeaders} className="bg-zinc-800 text-white px-6 py-2 rounded-full font-bold hover:bg-zinc-700">Save Headers</button>
      </div>

      {/* List / Form */}
      <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-400">Education Timeline</h2>
          <button 
            onClick={() => { setEditingId(null); setFormData({ degree: '', institution: '', year: '', percentage: '', status: 'Completed', visible: true, order: 0 }); setShowForm(!showForm); }}
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300"
          >
            {showForm ? 'Cancel' : '+ Add Record'}
          </button>
        </div>

        {showForm ? (
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <input required value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} placeholder="Degree / Certificate" className="bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3" />
            <input required value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} placeholder="Institution Name" className="bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3" />
            <div className="flex gap-4">
              <input required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="Year (e.g. 2020-2024)" className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3" />
              <input value={formData.percentage} onChange={e => setFormData({...formData, percentage: e.target.value})} placeholder="Grade / Percentage" className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3" />
            </div>
            <div className="flex gap-4 items-center">
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 w-48 text-white">
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
              </select>
              <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} placeholder="Order" className="bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 w-32" />
              <label className="flex items-center gap-2 cursor-pointer ml-4">
                <input type="checkbox" checked={formData.visible} onChange={e => setFormData({...formData, visible: e.target.checked})} className="w-5 h-5 accent-yellow-400" />
                Visible
              </label>
            </div>
            <button type="submit" className="bg-yellow-400 text-black py-4 rounded-xl font-bold mt-4">Save Record</button>
          </form>
        ) : (
          <div className="overflow-x-auto">
            {education.length === 0 ? <p className="text-zinc-500 italic">No education records. Timeline section will be hidden on site.</p> : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-sm uppercase">
                    <th className="py-4 font-normal">Degree</th>
                    <th className="py-4 font-normal">Institution</th>
                    <th className="py-4 font-normal">Status</th>
                    <th className="py-4 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map(p => (
                    <tr key={p._id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                      <td className="py-4 font-medium">{p.degree}</td>
                      <td className="py-4 text-zinc-400">{p.institution}</td>
                      <td className="py-4">
                        <button onClick={() => toggleVisibility(p)} className={`px-3 py-1 rounded-full text-xs font-bold ${p.visible ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'}`}>
                          {p.visible ? 'VISIBLE' : 'HIDDEN'}
                        </button>
                      </td>
                      <td className="py-4 text-right flex justify-end gap-3">
                        <button onClick={() => { setEditingId(p._id); setFormData({ degree: p.degree, institution: p.institution, year: p.year, percentage: p.percentage, status: p.status, visible: p.visible, order: p.order }); setShowForm(true); }} className="text-yellow-400 hover:text-yellow-300 font-bold text-sm">Edit</button>
                        <button onClick={() => confirmDelete(p._id)} className="text-red-400 hover:text-red-300 font-bold text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Record"
        message="Are you sure you want to delete this education record? This action cannot be undone."
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, id: null })}
      />
    </div>
  );
};
