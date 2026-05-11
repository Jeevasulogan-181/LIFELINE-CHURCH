import { motion } from 'framer-motion'
import { Clock, MapPin, ChevronRight, Calendar } from 'lucide-react'

// ── Hardcode your programmes here ────────────────────────────────────────────
const PROGRAMMES = [
  { id: 1, title: 'Sunday English Service', description: 'Join us every Sunday morning for a spirit-filled English worship service with praise, prayer, and the Word of God.', schedule: 'Every Sunday, 9:00 AM', location: 'Main Sanctuary', image_url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=450&fit=crop' },
  { id: 2, title: 'Sunday Tamil Service',   description: 'Our Tamil service is a vibrant gathering filled with worship in Tamil, powerful preaching, and heartfelt prayer.', schedule: 'Every Sunday, 11:00 AM', location: 'Main Sanctuary', image_url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=450&fit=crop' },
  { id: 3, title: 'Youth Ministry',         description: 'A dynamic programme for young people to grow in faith, build friendships, and discover their God-given purpose.', schedule: 'Every Friday, 7:00 PM', location: 'Youth Hall', image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=450&fit=crop' },
  { id: 4, title: 'Sunday School',          description: "Fun, Bible-based learning for children of all ages to grow in their knowledge and love of God's Word.", schedule: 'Every Sunday, 9:00 AM', location: "Children's Block", image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop' },
  { id: 5, title: 'Bible Study',            description: 'An in-depth weekly study of Scripture for adults who want to go deeper in their understanding of the Word.', schedule: 'Every Wednesday, 7:30 PM', location: 'Prayer Room', image_url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=450&fit=crop' },
  { id: 6, title: 'Special Meetings',       description: 'From time to time we host special revival meetings, guest speakers, and outreach events. Watch this space!', schedule: 'Announced periodically', location: 'Main Sanctuary', image_url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=450&fit=crop' },
]

const gradients = [
  { card: 'border-violet-500/20', badge: 'from-violet-500 to-indigo-600', glow: 'rgba(124,58,237,0.3)', dot: 'bg-violet-400' },
  { card: 'border-cyan-500/20',   badge: 'from-cyan-500 to-blue-600',     glow: 'rgba(8,145,178,0.3)',   dot: 'bg-cyan-400' },
  { card: 'border-rose-500/20',   badge: 'from-rose-500 to-pink-600',     glow: 'rgba(244,63,94,0.3)',   dot: 'bg-rose-400' },
  { card: 'border-emerald-500/20',badge: 'from-emerald-500 to-teal-600',  glow: 'rgba(16,185,129,0.3)',  dot: 'bg-emerald-400' },
  { card: 'border-amber-500/20',  badge: 'from-amber-500 to-orange-600',  glow: 'rgba(245,158,11,0.3)',  dot: 'bg-amber-400' },
  { card: 'border-pink-500/20',   badge: 'from-pink-500 to-rose-600',     glow: 'rgba(236,72,153,0.3)',  dot: 'bg-pink-400' },
]

export default function ProgrammesPage() {
  const featured = PROGRAMMES[0]
  const g0 = gradients[0]

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-x-0 top-0 h-80 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(16,185,129,0.2) 0%, transparent 70%)' }} />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-400 font-medium mb-3">Our Ministry</p>
          <h1 className="text-4xl md:text-5xl font-bold cosmic-text mb-4">Programmes</h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">Join us for our regular services and special programmes. Everyone is welcome — come as you are.</p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <p className="text-white/40 text-sm">All programmes run weekly unless otherwise stated</p>
          </div>
        </motion.div>

        {/* Featured */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className={`relative rounded-3xl overflow-hidden border ${g0.card} mb-8 group`} style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="grid md:grid-cols-2 gap-0">
            {featured.image_url && (
              <div className="relative aspect-video md:aspect-auto overflow-hidden">
                <img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 md:block hidden" />
              </div>
            )}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${g0.badge} text-white text-xs font-semibold mb-4 w-fit`} style={{ boxShadow: `0 4px 14px ${g0.glow}` }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />Featured Programme
              </span>
              <h2 className="text-3xl font-bold text-white mb-3">{featured.title}</h2>
              <p className="text-white/60 leading-relaxed mb-6">{featured.description}</p>
              <div className="space-y-3">
                {featured.schedule && <div className="flex items-center gap-3 text-white/70"><div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g0.badge} flex items-center justify-center flex-shrink-0`}><Clock className="w-4 h-4 text-white" /></div><span className="text-sm font-medium">{featured.schedule}</span></div>}
                {featured.location && <div className="flex items-center gap-3 text-white/70"><div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g0.badge} flex items-center justify-center flex-shrink-0`}><MapPin className="w-4 h-4 text-white" /></div><span className="text-sm font-medium">{featured.location}</span></div>}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rest */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROGRAMMES.slice(1).map((prog, i) => {
            const g = gradients[(i + 1) % gradients.length]
            return (
              <motion.div key={prog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative rounded-2xl overflow-hidden border ${g.card} group`} style={{ background: 'rgba(255,255,255,0.02)' }}>
                {prog.image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img src={prog.image_url} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-x-0 top-0 aspect-video bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-2 mb-3"><div className={`w-2 h-2 rounded-full ${g.dot} animate-pulse`} /><span className="text-white/40 text-xs uppercase tracking-wider font-medium">Weekly</span></div>
                  <h3 className="text-xl font-bold text-white mb-2">{prog.title}</h3>
                  {prog.description && <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{prog.description}</p>}
                  <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                    {prog.schedule && <div className="flex items-center gap-2 text-white/50 text-sm"><Clock className="w-3.5 h-3.5 text-white/30 flex-shrink-0" /><span>{prog.schedule}</span></div>}
                    {prog.location && <div className="flex items-center gap-2 text-white/50 text-sm"><MapPin className="w-3.5 h-3.5 text-white/30 flex-shrink-0" /><span>{prog.location}</span></div>}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm">
            <ChevronRight className="w-4 h-4" />All are welcome — come and experience God's presence with us
          </div>
        </motion.div>
      </div>
    </div>
  )
}
