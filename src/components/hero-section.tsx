import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Heart, Users, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

const translations = {
  bengali: { title: 'লাইফলাইন চার্চ', subtitle: 'বিশ্বাস, আশা এবং ভালোবাসার একটি সম্প্রদায়', description: 'ঈশ্বরের উপস্থিতি অনুভব করুন এবং আপনার আধ্যাত্মিক যাত্রায় আমাদের সাথে যোগ দিন।', faith: 'বিশ্বাস', community: 'সম্প্রদায়', hope: 'আশা', cta: 'আমাদের সাথে যোগ দিন', welcome: 'স্বাগতম' },
  hindi:   { title: 'लाइफलाइन चर्च', subtitle: 'विश्वास, आशा और प्रेम का एक समुदाय', description: 'परमेश्वर की उपस्थिति का अनुभव करें और अपनी आध्यात्मिक यात्रा में हमारे साथ जुड़ें।', faith: 'विश्वास', community: 'समुदाय', hope: 'आशा', cta: 'हमसे जुड़ें', welcome: 'स्वागत है' },
  english: { title: 'Lifeline Church', subtitle: 'A Community of Faith, Hope & Love', description: 'Experience the presence of God and join us on your spiritual journey.', faith: 'Faith', community: 'Community', hope: 'Hope', cta: 'Join Us', welcome: 'Welcome to' },
}

// ── Replace these URLs with your real church photos ───────────────────────────
const SLIDES = [
  { id: 1, image_url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop', caption: 'Sunday Service' },
  { id: 2, image_url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop', caption: 'Youth Meeting' },
  { id: 3, image_url: 'https://images.unsplash.com/photo-1609234656432-603fd5765f85?w=800&h=600&fit=crop', caption: 'Sunday School' },
  { id: 4, image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop', caption: 'Family Camp' },
  { id: 5, image_url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop', caption: 'Friendship Nite' },
]

export function HeroSection() {
  const { language } = useLanguage()
  const content = translations[language]
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => setCurrentSlide(prev => (prev + 1) % SLIDES.length), [])
  const prevSlide = useCallback(() => setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => { const t = setInterval(nextSlide, 5000); return () => clearInterval(t) }, [nextSlide])

  const slide = SLIDES[currentSlide]

  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden">
      <div className="nebula-orb w-[500px] h-[500px] top-[-100px] left-[-100px] opacity-40" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.7) 0%, transparent 70%)', ['--orb-dur' as string]: '22s' }} />
      <div className="nebula-orb w-[600px] h-[600px] bottom-[-150px] right-[-150px] opacity-30" style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.6) 0%, transparent 70%)', ['--orb-dur' as string]: '28s', ['--orb-delay' as string]: '-8s' }} />
      <div className="nebula-orb w-[350px] h-[350px] top-[40%] left-[30%] opacity-20" style={{ background: 'radial-gradient(circle, rgba(219,39,119,0.5) 0%, transparent 70%)', ['--orb-dur' as string]: '18s', ['--orb-delay' as string]: '-5s' }} />
      <div className="relative z-10 container mx-auto px-4 h-full min-h-[88vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-left">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xs uppercase tracking-[0.4em] text-violet-400 mb-4 font-medium">{content.welcome}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight cosmic-text">{content.title}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-xl md:text-2xl mb-4 text-violet-200 font-light">{content.subtitle}</motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="text-base md:text-lg mb-8 max-w-lg text-white/55 leading-relaxed">{content.description}</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="flex flex-wrap gap-3 mb-8">
              {[{ icon: <Heart className="w-4 h-4 text-pink-400" />, label: content.faith }, { icon: <Users className="w-4 h-4 text-violet-400" />, label: content.community }, { icon: <Sparkles className="w-4 h-4 text-cyan-400" />, label: content.hope }].map((pill, i) => (
                <div key={i} className="flex items-center cosmic-pill px-4 py-2 rounded-full">{pill.icon}<span className="text-sm font-medium text-white/80 ml-2">{pill.label}</span></div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
              <Link to="/contact"><Button size="lg" className="cosmic-button text-white rounded-full px-8 py-6 text-base group">{content.cta}<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></Button></Link>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-600/20 blur-xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-cosmic aspect-[4/3] border border-violet-500/20">
              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/30 to-transparent z-10" />
              <AnimatePresence mode="wait">
                <motion.div key={slide.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
                  <img src={slide.image_url} alt={slide.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-6 left-6 z-10"><p className="text-white text-lg font-medium drop-shadow-lg">{slide.caption}</p></div>
              <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full z-10 glass flex items-center justify-center text-white hover:border-violet-400/60 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full z-10 glass flex items-center justify-center text-white hover:border-violet-400/60 transition-colors"><ChevronRight className="w-5 h-5" /></button>
              <div className="absolute bottom-6 right-6 flex gap-2 z-10">
                {SLIDES.map((_, i) => <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-violet-400 w-5' : 'bg-white/40 w-1.5'}`} />)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#03050f] to-transparent" />
    </section>
  )
}
