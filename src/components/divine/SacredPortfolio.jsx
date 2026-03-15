import { Link } from 'react-router-dom';
import ScrollReveal from '../ScrollReveal';
import { getFeaturedProjects } from '../../data/projects';

const CATEGORY_COLORS = {
  Fintech:    'var(--gold)',
  Logistics:  '#00C4E8',
  Education:  '#9333EA',
  'AI/Trading': '#10B981',
};

const SacredPortfolio = () => {
  const projects = getFeaturedProjects();

  return (
    <section style={{ padding: 'clamp(80px,10vw,140px) 0', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>

        {/* Header */}
        <ScrollReveal>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: 'clamp(48px,6vw,72px)',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '10px',
                letterSpacing: '6px', textTransform: 'uppercase',
                color: 'var(--gold)', marginBottom: '12px',
              }}>
                ✦ Divine Works
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px,4vw,48px)',
                fontWeight: 700, color: 'var(--text)',
                letterSpacing: '2px', margin: 0,
              }}>
                Sacred Portfolio
              </h2>
            </div>
            <Link
              to="/projects"
              style={{
                fontFamily: 'var(--font-body)', fontSize: '11px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'var(--gold)', textDecoration: 'none',
                borderBottom: '1px solid rgba(201,168,76,0.3)',
                paddingBottom: '2px',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'}
            >
              View All →
            </Link>
          </div>
        </ScrollReveal>

        {/* Project rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((project, i) => {
            const color = CATEGORY_COLORS[project.category] || 'var(--gold)';
            return (
              <ScrollReveal key={project.id} direction="up" delay={i * 0.08}>
                <Link
                  to={`/projects/${project.id}`}
                  className="project-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: '24px',
                    padding: '28px 0',
                    borderBottom: '1px solid rgba(201,168,76,0.07)',
                    textDecoration: 'none',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '10px',
                        letterSpacing: '2px', textTransform: 'uppercase',
                        color: color,
                        background: `${color}12`,
                        border: `1px solid ${color}25`,
                        borderRadius: '4px', padding: '3px 8px',
                      }}>
                        {project.category}
                      </span>
                      {project.status === 'live' && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span className="status-dot" />
                          <span style={{
                            fontFamily: 'var(--font-body)', fontSize: '9px',
                            letterSpacing: '2px', textTransform: 'uppercase',
                            color: '#4ade80',
                          }}>Live</span>
                        </span>
                      )}
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(16px,2.5vw,22px)',
                      fontWeight: 600,
                      color: 'var(--text)',
                      marginBottom: '8px',
                      lineHeight: 1.3,
                    }}>
                      {project.title}
                    </h3>

                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--text-dim)',
                      lineHeight: 1.6,
                      maxWidth: '600px',
                    }}>
                      {project.shortDescription}
                    </p>
                  </div>

                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '20px',
                    color: 'var(--gold-dim)',
                    flexShrink: 0,
                    transition: 'color 0.3s, transform 0.3s',
                  }}>
                    →
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SacredPortfolio;
