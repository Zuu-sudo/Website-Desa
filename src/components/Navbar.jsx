import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Tentang', href: '#about' },
  { label: 'Produk', href: '#products' },
  { label: 'Ulasan', href: '#reviews' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [open])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 md:px-14 transition-all duration-500 ${
          scrolled
            ? 'py-3 sm:py-4 bg-[#0A0A0A]/96 backdrop-blur-md border-b border-white/5'
            : 'py-5 sm:py-6 bg-transparent'
        }`}
      >
        <a href="#" className="font-display text-base sm:text-xl font-bold text-[#C9A84C] tracking-widest">
          KUREKSARI <span className="text-[#D4520A] italic">BLACKSMITH</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-white/60 hover:text-white text-xs tracking-[0.15em] uppercase transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="bg-[#D4520A] hover:bg-[#F06A1A] text-white text-xs tracking-[0.1em] uppercase px-5 py-2.5 transition-colors duration-200 font-medium"
            >
              Hubungi Kami
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="font-display text-3xl sm:text-4xl text-white italic"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 bg-[#D4520A] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm tracking-widest uppercase"
            >
              Hubungi Kami
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}