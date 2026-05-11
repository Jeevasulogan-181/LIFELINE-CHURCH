import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../components/ui/card'
import { Heart, Users, BookOpen, Star } from 'lucide-react'

const values = [
  { icon: Heart,     title: 'Love',      description: "We believe in spreading God's unconditional love to everyone we meet.",      gradient: 'from-rose-500 to-pink-600',   glow: 'rgba(244,63,94,0.3)' },
  { icon: Users,     title: 'Community', description: 'Building strong relationships and supporting each other in faith.',           gradient: 'from-violet-500 to-indigo-600',glow: 'rgba(139,92,246,0.3)' },
  { icon: BookOpen,  title: 'Truth',     description: 'Grounded in the Word of God, teaching biblical truth with clarity.',          gradient: 'from-cyan-500 to-blue-600',    glow: 'rgba(8,145,178,0.3)' },
  { icon: Star,      title: 'Excellence',description: 'Serving God and others with excellence in all that we do.',                   gradient: 'from-amber-500 to-orange-600', glow: 'rgba(245,158,11,0.3)' },
]

const leaders = [
  { name: 'Pastor John Smith', role: 'Senior Pastor',   image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', description: 'Leading our congregation with wisdom and compassion for over 15 years.', color: 'from-violet-600 to-indigo-600' },
  { name: 'Sarah Johnson',     role: 'Worship Leader',  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face', description: 'Bringing hearts closer to God through music and worship.',               color: 'from-pink-600 to-rose-600' },
  { name: 'Michael Chen',      role: 'Youth Pastor',    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', description: 'Passionate about guiding young people in their faith journey.',            color: 'from-cyan-600 to-blue-600' },
]

export default function AboutPage() {
  const info = { church_name: 'Lifeline Church', about_story: 'Lifeline Church was founded with a simple yet profound vision: to be a beacon of hope and a lifeline for those seeking spiritual growth and community. What started as a small gathering has grown into a vibrant family of believers united by faith.', about_story_2: 'Today, we continue to grow and serve our community, reaching out with the love of Christ and making disciples who make a difference in the world.' }

  const story1 = info.about_story || "Lifeline Church was founded with a simple yet profound vision: to be a beacon of hope and a lifeline for those seeking spiritual growth and community. What started as a small gathering has grown into a vibrant family of believers united by faith."
  const story2 = info.about_story_2 || "Today, we continue to grow and serve our community, reaching out with the love of Christ and making disciples who make a difference in the world."

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-x-0 top-0 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(76,29,149,0.25) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-violet-400 mb-3 font-medium">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-bold heaven-text mb-5">About {info.church_name || 'Lifeline Church'}</h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            A place where faith comes alive and lives are transformed through the power of God's love.
          </p>
        </motion.div>

        {/* Story */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl opacity-30"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(8,145,178,0.3))', filter: 'blur(8px)' }} />
            <Card className="heaven-card overflow-hidden relative">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6 text-center heaven-text">Our Story</h2>
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <p className="text-white/60 leading-relaxed">{story1}</p>
                  <p className="text-white/60 leading-relaxed">{story2}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-violet-400 mb-3 font-medium">What We Stand For</p>
            <h2 className="text-3xl font-bold heaven-text">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                <Card className="heaven-card h-full">
                  <CardContent className="p-6 text-center">
                    <div className="relative w-16 h-16 mx-auto mb-5">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg`}
                        style={{ boxShadow: `0 8px 30px ${value.glow}` }}>
                        <value.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Leadership */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-violet-400 mb-3 font-medium">Meet the Team</p>
            <h2 className="text-3xl font-bold heaven-text">Our Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <motion.div key={leader.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                <Card className="heaven-card overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-5">
                      <div className={`absolute -inset-1 rounded-full bg-gradient-to-br ${leader.color} opacity-40 blur-md group-hover:opacity-70 transition-opacity`} />
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-violet-500/30">
                        <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{leader.name}</h3>
                    <p className="text-violet-400 text-sm mb-3 font-medium">{leader.role}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{leader.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
