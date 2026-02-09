"use client"

import { useState, useEffect } from "react"
import { Menu, X, Cross } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Ministries", href: "#ministries" },
  { label: "Sermons", href: "#sermons" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visitors", href: "#visitors" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((l) => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a1a]/85 backdrop-blur-lg border-b border-border/60 shadow-sm animate-nav-glow"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <Cross className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-serif text-lg font-bold text-foreground lg:text-xl">
              Lifeline Church
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] bg-primary rounded-full transition-all duration-300 ${
                      isActive ? "w-4 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              )
            })}
            <a href="#prayer-requests">
              <Button
                size="sm"
                className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_16px_rgba(59,130,246,0.3)] transition-all duration-300"
              >
                Prayer Request
              </Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden text-foreground transition-transform duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div
              className={`transition-transform duration-300 ${isOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"}`}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`border-t border-border/60 bg-[#0a0a1a]/95 backdrop-blur-lg lg:hidden overflow-hidden transition-all duration-400 ease-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2.5 text-sm transition-all duration-300 ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                style={{ transitionDelay: isOpen ? `${i * 40}ms` : "0ms" }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            )
          })}
          <a href="#prayer-requests" onClick={() => setIsOpen(false)}>
            <Button
              size="sm"
              className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Prayer Request
            </Button>
          </a>
        </div>
      </div>
    </nav>
  )
}
