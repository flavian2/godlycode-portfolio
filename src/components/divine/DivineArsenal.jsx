import ScrollReveal from '../ScrollReveal';

const TECH = [
  // Frontend
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5', 'CSS3',
  // Backend
  'Node.js', 'Express', 'PHP', 'Python', 'REST API', 'GraphQL', 'WebSockets',
  // Databases
  'MongoDB', 'MySQL', 'PostgreSQL', 'Redis',
  // AI / Cloud
  'Claude API', 'OpenAI', 'AWS', 'Vercel', 'Docker',
  // Tools
  'Git', 'Figma', 'Stripe', 'Google Maps API',
];

const DivineArsenal = () => (
  <section style={{ padding: 'clamp(60px,8vw,100px) 0', position: 'relative' }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>

      <ScrollReveal>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '10px',
          letterSpacing: '6px', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '12px',
        }}>
          ✦ The Arsenal
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px,3.5vw,40px)',
          fontWeight: 700, color: 'var(--text)',
          letterSpacing: '2px',
          marginBottom: 'clamp(36px,5vw,56px)',
        }}>
          Divine Technologies
        </h2>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
        }}>
          {TECH.map((tech) => (
            <span
              key={tech}
              className="tech-tag"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                border: '1px solid rgba(201,168,76,0.12)',
                padding: '8px 16px',
                cursor: 'none',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default DivineArsenal;
