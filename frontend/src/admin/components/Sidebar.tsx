

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ activeSection, onSectionChange, onLogout, isOpen, onClose }: SidebarProps) => {
  const navItems = [
    { id: 'hero', icon: '🏠', label: 'Hero' },
    { id: 'about', icon: '👤', label: 'About Me' },
    { id: 'projects', icon: '🎨', label: 'Projects' },
    { id: 'education', icon: '🎓', label: 'Education' },
    { id: 'contact', icon: '📬', label: 'Contact Info' },
    { id: 'messages', icon: '📩', label: 'Messages' },
    { id: 'footer', icon: '🔗', label: 'Footer' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <div className={`w-64 h-full bg-zinc-950 border-r border-zinc-800 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-yellow-400 tracking-widest">MASOOM.</h2>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Admin Panel</p>
          </div>
          <button onClick={onClose} className="md:hidden text-zinc-400 hover:text-white p-2">
            ✕
          </button>
        </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-sm tracking-wide ${
              activeSection === item.id
                ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white border border-transparent'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-zinc-800 pb-8 md:pb-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-400 font-bold text-sm hover:bg-red-400/10 transition-colors border border-transparent hover:border-red-400/20"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
    </>
  );
};
