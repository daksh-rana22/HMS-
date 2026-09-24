import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'
import { testimonials as initialTestimonials } from '../../data/testimonials'
import { initialClientLogos } from '../../data/clientLogos'
import HeroBackground from '../../components/common/HeroBackground'
import HMSExplanationContainer from '../../components/sections/HMSExplanationContainer'
import ProductsShowcase from '../../components/sections/ProductsShowcase'
import { fetchCompanyClients, fetchTestimonials, formatLogoUrl } from '../../services/api'
import SafeImage from '../../components/common/SafeImage'
import { safeSetItem, safeGetItem } from '../../utils/storage'
import trustedByBg from '../../assets/trusted_by_bg.jpg'

const heroSlides = [
  { id: 1, title: 'Clinical Dashboard', img: '/images/hero_slide_1.png', tag: 'Live Clinical OPD & Emergency' },
  { id: 2, title: 'OPD Collections', img: '/images/hero_slide_2.png', tag: 'Real-Time Financial Collections' },
  { id: 3, title: 'Cancel & Refunds', img: '/images/hero_slide_3.png', tag: 'Refund & Audit Tracking' },
  { id: 4, title: 'IT Governance', img: '/images/hero_slide_4.png', tag: '19 IT Admin Sub-Modules' },
  { id: 5, title: 'Department Registry', img: '/images/hero_slide_5.png', tag: 'Department & Staff Master' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 44, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.22 } } }

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Client Logos state synced with Admin Console
  const [clients, setClients] = useState(() => {
    const s = safeGetItem('omedo_admin_clients')
    if (s) {
      try {
        const parsed = JSON.parse(s)
        if (Array.isArray(parsed) && parsed.length > 0 && parsed.some((item) => item.logoUrl)) {
          return parsed
        }
      } catch (e) {
        console.error(e)
      }
    }
    return initialClientLogos
  })

  // Reviews state synced with Admin Console (Filtered strictly for valid doctor reviews)
  const [reviews, setReviews] = useState(() => {
    const s = safeGetItem('omedo_admin_reviews')
    if (s) {
      try {
        const parsed = JSON.parse(s)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const validReviews = parsed.filter((item) => item && item.content && typeof item.content === 'string' && item.content.trim().length > 0)
          if (validReviews.length > 0) return validReviews
        }
      } catch (e) {
        console.error(e)
      }
    }
    return initialTestimonials
  })

  // Sync dynamically with storage updates & fetch live backend records
  useEffect(() => {
    const loadLive = async () => {
      try {
        const [cRes, rRes] = await Promise.allSettled([
          fetchCompanyClients(),
          fetchTestimonials(),
        ])
        if (cRes.status === 'fulfilled' && cRes.value?.success && Array.isArray(cRes.value.list) && cRes.value.list.length > 0) {
          const normClients = cRes.value.list.map((c, idx) => ({
            id: c.id ?? idx + 1,
            name: c.client_name || c.name || 'Healthcare Partner',
            location: c.short_description || c.location || '',
            logoUrl: formatLogoUrl(c.logo_url || c.logoUrl || c.image_base64 || null),
            logoText: (c.client_name || c.name || 'HOSPITAL').slice(0, 10).toUpperCase(),
            status: (c.is_active ?? (c.status !== 'INACTIVE')) ? 'ACTIVE' : 'INACTIVE',
            featured: c.is_featured ?? c.featured ?? true,
            badgeColor: c.badgeColor || '#00685e',
          }))
          setClients(normClients)
          safeSetItem('omedo_admin_clients', normClients)
        }
        if (rRes.status === 'fulfilled' && rRes.value?.success && Array.isArray(rRes.value.list) && rRes.value.list.length > 0) {
          const normReviews = rRes.value.list.map((t, idx) => ({
            id: t.id ?? idx + 1,
            name: t.person_name || t.name || 'Healthcare Practitioner',
            role: t.designation || t.role || 'Medical Leader',
            organization: t.client_hospital || t.organization || t.facility || t.client_name || 'Healthcare Network',
            content: t.testimonial || t.content || '',
            rating: Number(t.rating) || 5,
            avatar: (t.person_name || t.name || 'HP').slice(0, 2).toUpperCase(),
            avatarUrl: t.profile_image_url || t.avatarUrl || null,
            displayOrder: Number(t.display_order ?? idx),
            status: (t.is_active ?? (t.status !== 'INACTIVE')) ? 'ACTIVE' : 'INACTIVE',
          }))
          setReviews(normReviews)
          safeSetItem('omedo_admin_reviews', normReviews)
        }
      } catch (err) {
        console.warn('Home live sync notice:', err)
      }
    }
    loadLive()

    const handleSync = () => {
      const sClients = safeGetItem('omedo_admin_clients')
      if (sClients) {
        try {
          const parsed = JSON.parse(sClients)
          if (Array.isArray(parsed) && parsed.length > 0) {
            const validClients = parsed.filter((item) => item && (item.logoUrl || item.location || !item.content))
            if (validClients.length > 0) setClients(validClients)
          }
        } catch (e) {
          console.error(e)
        }
      }

      const sReviews = safeGetItem('omedo_admin_reviews')
      if (sReviews) {
        try {
          const parsed = JSON.parse(sReviews)
          if (Array.isArray(parsed) && parsed.length > 0) {
            const validReviews = parsed.filter((item) => item && item.content && typeof item.content === 'string' && item.content.trim().length > 0)
            if (validReviews.length > 0) setReviews(validReviews)
          }
        } catch (e) {
          console.error(e)
        }
      }
    }

    window.addEventListener('storage', handleSync)
    window.addEventListener('omedo_clients_updated', handleSync)
    window.addEventListener('omedo_reviews_updated', handleSync)
    return () => {
      window.removeEventListener('storage', handleSync)
      window.removeEventListener('omedo_clients_updated', handleSync)
      window.removeEventListener('omedo_reviews_updated', handleSync)
    }
  }, [])

  // Filter only ACTIVE clients for display and build seamless infinite loop
  const activeClients = useMemo(() => {
    return clients.filter((c) => c.status !== 'INACTIVE')
  }, [clients])

  const loopedClients = useMemo(() => {
    if (activeClients.length === 0) return []
    let repeated = [...activeClients]
    // Ensure base length is at least 8-10 items so infinite loop never leaves blank gaps
    while (repeated.length < 10) {
      repeated = [...repeated, ...activeClients]
    }
    // Double for continuous 0% -> -50% translateX loop
    return [...repeated, ...repeated]
  }, [activeClients])

  // Active reviews list & slide pagination state (6 reviews per slide)
  const activeReviews = useMemo(() => {
    return reviews.filter((r) => r.status !== 'INACTIVE' && r.content && r.content.trim())
  }, [reviews])

  const [reviewPage, setReviewPage] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1) // 1 = next, -1 = prev
  const reviewsPerPage = 6
  const totalReviewPages = Math.ceil(activeReviews.length / reviewsPerPage)

  useEffect(() => {
    if (reviewPage >= totalReviewPages) {
      setReviewPage(Math.max(0, totalReviewPages - 1))
    }
  }, [totalReviewPages, reviewPage])

  const handlePrevReviewPage = () => {
    setSlideDirection(-1)
    setReviewPage((prev) => (prev > 0 ? prev - 1 : totalReviewPages - 1))
  }

  const handleNextReviewPage = () => {
    setSlideDirection(1)
    setReviewPage((prev) => (prev < totalReviewPages - 1 ? prev + 1 : 0))
  }

  const currentReviews = useMemo(() => {
    const start = reviewPage * reviewsPerPage
    return activeReviews.slice(start, start + reviewsPerPage)
  }, [activeReviews, reviewPage])

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <motion.div {...pageTransition} className="min-h-screen" style={{ background: 'var(--t-bg, #effcfe)' }}>
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-10 lg:pb-12">
        {/* Animated Enterprise Healthcare SaaS Hero Background */}
        <HeroBackground />

        <div className="site-wrapper relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">

            {/* ── Left Content Column ── */}
            <motion.div className="lg:col-span-5 space-y-4 sm:space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start" initial="hidden" animate="visible" variants={stagger}>

              {/* Badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--t-primary,#00685e)]/30 bg-white/90 backdrop-blur-sm shadow-[0_2px_16px_var(--t-btn-shadow,rgba(0,180,162,0.12))]">
                <span className="flex w-2 h-2 rounded-full bg-[var(--t-primary,#00685e)] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-semibold text-[var(--t-primary,#00685e)] tracking-wide uppercase">Enterprise Healthcare Management System</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp} className="text-2xl sm:text-4xl lg:text-[2.65rem] xl:text-[3.1rem] font-black leading-[1.12] tracking-tight text-center lg:text-left" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="text-[var(--t-text,#121d1f)]">One Platform to</span><br />
                <span className="text-[var(--t-text,#121d1f)]">Run Your Entire</span><br />
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--t-gradient-text, linear-gradient(135deg, #00685e 0%, #2d685e 100%))' }}>
                    Healthcare Operation
                  </span>
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p variants={fadeUp} className="text-xs sm:text-sm lg:text-[15px] text-[var(--t-text-secondary,#3d4947)] leading-relaxed max-w-md mx-auto lg:mx-0">
                OMEDO connects patients, doctors, appointments, EMR, OPD, IPD, billing, pharmacy, laboratory and analytics in one powerful healthcare management platform.
              </motion.p>

              {/* ── Mobile Orbital Graphic (Positioned above CTA buttons on phone view) ── */}
              <div className="block lg:hidden w-full py-3">
                <div className="relative w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[320px] mx-auto aspect-square flex items-center justify-center select-none">
                  {/* Layered ambient glows */}
                  <div className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, var(--t-hero-glow, rgba(0,203,183,0.22)) 0%, transparent 70%)' }} />

                  {/* Ring 3: Outer orbit ring (Clockwise - 45s) */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[96%] h-[96%] rounded-full pointer-events-none"
                    style={{
                      border: '1.5px dashed var(--t-primary, #00685e)',
                      opacity: 0.45,
                      filter: 'drop-shadow(0 0 10px var(--t-btn-shadow))',
                    }}
                  >
                    {[
                      { label: 'Reports & Analytics', icon: 'analytics', pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
                      { label: 'Emergency Care', icon: 'e911_emergency', pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' },
                      { label: 'Billing & GST', icon: 'receipt_long', pos: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2' },
                      { label: 'IPD & Bed Mgmt', icon: 'bed', pos: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2' },
                    ].map(({ label, icon, pos }) => (
                      <motion.div
                        key={label}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                        className={`absolute ${pos}`}
                      >
                        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1 xs:px-2.5 xs:py-1 rounded-full text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-black whitespace-nowrap shadow-md border border-[var(--t-border)]/80"
                          style={{ color: 'var(--t-text, #121d1f)' }}>
                          <span className="material-symbols-outlined text-[11px] xs:text-[13px] font-bold" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                          <span>{label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Ring 2: Middle orbit ring (Clockwise - 35s) */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[72%] h-[72%] rounded-full pointer-events-none"
                    style={{
                      border: '1.2px dashed color-mix(in srgb, var(--t-primary) 65%, var(--t-accent))',
                      opacity: 0.38,
                    }}
                  >
                    {[
                      { label: 'Clinical EMR', icon: 'stethoscope', pos: 'top-[8%] right-[8%] -translate-y-1/2 translate-x-1/2' },
                      { label: 'Laboratory LIS', icon: 'science', pos: 'bottom-[8%] left-[8%] translate-y-1/2 -translate-x-1/2' },
                    ].map(({ label, icon, pos }) => (
                      <motion.div
                        key={label}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                        className={`absolute ${pos}`}
                      >
                        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1 xs:px-2.5 xs:py-1 rounded-full text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-black whitespace-nowrap shadow-md border border-[var(--t-border)]/80"
                          style={{ color: 'var(--t-text, #121d1f)' }}>
                          <span className="material-symbols-outlined text-[11px] xs:text-[13px] font-bold" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                          <span>{label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Ring 1: Inner orbit ring (Clockwise - 25s) */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[48%] h-[48%] rounded-full pointer-events-none"
                    style={{
                      border: '1px solid var(--t-primary, #00685e)',
                      opacity: 0.3,
                    }}
                  >
                    {[
                      { label: 'IT Admin', icon: 'manage_accounts', pos: 'top-0 left-1/4 -translate-y-1/2 -translate-x-1/2' },
                      { label: 'Pharmacy', icon: 'medication', pos: 'bottom-0 right-1/4 translate-y-1/2 translate-x-1/2' },
                    ].map(({ label, icon, pos }) => (
                      <motion.div
                        key={label}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                        className={`absolute ${pos}`}
                      >
                        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1 xs:px-2.5 xs:py-1 rounded-full text-[8px] xs:text-[9px] sm:text-[10px] font-black whitespace-nowrap shadow-md border border-[var(--t-border)]/80"
                          style={{ color: 'var(--t-text, #121d1f)' }}>
                          <span className="material-symbols-outlined text-[11px] xs:text-[13px] font-bold" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                          <span>{label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Center Hub */}
                  <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-20 w-20 h-20 xs:w-24 xs:h-24 rounded-full flex items-center justify-center cursor-pointer group p-2"
                    style={{
                      background: 'linear-gradient(135deg, var(--t-accent, #67d9ca) 0%, var(--t-primary, #00685e) 50%, var(--t-footer-bg, #061325) 100%)',
                      boxShadow: '0 0 24px var(--t-btn-shadow), 0 0 45px var(--t-hero-glow), inset 0 1px 0 rgba(255,255,255,0.25)',
                      border: '2px solid rgba(255,255,255,0.9)',
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-inner p-2 group-hover:bg-white transition-colors">
                      <img
                        src="/images/omedo_emblem.png"
                        alt="OMEDO Emblem"
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        style={{
                          filter: 'drop-shadow(0 2px 6px rgba(0,104,94,0.25))',
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-1">
                <Link to="/contact"
                  className="inline-flex items-center gap-1.5 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    background: 'var(--t-primary, #00685e)',
                    boxShadow: '0 4px 20px var(--t-btn-shadow, rgba(0,104,94,0.35))',
                  }}
                >
                  Book a Free Demo
                  <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                </Link>
                <Link to="/modules"
                  className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-white hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                  style={{
                    borderColor: 'var(--t-border, #bcc9c6)',
                    color: 'var(--t-primary, #00685e)',
                  }}
                >
                  See OMEDO in Action
                </Link>
              </motion.div>

              {/* Trust line */}
              <motion.div variants={fadeUp} className="flex items-center gap-2.5 pt-2 border-t border-[var(--t-border)]/30 w-full max-w-md mx-auto lg:mx-0">
                <div className="flex -space-x-2 shrink-0">
                  {['DR', 'RN', 'AD', 'CM'].map((init, i) => (
                    <span key={init} className="w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm"
                      style={{ background: ['var(--t-primary)', 'var(--t-primary-mid)', 'var(--t-accent)', 'var(--t-primary-dark)'][i] }}>
                      {init}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] sm:text-xs text-[var(--t-text-muted)] font-semibold tracking-wide">
                  Hospitals · Specialty Clinics · Diagnostic Centers
                </span>
              </motion.div>

            </motion.div>

            {/* ── Right Column: Premium Orbital Graphic (Desktop Only) ── */}
            <motion.div
              className="hidden lg:flex lg:col-span-7 justify-center items-center"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full max-w-[310px] xs:max-w-[360px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[540px] xl:max-w-[590px] aspect-square flex items-center justify-center select-none py-4 sm:py-0">

                {/* Layered ambient glows */}
                <div className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, var(--t-hero-glow, rgba(0,203,183,0.22)) 0%, transparent 70%)' }} />

                {/* Ring 3: Outer orbit ring (Clockwise - 45s) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-[96%] h-[96%] rounded-full pointer-events-none"
                  style={{
                    border: '1.5px dashed var(--t-primary, #00685e)',
                    opacity: 0.45,
                    filter: 'drop-shadow(0 0 12px var(--t-btn-shadow))',
                  }}
                >
                  {/* Pills on outer ring — counter-rotated for upright text */}
                  {[
                    { label: 'Reports & Analytics', icon: 'analytics', pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
                    { label: 'Emergency Care', icon: 'e911_emergency', pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' },
                    { label: 'Billing & GST', icon: 'receipt_long', pos: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2' },
                    { label: 'IPD & Bed Mgmt', icon: 'bed', pos: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2' },
                  ].map(({ label, icon, pos }) => (
                    <motion.div
                      key={label}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                      className={`absolute ${pos}`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-[12.5px] xl:text-[13.5px] font-black whitespace-nowrap shadow-lg border border-[var(--t-border)]/70"
                        style={{
                          color: 'var(--t-text, #121d1f)',
                          boxShadow: '0 8px 20px -3px rgba(0, 104, 94, 0.14), 0 3px 8px -1px rgba(0, 0, 0, 0.05)',
                        }}>
                        <span className="material-symbols-outlined text-[14px] sm:text-[17px] xl:text-[19px] font-bold" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                        <span>{label}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Ring 2: Middle orbit ring (Clockwise - 35s) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-[72%] h-[72%] rounded-full pointer-events-none"
                  style={{
                    border: '1.2px dashed color-mix(in srgb, var(--t-primary) 65%, var(--t-accent))',
                    opacity: 0.38,
                  }}
                >
                  {[
                    { label: 'Clinical EMR', icon: 'stethoscope', pos: 'top-[8%] right-[8%] -translate-y-1/2 translate-x-1/2' },
                    { label: 'Laboratory LIS', icon: 'science', pos: 'bottom-[8%] left-[8%] translate-y-1/2 -translate-x-1/2' },
                  ].map(({ label, icon, pos }) => (
                    <motion.div
                      key={label}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                      className={`absolute ${pos}`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-[12.5px] xl:text-[13.5px] font-black whitespace-nowrap shadow-lg border border-[var(--t-border)]/70"
                        style={{
                          color: 'var(--t-text, #121d1f)',
                          boxShadow: '0 8px 20px -3px rgba(0, 104, 94, 0.14), 0 3px 8px -1px rgba(0, 0, 0, 0.05)',
                        }}>
                        <span className="material-symbols-outlined text-[14px] sm:text-[17px] xl:text-[19px] font-bold" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                        <span>{label}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Ring 1: Inner orbit ring (Clockwise - 25s) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-[48%] h-[48%] rounded-full pointer-events-none"
                  style={{
                    border: '1px solid var(--t-primary, #00685e)',
                    opacity: 0.3,
                  }}
                >
                  {[
                    { label: 'IT Admin', icon: 'manage_accounts', pos: 'top-0 left-1/4 -translate-y-1/2 -translate-x-1/2' },
                    { label: 'Pharmacy', icon: 'medication', pos: 'bottom-0 right-1/4 translate-y-1/2 translate-x-1/2' },
                  ].map(({ label, icon, pos }) => (
                    <motion.div
                      key={label}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                      className={`absolute ${pos}`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-[10.5px] sm:text-[12px] xl:text-[13px] font-black whitespace-nowrap shadow-lg border border-[var(--t-border)]/70"
                        style={{
                          color: 'var(--t-text, #121d1f)',
                          boxShadow: '0 8px 20px -3px rgba(0, 104, 94, 0.14), 0 3px 8px -1px rgba(0, 0, 0, 0.05)',
                        }}>
                        <span className="material-symbols-outlined text-[13px] sm:text-[16px] xl:text-[18px] font-bold" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                        <span>{label}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Center Hub */}
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-20 w-28 h-28 sm:w-32 sm:h-32 md:w-38 md:h-38 xl:w-44 xl:h-44 rounded-full flex items-center justify-center cursor-pointer group p-3 sm:p-4"
                  style={{
                    background: 'linear-gradient(135deg, var(--t-accent, #67d9ca) 0%, var(--t-primary, #00685e) 50%, var(--t-footer-bg, #061325) 100%)',
                    boxShadow: '0 0 32px var(--t-btn-shadow), 0 0 60px var(--t-hero-glow), inset 0 1px 0 rgba(255,255,255,0.3)',
                    border: '3px solid rgba(255,255,255,0.9)',
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-inner p-3 sm:p-4 md:p-5 group-hover:bg-white transition-colors">
                    <img
                      src="/images/omedo_emblem.png"
                      alt="OMEDO Emblem"
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      style={{
                        filter: 'drop-shadow(0 3px 10px rgba(0,104,94,0.25))',
                      }}
                    />
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. TRUSTED BY LEADING INSTITUTIONS CONTAINER ── */}
      <section
        className="py-12 sm:py-14 md:py-16 relative overflow-hidden shadow-2xl transition-all duration-500 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${trustedByBg})`,
          backgroundColor: '#07152d',
          borderTop: '1px solid rgba(245, 158, 11, 0.28)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.22)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(7, 21, 45, 0.5)',
        }}
      >
        {/* Subtle Ambient Radial Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(7, 21, 45, 0.4) 0%, rgba(7, 21, 45, 0.8) 100%)',
          }}
        />

        {/* Content Header */}
        <div className="site-wrapper text-center relative z-10 space-y-2 sm:space-y-3 mb-8 sm:mb-10">
          <p
            className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow-sm"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            TRUSTED BY LEADING INSTITUTIONS
          </p>

          <h2
            className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-extrabold text-white tracking-tight drop-shadow-md"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Healthcare Organizations &amp; Medical Centers
          </h2>

          <p
            className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide max-w-xl mx-auto text-blue-100/90"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Hospitals &nbsp;<span className="text-amber-300 font-normal">•</span>&nbsp; Specialty Clinics &nbsp;<span className="text-amber-300 font-normal">•</span>&nbsp; Diagnostic Centers Across India
          </p>

          {/* Glowing Indicator Accent Bars */}
          <div className="flex items-center justify-center gap-1.5 pt-0.5">
            <span className="w-6 h-1 rounded-full bg-white/25" />
            <span className="w-11 h-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
            <span className="w-6 h-1 rounded-full bg-white/25" />
          </div>
        </div>

        {/* ── CLIENT LOGOS CAROUSEL / TICKER AS SEEN IN REFERENCE IMAGE ── */}
        {activeClients.length > 0 && (
          <div className="relative w-full overflow-hidden z-10 py-2">
            {/* Edge Blur / Fade Mask Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#07152d]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#07152d]/80 to-transparent z-20 pointer-events-none" />

            {/* Continuous Infinite Ticker Row (Boundaryless Clean Logos) */}
            <div className="flex w-max animate-omedo-marquee items-center gap-6 sm:gap-10 md:gap-12 px-4">
              {loopedClients.map((client, idx) => (
                <div
                  key={`${client.id || idx}-${idx}`}
                  className="flex flex-col items-center shrink-0 group transition-transform duration-300 hover:scale-105 px-1 sm:px-1.5"
                >
                  {/* Uniform 4:3 Ratio Card (Borderless Edge-to-Edge with Hover Overlay) */}
                  <div className="relative w-32 sm:w-36 md:w-40 aspect-[4/3] rounded-2xl shadow-md flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 cursor-pointer">
                    <SafeImage
                      src={client.logoUrl}
                      alt={client.name}
                      className="w-full h-full object-fill select-none rounded-2xl transition-transform duration-300 group-hover:scale-105"
                      fallback={
                        <div
                          className="w-full h-full rounded-2xl flex items-center justify-center text-xs sm:text-sm font-black tracking-wider text-white shadow-inner p-2 text-center"
                          style={{ background: client.badgeColor || '#00685e' }}
                        >
                          {client.logoText || (client.name || 'HOSPITAL').slice(0, 10).toUpperCase()}
                        </div>
                      }
                    />

                    {/* Dark Frosted Hover Overlay with Purple Pin and Location */}
                    <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 z-10 select-none">
                      <span className="material-symbols-outlined text-[#a855f7] text-xl sm:text-2xl drop-shadow-md mb-0.5">
                        location_on
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-black uppercase text-white tracking-wider text-center leading-tight drop-shadow-md px-1 line-clamp-2">
                        {client.location || client.name || 'INDIA'}
                      </span>
                    </div>
                  </div>

                  {/* Client Name Label Below (Uniform Fixed Width Matching 4:3 Card) */}
                  <p className="text-[10px] sm:text-[11px] font-semibold text-center truncate mt-2.5 w-32 sm:w-36 md:w-40 transition-colors tracking-wide text-blue-100/90 group-hover:text-amber-300 drop-shadow-sm">
                    {client.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── 2. PRODUCTS SHOWCASE (CLINIC & HMS SUITES) ── */}
      <ProductsShowcase showComparison={false} />





      {/* ── 6. COMPREHENSIVE HMS EXPLANATION SHOWCASE ── */}
      <HMSExplanationContainer />

      {/* ── 7. REVIEWS & TESTIMONIALS SLIDER / GRID ── */}
      {activeReviews.length > 0 && (
        <section className="pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 site-wrapper space-y-8 sm:space-y-10">
          {/* Section Title & Top Slider Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left max-w-2xl space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00685e] px-3.5 py-1 rounded-full bg-[#afecde]/60 inline-block">
                TRUSTED BY HEALTHCARE LEADERS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Loved by Doctors, Admins &amp; IT Directors
              </h2>
              <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed">
                See how OMEDO is transforming hospital operations across clinical management, billing, lab diagnostics, and patient satisfaction.
              </p>
            </div>

            {/* Top Slider Navigation Arrows (shown if more than 6 reviews) */}
            {totalReviewPages > 1 && (
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-bold text-[#64748b] bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
                  Slide {reviewPage + 1} of {totalReviewPages}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevReviewPage}
                    aria-label="Previous Reviews Slide"
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 text-[#1e293b] hover:bg-[#00685e] hover:text-white hover:border-[#00685e] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextReviewPage}
                    aria-label="Next Reviews Slide"
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 text-[#1e293b] hover:bg-[#00685e] hover:text-white hover:border-[#00685e] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reviews Slide View Container with Animated Transition */}
          <div className="relative overflow-hidden min-h-[380px]">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={reviewPage}
                custom={slideDirection}
                initial={{ opacity: 0, x: slideDirection * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slideDirection * 60 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
              >
                {currentReviews.map((review, idx) => (
                  <div
                    key={`${reviewPage}-${idx}-${review.name}`}
                    className="bg-white border-2 border-amber-400 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Stars Row */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const isFilled = star <= (review.rating || 5)
                          return (
                            <span
                              key={star}
                              className="material-symbols-outlined text-lg sm:text-xl transition-colors"
                              style={{
                                fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0",
                                color: isFilled ? '#18428a' : '#cbd5e1',
                              }}
                            >
                              star
                            </span>
                          )
                        })}
                      </div>
                      {/* Content */}
                      <blockquote className="text-xs sm:text-[13px] text-[#0f172a] leading-relaxed italic font-normal">
                        "{review.content}"
                      </blockquote>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-3.5 border-t border-amber-400/70">
                      <div className="w-10 h-10 rounded-full bg-[#18428a] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                        {review.avatarUrl ? (
                          <img src={review.avatarUrl} alt={review.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        ) : null}
                        <span className={review.avatarUrl ? 'hidden' : ''}>{review.avatar || (review.name ? review.name.slice(0, 2).toUpperCase() : 'DR')}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-extrabold text-[#0f172a] text-xs sm:text-sm truncate">{review.name}</div>
                        <div className="text-[10px] sm:text-xs text-[#64748b] font-medium truncate">
                          {review.role || 'Hospital Administrator'} • <span className="text-[#18428a] font-semibold">{review.organization}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Pagination Bar & Slide Dots */}
          {totalReviewPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200/60">
              <span className="text-xs font-semibold text-[#64748b]">
                Showing {reviewPage * reviewsPerPage + 1}–{Math.min((reviewPage + 1) * reviewsPerPage, activeReviews.length)} of {activeReviews.length} Doctor &amp; Client Reviews
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevReviewPage}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-[#334155] hover:bg-slate-50 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  <span>Previous</span>
                </button>

                {/* Slide Dots */}
                <div className="flex items-center gap-1.5 px-2">
                  {Array.from({ length: totalReviewPages }).map((_, pIdx) => {
                    const isCurrent = pIdx === reviewPage
                    return (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => {
                          setSlideDirection(pIdx > reviewPage ? 1 : -1)
                          setReviewPage(pIdx)
                        }}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          isCurrent
                            ? 'w-7 bg-[#18428a] shadow-xs'
                            : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to review slide ${pIdx + 1}`}
                      />
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNextReviewPage}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-[#334155] hover:bg-slate-50 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <span>Next</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          )}
        </section>
      )}


      {/* ── 8. CALL TO ACTION BANNER (DYNAMIC THEME) ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.15 }}
        variants={fadeUp}
        className="py-6 sm:py-10 lg:py-12 site-wrapper"
      >
        <div
          className="text-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--t-primary) 0%, var(--t-primary-mid) 100%)' }}
        >
          {/* Subtle bg decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 relative z-10">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ready to transform your healthcare operations?
            </h2>

            <div className="flex justify-center pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-[1.03] active:scale-95"
                style={{ background: 'white', color: 'var(--t-primary)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--t-bg-light, #effcfe)'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}
              >
                <span>Book a Free OMEDO Demo</span>
                <span className="material-symbols-outlined text-base font-bold">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

    </motion.div>
  )
}
