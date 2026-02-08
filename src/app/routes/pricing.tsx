import React from 'react';
import { Check, Download } from 'lucide-react';
import { brandName, priceLabel } from '../config/product';

export default function Pricing() {
  const handleGetApp = () => {
    // TODO: Replace with actual Play Store URL
    window.open('https://play.google.com/store/apps', '_blank');
  };

  return (
    <div className="grid" style={{ gap: 14, maxWidth: 600, margin: '0 auto' }}>
      <section className="card">
        <h1 className="h1">Get {brandName}</h1>
        <p className="p" style={{ marginTop: 8 }}>
          Purchase the app to access all analysis tools. One-time payment, no subscription, no account required.
        </p>
      </section>

      <section className="card" style={{ 
        border: '2px solid var(--primary)', 
        backgroundColor: 'var(--bg-secondary)' 
      }}>
        <div className="kicker" style={{ color: 'var(--primary)' }}>
          {priceLabel}
        </div>
        <h2 className="h2" style={{ marginTop: 8 }}>Full Access</h2>
        <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none' }}>
          <li style={{ marginBottom: 12, display: 'flex', alignItems: 'start', gap: 12 }}>
            <Check size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
            <span>Unlimited analyses</span>
          </li>
          <li style={{ marginBottom: 12, display: 'flex', alignItems: 'start', gap: 12 }}>
            <Check size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
            <span>Full signal explanations</span>
          </li>
          <li style={{ marginBottom: 12, display: 'flex', alignItems: 'start', gap: 12 }}>
            <Check size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
            <span>Batch checks</span>
          </li>
          <li style={{ marginBottom: 12, display: 'flex', alignItems: 'start', gap: 12 }}>
            <Check size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
            <span>Local export</span>
          </li>
          <li style={{ marginBottom: 12, display: 'flex', alignItems: 'start', gap: 12 }}>
            <Check size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
            <span>No subscription. No account.</span>
          </li>
        </ul>

        <div style={{ marginTop: 24 }}>
          <button
            onClick={handleGetApp}
            className="btn primary"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <Download size={16} />
            Get the app
          </button>
        </div>
      </section>

      <section className="card" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        <p className="small" style={{ opacity: 0.8 }}>
          All analysis happens locally on your device. No data is collected or transmitted. 
          Your privacy is protected.
        </p>
      </section>
    </div>
  );
}

