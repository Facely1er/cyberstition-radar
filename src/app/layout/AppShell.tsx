import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home as HomeIcon, MessageSquare, User, Image as ImageIcon, Mail, Info } from 'lucide-react';
import ThemeToggle from '../../components/common/ThemeToggle';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const title = getTitle(pathname);
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
                <span>{title}</span>
              </div>
            </div>
          </NavLink>

          <nav className="topnav" aria-label="Primary">
            <NavItem to="/" label="Home" icon={<HomeIcon size={18} />} end />
            <NavItem to="/messages" label="Messages" icon={<MessageSquare size={18} />} />
            <NavItem to="/profiles" label="Profiles" icon={<User size={18} />} />
            <NavItem to="/images" label="Images" icon={<ImageIcon size={18} />} />
            <NavItem to="/email" label="Email" icon={<Mail size={18} />} />
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
            <ThemeToggle />
            <NavLink to="/about" className={({ isActive }) => `btn ${isActive ? 'primary' : ''}`} aria-label="About">
              <Info size={16} /> About
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

function getTitle(pathname: string) {
  if (pathname.startsWith('/messages')) return 'Message Detective';
  if (pathname.startsWith('/profiles')) return 'Profile Checker';
  if (pathname.startsWith('/images')) return 'Image Inspector';
  if (pathname.startsWith('/email')) return 'Email Analyzer';
  if (pathname.startsWith('/about')) return 'How it works';
  return 'Digital Safety Kit';
}
