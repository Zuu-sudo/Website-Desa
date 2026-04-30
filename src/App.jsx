// App - simple composition of all components
import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import About from './components/About.jsx'
import Products from './components/Products.jsx'
import Reviews from './components/Reviews.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import './index.css'

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="font-sans bg-[#F5F5F5] text-[#0F0F0F] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Products />
      <Reviews />
      <Contact />
      <Footer />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        aria-label="Back to top"
      >
        <ChevronUp size={20} />
      </button>
    </div>
  )
}