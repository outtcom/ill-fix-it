import { useEffect, useRef, useState } from 'react'
interface HeaderProps {
  scrollRef: React.MutableRefObject<{ y: number; speed: number }>
  forceLight?: boolean
}

const navItems = ['Services', 'About', 'Contact']
const sectionIds = ['#works', '#capabilities', '#hero']

export default function Header({ scrollRef, forceLight = false }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false)
  const [overHeroRaw, setOverHeroRaw] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const check = () => {
      const y = scrollRef.current.y
      setIsCompact(y > 100)
      setOverHeroRaw(y < window.innerHeight * 0.85)
      rafRef.current = requestAnimationFrame(check)
    }
    rafRef.current = requestAnimationFrame(check)
    return () => cancelAnimationFrame(rafRef.current)
  }, [scrollRef])

  const overHero = overHeroRaw && !forceLight

  const handleNavClick = (index: number) => {
    const target = document.querySelector(sectionIds[index])
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  const textColor = overHero ? '#ffffff' : '#0a1628'
  const bgColor = overHero ? 'transparent' : 'rgba(245,245,240,0.97)'
  const borderColor = overHero ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(10,22,40,0.12)'

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: isCompact ? '60px' : '72px',
          backgroundColor: bgColor,
          backdropFilter: overHero ? 'none' : 'blur(12px)',
          borderBottom: borderColor,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(16px, 4vw, 60px)',
          transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        {/* Brand */}
        <div
          style={{
            fontSize: 'clamp(18px, 3vw, 24px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            cursor: 'pointer',
            color: textColor,
            transition: 'color 0.4s ease',
            fontFamily: '"Oswald", sans-serif',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {"I'LL FIX IT HOME REPAIRS"}
        </div>

        {/* Desktop Nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            gap: '4px',
          }}
          className="header-desktop-nav"
        >
          {navItems.map((item, i) => (
            <NavItem
              key={item}
              label={item}
              overHero={overHero}
              onClick={() => handleNavClick(i)}
            />
          ))}
        </nav>

        {/* Desktop Phone + CTA */}
        <div
          className="header-desktop-cta"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <a
            href="tel:4163886352"
            style={{
              fontSize: 'clamp(14px, 1.8vw, 18px)',
              fontWeight: 700,
              letterSpacing: '0.02em',
              color: '#96D1F1',
              textDecoration: 'none',
              fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
              whiteSpace: 'nowrap',
              transition: 'color 0.3s ease',
            }}
          >
            (416) 388-6352
          </a>
          <button
            onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: '#ffffff',
              backgroundColor: '#96D1F1',
              border: 'none',
              borderRadius: '24px',
              padding: '8px 20px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'background-color 0.25s ease, transform 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#7AB8D9'
              e.currentTarget.style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#96D1F1'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="header-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            zIndex: 101,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10,22,40,0.98)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          <a
            href="tel:4163886352"
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#96D1F1',
              textDecoration: 'none',
              fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
              marginBottom: '16px',
            }}
          >
            (416) 388-6352
          </a>
          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => handleNavClick(i)}
              style={{
                fontSize: '24px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#ffffff',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .header-desktop-nav { display: none !important; }
          .header-desktop-cta { display: none !important; }
          .header-mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .header-mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  )
}

function NavItem({
  label,
  overHero,
  onClick,
}: {
  label: string
  overHero: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const baseColor = overHero ? '#ffffff' : '#0a1628'
  const hoverBg = overHero ? '#ffffff' : '#0a1628'
  const hoverFg = overHero ? '#0a1628' : '#ffffff'

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        fontSize: '13px',
        fontWeight: 400,
        letterSpacing: '0.08em',
        backgroundColor: hovered ? hoverBg : 'transparent',
        color: hovered ? hoverFg : baseColor,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.25s ease, color 0.25s ease',
        whiteSpace: 'nowrap',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </button>
  )
}
