"use client"

import { MapPin, Clock, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"

const expectations = [
  {
    icon: Heart,
    title: "A Warm Welcome",
    description:
      "From the moment you walk through our doors, you will be greeted with open arms. No judgment, no pressure -- just genuine love.",
  },
  {
    icon: Clock,
    title: "Meaningful Worship",
    description:
      "Our services include heartfelt praise, powerful prayer, and a relevant message from God's Word. Services typically last about 2 hours.",
  },
  {
    icon: Users,
    title: "A Diverse Community",
    description:
      "People of all ages, backgrounds, and walks of life worship together here. Everyone is welcome and valued.",
  },
  {
    icon: MapPin,
    title: "Come As You Are",
    description:
      "There is no dress code and no expectations. Whether this is your first time in a church or your thousandth, you belong here.",
  },
]

export function VisitorsSection() {
  return (
    <section id="visitors" className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              New Visitors
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
              Your First Visit
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We are so glad you are considering visiting us. Here is what you can
              expect when you walk through our doors.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {expectations.map((item, i) => {
            const Icon = item.icon
            return (
              <AnimatedSection key={item.title} delay={i * 120} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="group flex h-full gap-4 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        <AnimatedSection delay={600}>
          <div className="mt-12 text-center">
            <p className="mb-6 text-lg text-muted-foreground">
              Ready to join us? We would love to meet you this Sunday.
            </p>
            <a href="#contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Plan Your Visit
              </Button>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
