import React from 'react';
import { Download } from 'lucide-react';
import TrustNotice from '../../components/common/TrustNotice';
import { priceLabel } from '../config/product';

export default function About() {
  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <h1 className="h1">How Cyberstition Works</h1>
        <p className="p">
          Cyberstition analyzes content on your device to identify deception and manipulation signals. 
          It does not monitor accounts, block messages, or guarantee detection.
        </p>
        <hr />
        <ul className="small">
          <li><strong>On-device processing</strong>: All analysis runs locally in your browser—no server uploads.</li>
          <li><strong>Privacy-first</strong>: No data collection, tracking, or account monitoring.</li>
          <li><strong>Indicators only</strong>: Results are signals to inform your judgment, not definitive proof.</li>
          <li><strong>Independent verification</strong>: Always verify suspicious content through a separate channel.</li>
        </ul>
      </section>

      <section className="card">
        <h2 className="h2">Pricing</h2>
        <p className="p">
          Cyberstition is available as a paid app. Purchase once to unlock all features.
        </p>
        <ul className="small" style={{ marginTop: 12, paddingLeft: 20 }}>
          <li>One-time purchase — {priceLabel}</li>
          <li>No subscription</li>
          <li>No account required</li>
          <li>Local-only analysis</li>
        </ul>
        <div style={{ marginTop: 16 }}>
          <button
            onClick={() => window.open('https://play.google.com/store/apps', '_blank')}
            className="btn primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <Download size={16} />
            Get the app
          </button>
        </div>
      </section>

      <section className="card">
        <h2 className="h2">Frequently Asked Questions</h2>
        <div style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>How do I purchase the app?</h3>
            <p className="small" style={{ opacity: 0.9 }}>
              Download from the Play Store. One-time purchase of {priceLabel}, no subscription required.
            </p>
          </div>
        </div>
      </section>

      <TrustNotice />
    </div>
  );
}
