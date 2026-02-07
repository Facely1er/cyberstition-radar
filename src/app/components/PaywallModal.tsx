import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Download } from 'lucide-react';
import { priceLabel } from '../config/product';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName?: string;
}

export default function PaywallModal({ isOpen, onClose, toolName }: PaywallModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUnlock = () => {
    onClose();
    // TODO: Replace with actual Play Store URL
    window.open('https://play.google.com/store/apps', '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: 400,
          width: '100%',
          position: 'relative',
          backgroundColor: 'var(--bg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Download size={24} style={{ color: 'var(--primary)' }} />
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Get the App</h2>
        </div>

        <p className="p" style={{ marginBottom: 24 }}>
          {toolName 
            ? `${toolName} is available in the app. Purchase and download to access all tools.`
            : "This feature is available in the app. Purchase and download to access all tools."}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={handleUnlock}
            className="btn primary"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <Download size={16} />
            Get the app — {priceLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

