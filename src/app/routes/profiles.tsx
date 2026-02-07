import React from 'react';
import TrustNotice from '../../components/common/TrustNotice';
import SocialProfileVerifier from '../../components/tools/SocialProfileVerifier';
import NextSteps from '../../components/common/NextSteps';

export default function Profiles() {
  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <h1 className="h1">Profile Checker</h1>
        <p className="p">Analyze public profile signals to identify potential impersonation, automation, or deception indicators.</p>
      </section>

      <section className="card">
        <SocialProfileVerifier />
      </section>

      <NextSteps entryPoint="profiles" />

      <TrustNotice />
    </div>
  );
}
