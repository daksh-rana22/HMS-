import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { navLinks } from '../../data/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [modulesHovered, setModulesHovered] = useState(false)
  const [mobileModulesOpen, setMobileModulesOpen] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { 
    setIsOpen(false)
    setModulesHovered(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#effcfe]/90 backdrop-blur-xl border-b border-[#bcc9c6]/30 shadow-sm'
          : 'bg-[#effcfe]/60 backdrop-blur-md border-b border-[#bcc9c6]/15'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Top bar (h-14 on mobile for compact, sleek appearance) ── */}
      <div className="site-wrapper flex justify-between items-center h-14 sm:h-16 md:h-20 2xl:h-24">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 shrink-0">
          <span
            className="material-symbols-outlined text-[#00685e] text-xl sm:text-2xl md:text-3xl 2xl:text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            medical_services
          </span>
          <span
            className="text-base sm:text-lg md:text-2xl 2xl:text-3xl font-bold text-[#00685e]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            MedCare HMS
          </span>
        </Link>

        {/* Desktop Nav — hidden on mobile, shown md+ */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 2xl:gap-8">
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div
                  key={link.path}
                  className="relative group py-2"
                  onMouseEnter={() => setModulesHovered(true)}
                  onMouseLeave={() => setModulesHovered(false)}
                >
                  <Link
                    to={link.path}
                    className={`inline-flex items-center gap-1 text-sm 2xl:text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                      location.pathname.startsWith(link.path)
                        ? 'text-[#00685e] font-bold border-b-2 border-[#00685e] pb-1'
                        : 'text-[#3d4947] hover:text-[#00685e]'
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${modulesHovered ? 'rotate-180 text-[#00685e]' : ''}`} />
                  </Link>

                  {/* Glassmorphic Dropdown Menu */}
                  <AnimatePresence>
                    {modulesHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-80 z-50 pointer-events-auto"
                      >
                        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,104,94,0.22)] border border-[#00685e]/20 p-2.5 space-y-1">
                          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#6d7a77] font-bold border-b border-[#bcc9c6]/30 mb-1 flex items-center justify-between">
                            <span>System Modules</span>
                            <span className="text-[#00685e] bg-[#afecde]/60 px-2 py-0.5 rounded-full text-[9px] lowercase font-semibold">5 Sub-Apps</span>
                          </div>

                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                                location.pathname === child.path
                                  ? 'bg-[#00685e] text-white shadow-md'
                                  : 'hover:bg-[#effcfe] text-[#121d1f] hover:text-[#00685e]'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                location.pathname === child.path
                                  ? 'bg-white/20 text-white'
                                  : 'bg-[#afecde]/50 text-[#00685e]'
                              }`}>
                                <span className="material-symbols-outlined text-lg">{child.icon}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold truncate">{child.name}</span>
                                  {child.badge && (
                                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold uppercase ${
                                      location.pathname === child.path ? 'bg-[#85f5e6] text-[#00685e]' : 'bg-[#00685e] text-white'
                                    }`}>
                                      {child.badge}
                                    </span>
                                  )}
                                </div>
                                <p className={`text-[10px] truncate leading-snug mt-0.5 ${
                                  location.pathname === child.path ? 'text-white/80' : 'text-[#6d7a77]'
                                }`}>
                                  {child.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            return (
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
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="bg-[#00685e] text-white px-5 py-2 2xl:px-7 2xl:py-3 rounded-full text-sm 2xl:text-base font-bold hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md whitespace-nowrap inline-flex items-center gap-1.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile Hamburger Button (Guaranteed 44px touch target) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen((prev) => !prev)
          }}
          className="md:hidden w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white hover:bg-[#eaf6f8] active:scale-90 transition-all duration-200 border border-[#bcc9c6]/50 shadow-sm cursor-pointer z-50 select-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <X size={20} className="text-[#00685e]" />
          ) : (
            <Menu size={20} className="text-[#00685e]" />
          )}
        </button>
      </div>

      {/* ── Mobile Drawer Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed left-0 right-0 top-14 bottom-0 h-[calc(100dvh-3.5rem)] bg-[#effcfe] backdrop-blur-2xl z-40 border-t border-[#bcc9c6]/40 overflow-y-auto flex flex-col justify-between shadow-2xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pt-4 pb-8 flex flex-col gap-2 max-w-md mx-auto w-full">
              {navLinks.map((link, i) => {
                if (link.children) {
                  return (
                    <motion.div key={link.path}
                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 + 0.03 }}
                      className="space-y-1"
                    >
                      <button
                        onClick={() => setMobileModulesOpen(!mobileModulesOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 min-h-[44px] text-base font-semibold rounded-xl transition-all duration-150 ${
                          location.pathname.startsWith(link.path)
                            ? 'text-[#00685e] bg-[#afecde]/60 font-bold border border-[#00685e]/30 shadow-xs'
                            : 'text-[#121d1f] bg-white/60 hover:bg-[#eaf6f8]'
                        }`}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-lg text-[#00685e]">grid_view</span>
                          <span>{link.name}</span>
                        </div>
                        <ChevronDown size={18} className={`transition-transform duration-200 text-[#00685e] ${mobileModulesOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Mobile Sub-Links accordion */}
                      {mobileModulesOpen && (
                        <div className="pl-3 pr-1 py-1 space-y-1.5 border-l-2 border-[#00685e]/30 ml-3">
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                                location.pathname === child.path
                                  ? 'bg-[#00685e] text-white shadow-sm font-bold'
                                  : 'bg-white/80 text-[#121d1f] hover:bg-[#afecde]/30'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">{child.icon}</span>
                                <span>{child.name}</span>
                              </div>
                              {child.badge && (
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                                  location.pathname === child.path ? 'bg-[#85f5e6] text-[#00685e]' : 'bg-[#00685e] text-white'
                                }`}>
                                  {child.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )
                }

                return (
                  <motion.div key={link.path}
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 + 0.03 }}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 min-h-[44px] text-base font-semibold rounded-xl transition-all duration-150 ${
                        location.pathname === link.path
                          ? 'text-[#00685e] bg-[#afecde]/60 font-bold border border-[#00685e]/30 shadow-xs'
                          : 'text-[#121d1f] hover:bg-[#eaf6f8] active:bg-[#afecde]/20'
                      }`}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      <span>{link.name}</span>
                      <span className="material-symbols-outlined text-sm opacity-60">chevron_right</span>
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div className="mt-4 pt-4 border-t border-[#bcc9c6]/40 space-y-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full min-h-[46px] bg-[#00685e] text-white py-3 px-5 rounded-full text-base font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#005049] active:scale-98 transition-all"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>Book a Demo</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>

                <div className="flex items-center justify-center gap-3 text-xs font-semibold text-[#3d4947] pt-2">
                  <a href="tel:+15552345678" className="flex items-center gap-1 hover:text-[#00685e]">
                    <span className="material-symbols-outlined text-base text-[#00685e]">call</span>
                    <span>+1 (555) 234-5678</span>
                  </a>
                  <span>•</span>
                  <a href="mailto:hello@medcarehms.com" className="flex items-center gap-1 hover:text-[#00685e]">
                    <span className="material-symbols-outlined text-base text-[#00685e]">mail</span>
                    <span>Support</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
