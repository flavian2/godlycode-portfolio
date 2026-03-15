import { Link } from 'react-router-dom';
import LogoSecondary from '../assets/img/godlycode-logo2.png';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      position: 'relative',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      padding: '32px 60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px',
    }}>
      {/* Left — Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <img
          src={LogoSecondary}
          alt="GodlyCode"
          style={{
            height: '60px',
            width: 'auto',
            objectFit: 'contain',
            transition: 'filter 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.filter = 'drop-shadow(0 0 12px rgba(201,168,76,0.6))'}
          onMouseLeave={e => e.currentTarget.style.filter = 'none'}
        />
      </Link>

      {/* Right — copyright + domain */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        letterSpacing: '2px',
        color: 'var(--text-dim)',
        textAlign: 'right',
      }}>
        <span>© {year} GodlyCode</span>
        <span style={{ margin: '0 12px', color: 'var(--gold-dim)' }}>✦</span>
        <span style={{ color: 'var(--gold)' }}>godlycode.com</span>
      </div>
    </footer>
  );
};

export default Footer;
