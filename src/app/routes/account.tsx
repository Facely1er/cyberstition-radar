import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { User, Settings, Bell, Shield, Save, AlertCircle } from 'lucide-react';

interface UserPreferences {
  emailNotifications: boolean;
  darkModeAuto: boolean;
  saveReportsAutomatically: boolean;
  showRiskWarnings: boolean;
  analysisHistory: number;
}

const defaultPreferences: UserPreferences = {
  emailNotifications: true,
  darkModeAuto: false,
  saveReportsAutomatically: true,
  showRiskWarnings: true,
  analysisHistory: 30,
};

export default function Account() {
  const { profile, updateProfile } = useAuth();
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'cyberstition_preferences',
    defaultPreferences
  );
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await updateProfile({ full_name: fullName });

    if (error) {
      setMessage('Error updating profile');
    } else {
      setMessage('Profile updated successfully');
    }

    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePreferenceChange = (key: keyof UserPreferences, value: boolean | number) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <div className="kicker" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <User size={16} /> Account Settings
        </div>
        <h1 className="h1" style={{ fontSize: 28, marginTop: 8 }}>Your Account</h1>
        <p className="p">Manage your profile, preferences, and security settings.</p>
      </section>

      {message && (
        <div
          className="card"
          style={{
            padding: 12,
            border: message.includes('Error') ? '1px solid rgb(239 68 68)' : '1px solid rgb(34 197 94)',
            backgroundColor: message.includes('Error') ? 'rgb(254 242 242)' : 'rgb(240 253 244)',
          }}
        >
          <div
            className="small"
            style={{
              color: message.includes('Error') ? 'rgb(153 27 27)' : 'rgb(21 128 61)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <AlertCircle size={16} /> {message}
          </div>
        </div>
      )}

      <section className="card">
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <User size={20} /> Profile Information
        </h2>

        <div className="grid" style={{ gap: 16 }}>
          <div>
            <label htmlFor="fullName" className="small" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: 6,
                fontSize: 15,
              }}
            />
          </div>

          <div>
            <div className="small" style={{ marginBottom: 8, fontWeight: 600 }}>Email Address</div>
            <div className="p" style={{ padding: '10px 12px', backgroundColor: '#f5f5f5', borderRadius: 6 }}>
              {profile?.email}
            </div>
            <div className="small" style={{ marginTop: 4, opacity: 0.7 }}>
              Email cannot be changed at this time
            </div>
          </div>

          <div>
            <div className="small" style={{ marginBottom: 8, fontWeight: 600 }}>Account Created</div>
            <div className="p">{profile?.created_at ? formatDate(profile.created_at) : 'N/A'}</div>
          </div>

          <button
            onClick={handleUpdateProfile}
            disabled={saving || fullName === profile?.full_name}
            className="btn primary"
            style={{ display: 'flex', alignItems: 'center', gap: 8, width: 'fit-content' }}
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </section>

      <section className="card">
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings size={20} /> Preferences
        </h2>
        <div className="small" style={{ marginBottom: 16, opacity: 0.8 }}>
          These settings are stored locally on your device
        </div>

        <div className="grid" style={{ gap: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Email Notifications</div>
                <div className="small" style={{ opacity: 0.8 }}>
                  Receive email alerts for important security updates
                </div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: 48, height: 24 }}>
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: preferences.emailNotifications ? 'var(--primary)' : '#ccc',
                    transition: '0.3s',
                    borderRadius: 24,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      content: '',
                      height: 18,
                      width: 18,
                      left: preferences.emailNotifications ? 26 : 3,
                      bottom: 3,
                      backgroundColor: 'white',
                      transition: '0.3s',
                      borderRadius: '50%',
                    }}
                  />
                </span>
              </label>
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Auto-save Reports</div>
                <div className="small" style={{ opacity: 0.8 }}>
                  Automatically save analysis reports to your dashboard
                </div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: 48, height: 24 }}>
                <input
                  type="checkbox"
                  checked={preferences.saveReportsAutomatically}
                  onChange={(e) => handlePreferenceChange('saveReportsAutomatically', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: preferences.saveReportsAutomatically ? 'var(--primary)' : '#ccc',
                    transition: '0.3s',
                    borderRadius: 24,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      content: '',
                      height: 18,
                      width: 18,
                      left: preferences.saveReportsAutomatically ? 26 : 3,
                      bottom: 3,
                      backgroundColor: 'white',
                      transition: '0.3s',
                      borderRadius: '50%',
                    }}
                  />
                </span>
              </label>
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Show Risk Warnings</div>
                <div className="small" style={{ opacity: 0.8 }}>
                  Display detailed warnings for high-risk content
                </div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: 48, height: 24 }}>
                <input
                  type="checkbox"
                  checked={preferences.showRiskWarnings}
                  onChange={(e) => handlePreferenceChange('showRiskWarnings', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: preferences.showRiskWarnings ? 'var(--primary)' : '#ccc',
                    transition: '0.3s',
                    borderRadius: 24,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      content: '',
                      height: 18,
                      width: 18,
                      left: preferences.showRiskWarnings ? 26 : 3,
                      bottom: 3,
                      backgroundColor: 'white',
                      transition: '0.3s',
                      borderRadius: '50%',
                    }}
                  />
                </span>
              </label>
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Analysis History (Days)</div>
              <div className="small" style={{ opacity: 0.8, marginBottom: 12 }}>
                Keep analysis history for this many days
              </div>
              <select
                value={preferences.analysisHistory}
                onChange={(e) => handlePreferenceChange('analysisHistory', Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: 6,
                  fontSize: 15,
                  backgroundColor: 'white',
                }}
              >
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Shield size={20} /> Security
        </h2>

        <div className="grid" style={{ gap: 12 }}>
          <div className="card" style={{ padding: 12, backgroundColor: 'rgb(254 249 195)', border: '1px solid rgb(250 204 21)' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <AlertCircle size={16} style={{ marginTop: 2, color: 'rgb(161 98 7)' }} />
              <div className="small" style={{ color: 'rgb(113 63 18)' }}>
                Password reset and two-factor authentication features coming soon.
              </div>
            </div>
          </div>

          <div>
            <div className="small" style={{ marginBottom: 8, fontWeight: 600 }}>Security Tips</div>
            <ul className="small" style={{ paddingLeft: 20, opacity: 0.8 }}>
              <li>Use a strong, unique password</li>
              <li>Never share your login credentials</li>
              <li>Sign out when using shared devices</li>
              <li>Be cautious of phishing attempts</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
