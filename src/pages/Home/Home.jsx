import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'
import { testimonials } from '../../data/testimonials'
import HeroBackground from '../../components/common/HeroBackground'
import HMSExplanationContainer from '../../components/sections/HMSExplanationContainer'
import ProductsShowcase from '../../components/sections/ProductsShowcase'

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

      {/* ── 2. TRUSTED BY LEADING INSTITUTIONS (ROYAL BLUE SHADE) ── */}
      <section
        className="py-8 sm:py-9 md:py-11 relative overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #07152d 0%, #0d2857 25%, #18428a 50%, #12336d 75%, #061226 100%)',
          borderTop: '1px solid rgba(147, 197, 253, 0.25)',
          borderBottom: '1px solid rgba(147, 197, 253, 0.18)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(7, 21, 45, 0.4)',
        }}
      >
        {/* Royal Blue Luminous Ambient Radial Overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(59, 130, 246, 0.38) 0%, rgba(29, 78, 216, 0.15) 50%, transparent 80%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.16) 0%, transparent 65%)',
          }}
        />
        
        {/* Subtle royal mesh accent lines */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Content */}
        <div className="site-wrapper text-center relative z-10 space-y-2 sm:space-y-3">
          <p
            className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-blue-200/90"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            TRUSTED BY LEADING INSTITUTIONS
          </p>

          <h2
            className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-extrabold text-white tracking-tight drop-shadow-md"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            200+ Healthcare Organizations
          </h2>

          <p
            className="text-[11px] sm:text-xs md:text-sm font-semibold text-blue-100/90 tracking-wide max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            150+ Hospitals &nbsp;<span className="text-blue-300/60 font-normal">•</span>&nbsp; 50+ Clinics &nbsp;<span className="text-blue-300/60 font-normal">•</span>&nbsp; 50+ Cities Across India
          </p>

          {/* Glowing Indicator Accent Bars */}
          <div className="flex items-center justify-center gap-1.5 pt-0.5">
            <span className="w-6 h-1 rounded-full bg-blue-300/25" />
            <span className="w-11 h-1.5 rounded-full bg-gradient-to-r from-blue-400 via-white to-blue-400 shadow-[0_0_10px_rgba(147,197,253,0.9)]" />
            <span className="w-6 h-1 rounded-full bg-blue-300/25" />
          </div>
        </div>
      </section>

      {/* ── 2. PRODUCTS SHOWCASE (CLINIC & HMS SUITES) ── */}
      <ProductsShowcase showComparison={false} />





      {/* ── 6. COMPREHENSIVE HMS EXPLANATION SHOWCASE ── */}
      <HMSExplanationContainer />

      {/* ── 7. REVIEWS & TESTIMONIALS GRID ── */}
      <section className="pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 site-wrapper space-y-10 sm:space-y-12">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00685e] px-3.5 py-1 rounded-full bg-[#afecde]/60 inline-block">
            TRUSTED BY HEALTHCARE LEADERS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Loved by Doctors, Admins & IT Directors
          </h2>
          <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed">
            See how OMEDO is transforming hospital operations across clinical management, billing, lab diagnostics, and patient satisfaction.
          </p>
        </div>

        {/* Reviews Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonials.slice(0, 6).map((review, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="bg-white border border-[#bcc9c6]/40 p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-base sm:text-lg" style={{ fontVariationSettings: "'FILL' 1", color: 'var(--t-primary, #00685e)' }}>star</span>
                  ))}
                </div>
                {/* Content */}
                <blockquote className="text-xs sm:text-sm text-[#121d1f] leading-relaxed italic">
                  "{review.content}"
                </blockquote>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#bcc9c6]/30">
                <div className="w-10 h-10 rounded-full bg-[#00685e] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-bold text-[#121d1f] text-xs sm:text-sm">{review.name}</div>
                  <div className="text-[10px] sm:text-xs text-[#6d7a77] font-medium">{review.role} • <span className="text-[#00685e]">{review.organization}</span></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
