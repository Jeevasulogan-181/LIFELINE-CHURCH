import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Sermon', path: '/sermon' },
  { name: 'Programmes', path: '/programmes' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
  { name: 'About', path: '/about' },
]

export function EnhancedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500',
        scrolled ? 'glass shadow-lg shadow-black/40' : 'bg-transparent'
      )}
    >
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      )}

      <div className="container flex h-16 items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center gap-3 group">
            {/* Real Church Logo */}
            <div className="relative w-11 h-11 flex-shrink-0">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-violet-500/30 shadow-lg shadow-violet-900/40 group-hover:shadow-violet-700/50 group-hover:border-violet-400/50 transition-all duration-300 bg-white">
                <img
                  src="/church-logo.jpg"
                  alt="Lifeline Church Logo"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <div className="absolute inset-0 rounded-xl ring-1 ring-violet-400/0 group-hover:ring-violet-400/40 transition-all duration-300" />
            </div>
            <span className="text-xl font-bold cosmic-text">𝙻𝙸𝙵𝙴𝙻𝙸𝙽𝙴 𝙲𝙷𝚄𝚁𝙲𝙷</span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <Link
                to={item.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-violet-300 relative animated-underline',
                  pathname === item.path ? 'text-violet-300' : 'text-white/70'
                )}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center gap-4"
        >
          <LanguageSwitcher />
        </motion.div>

        <div className="flex md:hidden items-center gap-3">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full text-white/80 hover:text-white hover:bg-violet-900/40"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-violet-500/20 glass"
          >
            <div className="container py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-violet-300 py-2',
                    pathname === item.path ? 'text-violet-300' : 'text-white/70'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
