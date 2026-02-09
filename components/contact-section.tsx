"use client"

import React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedSection } from "@/components/animated-section"

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 Grace Avenue, Faith City, FC 10001",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@gracecommunity.org",
  },
  {
    icon: Clock,
    label: "Sunday Service",
    value: "9:00 AM - 11:30 AM",
  },
]

export function ContactSection() {
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
          formType: "contact",
          name: formData.get("contact-name"),
          email: formData.get("contact-email"),
          subject: formData.get("contact-subject") || "",
          message: formData.get("contact-message"),
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
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Contact Us
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Have a question, need prayer, or want to know more about us? We
              would love to hear from you.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Contact info */}
          <AnimatedSection direction="right">
            <div className="space-y-6">
              {contactInfo.map((item, i) => {
                const Icon = item.icon
                return (
                  <AnimatedSection key={item.label} delay={i * 100}>
                    <div className="flex items-start gap-4 group">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 text-foreground">{item.value}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}

              {/* Map placeholder */}
              <AnimatedSection delay={500}>
                <div className="mt-8 overflow-hidden rounded-xl border border-border">
                  <div className="flex h-48 items-center justify-center bg-muted/30">
                    <div className="text-center">
                      <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        123 Grace Avenue, Faith City
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Contact form */}
          <AnimatedSection direction="left" delay={200}>
            <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm lg:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-pulse">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">
                    Message Sent
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Thank you for reaching out. We will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Name <span className="text-primary">*</span>
                      </label>
                      <Input
                        id="contact-name"
                        name="contact-name"
                        required
                        placeholder="Your name"
                        className="border-border bg-muted/50 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Email <span className="text-primary">*</span>
                      </label>
                      <Input
                        id="contact-email"
                        name="contact-email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="border-border bg-muted/50 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Subject
                    </label>
                    <Input
                      id="contact-subject"
                      name="contact-subject"
                      placeholder="What is this about?"
                      className="border-border bg-muted/50 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Message <span className="text-primary">*</span>
                    </label>
                    <Textarea
                      id="contact-message"
                      name="contact-message"
                      required
                      rows={5}
                      placeholder="Your message..."
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
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
