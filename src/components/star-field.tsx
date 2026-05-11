
import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  r: number
  opacity: number
  speed: number
  color: string
  twinkleOffset: number
}

interface ShootingStar {
  x: number
  y: number
  len: number
  speed: number
  angle: number
  opacity: number
  active: boolean
  timer: number
  nextAt: number
}

const STAR_COLORS = [
  "255,255,255",
  "200,220,255",
  "255,240,200",
  "180,200,255",
  "255,200,200",
]

function createStar(w: number, h: number): Star {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.4 + 0.2,
    opacity: Math.random() * 0.7 + 0.2,
    speed: Math.random() * 0.04 + 0.01,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    twinkleOffset: Math.random() * Math.PI * 2,
  }
}

function createShootingStar(w: number, h: number): ShootingStar {
  return {
    x: Math.random() * w * 0.6,
    y: Math.random() * h * 0.4,
    len: Math.random() * 120 + 60,
    speed: Math.random() * 8 + 6,
    angle: Math.PI / 5 + (Math.random() * Math.PI) / 8,
    opacity: 0,
    active: false,
    timer: 0,
    nextAt: Math.random() * 4000 + 2000,
  }
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let lastTime = 0
    let stars: Star[] = []
    let shootingStars: ShootingStar[] = []

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars = Array.from({ length: 280 }, () => createStar(canvas.width, canvas.height))
      shootingStars = Array.from({ length: 3 }, () => createShootingStar(canvas.width, canvas.height))
    }

    resize()
    window.addEventListener("resize", resize)

    function draw(time: number) {
      if (!canvas || !ctx) return
      const dt = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw twinkling stars
      for (const s of stars) {
        const twinkle = Math.sin(time * s.speed + s.twinkleOffset)
        const alpha = s.opacity * (0.6 + 0.4 * twinkle)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.color}, ${alpha.toFixed(3)})`
        ctx.fill()

        // Glow on larger stars
        if (s.r > 1.1) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${s.color}, ${(alpha * 0.12).toFixed(3)})`
          ctx.fill()
        }
      }

      // Draw shooting stars
      for (const ss of shootingStars) {
        ss.timer += dt
        if (!ss.active) {
          if (ss.timer >= ss.nextAt) {
            ss.active = true
            ss.x = Math.random() * canvas.width * 0.7
            ss.y = Math.random() * canvas.height * 0.35
            ss.opacity = 1
            ss.timer = 0
          }
          continue
        }

        // Move
        ss.x += Math.cos(ss.angle) * ss.speed
        ss.y += Math.sin(ss.angle) * ss.speed
        ss.opacity -= 0.018

        if (ss.opacity <= 0 || ss.x > canvas.width || ss.y > canvas.height) {
          ss.active = false
          ss.timer = 0
          ss.nextAt = Math.random() * 5000 + 2500
          continue
        }

        // Draw trail
        const grad = ctx.createLinearGradient(
          ss.x - Math.cos(ss.angle) * ss.len,
          ss.y - Math.sin(ss.angle) * ss.len,
          ss.x,
          ss.y
        )
        grad.addColorStop(0, `rgba(200, 220, 255, 0)`)
        grad.addColorStop(0.7, `rgba(220, 235, 255, ${(ss.opacity * 0.6).toFixed(3)})`)
        grad.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity.toFixed(3)})`)

        ctx.beginPath()
        ctx.moveTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len)
        ctx.lineTo(ss.x, ss.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Head glow
        ctx.beginPath()
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity.toFixed(3)})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-9] pointer-events-none"
      aria-hidden="true"
    />
  )
}
