import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FileText, Trash2, Clock, Settings, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Report {
  id: string;
  title: string;
  tool_type: string;
  risk_level: string;
  created_at: string;
  content: any;
}

interface Document {
  id: string;
  title: string;
  description: string;
  file_type: string;
  created_at: string;
}

export default function Dashboard() {
  const [allReports, setAllReports] = useLocalStorage<Report[]>('cyberstition_reports', []);
  const [allDocuments, setAllDocuments] = useLocalStorage<Document[]>('cyberstition_documents', []);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'reports' | 'documents'>('reports');

  const reports = allReports;
  const documents = allDocuments;

  const deleteReport = (id: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    setAllReports(allReports.filter((r) => r.id !== id));
  };

  const deleteDocument = (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    setAllDocuments(allDocuments.filter((d) => d.id !== id));
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
            <div className="kicker"><FileText size={16} /> Dashboard</div>
            <h1 className="h1" style={{ fontSize: 28, marginTop: 8 }}>Your Analysis History</h1>
            <p className="p">View and manage your saved reports and documents.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/" className="btn" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Home size={16} /> Home
            </Link>
            <Link to="/account" className="btn" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Settings size={16} /> Preferences
            </Link>
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
            Reports ({reports.length})
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
            Documents ({documents.length})
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
                  {reports.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                      <FileText size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                      <p className="p">No reports saved yet.</p>
                      <p className="small" style={{ marginTop: 8, marginBottom: 16 }}>
                        Use the analysis tools to create and save reports.
                      </p>
                      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
                        <Link to="/messages" className="btn primary">Start with Messages</Link>
                        <Link to="/profiles" className="btn">Check Profiles</Link>
                        <Link to="/images" className="btn">Inspect Images</Link>
                        <Link to="/email" className="btn">Analyze Email</Link>
                      </div>
                    </div>
                  ) : (
                    <div className="grid" style={{ gap: 12 }}>
                      {reports.map((report) => (
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
                  {documents.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                      <FileText size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                      <p className="p">No documents saved yet.</p>
                      <p className="small" style={{ marginTop: 8, marginBottom: 16 }}>
                        Upload documents for analysis and they will appear here.
                      </p>
                      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
                        <Link to="/images" className="btn primary">Inspect Images</Link>
                        <Link to="/messages" className="btn">Analyze Messages</Link>
                        <Link to="/email" className="btn">Check Email</Link>
                      </div>
                    </div>
                  ) : (
                    <div className="grid" style={{ gap: 12 }}>
                      {documents.map((doc) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
