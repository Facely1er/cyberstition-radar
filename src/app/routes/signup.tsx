import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, fullName);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Redirect to home after signup (though signup shouldn't be accessible)
      navigate('/');
    }
  };

  return (
    <div className="grid" style={{ maxWidth: 480, margin: '0 auto', gap: 14 }}>
      <section className="card">
        <div className="kicker" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <UserPlus size={16} /> Create Account
        </div>
        <h1 className="h1" style={{ marginTop: 10 }}>Get started</h1>
        <p className="p">Create an account to save reports and manage your analysis history.</p>

        <div className="card" style={{ padding: 12, marginTop: 16, backgroundColor: 'rgb(240 253 244)', border: '1px solid rgb(34 197 94)' }}>
          <div className="small" style={{ color: 'rgb(21 128 61)' }}>
            Your account is stored locally on this device only. No data is sent to any server.
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
            <label htmlFor="fullName" className="small" style={{ display: 'block', marginBottom: 6 }}>
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: 6,
                fontSize: 15,
              }}
              placeholder="John Doe"
            />
          </div>

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
              className="input"
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
              className="input"
              placeholder="At least 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn primary"
            style={{ width: '100%' }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="small" style={{ textAlign: 'center', marginTop: 16 }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 500 }}>Sign in</Link>
        </div>
      </section>
    </div>
  );
}
