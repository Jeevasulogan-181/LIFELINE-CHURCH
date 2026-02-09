"use client"

import React from "react"

import { useState } from "react"
import { Send, Heart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedSection } from "@/components/animated-section"

export function PrayerRequestsSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "prayer",
          name: formData.get("prayer-name") || "Anonymous",
          email: formData.get("prayer-email") || "",
          prayerRequest: formData.get("prayer-request"),
        }),
      })

      if (!response.ok) throw new Error("Failed to submit")

      setSubmitted(true)
      form.reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="prayer-requests" className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: info */}
          <AnimatedSection direction="right">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Prayer Requests
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
                We Pray With You
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                We believe in the power of prayer. Share your prayer request with
                us and our prayer team will lift you up before the Lord. You may
                submit anonymously if you prefer.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Confidential & Caring</p>
                    <p className="text-sm text-muted-foreground">
                      Your requests are treated with the utmost confidentiality
                      and love.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Send className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Submit Anonymously</p>
                    <p className="text-sm text-muted-foreground">
                      Feel free to leave your name blank if you prefer privacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: form */}
          <AnimatedSection direction="left" delay={200}>
            <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm lg:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-pulse">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">
                    Thank You
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Your prayer request has been received. Our prayer team will be
                    praying for you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="prayer-name"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Name{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <Input
                      id="prayer-name"
                      name="prayer-name"
                      placeholder="Your name or leave blank for anonymous"
                      className="border-border bg-muted/50 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="prayer-email"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Email{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <Input
                      id="prayer-email"
                      name="prayer-email"
                      type="email"
                      placeholder="your@email.com"
                      className="border-border bg-muted/50 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="prayer-request"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Prayer Request{" "}
                      <span className="text-primary">*</span>
                    </label>
                    <Textarea
                      id="prayer-request"
                      name="prayer-request"
                      required
                      rows={5}
                      placeholder="Share your prayer request here..."
                      className="border-border bg-muted/50 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Prayer Request
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
