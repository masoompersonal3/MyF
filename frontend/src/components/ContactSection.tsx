import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare } from 'lucide-react';
import { StardustButton } from './ui/stardust-button';
import { SITE_CONTENT } from '../data';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const content = SITE_CONTENT;
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Using Web3Forms with environment variable
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          ...formData
        }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="relative w-full bg-transparent text-white pt-32 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden flex items-center justify-center">
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Header & Info */}
        <div className="flex flex-col">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white mb-6 leading-[0.9]">
            {content?.contactHeading || "Let's"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Connect.
            </span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-light tracking-wide max-w-md leading-relaxed mb-12">
            {content?.contactSubtitle || "Have a project in mind, or just want to say hi? I'm always open to discussing new opportunities and creative ideas."}
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 transition-all duration-300 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Email Me</p>
                <p className="text-lg text-zinc-200 group-hover:text-white transition-colors">{content?.contactEmail || 'mullamasoom50@gmail.com'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Glassmorphic Form */}
        <div className="w-full">
          <form 
            onSubmit={handleSubmit}
            style={{
              boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.192), inset 0 0 5px rgba(255, 255, 255, 0.274), 0 5px 5px rgba(0, 0, 0, 0.164)"
            }}
            className="w-full bg-zinc-900/30 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-zinc-800 flex flex-col gap-6 relative overflow-hidden group"
          >
            <div className="relative z-10 flex flex-col gap-2">
              <label htmlFor="name" className="text-xs text-zinc-400 font-bold uppercase tracking-widest ml-4 flex items-center gap-2">
                <User size={14} className="text-yellow-400" /> Your Name
              </label>
              <input 
                type="text" 
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-yellow-400/50 rounded-full px-6 py-4 text-white placeholder-zinc-600 outline-none transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                placeholder="Masoom Mulla"
              />
            </div>

            <div className="relative z-10 flex flex-col gap-2">
              <label htmlFor="email" className="text-xs text-zinc-400 font-bold uppercase tracking-widest ml-4 flex items-center gap-2">
                <Mail size={14} className="text-yellow-400" /> Email Address
              </label>
              <input 
                type="email" 
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-yellow-400/50 rounded-full px-6 py-4 text-white placeholder-zinc-600 outline-none transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                placeholder="masoommulla14@gmail.com"
              />
            </div>

            <div className="relative z-10 flex flex-col gap-2">
              <label htmlFor="message" className="text-xs text-zinc-400 font-bold uppercase tracking-widest ml-4 flex items-center gap-2">
                <MessageSquare size={14} className="text-yellow-400" /> Your Message
              </label>
              <textarea 
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-yellow-400/50 rounded-[2rem] px-6 py-4 text-white placeholder-zinc-600 outline-none transition-colors resize-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="relative z-10 mt-4 flex justify-end items-center gap-4">
              {status === 'success' && <span className="text-green-400 text-sm font-bold">Message Sent!</span>}
              {status === 'error' && <span className="text-red-400 text-sm font-bold">Error sending.</span>}
              <button type="submit" disabled={status === 'sending'} className="group disabled:opacity-50">
                <StardustButton className="w-48 h-14 flex justify-center items-center gap-2 uppercase tracking-widest font-bold">
                  {status === 'sending' ? 'Sending...' : 'Send'} <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </StardustButton>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
