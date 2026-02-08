import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FileText, Trash2, Clock, Settings, Home, Download, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePreferences } from '../../contexts/PreferencesContext';

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
  const { preferences, updatePreferences } = usePreferences();

  const reports = allReports;
  const documents = allDocuments;

  const exportData = () => {
    const data = {
      reports: allReports,
      documents: allDocuments,
      preferences: preferences,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberstition-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (confirm('This will replace your current data. Continue?')) {
          if (data.reports) setAllReports(data.reports);
          if (data.documents) setAllDocuments(data.documents);
          if (data.preferences) {
            updatePreferences(data.preferences);
          }
          alert('Data imported successfully!');
        }
      } catch (err) {
        alert('Invalid backup file. Please check the file format.');
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  };

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
            <h1 className="h1">Analysis History</h1>
            <p className="p">View and manage your saved reports and documents.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/" className="btn" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Home size={16} /> Home
            </Link>
            <Link to="/account" className="btn" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Settings size={16} /> Preferences
            </Link>
            <button
              onClick={exportData}
              className="btn"
              style={{ display: 'flex', gap: 8, alignItems: 'center' }}
            >
              <Download size={16} /> Export
            </button>
            <label className="btn" style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
              <Upload size={16} /> Import
              <input
                type="file"
                accept=".json"
                onChange={importData}
                style={{ display: 'none' }}
              />
            </label>
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
                        Use the analysis tools to create reports. They will appear here once saved.
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
                              <h3 className="h3" style={{ margin: 0 }}>{report.title}</h3>
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
                        Documents uploaded for analysis will appear here once saved.
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
                            <h3 className="h3" style={{ margin: 0 }}>{doc.title}</h3>
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
