import { useState } from 'react';
import { apiClient } from '../api';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiClient.login(password);
      localStorage.setItem('admin_token', data.token);
      onLogin();
    } catch {
      setError('Invalid password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-[2rem] p-10 flex flex-col items-center gap-8"
        style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05), inset 0 0 5px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.5)' }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-black text-yellow-400 tracking-widest mb-2">MASOOM.</h1>
          <p className="text-zinc-400 text-sm font-medium tracking-[0.2em] uppercase">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              className="w-full bg-zinc-950/60 border border-zinc-700 focus:border-yellow-400/50 rounded-full px-6 py-4 text-white placeholder-zinc-600 outline-none transition-colors"
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-full py-2 px-4">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-yellow-400 text-black font-bold text-sm uppercase tracking-widest hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <p className="text-zinc-600 text-xs text-center">
          Double-click the footer badge to access this panel
        </p>
      </div>
    </div>
  );
};
