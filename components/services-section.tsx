"use client"

import { Clock, Users, Heart, BookOpen, HandHeart } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const services = [
  {
    icon: BookOpen,
    title: "Sunday Worship Service",
    day: "Every Sunday",
    time: "9:00 AM - 11:30 AM",
    description:
      "Our main worship service for all members and visitors. Join us for praise, prayer, and the Word of God.",
  },
  {
    icon: HandHeart,
    title: "Wednesday Prayer Meeting",
    day: "Every Wednesday",
    time: "6:30 PM - 8:00 PM",
    description:
      "Midweek prayer and spiritual renewal. A time to come together and seek God's presence and guidance.",
  },
  {
    icon: Clock,
    title: "Friday Prayer Meeting",
    day: "Every Friday",
    time: "7:00 PM - 9:00 PM",
    description:
      "Dedicated prayer for our church, families, and community. Stand in the gap for those in need.",
  },
  {
    icon: Users,
    title: "Youth Meeting",
    day: "Every Saturday",
    time: "4:00 PM - 6:00 PM",
    description:
      "Fellowship, worship, and Bible discussion designed for our young people to grow in faith together.",
  },
  {
    icon: Heart,
    title: "Mothers' Prayer",
    day: "First Saturday of the Month",
    time: "10:00 AM - 12:00 PM",
    description:
      "Intercessory prayer for families, children, and the church. Mothers uniting in faith and love.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      {/* Subtle section divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Weekly Schedule
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
              Join Us in Worship & Prayer
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Every gathering is an opportunity to grow closer to God and each
              other. Find the service that speaks to your heart.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <AnimatedSection key={service.title} delay={i * 100}>
                <div className="group h-full rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {service.day}
                    </span>
                    <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {service.time}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
