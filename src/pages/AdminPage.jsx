import { useState, useEffect, useCallback } from 'react';
import {
  adminLogin,
  adminGetSessions,
  adminGetSession,
  adminUpdateStatus,
  adminGetStats,
  adminExportSession,
} from '../services/divineService';
import LogoPrimary   from '../assets/img/godlycode-logo.png';
import LogoSecondary from '../assets/img/godlycode-logo2.png';

const STATUS_COLORS = {
  'Lead':        'var(--gold)',
  'In Progress': '#00C4E8',
  'Closed':      '#8899AA',
};

const GOD_DISPLAY = {
  ikuku: { name: 'Ikuku',  color: 'var(--gold)',  symbol: '⟡' },
  oshun: { name: 'Oshun',  color: '#FF9F43',      symbol: '✦' },
  ogun:  { name: 'Ogun',   color: '#8899AA',      symbol: '✶' },
  eshu:  { name: 'Eshu',   color: '#00C4E8',      symbol: '⊕' },
};

/* ── Reusable styled input ── */
const Field = ({ label, type = 'text', value, onChange, placeholder, disabled }) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{
      fontFamily: 'var(--font-body)', fontSize: '10px',
      letterSpacing: '3px', textTransform: 'uppercase',
      color: 'var(--text-dim)', display: 'block', marginBottom: '8px',
    }}>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        width: '100%',
        background: 'rgba(201,168,76,0.03)',
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: '6px',
        padding: '12px 16px',
        fontFamily: 'var(--font-body)', fontSize: '14px',
        color: 'var(--text)', outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
      }}
      onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
      onBlur={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'}
    />
  </div>
);

/* ── Session detail panel ── */
const SessionDetail = ({ sessionId, adminPassword, onStatusUpdate }) => {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeConv, setActiveConv] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const result = await adminGetSession(adminPassword, sessionId);
      setData(result);
      setLoading(false);
    };
    load();
  }, [sessionId, adminPassword]);

  const changeStatus = async (status) => {
    await adminUpdateStatus(adminPassword, sessionId, status);
    onStatusUpdate(sessionId, status);
    setData(prev => ({ ...prev, session: { ...prev.session, status } }));
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--gold)',
        animation: 'spin 3s linear infinite',
      }}>⟡</div>
    </div>
  );

  if (!data?.session) return (
    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)', textAlign: 'center', padding: '40px 0' }}>
      No session data found.
    </p>
  );

  const { session, blueprint, conversations } = data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Session header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <div style={{
            fontFamily: 'monospace', fontSize: '11px',
            color: 'var(--text-dim)', marginBottom: '4px',
          }}>{sessionId}</div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '12px',
            color: 'var(--text-dim)',
          }}>
            Created: {new Date(session.createdAt).toLocaleString()}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['Lead', 'In Progress', 'Closed'].map(s => (
            <button
              key={s}
              onClick={() => changeStatus(s)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '10px',
                letterSpacing: '1px',
                padding: '6px 12px', borderRadius: '4px',
                background: session.status === s ? `${STATUS_COLORS[s]}15` : 'none',
                border: `1px solid ${STATUS_COLORS[s]}35`,
                color: session.status === s ? STATUS_COLORS[s] : 'var(--text-dim)',
                cursor: 'none', transition: 'background 0.2s, color 0.2s',
              }}
            >{s}</button>
          ))}
          <button
            onClick={() => adminExportSession(adminPassword, sessionId)}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '10px',
              letterSpacing: '1px',
              padding: '6px 12px', borderRadius: '4px',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--text-dim)', cursor: 'none',
              transition: 'color 0.2s',
            }}
          >Export →</button>
        </div>
      </div>

      {/* Blueprint */}
      {blueprint && (
        <div style={{
          padding: '16px',
          background: 'rgba(201,168,76,0.03)',
          border: '1px solid rgba(201,168,76,0.12)',
          borderRadius: '6px',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '9px',
            letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '12px',
          }}>✦ Divine Blueprint</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Type',     val: blueprint.projectType },
              { label: 'Budget',   val: blueprint.budget },
              { label: 'Timeline', val: blueprint.timeline },
            ].filter(r => r.val).map(row => (
              <div key={row.label}>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '9px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: 'var(--text-dim)', marginBottom: '2px',
                }}>{row.label}</div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px',
                  color: 'var(--text)',
                }}>{row.val}</div>
              </div>
            ))}
            {blueprint.techStack?.length > 0 && (
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '9px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: 'var(--text-dim)', marginBottom: '6px',
                }}>Tech Stack</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {blueprint.techStack.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-body)', fontSize: '10px',
                      color: 'var(--gold)', letterSpacing: '1px',
                      background: 'rgba(201,168,76,0.08)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      borderRadius: '3px', padding: '2px 8px',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Conversations */}
      {conversations?.length > 0 && (
        <div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '9px',
            letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--text-dim)', marginBottom: '10px',
          }}>Conversations</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {conversations.map(conv => {
              const d = GOD_DISPLAY[conv.god];
              const active = activeConv === conv.god;
              if (!d) return null;
              return (
                <button
                  key={conv.god}
                  onClick={() => setActiveConv(active ? null : conv.god)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 12px', borderRadius: '4px',
                    background: active ? `${d.color}12` : 'none',
                    border: `1px solid ${active ? d.color + '35' : 'rgba(255,255,255,0.08)'}`,
                    color: active ? d.color : 'var(--text-dim)',
                    fontFamily: 'var(--font-body)', fontSize: '11px',
                    cursor: 'none', letterSpacing: '1px',
                    transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                  }}
                >
                  <span>{d.symbol}</span>
                  <span>{d.name}</span>
                  <span style={{
                    background: 'rgba(255,255,255,0.08)',
                    padding: '1px 5px', borderRadius: '3px',
                    fontSize: '10px',
                  }}>{conv.messageCount}</span>
                </button>
              );
            })}
          </div>

          {activeConv && (
            <div style={{
              background: 'rgba(201,168,76,0.02)',
              border: '1px solid rgba(201,168,76,0.08)',
              borderRadius: '6px',
              maxHeight: '360px',
              overflowY: 'auto',
            }}>
              {conversations.find(c => c.god === activeConv)?.messages?.map((msg, i) => {
                const d = GOD_DISPLAY[activeConv];
                return (
                  <div key={i} style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: msg.role === 'user' ? 'rgba(201,168,76,0.03)' : 'none',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontSize: '10px',
                      letterSpacing: '1px', color: 'var(--text-dim)',
                      marginBottom: '4px',
                      display: 'flex', gap: '12px',
                    }}>
                      <span>{msg.role === 'user' ? '⊛ Client' : `${d?.symbol} ${d?.name}`}</span>
                      <span style={{ opacity: 0.4 }}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '13px',
                      color: 'var(--text)', lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                    }}>{msg.content}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Main AdminPage ── */
const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password,      setPassword]      = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError,    setLoginError]    = useState('');
  const [loggingIn,     setLoggingIn]     = useState(false);

  const [sessions,  setSessions]  = useState([]);
  const [total,     setTotal]     = useState(0);
  const [stats,     setStats]     = useState(null);
  const [loadingS,  setLoadingS]  = useState(false);
  const [selected,  setSelected]  = useState(null);
  const [filters,   setFilters]   = useState({ status: '', god: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true); setLoginError('');
    const result = await adminLogin(password);
    if (result.success) { setAdminPassword(password); setAuthenticated(true); }
    else setLoginError(result.error || 'Access denied.');
    setLoggingIn(false);
  };

  const loadSessions = useCallback(async () => {
    setLoadingS(true);
    const f = {};
    if (filters.status) f.status = filters.status;
    if (filters.god)    f.god    = filters.god;
    const result = await adminGetSessions(adminPassword, f);
    setSessions(result.sessions || []);
    setTotal(result.total || 0);
    setLoadingS(false);
  }, [adminPassword, filters]);

  const loadStats = useCallback(async () => {
    const result = await adminGetStats(adminPassword);
    setStats(result);
  }, [adminPassword]);

  useEffect(() => {
    if (authenticated) { loadSessions(); loadStats(); }
  }, [authenticated, loadSessions, loadStats]);

  const handleStatusUpdate = (sessionId, status) => {
    setSessions(prev => prev.map(s => s.sessionId === sessionId ? { ...s, status } : s));
    loadStats();
  };

  /* ── Login screen ── */
  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <img
              src={LogoPrimary}
              alt="GodlyCode"
              style={{
                height: '80px', width: 'auto', objectFit: 'contain',
                display: 'block', margin: '0 auto 20px',
              }}
            />
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px', fontWeight: 700,
              color: 'var(--text)', letterSpacing: '3px',
              marginBottom: '8px',
            }}>Divine Archives</h1>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '13px',
              color: 'var(--text-dim)',
            }}>Only the chosen may enter.</p>
          </div>

          <form
            onSubmit={handleLogin}
            style={{
              padding: '36px',
              background: 'rgba(201,168,76,0.03)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '8px',
            }}
          >
            <Field
              label="Admin Passphrase"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter the divine passphrase..."
              disabled={loggingIn}
            />

            {loginError && (
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '12px',
                color: '#fca5a5', marginBottom: '16px',
              }}>{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loggingIn || !password}
              className="divine-btn-gold"
              style={{
                width: '100%', justifyContent: 'center',
                opacity: loggingIn || !password ? 0.4 : 1,
              }}
            >
              {loggingIn ? 'Verifying...' : 'Enter the Archives'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div style={{ minHeight: '100vh', padding: '40px clamp(16px,4vw,48px)' }}>
      <style>{`
        .admin-row:hover { background: rgba(201,168,76,0.04) !important; }
        .admin-scroll::-webkit-scrollbar { width: 3px; height: 3px; }
        .admin-scroll::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.15); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '40px', flexWrap: 'wrap', gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src={LogoSecondary}
            alt="GodlyCode"
            style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          />
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px,3vw,32px)',
              fontWeight: 700, color: 'var(--gold)',
              letterSpacing: '3px', marginBottom: '4px',
            }}>Divine Archives</h1>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-dim)',
            }}>{total} total sessions</p>
          </div>
        </div>
        <button
          onClick={() => setAuthenticated(false)}
          style={{
            fontFamily: 'var(--font-body)', fontSize: '11px',
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--text-dim)', background: 'none',
            border: '1px solid rgba(201,168,76,0.1)',
            borderRadius: '4px', padding: '8px 16px', cursor: 'none',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--text)';
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--text-dim)';
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)';
          }}
        >Sign Out</button>
      </div>

      {/* Stats bar */}
      {stats && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '12px',
          marginBottom: '32px',
        }}>
          {[
            { label: 'Sessions',    val: stats.totalSessions,  color: 'var(--gold)' },
            { label: 'Leads',       val: stats.leads,          color: 'var(--gold)' },
            { label: 'In Progress', val: stats.inProgress,     color: '#00C4E8' },
            { label: 'Closed',      val: stats.closed,         color: '#8899AA' },
            { label: 'Blueprints',  val: stats.totalBlueprints,color: '#FF9F43' },
          ].map(s => (
            <div key={s.label} style={{
              padding: '16px',
              background: 'rgba(201,168,76,0.02)',
              border: `1px solid ${s.color}15`,
              borderRadius: '6px',
            }}>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '9px',
                letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--text-dim)', marginBottom: '6px',
              }}>{s.label}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px', fontWeight: 700, color: s.color,
              }}>{s.val ?? '—'}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          {
            value: filters.status,
            onChange: e => setFilters(f => ({ ...f, status: e.target.value })),
            options: [
              { val: '', label: 'All statuses' },
              { val: 'Lead', label: 'Lead' },
              { val: 'In Progress', label: 'In Progress' },
              { val: 'Closed', label: 'Closed' },
            ],
          },
          {
            value: filters.god,
            onChange: e => setFilters(f => ({ ...f, god: e.target.value })),
            options: [
              { val: '', label: 'All gods' },
              { val: 'ikuku', label: '⟡ Ikuku' },
              { val: 'oshun', label: '✦ Oshun' },
              { val: 'ogun',  label: '✶ Ogun'  },
              { val: 'eshu',  label: '⊕ Eshu'  },
            ],
          },
        ].map((sel, i) => (
          <select
            key={i}
            value={sel.value}
            onChange={sel.onChange}
            style={{
              background: 'rgba(201,168,76,0.03)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '4px',
              padding: '8px 14px',
              fontFamily: 'var(--font-body)', fontSize: '12px',
              color: 'var(--text)', outline: 'none', cursor: 'none',
            }}
          >
            {sel.options.map(o => (
              <option key={o.val} value={o.val}>{o.label}</option>
            ))}
          </select>
        ))}
        <button
          onClick={loadSessions}
          style={{
            fontFamily: 'var(--font-body)', fontSize: '11px',
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--text-dim)', background: 'none',
            border: '1px solid rgba(201,168,76,0.1)',
            borderRadius: '4px', padding: '8px 16px', cursor: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
        >
          Refresh
        </button>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        {/* Sessions list */}
        <div style={{
          background: 'rgba(201,168,76,0.02)',
          border: '1px solid rgba(201,168,76,0.08)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}>
          {loadingS ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '24px',
                color: 'var(--gold)', animation: 'spin 3s linear infinite',
              }}>⟡</div>
            </div>
          ) : sessions.length === 0 ? (
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '13px',
              color: 'var(--text-dim)', textAlign: 'center', padding: '40px',
            }}>
              No sessions in the archives.
            </p>
          ) : (
            <div className="admin-scroll" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                    {['Session ID', 'Status', 'Gods', 'Last Active'].map(h => (
                      <th key={h} style={{
                        padding: '10px 14px', textAlign: 'left',
                        fontFamily: 'var(--font-body)', fontSize: '9px',
                        letterSpacing: '2px', textTransform: 'uppercase',
                        color: 'var(--text-dim)', fontWeight: 500,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sessions.map(s => {
                    const isSelected = s.sessionId === selected;
                    return (
                      <tr
                        key={s.sessionId}
                        className="admin-row"
                        onClick={() => setSelected(s.sessionId === selected ? null : s.sessionId)}
                        style={{
                          borderBottom: '1px solid rgba(255,255,255,0.04)',
                          background: isSelected ? 'rgba(201,168,76,0.05)' : 'none',
                          cursor: 'none', transition: 'background 0.2s',
                        }}
                      >
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{
                            fontFamily: 'monospace', fontSize: '10px',
                            color: 'var(--text-dim)', display: 'block',
                            maxWidth: '120px', overflow: 'hidden',
                            textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>{s.sessionId}</span>
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{
                            fontFamily: 'var(--font-body)', fontSize: '10px',
                            letterSpacing: '1px',
                            color: STATUS_COLORS[s.status] || 'var(--gold)',
                            background: `${STATUS_COLORS[s.status] || 'var(--gold)'}12`,
                            border: `1px solid ${STATUS_COLORS[s.status] || 'var(--gold)'}25`,
                            borderRadius: '3px', padding: '2px 8px',
                          }}>{s.status}</span>
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {(s.assignedGods || []).map(g => {
                              const d = GOD_DISPLAY[g];
                              return d ? (
                                <span key={g} style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '12px', color: d.color,
                                }}>{d.symbol}</span>
                              ) : null;
                            })}
                          </div>
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{
                            fontFamily: 'var(--font-body)', fontSize: '11px',
                            color: 'var(--text-dim)',
                          }}>
                            {new Date(s.lastActiveAt || s.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Session detail */}
        <div style={{
          background: 'rgba(201,168,76,0.02)',
          border: '1px solid rgba(201,168,76,0.08)',
          borderRadius: '6px',
          padding: '20px',
          overflowY: 'auto',
          maxHeight: '80vh',
        }}>
          {selected ? (
            <SessionDetail
              sessionId={selected}
              adminPassword={adminPassword}
              onStatusUpdate={handleStatusUpdate}
            />
          ) : (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: '200px', flexDirection: 'column', gap: '12px',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px', color: 'var(--gold)', opacity: 0.3,
              }}>✦</span>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '12px',
                letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--text-dim)', opacity: 0.5,
              }}>Select a session</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
