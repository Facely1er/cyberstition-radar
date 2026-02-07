// Social Media Profile Verifier Component
// Analyzes social media profiles for fake or AI-generated account indicators

import React, { useState } from 'react';
import { User, AlertTriangle, ShieldCheck, XCircle, Info } from 'lucide-react';
import { analyzeSocialProfile, getProfileRiskLevel } from '../../utils/socialProfileVerifier';
import { mapProfileAnalysisToAlert } from '../../mappers/profileToCautionAlert';
import { useCautionStore } from '../../state/cautionStore';
import { consumeFreeUse } from '../../config/products';
import Paywall from '../common/Paywall';

const SocialProfileVerifier: React.FC = () => {
  const [profileData, setProfileData] = useState({
    username: '',
    displayName: '',
    bio: '',
    accountAge: '',
    postCount: '',
    followerCount: '',
    followingCount: '',
    verified: false,
    location: '',
    website: ''
  });
  const [result, setResult] = useState<any>(null);

  const addAlert = useCautionStore((s) => s.addAlert);

  const handleChange = (field: string, value: string | boolean) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = () => {
    // Check and consume free use if available
    const allowed = consumeFreeUse('ai_profile_verifier');
    if (!allowed) {
      alert('Free limit reached. Upgrade for unlimited access (not wired yet).');
      return;
    }

    const analysis = analyzeSocialProfile({
      username: profileData.username || undefined,
      displayName: profileData.displayName || undefined,
      bio: profileData.bio || undefined,
      accountAge: profileData.accountAge ? parseInt(profileData.accountAge) : undefined,
      postCount: profileData.postCount ? parseInt(profileData.postCount) : undefined,
      followerCount: profileData.followerCount ? parseInt(profileData.followerCount) : undefined,
      followingCount: profileData.followingCount ? parseInt(profileData.followingCount) : undefined,
      verified: profileData.verified,
      location: profileData.location || undefined,
      website: profileData.website || undefined
    });

    setResult(analysis);

    // Create alert if suspicious
    if (analysis.isSuspicious) {
      const alert = mapProfileAnalysisToAlert(analysis, { 
        id: `profile-${Date.now()}`,
        username: profileData.username 
      });
      if (alert) {
        addAlert(alert);
      }
    }
  };

  const handleClear = () => {
    setProfileData({
      username: '',
      displayName: '',
      bio: '',
      accountAge: '',
      postCount: '',
      followerCount: '',
      followingCount: '',
      verified: false,
      location: '',
      website: ''
    });
    setResult(null);
  };

  const riskLevel = result ? getProfileRiskLevel(result.riskScore) : null;

  // Free preview (header and description)
  const freePreview = (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
        <User className="h-8 w-8 text-cyan-500 mr-3" />
        Social Profile Verifier
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Enter profile information to analyze for fake, bot, or AI-generated account indicators
      </p>
      {/* Privacy Notice */}
      <div className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mt-4">
        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Privacy First:</strong> All analysis happens in your browser. Profile data never leaves your device.
        </p>
      </div>
    </div>
  );

  // Locked content (the actual tool)
  const lockedContent = (
    <>
      {/* Input Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={profileData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="@username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={profileData.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Display Name"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio/Description
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Profile bio or description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Account Age (days)
            </label>
            <input
              type="number"
              value={profileData.accountAge}
              onChange={(e) => handleChange('accountAge', e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="365"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Post Count
            </label>
            <input
              type="number"
              value={profileData.postCount}
              onChange={(e) => handleChange('postCount', e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Followers
            </label>
            <input
              type="number"
              value={profileData.followerCount}
              onChange={(e) => handleChange('followerCount', e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Following
            </label>
            <input
              type="number"
              value={profileData.followingCount}
              onChange={(e) => handleChange('followingCount', e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Website
            </label>
            <input
              type="text"
              value={profileData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="https://example.com"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="verified"
              checked={profileData.verified}
              onChange={(e) => handleChange('verified', e.target.checked)}
              className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label htmlFor="verified" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Account is verified
            </label>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={handleAnalyze}
            disabled={!profileData.username && !profileData.displayName}
            className={`flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
              !profileData.username && !profileData.displayName
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-500 hover:to-teal-500 shadow-lg hover:shadow-cyan-500/30 transition-all duration-200 hover:scale-[1.02]'
            }`}
          >
            <User className="h-4 w-4 mr-2" />
            Analyze Profile
          </button>
          
          <button
            onClick={handleClear}
            disabled={!profileData.username && !result}
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

          {/* Patterns */}
          {result.patterns && (
            <div className="mb-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Detected Patterns:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {result.patterns.genericUsername && (
                  <div className="text-red-600 dark:text-red-400">• Generic username</div>
                )}
                {result.patterns.emptyBio && (
                  <div className="text-red-600 dark:text-red-400">• Empty bio</div>
                )}
                {result.patterns.suspiciousRatio && (
                  <div className="text-red-600 dark:text-red-400">• Suspicious follower ratio</div>
                )}
                {result.patterns.newAccount && (
                  <div className="text-red-600 dark:text-red-400">• New account</div>
                )}
                {result.patterns.suspiciousContent && (
                  <div className="text-red-600 dark:text-red-400">• Suspicious content</div>
                )}
              </div>
            </div>
          )}

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
          <li>• Generic or auto-generated usernames</li>
          <li>• Very new accounts with suspicious activity</li>
          <li>• Unusual follower/following ratios</li>
          <li>• Empty bios or suspicious promotional content</li>
          <li>• Accounts following many but having zero followers</li>
        </ul>
      </div>
    </>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Paywall
        productId="ai_profile_verifier"
        freePreview={freePreview}
        lockedContent={lockedContent}
        customTitle="Unlock AI Social Profile Verifier"
        customBody="Get access to advanced social profile analysis to detect fake or AI-generated accounts. Included in Standard Plan."
      />
    </div>
  );
};

export default SocialProfileVerifier;
