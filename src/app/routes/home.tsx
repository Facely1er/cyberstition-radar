import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, User, Image as ImageIcon, Mail, FileText, Download, Shield } from 'lucide-react';
import TrustNotice from '../../components/common/TrustNotice';
import NextSteps from '../../components/common/NextSteps';
import { IS_WEB_BUILD } from '../../config/env';
import { priceLabel } from '../config/product';

export default function Home() {
  const handleGetApp = () => {
    // TODO: Replace with actual Play Store URL
    window.open('https://play.google.com/store/apps', '_blank');
  };

  // Web build: Landing page only
  if (IS_WEB_BUILD) {
    return (
      <div className="grid">
        <section className="card">
          <h1 className="h1">Question what looks real online.</h1>
          <p className="p">
            Identify scams, fake profiles, manipulated images, and suspicious emails using on-device analysis. 
            All processing happens locally—no data collection, no tracking.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
            <button onClick={handleGetApp} className="btn primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Download size={16} />
              Get the app — {priceLabel}
            </button>
            <Link className="btn" to="/about">How it works</Link>
          </div>
        </section>

        <section className="card" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          <div className="kicker" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={16} /> Available Tools
          </div>
          <p className="p" style={{ marginTop: 8 }}>
            All tools are available in the app after purchase. Download to get started.
          </p>
        </section>

        <div className="grid cols-2">
          <ToolCard title="Message Detective" desc="Detect scam, phishing, and AI-generated message patterns." icon={<MessageSquare size={18} />} />
          <ToolCard title="Profile Checker" desc="Verify social profile authenticity and identify deception signals." icon={<User size={18} />} />
          <ToolCard title="Image Inspector" desc="Inspect metadata and detect manipulation indicators in images." icon={<ImageIcon size={18} />} />
          <ToolCard title="Email Analyzer" desc="Analyze email headers for spoofing and routing anomalies." icon={<Mail size={18} />} />
        </div>

        <section className="card" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          <div className="kicker" style={{ color: 'var(--text)' }}>
            <Download size={16} /> Get Started
          </div>
          <p className="p" style={{ marginTop: 8 }}>
            Purchase and download the app to access all analysis tools. One-time payment, no subscription required.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
            <button onClick={handleGetApp} className="btn primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Download size={16} />
              Get the app
            </button>
            <Link className="btn" to="/pricing">View Pricing</Link>
          </div>
        </section>

        <TrustNotice />
      </div>
    );
  }

  // App build: Full functionality
  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <h1 className="h1">Question what looks real online.</h1>
        <p className="p">
          Identify scams, fake profiles, manipulated images, and suspicious emails using on-device analysis. All processing happens locally—no data collection, no tracking.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
          <Link className="btn primary" to="/messages">Start with Messages</Link>
          <Link className="btn" to="/about">How it works</Link>
        </div>
      </section>

      <div className="grid cols-2">
        <ToolCard to="/messages" title="Message Detective" desc="Detect scam, phishing, and AI-generated message patterns." icon={<MessageSquare size={18} />} />
        <ToolCard to="/profiles" title="Profile Checker" desc="Verify social profile authenticity and identify deception signals." icon={<User size={18} />} />
        <ToolCard to="/images" title="Image Inspector" desc="Inspect metadata and detect manipulation indicators in images." icon={<ImageIcon size={18} />} />
        <ToolCard to="/email" title="Email Analyzer" desc="Analyze email headers for spoofing and routing anomalies." icon={<Mail size={18} />} />
      </div>

      <NextSteps entryPoint="messages" />

      <section className="card" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        <div className="kicker" style={{ color: 'var(--text)' }}>
          <FileText size={16} /> Analysis History
        </div>
        <p className="p" style={{ marginTop: 8 }}>
          Access your saved reports and analysis history from the dashboard.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
          <Link className="btn primary" to="/dashboard">View Dashboard</Link>
          <Link className="btn" to="/account">Preferences</Link>
        </div>
      </section>

      <TrustNotice />
    </div>
  );
}

function ToolCard({ to, title, desc, icon }: { to?: string; title: string; desc: string; icon: React.ReactNode }) {
  if (IS_WEB_BUILD) {
    return (
      <div className="card" style={{ opacity: 0.8 }}>
        <div className="kicker" style={{ justifyContent: 'space-between' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>{icon} {title}</span>
          <span className="badge">In App</span>
        </div>
        <p className="p" style={{ marginTop: 10 }}>{desc}</p>
        <div style={{ marginTop: 12 }} className="small">Available after purchase</div>
      </div>
    );
  }

  return (
    <Link to={to!} className="card" style={{ display: 'block' }}>
      <div className="kicker" style={{ justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>{icon} {title}</span>
        <span className="badge">Signals</span>
      </div>
      <p className="p" style={{ marginTop: 10 }}>{desc}</p>
      <div style={{ marginTop: 12 }} className="small">High-level indicators only. Always verify before acting.</div>
    </Link>
  );
}
