import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './components/language-provider'
import { EnhancedNavbar } from './components/enhanced-navbar'
import { EnhancedFooter } from './components/enhanced-footer'
import { StarField } from './components/star-field'
import { Toaster } from './components/ui/toaster'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import SermonPage from './pages/SermonPage'
import ProgrammesPage from './pages/ProgrammesPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#03050f] min-h-screen font-sans">
        {/* Deep space background */}
        <div
          className="fixed inset-0 z-[-10]"
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(76,29,149,0.35) 0%, transparent 60%)," +
              "radial-gradient(ellipse 80% 60% at -10% 60%, rgba(30,27,75,0.5) 0%, transparent 55%)," +
              "radial-gradient(ellipse 70% 50% at 110% 70%, rgba(8,145,178,0.2) 0%, transparent 50%)," +
              "linear-gradient(180deg, #03050f 0%, #060c1e 40%, #08102a 100%)",
          }}
        />
        <StarField />
        <LanguageProvider>
          <div className="relative flex min-h-screen flex-col">
            <EnhancedNavbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/sermon" element={<SermonPage />} />
                <Route path="/programmes" element={<ProgrammesPage />} />
              </Routes>
            </main>
            <EnhancedFooter />
            <Toaster />
          </div>
        </LanguageProvider>
      </div>
    </BrowserRouter>
  )
}
