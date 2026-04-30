import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Spatial() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [primaryHovered, setPrimaryHovered] = useState(false)
  const [secondaryHovered, setSecondaryHovered] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      const children = content.children
      gsap.from(children[0], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.4,
      })
      gsap.from(children[1], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6,
      })
      gsap.from(children[2], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.9,
      })
      gsap.from(children[3], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 1.2,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [])

  return (
    <section
      id="spatial"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        overflow: 'hidden',
        backgroundColor: '#0a1628',
      }}
    >
      <video
        ref={videoRef}
        src="/videos/hero-video.mp4"
        muted
        loop
        playsInline
        poster="/images/service-plumbing.jpg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.25) 35%, rgba(10,22,40,0.55) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          padding: '0 clamp(20px, 5vw, 80px)',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <span
          style={{
            fontSize: 'clamp(10px, 1.2vw, 13px)',
            fontWeight: 400,
            letterSpacing: '0.15em',
            color: '#2cc9e8',
            textTransform: 'uppercase',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          }}
        >
          TORONTO GTA &bull; 24/7 EMERGENCY SERVICE
        </span>

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(44px, 7vw, 108px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#ffffff',
            maxWidth: '900px',
            textShadow: '0 2px 24px rgba(0,0,0,0.25)',
            fontFamily: '"Oswald", sans-serif',
          }}
        >
          Home Repairs
          <br />
          Done Right
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(15px, 1.6vw, 20px)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '600px',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          }}
        >
          Plumbing &bull; Drywall &bull; Masonry &bull; Doors &bull; Grout &bull; Concrete.
          <br />
          Kevin Scanlon &mdash; your trusted handyman across the Greater Toronto Area.
        </p>

        {/* CTA Row */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <a
            href="tel:4163886352"
            onMouseEnter={() => setPrimaryHovered(true)}
            onMouseLeave={() => setPrimaryHovered(false)}
            style={{
              fontSize: 'clamp(13px, 1.5vw, 16px)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: '#ffffff',
              backgroundColor: primaryHovered ? '#7AB8D9' : '#96D1F1',
              border: 'none',
              borderRadius: '4px',
              padding: '16px 36px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              textDecoration: 'none',
              display: 'inline-block',
              transform: primaryHovered ? 'scale(1.03)' : 'scale(1)',
            }}
          >
            Call Now: (416) 388-6352
          </a>
          <button
            onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setSecondaryHovered(true)}
            onMouseLeave={() => setSecondaryHovered(false)}
            style={{
              fontSize: 'clamp(13px, 1.5vw, 16px)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: '#ffffff',
              backgroundColor: secondaryHovered ? 'rgba(255,255,255,0.08)' : 'transparent',
              border: secondaryHovered ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.4)',
              borderRadius: '4px',
              padding: '16px 36px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}
          >
            Get a Free Quote &rarr;
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'bounce 2s infinite ease-in-out',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          }}
        >
          Scroll
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  )
}
