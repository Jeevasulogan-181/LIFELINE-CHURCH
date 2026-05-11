import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { MapPin, Phone, Mail, Clock, Send, Heart } from 'lucide-react'
import { useToast } from '../hooks/use-toast'
import { postContact, postPrayer } from '../lib/api'

// ── Hardcode your church contact info here ────────────────────────────────────
const CHURCH = {
  address:      '123 Church Street, City, State, Country',
  phone:        '+1 234 567 890',
  email:        'info@lifelinechurch.org',
  serviceTimes: 'Sunday 9:00 AM (English) · 11:00 AM (Tamil)',
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const contactItems = [
    { icon: MapPin, title: 'Address',       content: CHURCH.address,      gradient: 'from-violet-500 to-indigo-600', glow: 'rgba(124,58,237,0.35)' },
    { icon: Phone,  title: 'Phone',         content: CHURCH.phone,        gradient: 'from-emerald-500 to-teal-600',  glow: 'rgba(16,185,129,0.35)' },
    { icon: Mail,   title: 'Email',         content: CHURCH.email,        gradient: 'from-cyan-500 to-blue-600',     glow: 'rgba(8,145,178,0.35)'  },
    { icon: Clock,  title: 'Service Times', content: CHURCH.serviceTimes, gradient: 'from-rose-500 to-pink-600',     glow: 'rgba(244,63,94,0.35)'  },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const frm = e.target as HTMLFormElement
    const data = {
      name:    (frm.elements.namedItem('name') as HTMLInputElement).value,
      email:   (frm.elements.namedItem('email') as HTMLInputElement).value,
      message: (frm.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    try {
      await postContact(data)
      toast({ title: 'Message Sent! ✨', description: "We'll get back to you as soon as possible." })
      frm.reset()
    } catch {
      toast({ title: 'Error', description: 'Failed to send. Please try again.', variant: 'destructive' })
    } finally { setIsSubmitting(false) }
  }

  const handlePrayerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const frm = e.target as HTMLFormElement
    const data = {
      name:    (frm.elements.namedItem('prayer-name') as HTMLInputElement).value || undefined,
      request: (frm.elements.namedItem('prayer-request') as HTMLTextAreaElement).value,
    }
    try {
      await postPrayer(data)
      toast({ title: 'Prayer Request Submitted 🙏', description: 'Our prayer team will lift you up.' })
      frm.reset()
    } catch {
      toast({ title: 'Error', description: 'Failed to submit. Please try again.', variant: 'destructive' })
    }
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-x-0 top-0 h-80 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(76,29,149,0.25) 0%, transparent 70%)' }} />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-violet-400 mb-3 font-medium">Reach Out</p>
          <h1 className="text-4xl md:text-5xl font-bold cosmic-text mb-4">Contact Us</h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">We'd love to hear from you. Send us a message or visit us on Sunday.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Card className="heaven-card h-full">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 heaven-text">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="name" className="text-white/70 text-sm">Name</Label><Input id="name" name="name" placeholder="Your name" required /></div>
                    <div className="space-y-2"><Label htmlFor="email" className="text-white/70 text-sm">Email</Label><Input id="email" name="email" type="email" placeholder="your@email.com" required /></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="message" className="text-white/70 text-sm">Message</Label><Textarea id="message" name="message" placeholder="Your message..." rows={6} required className="resize-none" /></div>
                  <Button type="submit" disabled={isSubmitting} className="w-full cosmic-button text-white">
                    {isSubmitting ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</span> : <span className="flex items-center gap-2">Send Message <Send className="h-4 w-4" /></span>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
            <Card className="heaven-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 heaven-text">Get in Touch</h2>
                <div className="space-y-5">
                  {contactItems.map((item, i) => (
                    <motion.div key={item.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex items-start gap-4 group">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0`} style={{ boxShadow: `0 4px 20px ${item.glow}` }}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div><h3 className="font-semibold text-white/80 text-sm mb-0.5">{item.title}</h3><p className="text-white/50 text-sm leading-relaxed">{item.content}</p></div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="heaven-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg" style={{ boxShadow: '0 4px 20px rgba(244,63,94,0.4)' }}>
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold heaven-text">Prayer Request</h2>
                </div>
                <p className="text-white/45 text-sm mb-5 leading-relaxed">Share your prayer requests and our prayer team will lift you up.</p>
                <form className="space-y-4" onSubmit={handlePrayerSubmit}>
                  <div className="space-y-2"><Label htmlFor="prayer-name" className="text-white/70 text-sm">Name (Optional)</Label><Input id="prayer-name" name="prayer-name" placeholder="Your name" /></div>
                  <div className="space-y-2"><Label htmlFor="prayer-request" className="text-white/70 text-sm">Prayer Request</Label><Textarea id="prayer-request" name="prayer-request" placeholder="Share your prayer request..." rows={3} className="resize-none" required /></div>
                  <Button type="submit" variant="outline" className="w-full border-violet-500/30 hover:border-violet-400/60 hover:bg-violet-900/20 text-white/80 bg-transparent">Submit Prayer Request</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
