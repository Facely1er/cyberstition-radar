import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home as HomeIcon, MessageSquare, Settings, Users, Image as ImageIcon, Mail, MoreHorizontal, FileText } from 'lucide-react';
import ThemeToggle from '../../components/common/ThemeToggle';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
                <span className="brand-subtitle">Trust Signals</span>
                <span className="brand-subtext">by ERMITS</span>
              </div>
            </div>
          </NavLink>

          <nav className="topnav" aria-label="Primary">
            <NavItem to="/" label="Home" icon={<HomeIcon size={18} />} end />
            <NavItem to="/messages" label="Messages" icon={<MessageSquare size={18} />} />
            <NavItem to="/profiles" label="Profiles" icon={<Users size={18} />} />
            <NavItem to="/images" label="Images" icon={<ImageIcon size={18} />} />
            <NavItem to="/email" label="Email" icon={<Mail size={18} />} />
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `btn ${isActive ? 'primary' : ''}`}
              aria-label="Dashboard"
              title="View Analysis History"
            >
              <FileText size={16} />
            </NavLink>
            <NavLink
              to="/account"
              className={({ isActive }) => `btn ${isActive ? 'primary' : ''}`}
              aria-label="Preferences"
              title="Preferences"
            >
              <Settings size={16} />
            </NavLink>
          </div>
        </div>
      </div>

      <main className="container app-main">{children}</main>

      <nav className="bottomnav" aria-label="Primary">
        <NavItem to="/" label="Home" icon={<HomeIcon size={18} />} end />
        <NavItem to="/messages" label="Messages" icon={<MessageSquare size={18} />} />
        <NavItem to="/profiles" label="Profiles" icon={<Users size={18} />} />
        <NavItem to="/images" label="Images" icon={<ImageIcon size={18} />} />
        <NavItem to="/email" label="Email" icon={<Mail size={18} />} />
        <NavItem to="/more" label="More" icon={<MoreHorizontal size={18} />} />
      </nav>

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
  const location = useLocation();
  const isActive = end 
    ? location.pathname === to
    : location.pathname.startsWith(to);
  
  return (
    <NavLink to={to} end={end} className={`navitem ${isActive ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
