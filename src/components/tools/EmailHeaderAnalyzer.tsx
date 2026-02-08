// Email Header Analyzer Component
// Analyzes email headers for phishing and spoofing indicators

import React, { useState, useEffect, useRef } from 'react';
import { Mail, AlertTriangle, ShieldCheck, XCircle, Info, HelpCircle, Download } from 'lucide-react';
import { analyzeEmailHeaders, getEmailRiskLevel } from '../../utils/emailHeaderAnalyzer';
import { mapEmailAnalysisToAlert } from '../../mappers/emailToCautionAlert';
import { useCautionStore } from '../../state/cautionStore';

const EmailHeaderAnalyzer: React.FC = () => {
  const [headerText, setHeaderText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [showHelp, setShowHelp] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addAlert = useCautionStore((s) => s.addAlert);

  const handleAnalyze = () => {
    if (!headerText.trim()) return;

    const analysis = analyzeEmailHeaders(headerText);
    setResult(analysis);

    // Create alert if suspicious
    if (analysis.isSuspicious) {
      const alert = mapEmailAnalysisToAlert(analysis, { 
        id: `email-${Date.now()}`,
        from: analysis.headerInfo.from 
      });
      if (alert) {
        addAlert(alert);
      }
    }
  };

  const handleClear = () => {
    setHeaderText('');
    setResult(null);
  };

  const riskLevel = result ? getEmailRiskLevel(result.riskScore) : null;

  // Free preview (description and privacy notice)
  const freePreview = (
    <div className="mb-6">
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Paste email headers to analyze for spoofing, authentication failures, and phishing indicators
      </p>
      {/* Privacy Notice */}
      <div className="info-box primary">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="info-box-text text-blue-900 dark:text-blue-200" style={{ margin: 0 }}>
              <span className="font-semibold">Privacy First:</span>{' '}
              All analysis happens in your browser. Email headers never leave your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Locked content (the actual tool)
  const lockedContent = (
    <>
      {/* Help Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Show help"
        >
          <HelpCircle className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      {/* Help Section */}
      {showHelp && (
        <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            How to get email headers:
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-cyan-500 mr-2">•</span>
              <span><strong>Gmail:</strong> Open email → Click three dots → "Show original" → Copy all text</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-2">•</span>
              <span><strong>Outlook:</strong> Right-click email → "View source" → Copy all text</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-2">•</span>
              <span><strong>Apple Mail:</strong> View → Message → Raw Source → Copy all text</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-2">•</span>
              <span><strong>Other clients:</strong> Look for "View source" or "Show headers" option</span>
            </li>
          </ul>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Paste email headers here:
          </label>
          <textarea
            ref={textareaRef}
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
            rows={12}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-sm 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                       placeholder-gray-400 dark:placeholder-gray-500 font-mono"
            placeholder="From: sender@example.com&#10;To: recipient@example.com&#10;Subject: Test Email&#10;Date: Mon, 1 Jan 2024 12:00:00 +0000&#10;Authentication-Results: ... (Auto-detects from clipboard on focus)"
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleAnalyze}
            disabled={!headerText.trim()}
            className={`flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
              !headerText.trim()
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-500 hover:to-teal-500 shadow-lg hover:shadow-cyan-500/30 transition-all duration-200 hover:scale-[1.02]'
            }`}
          >
            <Mail className="h-4 w-4 mr-2" />
            Analyze Headers
          </button>
          
          <button
            onClick={async () => {
              try {
                const clipboardText = await navigator.clipboard.readText();
                if (clipboardText) {
                  setHeaderText(clipboardText);
                }
              } catch (err) {
                // Fallback: just clear
                handleClear();
              }
            }}
            className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium 
                       border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                       hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title="Paste from clipboard"
          >
            <Download className="h-4 w-4 mr-2" />
            Paste
          </button>
          
          <button
            onClick={handleClear}
            disabled={!headerText && !result}
            className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium 
                       border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                       hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Clear
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className={`border-2 rounded-xl p-6 ${
          result.isSuspicious
            ? result.riskScore >= 70
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
            : 'border-green-500 bg-green-50 dark:bg-green-900/20'
        }`}>
          <div className="flex items-center mb-4">
            {result.isSuspicious ? (
              <AlertTriangle className={`h-8 w-8 mr-3 ${
                result.riskScore >= 70 ? 'text-red-600' : 'text-orange-600'
              }`} />
            ) : (
              <ShieldCheck className="h-8 w-8 text-green-600 mr-3" />
            )}
            <div>
              <h3 className="text-xl font-bold">
                {result.isSuspicious ? (
                  <span className={result.riskScore >= 70 ? 'text-red-900 dark:text-red-200' : 'text-orange-900 dark:text-orange-200'}>
                    {result.riskScore >= 70 ? '🚨 CRITICAL RISK' : '⚠️ HIGH RISK'}
                  </span>
                ) : (
                  <span className="text-green-900 dark:text-green-200">✓ Low Risk</span>
                )}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Risk Score: <strong>{result.riskScore}%</strong> ({riskLevel})
              </p>
            </div>
          </div>

          {/* Issues */}
          {result.issues.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Detected Issues:</h4>
              <ul className="space-y-1">
                {result.issues.map((issue: string, i: number) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                    <span className="text-gray-800 dark:text-gray-200">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Header Info */}
          <div className="mb-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Header Information:</h4>
            <div className="space-y-2 text-sm">
              {result.headerInfo.from && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">From:</span>{' '}
                  <span className="font-medium">{result.headerInfo.from}</span>
                </div>
              )}
              {result.headerInfo.spf && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">SPF:</span>{' '}
                  <span className={`font-medium ${
                    result.headerInfo.spf === 'pass' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.headerInfo.spf.toUpperCase()}
                  </span>
                </div>
              )}
              {result.headerInfo.dkim && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">DKIM:</span>{' '}
                  <span className={`font-medium ${
                    result.headerInfo.dkim === 'pass' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.headerInfo.dkim.toUpperCase()}
                  </span>
                </div>
              )}
              {result.headerInfo.dmarc && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">DMARC:</span>{' '}
                  <span className={`font-medium ${
                    result.headerInfo.dmarc === 'pass' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.headerInfo.dmarc.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Recommendations:</h4>
            <ul className="space-y-1 text-sm">
              {result.recommendations.map((rec: string, i: number) => (
                <li key={i} className="text-gray-800 dark:text-gray-200">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Educational Footer */}
      <div className="mt-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800 rounded-xl">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 What to look for:</h3>
        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>SPF, DKIM, and DMARC authentication failures</li>
          <li>Mismatched From and Reply-To domains</li>
          <li>Suspicious or typosquatting domains</li>
          <li>Invalid or future dates</li>
          <li>Missing standard email headers</li>
        </ul>
      </div>
    </>
  );

  // Auto-detect email headers from clipboard on focus
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleFocus = async () => {
      if (headerText.trim()) return; // Don't auto-paste if there's already text
      
      try {
        const clipboardText = await navigator.clipboard.readText();
        // Check if it looks like email headers
        if (clipboardText.includes('From:') && clipboardText.includes('To:')) {
          setHeaderText(clipboardText);
        }
      } catch (err) {
        // Clipboard API not available or permission denied
      }
    };

    textarea.addEventListener('focus', handleFocus);
    return () => textarea.removeEventListener('focus', handleFocus);
  }, [headerText]);

  return (
    <div className="max-w-4xl mx-auto">
      {freePreview}
      {lockedContent}
    </div>
  );
};

export default EmailHeaderAnalyzer;
