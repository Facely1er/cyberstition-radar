// AI-Style Phishing Risk Analysis Tool
// User-facing component for analyzing suspicious messages

import React, { useState, useEffect, useRef } from 'react';
import { Brain, AlertTriangle, ShieldCheck, XCircle, HelpCircle, Info, Download } from 'lucide-react';
import { analyzeMessageForPhishingRisk } from '../../utils/aiRiskDetector';
import { mapAIRiskToAlert } from '../../mappers/aiToCautionAlert';
import { useCautionStore } from '../../state/cautionStore';

const AICheckMessagePanel: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{
    riskScore: number;
    reasons: string[];
    isPotentialThreat: boolean;
  } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addAlert = useCautionStore((s) => s.addAlert);

  const handleAnalyze = () => {
    if (!text.trim()) return;

    const risk = analyzeMessageForPhishingRisk(text);
    setResult(risk);

    // Create alert and add to store if threat detected
    const id = `user-paste-${Date.now()}`;
    const cautionAlert = mapAIRiskToAlert(risk, { id }, 'user_paste');
    if (cautionAlert) {
      addAlert(cautionAlert);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  const disabled = !text.trim();
  const charCount = text.length;

  // Free preview (description + privacy notice)
  const freePreview = (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          Paste suspicious messages to surface common phishing, scam, and manipulation patterns.
        </p>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-4 flex-shrink-0"
          title="Show help"
        >
          <HelpCircle className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <div className="info-box primary">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="info-box-text text-blue-900 dark:text-blue-200" style={{ margin: 0 }}>
              <span className="font-semibold">Privacy First:</span>{' '}
              All analysis runs on your device. Text is not uploaded.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Locked content (actual tool)
  const lockedContent = (
    <>

      {/* Help Section */}
      {showHelp && (
        <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            What to look for in suspicious messages:
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span><strong>Urgency tactics:</strong> &quot;Act now!&quot;, &quot;Expires today!&quot;, &quot;Immediate action required&quot;</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span><strong>Account threats:</strong> &quot;Your account will be suspended&quot;, &quot;Unusual activity detected&quot;</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span><strong>Pressure to click:</strong> &quot;Click here to verify&quot;, &quot;Tap now to confirm&quot;</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span><strong>Sensitive info requests:</strong> Asking for passwords, SSN, credit card numbers</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span><strong>Generic greetings:</strong> &quot;Dear customer&quot; instead of your actual name</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
            Remember: Legitimate companies rarely create artificial urgency or ask for sensitive information via email/text.
          </p>
        </div>
      )}

      {/* Main Input Area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Paste message content here:
          </label>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-sm 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Example: URGENT! Your account will be suspended within 24 hours. Click here to verify your identity immediately... (Auto-pastes from clipboard on focus)"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {charCount} character{charCount !== 1 ? 's' : ''}
            </span>
            {charCount > 1000 && (
              <span className="text-xs text-orange-600 dark:text-orange-400">
                Long messages may have more false positives
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleAnalyze}
            disabled={disabled}
            className={`inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              disabled
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-500 hover:to-teal-500 shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02]'
            }`}
          >
            <Brain className="h-4 w-4 mr-2" />
            Analyze for Risks
          </button>
          
          <button
            onClick={async () => {
              try {
                const clipboardText = await navigator.clipboard.readText();
                if (clipboardText) {
                  setText(clipboardText);
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
            disabled={!text && !result}
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

      {/* Results Display */}
      {result && (
        <div className="mt-6">
          <div
            className={`border-2 rounded-xl p-6 ${
              result.isPotentialThreat
                ? result.riskScore >= 80
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                : 'border-green-500 bg-green-50 dark:bg-green-900/20'
            }`}
          >
            {/* Risk Header */}
            <div className="flex items-center mb-4">
              {result.isPotentialThreat ? (
                <AlertTriangle className={`h-8 w-8 mr-3 ${
                  result.riskScore >= 80 ? 'text-red-600' : 'text-orange-600'
                }`} />
              ) : (
                <ShieldCheck className="h-8 w-8 text-green-600 mr-3" />
              )}
              <div>
                <h3 className="text-xl font-bold">
                  {result.isPotentialThreat ? (
                    <span className={result.riskScore >= 80 ? 'text-red-900 dark:text-red-200' : 'text-orange-900 dark:text-orange-200'}>
                      {result.riskScore >= 80 ? '🚨 CRITICAL RISK' : '⚠️ HIGH RISK'}
                    </span>
                  ) : (
                    <span className="text-green-900 dark:text-green-200">✓ Low Risk</span>
                  )}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Risk Score: <strong>{result.riskScore}%</strong>
                </p>
              </div>
            </div>

            {/* Detected Patterns */}
            {result.reasons.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Detected Patterns:
                </h4>
                <ul className="space-y-2">
                  {result.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm">
                      <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                      <span className="text-gray-800 dark:text-gray-200">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {result.isPotentialThreat ? (
              <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What you should do:
                </h4>
                <ul className="space-y-1 text-sm text-gray-800 dark:text-gray-200">
                  {result.riskScore >= 80 ? (
                    <>
                      <li>🚫 <strong>Do NOT click any links in this message</strong></li>
                      <li>🚫 <strong>Do NOT provide any information</strong></li>
                      <li>🗑️ Delete this message immediately</li>
                      <li>✓ If you have an account with this service, visit their official website directly</li>
                      <li>✓ Contact the company through official support channels to verify</li>
                    </>
                  ) : (
                    <>
                      <li>⚠️ Do not click any links in this message</li>
                      <li>✓ Visit the official website directly by typing the URL</li>
                      <li>✓ Contact the service through official support channels</li>
                      <li>✓ Verify if you actually have an account with this service</li>
                    </>
                  )}
                </ul>
              </div>
            ) : (
              <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  While the risk appears low, always verify unexpected messages through official channels. 
                  When in doubt, contact the service directly using contact information from their official website.
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Disclaimer:</strong> This is an automated risk assessment based on common phishing and 
                manipulation patterns. It is not perfect and should not be the only factor in your decision. 
                When in doubt, always verify directly with the service through official channels.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Educational Footer */}
      <div className="mt-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800 rounded-xl">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          💡 Remember: Legitimate services never...
        </h3>
        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>Create artificial urgency or pressure you to act immediately</li>
          <li>Threaten account suspension without prior warning through official channels</li>
          <li>Ask for sensitive information (passwords, SSN, credit cards) via email or text</li>
          <li>Use generic greetings when they have your account information</li>
          <li>Send links that lead to suspicious or misspelled domains</li>
        </ul>
      </div>
    </>
  );

  // Auto-paste from clipboard on focus
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleFocus = async () => {
      if (text.trim()) return; // Don't auto-paste if there's already text
      
      try {
        const clipboardText = await navigator.clipboard.readText();
        if (clipboardText.length > 10 && clipboardText.length < 10000) {
          setText(clipboardText);
        }
      } catch (err) {
        // Clipboard API not available or permission denied
      }
    };

    textarea.addEventListener('focus', handleFocus);
    return () => textarea.removeEventListener('focus', handleFocus);
  }, [text]);

  return (
    <div className="max-w-4xl mx-auto">
      {freePreview}
      {lockedContent}
    </div>
  );
};

export default AICheckMessagePanel;
