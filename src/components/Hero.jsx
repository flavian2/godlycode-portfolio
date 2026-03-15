import { useState } from 'react';
import { Link } from 'react-router-dom';
import IkukuVideo  from '../assets/img/Ikuku-video.mp4';
import IkukuPoster from '../assets/img/ikuku-godlycode.jpg';

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

const Hero = () => {
  const [muted, setMuted] = useState(true);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      {!isMobile ? (
        <video
          src={IkukuVideo}
          poster={IkukuPoster}
          preload="auto"
          autoPlay
          muted={muted}
          loop
          playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      ) : (
        /* Mobile: static poster instead of video */
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${IkukuPoster})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          zIndex: 0,
        }} />
      )}

      {/* Layer 1: base dark overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'rgba(7,7,7,0.65)',
      }} />

      {/* Layer 2: gradient — top soft, bottom to black */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(7,7,7,0.3) 0%, rgba(7,7,7,0) 40%, rgba(7,7,7,0) 60%, rgba(7,7,7,1) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Layer 3: African geometric grid */}
      <div className="african-grid" style={{
        position: 'absolute', inset: 0, zIndex: 3,
        opacity: 0.04, pointerEvents: 'none',
      }} />

      {/* Vignette edge */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        boxShadow: 'inset 0 0 150px rgba(7,7,7,0.8)',
        pointerEvents: 'none',
      }} />

      {/* ── MAIN CONTENT ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '900px',
        width: '100%',
      }}>
        {/* Eyebrow */}
        <p className="fade-up" style={{
          fontFamily: 'var(--font-body)', fontSize: '11px',
          fontWeight: 500, letterSpacing: '6px', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '40px', animationDelay: '0.1s',
        }}>
          ✦ Divine African Tech Agency ✦
        </p>

        {/* GODLY — outlined */}
        <h1 className="fade-up" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 8vw, 100px)',
          fontWeight: 900, lineHeight: 1, margin: 0,
          WebkitTextStroke: '1px var(--gold-dim)',
          color: 'transparent', letterSpacing: '4px',
          animationDelay: '0.5s',
        }}>
          GODLY
        </h1>

        {/* CODE — solid gold */}
        <h1 className="fade-up" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 8vw, 100px)',
          fontWeight: 900, lineHeight: 1, margin: '0 0 48px',
          color: 'var(--gold)', letterSpacing: '4px',
          animationDelay: '0.7s',
        }}>
          CODE
        </h1>

        {/* Divider */}
        <div className="fade-up" style={{
          width: '60px', height: '1px',
          background: 'var(--gold-dim)', margin: '0 auto 32px',
          animationDelay: '0.9s',
        }} />

        {/* Tagline */}
        <p className="fade-up" style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px, 2vw, 18px)',
          fontWeight: 300, color: 'var(--text-dim)',
          letterSpacing: '2px', maxWidth: '560px',
          margin: '0 auto 56px', lineHeight: 1.8,
          animationDelay: '1.1s',
        }}>
          We do not build websites.<br />
          We forge digital empires — with the precision of gods.
        </p>

        {/* CTAs */}
        <div className="fade-up" style={{
          display: 'flex', gap: '20px',
          justifyContent: 'center', flexWrap: 'wrap',
          animationDelay: '1.3s',
        }}>
          <Link to="/start-project" className="divine-btn-gold">
            Begin Your Project
          </Link>
          <Link to="/projects" className="divine-btn-ghost">
            View Our Work
          </Link>
        </div>
      </div>

      {/* ── BOTTOM CONTROLS ── */}
      <div style={{
        position: 'absolute', bottom: '40px',
        left: 0, right: 0,
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        gap: '40px',
      }}>
        {/* Mute toggle — desktop only */}
        {!isMobile && (
          <button
            onClick={() => setMuted(m => !m)}
            className="fade-up"
            style={{
              position: 'absolute', left: '40px',
              background: 'rgba(7,7,7,0.5)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontFamily: 'var(--font-body)', fontSize: '11px',
              letterSpacing: '2px', color: 'var(--text-dim)',
              cursor: 'none', transition: 'color 0.2s, border-color 0.2s',
              animationDelay: '2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--gold)';
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-dim)';
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
            }}
          >
            {muted ? '🔇 Muted' : '🔊 Sound On'}
          </button>
        )}

        {/* Scroll indicator */}
        <div className="fade-up" style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '8px',
          animationDelay: '1.8s',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '9px',
            letterSpacing: '4px', textTransform: 'uppercase',
            color: 'var(--text-dim)',
          }}>
            Scroll
          </span>
          <div style={{
            width: '1px', height: '48px',
            background: 'linear-gradient(to bottom, var(--gold-dim), transparent)',
            animation: 'scrollLine 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50%  { opacity: 1; transform: scaleY(1); transform-origin: top; }
          100% { opacity: 0; transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
