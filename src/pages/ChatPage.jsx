import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import GodChatWindow from '../components/divine/GodChatWindow';

// Assets
import IkukuImg  from '../assets/img/ikuku-godlycode.jpg';
import OshunImg  from '../assets/img/oshun-godlycode.jpg';
import OgunImg   from '../assets/img/Ogun-godlycode.jpg';
import EshuImg   from '../assets/img/eshu-godlycode.jpg';
import IkukuVid  from '../assets/img/Ikuku-video.mp4';
import OshunVid  from '../assets/img/Oshun-video.mp4';
import OgunVid   from '../assets/img/Ogun-video.mp4';
import EshuVid   from '../assets/img/eshu-video.mp4';

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

const VALID_GODS = ['ikuku', 'oshun', 'ogun', 'eshu'];

const GOD_SIDEBAR = {
  ikuku: { name: 'Ikuku', color: 'var(--gold)',  subtitle: 'God of Wind',
    img: IkukuImg, vid: IkukuVid,
    alt: 'Ikuku — Igbo God of Wind, GodlyCode AI Orchestrator',
    imgClip: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)',
    glow: 'rgba(220,220,255,0.4)',
  },
  oshun: { name: 'Oshun', color: '#FF9F43', subtitle: 'Goddess of Beauty',
    img: OshunImg, vid: OshunVid,
    alt: 'Oshun — Yoruba Goddess of Beauty, GodlyCode Frontend Designer',
    imgClip: 'ellipse(50% 50% at 50% 50%)',
    glow: 'rgba(255,159,67,0.5)',
  },
  ogun:  { name: 'Ogun',  color: '#8899AA', subtitle: 'God of Iron',
    img: OgunImg, vid: OgunVid,
    alt: 'Ogun — Yoruba God of Iron, GodlyCode Backend Engineer',
    imgClip: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
    glow: 'rgba(180,60,20,0.5)',
  },
  eshu:  { name: 'Eshu',  color: '#00C4E8', subtitle: 'God of Crossroads',
    img: EshuImg, vid: EshuVid,
    alt: 'Eshu — Yoruba God of Crossroads, GodlyCode Project Manager',
    imgClip: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
    glow: 'rgba(201,168,76,0.3)',
  },
};

const ChatPage = () => {
  const { god } = useParams();
  const navigate = useNavigate();
  const meta = GOD_SIDEBAR[god];
  const videoRef = useRef(null);

  // Parallax on scroll
  useEffect(() => {
    if (!videoRef.current || isMobile) return;
    const onScroll = () => {
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!VALID_GODS.includes(god) || !meta) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '16px',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--gold)' }}>✦</span>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', letterSpacing: '2px' }}>
          Unknown divine entity
        </h2>
        <Link to="/" style={{
          fontFamily: 'var(--font-body)', fontSize: '11px',
          letterSpacing: '3px', textTransform: 'uppercase',
          color: 'var(--gold)', textDecoration: 'none',
          borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: '2px',
        }}>
          Return to the realm
        </Link>
      </div>
    );
  }

  return (
    <div data-god={god} style={{ minHeight: '100vh', display: 'flex', position: 'relative' }}>
      <style>{`
        .chat-god-btn:hover { background: rgba(201,168,76,0.06) !important; border-color: rgba(201,168,76,0.15) !important; }
        @media (max-width: 768px) { .chat-sidebar { display: none !important; } }
        @media (max-width: 768px) { .chat-mobile-bar { display: flex !important; } }
      `}</style>

      {/* ── Fullscreen video background ── */}
      {!isMobile ? (
        <>
          <video
            ref={videoRef}
            src={meta.vid}
            poster={meta.img}
            preload="none"
            autoPlay muted loop playsInline
            style={{
              position: 'fixed', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', zIndex: 0,
              willChange: 'transform',
            }}
          />
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1,
            background: 'rgba(7,7,7,0.82)',
            pointerEvents: 'none',
          }} />
        </>
      ) : (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0,
          backgroundImage: `url(${meta.img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
      )}

      {/* Per-god radial glow */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: `radial-gradient(ellipse 50% 40% at 70% 30%, ${meta.color}06 0%, transparent 70%)`,
      }} />

      {/* Sidebar */}
      <aside
        className="chat-sidebar"
        style={{
          width: '260px', flexShrink: 0,
          display: 'flex', flexDirection: 'column',
          borderRight: '1px solid rgba(201,168,76,0.08)',
          background: 'rgba(7,7,7,0.7)',
          position: 'relative', zIndex: 10,
        }}
      >
        {/* Logo */}
        <div style={{ padding: '20px 24px 20px', borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '13px',
              fontWeight: 700, color: 'var(--gold)', letterSpacing: '3px',
            }}>GodlyCode</div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '9px',
              letterSpacing: '4px', textTransform: 'uppercase',
              color: 'var(--text-dim)', marginTop: '2px',
            }}>Divine Council</div>
          </Link>
        </div>

        {/* God portrait — sidebar */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={meta.img}
            alt={meta.alt}
            loading="lazy"
            style={{
              width: '100%', height: '300px',
              objectFit: 'cover', objectPosition: 'top center',
              display: 'block',
              clipPath: meta.imgClip,
              filter: `drop-shadow(0 0 20px ${meta.glow})`,
            }}
          />
          {/* Bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
            background: 'linear-gradient(to bottom, transparent, rgba(7,7,7,0.8))',
            pointerEvents: 'none',
          }} />
        </div>

        {/* God switcher */}
        <div style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '9px',
            letterSpacing: '4px', textTransform: 'uppercase',
            color: 'var(--text-dim)', padding: '0 10px', marginBottom: '10px',
          }}>
            The Divine Team
          </div>
          {VALID_GODS.map(g => {
            const m = GOD_SIDEBAR[g];
            const active = g === god;
            return (
              <button
                key={g}
                className="chat-god-btn"
                onClick={() => navigate(`/chat/${g}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', padding: '11px 10px', borderRadius: '6px',
                  background: active ? `${m.color}10` : 'none',
                  border: active ? `1px solid ${m.color}22` : '1px solid transparent',
                  cursor: 'none', textAlign: 'left',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                <div style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: m.color, opacity: active ? 1 : 0.25,
                  flexShrink: 0, transition: 'opacity 0.2s',
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '12px',
                    fontWeight: 700, letterSpacing: '1px',
                    color: active ? m.color : 'var(--text-dim)',
                    transition: 'color 0.2s',
                  }}>{m.name}</div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: '10px',
                    color: 'var(--text-dim)', opacity: 0.5,
                    letterSpacing: '1px', whiteSpace: 'nowrap',
                    overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{m.subtitle}</div>
                </div>
                {active && (
                  <div style={{
                    width: '2px', height: '18px',
                    background: m.color, borderRadius: '1px', flexShrink: 0,
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom back link */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(201,168,76,0.06)' }}>
          <Link to="/" style={{
            fontFamily: 'var(--font-body)', fontSize: '10px',
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--text-dim)', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
          >
            ← Return
          </Link>
        </div>
      </aside>

      {/* Mobile god bar */}
      <div
        className="chat-mobile-bar"
        style={{
          display: 'none',
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
          background: 'rgba(7,7,7,0.95)',
          borderTop: '1px solid rgba(201,168,76,0.08)',
          padding: '8px 12px', gap: '8px', overflowX: 'auto',
        }}
      >
        {VALID_GODS.map(g => {
          const m = GOD_SIDEBAR[g];
          const active = g === god;
          return (
            <button
              key={g}
              onClick={() => navigate(`/chat/${g}`)}
              style={{
                flexShrink: 0, padding: '8px 14px', borderRadius: '20px',
                background: active ? `${m.color}18` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${active ? m.color + '35' : 'rgba(255,255,255,0.06)'}`,
                fontFamily: 'var(--font-body)', fontSize: '11px',
                letterSpacing: '1px', color: active ? m.color : 'var(--text-dim)',
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}
            >
              {m.name}
            </button>
          );
        })}
      </div>

      {/* Chat area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
        <GodChatWindow god={god} />
      </main>
    </div>
  );
};

export default ChatPage;
