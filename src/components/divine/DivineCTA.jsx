import { Link } from 'react-router-dom';
import ScrollReveal from '../ScrollReveal';

const DivineCTA = () => (
  <section style={{ padding: 'clamp(80px,10vw,140px) 0', position: 'relative', overflow: 'hidden' }}>
    {/* Radial gold glow */}
    <div style={{
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%,-50%)',
      width: '600px', height: '400px',
      background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)',
      pointerEvents: 'none',
    }} />

    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(24px,5vw,80px)', textAlign: 'center' }}>
      <ScrollReveal direction="up">
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '10px',
          letterSpacing: '6px', textTransform: 'uppercase',
          color: 'var(--gold)', opacity: 0.7, marginBottom: '24px',
        }}>
          ✦ Begin Your Journey
        </p>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px,5vw,56px)',
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: '2px',
          lineHeight: 1.1,
          marginBottom: '24px',
        }}>
          Ready for the{' '}
          <span style={{
            WebkitTextStroke: '1px var(--gold-dim)',
            color: 'transparent',
          }}>
            Divine
          </span>{' '}
          Experience?
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px,2vw,17px)',
          color: 'var(--text-dim)',
          lineHeight: 1.8,
          maxWidth: '560px',
          margin: '0 auto 16px',
        }}>
          Ikuku is already sensing your vision. The gods are ready.
          Your project will be analyzed, blueprinted and executed with supernatural precision.
        </p>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '13px',
          fontStyle: 'italic',
          color: 'var(--text-dim)',
          opacity: 0.5,
          marginBottom: '48px',
        }}>
          "This is not a regular agency. These are gods."
        </p>

        {/* Gold line divider */}
        <div style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, var(--gold-dim), transparent)',
          margin: '0 auto 48px',
        }} />

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Link to="/start-project" className="divine-btn-gold">
            Begin Your Divine Project
          </Link>
          <Link to="/chat/ikuku" className="divine-btn-ghost">
            Speak with Ikuku
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default DivineCTA;
