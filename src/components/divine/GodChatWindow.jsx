import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { streamMessage, getHistory, getBlueprint, getSessionId, GOD_META } from '../../services/divineService';

// God portrait imports
import IkukuImg from '../../assets/img/ikuku-godlycode.jpg';
import OshunImg from '../../assets/img/oshun-godlycode.jpg';
import OgunImg  from '../../assets/img/Ogun-godlycode.jpg';
import EshuImg  from '../../assets/img/eshu-godlycode.jpg';

const GOD_PORTRAITS = { ikuku: IkukuImg, oshun: OshunImg, ogun: OgunImg, eshu: EshuImg };

const GOD_COLORS = {
  ikuku: { primary: '#C9A84C', secondary: '#8B6914' },
  oshun: { primary: '#FF9F43', secondary: '#e07b1e' },
  ogun:  { primary: '#8899AA', secondary: '#4a5568' },
  eshu:  { primary: '#00C4E8', secondary: '#0077B6' },
};

const GOD_DISPLAY = {
  ikuku: { name: 'Ikuku',  subtitle: 'God of Wind · The Orchestrator',  symbol: '⟡' },
  oshun: { name: 'Oshun',  subtitle: 'Goddess of Beauty · Frontend',     symbol: '✦' },
  ogun:  { name: 'Ogun',   subtitle: 'God of Iron · Backend & DevOps',   symbol: '✶' },
  eshu:  { name: 'Eshu',   subtitle: 'God of Crossroads · Project Lead',  symbol: '⊕' },
};

const GodChatWindow = ({ god, preloadedMessage = null }) => {
  const meta    = GOD_META[god];
  const display = GOD_DISPLAY[god] || GOD_DISPLAY.ikuku;
  const colors  = GOD_COLORS[god] || GOD_COLORS.ikuku;
  const sessionId = getSessionId();
  const navigate  = useNavigate();

  const [messages,     setMessages]     = useState([]);
  const [input,        setInput]        = useState('');
  const [isStreaming,  setIsStreaming]   = useState(false);
  const [streamText,   setStreamText]   = useState('');
  const [blueprint,    setBlueprint]    = useState(null);
  const [assignedGods, setAssignedGods] = useState([]);
  const [showBlueprint,setShowBlueprint]= useState(false);
  const [isLoading,    setIsLoading]    = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const idleRef        = useRef(null);

  // Load history + blueprint
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const [history, bp] = await Promise.all([
        getHistory(god, sessionId),
        getBlueprint(sessionId),
      ]);

      if (bp) { setBlueprint(bp); setAssignedGods(bp.assignedGods || []); }

      if (history.length > 0) {
        setMessages(history.map(m => ({ role: m.role, content: m.content })));
      } else if (god === 'ikuku') {
        setMessages([{
          role: 'assistant',
          content: 'I am Ikuku — the wind that moves through all things. I felt your presence before you arrived. Tell me of your vision. I am already listening.',
        }]);
      } else {
        // Trigger briefed greeting from non-Ikuku gods
        const trigger = bp
          ? `[Client has arrived. Ikuku has briefed you. The project is: ${bp.projectType || 'a digital project'}. Greet them as if you already know everything about their vision. Do not mention this trigger message.]`
          : '[Client has arrived. Greet them with divine authority and introduce yourself.]';

        let acc = '';
        setIsStreaming(true);
        await streamMessage(god, trigger, sessionId,
          t => { acc += t; setStreamText(acc); },
          result => {
            setIsStreaming(false); setStreamText('');
            setMessages([{ role: 'assistant', content: result.fullText || acc, isGreeting: true }]);
          },
          () => {
            setIsStreaming(false); setStreamText('');
            setMessages([{ role: 'assistant', content: `I am ${display.name}. The wind told me of your arrival. Speak — I am ready.`, isGreeting: true }]);
          }
        );
      }
      setIsLoading(false);
    };
    load();
  }, [god, sessionId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamText]);

  // Focus input
  useEffect(() => {
    if (!isLoading) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isLoading]);

  // Preloaded message
  useEffect(() => {
    if (preloadedMessage && !isLoading && messages.length > 0) {
      handleSend(preloadedMessage);
    }
  }, [preloadedMessage, isLoading]);

  // Idle follow-up
  const resetIdle = useCallback(() => {
    if (idleRef.current) clearTimeout(idleRef.current);
    if (messages.length === 0) return;
    const idleLines = {
      ikuku: 'The wind still circles... Are you ready to continue? I am still listening.',
      oshun: 'My river still flows. The canvas is ready — are you?',
      ogun:  'The forge has not gone cold. When you are ready, I am here.',
      eshu:  'The crossroads do not wait forever! Are you ready to continue?',
    };
    idleRef.current = setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: idleLines[god] || idleLines.ikuku, isIdle: true }]);
    }, 3 * 60 * 1000);
  }, [messages.length, god]);

  useEffect(() => {
    if (messages.length > 0) resetIdle();
    return () => { if (idleRef.current) clearTimeout(idleRef.current); };
  }, [messages.length]);

  const handleSend = async (overrideMsg = null) => {
    const userMsg = (overrideMsg || input).trim();
    if (!userMsg || isStreaming) return;
    if (!overrideMsg) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsStreaming(true);
    setStreamText('');
    let acc = '';

    await streamMessage(god, userMsg, sessionId,
      t => { acc += t; setStreamText(acc); },
      result => {
        setIsStreaming(false); setStreamText('');
        setMessages(prev => [...prev, { role: 'assistant', content: result.fullText || acc }]);
        if (result.blueprint) {
          setBlueprint(result.blueprint);
          setAssignedGods(result.blueprint.assignedGods || []);
        }
      },
      err => {
        setIsStreaming(false); setStreamText('');
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'The divine connection was momentarily interrupted. Please try again.',
          isError: true,
        }]);
        console.error(`${god} stream error:`, err);
      }
    );
  };

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  if (!meta) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'relative',
    }}>
      <style>{`
        .god-chat-scroll::-webkit-scrollbar { width: 3px; }
        .god-chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .god-chat-scroll::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.15); border-radius: 2px; }
        .blueprint-panel::-webkit-scrollbar { width: 2px; }
        .blueprint-panel::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); }
      `}</style>

      {/* Blueprint slide-in panel */}
      {showBlueprint && blueprint && (
        <div
          className="blueprint-panel"
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            width: '260px', zIndex: 20,
            background: 'rgba(7,7,7,0.97)',
            borderLeft: `1px solid ${colors.primary}25`,
            overflowY: 'auto',
            padding: '20px',
            animation: 'bpSlideIn 0.3s ease forwards',
          }}
        >
          <style>{`@keyframes bpSlideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '11px',
              letterSpacing: '2px', textTransform: 'uppercase', color: colors.primary,
            }}>
              Divine Blueprint
            </div>
            <button onClick={() => setShowBlueprint(false)} style={{
              background: 'none', border: 'none',
              color: 'var(--text-dim)', cursor: 'none', fontSize: '14px',
            }}>✕</button>
          </div>

          {[
            { label: 'Project Type', value: blueprint.projectType },
            { label: 'Budget',       value: blueprint.budget },
            { label: 'Timeline',     value: blueprint.timeline },
          ].filter(r => r.value).map(row => (
            <div key={row.label} style={{ marginBottom: '16px' }}>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '9px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'var(--text-dim)', marginBottom: '4px',
              }}>{row.label}</div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text)',
              }}>{row.value}</div>
            </div>
          ))}

          {blueprint.techStack?.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '9px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'var(--text-dim)', marginBottom: '8px',
              }}>Tech Stack</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {blueprint.techStack.map(tech => (
                  <span key={tech} style={{
                    fontFamily: 'var(--font-body)', fontSize: '10px',
                    color: colors.primary, letterSpacing: '1px',
                    background: `${colors.primary}10`,
                    border: `1px solid ${colors.primary}25`,
                    borderRadius: '3px', padding: '3px 8px',
                  }}>{tech}</span>
                ))}
              </div>
            </div>
          )}

          {blueprint.assignedGods?.length > 0 && (
            <div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '9px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'var(--text-dim)', marginBottom: '8px',
              }}>Divine Team</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {blueprint.assignedGods.map(g => {
                  const d = GOD_DISPLAY[g];
                  const c = GOD_COLORS[g];
                  if (!d) return null;
                  return (
                    <button
                      key={g}
                      onClick={() => navigate(`/chat/${g}`)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 10px', borderRadius: '6px',
                        background: `${c.primary}08`,
                        border: `1px solid ${c.primary}20`,
                        cursor: 'none', textAlign: 'left',
                        transition: 'background 0.2s',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: c.primary }}>
                        {d.symbol}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '11px',
                        color: c.primary, letterSpacing: '1px',
                      }}>{d.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        borderBottom: `1px solid ${colors.primary}20`,
        background: `linear-gradient(135deg, ${colors.primary}08 0%, transparent 100%)`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Avatar — god portrait */}
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            border: `2px solid ${colors.primary}50`,
            flexShrink: 0, overflow: 'hidden',
            boxShadow: isStreaming
              ? `0 0 0 3px ${colors.primary}60, 0 0 16px ${colors.primary}30`
              : `0 0 0 1px ${colors.primary}25`,
            transition: 'box-shadow 0.4s ease',
          }}>
            {GOD_PORTRAITS[god] ? (
              <img
                src={GOD_PORTRAITS[god]}
                alt={display.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                background: `linear-gradient(135deg, ${colors.primary}25, ${colors.secondary}15)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-body)', fontSize: '18px', color: colors.primary,
              }}>{display.symbol}</div>
            )}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '16px',
                fontWeight: 700, color: colors.primary, letterSpacing: '2px',
              }}>{display.name}</span>
              <span className="status-dot" />
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '10px',
              color: 'var(--text-dim)', letterSpacing: '1px',
            }}>{display.subtitle}</div>
          </div>
        </div>

        {blueprint && (
          <button
            onClick={() => setShowBlueprint(!showBlueprint)}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '10px',
              letterSpacing: '2px', textTransform: 'uppercase',
              color: colors.primary,
              background: showBlueprint ? `${colors.primary}15` : 'rgba(201,168,76,0.06)',
              border: `1px solid ${colors.primary}25`,
              borderRadius: '6px', padding: '6px 14px',
              cursor: 'none', transition: 'background 0.2s',
            }}
          >
            Blueprint {showBlueprint ? '✕' : '→'}
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        className="god-chat-scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {isLoading ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '32px',
                color: colors.primary, marginBottom: '12px',
                animation: 'spin 3s linear infinite',
              }}>{display.symbol}</div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '11px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'var(--text-dim)',
              }}>
                The divine presence is awakening...
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '10px',
                  alignItems: 'flex-start',
                  opacity: 0,
                  animation: `msgFadeIn 0.4s ease ${Math.min(i * 0.05, 0.3)}s forwards`,
                }}
              >
                {msg.role === 'assistant' && (
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: `${colors.primary}15`,
                    border: `1px solid ${colors.primary}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '2px',
                    fontFamily: 'var(--font-body)', fontSize: '12px', color: colors.primary,
                  }}>
                    {display.symbol}
                  </div>
                )}
                <div style={{
                  maxWidth: '74%',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                    : msg.isError
                    ? 'rgba(220,38,38,0.1)'
                    : `${colors.primary}06`,
                  border: msg.role === 'user' ? 'none'
                    : msg.isError ? '1px solid rgba(220,38,38,0.25)'
                    : `1px solid ${colors.primary}14`,
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: msg.role === 'user' ? 'var(--deep)' : msg.isError ? '#fca5a5' : 'var(--text)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {msg.content}
                  {msg.isIdle && (
                    <div style={{
                      fontFamily: 'var(--font-body)', fontSize: '10px',
                      color: colors.primary, opacity: 0.4,
                      marginTop: '4px', fontStyle: 'italic',
                    }}>divine follow-up</div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '2px',
                    fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-dim)',
                  }}>
                    ⊛
                  </div>
                )}
              </div>
            ))}

            {/* Streaming */}
            {(isStreaming || streamText) && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: `${colors.primary}15`,
                  border: `1px solid ${colors.primary}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: '2px',
                  fontFamily: 'var(--font-body)', fontSize: '12px', color: colors.primary,
                }}>
                  {display.symbol}
                </div>
                <div style={{
                  maxWidth: '74%',
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: `${colors.primary}06`,
                  border: `1px solid ${colors.primary}14`,
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px', lineHeight: 1.7,
                  color: 'var(--text)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {streamText || (
                    <span style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '2px 0' }}>
                      {[0,1,2].map(i => (
                        <span key={i} style={{
                          display: 'inline-block', width: '5px', height: '5px',
                          borderRadius: '50%', background: colors.primary,
                          opacity: 0.4, animation: `dotPulse 1.2s ease-in-out ${i*0.2}s infinite`,
                        }} />
                      ))}
                    </span>
                  )}
                  {streamText && <span className="stream-cursor" style={{ borderLeftColor: colors.primary }} />}
                </div>
              </div>
            )}

            {/* Assigned gods after blueprint */}
            {assignedGods.filter(g => g !== god).length > 0 &&
              messages.some(m => m.role === 'assistant') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '38px' }}>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '10px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                }}>
                  ✦ The divine team is ready:
                </div>
                {assignedGods.filter(g => g !== god).map(g => {
                  const d = GOD_DISPLAY[g];
                  const c = GOD_COLORS[g];
                  if (!d) return null;
                  return (
                    <button
                      key={g}
                      onClick={() => navigate(`/chat/${g}`)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 14px', borderRadius: '8px',
                        background: `${c.primary}06`,
                        border: `1px solid ${c.primary}18`,
                        cursor: 'none', textAlign: 'left',
                        maxWidth: '260px',
                        transition: 'background 0.2s, border-color 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `${c.primary}12`;
                        e.currentTarget.style.borderColor = `${c.primary}30`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = `${c.primary}06`;
                        e.currentTarget.style.borderColor = `${c.primary}18`;
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: c.primary }}>
                        {d.symbol}
                      </span>
                      <div>
                        <div style={{
                          fontFamily: 'var(--font-body)', fontSize: '12px',
                          fontWeight: 600, color: c.primary, letterSpacing: '1px',
                        }}>{d.name}</div>
                        <div style={{
                          fontFamily: 'var(--font-body)', fontSize: '10px',
                          color: 'var(--text-dim)', letterSpacing: '0.5px',
                        }}>{d.subtitle.split(' · ')[0]}</div>
                      </div>
                      <span style={{ marginLeft: 'auto', color: c.primary, fontSize: '12px' }}>→</span>
                    </button>
                  );
                })}
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div style={{
        padding: '16px 24px',
        borderTop: `1px solid ${colors.primary}15`,
        background: 'rgba(7,7,7,0.8)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={isStreaming || isLoading}
            placeholder={`Speak to ${display.name}...`}
            rows={1}
            style={{
              flex: 1,
              background: `${colors.primary}05`,
              border: `1px solid ${colors.primary}18`,
              borderRadius: '10px',
              padding: '12px 16px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text)',
              outline: 'none',
              resize: 'none',
              overflow: 'hidden',
              lineHeight: 1.6,
              transition: 'border-color 0.2s',
              minHeight: '48px',
              maxHeight: '120px',
            }}
            onFocus={e => e.currentTarget.style.borderColor = `${colors.primary}40`}
            onBlur={e => e.currentTarget.style.borderColor = `${colors.primary}18`}
            onInput={e => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={isStreaming || isLoading || !input.trim()}
            style={{
              width: '48px', height: '48px',
              borderRadius: '10px',
              background: input.trim() && !isStreaming
                ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                : `${colors.primary}12`,
              border: 'none', cursor: input.trim() && !isStreaming ? 'none' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, opacity: isStreaming ? 0.5 : 1,
              transition: 'background 0.3s, box-shadow 0.3s',
              boxShadow: input.trim() && !isStreaming ? `0 0 20px ${colors.primary}40` : 'none',
            }}
          >
            {isStreaming ? (
              <span style={{
                display: 'block', width: '16px', height: '16px',
                border: `2px solid ${colors.primary}30`,
                borderTopColor: colors.primary,
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke={input.trim() ? 'var(--deep)' : colors.primary}
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '10px',
          letterSpacing: '1px', color: 'var(--text-dim)',
          textAlign: 'center', marginTop: '8px', opacity: 0.4,
        }}>
          Enter to send · Shift+Enter for new line
        </p>
      </div>

      <style>{`
        @keyframes msgFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes dotPulse { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default GodChatWindow;
