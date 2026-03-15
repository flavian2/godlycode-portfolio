import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { streamMessage, getSessionId, GOD_META } from '../../services/divineService';

const IKUKU_OPENING = "I am Ikuku — the wind that moves through all things. I felt your presence before you arrived. Your thoughts have already reached me. Tell me of your vision... I am already listening.";

const GodCard = ({ god, navigate }) => {
  const meta = GOD_META[god];
  if (!meta) return null;
  return (
    <button
      onClick={() => navigate(`/chat/${god}`)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        padding: '10px 12px',
        background: 'rgba(201,168,76,0.06)',
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: '8px',
        cursor: 'none',
        textAlign: 'left',
        transition: 'border-color 0.3s, background 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(201,168,76,0.12)';
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(201,168,76,0.06)';
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)';
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--gold)',
        }}>
          {meta.name}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          color: 'var(--text-dim)',
          marginTop: '2px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {meta.domain}
        </div>
      </div>
      <span style={{ color: 'var(--gold-dim)', fontSize: '12px' }}>→</span>
    </button>
  );
};

const IkukuWelcome = () => {
  const [visible, setVisible]         = useState(false);
  const [labelShown, setLabelShown]   = useState(false);
  const [isOpen, setIsOpen]           = useState(false);
  const [messages, setMessages]       = useState([]);
  const [input, setInput]             = useState('');
  const [streaming, setStreaming]     = useState(false);
  const [streamText, setStreamText]   = useState('');
  const [assignedGods, setAssignedGods] = useState([]);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const navigate       = useNavigate();
  const sessionId      = getSessionId();

  // Appear after 2s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Show label bubble for 4s then fade
  useEffect(() => {
    if (!visible || isOpen) return;
    setLabelShown(true);
    const t = setTimeout(() => setLabelShown(false), 4000);
    return () => clearTimeout(t);
  }, [visible]);

  // Re-show label if closed (but not on first open)
  useEffect(() => {
    if (!isOpen && visible && messages.length > 0) {
      const t = setTimeout(() => {
        setLabelShown(true);
        setTimeout(() => setLabelShown(false), 4000);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamText]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // Opening message typewriter on first open
  useEffect(() => {
    if (!isOpen || messages.length > 0) return;
    sessionStorage.setItem('ikuku_welcomed', 'true');
    let i = 0;
    let out = '';
    setStreamText('');
    const timer = setInterval(() => {
      if (i < IKUKU_OPENING.length) {
        out += IKUKU_OPENING[i];
        setStreamText(out);
        i++;
      } else {
        clearInterval(timer);
        setMessages([{ role: 'assistant', content: IKUKU_OPENING }]);
        setStreamText('');
      }
    }, 22);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Idle follow-up after 3 minutes
  const idleRef = useRef(null);
  const resetIdle = useCallback(() => {
    if (idleRef.current) clearTimeout(idleRef.current);
    if (!isOpen || messages.length === 0) return;
    idleRef.current = setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'The wind still circles your thoughts... Are you ready to speak your vision into being? I am still here. Still listening.',
      }]);
    }, 3 * 60 * 1000);
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (isOpen && messages.length > 0) resetIdle();
    return () => { if (idleRef.current) clearTimeout(idleRef.current); };
  }, [messages.length, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || streaming) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setStreaming(true);
    setStreamText('');
    let accumulated = '';

    await streamMessage(
      'ikuku', userMsg, sessionId,
      (token) => { accumulated += token; setStreamText(accumulated); },
      (result) => {
        setStreaming(false);
        setStreamText('');
        setMessages(prev => [...prev, { role: 'assistant', content: result.fullText || accumulated }]);
        if (result.blueprint?.assignedGods) setAssignedGods(result.blueprint.assignedGods);
      },
      (err) => {
        setStreaming(false);
        setStreamText('');
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'The wind was disrupted. Ensure the divine server is running.',
          isError: true,
        }]);
        console.error('Ikuku error:', err);
      }
    );
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes ikukuPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.7); opacity: 0; }
        }
        @keyframes ikukuPulse2 {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50%       { transform: scale(2.2); opacity: 0; }
        }
        .ikuku-bubble-enter {
          animation: ikukuBubbleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes ikukuBubbleIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .ikuku-panel-enter {
          animation: ikukuPanelIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes ikukuPanelIn {
          from { transform: translateY(40px) scale(0.9); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }
        .ikuku-messages::-webkit-scrollbar { width: 3px; }
        .ikuku-messages::-webkit-scrollbar-track { background: transparent; }
        .ikuku-messages::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }
      `}</style>

      <div style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
      }}>

        {/* Label bubble */}
        {!isOpen && (
          <div style={{
            background: 'rgba(11,9,6,0.96)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '12px 12px 4px 12px',
            padding: '10px 14px',
            maxWidth: '220px',
            opacity: labelShown ? 1 : 0,
            transform: labelShown ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            pointerEvents: labelShown ? 'auto' : 'none',
            cursor: 'none',
          }}
            onClick={() => setIsOpen(true)}
          >
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--text-dim)',
              lineHeight: 1.5,
            }}>
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Ikuku</span> senses your presence...
            </span>
          </div>
        )}

        {/* Floating gold bubble */}
        {!isOpen && (
          <button
            className="ikuku-bubble-enter"
            onClick={() => setIsOpen(true)}
            style={{
              position: 'relative',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%)',
              border: 'none',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(201,168,76,0.45)',
              flexShrink: 0,
            }}
          >
            {/* Pulse rings */}
            <span style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid var(--gold)',
              animation: 'ikukuPulse 2.4s ease-in-out infinite',
            }} />
            <span style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid var(--gold)',
              animation: 'ikukuPulse2 2.4s ease-in-out infinite 0.6s',
            }} />

            {/* Wind symbol */}
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              color: 'var(--deep)',
              fontWeight: 700,
              userSelect: 'none',
              letterSpacing: '-1px',
            }}>
              ⟡
            </span>

            {/* Live dot */}
            <span style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#4ade80',
              border: '2px solid var(--deep)',
            }} />
          </button>
        )}

        {/* Chat panel */}
        {isOpen && (
          <div
            className="ikuku-panel-enter"
            style={{
              width: '380px',
              height: '560px',
              background: 'rgba(7,7,7,0.97)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 0 60px rgba(201,168,76,0.1), 0 30px 60px rgba(0,0,0,0.8)',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 18px',
              borderBottom: '1px solid rgba(201,168,76,0.12)',
              background: 'rgba(201,168,76,0.04)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Avatar */}
                <div style={{
                  position: 'relative',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    color: 'var(--deep)',
                    fontWeight: 700,
                  }}>⟡</span>
                  <span style={{
                    position: 'absolute',
                    bottom: '-1px',
                    right: '-1px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#4ade80',
                    border: '2px solid var(--deep)',
                  }} />
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    letterSpacing: '3px',
                  }}>
                    IKUKU
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    color: 'var(--text-dim)',
                    letterSpacing: '1px',
                  }}>
                    God of Wind · Orchestrator
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() => navigate('/chat/ikuku')}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '1px',
                    color: 'var(--gold)',
                    background: 'rgba(201,168,76,0.08)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    cursor: 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.08)'}
                >
                  Full ↗
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: 'var(--text-dim)',
                    cursor: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.color = 'var(--text)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'var(--text-dim)';
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="ikuku-messages"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    gap: '8px',
                    alignItems: 'flex-start',
                  }}
                >
                  {msg.role === 'assistant' && (
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'rgba(201,168,76,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}>
                      <span style={{ fontSize: '10px', color: 'var(--gold)' }}>⟡</span>
                    </div>
                  )}
                  <div style={{
                    maxWidth: '80%',
                    padding: '10px 13px',
                    borderRadius: msg.role === 'user'
                      ? '14px 14px 4px 14px'
                      : '14px 14px 14px 4px',
                    background: msg.role === 'user'
                      ? 'var(--gold)'
                      : msg.isError
                      ? 'rgba(220,38,38,0.12)'
                      : 'rgba(201,168,76,0.05)',
                    border: msg.role === 'user'
                      ? 'none'
                      : msg.isError
                      ? '1px solid rgba(220,38,38,0.3)'
                      : '1px solid rgba(201,168,76,0.12)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    lineHeight: 1.7,
                    color: msg.role === 'user'
                      ? 'var(--deep)'
                      : msg.isError
                      ? '#fca5a5'
                      : 'var(--text)',
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Streaming / typing indicator */}
              {(streaming || streamText) && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: 'rgba(201,168,76,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '2px',
                  }}>
                    <span style={{ fontSize: '10px', color: 'var(--gold)' }}>⟡</span>
                  </div>
                  <div style={{
                    maxWidth: '80%',
                    padding: '10px 13px',
                    borderRadius: '14px 14px 14px 4px',
                    background: 'rgba(201,168,76,0.05)',
                    border: '1px solid rgba(201,168,76,0.12)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    lineHeight: 1.7,
                    color: 'var(--text)',
                  }}>
                    {streamText || (
                      <span style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '2px 0' }}>
                        {[0, 1, 2].map(i => (
                          <span key={i} style={{
                            display: 'inline-block',
                            width: '4px', height: '4px',
                            borderRadius: '50%',
                            background: 'var(--gold-dim)',
                            animation: `ikukuPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                          }} />
                        ))}
                      </span>
                    )}
                    {streamText && <span className="stream-cursor" />}
                  </div>
                </div>
              )}

              {/* Assigned god cards */}
              {assignedGods.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    paddingLeft: '2px',
                  }}>
                    ✦ The divine team awaits
                  </div>
                  {assignedGods.map(god => (
                    <GodCard key={god} god={god} navigate={navigate} />
                  ))}
                </div>
              )}

              {messages.length > 2 && (
                <button
                  onClick={() => navigate('/chat/ikuku')}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '1px',
                    color: 'var(--gold-dim)',
                    background: 'none',
                    border: 'none',
                    cursor: 'none',
                    textAlign: 'center',
                    padding: '4px 0',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--gold-dim)'}
                >
                  Open full divine chat ↗
                </button>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '12px 14px',
              borderTop: '1px solid rgba(201,168,76,0.1)',
              background: 'rgba(201,168,76,0.02)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  disabled={streaming}
                  placeholder="Speak your vision to the wind..."
                  style={{
                    flex: 1,
                    background: 'rgba(201,168,76,0.04)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--text)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'}
                />
                <button
                  onClick={handleSend}
                  disabled={streaming || !input.trim()}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: input.trim() && !streaming
                      ? 'linear-gradient(135deg, var(--gold), var(--gold-dim))'
                      : 'rgba(201,168,76,0.1)',
                    border: 'none',
                    cursor: input.trim() && !streaming ? 'none' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background 0.3s',
                    opacity: streaming ? 0.5 : 1,
                  }}
                >
                  {streaming ? (
                    <span style={{
                      display: 'block',
                      width: '14px',
                      height: '14px',
                      border: '2px solid rgba(201,168,76,0.3)',
                      borderTopColor: 'var(--gold)',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? 'var(--deep)' : 'var(--gold-dim)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IkukuWelcome;
