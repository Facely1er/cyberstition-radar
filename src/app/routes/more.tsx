import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Mail, LayoutGrid, Settings, LogIn, UserPlus, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import TrustNotice from '../../components/common/TrustNotice';

export default function More() {
  const { user } = useAuth();

  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <h1 className="h1">More</h1>
        <p className="p">Quick links to learn more and manage your account.</p>
      </section>

      <section className="card">
        <div className="kicker" style={{ color: 'var(--text)' }}>Explore</div>
        <div className="link-list" style={{ marginTop: 12 }}>
          <MoreLink
            to="/"
            icon={<Home size={16} />}
            title="Home"
            description="Return to the overview and tool entry points."
          />
          <MoreLink
            to="/about"
            icon={<BookOpen size={16} />}
            title="How it works"
            description="Learn how the indicators are generated."
          />
          <MoreLink
            to="/email"
            icon={<Mail size={16} />}
            title="Email Analyzer"
            description="Check email headers for spoofing and anomalies."
          />
        </div>
      </section>

      <section className="card">
        <div className="kicker" style={{ color: 'var(--text)' }}>Account</div>
        <div className="link-list" style={{ marginTop: 12 }}>
          {user ? (
            <>
              <MoreLink
                to="/dashboard"
                icon={<LayoutGrid size={16} />}
                title="Dashboard"
                description="Review saved reports and documents."
              />
              <MoreLink
                to="/account"
                icon={<Settings size={16} />}
                title="Account settings"
                description="Update your profile and preferences."
              />
            </>
          ) : (
            <>
              <MoreLink
                to="/login"
                icon={<LogIn size={16} />}
                title="Log in"
                description="Access your saved reports and settings."
              />
              <MoreLink
                to="/signup"
                icon={<UserPlus size={16} />}
                title="Create account"
                description="Set up an account for saved analysis history."
              />
            </>
          )}
        </div>
      </section>

      <TrustNotice />
    </div>
  );
}

function MoreLink({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link to={to} className="link-card">
      <div className="link-content">
        <div className="link-icon">{icon}</div>
        <div className="link-meta">
          <div className="link-title">{title}</div>
          <div className="link-desc">{description}</div>
        </div>
      </div>
      <div className="link-actions">
        <ChevronRight size={16} />
      </div>
    </Link>
  );
}
