import ScrollReveal from '../ScrollReveal';

const STATS = [
  { number: '4+',   label: 'Production Systems',  sub: 'Live in the wild' },
  { number: '3+',   label: 'Years of Mastery',     sub: 'Self-taught precision' },
  { number: '100%', label: 'Full-Stack Command',   sub: 'Front to back' },
  { number: '∞',    label: 'Divine Dedication',    sub: 'Every single time' },
];

const StatsBar = () => (
  <section style={{
    padding: 'clamp(60px,8vw,100px) 0',
    borderTop: '1px solid rgba(201,168,76,0.06)',
    borderBottom: '1px solid rgba(201,168,76,0.06)',
  }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '0',
      }}>
        {STATS.map((stat, i) => (
          <ScrollReveal key={i} direction="up" delay={i * 0.1}>
            <div
              className="stat-col"
              style={{
                padding: '32px 24px',
                borderLeft: i === 0 ? 'none' : '1px solid rgba(201,168,76,0.08)',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px,5vw,56px)',
                fontWeight: 700,
                color: 'var(--gold)',
                lineHeight: 1,
                marginBottom: '12px',
              }}>
                {stat.number}
              </div>

              <div
                className="stat-underline"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  marginBottom: '6px',
                }}
              >
                {stat.label}
              </div>

              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--text-dim)',
                letterSpacing: '1px',
              }}>
                {stat.sub}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
