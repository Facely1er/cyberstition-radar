import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, LayoutGrid, Settings, ChevronRight } from 'lucide-react';
import TrustNotice from '../../components/common/TrustNotice';

export default function More() {
  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <h1 className="h1">More</h1>
        <p className="p">Quick links to learn more and manage your preferences.</p>
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
        </div>
      </section>

      <section className="card">
        <div className="kicker" style={{ color: 'var(--text)' }}>Manage</div>
        <div className="link-list" style={{ marginTop: 12 }}>
          <MoreLink
            to="/dashboard"
            icon={<LayoutGrid size={16} />}
            title="Dashboard"
            description="Review saved reports and documents."
          />
          <MoreLink
            to="/account"
            icon={<Settings size={16} />}
            title="Preferences"
            description="Update your app preferences and settings."
          />
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
