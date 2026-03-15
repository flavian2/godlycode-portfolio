import { useEffect, useState } from 'react';
import LogoPrimary from '../assets/img/godlycode-logo.png';

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading]   = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2200);
    const hideTimer = setTimeout(() => setVisible(false), 2800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <style>{`
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(201,168,76,0.4)); opacity: 0.9; }
          50%       { filter: drop-shadow(0 0 24px rgba(201,168,76,0.9)); opacity: 1; }
        }
        @keyframes loadLine {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes loadPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
      `}</style>

      {/* Logo — pulsing gold glow */}
      <img
        src={LogoPrimary}
        alt="GodlyCode"
        style={{
          height: '80px',
          width: 'auto',
          objectFit: 'contain',
          marginBottom: '40px',
          animation: 'logoPulse 2s ease-in-out infinite',
        }}
      />

      {/* Progress bar */}
      <div style={{
        width: '200px',
        height: '1px',
        background: 'rgba(201,168,76,0.1)',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '24px',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          height: '100%',
          background: 'var(--gold, #C9A84C)',
          animation: 'loadLine 2.2s ease forwards',
        }} />
      </div>

      {/* Summoning text */}
      <div style={{
        fontFamily: '"Cinzel", serif',
        fontSize: '12px',
        letterSpacing: '6px',
        textTransform: 'uppercase',
        color: 'rgba(201,168,76,0.5)',
        animation: 'loadPulse 2s ease-in-out infinite 0.5s',
      }}>
        Summoning the gods...
      </div>
    </div>
  );
};

export default LoadingScreen;
