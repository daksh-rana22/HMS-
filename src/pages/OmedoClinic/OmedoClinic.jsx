import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'

const fadeUp = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}


// ── 5 CLINIC CORE MODULES ──
const clinicModulesData = [
  {
    id: 'appointment',
    name: 'Appointment & Queue',
    tag: 'SCHEDULING & WAITING ROOM',
    icon: 'calendar_month',
    desc: 'Smart online and walk-in appointment booking with automated WhatsApp / SMS reminders, instant token generation, and real-time waiting room display synchronization.',
    badge: 'Core Module',
    features: [
      'Instant Token Numbering with zero clash algorithm',
      'Doctor Shift Roster & Leave Availability sync',
      'Automated WhatsApp & SMS appointment alerts',
      'Live Waiting Room TV Display screen feed',
      'Walk-In & Online multi-channel queue manager',
      'One-click rescheduling and emergency queue jumping',
    ],
    stats: { primary: '45+ Appointments/Day', secondary: '0 Booking Clashes' },
    previewType: 'appointment',
  },
  {
    id: 'opd',
    name: 'OPD Management',
    tag: 'OUTPATIENT WORKFLOW',
    icon: 'stethoscope',
    desc: 'Rapid OPD patient intake, vital signs logging, demographic profile capture, and live queue dispatch to doctor consulting chambers with minimal click overhead.',
    badge: 'Core Module',
    features: [
      'Ultra-fast 10-second patient intake & registration',
      'Vitals recording (Blood Pressure, Pulse, SpO2, BMI)',
      'Live queue dispatch to active doctor consulting rooms',
      'Longitudinal past visit clinical notes & history lookup',
      'Emergency fast-track priority queue routing',
      'Custom chief complaint dropdowns and presets',
    ],
    stats: { primary: '120+ Daily OPD Visits', secondary: 'Live Token Sync' },
    previewType: 'opd',
  },
  {
    id: 'emr',
    name: 'EMR / Digital Rx',
    tag: 'DIGITAL PRESCRIPTION PAD',
    icon: 'prescriptions',
    desc: 'Generate professional electronic prescriptions in under 15 seconds. Built-in drug search, customizable specialty dosage templates, ICD-10 diagnostic codes, and one-click WhatsApp PDF sharing.',
    badge: 'Doctor Suite',
    features: [
      '15-Second rapid consult prescription generator',
      'Custom dosage templates & specialty favorite presets',
      'ICD-10 diagnostic coding with autocomplete',
      'Drug interaction alerts & known patient allergy warnings',
      'Direct WhatsApp PDF delivery to patient mobile phone',
      'One-click digital signature & branded clinic letterhead',
    ],
    stats: { primary: '15-Sec Fast Rx', secondary: 'Digital Print & WhatsApp' },
    previewType: 'emr',
  },
  {
    id: 'billing',
    name: 'Service/Procedure Billing',
    tag: 'OUTPATIENT CASHIER & POS',
    icon: 'receipt_long',
    desc: 'Fast itemized billing for doctor consultations, diagnostic tests, dressings, and minor clinical procedures. Multi-mode payments (UPI, Cash, Card) with branded receipts and automated WhatsApp delivery.',
    badge: 'Cashier & POS',
    features: [
      'Customizable service & procedure tariff catalog',
      'Combined consultation fee + procedure bundling in single bill',
      'Instant UPI QR code generation on billing screen',
      'Configurable discounts, concession codes & tax calculations',
      'Multi-doctor revenue split tracking per procedure',
      'Print branded receipt or dispatch instantly via WhatsApp',
    ],
    stats: { primary: '1-Click Invoice', secondary: 'Instant UPI Settlement' },
    previewType: 'billing',
  },
  {
    id: 'reports',
    name: 'Reports & Analytics',
    tag: 'CLINIC BUSINESS INTELLIGENCE',
    icon: 'analytics',
    desc: 'Crystal-clear visibility into your clinic’s financial health, cashier collections, footfall trends, doctor revenue splits, and one-click GST tax reports.',
    badge: 'Business Insights',
    features: [
      'Daily cashier reconciliation (Cash, UPI, Card splits)',
      'Multi-doctor revenue sharing & consultation fee ledger',
      'Daily, weekly, and monthly patient footfall graphs',
      'Top diagnosed conditions & common drug prescription stats',
      'Automated end-of-day summary reports on WhatsApp/Email',
      'One-click CSV & PDF export for tax & accountant filing',
    ],
    stats: { primary: 'Real-Time Ledger', secondary: 'Zero Revenue Leakage' },
    previewType: 'reports',
  },
]

// ── SAMPLE SIMULATION DATA ──
const sampleAppointments = [
  { token: 'T-01', patient: 'Mrs. Priya Sharma', time: '09:30 AM', status: 'Completed' },
  { token: 'T-02', patient: 'Rajesh Gupta', time: '10:00 AM', status: 'In Consultation' },
  { token: 'T-03', patient: 'Ananya Roy', time: '10:20 AM', status: 'Waiting in Room' },
  { token: 'T-04', patient: 'Vikram Malhotra', time: '10:45 AM', status: 'Confirmed' },
  { token: 'T-05', patient: 'Suresh Raina', time: '11:15 AM', status: 'Confirmed' },
]

const sampleOpdDoctors = [
  { doctor: 'Dr. Avanish Dubey (Cardiology)', waiting: 4, room: 'Chamber 1' },
  { doctor: 'Dr. Meera Verma (Pediatrics)', waiting: 5, room: 'Chamber 2' },
  { doctor: 'Dr. Rajesh Sharma (Orthopedics)', waiting: 3, room: 'Chamber 3' },
  { doctor: 'Dr. Sunita Rao (Gynecology)', waiting: 6, room: 'Chamber 4' },
]

const samplePrescription = {
  patient: 'Rajesh Kumar (PAT-8120)',
  ageSex: '48 Yrs / Male',
  vitals: 'BP: 130/85 mmHg • Pulse: 74 bpm • Wt: 72 kg',
  diagnosis: 'Type 2 Diabetes Mellitus with Essential Hypertension (ICD-10: E11.9, I10)',
  rx: [
    { drug: 'Tab. Metformin 500mg', dose: '1-0-1', timing: 'After Meals', duration: '30 Days' },
    { drug: 'Tab. Telmisartan 40mg', dose: '1-0-0', timing: 'Morning', duration: '30 Days' },
    { drug: 'Cap. Multivitamin', dose: '0-0-1', timing: 'Night', duration: '15 Days' },
  ],
}

const clinicFaqs = [
  {
    q: 'How fast can our clinic be up and running with OMEDO Clinic?',
    a: 'OMEDO Clinic is 100% cloud-based and requires zero server hardware. Most clinics, solo practices, and polyclinics go live within 24 hours. Our onboarding team helps you upload doctor details, fee masters, and prescription templates with complete staff walkthroughs.',
  },
  {
    q: 'Do we need expensive computers, local servers, or dedicated IT staff?',
    a: 'No. You only need a standard web browser on any existing PC, laptop, or tablet (iPad/Android). All data is secured in high-availability cloud servers with automated daily backups, SSL encryption, and instant updates.',
  },
  {
    q: 'Can patients receive prescriptions directly on WhatsApp?',
    a: 'Yes. With one click from the consultation screen, OMEDO Clinic generates a professionally formatted PDF prescription on your clinic’s branded letterhead and transmits it directly to the patient’s WhatsApp number, saving paper and enhancing patient satisfaction.',
  },
  {
    q: 'How does Service and Procedure Billing work in OMEDO Clinic?',
    a: 'You can define custom price tariffs for doctor consultations, diagnostic tests, dressings, and minor procedures. Cashiers or receptionists can bundle services into a single itemized invoice, apply approved discounts, accept instant UPI QR payments, and transmit branded WhatsApp receipts.',
  },
  {
    q: 'Does OMEDO Clinic support multi-doctor fee sharing and split settlements?',
    a: 'Absolutely. If you run a polyclinic with multiple visiting doctors, OMEDO Clinic tracks collections per doctor, applies custom revenue-sharing percentages, and generates automated daily payout summaries.',
  },
  {
    q: 'What if our clinic grows and wants to add IPD beds, Pharmacy, or Lab in the future?',
    a: 'You can upgrade seamlessly to OMEDO HMS at any time without losing a single patient record, history note, or billing ledger. The platforms share the same enterprise data schema.',
  },
]

export default function OmedoClinic() {
  const [searchParams] = useSearchParams()
  const [activeModuleIdx, setActiveModuleIdx] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  // Handle URL query parameter linking (?module=emr)
  useEffect(() => {
    const moduleParam = searchParams.get('module')
    if (moduleParam) {
      const idx = clinicModulesData.findIndex(
        (m) =>
          m.id.toLowerCase() === moduleParam.toLowerCase() ||
          m.name.toLowerCase().replace(/[^a-z0-9]/g, '') === moduleParam.toLowerCase().replace(/[^a-z0-9]/g, '')
      )
      if (idx !== -1) {
        setActiveModuleIdx(idx)
        const el = document.getElementById('clinic-modules')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [searchParams])

  const activeModule = clinicModulesData[activeModuleIdx]

  return (
    <motion.div {...pageTransition} className="min-h-screen pt-16 sm:pt-20 pb-10" style={{ background: 'var(--t-bg, #effcfe)' }}>
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden py-8 sm:py-12 lg:py-14 border-b border-[var(--t-border,#bcc9c6)]/30">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 10%, var(--t-hero-glow, rgba(0,180,162,0.18)) 0%, transparent 70%)',
          }}
        />

        <div className="site-wrapper relative z-10 space-y-5 sm:space-y-6 max-w-5xl mx-auto text-center">
          {/* Eyebrow Pill */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--t-primary,#00685e)]/30 bg-white/90 backdrop-blur-sm shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--t-primary,#00685e)] animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--t-primary,#00685e)]">
                OMEDO CLINIC EDITION • SMART OPD &amp; PRACTICE MANAGEMENT
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-4">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--t-text,#121d1f)] tracking-tight leading-[1.15]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              All-in-One Cloud Practice Software.{' '}
              <span
                className="bg-clip-text text-transparent block sm:inline"
                style={{ backgroundImage: 'var(--t-gradient-text, linear-gradient(135deg, #00685e 0%, #008378 100%))' }}
              >
                Engineered for Modern Doctors.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--t-text-secondary,#3d4947)] leading-relaxed max-w-3xl mx-auto font-normal">
              Say goodbye to paper files and crowded waiting rooms. OMEDO Clinic empowers independent doctors, polyclinics, and OPD centers with 15-second electronic prescriptions, 1-click service &amp; procedure billing, real-time queues, and daily revenue intelligence.
            </p>
          </motion.div>

          {/* Quick Target Facility Badges */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs font-bold text-[var(--t-primary,#00685e)]">Built specially for:</span>
            {['Solo Practitioners', 'Specialty Polyclinics', 'Outpatient OPD Centers', 'Dental & Eye Clinics', 'Day Care Clinics'].map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-white/80 border border-[var(--t-border,#bcc9c6)]/50 text-xs font-semibold text-[var(--t-text,#121d1f)] shadow-2xs"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all"
              style={{ background: 'var(--t-primary, #00685e)' }}
            >
              <span>Book Free Clinic Demo</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>

            <a
              href="#clinic-modules"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-white text-[var(--t-primary,#00685e)] border border-[var(--t-primary,#00685e)]/40 hover:bg-[#eaf6f8] transition-all shadow-xs"
            >
              <span>Explore 5 Clinic Modules</span>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </a>
          </motion.div>

          {/* Key Stat Cards Strip */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6">
            {[
              { num: '15 Sec', label: 'Rapid E-Prescription', icon: 'prescriptions' },
              { num: '1-Click', label: 'Service & Procedure POS', icon: 'receipt_long' },
              { num: '5 Modules', label: 'Complete OPD Suite', icon: 'domain_verification' },
              { num: '100% Cloud', label: 'Zero Local Server Cost', icon: 'cloud_done' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/85 backdrop-blur-md p-4 rounded-2xl border border-[var(--t-border,#bcc9c6)]/40 shadow-xs flex flex-col items-center justify-center text-center space-y-1"
              >
                <span className="material-symbols-outlined text-xl text-[var(--t-primary,#00685e)]">{stat.icon}</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {stat.num}
                </span>
                <span className="text-[11px] font-semibold text-[var(--t-text-muted,#6d7a77)]">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. KEY CLINIC VALUE PILLARS ── */}
      <section className="py-6 sm:py-8 lg:py-10 site-wrapper space-y-6 sm:space-y-8">
        <div className="text-center max-w-4xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#afecde]/70 text-[#00685e]">
            <span className="material-symbols-outlined text-sm">auto_fix_high</span>
            WHY MODERN CLINICS CHOOSE OMEDO
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Everything Your Clinic Needs to Run at Peak Efficiency
          </h2>
          <p className="text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
            Eliminate operational chaos with purpose-built features crafted with direct input from practicing doctors and polyclinic administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: 'history_edu',
              title: '15-Second Digital Prescriptions',
              desc: 'Select frequently prescribed medicine templates, adjust dosage and duration in two taps, and print or dispatch via WhatsApp instantly.',
            },
            {
              icon: 'receipt_long',
              title: 'Service & Procedure Billing POS',
              desc: 'Bundle doctor consultations, diagnostic tests, dressings, and minor procedures into an itemized invoice with instant UPI QR payments.',
            },
            {
              icon: 'queue_play_next',
              title: 'Smart Queue & Waiting Room Sync',
              desc: 'Live token numbers update across doctor consulting rooms and waiting lounge display screens. Prevent queue skipping and patient anxiety.',
            },
            {
              icon: 'send_to_mobile',
              title: 'WhatsApp PDF Rx Delivery',
              desc: 'Patients receive high-resolution digital prescription PDFs directly on WhatsApp with your clinic branding and consultation instructions.',
            },
            {
              icon: 'payments',
              title: 'Real-Time Cashier Reconciliation',
              desc: 'Track daily cash, UPI, and card payments. Generate instant doctor-wise revenue splits and end-of-day cash reconciliation reports.',
            },
            {
              icon: 'folder_shared',
              title: 'Longitudinal Patient History',
              desc: 'Access past visit records, diagnostic history, previous treatments, and vitals graphs in one click during active consultations.',
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white rounded-2xl p-6 border border-[var(--t-border,#bcc9c6)]/50 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-[#eaf6f8] text-[var(--t-primary,#00685e)] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
              </div>
              <h3 className="text-base font-bold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. INTERACTIVE 5 MODULES DEEP-DIVE & SIMULATOR ── */}
      <section id="clinic-modules" className="py-4 sm:py-6 lg:py-8 bg-white/70 border-y border-[var(--t-border,#bcc9c6)]/30 scroll-mt-20">
        <div className="site-wrapper space-y-3 sm:space-y-4">
          <div className="text-center w-full mx-auto space-y-1 sm:space-y-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--t-primary,#00685e)]">
              5 CORE CLINIC MODULES
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Explore the OMEDO Clinic Suite
            </h2>
            <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed max-w-2xl mx-auto">
              Click any module tab below to inspect its features and experience a live workspace simulation.
            </p>

            {/* 5 Module Selector Tabs */}
            <div className="pt-1.5 flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {clinicModulesData.map((m, idx) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveModuleIdx(idx)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeModuleIdx === idx
                      ? 'bg-[var(--t-primary,#00685e)] text-white shadow-md scale-[1.02]'
                      : 'bg-white hover:bg-[#eaf6f8] text-[var(--t-text,#121d1f)] border border-[var(--t-border,#bcc9c6)]/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{m.icon}</span>
                  <span>{m.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Module Deep-Dive Card */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-7 border border-[var(--t-border,#bcc9c6)]/50 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left Column: Module Details */}
              <div className="lg:col-span-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#afecde] text-[#00685e] flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-2xl">{activeModule.icon}</span>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#afecde]/70 text-[#00685e] text-xs font-bold">
                    {activeModule.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--t-primary,#00685e)]">
                    {activeModule.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-[var(--t-text,#121d1f)] mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {activeModule.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
                  {activeModule.desc}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-[var(--t-border,#bcc9c6)]/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--t-text,#121d1f)]">Key Capabilities:</h4>
                  {activeModule.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs font-medium text-[var(--t-text)]">
                      <span className="material-symbols-outlined text-base text-[var(--t-primary,#00685e)] shrink-0">check_circle</span>
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-sm hover:scale-[1.02] transition-all"
                    style={{ background: 'var(--t-primary, #00685e)' }}
                  >
                    <span>Request Module Demo</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Interactive Simulator Screen */}
              <div className="lg:col-span-7 bg-[#f8fcfd] rounded-2xl border border-[var(--t-border,#bcc9c6)]/60 shadow-inner p-4 sm:p-6 flex flex-col justify-between min-h-[420px] overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#bcc9c6]/30 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[var(--t-primary,#00685e)]">
                    <span className="material-symbols-outlined text-base">{activeModule.icon}</span>
                    <span>OMEDO Clinic Live Workspace — {activeModule.name}</span>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Interactive View
                  </span>
                </div>

                {/* Dynamic Screen Content */}
                <div className="py-4 flex-1">
                  {activeModule.previewType === 'appointment' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#00685e]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          Today’s Clinic Appointment Queue
                        </h4>
                        <span className="text-[10px] text-slate-500 font-medium">Auto-synced with waiting room screen</span>
                      </div>
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#bcc9c6]/30 text-[#00685e] font-bold uppercase text-[10px]">
                            <th className="py-2 px-1">TOKEN</th>
                            <th className="py-2 px-1">PATIENT</th>
                            <th className="py-2 px-1">TIME</th>
                            <th className="py-2 px-1">STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#bcc9c6]/20">
                          {sampleAppointments.map((r) => (
                            <tr key={r.token} className="hover:bg-[#eaf6f8]/60 transition-colors">
                              <td className="py-2.5 px-1 font-bold text-[#00685e]">{r.token}</td>
                              <td className="py-2.5 px-1 font-semibold text-[#121d1f]">{r.patient}</td>
                              <td className="py-2.5 px-1 text-slate-500 font-mono text-[11px]">{r.time}</td>
                              <td className="py-2.5 px-1">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    r.status === 'Completed'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : r.status === 'In Consultation'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-blue-100 text-blue-800'
                                  }`}
                                >
                                  {r.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeModule.previewType === 'opd' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#00685e] flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          <span className="material-symbols-outlined text-lg">door_front</span>
                          <span>Consulting Chambers &amp; Doctor Queues</span>
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {sampleOpdDoctors.map((o) => (
                          <div key={o.doctor} className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between text-xs shadow-2xs">
                            <div className="font-semibold text-[#121d1f] flex items-center gap-2">
                              <span className="w-7 h-7 rounded-lg bg-[#eaf6f8] text-[#00685e] flex items-center justify-center font-bold text-[10px]">
                                {o.room.slice(-1)}
                              </span>
                              <div>
                                <div>{o.doctor}</div>
                                <div className="text-[10px] text-slate-500 font-normal">{o.room}</div>
                              </div>
                            </div>
                            <span className="font-bold text-[#00685e] px-3 py-1 rounded-full bg-[#afecde]/60 text-xs">
                              Waiting: {o.waiting}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeModule.previewType === 'emr' && (
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
                        <div className="flex items-center justify-between border-b pb-2">
                          <div>
                            <div className="text-xs font-bold text-slate-800">{samplePrescription.patient}</div>
                            <div className="text-[10px] text-slate-500">{samplePrescription.vitals}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[11px] font-bold text-[var(--t-primary,#00685e)]">Dr. Avanish Dubey, MD</div>
                            <div className="text-[10px] text-slate-400">Reg: MCI-84920</div>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-lg">
                          <strong>Diagnosis:</strong> {samplePrescription.diagnosis}
                        </div>

                        <div className="space-y-1.5">
                          {samplePrescription.rx.map((drug) => (
                            <div key={drug.drug} className="p-2 rounded-lg bg-[#eaf6f8]/60 flex items-center justify-between text-xs">
                              <div className="font-bold text-slate-800">{drug.drug}</div>
                              <div className="text-slate-600 font-medium text-[11px]">{drug.dose} • {drug.timing} • {drug.duration}</div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t flex items-center justify-between text-xs">
                          <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">mark_chat_read</span>
                            Instant WhatsApp PDF Ready
                          </span>
                          <span className="px-3 py-1 rounded-lg bg-[#00685e] text-white font-bold text-[10px]">
                            Print &amp; WhatsApp Rx
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule.previewType === 'billing' && (
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5 shadow-2xs text-xs">
                        <div className="flex justify-between items-center border-b pb-2">
                          <div>
                            <div className="font-bold text-slate-800">OPD Service &amp; Procedure Receipt</div>
                            <div className="text-[10px] text-slate-500 font-mono">INV-2026-4421 • Rajesh Kumar</div>
                          </div>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Paid via UPI
                          </span>
                        </div>

                        <div className="divide-y divide-slate-100 text-[11px]">
                          <div className="py-1.5 flex justify-between">
                            <span className="text-slate-700">Dr. Consultation Fee (Cardiology)</span>
                            <span className="font-bold text-slate-900">₹800</span>
                          </div>
                          <div className="py-1.5 flex justify-between">
                            <span className="text-slate-700">ECG 12-Lead Diagnostic Trace</span>
                            <span className="font-bold text-slate-900">₹500</span>
                          </div>
                          <div className="py-1.5 flex justify-between">
                            <span className="text-slate-700">Minor Dressing &amp; Sterilization Bandage</span>
                            <span className="font-bold text-slate-900">₹350</span>
                          </div>
                          <div className="py-2 flex justify-between font-bold text-[#00685e] text-xs border-t pt-2">
                            <span>Total Settled Amount</span>
                            <span>₹1,650</span>
                          </div>
                        </div>

                        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                            <span className="material-symbols-outlined text-sm">send_to_mobile</span>
                            Digital Receipt dispatched via WhatsApp
                          </span>
                          <span className="font-semibold text-slate-700">POS Counter 01</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule.previewType === 'reports' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2.5 text-center">
                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
                          <div className="text-[10px] text-slate-500 font-semibold uppercase">Today’s Fee Collections</div>
                          <div className="text-xl font-extrabold text-[var(--t-primary,#00685e)]">₹42,800</div>
                          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">↑ 14% vs yesterday</div>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
                          <div className="text-[10px] text-slate-500 font-semibold uppercase">Daily Patient Footfall</div>
                          <div className="text-xl font-extrabold text-[#008378]">38 OPD Visits</div>
                          <div className="text-[10px] text-slate-500 font-medium mt-0.5">32 Follow-ups • 6 New</div>
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-slate-100 space-y-2 text-xs">
                        <div className="flex justify-between font-semibold text-slate-700">
                          <span>UPI &amp; Digital Collections</span>
                          <span className="font-bold text-emerald-600">₹29,400 (68%)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[68%]" />
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                          <span>Cash: ₹13,400 (32%)</span>
                          <span>Reconciled at Day End</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#bcc9c6]/30 flex items-center justify-between text-[11px] text-[var(--t-text-muted)] font-medium">
                  <span>Cloud Architecture • Zero Server Maintenance</span>
                  <span className="text-[var(--t-primary,#00685e)] font-bold">OMEDO Clinic Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. A DAY IN A DIGITAL CLINIC (STEP-BY-STEP WORKFLOW) ── */}
      <section className="py-6 sm:py-8 lg:py-10 site-wrapper space-y-6 sm:space-y-8">
        <div className="text-center max-w-4xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#afecde]/70 text-[#00685e]">
            <span className="material-symbols-outlined text-sm">schedule</span>
            SEAMLESS WORKFLOW
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            A Day in an OMEDO-Powered Clinic
          </h2>
          <p className="text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
            See how OMEDO Clinic eliminates friction from morning patient registration to evening revenue reconciliation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'Booking & Token',
              desc: 'Patient books online or arrives at desk. System issues instant token and dispatches automated WhatsApp reminder.',
              icon: 'confirmation_number',
            },
            {
              step: '02',
              title: 'Intake & Vitals',
              desc: 'Reception records demographic intake and nurse charts BP, pulse, and temperature for the consulting chamber.',
              icon: 'monitor_heart',
            },
            {
              step: '03',
              title: '15-Sec Consult Rx',
              desc: 'Doctor examines patient, selects drug dosage template, and finalizes electronic prescription with 2 clicks.',
              icon: 'prescriptions',
            },
            {
              step: '04',
              title: 'Procedure Billing',
              desc: 'Cashier bundles consultation and minor clinical procedure tariffs into an itemized bill with instant UPI QR collection.',
              icon: 'receipt_long',
            },
            {
              step: '05',
              title: 'WhatsApp Rx & Reports',
              desc: 'Prescription PDF and digital payment receipt sent to patient’s WhatsApp with automatic day-end revenue settlement.',
              icon: 'analytics',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl p-5 border border-[var(--t-border,#bcc9c6)]/50 shadow-xs relative flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[var(--t-primary,#00685e)] bg-[#eaf6f8] px-2.5 py-1 rounded-lg">
                  STEP {item.step}
                </span>
                <span className="material-symbols-outlined text-xl text-[var(--t-primary,#00685e)]">{item.icon}</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--t-text,#121d1f)] mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {item.title}
                </h4>
                <p className="text-xs text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. NEED ENTERPRISE HOSPITAL CAPABILITIES? CROSS-LINK BANNER ── */}
      <section className="py-8 site-wrapper">
        <div className="bg-gradient-to-r from-[#00685e] to-[#004d46] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-[#85f5e6]">
              <span className="material-symbols-outlined text-sm">domain</span>
              LOOKING FOR HOSPITAL / IPD SUITE?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Operating an Inpatient Facility or 24/7 Hospital?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              If your facility includes Inpatient Beds (IPD), Emergency ER, Pharmacy POS, Laboratory LIS, or Cashless TPA Insurance, explore our flagship enterprise system.
            </p>
          </div>
          <Link
            to="/omedo-hms"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-white text-[#00685e] shadow-md hover:bg-slate-100 hover:scale-[1.02] transition-all"
          >
            <span>Explore OMEDO HMS (13 Modules)</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* ── 6. FREQUENTLY ASKED QUESTIONS (CLINIC SPECIFIC) ── */}
      <section className="pt-6 sm:pt-8 pb-3 sm:pb-4 site-wrapper space-y-4 sm:space-y-5">
        <div className="text-center w-full max-w-4xl mx-auto space-y-1.5">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--t-primary,#00685e)]">
            GOT QUESTIONS?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Frequently Asked Questions for Clinics
          </h2>
          <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)]">
            Everything you need to know about getting your clinic started with OMEDO.
          </p>
        </div>

        <div className="w-full max-w-5xl xl:max-w-6xl mx-auto space-y-2">
          {clinicFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-[var(--t-border,#bcc9c6)]/50 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[var(--t-text,#121d1f)] cursor-pointer"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span>{faq.q}</span>
                  <span className={`material-symbols-outlined text-lg text-[var(--t-primary,#00685e)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-[var(--t-text-secondary,#3d4947)] leading-relaxed border-t border-slate-100 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 7. FINAL HIGH-IMPACT CTA ── */}
      <section className="pt-2 sm:pt-3 pb-8 sm:pb-12 site-wrapper">
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[var(--t-border,#bcc9c6)]/60 shadow-xl text-center space-y-4 w-full max-w-5xl xl:max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#afecde]/70 text-[#00685e]">
            <span className="material-symbols-outlined text-sm">verified</span>
            GET STARTED IN UNDER 24 HOURS
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ready to Take Your Clinic 100% Digital?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] max-w-2xl mx-auto leading-relaxed">
            Join hundreds of doctors and polyclinics saving 2+ hours every day on OPD queues and documentation. Book a personalized live walkthrough today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-md hover:scale-[1.02] transition-all"
              style={{ background: 'var(--t-primary, #00685e)' }}
            >
              <span>Book Clinic Demo</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
            <a
              href="tel:+917457912924"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-slate-50 hover:bg-slate-100 text-[var(--t-primary,#00685e)] border border-slate-200 transition-all"
            >
              <span className="material-symbols-outlined text-base">call</span>
              <span>Call Sales: +91 74579 12924</span>
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
