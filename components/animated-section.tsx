"use client"

import type { ReactNode } from "react"
import { useInView } from "@/hooks/use-in-view"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "none"
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView()

  const directionStyles = {
    up: "translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView
          ? "opacity-100 translate-y-0 translate-x-0 blur-0"
          : `opacity-0 blur-[2px] ${directionStyles[direction]}`
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: isInView ? "auto" : "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  )
}
