import React, { useEffect, useState } from 'react';

export const SecurityShield: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    // Advanced DevTools detection trick:
    // If DevTools is open, the 'debugger' statement will pause execution.
    // We measure the time it takes to execute a tiny block of code.
    // If it takes significantly longer than usual, it means the debugger paused it!
    const detectDevTools = () => {
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger; 
      const timeTaken = performance.now() - start;
      
      // If it takes more than 100ms, the debugger definitely caught it
      if (timeTaken > 100) {
        setIsDevToolsOpen(true);
      } else {
        setIsDevToolsOpen(false);
      }
    };

    // Run the check every 500ms
    const interval = setInterval(detectDevTools, 500);

    // Override console methods to prevent data leakage or debugging
    if (import.meta.env.PROD) {
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
      console.info = () => {};
      console.debug = () => {};
    }

    // Disable Right-Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable common developer keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      
      // Ctrl+Shift+I (Windows) or Cmd+Option+I (Mac) - Inspect
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
      }
      
      // Ctrl+Shift+J (Windows) or Cmd+Option+J (Mac) - Console
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
      }
      
      // Ctrl+Shift+C (Windows) or Cmd+Option+C (Mac) - Element Selector
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
      }
      
      // Ctrl+U (Windows) or Cmd+Option+U (Mac) - View Source
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
      }
    };

    // Prevent drag and drop of elements (images/text) to deter casual scraping
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // Prevent text selection
    const handleSelectStart = (e: Event) => {
      // Allow selection inside inputs and textareas
      const target = e.target as HTMLElement;
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('selectstart', handleSelectStart);

    return () => {
      clearInterval(interval);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  if (isDevToolsOpen) {
    return (
      <div className="w-full h-screen bg-[#0a0a0a] flex items-center justify-center text-red-500 font-mono text-xl z-[9999] fixed inset-0">
        DevTools usage is not allowed here. Please close the inspector to view the site.
      </div>
    );
  }

  return (
    <div className="w-full h-full" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      {children}
    </div>
  );
};
