import { useEffect, useRef } from 'react'

/**
 * GlobalCursorGlow
 * ─────────────────
 * A fixed full-page canvas overlay that renders a smooth, soft radial glow
 * that follows the user's cursor across EVERY page of the site.
 * Colors are read live from CSS theme variables so it auto-adapts to all themes.
 */
export default function GlobalCursorGlow() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width  = (canvas.width  = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Cursor position — raw target & smooth lerped current
    let targetX = width  / 2
    let targetY = height / 2
    let currentX = width  / 2
    let currentY = height / 2
    let isMoving = false
    let fadeOpacity = 0          // fades in on first move, fades out on idle
    let lastMoveTime = 0
    let rafId

    const LERP    = 0.07         // smoothing factor (lower = smoother/slower)
    const RADIUS  = 320          // glow radius in px
    const FADE_SPEED = 0.04      // opacity change per frame

    // ── Read live CSS variables ──
    const getVar = (name) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim()

    const hexToRgb = (hex) => {
      const h = (hex || '').replace('#', '')
      if (h.length < 6) return null
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
      }
    }

    const onMouseMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      isMoving = true
      lastMoveTime = Date.now()
    }

    const onResize = () => {
      width  = canvas.width  = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize',    onResize,    { passive: true })

    const render = () => {
      rafId = requestAnimationFrame(render)

      // Lerp toward cursor
      currentX += (targetX - currentX) * LERP
      currentY += (targetY - currentY) * LERP

      // Fade in when moving, fade out 2s after last move
      const idle = Date.now() - lastMoveTime > 2000
      if (isMoving && !idle) {
        fadeOpacity = Math.min(1, fadeOpacity + FADE_SPEED)
      } else {
        fadeOpacity = Math.max(0, fadeOpacity - FADE_SPEED * 0.5)
      }

      ctx.clearRect(0, 0, width, height)

      if (fadeOpacity < 0.01) return

      // ── Read theme colors each frame ──
      const primaryHex = getVar('--t-primary')
      const accentHex  = getVar('--t-accent')
      const primary = hexToRgb(primaryHex)
      const accent  = hexToRgb(accentHex)

      if (!primary || !accent) return

      // ── Large soft outer glow (accent) ──
      const outerGlow = ctx.createRadialGradient(
        currentX, currentY, 0,
        currentX, currentY, RADIUS
      )
      outerGlow.addColorStop(0,   `rgba(${accent.r},${accent.g},${accent.b},${0.10 * fadeOpacity})`)
      outerGlow.addColorStop(0.4, `rgba(${primary.r},${primary.g},${primary.b},${0.06 * fadeOpacity})`)
      outerGlow.addColorStop(1,   'rgba(0,0,0,0)')

      ctx.fillStyle = outerGlow
      ctx.beginPath()
      ctx.arc(currentX, currentY, RADIUS, 0, Math.PI * 2)
      ctx.fill()

      // ── Tight bright inner core (primary) ──
      const innerGlow = ctx.createRadialGradient(
        currentX, currentY, 0,
        currentX, currentY, RADIUS * 0.35
      )
      innerGlow.addColorStop(0,   `rgba(${primary.r},${primary.g},${primary.b},${0.14 * fadeOpacity})`)
      innerGlow.addColorStop(0.6, `rgba(${accent.r},${accent.g},${accent.b},${0.05 * fadeOpacity})`)
      innerGlow.addColorStop(1,   'rgba(0,0,0,0)')

      ctx.fillStyle = innerGlow
      ctx.beginPath()
      ctx.arc(currentX, currentY, RADIUS * 0.35, 0, Math.PI * 2)
      ctx.fill()
    }

    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize',    onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width:  '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9990,
        mixBlendMode: 'normal',
      }}
    />
  )
}
