import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../../data/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#effcfe]/90 backdrop-blur-xl border-b border-[#bcc9c6]/30 shadow-sm'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Top bar ── */}
      <div className="site-wrapper flex justify-between items-center h-16 sm:h-18 md:h-20 2xl:h-24">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span
            className="material-symbols-outlined text-[#00685e] text-2xl sm:text-3xl 2xl:text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            medical_services
          </span>
          <span
            className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-bold text-[#00685e]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            MedCare HMS
          </span>
        </Link>

        {/* Desktop Nav — hidden on mobile, shown md+ */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 2xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm 2xl:text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                location.pathname === link.path
                  ? 'text-[#00685e] font-bold border-b-2 border-[#00685e] pb-1'
                  : 'text-[#3d4947] hover:text-[#00685e]'
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="bg-[#00685e] text-white px-5 py-2 2xl:px-7 2xl:py-3 rounded-full text-sm 2xl:text-base font-bold hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md whitespace-nowrap"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Book a Demo
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#eaf6f8] transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close"
                initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                <X size={22} className="text-[#121d1f]" />
              </motion.div>
            ) : (
              <motion.div key="menu"
                initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                <Menu size={22} className="text-[#121d1f]" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-16 bg-[#effcfe] z-40 border-t border-[#bcc9c6]/30 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 pt-6 pb-10 flex flex-col gap-1 max-w-lg mx-auto">
              {navLinks.map((link, i) => (
                <motion.div key={link.path}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}>
                  <Link
                    to={link.path}
                    className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-200 ${
                      location.pathname === link.path
                        ? 'text-[#00685e] bg-[#afecde]/30 font-bold'
                        : 'text-[#121d1f] hover:bg-[#eaf6f8]'
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div className="mt-6 pt-6 border-t border-[#bcc9c6]/40"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                <button
                  className="w-full bg-[#00685e] text-white py-3.5 rounded-full text-base font-bold hover:opacity-90 active:scale-95 transition-all"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Book a Demo
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
