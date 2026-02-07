import React from 'react';
import TrustNotice from '../../components/common/TrustNotice';
import SocialProfileVerifier from '../../components/tools/SocialProfileVerifier';
import NextSteps from '../../components/common/NextSteps';

export default function Profiles() {
  return (
    <div className="grid">
      <section className="card section-spacing">
        <h1 className="h1">Profile Checker</h1>
        <p className="p">Analyze public profile signals to identify potential impersonation, automation, or deception indicators.</p>
      </section>

      <section className="card section-spacing">
        <SocialProfileVerifier />
      </section>

      <NextSteps entryPoint="profiles" />

      <TrustNotice />
    </div>
  );
}
