import { CosmicBackground } from "@/components/cosmic-background"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { MinistriesSection } from "@/components/ministries-section"
import { SermonsSection } from "@/components/sermons-section"
import { GallerySection } from "@/components/gallery-section"
import { PrayerRequestsSection } from "@/components/prayer-requests-section"
import { VisitorsSection } from "@/components/visitors-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <CosmicBackground />
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <MinistriesSection />
        <SermonsSection />
        <GallerySection />
        <VisitorsSection />
        <PrayerRequestsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
