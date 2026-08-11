import { useEffect, useRef, useState } from 'react'

export default function HeroBackground() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  // Track parallax translation for background orbs
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = container.offsetWidth)
    let height = (canvas.height = container.offsetHeight)

    // Mouse position for interaction & parallax
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
      active: false,
    }

    const handleMouseMove = (e) => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      if (
        e.clientX >= rect.left - 100 &&
        e.clientX <= rect.right + 100 &&
        e.clientY >= rect.top - 100 &&
        e.clientY <= rect.bottom + 100
      ) {
        mouse.targetX = e.clientX - rect.left
        mouse.targetY = e.clientY - rect.top
        mouse.active = true
        const relX = (e.clientX - rect.left - width / 2) / (width / 2)
        const relY = (e.clientY - rect.top - height / 2) / (height / 2)
        setParallax({ x: relX * 25, y: relY * 25 })
      } else {
        mouse.active = false
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      if (!container || !canvas) return
      width = canvas.width = container.offsetWidth
      height = canvas.height = container.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    // ── Read CSS variables live (called every frame for lines/glow) ──
    const getThemeColor = (varName) =>
      getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || '#3DD6D0'

    const hexToRgba = (hex, a) => {
      const h = (hex || '').replace('#', '')
      if (h.length < 6) return `rgba(100,150,200,${a})`
      const r = parseInt(h.slice(0, 2), 16)
      const g = parseInt(h.slice(2, 4), 16)
      const b = parseInt(h.slice(4, 6), 16)
      return `rgba(${r},${g},${b},${a})`
    }

    const getParticleColors = () => [
      getThemeColor('--t-accent'),
      getThemeColor('--t-primary'),
      getThemeColor('--t-accent-light'),
      getThemeColor('--t-primary-mid'),
      getThemeColor('--t-primary-dark'),
    ]

    // ── Particle Network Setup ──
    const particleCount = Math.floor(Math.min(width, 1400) / 22)
    let particles = []

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        const colors = getParticleColors()
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 2.5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.3,
        })
      }
    }

    initParticles()

    // ── Re-init particle colors when theme changes ──
    const themeObserver = new MutationObserver(() => {
      initParticles()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    // ── Sparkles Setup ──
    const sparkleCount = 24
    const sparkles = []
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        alpha: Math.random(),
        speed: Math.random() * 0.008 + 0.002,
        growing: Math.random() > 0.5,
      })
    }

    // ── Data Flow Pulses ──
    const pulseCount = 3
    const pulses = []
    for (let i = 0; i < pulseCount; i++) {
      pulses.push({
        progress: Math.random(),
        speed: Math.random() * 0.0004 + 0.0002,
        pathIndex: i,
      })
    }

    let time = 0

    // ── Main Render Loop ──
    const render = () => {
      time += 0.01

      // Read live theme colors every frame — instantly reflects theme changes
      const accentColor  = getThemeColor('--t-accent')
      const primaryColor = getThemeColor('--t-primary')

      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      ctx.clearRect(0, 0, width, height)

      // ── Interactive Mouse Spotlight Glow ──
      if (mouse.active) {
        const safeAccent  = accentColor.startsWith('#')  ? accentColor  : '#3DD6D0'
        const safePrimary = primaryColor.startsWith('#') ? primaryColor : '#4F9DFF'
        const mouseGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouse.radius * 1.4
        )
        mouseGlow.addColorStop(0,   hexToRgba(safeAccent, 0.18))
        mouseGlow.addColorStop(0.5, hexToRgba(safePrimary, 0.08))
        mouseGlow.addColorStop(1,   'rgba(0,0,0,0)')
        ctx.fillStyle = mouseGlow
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.4, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── Data Flow Curved Lines & Pulses ──
      const paths = [
        [
          { x: -50, y: height * 0.2 },
          { x: width * 0.3,  y: height * 0.1 },
          { x: width * 0.7,  y: height * 0.5 },
          { x: width + 50,   y: height * 0.4 },
        ],
        [
          { x: -50, y: height * 0.6 },
          { x: width * 0.25, y: height * 0.8 },
          { x: width * 0.65, y: height * 0.3 },
          { x: width + 50,   y: height * 0.7 },
        ],
        [
          { x: -50, y: height * 0.85 },
          { x: width * 0.4,  y: height * 0.75 },
          { x: width * 0.8,  y: height * 0.9 },
          { x: width + 50,   y: height * 0.6 },
        ],
      ]

      paths.forEach((p, idx) => {
        // Dashed flow line in theme accent
        ctx.beginPath()
        ctx.moveTo(p[0].x, p[0].y)
        ctx.bezierCurveTo(p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y)
        ctx.strokeStyle = `${accentColor}25`
        ctx.lineWidth = 1.5
        ctx.setLineDash([6, 12])
        ctx.lineDashOffset = -time * 5
        ctx.stroke()
        ctx.setLineDash([])

        // Traveling pulse packet — themed primary & accent
        const pulse = pulses[idx]
        if (pulse) {
          pulse.progress = (pulse.progress + pulse.speed) % 1
          const t = pulse.progress

          const cx1 = 3 * (p[1].x - p[0].x)
          const bx1 = 3 * (p[2].x - p[1].x) - cx1
          const ax1 = p[3].x - p[0].x - cx1 - bx1
          const cy1 = 3 * (p[1].y - p[0].y)
          const by1 = 3 * (p[2].y - p[1].y) - cy1
          const ay1 = p[3].y - p[0].y - cy1 - by1

          const px = ax1 * Math.pow(t, 3) + bx1 * Math.pow(t, 2) + cx1 * t + p[0].x
          const py = ay1 * Math.pow(t, 3) + by1 * Math.pow(t, 2) + cy1 * t + p[0].y

          const safePrimary = primaryColor.startsWith('#') ? primaryColor : '#4F9DFF'
          const safeAccent  = accentColor.startsWith('#')  ? accentColor  : '#3DD6D0'

          const grad = ctx.createRadialGradient(px, py, 0, px, py, 14)
          grad.addColorStop(0,   hexToRgba(safePrimary, 0.7))
          grad.addColorStop(0.5, hexToRgba(safeAccent,  0.35))
          grad.addColorStop(1,   'rgba(0,0,0,0)')

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(px, py, 14, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = '#FFFFFF'
          ctx.beginPath()
          ctx.arc(px, py, 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // ── Draw Particles & Interconnections ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width)  p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        const dx   = p.x - mouse.x
        const dy   = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          p.x += (dx / dist) * force * 2.2
          p.y += (dy / dist) * force * 2.2

          // Cursor → node line in theme accent color
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(p.x, p.y)
          ctx.strokeStyle = accentColor
          ctx.globalAlpha = (1 - dist / mouse.radius) * 0.45
          ctx.lineWidth = 1.2
          ctx.stroke()
          ctx.globalAlpha = 1
        }

        // Particle node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha * 0.6
        ctx.shadowColor = p.color
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1

        // Inter-node network lines in theme accent
        for (let j = i + 1; j < particles.length; j++) {
          const p2   = particles[j]
          const ldx  = p.x - p2.x
          const ldy  = p.y - p2.y
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy)

          if (ldist < 135) {
            const lineAlpha = (1 - ldist / 135) * 0.22
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = accentColor
            ctx.globalAlpha = lineAlpha
            ctx.lineWidth = 0.9
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      // ── Draw Sparkles ──
      sparkles.forEach((s) => {
        if (s.growing) {
          s.alpha += s.speed
          if (s.alpha >= 0.75) s.growing = false
        } else {
          s.alpha -= s.speed
          if (s.alpha <= 0.05) {
            s.growing = true
            s.x = Math.random() * width
            s.y = Math.random() * height
          }
        }

        ctx.save()
        ctx.globalAlpha = s.alpha * 0.65
        ctx.fillStyle = primaryColor
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = accentColor + 'B0'
        ctx.lineWidth = 0.6
        ctx.beginPath()
        ctx.moveTo(s.x - s.size * 2.2, s.y)
        ctx.lineTo(s.x + s.size * 2.2, s.y)
        ctx.moveTo(s.x, s.y - s.size * 2.2)
        ctx.lineTo(s.x, s.y + s.size * 2.2)
        ctx.stroke()
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      themeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-auto overflow-hidden -z-0 select-none"
      style={{
        background: 'linear-gradient(135deg, color-mix(in srgb, var(--t-bg) 95%, white) 0%, color-mix(in srgb, var(--t-bg-light) 90%, white) 100%)',
      }}
    >
      {/* Animated Layer 2: Drifting Blurred Glowing Orbs with Mouse Parallax Shift */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[650px] h-[650px] rounded-full pointer-events-none opacity-[0.16] transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, var(--t-accent) 0%, transparent 70%)',
          filter: 'blur(160px)',
          transform: `translate3d(${parallax.x * 0.8}px, ${parallax.y * 0.8}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.14] transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, var(--t-primary) 0%, transparent 70%)',
          filter: 'blur(180px)',
          transform: `translate3d(${-parallax.x * 1.1}px, ${-parallax.y * 1.1}px, 0)`,
        }}
      />
      <div
        className="absolute top-[35%] left-[25%] w-[450px] h-[450px] rounded-full pointer-events-none opacity-[0.11] transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, var(--t-accent-light) 0%, transparent 70%)',
          filter: 'blur(140px)',
          transform: `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.5}px, 0)`,
        }}
      />

      {/* HTML5 Canvas for Interactive Particle Network, Mouse Spotlight & Data Lines */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  )
}
