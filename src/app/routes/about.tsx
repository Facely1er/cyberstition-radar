import React from 'react';
import { Download } from 'lucide-react';
import TrustNotice from '../../components/common/TrustNotice';
import { priceLabel } from '../config/product';

export default function About() {
  return (
    <div className="grid">
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
            <h3 className="h3">How do I purchase the app?</h3>
            <p className="small" style={{ opacity: 0.9 }}>
              Download from the Play Store. One-time purchase of {priceLabel}, no subscription required.
            </p>
          </div>
          
          <div style={{ marginBottom: 20 }}>
            <h3 className="h3">How accurate are the risk indicators?</h3>
            <p className="small" style={{ opacity: 0.9 }}>
              Cyberstition provides risk indicators based on common patterns and signals. These are not guarantees—they help inform your judgment. 
              Always verify suspicious content through independent channels. False positives and false negatives are possible.
            </p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 className="h3">What types of threats does it detect?</h3>
            <p className="small" style={{ opacity: 0.9 }}>
              Cyberstition analyzes messages for phishing, scam patterns, and AI-generated manipulation. It checks social profiles for authenticity signals, 
              inspects image metadata for manipulation indicators, and analyzes email headers for spoofing. It does not detect malware or block threats.
            </p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 className="h3">Does it work offline?</h3>
            <p className="small" style={{ opacity: 0.9 }}>
              Yes! All analysis happens on your device. Once the app is loaded, you can use all tools without an internet connection. 
              No data is sent to external servers.
            </p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 className="h3">What browsers/devices are supported?</h3>
            <p className="small" style={{ opacity: 0.9 }}>
              Cyberstition works in modern browsers (Chrome, Firefox, Safari, Edge) on desktop and mobile devices. 
              The app version is available on Android via the Play Store.
            </p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 className="h3">Is my data private?</h3>
            <p className="small" style={{ opacity: 0.9 }}>
              Yes. All analysis runs on your device. No content, reports, or personal information is sent to any server. 
              Reports are stored locally in your browser. Clearing browser data will remove saved reports.
            </p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 className="h3">Can I get a refund?</h3>
            <p className="small" style={{ opacity: 0.9 }}>
              Refund policies are handled through the Play Store. Please refer to Google's refund policy for app purchases.
            </p>
          </div>
        </div>
      </section>

      <TrustNotice />
    </div>
  );
}
