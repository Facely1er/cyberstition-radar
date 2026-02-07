import React from 'react';
import TrustNotice from '../../components/common/TrustNotice';
import EmailHeaderAnalyzer from '../../components/tools/EmailHeaderAnalyzer';
import NextSteps from '../../components/common/NextSteps';

export default function Email() {
  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <h1 className="h1">Email Analyzer</h1>
        <p className="p">Paste email headers to check for spoofing and routing anomalies.</p>
      </section>

      <section className="card">
        <EmailHeaderAnalyzer />
      </section>

      <NextSteps entryPoint="email" />

      <TrustNotice />
    </div>
  );
}
