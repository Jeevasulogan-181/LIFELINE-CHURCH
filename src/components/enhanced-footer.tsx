import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/components/language-provider'
import { motion } from 'framer-motion'

// Hardcode your church info here
const CHURCH = {
  name:         'Lifeline Church',
  address:      '123 Church Street, City, State, Country',
  phone:        '+1 234 567 890',
  email:        'info@lifelinechurch.org',
  facebook:     '#',
  instagram:    '#',
  youtube:      '#',
  serviceTimes: [
    'Sunday English Service: 9:00 AM',
    'Sunday Tamil Service: 11:00 AM',
    'Bible Study: Wednesday 7:30 PM',
  ],
}

const translations = {
  bengali: { subscribe: 'সাবস্ক্রাইব করুন', subscribeDesc: 'সর্বশেষ আপডেটের জন্য', email: 'আপনার ইমেইল', signUp: 'সাইন আপ', quickLinks: 'দ্রুত লিঙ্ক', contactUs: 'যোগাযোগ করুন', serviceTime: 'সেবার সময়', copyright: 'সর্বস্বত্ব সংরক্ষিত' },
  hindi:   { subscribe: 'न्यूज़लेटर सदस्यता', subscribeDesc: 'नवीनतम अपडेट के लिए', email: 'आपका ईमेल', signUp: 'साइन अप', quickLinks: 'त्वरित लिंक', contactUs: 'संपर्क करें', serviceTime: 'सेवा समय', copyright: 'सर्वाधिकार सुरक्षित' },
  english: { subscribe: 'Subscribe to Our Newsletter', subscribeDesc: 'Sign up for latest updates and events', email: 'Your email', signUp: 'Sign Up', quickLinks: 'Quick Links', contactUs: 'Contact Us', serviceTime: 'Service Times', copyright: 'All rights reserved' },
}

export function EnhancedFooter() {
  const { language } = useLanguage()
  const content = translations[language]
  const iv = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
  return (
    <footer className="relative border-t border-violet-500/15 mt-auto overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(0deg, rgba(3,5,15,0.98) 0%, rgba(6,12,30,0.95) 100%)' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-20" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.5) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div variants={iv}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-900/60">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold cosmic-text">{CHURCH.name}</h3>
            </div>
            <p className="text-white/45 mb-6 text-sm leading-relaxed">A place of worship, community, and spiritual growth.</p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={18} />, href: CHURCH.facebook,   hover: 'hover:text-blue-400',  label: 'Facebook' },
                { icon: <Instagram size={18} />, href: CHURCH.instagram, hover: 'hover:text-pink-400',  label: 'Instagram' },
                { icon: <Youtube size={18} />,   href: CHURCH.youtube,   hover: 'hover:text-red-400',   label: 'YouTube' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={"text-white/40 " + s.hover + " transition-colors"} aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
          </motion.div>
          <motion.div variants={iv}>
            <h3 className="text-sm font-semibold mb-4 text-white/70 uppercase tracking-widest">{content.quickLinks}</h3>
            <ul className="space-y-3">
              {[['Home','/'],['Sermons','/sermon'],['Programmes','/programmes'],['Gallery','/gallery'],['Contact','/contact'],['About','/about']].map(([name,path]) => (
                <li key={path}><Link to={path} className="text-white/45 hover:text-violet-300 flex items-center group transition-colors text-sm"><ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-violet-400" />{name}</Link></li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={iv}>
            <h3 className="text-sm font-semibold mb-4 text-white/70 uppercase tracking-widest">{content.contactUs}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/45 text-sm"><MapPin size={15} className="mt-0.5 text-cyan-400 shrink-0" /><span>{CHURCH.address}</span></li>
              <li className="flex items-center gap-3 text-white/45 text-sm"><Phone size={15} className="text-emerald-400 shrink-0" /><span>{CHURCH.phone}</span></li>
              <li className="flex items-center gap-3 text-white/45 text-sm"><Mail size={15} className="text-violet-400 shrink-0" /><span>{CHURCH.email}</span></li>
            </ul>
          </motion.div>
          <motion.div variants={iv}>
            <h3 className="text-sm font-semibold mb-4 text-white/70 uppercase tracking-widest">{content.serviceTime}</h3>
            <ul className="space-y-2 text-white/45 text-sm mb-6">{CHURCH.serviceTimes.map((t,i)=><li key={i}>{t}</li>)}</ul>
            <h4 className="text-xs font-semibold mb-1 text-white/60">{content.subscribe}</h4>
            <p className="text-xs text-white/30 mb-3">{content.subscribeDesc}</p>
            <div className="flex gap-2">
              <Input placeholder={content.email} className="text-sm h-9" />
              <Button className="cosmic-button text-white text-sm h-9 px-4 shrink-0">{content.signUp}</Button>
            </div>
          </motion.div>
        </motion.div>
        <div className="border-t border-violet-500/10 mt-10 pt-6 text-center text-white/25 text-sm">
          <p>&copy; {new Date().getFullYear()} {CHURCH.name}. {content.copyright}.</p>
        </div>
      </div>
    </footer>
  )
}
