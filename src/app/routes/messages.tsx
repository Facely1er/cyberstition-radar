import React from 'react';
import { useLocation } from 'react-router-dom';
import TrustNotice from '../../components/common/TrustNotice';
import AICheckMessagePanel from '../../components/tools/AICheckMessagePanel';
import NextSteps from '../../components/common/NextSteps';

export default function Messages() {
  const location = useLocation();
  const isWelcome = (location.state as any)?.welcome;

  return (
    <div className="grid" style={{ gap: 14 }}>
      {isWelcome && (
        <section className="card" style={{ backgroundColor: 'rgb(240 253 244)', border: '1px solid rgb(34 197 94)' }}>
          <div className="kicker" style={{ color: 'rgb(21 128 61)' }}>
            👋 Welcome to Cyberstition!
          </div>
          <p className="p" style={{ marginTop: 8, color: 'rgb(21 128 61)' }}>
            Get started by analyzing a message. After your first check, you'll see recommended next steps to verify other aspects of the content.
          </p>
        </section>
      )}
      <section className="card">
        <h1 className="h1">Message Detective</h1>
        <p className="p">Paste a message to check for common scam, phishing, or AI-generated manipulation patterns.</p>
      </section>

      <section className="card">
        <AICheckMessagePanel />
      </section>

      <NextSteps entryPoint="messages" />

      <TrustNotice />
    </div>
  );
}
