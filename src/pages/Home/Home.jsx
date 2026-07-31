import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'

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
      {/* ── 1. HERO SECTION (SIDE-BY-SIDE IN 1 LINE) ── */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-[#effcfe] via-[#f5fdfe] to-[#f8fdfe]">
        <div className="site-wrapper">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Content (5 Columns) */}
            <motion.div className="lg:col-span-5 space-y-5" initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#afecde]/80 text-[#00685e] text-xs font-semibold shadow-sm">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                Trusted by 500+ Hospitals Globally
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121d1f] leading-[1.15] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Transforming<br />
                Healthcare through<br />
                <span className="text-[#00685e]">Intelligent Automation</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-xs sm:text-sm text-[#3d4947] leading-relaxed">
                Empower your medical staff with a unified Hospital Management System designed for the modern healthcare era. Reduce administrative burden and focus on what matters most: patient health.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-1">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-[#00685e] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:bg-[#005049] transition-all">
                  Book a Demo <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link to="/modules" className="inline-flex items-center gap-2 border border-[#bcc9c6] text-[#00685e] px-6 py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-white transition-all">
                  Explore Features
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 pt-3 border-t border-[#bcc9c6]/30">
                <div className="flex -space-x-2">
                  <span className="w-8 h-8 rounded-full bg-[#00685e] text-white text-xs font-bold flex items-center justify-center border-2 border-white">DR</span>
                  <span className="w-8 h-8 rounded-full bg-[#008378] text-white text-xs font-bold flex items-center justify-center border-2 border-white">RN</span>
                  <span className="w-8 h-8 rounded-full bg-[#326c62] text-white text-xs font-bold flex items-center justify-center border-2 border-white">AD</span>
                </div>
                <span className="text-xs text-[#6d7a77] font-medium">100+ Accredited Digital Hospitals Today</span>
              </motion.div>
            </motion.div>

            {/* Right Side: High Definition macOS Browser Showcase Card (7 Columns - Side by Side) */}
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div 
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#bcc9c6]/40 bg-white transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(0,104,94,0.22)] hover:border-[#00685e]/40"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                
                {/* macOS Window Controls Header */}
                <div className="bg-[#eaf6f8] px-3.5 py-2.5 border-b border-[#bcc9c6]/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
                    </div>
                    <div className="hidden sm:flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded text-[#3d4947] text-[10px] font-mono border border-[#bcc9c6]/30">
                      <span className="material-symbols-outlined text-[11px] text-[#00685e]">lock</span>
                      app.medcarehms.com
                    </div>
                  </div>

                  {/* Module Switching Tabs */}
                  <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar py-0.5 max-w-full">
                    {heroSlides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => setCurrentSlide(idx)}
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                          currentSlide === idx 
                            ? 'bg-[#00685e] text-white shadow-sm' 
                            : 'bg-white/60 text-[#3d4947] hover:bg-white'
                        }`}
                      >
                        {slide.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full-Width Uncropped Image Container (Exact 2:1 Aspect Ratio Matching Original Screenshot) */}
                <div className="relative bg-white overflow-hidden w-full aspect-[2/1]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={heroSlides[currentSlide].id}
                      src={heroSlides[currentSlide].img}
                      alt={heroSlides[currentSlide].title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="w-full h-full object-fill block"
                    />
                  </AnimatePresence>


                </div>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 1: Smart Bed & IPD Room Management */}
          <motion.div 
            className="bg-[#f2fafb] border border-[#bcc9c6]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#afecde] text-[#00685e] flex items-center justify-center mb-5 sm:mb-6">
                <span className="material-symbols-outlined text-xl sm:text-2xl">hotel</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#121d1f] mb-2 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Smart Bed & IPD Rooms</h3>
              <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed mb-5 sm:mb-6">
                Complete control over ward allocations, bed availability, and inpatient care workflows.
              </p>

              <div className="space-y-2.5 sm:space-y-3">
                <div className="bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">bed</span> Real-Time Bed Occupancy
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">Live tracking of ICU, Private, and General ward bed availability.</p>
                </div>
                <div className="bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">meeting_room</span> IPD Admission & Transfer
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">Seamless patient ward transfer, bed charges, and discharge sync.</p>
                </div>
                <div className="bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">medical_information</span> Nurse & Duty Roster
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">Ward nursing assignments, round notes, and vitals recording.</p>
                </div>
                <div className="bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">e911_emergency</span> ICU & Emergency Alerts
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">Real-time vital monitors integration and urgent nurse calls.</p>
                </div>
                <div className="bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">output</span> Discharge Summaries
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">Instant discharge note generation & bed readiness status.</p>
                </div>
              </div>

              <Link to="/modules" className="pt-3 mt-3.5 border-t border-[#bcc9c6]/30 flex items-center justify-between text-xs font-bold text-[#00685e] hover:text-[#004f47] transition-all group">
                <span>And more...</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Doctor OPD & Patient Care Hub */}
          <motion.div 
            className="bg-white border border-[#bcc9c6]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-lg transition-all relative overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div>
              <div className="rounded-xl sm:rounded-2xl overflow-hidden mb-5 sm:mb-6 h-40 sm:h-48">
                <img src="/images/home_doctor_tablet.png" alt="Doctor reviewing patient EMR" className="w-full h-full object-cover" />
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#afecde] text-[#00685e] flex items-center justify-center mb-3 sm:mb-4 -mt-9 sm:-mt-10 relative z-10 border-2 border-white">
                <span className="material-symbols-outlined text-lg sm:text-xl">stethoscope</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#121d1f] mb-2 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Doctor OPD & Patient EMR</h3>
              <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed mb-5 sm:mb-6">
                Streamline doctor consultations, patient queues, and electronic medical records.
              </p>

              <div className="space-y-2.5 sm:space-y-3">
                <div className="bg-[#f2fafb] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">calendar_month</span> OPD Queue & Tokens
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">Smart appointment scheduling and live waiting room screen sync.</p>
                </div>
                <div className="bg-[#f2fafb] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">folder_shared</span> 360° Patient Record
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">UHID medical history, lab reports, diagnostic imaging, and vitals.</p>
                </div>
                <div className="bg-[#f2fafb] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">prescriptions</span> Digital Rx & Orders
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">Instant e-prescriptions sent directly to pharmacy and lab test ordering.</p>
                </div>
              </div>

              <Link to="/modules" className="pt-3 mt-3.5 border-t border-[#bcc9c6]/30 flex items-center justify-between text-xs font-bold text-[#00685e] hover:text-[#004f47] transition-all group">
                <span>And more...</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </motion.div>

          {/* Card 3: Billing, Accounts & Pharmacy */}
          <motion.div 
            className="bg-[#f2fafb] border border-[#bcc9c6]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#afecde] text-[#00685e] flex items-center justify-center mb-5 sm:mb-6">
                <span className="material-symbols-outlined text-xl sm:text-2xl">receipt_long</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#121d1f] mb-2 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Billing & Pharmacy Hub</h3>
              <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed mb-5 sm:mb-6">
                Automated hospital invoicing, insurance claim clearance, and pharmacy inventory.
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                <div className="bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">payments</span> Automated Invoicing
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">Itemized OPD/IPD billing, deposit receipts, and refund audits.</p>
                </div>
                <div className="bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">verified_user</span> TPA & Insurance Sync
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">Bi-directional cashless insurance pre-auth and claim tracking.</p>
                </div>
                <div className="bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">medication</span> Pharmacy Inventory
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">Real-time drug stock tracking, batch expiry alerts, and medicine dispatch.</p>
                </div>
                <div className="bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">cancel</span> Cancel & Refund Audits
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">Controlled refund voucher workflows with manager approval log.</p>
                </div>
                <div className="bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#bcc9c6]/30 text-xs">
                  <div className="font-bold text-[#121d1f] mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-sm sm:text-base text-[#00685e]">point_of_sale</span> Daily Collections Report
                  </div>
                  <p className="text-[11px] text-[#6d7a77]">Real-time cash counter, OPD revenue, and payment gateway logs.</p>
                </div>
              </div>

              <Link to="/modules" className="pt-3 border-t border-[#bcc9c6]/30 flex items-center justify-between text-xs font-bold text-[#00685e] hover:text-[#004f47] transition-all group">
                <span>And more...</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
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

      {/* ── 6. SEAMLESS ECOSYSTEM (TECH STACK) ── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#effcfe]/50 border-y border-[#bcc9c6]/30">
        <div className="site-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">

            {/* Left Description */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00685e]">Seamless Ecosystem</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Integrates with your existing tech stack
              </h2>
              <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed">
                MedCare HMS isn't an island. We connect natively with the tools you already use, ensuring data flows where it's needed most.
              </p>

              <div className="space-y-2.5 sm:space-y-3 pt-1">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#121d1f]">
                  <span className="material-symbols-outlined text-[#00685e]">check_circle</span>
                  Connects with Radiology & Lab Hardware (HL7, DICOM)
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#121d1f]">
                  <span className="material-symbols-outlined text-[#00685e]">check_circle</span>
                  Bi-directional sync with regional Health Exchanges
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#121d1f]">
                  <span className="material-symbols-outlined text-[#00685e]">check_circle</span>
                  API-first architecture for custom internal tools
                </div>
              </div>
            </div>

            {/* Right Integration Grid */}
            <div className="lg:col-span-6">
              <div className="bg-white/80 border border-[#bcc9c6]/40 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm">
                <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                  <div className="bg-[#f2fafb] border border-[#bcc9c6]/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-[#00685e]">HL7</div>
                  <div className="bg-[#f2fafb] border border-[#bcc9c6]/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-[#00685e]">DICOM</div>
                  <div className="bg-[#f2fafb] border border-[#bcc9c6]/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-[#00685e]">FHIR</div>
                  <div className="bg-[#f2fafb] border border-[#bcc9c6]/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-[#00685e]">SAP</div>
                  <div className="bg-[#f2fafb] border border-[#bcc9c6]/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-[#00685e]">Oracle Health</div>
                  <div className="bg-[#f2fafb] border border-[#bcc9c6]/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-[#00685e]">Epic</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIAL CARD ── */}
      <section className="py-12 sm:py-16 lg:py-20 site-wrapper">
        <div className="bg-white border border-[#bcc9c6]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">

            <div className="md:col-span-4 flex justify-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-md border border-[#bcc9c6]/30">
                <img src="/images/dr_elena_portrait.png" alt="Dr. Elena Rodriguez" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="md:col-span-8 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-1 text-teal-500">
                <span className="material-symbols-outlined text-base sm:text-lg fill-current">star</span>
                <span className="material-symbols-outlined text-base sm:text-lg fill-current">star</span>
                <span className="material-symbols-outlined text-base sm:text-lg fill-current">star</span>
                <span className="material-symbols-outlined text-base sm:text-lg fill-current">star</span>
                <span className="material-symbols-outlined text-base sm:text-lg fill-current">star</span>
              </div>

              <blockquote className="text-sm sm:text-lg lg:text-xl text-[#121d1f] font-medium leading-relaxed italic" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                "Switching to MedCare HMS was the single most impactful decision for our facility this year. We've seen a measurable drop in administrative fatigue among our nurses and a much smoother billing cycle."
              </blockquote>

              <div>
                <div className="font-bold text-[#121d1f] text-sm sm:text-base">Dr. Elena Rodriguez</div>
                <div className="text-[10px] sm:text-xs text-[#6d7a77] uppercase tracking-wider font-semibold">CHIEF MEDICAL OFFICER, SILVER PINES MEDICAL CENTER</div>
              </div>
            </div>

          </div>
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
