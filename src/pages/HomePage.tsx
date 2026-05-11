import { ChurchDescription } from '../components/church-description'
import { HeroSection } from '../components/hero-section'
import { GallerySection } from '../components/gallery-section'
import { SermonPreview } from '../components/sermon-preview'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ChurchDescription />
        </motion.div>
        <SermonPreview />
        <GallerySection />
      </div>
    </div>
  )
}
