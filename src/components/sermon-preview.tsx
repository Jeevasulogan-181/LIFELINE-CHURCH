import { useLanguage } from '@/components/language-provider'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

const translations = {
  english: { label: 'Latest Sermon', verse: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."', reference: '— John 3:16', watch: 'Watch Now', tagline: 'Be nourished by the Word of God' },
  hindi:   { label: 'नवीनतम संदेश', verse: '"क्योंकि परमेश्वर ने जगत से ऐसा प्रेम रखा..."', reference: '— यूहन्ना 3:16', watch: 'संदेश देखें', tagline: 'परमेश्वर के वचन से पोषित हों' },
  bengali: { label: 'সর্বশেষ বাণী', verse: '"কারণ ঈশ্বর জগতকে এতটাই ভালোবাসলেন..."', reference: '— যোহন ৩:১৬', watch: 'বাণী দেখুন', tagline: 'ঈশ্বরের বাক্য দ্বারা পুষ্ট হন' },
}

// ── Replace with your latest sermon thumbnail ─────────────────────────────────
const SERMON_THUMBNAIL = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=450&fit=crop'

export function SermonPreview() {
  const { language } = useLanguage()
  const content = translations[language]
  return (
    <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="my-20">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.4em] text-violet-400 font-medium mb-2">{content.label}</p>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-violet-500 to-transparent mx-auto" />
      </div>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-400 font-medium mb-6">{content.tagline}</p>
          <div className="text-8xl font-serif leading-none mb-2 select-none" style={{ color: 'rgba(139,92,246,0.25)', fontFamily: 'Georgia, serif', lineHeight: 0.8 }}>"</div>
          <blockquote className="text-xl md:text-2xl font-light text-white/85 leading-relaxed italic mb-6 pl-1">{content.verse}</blockquote>
          <p className="text-violet-400 font-semibold tracking-wide">{content.reference}</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-violet-500/60" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Link to="/sermon" className="block group relative">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-600/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-violet-500/20 group-hover:border-violet-400/40 transition-all duration-300 shadow-2xl shadow-black/60 aspect-video">
              <img src={SERMON_THUMBNAIL} alt="Latest Sermon" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/70 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:bg-violet-600/70 group-hover:border-violet-300 transition-all duration-300">
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                  <span className="text-white font-semibold text-sm tracking-widest uppercase bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 group-hover:border-violet-400/50 group-hover:bg-violet-900/50 transition-all duration-300">{content.watch}</span>
                </motion.div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
