import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 44, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
}

const abhaPillars = [
  {
    id: 'number',
    title: '14-Digit ABHA Number',
    subtitle: 'Universal National Health Identity',
    icon: 'badge',
    badge: 'CITIZEN HEALTH ID',
    color: 'var(--t-primary, #00685e)',
    desc: 'A unique 14-digit national health identification number (e.g., 91-4829-1048-5729) generated using Aadhaar or Mobile verification that uniquely identifies a citizen across all healthcare facilities in India.',
    highlights: [
      'Lifetime unique identification for every Indian citizen',
      'Instant creation via Aadhaar OTP or Mobile OTP in under 60 seconds',
      'Dual-bound with hospital UHID to keep billing & clinical records synced',
      'Valid across all AIIMS, government hospitals, and private networks'
    ]
  },
  {
    id: 'address',
    title: 'ABHA Address (@abdm)',
    subtitle: 'Virtual Health Handle for PHR Apps',
    icon: 'alternate_email',
    badge: 'VIRTUAL HEALTH HANDLE',
    color: 'var(--t-primary-mid, #008378)',
    desc: 'An easy-to-remember virtual health address (e.g. rahul.sharma@abdm) used in Personal Health Record (PHR) apps like Aarogya Setu and ABHA App to receive, view, and approve electronic health records.',
    highlights: [
      'Personalized handle (e.g., name@abdm) replacing complex numbers',
      'Used for consent requests and receiving digital prescriptions & lab reports',
      'Link multiple hospital UHIDs under one central ABHA handle',
      'Complete patient control over who can send or view medical records'
    ]
  },
  {
    id: 'scanshare',
    title: 'Scan & Share Express OPD',
    subtitle: '10-Second OPD Counter Registration',
    icon: 'qr_code_scanner',
    badge: 'ZERO OPD QUEUES',
    color: 'var(--t-primary)',
    desc: 'Patients scan the NHA QR code displayed at hospital registration desks using their ABHA app. Demographic details are instantly pushed into Omedo HMS, completing OPD check-in in 10 seconds.',
    highlights: [
      'Eliminates manual registration form filling and spelling errors',
      'Reduces OPD queue waiting times by up to 70%',
      'Auto-populates Name, Age, Gender, Address, and ABHA ID into EMR',
      'Generates instant token numbers for consultation waiting screens'
    ]
  },
  {
    id: 'consent',
    title: 'Consent-First Health Vault',
    subtitle: 'Patient-Owned Data Vault & Privacy',
    icon: 'verified_user',
    badge: '100% PRIVACY CONTROL',
    color: 'var(--t-primary-mid)',
    desc: 'Medical data is never shared without explicit patient authorization. Doctors send digital consent requests, and patients approve or reject requests directly from their smartphone PHR app.',
    highlights: [
      'Strict time-bound consent (e.g., 24-hour access during emergency visits)',
      'Granular data type selection (e.g., share lab reports only, not past Rx)',
      'Compliant with India’s Digital Personal Data Protection (DPDP) Act',
      'AES-256 bit encrypted peer-to-peer data transfer with zero central server storage'
    ]
  }
]

const abhaCreationSteps = [
  {
    step: '01',
    title: 'Demographic Verification',
    subtitle: 'Aadhaar / Driving License',
    desc: 'Patient enters 12-digit Aadhaar Number or Driving License at the hospital OPD desk or online self-service kiosk.',
    icon: 'fingerprint',
  },
  {
    step: '02',
    title: 'Aadhaar OTP Authentication',
    desc: 'Receive 6-digit Security OTP on Aadhaar-linked mobile phone and confirm patient identity instantly.',
    icon: 'phonelink_ring',
  },
  {
    step: '03',
    title: 'ABHA Card & QR Generation',
    desc: 'Instant generation of 14-digit ABHA Number, @abdm handle, and scannable digital health card with auto-UHID sync.',
    icon: 'id_card',
  },
]

export default function ABHAExplanationContainer() {
  const [activeTab, setActiveTab] = useState('number')
  const activePillar = abhaPillars.find((p) => p.id === activeTab)

  return (
    <section className="py-10 sm:py-14 lg:py-16 relative overflow-hidden" style={{ background: 'var(--t-bg, #effcfe)' }}>
      {/* Background Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 30%, var(--t-hero-glow, rgba(0,180,162,0.12)) 0%, transparent 70%)',
        }}
      />

      <div className="site-wrapper relative z-10 space-y-10 sm:space-y-14">

        {/* ── 1. CONTAINER HERO & DEFINITION BANNER ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.15 }}
          variants={fadeUp}
          className="relative rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden border shadow-xl bg-white"
          style={{ borderColor: 'var(--t-border, #bcc9c6)' }}
        >
          {/* Top Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[var(--t-primary,#00685e)] via-[var(--t-primary-mid,#008378)] to-[var(--t-accent,#67d9ca)]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: What is ABHA? Explanation */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--t-primary)]/30 bg-[var(--t-surface-high,#afecde)] text-[var(--t-primary)] shadow-sm text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[var(--t-primary)] animate-ping" />
                AYUSHMAN BHARAT HEALTH ACCOUNT (ABHA)
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)] leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Understanding <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--t-gradient-text, linear-gradient(135deg, #00685e 0%, #2d685e 100%))' }}>ABHA</span> — India’s Digital Health Identity
              </h2>

              <p className="text-xs sm:text-base text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
                <strong>ABHA (Ayushman Bharat Health Account)</strong> is a 14-digit universal health identification number issued by the <strong>National Health Authority (NHA)</strong> under the Ayushman Bharat Digital Mission (ABDM). It serves as a single digital key for Indian citizens to store, manage, and share lifetime electronic health records (EMR, prescriptions, lab reports, discharge summaries) across hospitals, diagnostic centers, and clinics nationwide.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[var(--t-bg-light,#f2fafb)] p-3.5 rounded-2xl border border-[var(--t-border)]/30 text-left">
                  <div className="text-xl font-black text-[var(--t-primary)]">14 Digits</div>
                  <div className="text-[11px] text-[var(--t-text-muted)] font-semibold">Unique Health ID</div>
                </div>
                <div className="bg-[var(--t-bg-light,#f2fafb)] p-3.5 rounded-2xl border border-[var(--t-border)]/30 text-left">
                  <div className="text-xl font-black text-[var(--t-primary)]">10 Sec</div>
                  <div className="text-[11px] text-[var(--t-text-muted)] font-semibold">Scan &amp; Share OPD</div>
                </div>
                <div className="col-span-2 sm:col-span-1 bg-[var(--t-bg-light,#f2fafb)] p-3.5 rounded-2xl border border-[var(--t-border)]/30 text-left">
                  <div className="text-xl font-black text-[var(--t-primary)]">100% Secure</div>
                  <div className="text-[11px] text-[var(--t-text-muted)] font-semibold">Aadhaar Verified</div>
                </div>
              </div>
            </div>

            {/* Right Column: Official ABHA Emblem Logo */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-3">
              <div className="relative w-full max-w-[260px] sm:max-w-[290px] aspect-square flex items-center justify-center p-6 bg-gradient-to-br from-white via-[var(--t-bg-light,#f2fafb)] to-white rounded-3xl border border-[var(--t-border)]/60 shadow-xl group hover:scale-[1.03] transition-all duration-300">
                {/* Ambient glow behind logo */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{ background: 'radial-gradient(circle, var(--t-hero-glow, rgba(0,180,162,0.20)) 0%, transparent 70%)' }} />

                <img
                  src="/images/abha_logo.png"
                  alt="Official ABHA (Ayushman Bharat Health Account) Emblem Logo"
                  className="w-full h-full object-contain filter drop-shadow-md select-none group-hover:drop-shadow-xl transition-all duration-300 relative z-10"
                />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-white border border-[var(--t-border)]/40 shadow-sm text-[var(--t-primary)]">
                <span className="material-symbols-outlined text-base">verified</span>
                NHA Certified Digital Health Emblem
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── 2. INTERACTIVE ABHA PILLARS & FEATURES ── */}
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--t-primary,#00685e)]">
              CORE ABHA FUNCTIONALITY
            </span>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Key Components of ABHA System
            </h3>
            <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)]">
              Click through the pillars below to explore how ABHA simplifies health identity, OPD registration, and patient privacy.
            </p>
          </div>

          {/* Pillar Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {abhaPillars.map((p) => {
              const isActive = activeTab === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[var(--t-primary,#00685e)] text-white shadow-lg shadow-[var(--t-primary)]/20 scale-[1.03]'
                      : 'bg-white text-[var(--t-text,#121d1f)] border border-[var(--t-border,#bcc9c6)]/60 hover:border-[var(--t-primary)] hover:bg-[var(--t-bg-light)]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-base sm:text-lg ${isActive ? 'text-white' : 'text-[var(--t-primary)]'}`}>
                    {p.icon}
                  </span>
                  <span>{p.title}</span>
                </button>
              )
            })}
          </div>

          {/* Active Pillar Card Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-[var(--t-border)]/60 shadow-lg relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Side Summary */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--t-surface-high,#afecde)] text-[var(--t-primary)]">
                    <span className="material-symbols-outlined text-sm">{activePillar.icon}</span>
                    {activePillar.badge}
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-[var(--t-text)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {activePillar.title}
                  </h4>
                  <div className="text-xs font-bold text-[var(--t-primary)]">{activePillar.subtitle}</div>

                  <p className="text-xs sm:text-sm text-[var(--t-text-secondary)] leading-relaxed">
                    {activePillar.desc}
                  </p>
                </div>

                {/* Right Side Key Highlights */}
                <div className="lg:col-span-7 space-y-3">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-[var(--t-text-muted)] mb-2">
                    Key Features &amp; Hospital Advantages
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePillar.highlights.map((h, idx) => (
                      <div key={idx} className="bg-[var(--t-bg-light,#f2fafb)] p-4 rounded-2xl border border-[var(--t-border)]/30 flex items-start gap-2.5 text-xs">
                        <span className="w-5 h-5 rounded-full bg-[var(--t-primary)]/15 text-[var(--t-primary)] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-[var(--t-text)] font-medium leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── 3. ABHA CREATION STEPS (CONNECTED TIMELINE WORKFLOW) ── */}
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--t-primary,#00685e)]">
              FAST OPD ONBOARDING
            </span>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              How ABHA ID is Created in 3 Steps
            </h3>
            <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)]">
              Omedo HMS enables OPD receptionists to generate patient ABHA cards directly during registration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {abhaCreationSteps.map((s, idx) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 36, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.15 }}
                transition={{ duration: 1.1, delay: idx * 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[var(--t-border)]/50 shadow-md hover:shadow-xl transition-all space-y-4 text-center relative group"
              >
                {/* Step Badge */}
                <div className="w-14 h-14 rounded-full bg-[var(--t-primary)] text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                  {s.step}
                </div>

                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-bold text-[var(--t-text)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {s.title}
                  </h4>
                </div>

                <p className="text-xs text-[var(--t-text-secondary)] leading-relaxed">
                  {s.desc}
                </p>

                <div className="pt-2 border-t border-[var(--t-border)]/30 flex items-center justify-center gap-1 text-[11px] font-bold text-[var(--t-primary)]">
                  <span>NHA Verified</span>
                  <span className="material-symbols-outlined text-xs">verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
