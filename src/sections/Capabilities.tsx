import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const advantages: { label: string; detail: string }[] = [
  { label: 'Same-Day Response', detail: 'Emergency repairs handled within hours, not days' },
  { label: 'Upfront Pricing', detail: 'No hidden fees \u2014 quote before any work begins' },
  { label: 'Fully Equipped', detail: 'Professional tools and materials for every job' },
  { label: 'Clean Worksite', detail: 'Your home is treated with respect and left spotless' },
  { label: 'Guaranteed Work', detail: 'All repairs backed by a satisfaction guarantee' },
  { label: 'Licensed & Insured', detail: 'Full liability coverage for your peace of mind' },
  { label: 'Local Expert', detail: 'Deep knowledge of Toronto homes and building codes' },
  { label: 'Flexible Scheduling', detail: 'Evenings and weekends available to fit your life' },
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const itemsRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const items = itemsRef.current
    if (!section || !items) return

    const ctx = gsap.context(() => {
      gsap.from(items.children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0a1628',
        padding: 'clamp(100px, 12vw, 160px) clamp(20px, 5vw, 80px)',
      }}
    >
      <video
        ref={videoRef}
        src="/videos/services-video.mp4"
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(10, 22, 40, 0.6)',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Top: title row */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(32px, 6vw, 80px)',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginBottom: '60px',
            paddingBottom: '28px',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <div style={{ flex: '1 1 500px' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.24em',
                color: '#2cc9e8',
                textTransform: 'uppercase',
                marginBottom: '18px',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              WHY HOMEOWNERS TRUST ME
            </p>
            <h2
              style={{
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#ffffff',
                marginBottom: '24px',
                fontFamily: '"Oswald", sans-serif',
              }}
            >
              Built on Reliability
            </h2>
            <p
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.78)',
                maxWidth: '640px',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              With over a decade of hands-on experience across the GTA, I show up
              on time, get the job done right, and leave your home cleaner than
              I found it.
            </p>
          </div>
          <div
            style={{
              flex: '0 0 clamp(120px, 18vw, 200px)',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <OrbitalBadge />
          </div>
        </div>

        {/* Bullet grid */}
        <ul
          ref={itemsRef}
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {advantages.map((adv, i) => (
            <BulletItem key={adv.label} index={i} {...adv} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function BulletItem({
  label,
  detail,
  index,
}: {
  label: string
  detail: string
  index: number
}) {
  return (
    <li
      style={{
        backgroundColor: 'rgba(10,22,40,0.65)',
        padding: '28px 32px',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        minHeight: '140px',
      }}
    >
      <span
        style={{
          flex: '0 0 auto',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: '#96D1F1',
          marginTop: '4px',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: '1 1 0%' }}>
        <span
          style={{
            fontSize: 'clamp(12px, 1.4vw, 14px)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            lineHeight: 1.3,
            color: '#ffffff',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          }}
        >
          {label}
        </span>
        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.72)',
            margin: 0,
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          }}
        >
          {detail}
        </p>
      </div>
      <span
        style={{
          flex: '0 0 auto',
          fontSize: '11px',
          letterSpacing: '0.14em',
          color: 'rgba(255,255,255,0.35)',
          fontVariantNumeric: 'tabular-nums',
          paddingTop: '4px',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </li>
  )
}

function OrbitalBadge() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const pathId = `orbital-path-${Math.floor(Math.random() * 10000)}`
    const duration = 60

    const path = svg.querySelector('path')
    if (!path) return

    path.setAttribute('id', pathId)
    path.setAttribute('fill', 'none')

    const textContent = '\u2022 PROMPT \u2022 RELIABLE \u2022 24/7 SERVICE \u2022 '

    const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    textEl.setAttribute('fill', '#2cc9e8')
    textEl.setAttribute('font-family', 'ui-sans-serif, system-ui, sans-serif')
    textEl.setAttribute('font-size', '16px')
    textEl.setAttribute('font-weight', '500')
    textEl.setAttribute('letter-spacing', '2px')

    const tp1 = document.createElementNS('http://www.w3.org/2000/svg', 'textPath')
    tp1.setAttribute('href', `#${pathId}`)
    tp1.setAttribute('startOffset', '0%')
    tp1.textContent = textContent

    const tp2 = document.createElementNS('http://www.w3.org/2000/svg', 'textPath')
    tp2.setAttribute('href', `#${pathId}`)
    tp2.setAttribute('startOffset', '0%')
    tp2.textContent = textContent

    textEl.appendChild(tp1)
    textEl.appendChild(tp2)
    svg.appendChild(textEl)

    const textPaths = svg.querySelectorAll('textPath')

    const tween1 = gsap.fromTo(
      textPaths[0],
      { attr: { startOffset: '0%' } },
      { attr: { startOffset: '-100%' }, duration, ease: 'none', repeat: -1 }
    )

    const tween2 = gsap.fromTo(
      textPaths[1],
      { attr: { startOffset: '100%' } },
      { attr: { startOffset: '0%' }, duration, ease: 'none', repeat: -1 }
    )

    return () => {
      tween1.kill()
      tween2.kill()
    }
  }, [])

  return (
    <div
      className="orbital-svg-container"
      style={{
        width: '100%',
        height: '100%',
        transform: 'rotate(-15deg)',
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        style={{ width: '100%', height: '100%' }}
      >
        <path
          d="M200,40 A160,160 0 1,1 199.99,40"
          fill="none"
          stroke="#2cc9e8"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
    </div>
  )
}
