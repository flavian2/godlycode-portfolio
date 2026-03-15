import ScrollReveal from '../ScrollReveal';

const STEPS = [
  {
    number: '01',
    title:  'Divine Discovery',
    desc:   'Ikuku senses your vision. A deep consultation that captures your goals, constraints and ambitions. No templates — every project is unique.',
    symbol: '⟡',
  },
  {
    number: '02',
    title:  'Sacred Blueprint',
    desc:   'A divine project blueprint is forged — architecture, stack, timeline, and team assignment. The gods are briefed before you say another word.',
    symbol: '✦',
  },
  {
    number: '03',
    title:  'The Forge',
    desc:   "Oshun crafts the interface. Ogun builds the engine. Every component forged to production standards — not a prototype, the real thing.",
    symbol: '✶',
  },
  {
    number: '04',
    title:  'Trial By Fire',
    desc:   'Rigorous testing across devices, edge cases, and load scenarios. Eshu tracks every milestone. What breaks in testing never breaks in production.',
    symbol: '⊕',
  },
  {
    number: '05',
    title:  'Divine Delivery',
    desc:   'Your empire, handed to you. Full handover: documentation, source code, deployment, and ongoing divine support from the council.',
    symbol: '✧',
  },
];

const DivineProcess = () => (
  <section id="process" style={{ padding: 'clamp(80px,10vw,140px) 0', position: 'relative' }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>

      {/* Header */}
      <ScrollReveal>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '10px',
          letterSpacing: '6px', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '12px',
        }}>
          ✦ How We Work
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px,4vw,48px)',
          fontWeight: 700, color: 'var(--text)',
          letterSpacing: '2px',
          marginBottom: 'clamp(48px,6vw,80px)',
        }}>
          The Divine Process
        </h2>
      </ScrollReveal>

      {/* Steps */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '0',
        position: 'relative',
      }}>
        {/* Connecting gold line (desktop) */}
        <div style={{
          position: 'absolute',
          top: '32px',
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.15), rgba(201,168,76,0.15), transparent)',
          pointerEvents: 'none',
        }} />

        {STEPS.map((step, i) => (
          <ScrollReveal key={i} direction="up" delay={i * 0.1}>
            <div
              className="process-circle-wrap"
              style={{
                padding: '0 20px 40px',
                position: 'relative',
                textAlign: 'center',
              }}
            >
              {/* Circle */}
              <div
                className="process-circle"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201,168,76,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  position: 'relative',
                  zIndex: 1,
                  background: 'var(--deep)',
                  transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)';
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(201,168,76,0.2)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  color: 'var(--gold)',
                }}>
                  {step.symbol}
                </span>
              </div>

              {/* Step number */}
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '3px',
                color: 'var(--gold)',
                opacity: 0.5,
                marginBottom: '8px',
              }}>
                {step.number}
              </div>

              {/* Title */}
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--text)',
                letterSpacing: '1px',
                marginBottom: '12px',
              }}>
                {step.title}
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--text-dim)',
                lineHeight: 1.7,
              }}>
                {step.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default DivineProcess;
