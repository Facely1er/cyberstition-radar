import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TrustNotice() {
  return (
    <section className="notice">
      <div className="kicker" style={{ color: 'var(--text)' }}>
        <ShieldCheck size={16} /> Privacy-first by design
      </div>
      <div className="small" style={{ marginTop: 6 }}>
        Cyberstition runs on-device and does not collect personal data. It does not monitor your accounts or block threats.
        Results are high-level indicators only—always verify through an independent channel when something looks suspicious.
      </div>
    </section>
  );
}
