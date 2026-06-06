import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { HeroManager } from './sections/HeroManager';
import { AboutManager } from './sections/AboutManager';
import { ProjectsManager } from './sections/ProjectsManager';
import { EducationManager } from './sections/EducationManager';
import { ContactManager } from './sections/ContactManager';
import { MessagesManager } from './sections/MessagesManager';
import { FooterManager } from './sections/FooterManager';
import { apiClient } from '../api';
import { AdminLogin } from './AdminLogin';

export const AdminApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('admin_token'));
  const [activeSection, setActiveSection] = useState('hero');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadContent = async () => {
    if (!isAuthenticated) return;
    try {
      const data = await apiClient.getContent();
      setContent(data);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes('token')) {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_token');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-yellow-400">Loading Admin...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950 sticky top-0 z-40">
        <div>
          <h2 className="text-xl font-black text-yellow-400 tracking-widest leading-none">MASOOM.</h2>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1 leading-none">Admin Panel</p>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
        >
          <span className="block w-5 h-0.5 bg-current mb-1"></span>
          <span className="block w-5 h-0.5 bg-current mb-1"></span>
          <span className="block w-5 h-0.5 bg-current"></span>
        </button>
      </div>

      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={(section) => {
          setActiveSection(section);
          setIsSidebarOpen(false); // Close on mobile after selection
        }} 
        onLogout={handleLogout} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto pb-12 md:pb-0">
          {activeSection === 'hero' && <HeroManager content={content} onUpdate={loadContent} />}
          {activeSection === 'about' && <AboutManager content={content} onUpdate={loadContent} />}
          {activeSection === 'projects' && <ProjectsManager content={content} onUpdate={loadContent} />}
          {activeSection === 'education' && <EducationManager content={content} onUpdate={loadContent} />}
          {activeSection === 'contact' && <ContactManager content={content} onUpdate={loadContent} />}
          {activeSection === 'messages' && <MessagesManager />}
          {activeSection === 'footer' && <FooterManager content={content} onUpdate={loadContent} />}
        </div>
      </div>
    </div>
  );
};
