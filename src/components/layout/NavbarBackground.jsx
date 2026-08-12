import { useEffect, useRef } from 'react'

/**
 * Draws recognizable hospital icons as canvas paths.
 * Each draw function takes (ctx, x, y, size, color).
 */
const ICON_DRAWERS = [

  // ── Medical Cross ──
  (ctx, x, y, s, col) => {
    const t = s * 0.28
    ctx.fillStyle = col
    ctx.beginPath()
    // vertical bar
    ctx.rect(x - t / 2, y - s / 2, t, s)
    // horizontal bar
    ctx.rect(x - s / 2, y - t / 2, s, t)
    ctx.fill()
  },

  // ── Heart ──
  (ctx, x, y, s, col) => {
    ctx.fillStyle = col
    ctx.beginPath()
    const r = s * 0.28
    // left lobe
    ctx.arc(x - r, y - s * 0.1, r, Math.PI, 0)
    // right lobe
    ctx.arc(x + r, y - s * 0.1, r, Math.PI, 0)
    // point
    ctx.lineTo(x, y + s * 0.55)
    ctx.closePath()
    ctx.fill()
  },

  // ── Stethoscope ──
  (ctx, x, y, s, col) => {
    ctx.strokeStyle = col
    ctx.lineWidth = s * 0.13
    ctx.lineCap = 'round'
    // chest piece circle
    ctx.beginPath()
    ctx.arc(x, y + s * 0.3, s * 0.22, 0, Math.PI * 2)
    ctx.stroke()
    // tube up from chest piece
    ctx.beginPath()
    ctx.moveTo(x, y + s * 0.08)
    ctx.lineTo(x, y - s * 0.1)
    // curve left
    ctx.arc(x - s * 0.22, y - s * 0.1, s * 0.22, 0, -Math.PI / 2, true)
    // earpiece left
    ctx.lineTo(x - s * 0.22, y - s * 0.48)
    ctx.stroke()
    // right earpiece
    ctx.beginPath()
    ctx.moveTo(x, y - s * 0.32)
    ctx.arc(x + s * 0.22, y - s * 0.1, s * 0.22, Math.PI, -Math.PI / 2)
    ctx.lineTo(x + s * 0.22, y - s * 0.48)
    ctx.stroke()
  },

  // ── Pill ──
  (ctx, x, y, s, col) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(Math.PI / 4)
    const w = s * 0.3, h = s * 0.55
    const r = w / 2
    ctx.strokeStyle = col
    ctx.lineWidth = s * 0.1
    // pill outline (rounded rect)
    ctx.beginPath()
    ctx.roundRect(-w / 2, -h / 2, w, h, r)
    ctx.stroke()
    // divider line
    ctx.beginPath()
    ctx.moveTo(-w / 2, 0)
    ctx.lineTo(w / 2, 0)
    ctx.stroke()
    ctx.restore()
  },

  // ── Syringe ──
  (ctx, x, y, s, col) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(-Math.PI / 4)
    ctx.strokeStyle = col
    ctx.lineWidth = s * 0.1
    ctx.lineCap = 'round'
    // barrel
    ctx.beginPath()
    ctx.rect(-s * 0.1, -s * 0.35, s * 0.2, s * 0.5)
    ctx.stroke()
    // plunger
    ctx.beginPath()
    ctx.moveTo(0, -s * 0.35)
    ctx.lineTo(0, -s * 0.48)
    ctx.stroke()
    // needle
    ctx.beginPath()
    ctx.moveTo(0, s * 0.15)
    ctx.lineTo(0, s * 0.45)
    ctx.stroke()
    ctx.restore()
  },

  // ── Hospital Building with H ──
  (ctx, x, y, s, col) => {
    ctx.fillStyle = col
    // building body
    ctx.beginPath()
    ctx.roundRect(x - s * 0.38, y - s * 0.25, s * 0.76, s * 0.65, 2)
    ctx.fill()
    // roof peak
    ctx.fillStyle = col
    ctx.beginPath()
    ctx.moveTo(x - s * 0.45, y - s * 0.25)
    ctx.lineTo(x, y - s * 0.52)
    ctx.lineTo(x + s * 0.45, y - s * 0.25)
    ctx.closePath()
    ctx.fill()
    // H letter cut-out (white)
    ctx.fillStyle = 'rgba(255,255,255,0.85)'
    const bw = s * 0.1, bh = s * 0.32, gap = s * 0.12
    ctx.fillRect(x - gap - bw, y - bh / 2, bw, bh)   // left bar
    ctx.fillRect(x + gap,      y - bh / 2, bw, bh)   // right bar
    ctx.fillRect(x - gap,      y - bw / 2, gap * 2,  bw) // crossbar
  },

  // ── ECG / Heartbeat line ──
  (ctx, x, y, s, col) => {
    ctx.strokeStyle = col
    ctx.lineWidth = s * 0.09
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(x - s * 0.5,  y)
    ctx.lineTo(x - s * 0.25, y)
    ctx.lineTo(x - s * 0.15, y - s * 0.45)
    ctx.lineTo(x,            y + s * 0.4)
    ctx.lineTo(x + s * 0.12, y - s * 0.2)
    ctx.lineTo(x + s * 0.22, y)
    ctx.lineTo(x + s * 0.5,  y)
    ctx.stroke()
  },

  // ── Medical Bag ──
  (ctx, x, y, s, col) => {
    ctx.fillStyle = col
    // bag body
    ctx.beginPath()
    ctx.roundRect(x - s * 0.38, y - s * 0.2, s * 0.76, s * 0.58, s * 0.08)
    ctx.fill()
    // handle arc
    ctx.strokeStyle = col
    ctx.lineWidth = s * 0.1
    ctx.beginPath()
    ctx.arc(x, y - s * 0.2, s * 0.18, Math.PI, 0)
    ctx.stroke()
    // cross on bag
    const t = s * 0.1
    ctx.fillStyle = 'rgba(255,255,255,0.88)'
    ctx.fillRect(x - t / 2, y - s * 0.04, t, s * 0.28)    // vertical
    ctx.fillRect(x - s * 0.2, y + s * 0.08, s * 0.4, t)  // horizontal
  },

  // ── DNA Helix simplified ──
  (ctx, x, y, s, col) => {
    ctx.strokeStyle = col
    ctx.lineWidth = s * 0.08
    ctx.lineCap = 'round'
    // two intertwining sine waves
    for (let strand = 0; strand < 2; strand++) {
      ctx.beginPath()
      for (let i = 0; i <= 20; i++) {
        const t  = i / 20
        const sy = y - s * 0.5 + t * s
        const sx = x + Math.sin(t * Math.PI * 3 + strand * Math.PI) * s * 0.25
        i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy)
      }
      ctx.stroke()
    }
    // rungs
    for (let i = 1; i <= 5; i++) {
      const t  = i / 6
      const sy = y - s * 0.5 + t * s
      const sx1 = x + Math.sin(t * Math.PI * 3) * s * 0.25
      const sx2 = x + Math.sin(t * Math.PI * 3 + Math.PI) * s * 0.25
      ctx.beginPath()
      ctx.moveTo(sx1, sy)
      ctx.lineTo(sx2, sy)
      ctx.stroke()
    }
  },

  // ── Ambulance cross shield ──
  (ctx, x, y, s, col) => {
    ctx.fillStyle = col
    // shield shape
    ctx.beginPath()
    ctx.moveTo(x, y - s * 0.5)
    ctx.lineTo(x + s * 0.4, y - s * 0.28)
    ctx.lineTo(x + s * 0.4, y + s * 0.1)
    ctx.arc(x, y + s * 0.5, s * 0.44, 0, Math.PI, true)
    ctx.lineTo(x - s * 0.4, y + s * 0.1)
    ctx.lineTo(x - s * 0.4, y - s * 0.28)
    ctx.closePath()
    ctx.fill()
    // cross cut-out
    const t = s * 0.12
    ctx.fillStyle = 'rgba(255,255,255,0.88)'
    ctx.fillRect(x - t / 2, y - s * 0.22, t, s * 0.44)
    ctx.fillRect(x - s * 0.22, y - t / 2, s * 0.44, t)
  },
]

export default function NavbarBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width  = canvas.width  = canvas.offsetWidth
    let height = canvas.height = canvas.offsetHeight

    const getVar = (n) =>
      getComputedStyle(document.documentElement).getPropertyValue(n).trim() || null

    const COUNT = 18

    function makeParticle(index, forceY = null) {
      return {
        x:       (width / COUNT) * index + Math.random() * (width / COUNT),
        y:       forceY !== null ? forceY : height + Math.random() * height,
        size:    Math.random() * 14 + 14,        // 14–28 px
        speed:   Math.random() * 0.22 + 0.10,
        opacity: 0,
        targetOpacity: Math.random() * 0.20 + 0.12,  // 0.12–0.32
        fadeIn:  true,
        dx:      (Math.random() - 0.5) * 0.28,
        angle:   Math.random() * Math.PI * 2,
        rotSpeed:(Math.random() - 0.5) * 0.012,
        iconIdx: Math.floor(Math.random() * ICON_DRAWERS.length),
        useAccent: Math.random() > 0.6,
      }
    }

    const particles = Array.from({ length: COUNT }, (_, i) => makeParticle(i, Math.random() * height))

    let rafId

    const render = () => {
      rafId = requestAnimationFrame(render)
      ctx.clearRect(0, 0, width, height)

      const primary = getVar('--t-primary') || '#00685e'
      const accent  = getVar('--t-accent')  || '#67d9ca'

      particles.forEach((p, i) => {
        p.y     -= p.speed
        p.x     += p.dx
        p.angle += p.rotSpeed

        // Fade in
        if (p.fadeIn) {
          p.opacity = Math.min(p.opacity + 0.007, p.targetOpacity)
          if (p.opacity >= p.targetOpacity) p.fadeIn = false
        }
        // Fade out in top 35%
        if (p.y < height * 0.35) {
          p.opacity = Math.max(0, p.opacity - 0.010)
        }
        // Respawn
        if (p.y < -30 || (p.opacity <= 0 && p.y < height * 0.2)) {
          particles[i] = makeParticle(i)
          return
        }

        const color = p.useAccent ? accent : primary

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.globalAlpha = p.opacity

        ICON_DRAWERS[p.iconIdx](ctx, 0, 0, p.size, color)

        ctx.restore()
      })
    }

    render()

    // Theme observer — reassign colors (getVar reads live so no action needed)
    const onResize = () => {
      width  = canvas.width  = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
