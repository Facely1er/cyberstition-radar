import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TrustNotice() {
  return (
    <section className="notice">
      <div className="kicker" style={{ color: 'var(--text)' }}>
        <ShieldCheck size={16} /> Privacy-first by design
      </div>
      <div className="small" style={{ marginTop: 6 }}>
        Cyberstition runs on-device and does not collect personal data. It does not monitor accounts or block threats.
        Results are indicators only—always verify suspicious content through an independent channel.
      </div>
    </section>
  );
}
