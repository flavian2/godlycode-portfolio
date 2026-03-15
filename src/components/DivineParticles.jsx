import { useMemo } from 'react';

// Pure CSS wind particles — no canvas, no JS animation loop
const DivineParticles = ({ count = 40 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left:      `${Math.random() * 100}%`,
      size:      `${Math.random() * 2 + 1}px`,
      duration:  `${Math.random() * 12 + 8}s`,
      delay:     `${Math.random() * 15}s`,
      drift:     `${(Math.random() - 0.5) * 180}px`,
      opacity:   Math.random() * 0.25 + 0.08,
      bottom:    `${Math.random() * 20}%`,
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {particles.map(p => (
        <span
          key={p.id}
          className="wind-particle"
          style={{
            left:             p.left,
            bottom:           p.bottom,
            width:            p.size,
            height:           p.size,
            '--duration':     p.duration,
            '--delay':        p.delay,
            '--drift':        p.drift,
            '--max-opacity':  p.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default DivineParticles;
