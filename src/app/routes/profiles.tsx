import React from 'react';
import TrustNotice from '../../components/common/TrustNotice';
import SocialProfileVerifier from '../../components/tools/SocialProfileVerifier';

export default function Profiles() {
  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <h1 className="h1">Profile Checker</h1>
        <p className="p">Review public profile signals that may suggest impersonation, automation, or deception.</p>
      </section>

      <section className="card">
        <SocialProfileVerifier />
      </section>

      <TrustNotice />
    </div>
  );
}
