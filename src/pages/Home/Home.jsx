import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'
import { testimonials } from '../../data/testimonials'
import HeroBackground from '../../components/common/HeroBackground'
import ABDMIntegration from '../../components/sections/ABDMIntegration'
import HMSExplanationContainer from '../../components/sections/HMSExplanationContainer'

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
      <section className="relative overflow-hidden pt-20 sm:pt-28 md:pt-32 pb-3 sm:pb-6 lg:pb-8">
        {/* Animated Enterprise Healthcare SaaS Hero Background */}
        <HeroBackground />

        <div className="site-wrapper relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">

            {/* ── Left Content Column ── */}
            <motion.div className="lg:col-span-5 space-y-5 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start" initial="hidden" animate="visible" variants={stagger}>

              {/* Badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--t-primary,#00685e)]/30 bg-white/90 backdrop-blur-sm shadow-[0_2px_20px_var(--t-btn-shadow,rgba(0,180,162,0.15))]">
                <span className="flex w-2 h-2 rounded-full bg-[var(--t-primary,#00685e)] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-semibold text-[var(--t-primary,#00685e)] tracking-wide">Trusted by 500+ Hospitals Globally</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold leading-[1.12] tracking-tight text-center lg:text-left" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="text-[var(--t-text,#121d1f)]">Transforming</span><br />
                <span className="text-[var(--t-text,#121d1f)]">Healthcare with</span><br />
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--t-gradient-text, linear-gradient(135deg, #00685e 0%, #2d685e 100%))' }}>
                    Intelligent HMS
                  </span>
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p variants={fadeUp} className="text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed max-w-md mx-auto lg:mx-0">
                A unified Hospital Management System built for modern healthcare — reduce admin burden, streamline patient workflows, and make data-driven decisions at scale.
              </motion.p>

              {/* ── Mobile Orbital Graphic (Positioned above CTA buttons on phone view) ── */}
              <div className="block lg:hidden w-full py-2">
                <div className="relative w-full max-w-[290px] xs:max-w-[320px] mx-auto aspect-square flex items-center justify-center select-none">
                  {/* Layered ambient glows */}
                  <div className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, var(--t-hero-glow, rgba(0,203,183,0.22)) 0%, transparent 70%)' }} />

                  {/* Outer orbit ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[90%] h-[90%] rounded-full pointer-events-none"
                    style={{
                      border: '1.5px dashed var(--t-primary, #00685e)',
                      opacity: 0.4,
                      filter: 'drop-shadow(0 0 12px var(--t-btn-shadow))',
                    }}
                  >
                    {[
                      { label: 'Clinical EMR', icon: 'stethoscope', pos: 'top-[-10px] left-1/2 -translate-x-1/2' },
                      { label: 'Lab LIS', icon: 'science', pos: 'bottom-[-10px] left-1/2 -translate-x-1/2' },
                      { label: 'Billing & GST', icon: 'receipt_long', pos: 'top-1/2 right-[-6px] -translate-y-1/2' },
                      { label: 'IPD Wards', icon: 'bed', pos: 'top-1/2 left-[-6px] -translate-y-1/2' },
                    ].map(({ label, icon, pos }) => (
                      <motion.div
                        key={label}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        className={`absolute ${pos}`}
                      >
                        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full text-[8.5px] font-bold whitespace-nowrap shadow-sm border border-[var(--t-border)]"
                          style={{ color: 'var(--t-text, #121d1f)' }}>
                          <span className="material-symbols-outlined text-[10px]" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                          {label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Inner orbit ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[60%] h-[60%] rounded-full pointer-events-none"
                    style={{
                      border: '1px solid var(--t-primary, #00685e)',
                      opacity: 0.3,
                    }}
                  >
                    {[
                      { label: 'IT Admin', icon: 'manage_accounts', pos: 'top-[-8px] right-1/4' },
                      { label: 'Pharmacy', icon: 'medication', pos: 'bottom-[-8px] left-1/4' },
                    ].map(({ label, icon, pos }) => (
                      <motion.div
                        key={label}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        className={`absolute ${pos}`}
                      >
                        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[8px] font-bold whitespace-nowrap shadow-sm border border-[var(--t-border)]"
                          style={{ color: 'var(--t-text, #121d1f)' }}>
                          <span className="material-symbols-outlined text-[9px]" style={{ color: 'var(--t-primary, #00685e)' }}>{icon}</span>
                          {label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Center Hub */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-20 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white cursor-pointer group"
                    style={{
                      background: 'linear-gradient(135deg, var(--t-accent, #67d9ca) 0%, var(--t-primary, #00685e) 50%, var(--t-footer-bg, #061325) 100%)',
                      boxShadow: '0 0 30px var(--t-btn-shadow), 0 0 55px var(--t-hero-glow), inset 0 1px 0 rgba(255,255,255,0.2)',
                      border: '2.5px solid rgba(255,255,255,0.9)',
                    }}
                  >
                    <div className="absolute inset-1.5 rounded-full border border-white/10 pointer-events-none" />
                    <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform duration-300"
                      style={{ color: 'var(--t-accent-light, #85f5e6)', filter: 'drop-shadow(0 0 8px var(--t-accent-light))' }}>
                      medical_services
                    </span>
                    <span className="font-extrabold text-[11px] tracking-tight mt-0.5 leading-none text-white"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                      MedCare
                    </span>
                    <span className="text-[7.5px] font-mono uppercase tracking-[0.18em] mt-0.5 leading-none"
                      style={{ color: 'var(--t-accent-light, #85f5e6)', filter: 'drop-shadow(0 0 4px var(--t-accent-light))' }}>
                      HMS CORE
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
                <Link to="/contact"
                  className="inline-flex items-center gap-1.5 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    background: 'var(--t-primary, #00685e)',
                    boxShadow: '0 4px 24px var(--t-btn-shadow, rgba(0,104,94,0.35))',
                  }}
                >
                  Book a Demo
                  <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                </Link>
                <Link to="/modules"
                  className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-white hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                  style={{
                    borderColor: 'var(--t-border, #bcc9c6)',
                    color: 'var(--t-primary, #00685e)',
                  }}
                >
                  Explore Modules
                </Link>
              </motion.div>

              {/* Social proof avatars */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2 border-t border-[var(--t-border)]/30 w-full max-w-md mx-auto lg:mx-0">
                <div className="flex -space-x-2.5 shrink-0">
                  {['DR', 'RN', 'AD', 'CM'].map((init, i) => (
                    <span key={init} className="w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-sm"
                      style={{ background: ['var(--t-primary)', 'var(--t-primary-mid)', 'var(--t-accent)', 'var(--t-primary-dark)'][i] }}>
                      {init}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] text-[var(--t-text-muted)] font-medium">Loved by doctors, nurses & admins across 50+ cities</span>
              </motion.div>

            </motion.div>

            {/* ── Right Column: Premium Orbital Graphic (Desktop Only) ── */}
            <motion.div
              className="hidden lg:flex lg:col-span-7 justify-center items-center"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full max-w-[310px] xs:max-w-[340px] sm:max-w-[460px] md:max-w-[520px] aspect-square flex items-center justify-center select-none py-6 sm:py-0">

                {/* Layered ambient glows */}
                <div className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, var(--t-hero-glow, rgba(0,203,183,0.22)) 0%, transparent 70%)' }} />

                {/* Outer orbit ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-[90%] h-[90%] rounded-full pointer-events-none"
                  style={{
                    border: '1.5px dashed var(--t-primary, #00685e)',
                    opacity: 0.4,
                    filter: 'drop-shadow(0 0 12px var(--t-btn-shadow))',
                  }}
                >
                  {/* Pills on outer ring — counter-rotated for upright text */}
                  {[
                    { label: 'Clinical EMR', icon: 'stethoscope', pos: 'top-[-12px] sm:top-[-18px] left-1/2 -translate-x-1/2' },
                    { label: 'Lab LIS', icon: 'science', pos: 'bottom-[-12px] sm:bottom-[-18px] left-1/2 -translate-x-1/2' },
                    { label: 'Billing & GST', icon: 'receipt_long', pos: 'top-1/2 right-[-8px] sm:right-[-14px] -translate-y-1/2' },
                    { label: 'IPD Wards', icon: 'bed', pos: 'top-1/2 left-[-8px] sm:left-[-14px] -translate-y-1/2' },
                  ].map(({ label, icon, pos }) => (
                    <motion.div
                      key={label}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                      className={`absolute ${pos}`}
                    >
                      <div className="flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-[11px] font-bold whitespace-nowrap shadow-md border"
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

                {/* Inner orbit ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-[60%] h-[60%] rounded-full pointer-events-none"
                  style={{
                    border: '1px solid var(--t-primary, #00685e)',
                    opacity: 0.3,
                  }}
                >
                  {[
                    { label: 'IT Admin', icon: 'manage_accounts', pos: 'top-[-10px] sm:top-[-14px] right-1/4' },
                    { label: 'Pharmacy', icon: 'medication', pos: 'bottom-[-10px] sm:bottom-[-14px] left-1/4' },
                  ].map(({ label, icon, pos }) => (
                    <motion.div
                      key={label}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                      className={`absolute ${pos}`}
                    >
                      <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold whitespace-nowrap shadow-md border"
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
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-20 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center text-white cursor-pointer group"
                  style={{
                    background: 'linear-gradient(135deg, var(--t-accent, #67d9ca) 0%, var(--t-primary, #00685e) 50%, var(--t-footer-bg, #061325) 100%)',
                    boxShadow: '0 0 35px var(--t-btn-shadow), 0 0 65px var(--t-hero-glow), inset 0 1px 0 rgba(255,255,255,0.2)',
                    border: '3px solid rgba(255,255,255,0.9)',
                  }}
                >
                  <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-white/10 pointer-events-none" />

                  <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300"
                    style={{ color: 'var(--t-accent-light, #85f5e6)', filter: 'drop-shadow(0 0 8px var(--t-accent-light))' }}>
                    medical_services
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm md:text-[15px] tracking-tight mt-0.5 sm:mt-1 leading-none text-white"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                    MedCare
                  </span>
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] mt-0.5 leading-none"
                    style={{ color: 'var(--t-accent-light, #85f5e6)', filter: 'drop-shadow(0 0 4px var(--t-accent-light))' }}>
                    HMS CORE
                  </span>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. TRUSTED LOGOS BANNER ── */}
      <section
        className="py-5 sm:py-7 lg:py-8 border-y shadow-inner relative overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, color-mix(in srgb, var(--t-primary) 95%, black) 0%, color-mix(in srgb, var(--t-primary-mid) 85%, black) 50%, color-mix(in srgb, var(--t-primary) 95%, black) 100%)',
          borderColor: 'color-mix(in srgb, var(--t-primary) 50%, transparent)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, color-mix(in srgb, var(--t-accent) 15%, transparent) 0%, transparent 70%)' }} />
        <div className="site-wrapper text-center relative z-10">
          <p
            className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] mb-4 sm:mb-6 text-white/90"
            style={{ textShadow: '0 0 10px rgba(255,255,255,0.4)' }}
          >
            TRUSTED BY LEADING INSTITUTIONS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 items-center justify-items-center">
            {[{ icon: 'public', name: 'CITY GENERAL' }, { icon: 'local_hospital', name: 'APEX CARE' }, { icon: 'corporate_fare', name: 'UNITY MED' }, { icon: 'stethoscope', name: 'GLOBAL CLINIC' }].map(({ icon, name }) => (
              <div key={name} className="flex items-center gap-2.5 font-bold text-white/90 hover:text-white text-xs sm:text-sm lg:text-base transition-colors duration-200 group">
                <span
                  className="material-symbols-outlined group-hover:scale-110 transition-transform duration-200 text-white"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))' }}
                >{icon}</span>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CORE ADVANTAGES SECTION (HOSPITAL OPERATIONS) ── */}
      <section className="py-12 sm:py-16 lg:py-20 site-wrapper">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--t-primary)] mb-2 block">Comprehensive HMS Modules</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--t-text)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Complete Hospital Operation & Patient Management
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-stretch">
          {/* Card 1: Smart Bed & IPD Room Management */}
          <motion.div
            className="bg-[var(--t-bg-light,#f2fafb)] border border-[var(--t-border,#bcc9c6)]/40 rounded-xl sm:rounded-3xl p-4 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            {/* Content-Matched Background Image Overlay - Clear & Sharp */}
            <img
              src="/images/ipd_bg_soft.png"
              alt="IPD Bed Management background"
              className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 transition-all duration-500 pointer-events-none filter saturate-[1.1] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/55 to-white/80 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[var(--t-surface-high,#afecde)] text-[var(--t-primary,#00685e)] flex items-center justify-center mb-3 sm:mb-6">
                <span className="material-symbols-outlined text-lg sm:text-2xl">hotel</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[var(--t-text,#121d1f)] mb-1 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Smart Bed & IPD Rooms</h3>
              <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed mb-3 sm:mb-6">
                Complete control over ward allocations, bed availability, and inpatient care workflows.
              </p>

              <div className="space-y-1.5 sm:space-y-3">
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">bed</span> Real-Time Bed Occupancy
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">Live tracking of ICU, Private, and General ward bed availability.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">meeting_room</span> IPD Admission & Transfer
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">Seamless patient ward transfer, bed charges, and discharge sync.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">medical_information</span> Nurse & Duty Roster
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">Ward nursing assignments, round notes, and vitals recording.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">e911_emergency</span> ICU & Emergency Alerts
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">Real-time vital monitors integration and urgent nurse calls.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">output</span> Discharge Summaries
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">Instant discharge note generation & bed readiness status.</p>
                </div>
              </div>

              <Link to="/modules" className="pt-2 sm:pt-3 mt-2.5 sm:mt-3.5 border-t border-[var(--t-border)]/30 flex items-center justify-between text-xs font-bold text-[var(--t-primary,#00685e)] hover:opacity-80 transition-all group">
                <span>And more...</span>
                <span className="material-symbols-outlined text-xs sm:text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Doctor OPD & Patient Care Hub */}
          <motion.div
            className="bg-white border border-[var(--t-border,#bcc9c6)]/50 rounded-xl sm:rounded-3xl p-4 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-lg transition-all relative overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div>
              <div className="rounded-lg sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 h-32 sm:h-48">
                <img src="/images/home_doctor_tablet.png" alt="Doctor reviewing patient EMR" className="w-full h-full object-cover" />
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--t-surface-high,#afecde)] text-[var(--t-primary,#00685e)] flex items-center justify-center mb-2.5 sm:mb-4 -mt-8 sm:-mt-10 relative z-10 border-2 border-white">
                <span className="material-symbols-outlined text-base sm:text-xl">stethoscope</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[var(--t-text,#121d1f)] mb-1 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Doctor OPD & Patient EMR</h3>
              <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed mb-3 sm:mb-6">
                Streamline doctor consultations, patient queues, and electronic medical records.
              </p>

              <div className="space-y-1.5 sm:space-y-3">
                <div className="bg-[var(--t-bg-light,#f2fafb)] p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">calendar_month</span> OPD Queue & Tokens
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">Smart appointment scheduling and live waiting room screen sync.</p>
                </div>
                <div className="bg-[var(--t-bg-light,#f2fafb)] p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">folder_shared</span> 360° Patient Record
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">UHID medical history, lab reports, diagnostic imaging, and vitals.</p>
                </div>
                <div className="bg-[var(--t-bg-light,#f2fafb)] p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">prescriptions</span> Digital Rx & Orders
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">Instant e-prescriptions sent directly to pharmacy and lab test ordering.</p>
                </div>
              </div>

              <Link to="/modules" className="pt-2 sm:pt-3 mt-2.5 sm:mt-3.5 border-t border-[var(--t-border)]/30 flex items-center justify-between text-xs font-bold text-[var(--t-primary,#00685e)] hover:opacity-80 transition-all group">
                <span>And more...</span>
                <span className="material-symbols-outlined text-xs sm:text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </motion.div>

          {/* Card 3: Billing, Accounts & Pharmacy */}
          <motion.div
            className="bg-[var(--t-bg-light,#f2fafb)] border border-[var(--t-border,#bcc9c6)]/40 rounded-xl sm:rounded-3xl p-4 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            {/* Content-Matched Background Image Overlay - Clear & Sharp */}
            <img
              src="/images/billing_bg_soft.png"
              alt="Billing and Pharmacy background"
              className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 transition-all duration-500 pointer-events-none filter saturate-[1.1] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/55 to-white/80 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[var(--t-surface-high,#afecde)] text-[var(--t-primary,#00685e)] flex items-center justify-center mb-3 sm:mb-6">
                <span className="material-symbols-outlined text-lg sm:text-2xl">receipt_long</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[var(--t-text,#121d1f)] mb-1 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Billing & Pharmacy Hub</h3>
              <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed mb-3 sm:mb-6">
                Automated hospital invoicing, insurance claim clearance, and pharmacy inventory.
              </p>

              <div className="space-y-1.5 sm:space-y-3 mb-3 sm:mb-6">
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">payments</span> Automated Invoicing
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">Itemized OPD/IPD billing, deposit receipts, and refund audits.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">verified_user</span> TPA & Insurance Sync
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">Bi-directional cashless insurance pre-auth and claim tracking.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">medication</span> Pharmacy Inventory
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">Real-time drug stock tracking, batch expiry alerts, and medicine dispatch.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">cancel</span> Cancel & Refund Audits
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">Controlled refund voucher workflows with manager approval log.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[var(--t-border)]/30 text-xs">
                  <div className="font-bold text-[var(--t-text,#121d1f)] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[var(--t-primary,#00685e)]">point_of_sale</span> Daily Collections Report
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--t-text-muted,#6d7a77)]">Real-time cash counter, OPD revenue, and payment gateway logs.</p>
                </div>
              </div>

              <Link to="/modules" className="pt-2 sm:pt-3 mt-2.5 sm:mt-3.5 border-t border-[var(--t-border)]/30 flex items-center justify-between text-xs font-bold text-[var(--t-primary,#00685e)] hover:opacity-80 transition-all group">
                <span>And more...</span>
                <span className="material-symbols-outlined text-xs sm:text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 4. STATS BAR (DARK NAVY BAND WITH ICONS) ── */}
      <section
        className="text-white py-8 sm:py-12 border-y border-white/10"
        style={{ background: 'var(--t-footer-bg, #061325)' }}
      >
        <div className="site-wrapper">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center divide-x-0 md:divide-x divide-white/10">
            {[
              { value: '40%', label: 'Efficiency Gain', icon: 'bar_chart' },
              { value: '99.9%', label: 'System Uptime', icon: 'shield' },
              { value: '500+', label: 'Hospitals Worldwide', icon: 'domain' },
              { value: '15M+', label: 'Patients Records Managed', icon: 'groups' },
            ].map(({ value, label, icon }) => (
              <div key={label} className="flex items-center justify-center gap-3 px-3 py-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl sm:text-2xl text-[var(--t-accent-light)]">{icon}</span>
                </div>
                <div className="text-left">
                  <div className="text-xl sm:text-3xl font-extrabold text-white leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</div>
                  <div className="text-[10px] sm:text-xs text-white/70 font-medium">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. IMPLEMENTATION IN 3 SIMPLE STEPS ── */}
      <section className="py-12 sm:py-16 lg:py-20 site-wrapper">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--t-primary)] mb-2 block">SIMPLE IMPLEMENTATION</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--t-text)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Implementation in 3 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative items-stretch">

          {/* Mobile Vertical Connector Line */}
          <div className="md:hidden absolute left-1/2 top-8 bottom-40 w-0.5 bg-[#bcc9c6]/40 -translate-x-1/2 z-0 pointer-events-none" />

          {/* ECG Connector 1 */}
          <div className="hidden md:block absolute top-12 left-[16.66%] w-[33.33%] z-20 pointer-events-none">
            <svg className="w-full h-10 text-[#00685e]" viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 20 H100 L115 8 L125 32 L135 0 L145 40 L155 10 L165 28 L175 20 H300"
                stroke="#bcc9c6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />
              <motion.path
                d="M0 20 H100 L115 8 L125 32 L135 0 L145 40 L155 10 L165 28 L175 20 H300"
                stroke="var(--t-primary, #00685e)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: [0, 1, 1, 0], opacity: [0.2, 1, 1, 0.2] }}
                transition={{
                  duration: 3.2,
                  times: [0, 0.45, 0.5, 1],
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
          </div>

          {/* ECG Connector 2 */}
          <div className="hidden md:block absolute top-12 left-[50%] w-[33.33%] z-20 pointer-events-none">
            <svg className="w-full h-10 text-[#00685e]" viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 20 H100 L115 8 L125 32 L135 0 L145 40 L155 10 L165 28 L175 20 H300"
                stroke="#bcc9c6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />
              <motion.path
                d="M0 20 H100 L115 8 L125 32 L135 0 L145 40 L155 10 L165 28 L175 20 H300"
                stroke="var(--t-primary, #00685e)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: [0, 0, 1, 1], opacity: [0.2, 0.2, 1, 0.2] }}
                transition={{
                  duration: 3.2,
                  times: [0, 0.5, 0.95, 1],
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
          </div>

          {/* Step 1: Implement */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.15 }}
            variants={fadeUp}
            className="bg-white border border-[#bcc9c6]/50 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 text-center z-10 flex flex-col justify-between"
          >
            {/* Top Featured Content-Matched Image Header */}
            <div className="relative h-44 sm:h-48 overflow-hidden">
              <img
                src="/images/home_hero_reception.png"
                alt="Hospital Cloud Setup & Implementation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
              <div
                className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white text-lg sm:text-xl font-bold flex items-center justify-center shadow-lg ring-4 ring-white/90"
                style={{ background: 'linear-gradient(135deg, var(--t-primary) 0%, var(--t-primary-mid) 100%)' }}
              >
                1
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md border border-white/30">
                <span className="material-symbols-outlined text-sm text-emerald-400">cloud_upload</span>
                <span>Cloud Setup</span>
              </div>
            </div>

            {/* Card Text Content */}
            <div className="p-6 sm:p-7 space-y-2.5 relative z-10">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Implement</h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xs mx-auto font-medium">
                Rapid cloud deployment with personalized configuration based on your hospital's specific workflows.
              </p>
            </div>
          </motion.div>

          {/* Step 2: Integrate */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.15 }}
            variants={fadeUp}
            className="bg-white border border-[#bcc9c6]/50 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 text-center z-10 flex flex-col justify-between"
          >
            {/* Top Featured Content-Matched Image Header */}
            <div className="relative h-44 sm:h-48 overflow-hidden">
              <img
                src="/images/lab_opd_orders.png"
                alt="System Integration & LIS Diagnostics Sync"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
              <div
                className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white text-lg sm:text-xl font-bold flex items-center justify-center shadow-lg ring-4 ring-white/90"
                style={{ background: 'linear-gradient(135deg, var(--t-primary-mid) 0%, var(--t-accent) 100%)' }}
              >
                2
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md border border-white/30">
                <span className="material-symbols-outlined text-sm text-cyan-400">hub</span>
                <span>API &amp; LIS Sync</span>
              </div>
            </div>

            {/* Card Text Content */}
            <div className="p-6 sm:p-7 space-y-2.5 relative z-10">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Integrate</h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xs mx-auto font-medium">
                Connect your existing systems, diagnostics equipment, legacy data, and third-party platforms seamlessly.
              </p>
            </div>
          </motion.div>

          {/* Step 3: Empower */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.15 }}
            variants={fadeUp}
            className="bg-white border border-[#bcc9c6]/50 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 text-center z-10 flex flex-col justify-between"
          >
            {/* Top Featured Content-Matched Image Header */}
            <div className="relative h-44 sm:h-48 overflow-hidden">
              <img
                src="/images/home_doctor_tablet.png"
                alt="Doctor & Nurse Staff Onboarding"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
              <div
                className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white text-lg sm:text-xl font-bold flex items-center justify-center shadow-lg ring-4 ring-white/90"
                style={{ background: 'linear-gradient(135deg, var(--t-primary-dark) 0%, var(--t-primary) 100%)' }}
              >
                3
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md border border-white/30">
                <span className="material-symbols-outlined text-sm text-sky-400">groups</span>
                <span>Staff Onboarding</span>
              </div>
            </div>

            {/* Card Text Content */}
            <div className="p-6 sm:p-7 space-y-2.5 relative z-10">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Empower</h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xs mx-auto font-medium">
                Onboard your staff in days, not months, with our intuitive, user-friendly clinical interface.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 6. COMPREHENSIVE HMS EXPLANATION & STAKEHOLDER SHOWCASE ── */}
      <HMSExplanationContainer />

      {/* ── ABDM & ABHA INTEGRATION ── */}
      <ABDMIntegration />

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
            See how MedCare HMS is transforming hospital operations across clinical management, billing, lab diagnostics, and patient satisfaction.
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
          className="text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 text-center shadow-xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--t-primary) 0%, var(--t-primary-mid) 100%)' }}
        >
          {/* Subtle bg decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

          <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 relative z-10">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ready to Modernize Your Care?
            </h2>
            <p className="text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.82)' }}>
              Join the future of healthcare management. Book your personalized strategy session today and see how we can transform your facility.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
              <Link
                to="/contact"
                className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all"
                style={{ background: 'white', color: 'var(--t-primary)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--t-bg-light, #effcfe)'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}
              >
                Schedule a Consultation
              </Link>
              <Link to="/modules" className="border border-white/40 text-white px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-white/10 transition-all">
                Watch Video Tour
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs pt-3" style={{ color: 'rgba(255,255,255,0.72)' }}>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">check</span> Fast Setup</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">check</span> No Credit Card Required</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">check</span> 24/7 Priority Support</span>
            </div>
          </div>
        </div>
      </motion.section>

    </motion.div>
  )
}
