import ScrollReveal from '../ScrollReveal';

const WindIntro = () => (
  <section style={{
    padding: 'clamp(60px,8vw,100px) 0',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Faint horizontal rule */}
    <div style={{
      position: 'absolute',
      top: '50%',
      left: 0, right: 0,
      height: '1px',
      background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.08), transparent)',
      pointerEvents: 'none',
    }} />

    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(24px,5vw,80px)', textAlign: 'center' }}>
      <ScrollReveal direction="up">
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          opacity: 0.6,
          marginBottom: '32px',
        }}>
          ✶ Ikuku Speaks
        </p>

        <blockquote style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(20px,3vw,32px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--text)',
          lineHeight: 1.7,
          letterSpacing: '1px',
          margin: '0 0 32px',
        }}>
          "Ikuku anọ n'ebe nile."
        </blockquote>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          opacity: 0.7,
          marginBottom: '16px',
        }}>
          The wind is everywhere.
        </p>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--text-dim)',
          lineHeight: 1.8,
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          Before you spoke, the wind carried your vision here.
          Four divine forces, forged in African mythology, reawakened
          for the digital age — ready to build what others call impossible.
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default WindIntro;
