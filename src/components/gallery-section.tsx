import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface FlatImage { src: string; categoryId: number; categoryTitle: string; gradient: string; glow: string; globalIndex: number }

// ── Hardcode your gallery data here ──────────────────────────────────────────
const CATEGORIES = [
  { id: 1, title: 'Sunday Service',  gradient: 'from-violet-500 to-indigo-600', glow: 'rgba(124,58,237,0.5)' },
  { id: 2, title: 'Youth Meeting',   gradient: 'from-pink-500 to-rose-600',     glow: 'rgba(236,72,153,0.5)' },
  { id: 3, title: 'Sunday School',   gradient: 'from-amber-500 to-orange-600',  glow: 'rgba(245,158,11,0.5)' },
  { id: 4, title: 'Youth Outing',    gradient: 'from-emerald-500 to-teal-600',  glow: 'rgba(16,185,129,0.5)' },
  { id: 5, title: 'Friendship Nite', gradient: 'from-indigo-500 to-violet-600', glow: 'rgba(99,102,241,0.5)' },
  { id: 6, title: 'Family Camp',     gradient: 'from-cyan-500 to-blue-600',     glow: 'rgba(8,145,178,0.5)'  },
]
const RAW_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop', categoryId: 1 },
  { src: 'https://images.unsplash.com/photo-1519491050282-cf00c82424bf?w=800&h=600&fit=crop', categoryId: 1 },
  { src: 'https://images.unsplash.com/photo-1445384763658-0400939e5aa5?w=800&h=600&fit=crop', categoryId: 1 },
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop', categoryId: 2 },
  { src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop', categoryId: 2 },
  { src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop', categoryId: 2 },
  { src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop', categoryId: 3 },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop', categoryId: 3 },
  { src: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&h=600&fit=crop', categoryId: 4 },
  { src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop', categoryId: 4 },
  { src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop', categoryId: 5 },
  { src: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800&h=600&fit=crop', categoryId: 5 },
  { src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop', categoryId: 6 },
  { src: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=600&fit=crop', categoryId: 6 },
]
const ALL_IMAGES: FlatImage[] = RAW_IMAGES.map((img, i) => {
  const cat = CATEGORIES.find(c => c.id === img.categoryId)!
  return { src: img.src, categoryId: img.categoryId, categoryTitle: cat.title, gradient: cat.gradient, glow: cat.glow, globalIndex: i }
})

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<number | 'all'>('all')
  const [lightboxImage, setLightboxImage] = useState<FlatImage | null>(null)
  const filtered = useMemo(() => activeFilter === 'all' ? ALL_IMAGES : ALL_IMAGES.filter(i => i.categoryId === activeFilter), [activeFilter])
  const lbIndex = lightboxImage ? filtered.findIndex(i => i.globalIndex === lightboxImage.globalIndex) : -1
  const navigate = (dir: 1 | -1) => { if (lbIndex < 0) return; setLightboxImage(filtered[(lbIndex + dir + filtered.length) % filtered.length]) }

  return (
    <section className="py-12 relative">
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button onClick={() => setActiveFilter('all')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === 'all' ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white border-transparent shadow-lg' : 'text-white/60 border-white/10 hover:border-violet-400/40 hover:text-white/90'}`}
          style={activeFilter === 'all' ? { boxShadow: '0 4px 20px rgba(124,58,237,0.35)' } : {}}>All</button>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveFilter(cat.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === cat.id ? `bg-gradient-to-r ${cat.gradient} text-white border-transparent shadow-lg` : 'text-white/60 border-white/10 hover:border-violet-400/40 hover:text-white/90'}`}
            style={activeFilter === cat.id ? { boxShadow: `0 4px 20px ${cat.glow}` } : {}}>{cat.title}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <AnimatePresence>
          {filtered.slice(0, 16).map((img, i) => (
            <motion.div key={img.globalIndex} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.88 }} transition={{ duration: 0.35, delay: i * 0.04 }}
              className="group relative cursor-pointer overflow-hidden rounded-xl aspect-square" onClick={() => setLightboxImage(img)}>
              <img src={img.src} alt={img.categoryTitle} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${img.gradient} text-white text-xs font-medium`} style={{ boxShadow: `0 4px 12px ${img.glow}` }}>{img.categoryTitle}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-violet-500/25 bg-transparent" style={{ background: 'rgba(6,8,25,0.95)', backdropFilter: 'blur(30px)' }}>
          <DialogTitle className="sr-only">{lightboxImage?.categoryTitle}</DialogTitle>
          {lightboxImage && (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div key={lightboxImage.globalIndex} className="relative w-full h-[60vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <img src={lightboxImage.src} alt={lightboxImage.categoryTitle} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full glass text-white hover:border-violet-400/50 w-11 h-11 pointer-events-auto"><ChevronLeft className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon" onClick={() => navigate(1)} className="rounded-full glass text-white hover:border-violet-400/50 w-11 h-11 pointer-events-auto"><ChevronRight className="w-5 h-5" /></Button>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setLightboxImage(null)} className="absolute top-3 right-3 rounded-full glass text-white hover:border-violet-400/50 w-9 h-9"><X className="w-4 h-4" /></Button>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{lightboxImage.categoryTitle}</h3>
                  <p className="text-white/50 text-sm">{lbIndex + 1} of {filtered.length}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
