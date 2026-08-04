import { useEffect, useRef } from 'react'

export default function ParticleNetwork() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = canvas.parentElement.offsetWidth)
    let height = (canvas.height = canvas.parentElement.offsetHeight)

    // Handle Window Resize
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.offsetWidth
      height = canvas.height = canvas.parentElement.offsetHeight
      initParticles()
    }
    window.addEventListener('resize', handleResize)

    // Track Mouse
    const mouse = {
      x: null,
      y: null,
      radius: 140,
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    const parent = canvas.parentElement
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove)
      parent.addEventListener('mouseleave', handleMouseLeave)
    }

    // Particle Setup
    let particles = []
    const particleColors = ['#2563EB', '#3B82F6', '#06B6D4', '#60A5FA']

    class Particle {
      constructor(x, y) {
        this.x = x || Math.random() * width
        this.y = y || Math.random() * height
        this.radius = Math.random() * 2 + 1.5
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)]
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.baseAlpha = Math.random() * 0.25 + 0.15
        this.glow = Math.random() > 0.6
      }

      update() {
        // Move particle
        this.x += this.vx
        this.y += this.vy

        // Wrap around boundaries
        if (this.x < -10) this.x = width + 10
        if (this.x > width + 10) this.x = -10
        if (this.y < -10) this.y = height + 10
        if (this.y > height + 10) this.y = -10

        // Mouse interaction - gentle repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const dist = Math.hypot(dx, dy)
          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius
            const angle = Math.atan2(dy, dx)
            this.x -= Math.cos(angle) * force * 1.5
            this.y -= Math.sin(angle) * force * 1.5
          }
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)

        if (this.glow) {
          ctx.shadowBlur = 10
          ctx.shadowColor = this.color
        } else {
          ctx.shadowBlur = 0
        }

        ctx.fillStyle = this.color
        ctx.globalAlpha = this.baseAlpha
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const initParticles = () => {
      particles = []
      // Scale particle density based on screen area
      const count = Math.min(Math.floor((width * height) / 10000), 75)
      for (let i = 0; i < count; i++) {
        particles.push(new Particle())
      }
    }

    initParticles()

    // Animation Loop (60 FPS)
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      // Draw connecting lines between close particles
      const maxDistance = 120
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const dist = Math.hypot(dx, dy)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.strokeStyle = '#3B82F6'
            ctx.globalAlpha = alpha
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw subtle connecting lines from mouse cursor to nearby particles
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x
          const dy = mouse.y - particles[i].y
          const dist = Math.hypot(dx, dy)
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.22
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(particles[i].x, particles[i].y)
            ctx.strokeStyle = '#06B6D4'
            ctx.globalAlpha = alpha
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1.0
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove)
        parent.removeEventListener('mouseleave', handleMouseLeave)
      }
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  )
}
