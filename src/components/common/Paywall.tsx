import React from 'react';

/**
 * Compatibility wrapper for reused SocialCaution components.
 *
 * Cyberstition v1 ships fully functional with NO paywall logic.
 * This component simply renders the provided content blocks.
 */
export default function Paywall(props: {
  productId?: string;
  freePreview?: React.ReactNode;
  lockedContent?: React.ReactNode;
  customTitle?: string;
  customBody?: string;
  title?: string;
  body?: string;
}) {
  return (
    <div>
      {props.freePreview}

      {/* Paywall disabled during development/testing: always render content. */}
      <div className="mt-6">{props.lockedContent}</div>
    </div>
  );
}
