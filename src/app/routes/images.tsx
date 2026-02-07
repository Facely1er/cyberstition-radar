import React from 'react';
import TrustNotice from '../../components/common/TrustNotice';
import ImageMetadataAnalyzer from '../../components/tools/ImageMetadataAnalyzer';
import NextSteps from '../../components/common/NextSteps';

export default function Images() {
  return (
    <div className="grid">
      <section className="card section-spacing">
        <h1 className="h1">Image Inspector</h1>
        <p className="p">Upload an image to inspect metadata and detect manipulation indicators.</p>
      </section>

      <section className="card section-spacing">
        <ImageMetadataAnalyzer />
      </section>

      <NextSteps entryPoint="images" />

      <TrustNotice />
    </div>
  );
}
