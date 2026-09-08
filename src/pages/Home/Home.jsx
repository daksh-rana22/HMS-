import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'
import { testimonials as initialTestimonials } from '../../data/testimonials'
import { initialClientLogos } from '../../data/clientLogos'
import { useTheme } from '../../contexts/ThemeContext'
import HeroBackground from '../../components/common/HeroBackground'
import HMSExplanationContainer from '../../components/sections/HMSExplanationContainer'
import ProductsShowcase from '../../components/sections/ProductsShowcase'

const TRUSTED_BY_THEMES = {
  navygold: {
    bg: 'linear-gradient(135deg, #07152d 0%, #0d2857 25%, #18428a 50%, #12336d 75%, #061226 100%)',
    border: '1px solid rgba(147, 197, 253, 0.25)',
    borderBottom: '1px solid rgba(147, 197, 253, 0.18)',
    shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(7, 21, 45, 0.4)',
    glowTop: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(59, 130, 246, 0.38) 0%, rgba(29, 78, 216, 0.15) 50%, transparent 80%)',
    glowMid: 'radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.16) 0%, transparent 65%)',
    badgeText: 'text-blue-200/90',
    descText: 'text-blue-100/90',
    bulletColor: 'text-blue-300/60',
    accentBar: 'from-blue-400 via-white to-blue-400 shadow-[0_0_10px_rgba(147,197,253,0.9)]',
    sideGlow1: 'from-[#07152d] via-[#07152d]/90 to-transparent',
    sideGlow2: 'from-[#061226] via-[#061226]/90 to-transparent',
    labelColor: 'text-blue-100/90 group-hover:text-white',
  },
  oceanic: {
    bg: 'linear-gradient(135deg, #041d1a 0%, #063c37 25%, #0d5f57 50%, #08403b 75%, #031513 100%)',
    border: '1px solid rgba(103, 217, 202, 0.25)',
    borderBottom: '1px solid rgba(103, 217, 202, 0.18)',
    shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(4, 29, 26, 0.4)',
    glowTop: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(13, 148, 136, 0.38) 0%, rgba(5, 150, 105, 0.15) 50%, transparent 80%)',
    glowMid: 'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.16) 0%, transparent 65%)',
    badgeText: 'text-teal-200/90',
    descText: 'text-teal-100/90',
    bulletColor: 'text-teal-300/60',
    accentBar: 'from-teal-400 via-white to-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.9)]',
    sideGlow1: 'from-[#041d1a] via-[#041d1a]/90 to-transparent',
    sideGlow2: 'from-[#031513] via-[#031513]/90 to-transparent',
    labelColor: 'text-teal-100/90 group-hover:text-white',
  },
  dreamy: {
    bg: 'linear-gradient(135deg, #0c122c 0%, #171e4d 25%, #2a347c 50%, #1a2054 75%, #080c20 100%)',
    border: '1px solid rgba(165, 180, 252, 0.25)',
    borderBottom: '1px solid rgba(165, 180, 252, 0.18)',
    shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(12, 18, 44, 0.4)',
    glowTop: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(99, 102, 241, 0.38) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 80%)',
    glowMid: 'radial-gradient(circle at 50% 50%, rgba(129, 140, 248, 0.16) 0%, transparent 65%)',
    badgeText: 'text-indigo-200/90',
    descText: 'text-indigo-100/90',
    bulletColor: 'text-indigo-300/60',
    accentBar: 'from-indigo-400 via-white to-purple-400 shadow-[0_0_10px_rgba(129,140,248,0.9)]',
    sideGlow1: 'from-[#0c122c] via-[#0c122c]/90 to-transparent',
    sideGlow2: 'from-[#080c20] via-[#080c20]/90 to-transparent',
    labelColor: 'text-indigo-100/90 group-hover:text-white',
  },
  thinker: {
    bg: 'linear-gradient(135deg, #08211f 0%, #0f3d38 25%, #185c54 50%, #302028 75%, #18080f 100%)',
    border: '1px solid rgba(244, 63, 94, 0.25)',
    borderBottom: '1px solid rgba(244, 63, 94, 0.18)',
    shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(8, 33, 31, 0.4)',
    glowTop: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(15, 118, 110, 0.38) 0%, rgba(244, 63, 94, 0.2) 50%, transparent 80%)',
    glowMid: 'radial-gradient(circle at 50% 50%, rgba(251, 113, 133, 0.16) 0%, transparent 65%)',
    badgeText: 'text-rose-200/90',
    descText: 'text-teal-100/90',
    bulletColor: 'text-rose-300/60',
    accentBar: 'from-teal-400 via-rose-300 to-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.9)]',
    sideGlow1: 'from-[#08211f] via-[#08211f]/90 to-transparent',
    sideGlow2: 'from-[#18080f] via-[#18080f]/90 to-transparent',
    labelColor: 'text-teal-100/90 group-hover:text-white',
  },
  amberteal: {
    bg: 'linear-gradient(135deg, #240e04 0%, #4a1d08 25%, #6e2e0a 50%, #153835 75%, #061c1a 100%)',
    border: '1px solid rgba(251, 146, 60, 0.25)',
    borderBottom: '1px solid rgba(251, 146, 60, 0.18)',
    shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(36, 14, 4, 0.4)',
    glowTop: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(234, 88, 12, 0.38) 0%, rgba(13, 148, 136, 0.2) 50%, transparent 80%)',
    glowMid: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.16) 0%, transparent 65%)',
    badgeText: 'text-amber-200/90',
    descText: 'text-orange-100/90',
    bulletColor: 'text-amber-300/60',
    accentBar: 'from-orange-400 via-amber-300 to-teal-400 shadow-[0_0_10px_rgba(245,158,11,0.9)]',
    sideGlow1: 'from-[#240e04] via-[#240e04]/90 to-transparent',
    sideGlow2: 'from-[#061c1a] via-[#061c1a]/90 to-transparent',
    labelColor: 'text-amber-100/90 group-hover:text-white',
  },
  darkcrimson: {
    bg: 'linear-gradient(135deg, #180829 0%, #2f104f 25%, #4c1d7c 50%, #38125b 75%, #10041d 100%)',
    border: '1px solid rgba(216, 180, 254, 0.25)',
    borderBottom: '1px solid rgba(216, 180, 254, 0.18)',
    shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(24, 8, 41, 0.4)',
    glowTop: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(124, 58, 237, 0.38) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 80%)',
    glowMid: 'radial-gradient(circle at 50% 50%, rgba(192, 132, 252, 0.16) 0%, transparent 65%)',
    badgeText: 'text-purple-200/90',
    descText: 'text-purple-100/90',
    bulletColor: 'text-purple-300/60',
    accentBar: 'from-purple-400 via-fuchsia-300 to-pink-400 shadow-[0_0_10px_rgba(192,132,252,0.9)]',
    sideGlow1: 'from-[#180829] via-[#180829]/90 to-transparent',
    sideGlow2: 'from-[#10041d] via-[#10041d]/90 to-transparent',
    labelColor: 'text-purple-100/90 group-hover:text-white',
  },
  embers: {
    bg: 'linear-gradient(135deg, #130e2b 0%, #221544 25%, #3c1a55 50%, #41182d 75%, #160714 100%)',
    border: '1px solid rgba(244, 63, 94, 0.25)',
    borderBottom: '1px solid rgba(244, 63, 94, 0.18)',
    shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(19, 14, 43, 0.4)',
    glowTop: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(67, 56, 202, 0.38) 0%, rgba(244, 63, 94, 0.2) 50%, transparent 80%)',
    glowMid: 'radial-gradient(circle at 50% 50%, rgba(251, 113, 133, 0.16) 0%, transparent 65%)',
    badgeText: 'text-rose-200/90',
    descText: 'text-orange-100/90',
    bulletColor: 'text-rose-300/60',
    accentBar: 'from-indigo-400 via-rose-300 to-orange-400 shadow-[0_0_10px_rgba(251,113,133,0.9)]',
    sideGlow1: 'from-[#130e2b] via-[#130e2b]/90 to-transparent',
    sideGlow2: 'from-[#160714] via-[#160714]/90 to-transparent',
    labelColor: 'text-rose-100/90 group-hover:text-white',
  },
  cerulean: {
    bg: 'linear-gradient(135deg, #051a2e 0%, #0a3357 25%, #0e4c7d 50%, #3d2c0d 75%, #171103 100%)',
    border: '1px solid rgba(125, 211, 252, 0.25)',
    borderBottom: '1px solid rgba(125, 211, 252, 0.18)',
    shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(5, 26, 46, 0.4)',
    glowTop: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(2, 132, 199, 0.38) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 80%)',
    glowMid: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.16) 0%, transparent 65%)',
    badgeText: 'text-sky-200/90',
    descText: 'text-sky-100/90',
    bulletColor: 'text-sky-300/60',
    accentBar: 'from-sky-400 via-amber-300 to-amber-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]',
    sideGlow1: 'from-[#051a2e] via-[#051a2e]/90 to-transparent',
    sideGlow2: 'from-[#171103] via-[#171103]/90 to-transparent',
    labelColor: 'text-sky-100/90 group-hover:text-white',
  },
  burgundyteal: {
    bg: 'linear-gradient(135deg, #240510 0%, #470d23 25%, #651332 50%, #0d3834 75%, #041715 100%)',
    border: '1px solid rgba(244, 114, 182, 0.25)',
    borderBottom: '1px solid rgba(244, 114, 182, 0.18)',
    shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(36, 5, 16, 0.4)',
    glowTop: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(136, 19, 55, 0.38) 0%, rgba(15, 118, 110, 0.2) 50%, transparent 80%)',
    glowMid: 'radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.16) 0%, transparent 65%)',
    badgeText: 'text-rose-200/90',
    descText: 'text-rose-100/90',
    bulletColor: 'text-rose-300/60',
    accentBar: 'from-rose-400 via-amber-300 to-teal-400 shadow-[0_0_10px_rgba(244,114,182,0.9)]',
    sideGlow1: 'from-[#240510] via-[#240510]/90 to-transparent',
    sideGlow2: 'from-[#041715] via-[#041715]/90 to-transparent',
    labelColor: 'text-rose-100/90 group-hover:text-white',
  },
  clinical: {
    bg: 'linear-gradient(135deg, #031c19 0%, #063934 25%, #00685e 50%, #034842 75%, #021715 100%)',
    border: '1px solid rgba(103, 217, 202, 0.25)',
    borderBottom: '1px solid rgba(103, 217, 202, 0.18)',
    shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(3, 28, 25, 0.4)',
    glowTop: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0, 104, 94, 0.38) 0%, rgba(2, 132, 199, 0.2) 50%, transparent 80%)',
    glowMid: 'radial-gradient(circle at 50% 50%, rgba(103, 217, 202, 0.16) 0%, transparent 65%)',
    badgeText: 'text-teal-200/90',
    descText: 'text-teal-100/90',
    bulletColor: 'text-teal-300/60',
    accentBar: 'from-teal-400 via-emerald-300 to-cyan-400 shadow-[0_0_10px_rgba(103,217,202,0.9)]',
    sideGlow1: 'from-[#031c19] via-[#031c19]/90 to-transparent',
    sideGlow2: 'from-[#021715] via-[#021715]/90 to-transparent',
    labelColor: 'text-teal-100/90 group-hover:text-white',
  },
}

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
  const { heroTheme } = useTheme()
  const themeStyle = TRUSTED_BY_THEMES[heroTheme] || TRUSTED_BY_THEMES.navygold

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Client Logos state synced with Admin Console
  const [clients, setClients] = useState(() => {
    const s = localStorage.getItem('omedo_admin_clients')
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
    const s = localStorage.getItem('omedo_admin_reviews')
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

  // Sync dynamically with storage updates from Admin Console
  useEffect(() => {
    const handleSync = () => {
      const sClients = localStorage.getItem('omedo_admin_clients')
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

      const sReviews = localStorage.getItem('omedo_admin_reviews')
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

  // Filter only ACTIVE clients for display
  const activeClients = useMemo(() => {
    const list = clients.filter((c) => c.status !== 'INACTIVE')
    return list.length > 0 ? list : initialClientLogos
  }, [clients])

  // Active reviews list & slide pagination state (6 reviews per slide)
  const activeReviews = useMemo(() => {
    const list = reviews.filter((r) => r.status !== 'INACTIVE')
    return list.length > 0 ? list : initialTestimonials
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
                <span className="text-[11px] sm:text-xs font-semibold text-[var(--t-primary,#00685e)] tracking-wide uppercase">Trusted by 200+ Healthcare Organizations</span>
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
                      { label: 'Reports & Analytics', icon: 'analytics', pos: 'top-[-9px] left-1/2 -translate-x-1/2' },
                      { label: 'Emergency Care', icon: 'e911_emergency', pos: 'bottom-[-9px] left-1/2 -translate-x-1/2' },
                      { label: 'Billing & GST', icon: 'receipt_long', pos: 'top-1/2 right-[-5px] -translate-y-1/2' },
                      { label: 'IPD & Bed Mgmt', icon: 'bed', pos: 'top-1/2 left-[-5px] -translate-y-1/2' },
                    ].map(({ label, icon, pos }) => (
                      <motion.div
                        key={label}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                        className={`absolute ${pos}`}
                      >
                        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[7px] xs:text-[7.5px] font-bold whitespace-nowrap shadow-sm border border-[var(--t-border)]"
                          style={{ color: 'var(--t-text, #121d1f)' }}>
                          <span className="material-symbols-outlined text-[8.5px] xs:text-[9.5px]" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                          {label}
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
                      { label: 'Clinical EMR', icon: 'stethoscope', pos: 'top-[6%] right-[6%]' },
                      { label: 'Laboratory LIS', icon: 'science', pos: 'bottom-[6%] left-[6%]' },
                    ].map(({ label, icon, pos }) => (
                      <motion.div
                        key={label}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                        className={`absolute ${pos}`}
                      >
                        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[7px] xs:text-[7.5px] font-bold whitespace-nowrap shadow-sm border border-[var(--t-border)]"
                          style={{ color: 'var(--t-text, #121d1f)' }}>
                          <span className="material-symbols-outlined text-[8.5px] xs:text-[9.5px]" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                          {label}
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
                      { label: 'IT Admin', icon: 'manage_accounts', pos: 'top-[-7px] left-1/4' },
                      { label: 'Pharmacy', icon: 'medication', pos: 'bottom-[-7px] right-1/4' },
                    ].map(({ label, icon, pos }) => (
                      <motion.div
                        key={label}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                        className={`absolute ${pos}`}
                      >
                        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[7px] xs:text-[7.5px] font-bold whitespace-nowrap shadow-sm border border-[var(--t-border)]"
                          style={{ color: 'var(--t-text, #121d1f)' }}>
                          <span className="material-symbols-outlined text-[8.5px] xs:text-[9.5px]" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                          {label}
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
                  150+ Hospitals · 50+ Clinics · 50+ Cities
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
                    { label: 'Reports & Analytics', icon: 'analytics', pos: 'top-[-11px] sm:top-[-15px] left-1/2 -translate-x-1/2' },
                    { label: 'Emergency Care', icon: 'e911_emergency', pos: 'bottom-[-11px] sm:bottom-[-15px] left-1/2 -translate-x-1/2' },
                    { label: 'Billing & GST', icon: 'receipt_long', pos: 'top-1/2 right-[-6px] sm:right-[-12px] -translate-y-1/2' },
                    { label: 'IPD & Bed Mgmt', icon: 'bed', pos: 'top-1/2 left-[-6px] sm:left-[-12px] -translate-y-1/2' },
                  ].map(({ label, icon, pos }) => (
                    <motion.div
                      key={label}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                      className={`absolute ${pos}`}
                    >
                      <div className="flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8.5px] sm:text-[10px] xl:text-[11px] font-bold whitespace-nowrap shadow-md border"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--t-primary) 30%, transparent)',
                          color: 'var(--t-text, #121d1f)',
                        }}>
                        <span className="material-symbols-outlined text-[10px] sm:text-[13px]" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                        {label}
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
                    { label: 'Clinical EMR', icon: 'stethoscope', pos: 'top-[6%] right-[6%]' },
                    { label: 'Laboratory LIS', icon: 'science', pos: 'bottom-[6%] left-[6%]' },
                  ].map(({ label, icon, pos }) => (
                    <motion.div
                      key={label}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                      className={`absolute ${pos}`}
                    >
                      <div className="flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8.5px] sm:text-[10px] xl:text-[11px] font-bold whitespace-nowrap shadow-md border"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--t-primary) 30%, transparent)',
                          color: 'var(--t-text, #121d1f)',
                        }}>
                        <span className="material-symbols-outlined text-[10px] sm:text-[13px]" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                        {label}
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
                    { label: 'IT Admin', icon: 'manage_accounts', pos: 'top-[-9px] sm:top-[-12px] left-1/4' },
                    { label: 'Pharmacy', icon: 'medication', pos: 'bottom-[-9px] sm:bottom-[-12px] right-1/4' },
                  ].map(({ label, icon, pos }) => (
                    <motion.div
                      key={label}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                      className={`absolute ${pos}`}
                    >
                      <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[8px] sm:text-[9.5px] xl:text-[10px] font-bold whitespace-nowrap shadow-md border"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--t-primary) 30%, transparent)',
                          color: 'var(--t-text, #121d1f)',
                        }}>
                        <span className="material-symbols-outlined text-[9px] sm:text-[12px]" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                        {label}
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

      {/* ── 2. TRUSTED BY LEADING INSTITUTIONS (THEME-AWARE CONTAINER) ── */}
      <section
        className="py-10 sm:py-12 md:py-14 relative overflow-hidden shadow-2xl transition-all duration-500"
        style={{
          background: themeStyle.bg,
          borderTop: themeStyle.border,
          borderBottom: themeStyle.borderBottom,
          boxShadow: themeStyle.shadow,
        }}
      >
        {/* Luminous Ambient Radial Overlays */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background: themeStyle.glowTop,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background: themeStyle.glowMid,
          }}
        />
        
        {/* Subtle mesh accent lines */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Content Header */}
        <div className="site-wrapper text-center relative z-10 space-y-2 sm:space-y-3 mb-8 sm:mb-10">
          <p
            className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] transition-colors ${themeStyle.badgeText}`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            TRUSTED BY LEADING INSTITUTIONS
          </p>

          <h2
            className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-extrabold text-white tracking-tight drop-shadow-md"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            200+ Healthcare Organizations &amp; Commercial Enterprises
          </h2>

          <p
            className={`text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide max-w-xl mx-auto transition-colors ${themeStyle.descText}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            150+ Hospitals &nbsp;<span className={`${themeStyle.bulletColor} font-normal`}>•</span>&nbsp; 50+ Clinics &nbsp;<span className={`${themeStyle.bulletColor} font-normal`}>•</span>&nbsp; 50+ Cities Across India
          </p>

          {/* Glowing Indicator Accent Bars */}
          <div className="flex items-center justify-center gap-1.5 pt-0.5">
            <span className="w-6 h-1 rounded-full bg-white/25" />
            <span className={`w-11 h-1.5 rounded-full bg-gradient-to-r ${themeStyle.accentBar}`} />
            <span className="w-6 h-1 rounded-full bg-white/25" />
          </div>
        </div>

        {/* ── CLIENT LOGOS CAROUSEL / TICKER AS SEEN IN REFERENCE IMAGE ── */}
        <div className="relative w-full overflow-hidden z-10 py-2">
          {/* Edge Blur / Fade Mask Overlays */}
          <div className={`absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r ${themeStyle.sideGlow1} z-20 pointer-events-none transition-all duration-500`} />
          <div className={`absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l ${themeStyle.sideGlow2} z-20 pointer-events-none transition-all duration-500`} />

          {/* Continuous Infinite Ticker Row (Boundaryless Clean Logos) */}
          <div className="flex w-max animate-omedo-marquee items-center gap-6 sm:gap-10 md:gap-12 px-4">
            {/* Duplicate array for seamless infinite marquee loop */}
            {[...activeClients, ...activeClients].map((client, idx) => (
              <div
                key={`${client.id || idx}-${idx}`}
                className="flex flex-col items-center shrink-0 group transition-transform duration-300 hover:scale-105 px-1 sm:px-1.5"
              >
                {/* Uniform 1-Size Logo Card (No 12px padding - Full Crisp Logo Display) */}
                <div className="w-40 sm:w-44 md:w-48 h-18 sm:h-20 md:h-22 bg-white rounded-2xl shadow-sm flex items-center justify-center p-1 sm:p-1.5 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border group-hover:border-white/40">
                  {client.logoUrl ? (
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="w-full h-full max-h-full max-w-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-xl flex items-center justify-center text-xs font-black tracking-wider text-white shadow-inner p-1 text-center"
                      style={{ background: client.badgeColor || '#00685e' }}
                    >
                      {client.logoText || (client.name || 'HOSPITAL').slice(0, 10).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Client Name Label Below (Uniform Fixed Width) */}
                <p className={`text-[10px] sm:text-[11px] font-semibold text-center truncate mt-2 w-40 sm:w-44 md:w-48 transition-colors tracking-wide ${themeStyle.labelColor}`}>
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. PRODUCTS SHOWCASE (CLINIC & HMS SUITES) ── */}
      <ProductsShowcase showComparison={false} />





      {/* ── 6. COMPREHENSIVE HMS EXPLANATION SHOWCASE ── */}
      <HMSExplanationContainer />

      {/* ── 7. REVIEWS & TESTIMONIALS SLIDER / GRID ── */}
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
                    <div className="w-10 h-10 rounded-full bg-[#18428a] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {review.avatar || (review.name ? review.name.slice(0, 2).toUpperCase() : 'DR')}
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
