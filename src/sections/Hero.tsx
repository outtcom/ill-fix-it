import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { trpc } from '@/providers/trpc'
import { useAuth } from '@/hooks/useAuth'
import { Toaster, toast } from 'sonner'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;

void main() {
  vec2 coord = gl_FragCoord.xy / resolution;
  vec2 st = coord;
  coord *= 10.0;

  float len;
  for (int i = 0; i < 5; i++) {
    len = length(vec2(coord.x, coord.y));
    coord.x += cos(coord.y + sin(len)) + cos(time * 0.07) * 0.2;
    coord.y += sin(coord.x + cos(len)) + sin(time * 0.1);
  }

  len *= cos(len * 0.4);
  len -= 10.0;

  for (float i = 0.0; i < 5.0; i++) {
    len += 1.0 / abs(mod(st.x, 0.09 * i) * 200.0) * 1.0;
  }

  float r = cos(len + 0.2) * 0.4 + 0.5;
  float g = cos(len + 0.1) * 0.4 + 0.5;
  float b = cos(len - 0.05) * 0.45 + 0.55;

  vec3 color = vec3(r, g, b);
  color = smoothstep(0.1, 0.9, color);
  color *= 0.7;

  gl_FragColor = vec4(color, 1.0);
}
`

const SERVICE_OPTIONS = [
  'General Repair',
  'Plumbing',
  'Drywall',
  'Door Installation',
  'Masonry & Concrete',
  'Grout & Caulking',
  'Other',
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasHostRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const uniformsRef = useRef<{ resolution: THREE.Uniform; time: THREE.Uniform }>({
    resolution: new THREE.Uniform(new THREE.Vector2(1, 1)),
    time: new THREE.Uniform(0),
  })
  const rightPanelRef = useRef<HTMLDivElement>(null)

  const [submitHovered, setSubmitHovered] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: '',
    projectDescription: '',
  })

  const { user } = useAuth()

  // Pre-fill name and email from authenticated user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
      }))
    }
  }, [user])

  const createQuote = trpc.quote.create.useMutation({
    onSuccess: () => {
      setSubmitted(true)
      setSubmitError(null)
      toast.success("Quote request sent! Kevin will contact you within 24 hours.")
    },
    onError: (err) => {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
      toast.error(err.message || 'Something went wrong. Please try again.')
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[e.target.name]
        return next
      })
    }
  }

  // Three.js shader setup
  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvasHostRef.current
    if (!canvas || !host) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        resolution: uniformsRef.current.resolution,
        time: uniformsRef.current.time,
      },
      depthTest: false,
      depthWrite: false,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const handleResize = () => {
      const rect = host.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      renderer.setSize(w, h, false)
      uniformsRef.current.resolution.value.set(w, h)
    }
    handleResize()

    const ro = new ResizeObserver(handleResize)
    ro.observe(host)

    let rafId: number
    const startTime = performance.now()
    const animate = () => {
      uniformsRef.current.time.value = (performance.now() - startTime) / 1000
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  // Entrance animation for right panel
  useEffect(() => {
    const panel = rightPanelRef.current
    if (!panel) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            panel.style.opacity = '1'
            panel.style.transform = 'translateX(0)'
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(panel)
    return () => observer.disconnect()
  }, [])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validate()) return

    createQuote.mutate({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      serviceType: formData.serviceType,
      projectDescription: formData.projectDescription || undefined,
    })
  }

  const handleReset = () => {
    setSubmitted(false)
    setFormData({
      fullName: user?.name || '',
      phone: '',
      email: user?.email || '',
      serviceType: '',
      projectDescription: '',
    })
    setErrors({})
    setSubmitError(null)
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '700px',
        backgroundColor: '#0a1628',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
      }}
    >
      <Toaster position="top-right" richColors />

      {/* Left: shader */}
      <div
        ref={canvasHostRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '420px',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            pointerEvents: 'none',
            padding: 'clamp(24px, 4vw, 48px)',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: '#ffffff',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              textAlign: 'center',
              fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
            }}
          >
            Get Your
            <br />
            Free Quote
          </h2>
        </div>
      </div>

      {/* Right: form */}
      <div
        ref={rightPanelRef}
        style={{
          backgroundColor: '#0a1628',
          color: '#ffffff',
          padding: 'clamp(40px, 5vw, 72px) clamp(24px, 4vw, 60px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: 0,
          transform: 'translateX(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ maxWidth: '520px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.24em',
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              marginBottom: '14px',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}
          >
            Get in touch
          </p>
          <h3
            style={{
              fontSize: 'clamp(28px, 3.2vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '8px',
              fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
            }}
          >
            Request a Quote
          </h3>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '36px',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}
          >
            Tell me about your project and I&apos;ll get back to you within 24 hours.
          </p>

          {submitted ? (
            <div
              style={{
                border: '1px solid rgba(232,98,44,0.5)',
                padding: '32px 28px',
                borderRadius: '4px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#e8622c',
                  marginBottom: '12px',
                  fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
                }}
              >
                &#10003; Quote Request Received
              </div>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: '20px',
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                }}
              >
                Thanks! I&apos;ll call you within 24 hours to discuss your project.
              </p>
              <button
                onClick={handleReset}
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: '#ffffff',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: '4px',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s ease',
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ffffff'
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {submitError && (
                <div
                  style={{
                    border: '1px solid rgba(255,100,100,0.5)',
                    padding: '14px 18px',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: 'rgba(255,150,150,0.9)',
                    borderRadius: '4px',
                  }}
                >
                  {submitError}
                </div>
              )}

              <Field
                label="Full Name *"
                type="text"
                name="fullName"
                placeholder="Your name"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />

              <Row>
                <Field
                  label="Phone Number *"
                  type="tel"
                  name="phone"
                  placeholder="(416) 555-0123"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
                <Field
                  label="Email *"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </Row>

              <SelectField
                label="Service Type *"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                options={SERVICE_OPTIONS}
                error={errors.serviceType}
              />

              <TextareaField
                label="Project Description"
                name="projectDescription"
                placeholder="Describe what needs fixing..."
                value={formData.projectDescription}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={createQuote.isPending}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                style={{
                  marginTop: '12px',
                  padding: '18px 24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  color: '#ffffff',
                  backgroundColor: submitHovered ? '#d45524' : '#e8622c',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: createQuote.isPending ? 'wait' : 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s ease',
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                  opacity: createQuote.isPending ? 0.7 : 1,
                }}
              >
                {createQuote.isPending ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
      }}
    >
      {children}
    </div>
  )
}

const fieldBase: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  fontSize: '15px',
  backgroundColor: 'rgba(255,255,255,0.05)',
  color: '#ffffff',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '4px',
  outline: 'none',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  letterSpacing: '0.01em',
  appearance: 'none',
  colorScheme: 'dark',
  transition: 'border-color 0.2s ease',
}

const labelBase: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.2em',
  color: 'rgba(255,255,255,0.6)',
  textTransform: 'uppercase',
  marginBottom: '8px',
  display: 'block',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
}

function Field({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string
  type: string
  name: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          ...fieldBase,
          borderColor: error ? '#e8622c' : 'rgba(255,255,255,0.12)',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#e8622c' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = error ? '#e8622c' : 'rgba(255,255,255,0.12)' }}
      />
      {error && (
        <span style={{ fontSize: '12px', color: '#e8622c', marginTop: '4px', display: 'block', fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
          {error}
        </span>
      )}
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
  value,
  onChange,
  error,
}: {
  label: string
  name: string
  options: string[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          ...fieldBase,
          paddingRight: '36px',
          borderColor: error ? '#e8622c' : 'rgba(255,255,255,0.12)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='1.5'%3E%3Cpath d='M3 5l3 3 3-3'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#e8622c' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = error ? '#e8622c' : 'rgba(255,255,255,0.12)' }}
      >
        <option value="" style={{ color: '#000', backgroundColor: '#fff' }}>
          Select a service
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ color: '#000', backgroundColor: '#fff' }}>
            {opt}
          </option>
        ))}
      </select>
      {error && (
        <span style={{ fontSize: '12px', color: '#e8622c', marginTop: '4px', display: 'block', fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
          {error}
        </span>
      )}
    </label>
  )
}

function TextareaField({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string
  name: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={4}
        value={value}
        onChange={onChange}
        style={{ ...fieldBase, resize: 'vertical', paddingTop: '14px' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#e8622c' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
      />
    </label>
  )
}
