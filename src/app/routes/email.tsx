import React from 'react';
import TrustNotice from '../../components/common/TrustNotice';
import EmailHeaderAnalyzer from '../../components/tools/EmailHeaderAnalyzer';
import NextSteps from '../../components/common/NextSteps';

export default function Email() {
  return (
    <div className="grid">
      <section className="card section-spacing">
        <h1 className="h1">Email Analyzer</h1>
        <p className="p">Analyze email headers to detect spoofing attempts and routing anomalies.</p>
      </section>

      <section className="card section-spacing">
        <EmailHeaderAnalyzer />
      </section>

      <NextSteps entryPoint="email" />

      <TrustNotice />
    </div>
  );
}
