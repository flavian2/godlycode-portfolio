import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoPrimary from '../assets/img/godlycode-logo.png';

const NAV_LINKS = [
  { label: 'The Gods',    href: '/#meet-the-gods' },
  { label: 'Our Work',    href: '/projects' },
  { label: 'The Process', href: '/#process' },
  { label: 'The Forge',   href: '/contact' },
];

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        window.location.href = href;
      } else {
        const id = href.replace('/#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <style>{`
        .navbar-logo {
          height: 48px;
          width: auto;
          object-fit: contain;
          transition: height 0.3s ease;
        }
        .navbar-logo.scrolled {
          height: 36px;
        }
        @media (max-width: 768px) {
          .navbar-logo { height: 36px !important; }
        }
      `}</style>

      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: '16px 60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled
            ? 'rgba(7,7,7,0.96)'
            : 'linear-gradient(to bottom, rgba(7,7,7,0.9), transparent)',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.08)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease, padding 0.3s ease',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        {/* Left — Logo */}
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <img
            src={LogoPrimary}
            alt="GodlyCode"
            className={`navbar-logo${scrolled ? ' scrolled' : ''}`}
          />
        </Link>

        {/* Center — Links (desktop) */}
        <div style={{
          display: 'flex',
          gap: '40px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }} className="hidden md:flex">
          {NAV_LINKS.map(link => {
            const isExternal = link.href.startsWith('/#');
            const isActive   = !isExternal && location.pathname === link.href;

            if (isExternal) {
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background: 'none', border: 'none',
                    fontFamily: 'var(--font-body)', fontSize: '11px',
                    fontWeight: 500, textTransform: 'uppercase',
                    letterSpacing: '3px', color: 'var(--text-dim)',
                    cursor: 'none', transition: 'color 0.3s ease', padding: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                >
                  {link.label}
                </button>
              );
            }
            return (
              <Link
                key={link.label}
                to={link.href}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '11px',
                  fontWeight: 500, textTransform: 'uppercase',
                  letterSpacing: '3px',
                  color: isActive ? 'var(--gold)' : 'var(--text-dim)',
                  textDecoration: 'none', transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = isActive ? 'var(--gold)' : 'var(--text-dim)'}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right — CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
          <Link to="/start-project" className="hidden md:inline-flex divine-btn-ghost" style={{ padding: '10px 22px' }}>
            Begin Your Project
          </Link>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
            }}
            aria-label="Toggle menu"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '1px',
                background: menuOpen ? (i === 1 ? 'transparent' : 'var(--gold)') : 'var(--cream)',
                transform: menuOpen
                  ? (i === 0 ? 'rotate(45deg) translate(4px, 4px)' : i === 2 ? 'rotate(-45deg) translate(4px, -4px)' : 'none')
                  : 'none',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 99,
            background: 'rgba(7,7,7,0.98)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '40px', backdropFilter: 'blur(20px)',
          }}
        >
          {/* Logo centered in mobile menu */}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <img
              src={LogoPrimary}
              alt="GodlyCode"
              style={{
                height: '60px', width: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 0 16px rgba(201,168,76,0.5))',
                marginBottom: '10px',
              }}
            />
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '9px',
              letterSpacing: '6px', textTransform: 'uppercase',
              color: 'var(--gold)', opacity: 0.6,
            }}>
              Divine Tech Agency
            </div>
          </div>

          {NAV_LINKS.map(link => {
            const isExternal = link.href.startsWith('/#');
            if (isExternal) {
              return (
                <button
                  key={link.label}
                  onClick={() => { setMenuOpen(false); handleNavClick(link.href); }}
                  style={{
                    background: 'none', border: 'none',
                    fontFamily: 'var(--font-serif)', fontSize: '22px',
                    fontWeight: 400, letterSpacing: '4px',
                    color: 'var(--text)', cursor: 'pointer',
                  }}
                >
                  {link.label}
                </button>
              );
            }
            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-serif)', fontSize: '22px',
                  fontWeight: 400, letterSpacing: '4px',
                  color: 'var(--text)', textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/start-project"
            onClick={() => setMenuOpen(false)}
            className="divine-btn-gold"
            style={{ marginTop: '20px' }}
          >
            Begin Your Project
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
