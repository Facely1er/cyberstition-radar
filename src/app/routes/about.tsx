import React from 'react';
import TrustNotice from '../../components/common/TrustNotice';

export default function About() {
  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <h1 className="h1">How Cyberstition works</h1>
        <p className="p">
          Cyberstition provides on-device indicators to help you recognize deception and AI-enabled manipulation.
          It does not monitor your accounts, block messages, or guarantee detection.
        </p>
        <hr />
        <ul className="small">
          <li><strong>On-device</strong>: analysis runs locally in your browser/app session.</li>
          <li><strong>No collection</strong>: no accounts, no tracking, no uploads to our servers.</li>
          <li><strong>Indicators</strong>: results are signals to inform your judgment — not certainty.</li>
          <li><strong>Verify</strong>: when in doubt, verify through an independent channel.</li>
        </ul>
      </section>

      <TrustNotice />
    </div>
  );
}
