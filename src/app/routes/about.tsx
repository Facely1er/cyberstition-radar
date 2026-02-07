import React from 'react';
import TrustNotice from '../../components/common/TrustNotice';

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

      <TrustNotice />
    </div>
  );
}
