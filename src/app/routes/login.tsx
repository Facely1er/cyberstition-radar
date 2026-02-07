import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="grid" style={{ maxWidth: 480, margin: '0 auto', gap: 14 }}>
      <section className="card">
        <div className="kicker" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LogIn size={16} /> Sign In
        </div>
        <h1 className="h1" style={{ fontSize: 28, marginTop: 10 }}>Your Account</h1>
        <p className="p">Sign in to access your saved reports and documents, or create a new account.</p>

        <div className="card" style={{ padding: 12, marginTop: 16, backgroundColor: 'rgb(240 253 244)', border: '1px solid rgb(34 197 94)' }}>
          <div className="small" style={{ color: 'rgb(21 128 61)' }}>
            Your account is stored locally on this device. No data is sent to any server.
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          {error && (
            <div className="card" style={{
              padding: 12,
              marginBottom: 14,
              border: '1px solid rgb(239 68 68)',
              backgroundColor: 'rgb(254 242 242)'
            }}>
              <div className="small" style={{ color: 'rgb(153 27 27)' }}>{error}</div>
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <label htmlFor="email" className="small" style={{ display: 'block', marginBottom: 6 }}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: 6,
                fontSize: 15,
              }}
              placeholder="you@example.com"
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label htmlFor="password" className="small" style={{ display: 'block', marginBottom: 6 }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: 6,
                fontSize: 15,
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn primary"
            style={{ width: '100%' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: '1px solid #e0e0e0' }}>
          <div className="small" style={{ marginBottom: 10, opacity: 0.8 }}>Don't have an account?</div>
          <Link to="/signup" className="btn" style={{ width: '100%' }}>
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
}
