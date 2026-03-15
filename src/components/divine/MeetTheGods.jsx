import { useNavigate, Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import ScrollReveal from '../ScrollReveal';
import LazyVideo from './LazyVideo';

// Assets
import IkukuImg  from '../../assets/img/ikuku-godlycode.jpg';
import OshunImg  from '../../assets/img/oshun-godlycode.jpg';
import OgunImg   from '../../assets/img/Ogun-godlycode.jpg';
import EshuImg   from '../../assets/img/eshu-godlycode.jpg';
import OshunVid  from '../../assets/img/Oshun-video.mp4';
import OgunVid   from '../../assets/img/Ogun-video.mp4';
import EshuVid   from '../../assets/img/eshu-video.mp4';

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

const GOD_COLORS = {
  ikuku: 'var(--gold)',
  oshun: '#FF9F43',
  ogun:  '#8899AA',
  eshu:  '#00C4E8',
};

const GOD_DATA = {
  ikuku: {
    name: 'Ikuku', title: 'God of Wind', subtitle: 'The Orchestrator',
    domain: 'Project Discovery & Coordination',
    description: 'The wind that moves through all things. Ikuku senses your project before you speak. He analyzes, blueprints, and commands the divine team with the precision of a storm.',
    phrase: '"I felt your presence before you arrived."',
    nativeTitle: 'Onyenwe-ọchịchọ',
  },
  oshun: {
    name: 'Oshun', title: 'Goddess of Beauty', subtitle: 'Frontend & UI Creator',
    domain: 'Frontend, UI/UX & Design Systems',
    description: 'The river goddess who transforms code into sacred art. Every pixel she touches becomes beauty. Your digital presence will stop hearts.',
    phrase: '"The wind has already told me everything about you."',
    nativeTitle: 'Ẹ wa ẹwa',
  },
  ogun: {
    name: 'Ogun', title: 'God of Iron', subtitle: 'Backend & DevOps Forge',
    domain: 'Backend, APIs, Databases & Infrastructure',
    description: 'The god who forges digital empires in iron. What Ogun builds never breaks, never bends, never fails. Your system will stand for generations.',
    phrase: '"Ikuku\'s wind reached my forge before you did."',
    nativeTitle: 'Irin Gbígbé',
  },
  eshu: {
    name: 'Eshu', title: 'God of Crossroads', subtitle: 'Project Manager & Guide',
    domain: 'Project Management & Timelines',
    description: 'He sees every path, every shortcut, every crossroads. Eshu has already mapped your entire project journey from day one to launch day.',
    phrase: '"Ikuku sent the wind to tell me all about you!"',
    nativeTitle: 'Ọ̀nà Tó Tọ̀',
  },
};

const SMALL_GOD_ASSETS = {
  oshun: { img: OshunImg, vid: OshunVid,
    imgStyle: { borderRadius: '50%', width: '120px', height: '120px', objectFit: 'cover', objectPosition: 'center' },
    imgFilter: 'sepia(20%) saturate(120%) brightness(1.05)',
    overlay: 'rgba(7,7,7,0.75)',
    cardOverlay: 'rgba(7,7,7,0.75)',
    hoverGlow: '0 0 0 3px #FF9F43, 0 0 40px rgba(255,159,67,0.5)',
    defaultGlow: '0 0 0 2px rgba(255,159,67,0.4), 0 0 20px rgba(255,159,67,0.3)',
    alt: 'Oshun — Yoruba Goddess of Beauty, GodlyCode Frontend Designer',
  },
  ogun: { img: OgunImg, vid: OgunVid,
    imgStyle: { clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)', width: '120px', height: '140px', objectFit: 'cover', objectPosition: 'center' },
    imgFilter: 'sepia(10%) saturate(80%) contrast(110%) brightness(0.95)',
    overlay: 'rgba(7,7,7,0.78)',
    cardOverlay: 'rgba(7,7,7,0.78)',
    hoverGlow: '0 0 30px rgba(180,60,20,0.4)',
    defaultGlow: 'none',
    alt: 'Ogun — Yoruba God of Iron, GodlyCode Backend Engineer',
  },
  eshu: { img: EshuImg, vid: EshuVid,
    imgStyle: { clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)', width: '120px', height: '130px', objectFit: 'cover', objectPosition: 'center' },
    imgFilter: 'hue-rotate(0deg)',
    overlay: 'linear-gradient(to right, rgba(40,10,10,0.8) 0%, rgba(7,7,14,0.8) 100%)',
    cardOverlay: 'linear-gradient(to right, rgba(40,10,10,0.8) 0%, rgba(7,7,14,0.8) 100%)',
    hoverGlow: '0 0 20px rgba(201,168,76,0.3), 0 0 40px rgba(26,58,74,0.4)',
    defaultGlow: 'none',
    alt: 'Eshu — Yoruba God of Crossroads, GodlyCode Project Manager',
  },
};

/* Small god card (Oshun / Ogun / Eshu) */
const SmallGodCard = ({ godKey, delay }) => {
  const navigate  = useNavigate();
  const god       = GOD_DATA[godKey];
  const color     = GOD_COLORS[godKey];
  const assets    = SMALL_GOD_ASSETS[godKey];
  const videoRef  = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleEnter = (e) => {
    setHovered(true);
    e.currentTarget.style.background = `${color}08`;
    e.currentTarget.style.borderTopColor = `${color}40`;
    e.currentTarget.style.borderLeftColor = `${color}40`;
    if (videoRef.current) videoRef.current.style.opacity = '0.25';
  };
  const handleLeave = (e) => {
    setHovered(false);
    e.currentTarget.style.background = 'rgba(201,168,76,0.015)';
    e.currentTarget.style.borderTopColor = `${color}22`;
    e.currentTarget.style.borderLeftColor = `${color}22`;
    if (videoRef.current) videoRef.current.style.opacity = '0.15';
  };

  return (
    <ScrollReveal direction="up" delay={delay}>
      <div
        data-god={godKey}
        onClick={() => navigate(`/chat/${godKey}`)}
        style={{
          position: 'relative',
          padding: '36px 28px',
          borderTop: `1px solid ${color}22`,
          borderLeft: `1px solid ${color}22`,
          background: 'rgba(201,168,76,0.015)',
          cursor: 'none', overflow: 'hidden',
          transition: 'background 0.4s ease, border-color 0.4s ease',
          minHeight: '340px',
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Video background */}
        {!isMobile && (
          <LazyVideo
            ref={videoRef}
            src={assets.vid}
            poster={assets.img}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: 0.15,
              transition: 'opacity 0.5s ease',
              zIndex: 0,
            }}
          />
        )}

        {/* Video overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: assets.cardOverlay,
          pointerEvents: 'none',
        }} />

        {/* Ghost name */}
        <div style={{
          position: 'absolute', bottom: '-20px', right: '-10px', zIndex: 1,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(60px,8vw,90px)',
          fontWeight: 900, color: color, opacity: 0.04,
          letterSpacing: '4px', pointerEvents: 'none',
          userSelect: 'none', lineHeight: 1,
        }}>
          {god.name.toUpperCase()}
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* God portrait */}
          <div style={{ marginBottom: '20px', display: 'inline-block' }}>
            <img
              src={assets.img}
              alt={assets.alt}
              loading="lazy"
              style={{
                ...assets.imgStyle,
                display: 'block',
                filter: assets.imgFilter,
                boxShadow: hovered ? assets.hoverGlow : assets.defaultGlow,
                transition: 'box-shadow 0.4s ease, filter 0.4s ease, transform 0.4s ease',
                transform: hovered ? 'scale(1.03)' : 'scale(1)',
              }}
            />
          </div>

          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '9px',
            letterSpacing: '3px', textTransform: 'uppercase',
            color: color, opacity: 0.6, marginBottom: '16px',
          }}>
            {god.nativeTitle}
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px,3vw,28px)',
            fontWeight: 700, color: color,
            letterSpacing: '2px', marginBottom: '4px', lineHeight: 1.1,
          }}>
            {god.name}
          </h3>

          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '11px',
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--text-dim)', marginBottom: '20px',
          }}>
            {god.title} · {god.subtitle}
          </div>

          <div style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)', fontSize: '10px',
            letterSpacing: '1px', color: color,
            background: `${color}10`, border: `1px solid ${color}25`,
            borderRadius: '4px', padding: '4px 10px', marginBottom: '20px',
          }}>
            {god.domain}
          </div>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '13px',
            color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: '20px',
          }}>
            {god.description}
          </p>

          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: '12px',
            fontStyle: 'italic', color: color, opacity: 0.7, marginBottom: '24px',
          }}>
            {god.phrase}
          </p>

          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '11px',
            letterSpacing: '3px', textTransform: 'uppercase', color: color,
          }}>
            Speak with {god.name} →
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

/* Main section */
const MeetTheGods = () => {
  const navigate  = useNavigate();
  const [ikukuHovered, setIkukuHovered] = useState(false);

  return (
    <section id="meet-the-gods" style={{ position: 'relative', padding: 'clamp(80px,10vw,140px) 0' }}>
      <style>{`
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>

        {/* Section label + title */}
        <ScrollReveal>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '10px',
            letterSpacing: '6px', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '16px',
          }}>
            ✦ The Divine Council
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px,5vw,56px)',
            fontWeight: 700, color: 'var(--text)',
            letterSpacing: '2px',
            marginBottom: 'clamp(48px,6vw,80px)',
          }}>
            Meet The Gods
          </h2>
        </ScrollReveal>

        {/* Ikuku — full-width hero card */}
        <ScrollReveal direction="up">
          <div
            data-god="ikuku"
            onClick={() => navigate('/chat/ikuku')}
            onMouseEnter={() => setIkukuHovered(true)}
            onMouseLeave={() => setIkukuHovered(false)}
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '40px',
              alignItems: 'center',
              padding: 'clamp(40px,5vw,64px)',
              border: `1px solid rgba(201,168,76,${ikukuHovered ? '0.35' : '0.2'})`,
              background: `rgba(201,168,76,${ikukuHovered ? '0.06' : '0.03'})`,
              marginBottom: '2px',
              cursor: 'none', overflow: 'hidden',
              transition: 'background 0.4s, border-color 0.4s',
            }}
          >
            {/* Ghost IKUKU text — deep background */}
            <div style={{
              position: 'absolute', right: '-20px', bottom: '-30px',
              fontFamily: '"Cinzel Decorative", serif',
              fontSize: 'clamp(80px,14vw,200px)',
              fontWeight: 900, color: 'var(--gold)', opacity: 0.025,
              letterSpacing: '8px', pointerEvents: 'none',
              userSelect: 'none', lineHeight: 1,
              transform: 'rotate(-15deg)',
            }}>
              IKUKU
            </div>

            {/* Left content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '9px',
                letterSpacing: '4px', textTransform: 'uppercase',
                color: 'var(--gold)', opacity: 0.7, marginBottom: '20px',
              }}>
                {GOD_DATA.ikuku.nativeTitle} · The Orchestrator
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px,4vw,48px)',
                fontWeight: 700, color: 'var(--gold)',
                letterSpacing: '3px', lineHeight: 1, marginBottom: '8px',
              }}>
                Ikuku
              </h3>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '11px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'var(--text-dim)', marginBottom: '24px',
              }}>
                God of Wind · Project Discovery
              </div>

              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '15px',
                color: 'var(--text-dim)', lineHeight: 1.8,
                maxWidth: '480px', marginBottom: '32px',
              }}>
                {GOD_DATA.ikuku.description}
              </p>

              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '13px',
                fontStyle: 'italic', color: 'var(--gold)',
                opacity: 0.8, marginBottom: '32px',
              }}>
                {GOD_DATA.ikuku.phrase}
              </p>

              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '11px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'var(--gold)',
              }}>
                Speak with Ikuku →
              </div>
            </div>

            {/* Right — Ikuku portrait with divine clip path */}
            <div style={{
              position: 'relative',
              flexShrink: 0,
              zIndex: 1,
            }}>
              {/* Gold gradient overlay on image — bottom fade */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'linear-gradient(to top, rgba(201,168,76,0.15) 0%, transparent 50%)',
                clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)',
                pointerEvents: 'none',
              }} />
              <img
                src={IkukuImg}
                alt="Ikuku — Igbo God of Wind, GodlyCode AI Orchestrator"
                style={{
                  height: '500px',
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  transform: ikukuHovered ? 'scale(1.03)' : 'scale(1)',
                  transition: 'transform 0.5s ease',
                  filter: ikukuHovered
                    ? 'drop-shadow(0 0 20px rgba(201,168,76,0.3))'
                    : 'none',
                }}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* 3-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          marginBottom: 'clamp(60px,8vw,100px)',
        }}>
          {['oshun', 'ogun', 'eshu'].map((key, i) => (
            <SmallGodCard key={key} godKey={key} delay={i * 0.1} />
          ))}
        </div>

        {/* CEO Card */}
        <ScrollReveal direction="up" delay={0.2}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '32px',
            alignItems: 'center',
            padding: 'clamp(32px,4vw,56px)',
            border: '1px solid rgba(201,168,76,0.15)',
            background: 'rgba(201,168,76,0.02)',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '9px',
                letterSpacing: '4px', textTransform: 'uppercase',
                color: 'var(--gold)', opacity: 0.6, marginBottom: '12px',
              }}>
                Supreme CEO · Human Overseer
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px,3vw,32px)',
                fontWeight: 700, color: 'var(--text)',
                letterSpacing: '2px', marginBottom: '16px',
              }}>
                GodlyCode — The Founder
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '14px',
                color: 'var(--text-dim)', lineHeight: 1.8, maxWidth: '560px',
              }}>
                Flavian "Godlycode" O. — the visionary who summoned this divine team.
                When the gods need human judgment, when the stakes are highest,
                when you need the source — this is the door you knock on.
              </p>
            </div>
            <Link to="/contact" className="divine-btn-gold" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
              Book Consultation
            </Link>
          </div>
        </ScrollReveal>

        {/* Divine promise */}
        <ScrollReveal delay={0.3}>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: '13px',
            fontStyle: 'italic', color: 'var(--text-dim)',
            textAlign: 'center', marginTop: '40px', opacity: 0.6,
          }}>
            "This is not a regular agency. The gods do not fail. They are divine — and so is every project they touch."
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MeetTheGods;
