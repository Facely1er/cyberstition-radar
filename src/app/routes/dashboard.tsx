import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FileText, Trash2, User, LogOut, Clock, Settings } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface Report {
  id: string;
  user_id: string;
  title: string;
  tool_type: string;
  risk_level: string;
  created_at: string;
  content: any;
}

interface Document {
  id: string;
  user_id: string;
  title: string;
  description: string;
  file_type: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, profile, signOut } = useAuth();
  const [allReports, setAllReports] = useLocalStorage<Report[]>('cyberstition_reports', []);
  const [allDocuments, setAllDocuments] = useLocalStorage<Document[]>('cyberstition_documents', []);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'reports' | 'documents' | 'profile'>('reports');
  const navigate = useNavigate();

  const userReports = allReports.filter((r) => r.user_id === user?.id);
  const userDocuments = allDocuments.filter((d) => d.user_id === user?.id);

  const deleteReport = (id: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    setAllReports(allReports.filter((r) => r.id !== id));
  };

  const deleteDocument = (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    setAllDocuments(allDocuments.filter((d) => d.id !== id));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'rgb(239 68 68)';
      case 'medium':
        return 'rgb(251 146 60)';
      default:
        return 'rgb(34 197 94)';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="kicker"><User size={16} /> Dashboard</div>
            <h1 className="h1" style={{ fontSize: 28, marginTop: 8 }}>Welcome back, {profile?.full_name || 'User'}</h1>
            <p className="p">Manage your saved reports, documents, and account settings.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/account" className="btn" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Settings size={16} /> Settings
            </Link>
            <button onClick={handleSignOut} className="btn" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </section>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
          <button
            onClick={() => setActiveTab('reports')}
            className={activeTab === 'reports' ? 'tab-active' : 'tab'}
            style={{
              flex: 1,
              padding: '12px 20px',
              border: 'none',
              background: activeTab === 'reports' ? 'white' : 'transparent',
              borderBottom: activeTab === 'reports' ? '2px solid var(--primary)' : 'none',
              fontWeight: activeTab === 'reports' ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            Reports ({userReports.length})
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={activeTab === 'documents' ? 'tab-active' : 'tab'}
            style={{
              flex: 1,
              padding: '12px 20px',
              border: 'none',
              background: activeTab === 'documents' ? 'white' : 'transparent',
              borderBottom: activeTab === 'documents' ? '2px solid var(--primary)' : 'none',
              fontWeight: activeTab === 'documents' ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            Documents ({userDocuments.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={activeTab === 'profile' ? 'tab-active' : 'tab'}
            style={{
              flex: 1,
              padding: '12px 20px',
              border: 'none',
              background: activeTab === 'profile' ? 'white' : 'transparent',
              borderBottom: activeTab === 'profile' ? '2px solid var(--primary)' : 'none',
              fontWeight: activeTab === 'profile' ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            Profile
          </button>
        </div>

        <div style={{ padding: 20 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <p className="p">Loading...</p>
            </div>
          ) : (
            <>
              {activeTab === 'reports' && (
                <div>
                  {userReports.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                      <FileText size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                      <p className="p">No reports saved yet.</p>
                      <p className="small" style={{ marginTop: 8 }}>
                        Use the analysis tools to create and save reports.
                      </p>
                    </div>
                  ) : (
                    <div className="grid" style={{ gap: 12 }}>
                      {userReports.map((report) => (
                        <div
                          key={report.id}
                          className="card"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 16,
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{report.title}</h3>
                              <span
                                className="badge"
                                style={{
                                  backgroundColor: getRiskColor(report.risk_level),
                                  color: 'white',
                                  textTransform: 'capitalize',
                                }}
                              >
                                {report.risk_level} risk
                              </span>
                            </div>
                            <div className="small" style={{ marginTop: 4, display: 'flex', gap: 12 }}>
                              <span style={{ textTransform: 'capitalize' }}>{report.tool_type}</span>
                              <span style={{ opacity: 0.6, display: 'flex', gap: 4, alignItems: 'center' }}>
                                <Clock size={12} /> {formatDate(report.created_at)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteReport(report.id)}
                            className="btn"
                            style={{
                              padding: 8,
                              minWidth: 'auto',
                              color: 'rgb(239 68 68)',
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'documents' && (
                <div>
                  {userDocuments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                      <FileText size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                      <p className="p">No documents saved yet.</p>
                      <p className="small" style={{ marginTop: 8 }}>
                        Upload documents for analysis and they will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="grid" style={{ gap: 12 }}>
                      {userDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="card"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 16,
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{doc.title}</h3>
                            <p className="small" style={{ marginTop: 4, opacity: 0.8 }}>
                              {doc.description || 'No description'}
                            </p>
                            <div className="small" style={{ marginTop: 4, display: 'flex', gap: 12 }}>
                              <span className="badge">{doc.file_type}</span>
                              <span style={{ opacity: 0.6, display: 'flex', gap: 4, alignItems: 'center' }}>
                                <Clock size={12} /> {formatDate(doc.created_at)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteDocument(doc.id)}
                            className="btn"
                            style={{
                              padding: 8,
                              minWidth: 'auto',
                              color: 'rgb(239 68 68)',
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <div className="grid" style={{ gap: 16 }}>
                    <div>
                      <div className="small" style={{ marginBottom: 8, fontWeight: 600 }}>Full Name</div>
                      <div className="p">{profile?.full_name || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="small" style={{ marginBottom: 8, fontWeight: 600 }}>Email Address</div>
                      <div className="p">{profile?.email || user?.email || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="small" style={{ marginBottom: 8, fontWeight: 600 }}>Account Created</div>
                      <div className="p">{profile?.created_at ? formatDate(profile.created_at) : 'N/A'}</div>
                    </div>
                    <div className="card" style={{ padding: 12, backgroundColor: 'rgb(240 253 244)', border: '1px solid rgb(34 197 94)' }}>
                      <div className="small" style={{ color: 'rgb(21 128 61)' }}>
                        All your data is stored locally on your device. No information is sent to external servers.
                      </div>
                    </div>
                    <Link to="/account" className="btn primary" style={{ width: 'fit-content', display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Settings size={16} /> Manage Account Settings
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
