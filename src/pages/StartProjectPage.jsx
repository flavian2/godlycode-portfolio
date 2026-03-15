import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveIntakeForm, getSessionId } from '../services/divineService';
import LogoPrimary from '../assets/img/godlycode-logo.png';
import IkukuVid   from '../assets/img/Ikuku-video.mp4';
import IkukuPoster from '../assets/img/ikuku-godlycode.jpg';

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

const PROJECT_TYPES = [
  { value: 'web-app',     label: 'Web Application'         },
  { value: 'mobile-app',  label: 'Mobile App'               },
  { value: 'ecommerce',   label: 'E-Commerce Platform'      },
  { value: 'saas',        label: 'SaaS Product'             },
  { value: 'fintech',     label: 'Fintech / Banking'        },
  { value: 'ai-system',   label: 'AI-Powered System'        },
  { value: 'dashboard',   label: 'Dashboard / Analytics'    },
  { value: 'api-backend', label: 'API / Backend System'     },
  { value: 'other',       label: 'Something Else'           },
];

const BUDGETS = [
  { value: 'under-1k',  label: 'Under $1,000'        },
  { value: '1k-5k',     label: '$1,000 – $5,000'     },
  { value: '5k-15k',    label: '$5,000 – $15,000'    },
  { value: '15k-50k',   label: '$15,000 – $50,000'   },
  { value: '50k-plus',  label: '$50,000+'             },
  { value: 'discuss',   label: "Let's discuss"        },
];

const TIMELINES = [
  { value: 'asap',         label: 'As soon as possible'   },
  { value: '1-month',      label: 'Within 1 month'        },
  { value: '1-3-months',   label: '1 – 3 months'          },
  { value: '3-6-months',   label: '3 – 6 months'          },
  { value: '6-months-plus',label: '6+ months'             },
  { value: 'flexible',     label: 'Flexible / not sure'   },
];

const STEP_LABELS = ['Project', 'Budget', 'Timeline', 'Vision'];

/* Option button (for type/budget/timeline grids) */
const Option = ({ selected, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: '14px 18px',
      background: selected ? 'rgba(201,168,76,0.1)' : 'rgba(201,168,76,0.02)',
      border: `1px solid ${selected ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.1)'}`,
      borderRadius: '6px',
      cursor: 'none',
      textAlign: 'left',
      transition: 'background 0.2s, border-color 0.2s',
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      color: selected ? 'var(--gold)' : 'var(--text)',
    }}
    onMouseEnter={e => {
      if (!selected) {
        e.currentTarget.style.background = 'rgba(201,168,76,0.05)';
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
      }
    }}
    onMouseLeave={e => {
      if (!selected) {
        e.currentTarget.style.background = 'rgba(201,168,76,0.02)';
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)';
      }
    }}
  >
    <span>{children}</span>
    {selected && (
      <span style={{ color: 'var(--gold)', fontSize: '12px', flexShrink: 0 }}>✦</span>
    )}
  </button>
);

const StartProjectPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType:  '',
    budget:       '',
    timeline:     '',
    description:  '',
  });
  const [submitting, setSubmitting] = useState(false);

  const canProceed = { 1: !!formData.projectType, 2: !!formData.budget, 3: !!formData.timeline, 4: true };

  const handleSubmit = async () => {
    setSubmitting(true);
    const sessionId = getSessionId();
    await saveIntakeForm(sessionId, formData);

    const projectLabel  = PROJECT_TYPES.find(p => p.value === formData.projectType)?.label || formData.projectType;
    const budgetLabel   = BUDGETS.find(b => b.value === formData.budget)?.label || formData.budget;
    const timelineLabel = TIMELINES.find(t => t.value === formData.timeline)?.label || formData.timeline;
    const msg = `I want to build: ${projectLabel}. Budget: ${budgetLabel}. Timeline: ${timelineLabel}.${formData.description ? ' Description: ' + formData.description : ''}`;

    navigate('/chat/ikuku', { state: { preloadedMessage: msg } });
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px', position: 'relative' }}>
      <style>{`
        @keyframes stepIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: none; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Video / static background */}
      {!isMobile ? (
        <video
          src={IkukuVid}
          poster={IkukuPoster}
          preload="none"
          autoPlay muted loop playsInline
          style={{
            position: 'fixed', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0,
            opacity: 0.08,
          }}
        />
      ) : (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0,
          backgroundImage: `url(${IkukuPoster})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.06,
        }} />
      )}

      {/* Dark overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        background: 'rgba(7,7,7,0.9)', pointerEvents: 'none',
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'radial-gradient(ellipse 40% 30% at 50% 30%, rgba(201,168,76,0.05) 0%, transparent 70%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: '600px', margin: '0 auto',
        padding: '0 clamp(20px,4vw,40px)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <img
            src={LogoPrimary}
            alt="GodlyCode"
            style={{
              height: '80px', width: 'auto', objectFit: 'contain',
              marginBottom: '24px', display: 'block', margin: '0 auto 24px',
            }}
          />
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px,4vw,40px)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '2px',
            marginBottom: '12px',
          }}>
            Begin Your Divine Project
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--text-dim)',
            lineHeight: 1.7,
            maxWidth: '440px',
            margin: '0 auto',
          }}>
            Tell us your vision. The wind will carry it to Ikuku — who will summon the right divine forces.
          </p>
        </div>

        {/* Step indicators */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '48px' }}>
          {STEP_LABELS.map((label, i) => {
            const s = i + 1;
            const active = s === step;
            const done = s < step;
            return (
              <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{
                  height: '2px',
                  background: done || active ? 'var(--gold)' : 'rgba(201,168,76,0.12)',
                  transition: 'background 0.4s ease',
                  borderRadius: '1px',
                }} />
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: active ? 'var(--gold)' : done ? 'var(--gold-dim)' : 'var(--text-dim)',
                  opacity: active ? 1 : 0.5,
                  transition: 'color 0.3s',
                }}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div
          key={step}
          style={{ animation: 'stepIn 0.3s ease forwards' }}
        >
          {/* Step 1: Project Type */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px,3vw,26px)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: '1px',
                  marginBottom: '8px',
                }}>
                  What are you building?
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-dim)',
                }}>
                  Ikuku has sensed your project — but speak it plainly into the wind.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {PROJECT_TYPES.map(t => (
                  <Option
                    key={t.value}
                    selected={formData.projectType === t.value}
                    onClick={() => setFormData(prev => ({ ...prev, projectType: t.value }))}
                  >
                    {t.label}
                  </Option>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Budget */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px,3vw,26px)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: '1px',
                  marginBottom: '8px',
                }}>
                  What is your budget?
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-dim)',
                }}>
                  The gods adjust their resources accordingly. There is no wrong answer.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {BUDGETS.map(b => (
                  <Option
                    key={b.value}
                    selected={formData.budget === b.value}
                    onClick={() => setFormData(prev => ({ ...prev, budget: b.value }))}
                  >
                    {b.label}
                  </Option>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Timeline */}
          {step === 3 && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px,3vw,26px)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: '1px',
                  marginBottom: '8px',
                }}>
                  When do you need this?
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-dim)',
                }}>
                  Eshu already has a roadmap in mind. Give him a destination.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {TIMELINES.map(t => (
                  <Option
                    key={t.value}
                    selected={formData.timeline === t.value}
                    onClick={() => setFormData(prev => ({ ...prev, timeline: t.value }))}
                  >
                    {t.label}
                  </Option>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Description */}
          {step === 4 && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px,3vw,26px)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: '1px',
                  marginBottom: '8px',
                }}>
                  Describe your vision
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-dim)',
                }}>
                  In your own words — what are you building and why? The more you share, the more precisely Ikuku can summon the right forces.
                </p>
              </div>

              <textarea
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Tell us about your project... What problem does it solve? Who are your users? What makes it unique?"
                rows={7}
                style={{
                  width: '100%',
                  background: 'rgba(201,168,76,0.03)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--text)',
                  lineHeight: 1.7,
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'}
              />

              {/* Summary */}
              <div style={{
                marginTop: '20px',
                padding: '16px 20px',
                background: 'rgba(201,168,76,0.03)',
                border: '1px solid rgba(201,168,76,0.1)',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '4px',
                }}>
                  ✦ Divine Project Summary
                </div>
                {[
                  { label: 'Type',     val: PROJECT_TYPES.find(p => p.value === formData.projectType)?.label },
                  { label: 'Budget',   val: BUDGETS.find(b => b.value === formData.budget)?.label },
                  { label: 'Timeline', val: TIMELINES.find(t => t.value === formData.timeline)?.label },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', gap: '8px' }}>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '11px',
                      color: 'var(--text-dim)', minWidth: '60px',
                    }}>{row.label}:</span>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '11px',
                      color: 'var(--text)',
                    }}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '40px',
        }}>
          {step > 1 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                background: 'none',
                border: '1px solid rgba(201,168,76,0.12)',
                borderRadius: '4px',
                padding: '12px 20px',
                cursor: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                e.currentTarget.style.color = 'var(--text)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.12)';
                e.currentTarget.style.color = 'var(--text-dim)';
              }}
            >
              ← Back
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed[step]}
              className="divine-btn-gold"
              style={{
                opacity: canProceed[step] ? 1 : 0.35,
                cursor: canProceed[step] ? 'none' : 'default',
              }}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="divine-btn-gold"
              style={{ opacity: submitting ? 0.6 : 1 }}
            >
              {submitting ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    display: 'inline-block',
                    width: '12px', height: '12px',
                    border: '2px solid rgba(7,7,7,0.3)',
                    borderTopColor: 'var(--deep)',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  Sending to Ikuku...
                </span>
              ) : 'Summon the Gods →'}
            </button>
          )}
        </div>
      </div>

      {/* spin keyframe already defined above */}
    </div>
  );
};

export default StartProjectPage;
