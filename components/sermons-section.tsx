"use client"

import { Play, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"

const sermons = [
  {
    title: "Walking by Faith, Not by Sight",
    scripture: "2 Corinthians 5:7",
    speaker: "Pastor David",
    date: "Feb 2, 2026",
    summary:
      "A powerful reminder that our journey with God requires trust even when the path is unclear. Faith is the substance of things hoped for.",
  },
  {
    title: "The Power of Prayer in Every Season",
    scripture: "1 Thessalonians 5:16-18",
    speaker: "Pastor David",
    date: "Jan 26, 2026",
    summary:
      "Discovering the joy of continual prayer and giving thanks in all circumstances as a foundation for a Spirit-led life.",
  },
  {
    title: "Love One Another as I Have Loved You",
    scripture: "John 13:34-35",
    speaker: "Elder Sarah",
    date: "Jan 19, 2026",
    summary:
      "Jesus calls us to a radical love that transforms communities and draws others to His light. How do we love without limits?",
  },
]

export function SermonsSection() {
  return (
    <section id="sermons" className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Sermons & Teachings
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
              Grow in the Word
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Weekly messages rooted in Scripture to strengthen your faith and
              guide your walk with Christ.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 space-y-6">
          {sermons.map((sermon, i) => (
            <AnimatedSection key={sermon.title} delay={i * 150} direction="left">
              <div className="group flex flex-col gap-6 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Play className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {sermon.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      <BookOpen className="h-3 w-3" />
                      {sermon.scripture}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {sermon.speaker}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {sermon.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {sermon.summary}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 border-primary/30 text-primary hover:bg-primary/10 sm:self-center bg-transparent"
                >
                  <Play className="mr-1.5 h-3.5 w-3.5" />
                  Listen
                </Button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500}>
          <div className="mt-10 text-center">
            <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10 bg-transparent">
              View All Sermons
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
