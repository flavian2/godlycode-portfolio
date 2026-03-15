import { useEffect, useRef } from 'react';

// Subtle African wind particle animation for divine chat interfaces
const WindParticles = ({ count = 18, color = '#D4AF37', opacity = 0.35 }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Parse hex color to rgb
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };
    const rgb = hexToRgb(color);

    // Initialize particles — like wind currents and African dust motes
    const initParticles = () => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.3) * 0.8 + 0.3, // drift slightly rightward like wind
        speedY: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * opacity,
        alphaDirection: Math.random() > 0.5 ? 1 : -1,
        alphaSpeed: Math.random() * 0.005 + 0.002,
        // African Adinkra-inspired shapes: some are dots, some are small curved marks
        shape: Math.random() > 0.7 ? 'curve' : 'dot'
      }));
    };
    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(p => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Fade in/out breathing effect
        p.alpha += p.alphaSpeed * p.alphaDirection;
        if (p.alpha >= opacity || p.alpha <= 0.02) {
          p.alphaDirection *= -1;
        }

        // Wrap around edges
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        if (p.y < -10) p.y = canvas.height + 10;

        // Draw particle
        ctx.beginPath();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

        if (p.shape === 'dot') {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Curved wind streak
          ctx.lineWidth = p.size * 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.quadraticCurveTo(
            p.x + p.speedX * 8,
            p.y + p.speedY * 4,
            p.x + p.speedX * 16,
            p.y
          );
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [count, color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default WindParticles;
