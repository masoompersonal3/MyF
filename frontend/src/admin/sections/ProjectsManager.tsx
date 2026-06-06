import { useState, useEffect } from 'react';
import { apiClient } from '../../api';
import { ConfirmModal } from '../components/ConfirmModal';

export const ProjectsManager = ({ content, onUpdate }: { content: any, onUpdate: () => void }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(content?.featuredTitle || '');
  const [subtitle, setSubtitle] = useState(content?.featuredSubtitle || '');
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', tech: '', link: '', github: '', visible: true, order: 0 });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await apiClient.getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSaveHeaders = async () => {
    await apiClient.updateContent({ featuredTitle: title, featuredSubtitle: subtitle });
    onUpdate();
    alert('Headers saved!');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('tech', formData.tech);
    data.append('link', formData.link);
    data.append('github', formData.github);
    data.append('visible', formData.visible.toString());
    data.append('order', formData.order.toString());
    if (imageFile) data.append('image', imageFile);

    try {
      if (editingId) {
        await apiClient.updateProject(editingId, data);
      } else {
        await apiClient.createProject(data);
      }
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Failed to save project');
    }
  };

  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });

  const confirmDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const executeDelete = async () => {
    if (deleteConfirm.id) {
      await apiClient.deleteProject(deleteConfirm.id);
      fetchProjects();
    }
    setDeleteConfirm({ isOpen: false, id: null });
  };

  const openEdit = (p: any) => {
    setEditingId(p._id);
    setFormData({
      title: p.title, description: p.description, tech: p.tech.join(', '),
      link: p.link, github: p.github, visible: p.visible, order: p.order
    });
    setImageFile(null);
    setShowForm(true);
  };

  const toggleVisibility = async (p: any) => {
    const data = new FormData();
    data.append('visible', (!p.visible).toString());
    await apiClient.updateProject(p._id, data);
    fetchProjects();
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="flex flex-col gap-8">
      {/* Headers Editor */}
      <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8">
        <h2 className="text-xl font-bold mb-6 text-yellow-400">Section Headers</h2>
        <div className="flex flex-col gap-4 mb-6">
          <input value={title} onChange={e => setTitle(e.target.value)} className="bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400" placeholder="Title" />
          <input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400" placeholder="Subtitle" />
        </div>
        <button onClick={handleSaveHeaders} className="bg-zinc-800 text-white px-6 py-2 rounded-full font-bold hover:bg-zinc-700">Save Headers</button>
      </div>

      {/* Projects List / Form */}
      <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-400">Projects</h2>
          <button 
            onClick={() => { setEditingId(null); setFormData({ title: '', description: '', tech: '', link: '', github: '', visible: true, order: 0 }); setShowForm(!showForm); }}
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300"
          >
            {showForm ? 'Cancel' : '+ Add Project'}
          </button>
        </div>

        {showForm ? (
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Title" className="bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3" />
            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Description" className="bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 h-32" />
            <input value={formData.tech} onChange={e => setFormData({...formData, tech: e.target.value})} placeholder="Tech stack (comma separated)" className="bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3" />
            <div className="flex gap-4">
              <input value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="Live Demo Link" className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3" />
              <input value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} placeholder="GitHub Link" className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3" />
            </div>
            <div className="flex gap-4 items-center">
              <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} placeholder="Order index" className="bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 w-32" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.visible} onChange={e => setFormData({...formData, visible: e.target.checked})} className="w-5 h-5 accent-yellow-400" />
                Visible on site
              </label>
            </div>
            <div className="border border-zinc-700 rounded-xl p-4">
              <label className="block text-zinc-400 mb-2">Project Image (Upload from device)</label>
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="text-zinc-300" />
            </div>
            <button type="submit" className="bg-yellow-400 text-black py-4 rounded-xl font-bold mt-4">Save Project</button>
          </form>
        ) : (
          <div className="overflow-x-auto">
            {projects.length === 0 ? <p className="text-zinc-500 italic">No projects found. "Coming Soon" card will be shown on site.</p> : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-sm uppercase">
                    <th className="py-4 font-normal">Order</th>
                    <th className="py-4 font-normal">Title</th>
                    <th className="py-4 font-normal">Status</th>
                    <th className="py-4 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p._id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                      <td className="py-4 text-zinc-500">{p.order}</td>
                      <td className="py-4 font-medium">{p.title}</td>
                      <td className="py-4">
                        <button onClick={() => toggleVisibility(p)} className={`px-3 py-1 rounded-full text-xs font-bold ${p.visible ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'}`}>
                          {p.visible ? 'VISIBLE' : 'HIDDEN'}
                        </button>
                      </td>
                      <td className="py-4 text-right flex justify-end gap-3">
                        <button onClick={() => openEdit(p)} className="text-yellow-400 hover:text-yellow-300 font-bold text-sm">Edit</button>
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
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, id: null })}
      />
    </div>
  );
};
