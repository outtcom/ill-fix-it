import { useEffect, useRef, useCallback, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services, type Service } from '../data/services'

gsap.registerPlugin(ScrollTrigger)

interface WorksProps {
  scrollRef: React.MutableRefObject<{ y: number; speed: number }>
}

export default function Works({ scrollRef: _scrollRef }: WorksProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const imageLoadedRef = useRef<boolean[]>(new Array(services.length).fill(false))
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(services.length).fill(null))
  const strengthRef = useRef(0)
  const prevScrollYRef = useRef(0)
  const randsRef = useRef<number[][]>(
    services.map(() => [Math.random(), Math.random(), Math.random(), Math.random()])
  )
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const setCanvasRef = useCallback((el: HTMLCanvasElement | null, index: number) => {
    canvasRefs.current[index] = el
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.work-item', {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    services.forEach((service, i) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        imagesRef.current[i] = img
        imageLoadedRef.current[i] = true
        const canvas = canvasRefs.current[i]
        if (canvas) {
          const rect = canvas.parentElement?.getBoundingClientRect()
          if (rect) {
            canvas.width = rect.width * Math.min(window.devicePixelRatio, 2)
            canvas.height = rect.height * Math.min(window.devicePixelRatio, 2)
          }
          drawImage(canvas, img, 0, randsRef.current[i])
        }
      }
      img.src = service.img
    })
  }, [])

  useEffect(() => {
    let rafId: number
    const animate = () => {
      const scrollY = window.scrollY
      const scrollDelta = scrollY - prevScrollYRef.current
      const dt = 1 / 60

      const targetStrength = (Math.abs(scrollDelta) * 10) / window.innerHeight
      strengthRef.current *= Math.exp(-dt * 10)
      strengthRef.current += Math.min(targetStrength, 5)
      const strength = Math.min(1, strengthRef.current)

      canvasRefs.current.forEach((canvas, i) => {
        if (!canvas || !imagesRef.current[i]) return

        if (Math.random() > Math.exp(-dt * 25 * (1 + strength))) {
          randsRef.current[i] = [Math.random(), Math.random(), Math.random(), Math.random()]
        }

        drawImage(canvas, imagesRef.current[i]!, strength, randsRef.current[i])
      })

      prevScrollYRef.current = scrollY
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      canvasRefs.current.forEach((canvas, i) => {
        if (!canvas || !canvas.parentElement) return
        const rect = canvas.parentElement.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio, 2)
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        if (imagesRef.current[i]) {
          drawImage(canvas, imagesRef.current[i]!, 0, randsRef.current[i])
        }
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <section
        id="works"
        ref={sectionRef}
        style={{
          backgroundColor: '#eae7e0',
          padding: 'clamp(80px, 12vh, 160px) clamp(20px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          {/* Section header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '60px',
              borderBottom: '1px solid rgba(10,22,40,0.2)',
              paddingBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#0a1628',
                fontFamily: '"Oswald", sans-serif',
              }}
            >
              Services
            </h2>
            <span
              style={{
                fontSize: '12px',
                letterSpacing: '0.18em',
                color: 'rgba(10,22,40,0.5)',
                textTransform: 'uppercase',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              WHAT I DO
            </span>
          </div>

          {/* Service cards grid */}
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 560px), 1fr))',
              gap: 'clamp(12px, 1.5vw, 24px)',
            }}
          >
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                setCanvasRef={setCanvasRef}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedService(null)}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(10,22,40,0.85)',
              backdropFilter: 'blur(8px)',
            }}
          />
          <div
            style={{
              position: 'relative',
              backgroundColor: '#f5f5f0',
              borderRadius: '4px',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              zIndex: 1,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedService.img}
              alt={selectedService.title}
              className="service-modal-img"
              style={{
                width: '100%',
                height: 'clamp(160px, 30vw, 280px)',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div style={{ padding: '32px' }}>
              <h3
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 700,
                  color: '#0a1628',
                  marginBottom: '4px',
                  fontFamily: '"Oswald", sans-serif',
                }}
              >
                {selectedService.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(10,22,40,0.55)',
                  marginBottom: '20px',
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                }}
              >
                {selectedService.descriptor}
              </p>
              {selectedService.description.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.65,
                    color: '#0a1628',
                    marginBottom: '16px',
                    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                  }}
                >
                  {para}
                </p>
              ))}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '8px',
                  marginTop: '24px',
                  marginBottom: '28px',
                }}
              >
                {selectedService.features.map((feature, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      color: '#0a1628',
                      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                    }}
                  >
                    <span style={{ color: '#96D1F1', fontSize: '16px' }}>&#8226;</span>
                    {feature}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    setSelectedService(null)
                    setTimeout(() => {
                      document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }}
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: '#ffffff',
                    backgroundColor: '#96D1F1',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '14px 28px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                    transition: 'background-color 0.25s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#7AB8D9' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#96D1F1' }}
                >
                  Get a Quote
                </button>
                <a
                  href="tel:4163886352"
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: '#0a1628',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(10,22,40,0.3)',
                    borderRadius: '4px',
                    padding: '14px 28px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0a1628'
                    e.currentTarget.style.backgroundColor = 'rgba(10,22,40,0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(10,22,40,0.3)'
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  Call Now
                </a>
              </div>
            </div>
            <button
              onClick={() => setSelectedService(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(10,22,40,0.7)',
                border: 'none',
                color: '#ffffff',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function ServiceCard({
  service,
  index,
  setCanvasRef,
  onClick,
}: {
  service: Service
  index: number
  setCanvasRef: (el: HTMLCanvasElement | null, index: number) => void
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="work-item"
      style={{
        border: '1px solid rgba(10,22,40,0.15)',
        backgroundColor: '#ffffff',
        padding: 0,
        cursor: 'pointer',
        textAlign: 'left',
        display: 'block',
        fontFamily: 'inherit',
        borderRadius: '4px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(10,22,40,0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%',
          overflow: 'hidden',
          backgroundColor: '#e5e5e5',
        }}
      >
        <canvas
          ref={(el) => setCanvasRef(el, index)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
        {/* Bottom gradient overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '60px 24px 20px',
            background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.7) 100%)',
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontSize: 'clamp(20px, 2.5vw, 32px)',
              fontWeight: 700,
              color: '#ffffff',
              fontFamily: '"Oswald", sans-serif',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              marginBottom: '4px',
            }}
          >
            {service.title}
          </p>
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}
          >
            {service.descriptor}
          </p>
        </div>
      </div>
    </button>
  )
}

function drawImage(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  strength: number,
  rands: number[]
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const cw = canvas.width
  const ch = canvas.height

  const imgRatio = img.width / img.height
  const canvasRatio = cw / ch
  let sw = img.width
  let sh = img.height
  let sx = 0
  let sy = 0
  if (imgRatio > canvasRatio) {
    sw = img.height * canvasRatio
    sx = (img.width - sw) / 2
  } else {
    sh = img.width / canvasRatio
    sy = (img.height - sh) / 2
  }

  ctx.clearRect(0, 0, cw, ch)

  if (strength < 0.01) {
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
    return
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)

  const numStrips = Math.floor(3 + strength * 12)
  for (let s = 0; s < numStrips; s++) {
    const stripY = Math.floor(rands[s % 4] * ch * (0.3 + s * 0.15)) % ch
    const stripH = Math.floor(2 + Math.random() * ch * 0.06 * strength)
    const offsetX = (rands[(s + 1) % 4] - 0.5) * cw * 0.15 * strength

    if (rands[(s + 2) % 4] > 0.7) {
      ctx.drawImage(canvas, 0, stripY, cw, stripH, offsetX, stripY, cw, stripH)
    }
  }

  if (strength > 0.05) {
    const shiftAmount = strength * 6
    ctx.globalCompositeOperation = 'screen'
    ctx.globalAlpha = strength * 0.3
    ctx.drawImage(canvas, shiftAmount, 0, cw, ch, 0, 0, cw, ch)
    ctx.drawImage(canvas, -shiftAmount, 0, cw, ch, 0, 0, cw, ch)
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
  }

  if (strength > 0.3) {
    ctx.fillStyle = `rgba(255,255,255,${(strength - 0.3) * 0.15})`
    ctx.fillRect(0, 0, cw, ch)
  }
}
