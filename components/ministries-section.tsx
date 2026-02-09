"use client"

import { Users, Heart, HandHeart } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const ministries = [
  {
    icon: Users,
    title: "Youth Ministry",
    description:
      "Our youth ministry provides a vibrant space for young people to explore their faith, build meaningful friendships, and develop leadership skills. Through Bible study, worship, and community service, we equip the next generation to walk boldly in their calling.",
    who: "Young people ages 13-25",
  },
  {
    icon: Heart,
    title: "Mothers' Prayer Group",
    description:
      "Mothers unite in prayer and fellowship, lifting up their families, children, and the church community. This ministry creates a nurturing space where women support and encourage one another through life's seasons.",
    who: "All mothers and women of faith",
  },
  {
    icon: HandHeart,
    title: "Prayer Ministry",
    description:
      "The backbone of our church, the prayer ministry is dedicated to interceding for the needs of our congregation, community, and world. We believe in the transformative power of prayer and gather regularly to seek God's will together.",
    who: "All members who are called to pray",
  },
]

export function MinistriesSection() {
  return (
    <section id="ministries" className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Our Ministries
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
              Serving Together in Faith
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Each ministry is a place where you can grow, serve, and connect with
              others who share your passion for God.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {ministries.map((ministry, i) => {
            const Icon = ministry.icon
            return (
              <AnimatedSection key={ministry.title} delay={i * 150}>
                <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  <div className="absolute top-0 right-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground">
                      {ministry.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {ministry.description}
                    </p>
                    <div className="mt-5 rounded-lg bg-muted/50 px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Who is it for
                      </p>
                      <p className="mt-1 text-sm text-foreground">
                        {ministry.who}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
