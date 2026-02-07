import React from 'react';
import { useLocation } from 'react-router-dom';
import TrustNotice from '../../components/common/TrustNotice';
import AICheckMessagePanel from '../../components/tools/AICheckMessagePanel';
import NextSteps from '../../components/common/NextSteps';

export default function Messages() {
  const location = useLocation();
  const isWelcome = (location.state as any)?.welcome;

  return (
    <div className="grid">
      {isWelcome && (
        <section className="card section-spacing" style={{ backgroundColor: 'rgb(240 253 244)', border: '1px solid rgb(34 197 94)' }}>
          <div className="kicker" style={{ color: 'rgb(21 128 61)' }}>
            👋 Welcome to Cyberstition!
          </div>
          <p className="p" style={{ marginTop: 8, color: 'rgb(21 128 61)' }}>
            Analyze a message to get started. After your first check, you'll see recommended next steps to verify other aspects of the content.
          </p>
        </section>
      )}
      <section className="card section-spacing">
        <h1 className="h1">Message Detective</h1>
        <p className="p">Analyze message content for scam, phishing, and AI-generated manipulation patterns.</p>
      </section>

      <section className="card section-spacing">
        <AICheckMessagePanel />
      </section>

      <NextSteps entryPoint="messages" />

      <TrustNotice />
    </div>
  );
}
