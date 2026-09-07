import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 44, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
}

const devicePlatforms = [
  {
    id: 'laptop',
    name: 'Laptop & Desktop',
    tag: 'Enterprise Command Center',
    icon: 'laptop_mac',
    color: 'var(--t-primary, #00685e)',
    img: '/images/hero_slide_1.png',
    role: 'Admins, Reception, Billing Cashiers & Lab Technicians',
    summary: 'High-performance desktop workspace built for heavy hospital data entry, multi-tab EMR navigation, live bed occupancy maps, and financial accounting exports.',
    features: [
      'Multi-window clinical queue & OPD token management grid',
      'Itemized billing, cashless TPA pre-authorization & deposit ledger',
      'Bi-directional lab analyzer integration & DICOM radiology viewer',
      'Multi-branch hospital master setup and Tally/GST export'
    ]
  },
  {
    id: 'tablet',
    name: 'Tablet & iPad',
    tag: 'Point-of-Care & Doctor Rounds',
    icon: 'tablet_mac',
    color: 'var(--t-primary-mid, #008378)',
    img: '/images/clinical_master_02.png',
    role: 'Ward Doctors, ICU Nurses & Resident Physicians',
    summary: 'Touch-optimized mobile EMR interface designed for bedside doctor rounds, nursing vitals recording, e-prescriptions, and ABHA QR health ID verification.',
    features: [
      'Touch-friendly bedside EMR charting and live vital signs recording',
      'Instant ABHA health ID QR scanning and digital record linking',
      'One-tap digital prescriptions with customized dosage templates',
      'High-resolution DICOM X-ray and CT scan image viewer on iPad'
    ]
  },
  {
    id: 'mobile',
    name: 'Smartphone App',
    tag: 'On-the-Go & Patient Portal',
    icon: 'smartphone',
    color: '#0284c7',
    img: '/images/ipd_nurse_dashboard.png',
    role: 'Visiting Consultants, On-Call Surgeons & Patients',
    summary: 'Handheld mobile portal providing instant emergency alert notifications, real-time OPD token waiting lists, digital health wallet, and remote doctor access.',
    features: [
      'Real-time patient waiting queue token status and live push alerts',
      'Instant emergency alerts for ICU vital threshold breaches',
      'Digital health wallet, deposit payments & lab report downloads',
      'Telemedicine video consultations and direct doctor-patient messaging'
    ]
  }
]

const comparisonData = [
  {
    feature: 'Patient Medical Records',
    manual: 'Paper files, lost charts, illegible handwriting',
    hms: 'Centralized 360° Digital EMR accessible instantly',
  },
  {
    feature: 'OPD Wait Times & Queues',
    manual: 'Unorganized overcrowding & long registration lines',
    hms: 'Smart digital token queues & instant appointment booking',
  },
  {
    feature: 'IPD Bed Management',
    manual: 'Manual phone calls to check room availability',
    hms: 'Live visual bed census map (ICU, Private, General Wards)',
  },
  {
    feature: 'Hospital Invoicing & Revenue',
    manual: 'Unrecorded procedures & frequent billing leakages',
    hms: 'Automated itemized billing & cashless insurance sync',
  },
  {
    feature: 'Lab & Diagnostics',
    manual: 'Manual paper report delivery & delayed turnaround',
    hms: 'Bi-directional analyzer integration & instant EMR sync',
  },
  {
    feature: 'National Health Compliance',
    manual: 'Non-standardized records & compliance risk',
    hms: 'Fully ABDM (M1, M2, M3) compliant with ABHA ID creation',
  },
]



export default function HMSExplanationContainer() {
  const [activeDevice, setActiveDevice] = useState('laptop')

  const selectedDevice = devicePlatforms.find((d) => d.id === activeDevice)

  return (
    <section className="pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 lg:pb-10 relative overflow-hidden" style={{ background: 'var(--t-bg, #effcfe)' }}>
      {/* Glow Effects & Grid Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 20%, var(--t-hero-glow, rgba(0,180,162,0.12)) 0%, transparent 70%)',
        }}
      />

      <div className="site-wrapper relative z-10 space-y-12 sm:space-y-16 lg:space-y-20">

        {/* ── 1. MAIN CONTAINER HERO BANNER ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden border shadow-xl text-center"
          style={{
            background: 'linear-gradient(135deg, white 0%, var(--t-bg-light, #f2fafb) 50%, white 100%)',
            borderColor: 'var(--t-border, #bcc9c6)',
          }}
        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[var(--t-primary,#00685e)]/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[var(--t-accent,#67d9ca)]/10 to-transparent rounded-tr-full pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--t-primary)]/30 bg-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--t-primary)] animate-ping" />
              <span className="text-xs font-bold tracking-wider text-[var(--t-primary)] uppercase">
                INTELLIGENT HEALTHCARE PLATFORM · OMEDO HMS
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--t-text,#121d1f)] tracking-tight leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Everything Your Hospital Needs.{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--t-gradient-text, linear-gradient(135deg, #00685e 0%, #2d685e 100%))' }}>
                Connected in One Platform.
              </span>
            </h2>

            <div className="space-y-2 max-w-3xl mx-auto text-xs sm:text-base text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
              <p>
                OMEDO connects clinical, administrative and financial workflows into one intelligent healthcare platform.
              </p>
              <p className="font-semibold text-[var(--t-primary,#00685e)]">
                One platform. One connected patient journey. One source of truth.
              </p>
            </div>

            {/* Quick Stat Pill Grid inside Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 text-left">
              {[
                {
                  title: 'Go Digital',
                  label: (
                    <>
                      Digital EMR &amp;<br />e-Prescriptions
                    </>
                  ),
                  icon: 'description',
                },
                {
                  title: 'Faster Operations',
                  label: (
                    <>
                      Automated IPD &amp;<br />discharge workflows
                    </>
                  ),
                  icon: 'speed',
                },
                {
                  title: 'Control Revenue',
                  label: (
                    <>
                      Integrated billing &amp;<br />claim auditing
                    </>
                  ),
                  icon: 'payments',
                },
                {
                  title: 'ABDM Ready',
                  label: (
                    <>
                      Digital health<br />ecosystem integration
                    </>
                  ),
                  icon: 'verified_user',
                },
              ].map(({ title, label, icon }) => (
                <div key={title} className="bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-[var(--t-border)]/40 shadow-sm flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[var(--t-primary)]/10 text-[var(--t-primary)] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">{icon}</span>
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[var(--t-text)]">{title}</div>
                    <div className="text-[10px] sm:text-xs text-[var(--t-text-muted,#6d7a77)] font-medium leading-snug">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── 1.5. SIMPLE IMPLEMENTATION IN 3 SIMPLE STEPS ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.15 }}
          variants={fadeUp}
          className="space-y-8 sm:space-y-12"
        >
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--t-primary,#00685e)] block">
              SIMPLE IMPLEMENTATION
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Implementation in 3 Simple Steps
            </h3>
            <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
              Experience seamless hospital onboarding, fast clinical integration, and comprehensive staff training.
            </p>
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
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src="/images/home_hero_reception.png"
                  alt="Hospital Cloud Setup & Implementation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                <div
                  className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white text-lg sm:text-xl font-bold flex items-center justify-center shadow-lg ring-4 ring-white/90"
                  style={{ background: 'linear-gradient(135deg, var(--t-primary,#00685e) 0%, var(--t-primary-mid,#008378) 100%)' }}
                >
                  1
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md border border-white/30">
                  <span className="material-symbols-outlined text-sm text-emerald-400">cloud_upload</span>
                  <span>Cloud Setup</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-2.5 relative z-10">
                <h4 className="text-lg sm:text-xl font-extrabold text-[#0F172A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Implement</h4>
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
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src="/images/lab_opd_orders.png"
                  alt="System Integration & LIS Diagnostics Sync"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                <div
                  className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white text-lg sm:text-xl font-bold flex items-center justify-center shadow-lg ring-4 ring-white/90"
                  style={{ background: 'linear-gradient(135deg, var(--t-primary-mid,#008378) 0%, var(--t-accent,#67d9ca) 100%)' }}
                >
                  2
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md border border-white/30">
                  <span className="material-symbols-outlined text-sm text-cyan-400">hub</span>
                  <span>API &amp; LIS Sync</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-2.5 relative z-10">
                <h4 className="text-lg sm:text-xl font-extrabold text-[#0F172A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Integrate</h4>
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
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src="/images/home_doctor_tablet.png"
                  alt="Doctor & Nurse Staff Onboarding"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                <div
                  className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white text-lg sm:text-xl font-bold flex items-center justify-center shadow-lg ring-4 ring-white/90"
                  style={{ background: 'linear-gradient(135deg, var(--t-primary-dark,#003d36) 0%, var(--t-primary,#00685e) 100%)' }}
                >
                  3
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md border border-white/30">
                  <span className="material-symbols-outlined text-sm text-sky-400">groups</span>
                  <span>Staff Onboarding</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-2.5 relative z-10">
                <h4 className="text-lg sm:text-xl font-extrabold text-[#0F172A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Empower</h4>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xs mx-auto font-medium">
                  Onboard your staff in days, not months, with our intuitive, user-friendly clinical interface.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── 2. MULTI-DEVICE ACCESSIBILITY SHOWCASE (LAPTOP, TABLET & MOBILE) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.15 }}
          variants={fadeUp}
          className="space-y-8 sm:space-y-12"
        >
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--t-primary,#00685e)]">
              MULTI-DEVICE RESPONSIVE PLATFORM
            </span>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Work Anywhere — Laptop, Tablet & Mobile
            </h3>
            <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
              OMEDO adapts seamlessly to every screen size. From desktop workstations to bedside tablets and handheld smartphones, your hospital stays connected in real time.
            </p>
          </div>

          {/* 3-Device Composite Visual Showcase Card */}
          <div className="bg-gradient-to-br from-white via-[var(--t-bg-light,#f2fafb)] to-white rounded-3xl p-6 sm:p-10 border border-[var(--t-border)]/60 shadow-xl overflow-hidden relative">
            
            {/* Device Switcher Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8 sm:mb-12">
              {devicePlatforms.map((device) => {
                const isActive = activeDevice === device.id
                return (
                  <button
                    key={device.id}
                    onClick={() => setActiveDevice(device.id)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[var(--t-footer-bg,#061325)] text-white shadow-lg ring-2 ring-[var(--t-primary)] scale-[1.03]'
                        : 'bg-white text-[var(--t-text)] border border-[var(--t-border)]/60 hover:border-[var(--t-primary)]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg" style={{ color: isActive ? 'var(--t-accent-light, #85f5e6)' : 'var(--t-primary)' }}>
                      {device.icon}
                    </span>
                    <span>{device.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase ${isActive ? 'bg-white/20 text-white' : 'bg-[var(--t-surface-high,#afecde)] text-[var(--t-primary)]'}`}>
                      {device.tag}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Graphic Showcase & Detailed Breakdown Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Side: 3-Device Layered Mockup Render */}
              <div className="lg:col-span-6 relative flex items-center justify-center py-6 sm:py-10">
                <div className="relative w-full max-w-[500px] aspect-[4/3] flex items-center justify-center select-none">

                  {/* Ambient Glow behind devices */}
                  <div className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, var(--t-hero-glow, rgba(0,203,183,0.25)) 0%, transparent 70%)' }} />

                  {/* 1. TABLET MOCKUP (Positioned Top-Left / Behind) */}
                  <motion.div
                    animate={{
                      scale: activeDevice === 'tablet' ? 1.08 : 0.95,
                      zIndex: activeDevice === 'tablet' ? 30 : 10,
                      opacity: activeDevice === 'tablet' ? 1 : 0.75,
                    }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setActiveDevice('tablet')}
                    className="absolute left-2 sm:left-4 top-0 w-[52%] h-[82%] bg-slate-900 rounded-[20px] p-2 shadow-2xl border-2 border-slate-700 cursor-pointer group"
                    style={{
                      boxShadow: activeDevice === 'tablet' ? '0 0 30px var(--t-btn-shadow)' : '0 10px 30px rgba(0,0,0,0.2)',
                    }}
                  >
                    {/* Tablet Top Camera */}
                    <div className="w-2 h-2 rounded-full bg-slate-700 mx-auto mb-1" />
                    {/* Tablet Screen */}
                    <div className="w-full h-[calc(100%-12px)] rounded-[14px] overflow-hidden bg-slate-800 relative">
                      <img src="/images/clinical_master_02.png" alt="Tablet HMS View" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-3 flex flex-col justify-end text-white">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--t-accent-light,#85f5e6)] flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">tablet_mac</span> Tablet EMR
                        </span>
                        <span className="text-[11px] font-extrabold line-clamp-1">Bedside Nursing & Rounds</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* 2. LAPTOP MOCKUP (Positioned Main Right) */}
                  <motion.div
                    animate={{
                      scale: activeDevice === 'laptop' ? 1.05 : 0.95,
                      zIndex: activeDevice === 'laptop' ? 30 : 15,
                      opacity: activeDevice === 'laptop' ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setActiveDevice('laptop')}
                    className="absolute right-0 bottom-4 w-[72%] h-[78%] bg-slate-900 rounded-[14px] p-2 shadow-2xl border-2 border-slate-700 cursor-pointer group"
                    style={{
                      boxShadow: activeDevice === 'laptop' ? '0 0 35px var(--t-btn-shadow)' : '0 12px 35px rgba(0,0,0,0.25)',
                    }}
                  >
                    {/* Laptop Screen Header Notch */}
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700 mx-auto mb-1" />
                    {/* Laptop Screen Content */}
                    <div className="w-full h-[calc(100%-14px)] rounded-[8px] overflow-hidden bg-slate-800 relative">
                      <img src="/images/hero_slide_1.png" alt="Laptop HMS View" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent p-3 flex flex-col justify-end text-white">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--t-accent-light,#85f5e6)] flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">laptop_mac</span> Laptop Enterprise
                        </span>
                        <span className="text-[11px] font-extrabold line-clamp-1">Clinical OPD & Billing Command Center</span>
                      </div>
                    </div>
                    {/* Laptop Keyboard Deck Base */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[110%] h-3 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-xl border-t border-slate-600 shadow-md flex items-center justify-center">
                      <div className="w-12 h-0.5 bg-slate-500 rounded-full" />
                    </div>
                  </motion.div>

                  {/* 3. MOBILE SMARTPHONE MOCKUP (Positioned Front Left) */}
                  <motion.div
                    animate={{
                      scale: activeDevice === 'mobile' ? 1.1 : 1,
                      zIndex: activeDevice === 'mobile' ? 40 : 25,
                      opacity: activeDevice === 'mobile' ? 1 : 0.85,
                    }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setActiveDevice('mobile')}
                    className="absolute left-6 sm:left-10 bottom-0 w-[34%] h-[68%] bg-black rounded-[24px] p-1.5 shadow-2xl border-2 border-slate-800 cursor-pointer group ring-1 ring-white/20"
                    style={{
                      boxShadow: activeDevice === 'mobile' ? '0 0 35px var(--t-btn-shadow)' : '0 15px 40px rgba(0,0,0,0.35)',
                    }}
                  >
                    {/* Phone Notch */}
                    <div className="w-10 h-2 bg-black rounded-b-full mx-auto mb-1 relative z-20" />
                    {/* Phone Screen */}
                    <div className="w-full h-[calc(100%-12px)] rounded-[18px] overflow-hidden bg-slate-900 relative">
                      <img src="/images/ipd_nurse_dashboard.png" alt="Mobile HMS View" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-2.5 flex flex-col justify-end text-white">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--t-accent-light,#85f5e6)] flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[10px]">smartphone</span> Mobile App
                        </span>
                        <span className="text-[10px] font-extrabold line-clamp-1">Patient Portal & Alerts</span>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>

              {/* Right Side: Selected Device Description & Features */}
              <div className="lg:col-span-6 space-y-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDevice}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[var(--t-surface-high,#afecde)] text-[var(--t-primary)]">
                      <span className="material-symbols-outlined text-sm">{selectedDevice.icon}</span>
                      {selectedDevice.tag}
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold text-[var(--t-text)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {selectedDevice.name} Platform
                    </h4>

                    <div className="text-xs font-bold text-[var(--t-primary)] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">groups</span>
                      <span>Target Users: {selectedDevice.role}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--t-text-secondary)] leading-relaxed">
                      {selectedDevice.summary}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2.5 pt-2">
                      {selectedDevice.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-[var(--t-border)]/40 shadow-sm text-xs">
                          <span className="w-5 h-5 rounded-full bg-[var(--t-primary)]/15 text-[var(--t-primary)] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span className="text-[var(--t-text)] font-medium leading-normal">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </motion.div>

        {/* ── 3. TRADITIONAL VS HMS COMPARISON CONTAINER ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.15 }}
          variants={fadeUp}
          className="space-y-6 sm:space-y-8"
        >
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--t-primary,#00685e)]">
              TRANSFORMATION IMPACT
            </span>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Traditional Paper Hospital vs. OMEDO
            </h3>
            <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)]">
              Discover how adopting OMEDO elevates hospital performance across every critical benchmark.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[var(--t-border)]/60 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-[var(--t-footer-bg,#061325)] text-white text-xs sm:text-sm uppercase tracking-wider font-bold">
                    <th className="p-4 sm:p-5 w-1/3 text-white">
                      Hospital Function
                    </th>
                    <th className="p-4 sm:p-5 w-1/3 text-rose-300">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base shrink-0">cancel</span>
                        <span>Manual / Legacy Paper System</span>
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 w-1/3 text-[var(--t-accent-light,#85f5e6)]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base shrink-0">check_circle</span>
                        <span>Modern OMEDO</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--t-border)]/30 text-xs sm:text-sm">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[var(--t-bg-light,#f2fafb)]/60'}>
                      <td className="p-4 sm:p-5 font-bold text-[var(--t-text,#121d1f)]">
                        {row.feature}
                      </td>
                      <td className="p-4 sm:p-5 text-rose-700 font-medium bg-rose-50/50">
                        {row.manual}
                      </td>
                      <td className="p-4 sm:p-5 text-[var(--t-primary,#00685e)] font-bold bg-[var(--t-surface-high,#afecde)]/20">
                        {row.hms}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
