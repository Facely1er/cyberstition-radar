import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon, MessageSquare, User, ShieldCheck, Image as ImageIcon, Mail } from 'lucide-react';
import ThemeToggle from '../../components/common/ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="inner">
          <NavLink to="/" className="brand-link">
            <div className="brand">
              <img
                src="/cyberstition_logo.png"
                alt="Cyberstition"
                className="brand-logo"
              />
              <div className="brand-text">
                <strong>Cyberstition™</strong>
                <span className="brand-subtitle">Risk signals</span>
                <span className="brand-subtext">by ERMITS</span>
              </div>
            </div>
          </NavLink>

          <nav className="topnav" aria-label="Primary">
            <NavItem to="/" label="Home" icon={<HomeIcon size={18} />} end />
            <NavItem to="/messages" label="Messages" icon={<MessageSquare size={18} />} />
            <NavItem to="/profiles" label="Profiles" icon={<ShieldCheck size={18} />} />
            <NavItem to="/images" label="Images" icon={<ImageIcon size={18} />} />
            <NavItem to="/email" label="Email" icon={<Mail size={18} />} />
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
            <ThemeToggle />
            <NavLink
              to={user ? "/dashboard" : "/login"}
              className={({ isActive }) => `btn ${isActive ? 'primary' : ''}`}
              aria-label="Account"
            >
              <User size={16} /> Account
            </NavLink>
          </div>
        </div>
      </div>

      <main className="container">{children}</main>

      <footer className="footer">
        <div className="inner">
          <div className="brand">
            <img
              src="/cyberstition_logo.png"
              alt="Cyberstition"
              className="brand-logo"
            />
            <strong>Cyberstition™</strong>
          </div>
          <p className="footer-tagline">Digital Safety Tools for Everyone</p>
          <div className="footer-links">
            <NavLink to="/about" className="footer-link">About</NavLink>
          </div>
        </div>
      </footer>
    </>
  );
}

function NavItem({ to, label, icon, end }: { to: string; label: string; icon: React.ReactNode; end?: boolean }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `navitem ${isActive ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
