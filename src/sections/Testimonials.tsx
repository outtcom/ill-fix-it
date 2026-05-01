import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reviews = [
  { src: '/images/reviews/review-1', alt: 'Facebook review from a satisfied customer' },
  { src: '/images/reviews/review-2', alt: 'Facebook review praising prompt service' },
  { src: '/images/reviews/review-3', alt: 'Facebook review about quality home repairs' },
  { src: '/images/reviews/review-4', alt: 'Facebook review recommending the service' },
  { src: '/images/reviews/review-5', alt: 'Facebook review highlighting reliability' },
  { src: '/images/reviews/review-6', alt: 'Facebook review for emergency repair work' },
  { src: '/images/reviews/review-7', alt: 'Facebook review about professional workmanship' },
  { src: '/images/reviews/review-8', alt: 'Facebook review from a repeat customer' },
  { src: '/images/reviews/review-9', alt: 'Facebook review mentioning fair pricing' },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const grid = gridRef.current
    if (!section || !header || !grid) return

    const ctx = gsap.context(() => {
      gsap.from(header.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from(grid.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="reviews"
      ref={sectionRef}
      style={{
        backgroundColor: '#f5f5f0',
        padding: 'clamp(80px, 12vh, 160px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.24em',
              color: '#2cc9e8',
              textTransform: 'uppercase',
              marginBottom: '18px',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              fontWeight: 500,
            }}
          >
            REAL HOMEOWNER FEEDBACK
          </p>
          <h2
            style={{
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#0a1628',
              marginBottom: '20px',
              fontFamily: '"Oswald", sans-serif',
            }}
          >
            Loved Across Toronto
          </h2>
          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 400,
              lineHeight: 1.6,
              color: 'rgba(10,22,40,0.65)',
              maxWidth: '560px',
              margin: '0 auto',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}
          >
            Genuine reviews from Facebook left by homeowners throughout the GTA
            who trust us with their repairs.
          </p>
        </div>

        {/* Reviews Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '24px',
          }}
        >
          {reviews.map((review, i) => (
            <ReviewCard key={i} {...review} index={i} />
          ))}
        </div>

        {/* Facebook CTA */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 'clamp(48px, 5vw, 64px)',
          }}
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#0a1628',
              textDecoration: 'none',
              padding: '14px 28px',
              border: '1.5px solid rgba(10,22,40,0.2)',
              borderRadius: '50px',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0a1628'
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.borderColor = '#0a1628'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#0a1628'
              e.currentTarget.style.borderColor = 'rgba(10,22,40,0.2)'
            }}
          >
            <FacebookIcon />
            See More on Facebook
          </a>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({
  src,
  alt,
  index,
}: {
  src: string
  alt: string
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 4px 12px rgba(10,22,40,0.04)',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow =
          '0 12px 32px rgba(10,22,40,0.1), 0 4px 12px rgba(10,22,40,0.06)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow =
          '0 1px 3px rgba(10,22,40,0.06), 0 4px 12px rgba(10,22,40,0.04)'
      }}
    >
      {/* Image with WebP fallback */}
      <div style={{ position: 'relative', width: '100%', backgroundColor: '#f0f0f0' }}>
        <picture>
          <source srcSet={`${src}.webp`} type="image/webp" />
          <source srcSet={`${src}.jpg`} type="image/jpeg" />
          <img
            src={`${src}.jpg`}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </picture>
      </div>

      {/* Card footer */}
      <div
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#1877F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <FacebookIcon size={16} color="#ffffff" />
        </div>
        <div>
          <p
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#0a1628',
              margin: 0,
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              lineHeight: 1.3,
            }}
          >
            Facebook Review
          </p>
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(10,22,40,0.5)',
              margin: 0,
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              lineHeight: 1.3,
            }}
          >
            Verified Customer
          </p>
        </div>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'rgba(10,22,40,0.35)',
            fontVariantNumeric: 'tabular-nums',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

function FacebookIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}
