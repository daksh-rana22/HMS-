import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'
import { testimonials } from '../../data/testimonials'
import HeroBackground from '../../components/common/HeroBackground'
import ABDMIntegration from '../../components/sections/ABDMIntegration'
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
                <span className="text-[11px] sm:text-xs font-semibold text-[var(--t-primary,#00685e)] tracking-wide">Trusted by 150+ Hospitals &amp; 50+ Clinics</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp} className="text-2xl sm:text-4xl lg:text-[2.65rem] xl:text-[3.1rem] font-black leading-[1.12] tracking-tight text-center lg:text-left" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="text-[var(--t-text,#121d1f)]">Transforming</span><br />
                <span className="text-[var(--t-text,#121d1f)]">Healthcare with</span><br />
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--t-gradient-text, linear-gradient(135deg, #00685e 0%, #2d685e 100%))' }}>
                    Intelligent OMEDO
                  </span>
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p variants={fadeUp} className="text-xs sm:text-sm lg:text-[15px] text-[var(--t-text-secondary,#3d4947)] leading-relaxed max-w-md mx-auto lg:mx-0">
                A unified Hospital Management System built for modern healthcare — reduce admin burden, streamline patient workflows, ensure ABDM compliance, and make data-driven decisions at scale.
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
                      { label: 'ABDM Integration', icon: 'verified_user', pos: 'bottom-[-9px] left-1/2 -translate-x-1/2' },
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
                  Book a Demo
                  <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                </Link>
                <Link to="/modules"
                  className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-white hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                  style={{
                    borderColor: 'var(--t-border, #bcc9c6)',
                    color: 'var(--t-primary, #00685e)',
                  }}
                >
                  Explore Modules
                </Link>
              </motion.div>

              {/* Social proof avatars */}
              <motion.div variants={fadeUp} className="flex items-center gap-2.5 pt-2 border-t border-[var(--t-border)]/30 w-full max-w-md mx-auto lg:mx-0">
                <div className="flex -space-x-2 shrink-0">
                  {['DR', 'RN', 'AD', 'CM'].map((init, i) => (
                    <span key={init} className="w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm"
                      style={{ background: ['var(--t-primary)', 'var(--t-primary-mid)', 'var(--t-accent)', 'var(--t-primary-dark)'][i] }}>
                      {init}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] sm:text-xs text-[var(--t-text-muted)] font-medium">Loved by doctors, nurses &amp; admins across 50+ cities</span>
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
                    { label: 'ABDM Integration', icon: 'verified_user', pos: 'bottom-[-11px] sm:bottom-[-15px] left-1/2 -translate-x-1/2' },
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

      {/* ── 2. TRUSTED LOGOS BANNER ── */}
      <section
        className="py-6 sm:py-8 border-y shadow-inner relative overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, color-mix(in srgb, var(--t-primary) 95%, black) 0%, color-mix(in srgb, var(--t-primary-mid) 85%, black) 50%, color-mix(in srgb, var(--t-primary) 95%, black) 100%)',
          borderColor: 'color-mix(in srgb, var(--t-primary) 50%, transparent)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, color-mix(in srgb, var(--t-accent) 15%, transparent) 0%, transparent 70%)' }} />
        <div className="site-wrapper text-center relative z-10">
          <p
            className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] mb-4 sm:mb-5 text-white/90"
            style={{ textShadow: '0 0 10px rgba(255,255,255,0.4)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            TRUSTED BY LEADING INSTITUTIONS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 md:gap-24">
            {[
              { icon: 'stethoscope', name: 'Clinics - 50+' },
              { icon: 'local_hospital', name: 'Hospitals - 150+' },
            ].map(({ icon, name }) => (
              <div
                key={name}
                className="flex items-center gap-3 font-bold text-white text-base sm:text-lg lg:text-xl tracking-wide transition-colors duration-200 group"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span
                  className="material-symbols-outlined group-hover:scale-110 transition-transform duration-200 text-white text-2xl sm:text-3xl"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))' }}
                >
                  {icon}
                </span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. PRODUCTS SHOWCASE (CLINIC & HMS SUITES) ── */}
      <ProductsShowcase showComparison={false} />

      {/* ── 3. STATS BAR (DARK NAVY BAND WITH ICONS) ── */}
      <section
        className="text-white py-8 sm:py-12 border-y border-white/10"
        style={{ background: 'var(--t-footer-bg, #061325)' }}
      >
        <div className="site-wrapper">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center divide-x-0 md:divide-x divide-white/10">
            {[
              { value: '40%', label: 'Efficiency Gain', icon: 'bar_chart' },
              { value: '99.9%', label: 'System Uptime', icon: 'shield' },
              { value: '150+ / 50+', label: 'Hospitals & Clinics', icon: 'domain' },
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

      {/* ── 6. COMPREHENSIVE HMS EXPLANATION SHOWCASE ── */}
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
