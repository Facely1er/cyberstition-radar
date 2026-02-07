import React from 'react';
import TrustNotice from '../../components/common/TrustNotice';
import AICheckMessagePanel from '../../components/tools/AICheckMessagePanel';

export default function Messages() {
  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <h1 className="h1">Message Detective</h1>
        <p className="p">Paste a message to check for common scam, phishing, or AI-generated manipulation patterns.</p>
      </section>

      <section className="card">
        <AICheckMessagePanel />
      </section>

      <TrustNotice />
    </div>
  );
}
