import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tags = ['Licensed & Insured', '24/7 Available', 'Free Estimates']

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const tagsEl = tagsRef.current
    if (!section || !text || !tagsEl) return

    const ctx = gsap.context(() => {
      gsap.from(text, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from(tagsEl.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <p
          ref={textRef}
          style={{
            fontSize: 'clamp(22px, 3.5vw, 44px)',
            fontWeight: 600,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            color: '#0a1628',
            maxWidth: '1000px',
            fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
          }}
        >
          From leaky faucets to full concrete pours, no job is too small or too big.
          I&apos;ve been fixing homes across Toronto with prompt, reliable service
          you can count on &mdash; day or night.
        </p>

        <div
          ref={tagsRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(20px, 4vw, 40px)',
            marginTop: '48px',
            flexWrap: 'wrap',
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 'clamp(11px, 1.2vw, 14px)',
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: 'rgba(10,22,40,0.55)',
                textTransform: 'uppercase',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}
            >
              &#10003; {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
