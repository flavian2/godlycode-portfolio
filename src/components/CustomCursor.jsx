import { useEffect, useRef } from 'react';

// God aura colors
const GOD_AURA = {
  ikuku: 'rgba(220,220,255,0.9)',   // silver-white
  oshun: 'rgba(255,159,67,0.9)',    // warm amber gold
  ogun:  'rgba(180,100,40,0.9)',    // forge orange
  eshu:  'rgba(0,196,232,0.9)',     // electric blue
};
const DEFAULT_COLOR = 'var(--gold, #C9A84C)';

// Gold lerp cursor — dot follows exactly, ring follows with delay
const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let animId;

    const lerp = (a, b, t) => a + (b - a) * t;

    const getGodZone = (el) => {
      const zone = el?.closest('[data-god]');
      return zone ? zone.getAttribute('data-god') : null;
    };

    const setAuraColor = (color) => {
      dot.style.background  = color;
      ring.style.borderColor = color;
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;

      // Update aura color based on god zone
      const godKey = getGodZone(e.target);
      if (godKey && GOD_AURA[godKey]) {
        setAuraColor(GOD_AURA[godKey]);
      } else {
        setAuraColor(DEFAULT_COLOR);
      }
    };

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;
      animId = requestAnimationFrame(animate);
    };

    const SELECTORS = 'a, button, [role="button"], input, textarea, select, label, .project-row, .tech-tag, .divine-btn-gold, .divine-btn-ghost';

    const onMouseOver = (e) => {
      if (e.target.closest(SELECTORS)) {
        dot.classList.add('cursor-hover');
        ring.classList.add('cursor-hover');
      }
    };
    const onMouseOut = (e) => {
      if (e.target.closest(SELECTORS)) {
        dot.classList.remove('cursor-hover');
        ring.classList.remove('cursor-hover');
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout',  onMouseOut,  { passive: true });
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout',  onMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
