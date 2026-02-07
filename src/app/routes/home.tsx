import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, User, Image as ImageIcon, Mail, Sparkles } from 'lucide-react';
import TrustNotice from '../../components/common/TrustNotice';

export default function Home() {
  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <div className="kicker"><Sparkles size={16} /> Digital Safety Kit</div>
        <h1 className="h1">Question what looks real online.</h1>
        <p className="p">
          Cyberstition helps you recognize scams, fake profiles, manipulated images, and suspicious emails using on-device indicators.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
          <Link className="btn primary" to="/messages">Start with Messages</Link>
          <Link className="btn" to="/about">How it works</Link>
        </div>
      </section>

      <div className="grid cols-2">
        <ToolCard to="/messages" title="Message Detective" desc="Spot scam, phishing, and AI-generated message patterns." icon={<MessageSquare size={18} />} />
        <ToolCard to="/profiles" title="Profile Checker" desc="Assess whether a social profile looks authentic or deceptive." icon={<User size={18} />} />
        <ToolCard to="/images" title="Image Inspector" desc="Reveal hidden metadata and manipulation clues in images." icon={<ImageIcon size={18} />} />
        <ToolCard to="/email" title="Email Analyzer" desc="Analyze email headers for spoofing and anomalies." icon={<Mail size={18} />} />
      </div>

      <TrustNotice />
    </div>
  );
}

function ToolCard({ to, title, desc, icon }: { to: string; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <Link to={to} className="card" style={{ display: 'block' }}>
      <div className="kicker" style={{ justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>{icon} {title}</span>
        <span className="badge">Signals</span>
      </div>
      <p className="p" style={{ marginTop: 10 }}>{desc}</p>
      <div style={{ marginTop: 12 }} className="small">High-level indicators only. Always verify before acting.</div>
    </Link>
  );
}
