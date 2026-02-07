import React from 'react';
import TrustNotice from '../../components/common/TrustNotice';
import ImageMetadataAnalyzer from '../../components/tools/ImageMetadataAnalyzer';

export default function Images() {
  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <h1 className="h1">Image Inspector</h1>
        <p className="p">Upload an image to inspect metadata and common manipulation indicators.</p>
      </section>

      <section className="card">
        <ImageMetadataAnalyzer />
      </section>

      <TrustNotice />
    </div>
  );
}
