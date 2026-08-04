import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'
import { testimonials } from '../../data/testimonials'
import HeroBackground from '../../components/common/HeroBackground'

const heroSlides = [
  { id: 1, title: 'Clinical Dashboard', img: '/images/hero_slide_1.png', tag: 'Live Clinical OPD & Emergency' },
  { id: 2, title: 'OPD Collections', img: '/images/hero_slide_2.png', tag: 'Real-Time Financial Collections' },
  { id: 3, title: 'Cancel & Refunds', img: '/images/hero_slide_3.png', tag: 'Refund & Audit Tracking' },
  { id: 4, title: 'IT Governance', img: '/images/hero_slide_4.png', tag: '18 IT Admin Sub-Modules' },
  { id: 5, title: 'Department Registry', img: '/images/hero_slide_5.png', tag: 'Department & Staff Master' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

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
    <motion.div {...pageTransition} className="min-h-screen bg-[#f8fdfe]">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden pt-20 sm:pt-28 md:pt-32 pb-10 sm:pb-16 lg:pb-20">
        {/* Animated Enterprise Healthcare SaaS Hero Background */}
        <HeroBackground />

        <div className="site-wrapper relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">

            {/* ── Left Content Column ── */}
            <motion.div className="lg:col-span-5 space-y-5 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start" initial="hidden" animate="visible" variants={stagger}>

              {/* Badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00b4a2]/30 bg-white/80 backdrop-blur-sm shadow-[0_2px_20px_rgba(0,180,162,0.15)]">
                <span className="flex w-2 h-2 rounded-full bg-[#00b4a2] animate-pulse shadow-[0_0_8px_#00b4a2]" />
                <span className="text-[11px] sm:text-xs font-semibold text-[#00685e] tracking-wide">Trusted by 500+ Hospitals Globally</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold leading-[1.12] tracking-tight text-center lg:text-left" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="text-[#121d1f]">Transforming</span><br />
                <span className="text-[#121d1f]">Healthcare with</span><br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#00685e] via-[#009b8d] to-[#00cbb7] bg-clip-text text-transparent">
                    Intelligent HMS
                  </span>
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p variants={fadeUp} className="text-sm text-[#4a5e5b] leading-relaxed max-w-md mx-auto lg:mx-0">
                A unified Hospital Management System built for modern healthcare — reduce admin burden, streamline patient workflows, and make data-driven decisions at scale.
              </motion.p>

              {/* ── Mobile Orbital Graphic (Positioned above CTA buttons on phone view) ── */}
              <div className="block lg:hidden w-full py-2">
                <div className="relative w-full max-w-[290px] xs:max-w-[320px] mx-auto aspect-square flex items-center justify-center select-none">
                  {/* Layered ambient glows */}
                  <div className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(0,203,183,0.22) 0%, rgba(0,180,162,0.12) 40%, transparent 70%)' }} />
                  <div className="absolute w-[75%] h-[75%] rounded-full pointer-events-none animate-pulse"
                    style={{ background: 'radial-gradient(circle, rgba(133,245,230,0.25) 0%, transparent 70%)' }} />

                  {/* Outer orbit ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[90%] h-[90%] rounded-full pointer-events-none"
                    style={{
                      border: '1.5px dashed rgba(0,155,141,0.4)',
                      filter: 'drop-shadow(0 0 12px rgba(0,180,162,0.35))',
                    }}
                  >
                    {[
                      { label: 'Clinical EMR', icon: 'stethoscope', color: '#00b4a2', pos: 'top-[-10px] left-1/2 -translate-x-1/2' },
                      { label: 'Lab LIS', icon: 'science', color: '#008378', pos: 'bottom-[-10px] left-1/2 -translate-x-1/2' },
                      { label: 'Billing & GST', icon: 'receipt_long', color: '#00cbb7', pos: 'top-1/2 right-[-6px] -translate-y-1/2' },
                      { label: 'IPD Wards', icon: 'bed', color: '#326c62', pos: 'top-1/2 left-[-6px] -translate-y-1/2' },
                    ].map(({ label, icon, color, pos }) => (
                      <motion.div
                        key={label}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        className={`absolute ${pos}`}
                      >
                        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full text-[8.5px] font-bold whitespace-nowrap"
                          style={{
                            border: `1px solid ${color}50`,
                            boxShadow: `0 0 12px ${color}35, 0 2px 5px rgba(0,0,0,0.06)`,
                            color: '#00685e',
                          }}>
                          <span className="material-symbols-outlined text-[10px]" style={{ color }}>{icon}</span>
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
                      border: '1px solid rgba(0,155,141,0.3)',
                      filter: 'drop-shadow(0 0 8px rgba(0,180,162,0.25))',
                    }}
                  >
                    {[
                      { label: 'IT Admin', icon: 'manage_accounts', color: '#10b981', pos: 'top-[-8px] right-1/4' },
                      { label: 'Pharmacy', icon: 'medication', color: '#14b8a6', pos: 'bottom-[-8px] left-1/4' },
                    ].map(({ label, icon, color, pos }) => (
                      <motion.div
                        key={label}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        className={`absolute ${pos}`}
                      >
                        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[8px] font-bold whitespace-nowrap"
                          style={{
                            border: `1px solid ${color}50`,
                            boxShadow: `0 0 10px ${color}30, 0 2px 4px rgba(0,0,0,0.05)`,
                            color: '#00685e',
                          }}>
                          <span className="material-symbols-outlined text-[9px]" style={{ color }}>{icon}</span>
                          {label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Pulsing aura */}
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute w-32 h-32 rounded-full pointer-events-none z-10"
                    style={{ background: 'radial-gradient(circle, rgba(0,203,183,0.4) 0%, transparent 70%)' }}
                  />

                  {/* Center Hub */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-20 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white cursor-pointer group"
                    style={{
                      background: 'linear-gradient(135deg, #00cbb7 0%, #00685e 50%, #00312c 100%)',
                      boxShadow: '0 0 30px rgba(0,180,162,0.7), 0 0 55px rgba(133,245,230,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                      border: '2.5px solid rgba(255,255,255,0.9)',
                    }}
                  >
                    <div className="absolute inset-1.5 rounded-full border border-white/10 pointer-events-none" />
                    <span className="material-symbols-outlined text-xl text-[#85f5e6] group-hover:scale-110 transition-transform duration-300"
                      style={{ filter: 'drop-shadow(0 0 8px rgba(133,245,230,0.9))' }}>
                      medical_services
                    </span>
                    <span className="font-extrabold text-[11px] tracking-tight mt-0.5 leading-none"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                      MedCare
                    </span>
                    <span className="text-[7.5px] font-mono uppercase tracking-[0.18em] mt-0.5 leading-none"
                      style={{ color: '#85f5e6', filter: 'drop-shadow(0 0 4px rgba(133,245,230,0.8))' }}>
                      HMS CORE
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
                <Link to="/contact"
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#00685e] to-[#009b8d] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-[0_4px_24px_rgba(0,104,94,0.35)] hover:shadow-[0_6px_32px_rgba(0,104,94,0.5)] hover:scale-[1.03] transition-all duration-200"
                >
                  Book a Demo
                  <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                </Link>
                <Link to="/modules"
                  className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-[#bcc9c6]/60 text-[#00685e] px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-white hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                >
                  Explore Modules
                </Link>
              </motion.div>



              {/* Social proof avatars */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2 border-t border-[#bcc9c6]/30 w-full max-w-md mx-auto lg:mx-0">
                <div className="flex -space-x-2.5 shrink-0">
                  {['DR','RN','AD','CM'].map((init, i) => (
                    <span key={init} className="w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-sm"
                      style={{ background: ['#00685e','#008378','#326c62','#009b8d'][i] }}>
                      {init}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] text-[#6d7a77] font-medium">Loved by doctors, nurses & admins across 50+ cities</span>
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
                  style={{ background: 'radial-gradient(circle, rgba(0,203,183,0.22) 0%, rgba(0,180,162,0.12) 40%, transparent 70%)' }} />
                <div className="absolute w-[75%] h-[75%] rounded-full pointer-events-none animate-pulse"
                  style={{ background: 'radial-gradient(circle, rgba(133,245,230,0.25) 0%, transparent 70%)' }} />

                {/* Outer orbit ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-[90%] h-[90%] rounded-full pointer-events-none"
                  style={{
                    border: '1.5px dashed rgba(0,155,141,0.4)',
                    filter: 'drop-shadow(0 0 12px rgba(0,180,162,0.35))',
                  }}
                >
                  {/* Pills on outer ring — counter-rotated for upright text */}
                  {[
                    { label: 'Clinical EMR', icon: 'stethoscope', color: '#00b4a2', pos: 'top-[-12px] sm:top-[-18px] left-1/2 -translate-x-1/2' },
                    { label: 'Lab LIS', icon: 'science', color: '#008378', pos: 'bottom-[-12px] sm:bottom-[-18px] left-1/2 -translate-x-1/2' },
                    { label: 'Billing & GST', icon: 'receipt_long', color: '#00cbb7', pos: 'top-1/2 right-[-8px] sm:right-[-14px] -translate-y-1/2' },
                    { label: 'IPD Wards', icon: 'bed', color: '#326c62', pos: 'top-1/2 left-[-8px] sm:left-[-14px] -translate-y-1/2' },
                  ].map(({ label, icon, color, pos }) => (
                    <motion.div
                      key={label}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                      className={`absolute ${pos}`}
                    >
                      <div className="flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-[11px] font-bold whitespace-nowrap"
                        style={{
                          border: `1px solid ${color}50`,
                          boxShadow: `0 0 14px ${color}35, 0 2px 6px rgba(0,0,0,0.06)`,
                          color: '#00685e',
                        }}>
                        <span className="material-symbols-outlined text-[10px] sm:text-[13px]" style={{ color }}>{icon}</span>
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
                    border: '1px solid rgba(0,155,141,0.3)',
                    filter: 'drop-shadow(0 0 8px rgba(0,180,162,0.25))',
                  }}
                >
                  {[
                    { label: 'IT Admin', icon: 'manage_accounts', color: '#10b981', pos: 'top-[-10px] sm:top-[-14px] right-1/4' },
                    { label: 'Pharmacy', icon: 'medication', color: '#14b8a6', pos: 'bottom-[-10px] sm:bottom-[-14px] left-1/4' },
                  ].map(({ label, icon, color, pos }) => (
                    <motion.div
                      key={label}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                      className={`absolute ${pos}`}
                    >
                      <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold whitespace-nowrap"
                        style={{
                          border: `1px solid ${color}50`,
                          boxShadow: `0 0 10px ${color}30, 0 2px 4px rgba(0,0,0,0.05)`,
                          color: '#00685e',
                        }}>
                        <span className="material-symbols-outlined text-[9px] sm:text-[12px]" style={{ color }}>{icon}</span>
                        {label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pulsing aura */}
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.15, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full pointer-events-none z-10"
                  style={{ background: 'radial-gradient(circle, rgba(0,203,183,0.4) 0%, transparent 70%)' }}
                />

                {/* Center Hub */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-20 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center text-white cursor-pointer group"
                  style={{
                    background: 'linear-gradient(135deg, #00cbb7 0%, #00685e 50%, #00312c 100%)',
                    boxShadow: '0 0 35px rgba(0,180,162,0.7), 0 0 65px rgba(133,245,230,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                    border: '3px solid rgba(255,255,255,0.9)',
                  }}
                >
                  {/* Inner ring decoration */}
                  <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-white/10 pointer-events-none" />

                  <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl text-[#85f5e6] group-hover:scale-110 transition-transform duration-300"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(133,245,230,0.9))' }}>
                    medical_services
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm md:text-[15px] tracking-tight mt-0.5 sm:mt-1 leading-none"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                    MedCare
                  </span>
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] mt-0.5 leading-none"
                    style={{ color: '#85f5e6', filter: 'drop-shadow(0 0 4px rgba(133,245,230,0.8))' }}>
                    HMS CORE
                  </span>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. TRUSTED LOGOS BANNER ── */}
      <section className="py-8 sm:py-10 lg:py-12 bg-white border-y border-[#bcc9c6]/30">
        <div className="site-wrapper text-center">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#6d7a77] mb-4 sm:mb-6">TRUSTED BY LEADING INSTITUTIONS</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-items-center opacity-80">
            <div className="flex items-center gap-2 font-bold text-[#3d4947] text-xs sm:text-sm lg:text-base">
              <span className="material-symbols-outlined text-[#00685e]">public</span>
              CITY GENERAL
            </div>
            <div className="flex items-center gap-2 font-bold text-[#3d4947] text-xs sm:text-sm lg:text-base">
              <span className="material-symbols-outlined text-[#00685e]">local_hospital</span>
              APEX CARE
            </div>
            <div className="flex items-center gap-2 font-bold text-[#3d4947] text-xs sm:text-sm lg:text-base">
              <span className="material-symbols-outlined text-[#00685e]">corporate_fare</span>
              UNITY MED
            </div>
            <div className="flex items-center gap-2 font-bold text-[#3d4947] text-xs sm:text-sm lg:text-base">
              <span className="material-symbols-outlined text-[#00685e]">stethoscope</span>
              GLOBAL CLINIC
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CORE ADVANTAGES SECTION (HOSPITAL OPERATIONS) ── */}
      <section className="py-12 sm:py-16 lg:py-20 site-wrapper">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00685e] mb-2 block">Comprehensive HMS Modules</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Complete Hospital Operation & Patient Management
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-stretch">
          {/* Card 1: Smart Bed & IPD Room Management */}
          <motion.div 
            className="bg-[#f2fafb] border border-[#bcc9c6]/40 rounded-xl sm:rounded-3xl p-4 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#afecde] text-[#00685e] flex items-center justify-center mb-3 sm:mb-6">
                <span className="material-symbols-outlined text-lg sm:text-2xl">hotel</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[#121d1f] mb-1 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Smart Bed & IPD Rooms</h3>
              <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed mb-3 sm:mb-6">
                Complete control over ward allocations, bed availability, and inpatient care workflows.
              </p>

              <div className="space-y-1.5 sm:space-y-3">
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">bed</span> Real-Time Bed Occupancy
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">Live tracking of ICU, Private, and General ward bed availability.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">meeting_room</span> IPD Admission & Transfer
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">Seamless patient ward transfer, bed charges, and discharge sync.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">medical_information</span> Nurse & Duty Roster
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">Ward nursing assignments, round notes, and vitals recording.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">e911_emergency</span> ICU & Emergency Alerts
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">Real-time vital monitors integration and urgent nurse calls.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">output</span> Discharge Summaries
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">Instant discharge note generation & bed readiness status.</p>
                </div>
              </div>

              <Link to="/modules" className="pt-2 sm:pt-3 mt-2.5 sm:mt-3.5 border-t border-[#bcc9c6]/30 flex items-center justify-between text-xs font-bold text-[#00685e] hover:text-[#004f47] transition-all group">
                <span>And more...</span>
                <span className="material-symbols-outlined text-xs sm:text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Doctor OPD & Patient Care Hub */}
          <motion.div 
            className="bg-white border border-[#bcc9c6]/50 rounded-xl sm:rounded-3xl p-4 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-lg transition-all relative overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div>
              <div className="rounded-lg sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 h-32 sm:h-48">
                <img src="/images/home_doctor_tablet.png" alt="Doctor reviewing patient EMR" className="w-full h-full object-cover" />
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#afecde] text-[#00685e] flex items-center justify-center mb-2.5 sm:mb-4 -mt-8 sm:-mt-10 relative z-10 border-2 border-white">
                <span className="material-symbols-outlined text-base sm:text-xl">stethoscope</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[#121d1f] mb-1 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Doctor OPD & Patient EMR</h3>
              <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed mb-3 sm:mb-6">
                Streamline doctor consultations, patient queues, and electronic medical records.
              </p>

              <div className="space-y-1.5 sm:space-y-3">
                <div className="bg-[#f2fafb] p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">calendar_month</span> OPD Queue & Tokens
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">Smart appointment scheduling and live waiting room screen sync.</p>
                </div>
                <div className="bg-[#f2fafb] p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">folder_shared</span> 360° Patient Record
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">UHID medical history, lab reports, diagnostic imaging, and vitals.</p>
                </div>
                <div className="bg-[#f2fafb] p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">prescriptions</span> Digital Rx & Orders
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">Instant e-prescriptions sent directly to pharmacy and lab test ordering.</p>
                </div>
              </div>

              <Link to="/modules" className="pt-2 sm:pt-3 mt-2.5 sm:mt-3.5 border-t border-[#bcc9c6]/30 flex items-center justify-between text-xs font-bold text-[#00685e] hover:text-[#004f47] transition-all group">
                <span>And more...</span>
                <span className="material-symbols-outlined text-xs sm:text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </motion.div>

          {/* Card 3: Billing, Accounts & Pharmacy */}
          <motion.div 
            className="bg-[#f2fafb] border border-[#bcc9c6]/40 rounded-xl sm:rounded-3xl p-4 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#afecde] text-[#00685e] flex items-center justify-center mb-3 sm:mb-6">
                <span className="material-symbols-outlined text-lg sm:text-2xl">receipt_long</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[#121d1f] mb-1 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Billing & Pharmacy Hub</h3>
              <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed mb-3 sm:mb-6">
                Automated hospital invoicing, insurance claim clearance, and pharmacy inventory.
              </p>

              <div className="space-y-1.5 sm:space-y-3 mb-3 sm:mb-6">
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">payments</span> Automated Invoicing
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">Itemized OPD/IPD billing, deposit receipts, and refund audits.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">verified_user</span> TPA & Insurance Sync
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">Bi-directional cashless insurance pre-auth and claim tracking.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">medication</span> Pharmacy Inventory
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">Real-time drug stock tracking, batch expiry alerts, and medicine dispatch.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">cancel</span> Cancel & Refund Audits
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">Controlled refund voucher workflows with manager approval log.</p>
                </div>
                <div className="bg-white p-2 sm:p-3.5 rounded-lg sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-xs sm:text-base text-[#00685e]">point_of_sale</span> Daily Collections Report
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6d7a77]">Real-time cash counter, OPD revenue, and payment gateway logs.</p>
                </div>
              </div>

              <Link to="/modules" className="pt-2 sm:pt-3 mt-2.5 sm:mt-3.5 border-t border-[#bcc9c6]/30 flex items-center justify-between text-xs font-bold text-[#00685e] hover:text-[#004f47] transition-all group">
                <span>And more...</span>
                <span className="material-symbols-outlined text-xs sm:text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 4. STATS BAR (DARK TEAL BAND) ── */}
      <section className="bg-[#004f47] text-white py-10 sm:py-14 lg:py-16 my-6 sm:my-10 lg:my-14">
        <div className="site-wrapper">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>40%</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Efficiency Gain</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>99.9%</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">System Uptime</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>500+</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Hospitals Worldwide</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>15M+</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Patient Records Managed</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. IMPLEMENTATION IN 3 SIMPLE STEPS ── */}
      <section className="py-12 sm:py-16 lg:py-20 site-wrapper">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00685e] mb-2 block">Simplicity by Design</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Implementation in 3 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-start">
          
          {/* Mobile Vertical Connector Line */}
          <div className="md:hidden absolute left-1/2 top-8 bottom-40 w-0.5 bg-[#bcc9c6]/40 -translate-x-1/2 z-0 pointer-events-none" />

          {/* ECG Connector 1: Plays Sequence 1 (Step 1 to Step 2) */}
          <div className="hidden md:block absolute top-7 left-[16.66%] w-[33.33%] z-0 pointer-events-none">
            <svg className="w-full h-10 text-[#00685e]" viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Track Line */}
              <path 
                d="M0 20 H100 L115 8 L125 32 L135 0 L145 40 L155 10 L165 28 L175 20 H300" 
                stroke="#bcc9c6" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                opacity="0.3"
              />
              {/* Animated Pulse Wave (0s -> 1.5s) */}
              <motion.path 
                d="M0 20 H100 L115 8 L125 32 L135 0 L145 40 L155 10 L165 28 L175 20 H300" 
                stroke="#00685e" 
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

          {/* ECG Connector 2: Plays Sequence 2 (Step 2 to Step 3, immediately following 1-2) */}
          <div className="hidden md:block absolute top-7 left-[50%] w-[33.33%] z-0 pointer-events-none">
            <svg className="w-full h-10 text-[#00685e]" viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Track Line */}
              <path 
                d="M0 20 H100 L115 8 L125 32 L135 0 L145 40 L155 10 L165 28 L175 20 H300" 
                stroke="#bcc9c6" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                opacity="0.3"
              />
              {/* Animated Pulse Wave (1.6s -> 3.2s) */}
              <motion.path 
                d="M0 20 H100 L115 8 L125 32 L135 0 L145 40 L155 10 L165 28 L175 20 H300" 
                stroke="#00685e" 
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

          {/* Step 1 */}
          <div className="text-center relative z-10 space-y-3 sm:space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#00685e] text-white text-xl sm:text-2xl font-bold flex items-center justify-center mx-auto shadow-md ring-4 ring-[#f8fdfe]">
              1
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Implement</h3>
            <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed max-w-xs mx-auto">
              Rapid cloud deployment with personalized configuration based on your hospital's specific workflows.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center relative z-10 space-y-3 sm:space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#afecde] text-[#00685e] text-xl sm:text-2xl font-bold flex items-center justify-center mx-auto shadow-md ring-4 ring-[#f8fdfe]">
              2
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Integrate</h3>
            <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed max-w-xs mx-auto">
              Connect your existing diagnostic equipment, legacy databases, and pharmacy systems seamlessly.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center relative z-10 space-y-3 sm:space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#121d1f] text-white text-xl sm:text-2xl font-bold flex items-center justify-center mx-auto shadow-md ring-4 ring-[#f8fdfe]">
              3
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Empower</h3>
            <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed max-w-xs mx-auto">
              Onboard your staff in days, not months, with our intuitive, user-friendly clinical interface.
            </p>
          </div>

        </div>
      </section>

      {/* ── 6. WHAT IS MEDCARE HMS & HOW TO USE IT ── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#effcfe]/60 to-white border-y border-[#bcc9c6]/30">
        <div className="site-wrapper space-y-10 sm:space-y-14">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00685e] px-3.5 py-1 rounded-full bg-[#afecde]/60 inline-block">
              SYSTEM GUIDE & OVERVIEW
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              What is MedCare HMS & How to Use It
            </h2>
            <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed">
              MedCare HMS is an end-to-end digital healthcare platform that unifies hospital administration, clinical care, lab diagnostics, and financial management into one easy-to-use system.
            </p>
          </div>

          {/* 4 Steps How To Use Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            
            {/* Step 1 */}
            <div className="bg-white border border-[#bcc9c6]/40 p-3.5 sm:p-6 rounded-xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all space-y-2 sm:space-y-3 flex flex-col justify-between">
              <div className="space-y-2 sm:space-y-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#e6f7f4] text-[#00685e] font-bold text-xs sm:text-sm flex items-center justify-center border border-[#00685e]/20">
                  01
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Patient Registration
                </h3>
                <p className="text-[11px] sm:text-xs text-[#3d4947] leading-relaxed">
                  Register walk-in or appointment patients, generate unique UHIDs, and issue OPD queue tokens instantly.
                </p>
              </div>
              <div className="pt-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#00685e]">
                <span className="material-symbols-outlined text-xs sm:text-sm">person_add</span> OPD & Emergency Entry
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-[#bcc9c6]/40 p-3.5 sm:p-6 rounded-xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all space-y-2 sm:space-y-3 flex flex-col justify-between">
              <div className="space-y-2 sm:space-y-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#e6f7f4] text-[#00685e] font-bold text-xs sm:text-sm flex items-center justify-center border border-[#00685e]/20">
                  02
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Doctor Consultation
                </h3>
                <p className="text-[11px] sm:text-xs text-[#3d4947] leading-relaxed">
                  Doctors access patient EMR, record clinical notes, prescribe medicines, and order lab/radiology tests in real-time.
                </p>
              </div>
              <div className="pt-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#00685e]">
                <span className="material-symbols-outlined text-xs sm:text-sm">clinical_notes</span> EMR & E-Prescriptions
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-[#bcc9c6]/40 p-3.5 sm:p-6 rounded-xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all space-y-2 sm:space-y-3 flex flex-col justify-between">
              <div className="space-y-2 sm:space-y-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#e6f7f4] text-[#00685e] font-bold text-xs sm:text-sm flex items-center justify-center border border-[#00685e]/20">
                  03
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  IPD Care & Ward Matrix
                </h3>
                <p className="text-[11px] sm:text-xs text-[#3d4947] leading-relaxed">
                  Admit patients to wards, assign beds dynamically, manage nurse rounds, and track daily inpatient care notes.
                </p>
              </div>
              <div className="pt-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#00685e]">
                <span className="material-symbols-outlined text-xs sm:text-sm">hotel</span> Ward Bed & IPD Management
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-[#bcc9c6]/40 p-3.5 sm:p-6 rounded-xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all space-y-2 sm:space-y-3 flex flex-col justify-between">
              <div className="space-y-2 sm:space-y-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#e6f7f4] text-[#00685e] font-bold text-xs sm:text-sm flex items-center justify-center border border-[#00685e]/20">
                  04
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Billing & Discharge
                </h3>
                <p className="text-[11px] sm:text-xs text-[#3d4947] leading-relaxed">
                  Consolidate OPD/IPD charges, process TPA insurance claims, generate GST bills, and issue discharge summaries.
                </p>
              </div>
              <div className="pt-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#00685e]">
                <span className="material-symbols-outlined text-xs sm:text-sm">receipt_long</span> Instant Invoicing & Tally Sync
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. REVIEWS & TESTIMONIALS GRID ── */}
      <section className="py-12 sm:py-16 lg:py-20 site-wrapper space-y-10 sm:space-y-12">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.slice(0, 6).map((review, idx) => (
            <div key={idx} className="bg-white border border-[#bcc9c6]/40 p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-teal-600">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-base sm:text-lg fill-current">star</span>
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
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. CALL TO ACTION BANNER (DARK TEAL PILL) ── */}
      <section className="py-6 sm:py-10 lg:py-12 site-wrapper">
        <div className="bg-[#004f47] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 text-center shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 relative z-10">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ready to Modernize Your Care?
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed max-w-xl mx-auto">
              Join the future of healthcare management. Book your personalized strategy session today and see how we can transform your facility.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
              <Link to="/contact" className="bg-white text-[#004f47] px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-md hover:bg-[#effcfe] transition-all">
                Schedule a Consultation
              </Link>
              <Link to="/modules" className="border border-white/40 text-white px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-white/10 transition-all">
                Watch Video Tour
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-white/70 pt-3">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">check</span> Fast Setup</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">check</span> No Credit Card Required</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">check</span> 24/7 Priority Support</span>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  )
}
