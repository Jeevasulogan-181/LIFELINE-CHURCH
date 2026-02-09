"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect()
            if (rect.bottom > 0) {
              setScrollY(window.scrollY)
            }
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background image */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.35}px) scale(1.15)` }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Animated overlay layers */}
      <div className="absolute inset-0 z-10">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0a0a1a]/60" />

        {/* Light ray 1 - blue */}
        <div
          className="absolute inset-0 animate-sweep-ray opacity-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(59, 130, 246, 0.06) 45%, rgba(59, 130, 246, 0.12) 50%, rgba(59, 130, 246, 0.06) 55%, transparent 70%)",
            animationDelay: "0s",
            animationDuration: "12s",
          }}
        />

        {/* Light ray 2 - purple */}
        <div
          className="absolute inset-0 animate-sweep-ray opacity-0"
          style={{
            background:
              "linear-gradient(100deg, transparent 35%, rgba(139, 92, 246, 0.05) 48%, rgba(139, 92, 246, 0.10) 50%, rgba(139, 92, 246, 0.05) 52%, transparent 65%)",
            animationDelay: "4s",
            animationDuration: "15s",
          }}
        />

        {/* Light ray 3 - white */}
        <div
          className="absolute inset-0 animate-sweep-ray opacity-0"
          style={{
            background:
              "linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.03) 49%, rgba(255, 255, 255, 0.07) 50%, rgba(255, 255, 255, 0.03) 51%, transparent 60%)",
            animationDelay: "7s",
            animationDuration: "18s",
          }}
        />

        {/* Bottom gradient fade to background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 60%, #0a0a1a 100%)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(10, 10, 26, 0.5) 100%)",
          }}
        />
      </div>

      {/* Content with staggered reveal */}
      <div className="relative z-20 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
        {/* Welcome text */}
        <p
          className={`mb-4 text-sm font-medium uppercase tracking-[0.25em] text-primary transition-all duration-700 ease-out ${
            loaded
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-6 blur-sm"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          Welcome to Grace Community Church
        </p>

        {/* Main heading */}
        <h1
          className={`font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-7xl text-balance animate-text-glow transition-all duration-900 ease-out ${
            loaded
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-8 blur-sm"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          Where Faith, Love{" "}
          <span className="text-primary">&</span> Hope{" "}
          <span className="block mt-1">Come Alive</span>
        </h1>

        {/* Description */}
        <p
          className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl transition-all duration-700 ease-out ${
            loaded
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-6 blur-sm"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          A welcoming community rooted in the Word of God, dedicated to worship,
          prayer, and fellowship. Come as you are and experience the love of
          Christ.
        </p>

        {/* Quote */}
        <blockquote
          className={`mx-auto mt-8 max-w-xl border-l-2 border-primary/40 pl-4 text-left transition-all duration-700 ease-out ${
            loaded
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-6 blur-sm"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <p className="italic text-muted-foreground">
            {'"For where two or three gather in my name, there am I with them."'}
          </p>
          <cite className="mt-1 block text-sm text-primary/80 not-italic">
            Matthew 18:20
          </cite>
        </blockquote>

        {/* CTA Buttons */}
        <div
          className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-700 ease-out ${
            loaded
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-6 blur-sm"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <a href="#services">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:scale-105 px-8 transition-all duration-300"
            >
              Join Us This Sunday
            </Button>
          </a>
          <a href="#visitors">
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/60 hover:scale-105 px-8 bg-transparent transition-all duration-300"
            >
              {"I'm a New Visitor"}
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-700 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "1400ms" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
          <div className="h-9 w-5 rounded-full border-2 border-foreground/15 flex items-start justify-center pt-1.5">
            <div className="h-2 w-1 rounded-full bg-primary/80 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
