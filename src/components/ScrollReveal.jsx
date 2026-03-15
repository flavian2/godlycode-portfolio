import { useEffect, useRef } from 'react';

// IntersectionObserver-based scroll reveal wrapper
const ScrollReveal = ({
  children,
  direction = 'up',   // 'up' | 'left' | 'right'
  delay = 0,
  className = '',
  as: Tag = 'div',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set delay via inline style
    el.style.transitionDelay = `${delay}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.add('active');
            observer.unobserve(el); // only reveal once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const revealClass = {
    up:    'reveal',
    left:  'reveal-left',
    right: 'reveal-right',
  }[direction] || 'reveal';

  return (
    <Tag ref={ref} className={`${revealClass} ${className}`}>
      {children}
    </Tag>
  );
};

export default ScrollReveal;
