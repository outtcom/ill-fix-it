import { useAuth } from '@/hooks/useAuth'

export default function Footer() {
  const { isAuthenticated } = useAuth()

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#0a1628',
        padding: 'clamp(80px, 12vh, 160px) clamp(20px, 5vw, 80px) 40px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top: columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(32px, 4vw, 60px)',
            paddingBottom: '60px',
          }}
        >
          {/* Contact */}
          <div>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: '#e8622c',
                marginBottom: '20px',
                textTransform: 'uppercase',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              CONTACT
            </p>
            <a
              href="tel:4163886352"
              style={{
                fontSize: 'clamp(16px, 2vw, 22px)',
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: '#ffffff',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '10px',
                fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#e8622c' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff' }}
            >
              (416) 388-6352
            </a>
            <a
              href="mailto:kevinwillfixit7@gmail.com"
              style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '10px',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
            >
              kevinwillfixit7@gmail.com
            </a>
            <p
              style={{
                fontSize: '14px',
                color: '#2cc9e8',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              Available 24/7 across GTA
            </p>
          </div>

          {/* Service Areas */}
          <div>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: '#e8622c',
                marginBottom: '20px',
                textTransform: 'uppercase',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              SERVICE AREAS
            </p>
            {['Toronto', 'Scarborough', 'Etobicoke', 'North York', 'Mississauga', 'Brampton', 'Markham', 'Richmond Hill'].map((area) => (
              <p
                key={area}
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 2,
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                }}
              >
                {area}
              </p>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: '#e8622c',
                marginBottom: '20px',
                textTransform: 'uppercase',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              QUICK LINKS
            </p>
            {[
              { label: 'Services', target: '#works' },
              { label: 'Get a Quote', target: '#hero' },
              { label: 'About', target: '#about' },
              ...(isAuthenticated ? [] : [{ label: 'Login', target: '/login' }]),
            ].map((link) => (
              <p key={link.label} style={{ lineHeight: 2 }}>
                {link.target.startsWith('#') ? (
                  <button
                    onClick={() => document.querySelector(link.target)?.scrollIntoView({ behavior: 'smooth' })}
                    style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.55)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    href={link.target}
                    style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
                  >
                    {link.label}
                  </a>
                )}
              </p>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            margin: '0 0 30px',
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontSize: 'clamp(40px, 8vw, 120px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'rgba(255,255,255,0.08)',
              fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {"I'LL FIX IT"}
          </span>
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.35)',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}
          >
            &copy; 2025 I&apos;ll Fix It. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
