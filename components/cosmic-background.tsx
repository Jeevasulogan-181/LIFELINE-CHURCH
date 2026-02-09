"use client"

import { useEffect, useRef } from "react"

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 35 : 75

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    interface Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      vx: number
      vy: number
      opacity: number
      pulseSpeed: number
      pulseOffset: number
    }

    interface ShootingStar {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      length: number
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.015 + 0.004,
        pulseOffset: Math.random() * Math.PI * 2,
      }
    })

    const shootingStars: ShootingStar[] = []
    let lastShootingStarTime = 0
    const connectionDistance = isMobile ? 80 : 120

    let animationId: number
    let time = 0

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const mouseRadius = 150

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouseRadius && dist > 0) {
          const force = ((mouseRadius - dist) / mouseRadius) * 0.6
          p.x += (dx / dist) * force
          p.y += (dy / dist) * force
        }

        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        const pulse =
          Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.25 + 0.75
        const finalOpacity = p.opacity * pulse

        // Blue glow halo
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${finalOpacity * 0.08})`
        ctx.fill()

        // Star particle dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 200, 255, ${finalOpacity})`
        ctx.fill()
      }

      // Connection lines (constellation)
      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < connectionDistance) {
              const alpha = (1 - dist / connectionDistance) * 0.1
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      // Shooting stars
      const now = Date.now()
      if (
        now - lastShootingStarTime > (isMobile ? 6000 : 4000) &&
        Math.random() < 0.015
      ) {
        lastShootingStarTime = now
        const startX = Math.random() * canvas.width * 0.8
        shootingStars.push({
          x: startX,
          y: 0,
          vx: (Math.random() * 3 + 2) * (Math.random() > 0.5 ? 1 : -1),
          vy: Math.random() * 4 + 3,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          length: 60 + Math.random() * 40,
        })
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]
        s.x += s.vx
        s.y += s.vy
        s.life++

        const lifeRatio = s.life / s.maxLife
        const alpha =
          lifeRatio < 0.3
            ? lifeRatio / 0.3
            : lifeRatio > 0.7
              ? (1 - lifeRatio) / 0.3
              : 1

        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * (s.length / 5),
          s.y - s.vy * (s.length / 5),
        )
        grad.addColorStop(0, `rgba(180, 200, 255, ${alpha * 0.7})`)
        grad.addColorStop(1, "rgba(59, 130, 246, 0)")

        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(
          s.x - s.vx * (s.length / 5),
          s.y - s.vy * (s.length / 5),
        )
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1)
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      {/* Dark space gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a0a1a 0%, #0d0d20 25%, #0a0a18 50%, #0d0d20 75%, #0a0a1a 100%)",
        }}
      />

      {/* Blue nebula glow - drifting */}
      <div
        className="absolute inset-0 animate-drift"
        style={{
          background:
            "radial-gradient(ellipse 650px 650px at 20% 40%, rgba(59, 130, 246, 0.08), transparent)",
        }}
      />

      {/* Purple glow - pulsing */}
      <div
        className="absolute inset-0 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(ellipse 550px 550px at 75% 70%, rgba(139, 92, 246, 0.06), transparent)",
          animationDelay: "4s",
        }}
      />

      {/* Warm accent glow */}
      <div
        className="absolute inset-0 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(ellipse 300px 300px at 60% 30%, rgba(236, 72, 153, 0.04), transparent)",
          animationDelay: "6s",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute w-96 h-96 rounded-full animate-float opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)",
          filter: "blur(80px)",
          top: "10%",
          left: "15%",
          willChange: "transform",
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full animate-float-slow opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)",
          filter: "blur(80px)",
          bottom: "20%",
          right: "10%",
          willChange: "transform",
        }}
      />
      <div
        className="absolute w-60 h-60 rounded-full animate-drift opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.3), transparent 70%)",
          filter: "blur(60px)",
          top: "55%",
          left: "50%",
          willChange: "transform",
        }}
      />

      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ willChange: "contents" }} />
    </div>
  )
}
