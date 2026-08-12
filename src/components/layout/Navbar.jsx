import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { navLinks } from '../../data/navigation'
import NavbarBackground from './NavbarBackground'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [modulesHovered, setModulesHovered] = useState(false)
  const [mobileModulesOpen, setMobileModulesOpen] = useState(false)
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'var(--t-nav-bg, rgba(239,252,254,0.90))'
          : 'color-mix(in srgb, var(--t-surface, #effcfe) 60%, transparent)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid var(--t-nav-border, rgba(188,201,198,0.30))`,
        boxShadow: scrolled ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Floating hospital icons — canvas background ── */}
      <NavbarBackground />

      {/* ── Top bar ── */}
      <div className="site-wrapper flex justify-between items-center h-14 sm:h-16 md:h-20 2xl:h-24 relative" style={{ zIndex: 1 }}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 shrink-0">
          <span
            className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl 2xl:text-4xl"
            style={{ fontVariationSettings: "'FILL' 1", color: 'var(--t-primary, #00685e)' }}
          >
            medical_services
          </span>
          <span
            className="text-base sm:text-lg md:text-2xl 2xl:text-3xl font-bold"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-primary, #00685e)' }}
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
                    className="inline-flex items-center gap-1 text-sm 2xl:text-base font-medium transition-colors duration-200 whitespace-nowrap"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: location.pathname.startsWith(link.path) ? 'var(--t-primary, #00685e)' : 'var(--t-text-secondary, #3d4947)',
                      fontWeight: location.pathname.startsWith(link.path) ? '700' : '500',
                      borderBottom: location.pathname.startsWith(link.path) ? '2px solid var(--t-primary, #00685e)' : 'none',
                      paddingBottom: location.pathname.startsWith(link.path) ? '4px' : '0',
                    }}
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={14} style={{ color: modulesHovered ? 'var(--t-primary)' : 'currentColor', transform: modulesHovered ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
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
                        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-2.5 space-y-1" style={{ boxShadow: '0 20px 50px var(--t-dropdown-shadow, rgba(0,104,94,0.22))', border: '1px solid color-mix(in srgb, var(--t-primary) 20%, transparent)' }}>
                          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold mb-1" style={{ color: 'var(--t-text-muted)', borderBottom: '1px solid var(--t-border-light)' }}>
                            <span>System Sub-Modules</span>
                          </div>

                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="flex items-start gap-3 p-2.5 rounded-xl transition-all"
                              style={{
                                background: location.pathname === child.path ? 'var(--t-primary, #00685e)' : 'transparent',
                                color: location.pathname === child.path ? '#fff' : 'var(--t-text, #121d1f)',
                              }}
                            >
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{
                                  background: location.pathname === child.path ? 'rgba(255,255,255,0.2)' : 'color-mix(in srgb, var(--t-accent, #67d9ca) 40%, transparent)',
                                  color: location.pathname === child.path ? '#fff' : 'var(--t-primary, #00685e)',
                                }}
                              >
                                <span className="material-symbols-outlined text-lg">{child.icon}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold truncate">{child.name}</span>
                                </div>
                                <p className="text-[10px] truncate leading-snug mt-0.5" style={{ color: location.pathname === child.path ? 'rgba(255,255,255,0.8)' : 'var(--t-text-muted, #6d7a77)' }}>
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
                className="text-sm 2xl:text-base font-medium transition-colors duration-200 whitespace-nowrap"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: location.pathname === link.path ? 'var(--t-primary, #00685e)' : 'var(--t-text-secondary, #3d4947)',
                  fontWeight: location.pathname === link.path ? '700' : '500',
                  borderBottom: location.pathname === link.path ? '2px solid var(--t-primary, #00685e)' : 'none',
                  paddingBottom: location.pathname === link.path ? '4px' : '0',
                }}
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
            className="px-5 py-2 2xl:px-7 2xl:py-3 rounded-full text-sm 2xl:text-base font-bold hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md whitespace-nowrap inline-flex items-center gap-1.5"
            style={{ fontFamily: "'Inter', sans-serif", background: 'var(--t-primary, #00685e)', color: '#fff', boxShadow: '0 4px 14px var(--t-btn-shadow)' }}
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen((prev) => !prev)
          }}
          className="md:hidden w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl active:scale-90 transition-all duration-200 shadow-sm cursor-pointer z-50 select-none"
          style={{ background: 'white', border: '1px solid var(--t-border)', color: 'var(--t-primary, #00685e)' }}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <X size={20} style={{ color: 'var(--t-primary, #00685e)' }} />
          ) : (
            <Menu size={20} style={{ color: 'var(--t-primary, #00685e)' }} />
          )}
        </button>
      </div>

      {/* ── Mobile Drawer Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed left-0 right-0 top-14 bottom-0 h-[calc(100dvh-3.5rem)] backdrop-blur-2xl z-40 overflow-y-auto flex flex-col justify-between shadow-2xl"
            style={{ background: 'var(--t-mobile-bg, #effcfe)', borderTop: '1px solid var(--t-border-light)' }}
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
                      {/* Split item: Left area opens /modules directly; Right arrow toggles sub-modules */}
                      <div
                        className="w-full flex items-center justify-between min-h-[44px] rounded-xl transition-all duration-150"
                        style={{
                          background: location.pathname.startsWith(link.path) ? 'var(--t-active-bg)' : 'rgba(255,255,255,0.6)',
                          color: location.pathname.startsWith(link.path) ? 'var(--t-primary)' : 'var(--t-text)',
                          border: location.pathname.startsWith(link.path) ? '1px solid var(--t-active-border)' : 'none',
                          fontWeight: location.pathname.startsWith(link.path) ? '700' : '600',
                        }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className="flex-1 flex items-center gap-2 px-4 py-3 text-base font-semibold"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          <span className="material-symbols-outlined text-lg" style={{ color: 'var(--t-primary)' }}>grid_view</span>
                          <span>{link.name}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setMobileModulesOpen(!mobileModulesOpen)
                          }}
                          className="p-3 rounded-r-xl cursor-pointer"
                          style={{ background: 'transparent' }}
                          aria-label="Toggle sub-modules list"
                        >
                          <ChevronDown
                            size={18}
                            style={{ color: 'var(--t-primary)' }}
                            className={`transition-transform duration-200 ${mobileModulesOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>

                      {/* Mobile Sub-Links accordion */}
                      {mobileModulesOpen && (
                        <div className="pl-3 pr-1 py-1 space-y-1.5 border-l-2 ml-3" style={{ borderColor: 'var(--t-active-border)' }}>
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all"
                              style={{
                                background: location.pathname === child.path ? 'var(--t-primary)' : 'rgba(255,255,255,0.8)',
                                color: location.pathname === child.path ? '#fff' : 'var(--t-text)',
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">{child.icon}</span>
                                <span>{child.name}</span>
                              </div>
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
                      className="flex items-center justify-between px-4 py-3 min-h-[44px] text-base font-semibold rounded-xl transition-all duration-150"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        background: location.pathname === link.path ? 'var(--t-active-bg)' : 'transparent',
                        color: location.pathname === link.path ? 'var(--t-primary)' : 'var(--t-text)',
                        border: location.pathname === link.path ? '1px solid var(--t-active-border)' : 'none',
                        fontWeight: location.pathname === link.path ? '700' : '600',
                      }}
                    >
                      <span>{link.name}</span>
                      <span className="material-symbols-outlined text-sm opacity-60">chevron_right</span>
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div
                className="mt-4 pt-4 border-t border-[#bcc9c6]/40 space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-base font-bold shadow-md active:scale-98 transition-all"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'var(--t-primary)', color: '#fff', boxShadow: '0 4px 14px var(--t-btn-shadow)' }}
                >
                  <span>Book a Demo</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>

                <div className="flex items-center justify-center gap-4 text-xs font-semibold text-[#6d7a77] pt-2">
                  <a href="tel:+15552345678" className="flex items-center gap-1 hover:text-[#00685e]">
                    <span className="material-symbols-outlined text-sm text-[#00685e]">call</span>
                    +1(555) 234-5678
                  </a>
                  <span>•</span>
                  <a href="mailto:support@medcare.com" className="flex items-center gap-1 hover:text-[#00685e]">
                    <span className="material-symbols-outlined text-sm text-[#00685e]">mail</span>
                    Support
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
