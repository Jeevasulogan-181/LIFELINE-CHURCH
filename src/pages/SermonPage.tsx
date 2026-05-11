import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Calendar, Clock, ChevronLeft, ChevronRight, Mic, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Sermon { id: number; title: string; speaker: string; sermon_date: string; duration: string; service_type: 'English' | 'Tamil' | 'Special'; thumbnail_url: string; video_url: string; description: string }

// ── Add your sermons here ─────────────────────────────────────────────────────
const SERMONS: Sermon[] = [
  { id: 1, title: 'Walking in the Light', speaker: 'Pastor John', sermon_date: '2025-04-20', duration: '42 min', service_type: 'English', thumbnail_url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=340&fit=crop', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'A powerful message on living in the light of Christ, drawing from 1 John 1:5–7.' },
  { id: 2, title: 'The Power of Prayer', speaker: 'Pas. David', sermon_date: '2025-04-20', duration: '38 min', service_type: 'Tamil', thumbnail_url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=340&fit=crop', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Discover the transformative power of a consistent prayer life.' },
  { id: 3, title: 'Grace Upon Grace', speaker: 'Pastor John', sermon_date: '2025-04-13', duration: '45 min', service_type: 'English', thumbnail_url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&h=340&fit=crop', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: "Exploring the depths of God's grace and how it sustains us daily." },
  { id: 4, title: 'New Creation in Christ', speaker: 'Bro. Samuel', sermon_date: '2025-04-13', duration: '36 min', service_type: 'Special', thumbnail_url: 'https://images.unsplash.com/photo-1609234656432-603fd5765f85?w=600&h=340&fit=crop', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'A special revival message on being transformed by the renewing of your mind.' },
  { id: 5, title: 'Faith That Moves Mountains', speaker: 'Pastor John', sermon_date: '2025-04-06', duration: '41 min', service_type: 'English', thumbnail_url: 'https://images.unsplash.com/photo-1519491050282-cf00c82424bf?w=600&h=340&fit=crop', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Jesus tells us that faith the size of a mustard seed can move mountains.' },
  { id: 6, title: 'கர்த்தர் என் மேய்ப்பன்', speaker: 'Pas. David', sermon_date: '2025-04-06', duration: '40 min', service_type: 'Tamil', thumbnail_url: 'https://images.unsplash.com/photo-1445384763658-0400939e5aa5?w=600&h=340&fit=crop', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'A beautiful Tamil message on the 23rd Psalm.' },
  { id: 7, title: 'Overcoming Temptation', speaker: 'Pastor John', sermon_date: '2025-03-30', duration: '44 min', service_type: 'English', thumbnail_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=340&fit=crop', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Practical Biblical strategies to overcome temptation through the Holy Spirit.' },
  { id: 8, title: 'Love One Another', speaker: 'Sis. Mary', sermon_date: '2025-03-30', duration: '33 min', service_type: 'Special', thumbnail_url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=340&fit=crop', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'The greatest commandment — what it truly means to love as Christ loved.' },
]

const SERMONS_PER_PAGE = 8
const FILTERS = ['All', 'English', 'Tamil', 'Special'] as const
type Filter = typeof FILTERS[number]
const serviceStyle: Record<string, { gradient: string; glow: string; tag: string }> = {
  English: { gradient: 'from-violet-500 to-indigo-600', glow: 'rgba(124,58,237,0.45)', tag: 'Sunday English' },
  Tamil:   { gradient: 'from-cyan-500 to-blue-600',     glow: 'rgba(8,145,178,0.45)',   tag: 'Sunday Tamil' },
  Special: { gradient: 'from-rose-500 to-pink-600',     glow: 'rgba(244,63,94,0.45)',   tag: 'Special Meeting' },
}

export default function SermonPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [page, setPage] = useState(1)
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null)

  const filtered = useMemo(() => activeFilter === 'All' ? SERMONS : SERMONS.filter(s => s.service_type === activeFilter), [activeFilter])
  const totalPages = Math.ceil(filtered.length / SERMONS_PER_PAGE)
  const pageSermons = filtered.slice((page - 1) * SERMONS_PER_PAGE, page * SERMONS_PER_PAGE)
  const handleFilter = (f: Filter) => { setActiveFilter(f); setPage(1) }

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-x-0 top-0 h-80 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.22) 0%, transparent 70%)' }} />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-violet-400 mb-3 font-medium">The Word of God</p>
          <h1 className="text-4xl md:text-5xl font-bold cosmic-text mb-4">Sermons</h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">Sunday services, Tamil ministry, and special meetings — every message recorded for you.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[{ icon: <Calendar className="w-3.5 h-3.5" />, label: 'Every Sunday', grad: 'from-violet-500 to-indigo-600' }, { icon: <Mic className="w-3.5 h-3.5" />, label: 'English & Tamil', grad: 'from-cyan-500 to-blue-600' }, { icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Special Meetings', grad: 'from-rose-500 to-pink-600' }].map(p => (
              <span key={p.label} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${p.grad} text-white`}>{p.icon}{p.label}</span>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {FILTERS.map(f => {
            const active = activeFilter === f
            const style = f === 'All' ? { gradient: 'from-violet-500 to-indigo-500', glow: 'rgba(124,58,237,0.35)' } : serviceStyle[f]
            return (
              <button key={f} onClick={() => handleFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${active ? `bg-gradient-to-r ${style.gradient} text-white border-transparent shadow-lg` : 'text-white/60 border-white/10 hover:border-violet-400/40 hover:text-white/90'}`}
                style={active ? { boxShadow: `0 4px 20px ${style.glow}` } : {}}>
                {f === 'All' ? 'All Sermons' : `${f} Service`}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={`${activeFilter}-${page}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {pageSermons.map((sermon, i) => {
              const sStyle = serviceStyle[sermon.service_type] ?? serviceStyle.English
              return (
                <motion.div key={sermon.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }} className="group cursor-pointer" onClick={() => setActiveSermon(sermon)}>
                  <div className="heaven-card rounded-2xl overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={sermon.thumbnail_url} alt={sermon.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/15 border-2 border-white/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-violet-600/70 group-hover:border-violet-300 transition-all duration-300"><Play className="w-5 h-5 text-white fill-white ml-0.5" /></div>
                      </div>
                      <div className="absolute top-2.5 left-2.5"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${sStyle.gradient} text-white`} style={{ boxShadow: `0 3px 10px ${sStyle.glow}` }}>{sStyle.tag}</span></div>
                      {sermon.duration && <div className="absolute bottom-2.5 right-2.5"><span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white/90 text-xs"><Clock className="w-3 h-3" />{sermon.duration}</span></div>}
                    </div>
                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <h3 className="font-semibold text-white/90 text-sm leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors duration-200">{sermon.title}</h3>
                      <div className="flex items-center gap-1.5 text-white/45 text-xs mt-auto">
                        <Mic className="w-3 h-3 flex-shrink-0" /><span>{sermon.speaker}</span>
                        <span className="mx-1 opacity-40">·</span>
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        <span>{new Date(sermon.sermon_date).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <Button variant="ghost" size="icon" disabled={page === 1} onClick={() => setPage(p => p - 1)} className="rounded-full glass text-white/70 hover:text-white disabled:opacity-30 w-10 h-10"><ChevronLeft className="w-5 h-5" /></Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-300 border ${page === p ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white border-transparent' : 'text-white/50 border-white/10 hover:border-violet-400/40 hover:text-white/80'}`} style={page === p ? { boxShadow: '0 4px 18px rgba(124,58,237,0.4)' } : {}}>{p}</button>
            ))}
            <Button variant="ghost" size="icon" disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="rounded-full glass text-white/70 hover:text-white disabled:opacity-30 w-10 h-10"><ChevronRight className="w-5 h-5" /></Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeSermon && (
          <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setActiveSermon(null)}>
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.93, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.93, y: 20 }} transition={{ duration: 0.3, type: 'spring', damping: 22, stiffness: 280 }} className="relative w-full max-w-3xl z-10" onClick={e => e.stopPropagation()}>
              <button onClick={() => setActiveSermon(null)} className="absolute -top-4 -right-4 w-9 h-9 rounded-full glass text-white/80 hover:text-white flex items-center justify-center z-20 transition-colors"><X className="w-4 h-4" /></button>
              <div className="relative rounded-2xl overflow-hidden" style={{ background: 'rgba(6,8,25,0.97)', border: '1px solid rgba(124,58,237,0.3)' }}>
                <div className="aspect-video w-full bg-black">
                  <iframe src={activeSermon.video_url + '?autoplay=1'} title={activeSermon.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${(serviceStyle[activeSermon.service_type] ?? serviceStyle.English).gradient} text-white`}>{(serviceStyle[activeSermon.service_type] ?? serviceStyle.English).tag}</span>
                    {activeSermon.duration && <span className="flex items-center gap-1 text-white/40 text-xs"><Clock className="w-3 h-3" />{activeSermon.duration}</span>}
                    <span className="flex items-center gap-1 text-white/40 text-xs"><Calendar className="w-3 h-3" />{new Date(activeSermon.sermon_date).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-1">{activeSermon.title}</h2>
                  <p className="text-sm text-violet-300 font-medium mb-2">{activeSermon.speaker}</p>
                  {activeSermon.description && <p className="text-sm text-white/50 leading-relaxed">{activeSermon.description}</p>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
