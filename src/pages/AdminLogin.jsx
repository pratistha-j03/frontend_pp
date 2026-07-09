import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api.js';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const data = await loginAdmin(email.trim(), password);
      if (data?.token) {
        localStorage.setItem('pp_admin_token', data.token);
        localStorage.setItem('pp_admin_user', JSON.stringify(data.admin));
        navigate('/admin');
      } else {
        setError(data?.error || 'Invalid email or password.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-[#021335]">Puja Printers</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage the site</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 text-sm font-medium px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-[#021335]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@pujaprinters.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-[#021335]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A49C9] hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;