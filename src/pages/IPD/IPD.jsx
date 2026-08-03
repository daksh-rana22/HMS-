import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

// ── IPD ACCOUNTING SUB-FEATURES DATA ──
const ipdAccountingSubFeatures = [
  {
    id: 'ipd-dash',
    name: 'IPD Dashboard',
    icon: 'grid_view',
    img: '/images/ipd_acct_dashboard.png',
    tag: 'INPATIENT OVERVIEW',
    subtitle: 'Real-time admitted patient financial status, pending payments, active treatments & collection metrics',
    items: [
      'Comprehensive IPD admissions overview tracking total admitted patients and active charge lines',
      'Pending payments and balance due alerts requiring follow-up action',
      'Daily advances collection summary and real-time admitted patient directory',
    ],
  },
  {
    id: 'advance-pay',
    name: 'Advance Payment',
    icon: 'payments',
    img: '/images/ipd_acct_advance_payment.png',
    tag: 'DEPOSIT MANAGEMENT',
    subtitle: 'Collect & record patient advance deposits with mode breakdown and receipt history',
    items: [
      'Quick advance collection entry with multi-payment mode support (Cash, Card, Online, Split)',
      'Previous deposit history ledger with receipt numbers and dates',
      'Visual deposit coverage threshold tracking against running IPD bill',
    ],
  },
  {
    id: 'prov-billing',
    name: 'Provisional Billing',
    icon: 'receipt_long',
    img: '/images/ipd_acct_provisional_billing.png',
    tag: 'RUNNING CHARGES',
    subtitle: 'Live itemized charge breakdown including room rent, consultations, lab & pharmacy',
    items: [
      'Detailed itemized running charges with service rates, quantities, and subtotal calculations',
      'Balance calculation comparing accrued charges against total advance payments',
      'Billing threshold notification for advance top-ups prior to discharge',
    ],
  },
  {
    id: 'pkg-billing',
    name: 'Package Billing',
    icon: 'inventory_2',
    img: '/images/ipd_acct_package_billing.png',
    tag: 'TPA & SCHEMES',
    subtitle: 'Ayushman Bharat & insurance package capping, covered vs non-covered items & claim summary',
    items: [
      'Government scheme and insurance package mapping with percentage coverage',
      'Clear segregation of covered package services versus non-covered patient share',
      'Total claimable amount calculations and net balance after deposit summary',
    ],
  },
  {
    id: 'prov-estimate',
    name: 'Provisional Estimate',
    icon: 'assignment',
    img: '/images/ipd_acct_provisional_estimate.png',
    tag: 'COST ESTIMATION',
    subtitle: 'Service breakdown, category filtering, estimated charges & refund/due breakdown',
    items: [
      'Comprehensive service cost breakdown categorized by Admin, Bed, Consult, Lab, and Drugs',
      'Financial summary highlighting total estimated charges versus advance paid',
      'Quick action shortcuts for adding advance payments, modifying room category, and viewing lab orders',
    ],
  },
  {
    id: 'final-bill',
    name: 'Final Bill',
    icon: 'assignment_turned_in',
    img: '/images/ipd_acct_final_bill.png',
    tag: 'TAX INVOICE & DISCHARGE',
    subtitle: 'Final tax invoice generation, advances ledger reconciliation, waivers & zero balance settlement',
    items: [
      'Official hospital tax invoice generation with bill number, date, GSTIN, and patient stay details',
      'Complete itemized summary of ICU room rent, nursing/clinical services, consultations & pharmacy',
      'Advances received ledger reconciliation with discount/waiver calculation and final zero balance settlement',
    ],
  },
]

// ── IPD MODULE TOPICS DATA ──
const ipdTopics = [
  {
    id: '01',
    title: 'Nurse Dashboard',
    subtitle: 'Real-time ward overview — live occupancy metrics, bed matrix tracking, emergency bay monitoring & admitted patient management',
    img: '/images/ipd_nurse_dashboard.png',
    tags: [
      { text: 'NURSE STATION', color: 'bg-teal-100 text-teal-700 border-teal-200' },
      { text: 'BED MATRIX', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
    ],
    items: [
      'Live bed summary metrics tracking total capacity, occupied beds, emergency cases, and daily discharges',
      'Multi-ward filter tabs for Emergency, General Ward, ICU, High Dependency Units, OT, and Deluxe Rooms',
      'Comprehensive admitted patient directory with UHID, admission number, bed allocation, and consultant details',
      'Real-time patient clinical status monitoring, quick patient action controls, and search filtering',
    ],
  },
  {
    id: '02',
    title: 'IPD Accounting',
    subtitle: 'Complete inpatient financial suite — dashboard metrics, advance deposits, provisional billing, package schemes, estimates & final tax invoices',
    img: '/images/ipd_acct_dashboard.png',
    tags: [
      { text: 'INPATIENT FINANCE', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      { text: 'BILLING & CLAIMS', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    ],
    items: [
      'IPD Dashboard tracking total admissions, pending dues, active charges, and daily collection totals',
      'Advance deposit collection with receipt printing, payment mode splits, and deposit threshold alerts',
      'Provisional billing and package billing with scheme coverage (PMJAY/TPA) for covered vs non-covered items',
      'Final Tax Invoice printing with itemized breakdown, advances ledger reconciliation, and zero balance settlement',
    ],
  },
]

export default function IPD() {
  const [activeTopicId, setActiveTopicId] = useState('01')
  const [activeSubFeatureId, setActiveSubFeatureId] = useState('ipd-dash')
  const [fullScreenImg, setFullScreenImg] = useState(null)

  const handleTopicSelect = (id) => {
    setActiveTopicId(prevId => prevId === id ? null : id)
  }

  const currentSubFeature = ipdAccountingSubFeatures.find(f => f.id === activeSubFeatureId) || ipdAccountingSubFeatures[0]

  const renderSoftwareUIPreview = () => {
    const currentTopic = ipdTopics.find(t => t.id === activeTopicId) || ipdTopics[0]
    let displayImg = currentTopic?.img
    let displayTitle = currentTopic?.title

    if (currentTopic.id === '02') {
      displayImg = currentSubFeature.img
      displayTitle = `IPD Accounting — ${currentSubFeature.name}`
    }

    return (
      <div className="bg-white rounded-2xl shadow-xl border border-[#bcc9c6]/50 overflow-hidden text-[#121d1f] w-full transition-all p-2 sm:p-3">
        <div
          onClick={() => setFullScreenImg({ src: displayImg, title: displayTitle })}
          className="relative rounded-xl overflow-hidden shadow-sm border border-[#bcc9c6]/30 bg-white group cursor-pointer"
        >
          <img
            src={displayImg}
            alt={displayTitle}
            className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02] max-h-[420px]"
          />

          {/* Hover Fullscreen Overlay Hint */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-bold text-xs sm:text-sm">
            <span className="material-symbols-outlined text-xl">zoom_in</span>
            <span>Click for Fullscreen</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div {...pageTransition} className="min-h-screen bg-[#f8fdfe] pt-20 sm:pt-24 pb-16">

      {/* ── HEADER HERO SECTION ── */}
      <section className="bg-gradient-to-b from-[#effcfe] via-[#f5fdfe] to-[#f8fdfe] py-8 sm:py-12 border-b border-[#bcc9c6]/30">
        <div className="site-wrapper text-center max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-4">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#afecde]/80 text-[#00685e] text-xs sm:text-sm font-bold shadow-xs">
              <span className="material-symbols-outlined text-base">bed</span>
              HMS Core Sub-Module • Inpatient Care
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121d1f] tracking-tight leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              IPD <span className="text-[#00685e]">Inpatient Department</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xs sm:text-sm md:text-base text-[#3d4947] leading-relaxed max-w-2xl mx-auto">
              End-to-end inpatient care — real-time bed matrix, nurse dashboards, ward management, provisional billing, advance payments, TPA claims, and discharge summaries in one unified platform.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-[#00685e] text-white px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:bg-[#005049] transition-all">
                Request IPD Demo <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link to="/modules" className="inline-flex items-center gap-2 border border-[#bcc9c6] text-[#00685e] px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-white transition-all">
                All Modules
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ALTERNATING TIMELINE ROADMAP SECTION ── */}
      <section className="site-wrapper pt-10 sm:pt-16 px-4 sm:px-8 relative max-w-7xl mx-auto">

        {/* Central Vertical Timeline Dashed Line */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-12 bottom-28 w-0.5 border-l-2 border-dashed border-[#00685e]/35 pointer-events-none z-0" />

        <div className="space-y-16 sm:space-y-20 relative z-10">
          {ipdTopics.map((topic, index) => {
            const isEven = (index + 1) % 2 === 0
            const isActive = activeTopicId === topic.id

            return (
              <div key={topic.id} className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

                {/* Central Timeline Node Circle (Desktop) */}
                <div
                  onClick={() => handleTopicSelect(topic.id)}
                  className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 top-7 w-6 h-6 rounded-full bg-white border-2 transition-all cursor-pointer items-center justify-center shadow-md z-20 ${
                    isActive ? 'border-[#00685e] scale-110 shadow-lg ring-2 ring-[#00685e]/20' : 'border-[#bcc9c6] hover:border-[#00685e]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full transition-all ${
                    isActive ? 'bg-[#00685e] animate-pulse' : 'bg-[#85f5e6]'
                  }`} />
                </div>

                {/* Topic Card (Alternates Left/Right) */}
                <div className={`${isEven ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8'}`}>
                  <motion.div
                    className={`relative rounded-3xl transition-all duration-300 border ${
                      isActive
                        ? 'bg-white border-[#00685e] shadow-2xl ring-4 ring-[#00685e]/15'
                        : 'bg-white/95 border-[#bcc9c6]/50 shadow-md hover:border-[#00685e]/50 hover:shadow-xl'
                    }`}
                  >
                    {/* Header */}
                    <div
                      onClick={() => handleTopicSelect(topic.id)}
                      className="p-5 sm:p-7 cursor-pointer flex items-center justify-between gap-4 select-none"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Number Badge */}
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm sm:text-base font-mono font-extrabold shrink-0 transition-all ${
                          isActive
                            ? 'bg-[#00685e] text-white shadow-lg'
                            : 'bg-[#effcfe] text-[#00685e] border border-[#00685e]/30'
                        }`}>
                          {topic.id}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center flex-wrap gap-2">
                            <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#121d1f] tracking-tight">
                              {topic.title}
                            </h3>
                            {topic.tags.map((t, idx) => (
                              <span key={idx} className={`text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-md border ${t.color}`}>
                                {t.text}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm text-[#6d7a77] leading-relaxed mt-1">
                            {topic.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Expand / Collapse */}
                      <button
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isActive ? 'bg-[#00685e] text-white shadow-md' : 'bg-[#eaf6f8] text-[#00685e] hover:bg-[#afecde]/40'
                        }`}
                        aria-label="Toggle details"
                      >
                        <span className="material-symbols-outlined text-lg font-bold select-none">
                          {isActive ? 'remove' : 'add'}
                        </span>
                      </button>
                    </div>

                    {/* Accordion Details */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-6 pb-6 pt-2 border-t border-[#bcc9c6]/20 bg-[#effcfe]/30 rounded-b-3xl space-y-3"
                        >
                          {topic.id === '02' ? (
                            <div className="space-y-3 pt-1">
                              <div className="text-xs font-bold text-[#00685e] flex items-center justify-between border-b border-[#bcc9c6]/30 pb-2">
                                <span>Select IPD Accounting Sub-Feature (6 Options):</span>
                                <span className="text-[10px] bg-[#afecde] text-[#00685e] px-2 py-0.5 rounded-full font-extrabold">
                                  {currentSubFeature.name}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                                {ipdAccountingSubFeatures.map((feat) => {
                                  const isSel = activeSubFeatureId === feat.id
                                  return (
                                    <button
                                      key={feat.id}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveSubFeatureId(feat.id)
                                      }}
                                      className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all text-xs ${
                                        isSel
                                          ? 'bg-[#00685e] text-white font-bold shadow-md scale-[1.02]'
                                          : 'bg-white border border-[#bcc9c6]/50 text-[#121d1f] hover:bg-[#eaf6f8] hover:border-[#00685e]/40 font-semibold'
                                      }`}
                                    >
                                      <span className={`material-symbols-outlined text-base p-1 rounded-lg ${
                                        isSel ? 'bg-white/20 text-white' : 'bg-[#effcfe] text-[#00685e]'
                                      }`}>
                                        {feat.icon}
                                      </span>
                                      <span className="truncate">{feat.name}</span>
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          ) : null}

                          <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#3d4947]">
                            {(topic.id === '02' ? currentSubFeature.items : topic.items).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="material-symbols-outlined text-base sm:text-lg text-[#00685e] shrink-0 mt-0.5">check_circle</span>
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Opposite Side — Screenshot Preview */}
                <div className={`${isEven ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'}`}>
                  {isActive ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      {renderSoftwareUIPreview()}
                    </motion.div>
                  ) : (
                    <div
                      onClick={() => handleTopicSelect(topic.id)}
                      className="hidden lg:block opacity-50 hover:opacity-100 transition-all cursor-pointer"
                    >
                      <div className="p-6 rounded-3xl border-2 border-dashed border-[#bcc9c6]/70 bg-white/70 text-center hover:bg-white hover:border-[#00685e]/50 shadow-sm hover:shadow-md">
                        <span className="text-xs sm:text-sm font-mono font-bold text-[#00685e] flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-base">visibility</span>
                          Click to view image
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )
          })}
        </div>

        {/* Bottom Badge */}
        <div className="flex justify-center pt-16 pb-4">
          <div className="bg-[#afecde]/90 backdrop-blur-md text-[#00685e] border border-[#00685e]/40 px-7 py-3 rounded-full text-xs sm:text-sm font-mono font-bold flex items-center gap-2.5 shadow-xl">
            <span className="w-3 h-3 rounded-full bg-[#00685e] animate-pulse" />
            <span>REAL-TIME BED MATRIX &amp; NURSE WORKFLOW SYSTEM</span>
          </div>
        </div>
      </section>

      {/* ── KEY METRICS BANNER ── */}
      <section className="site-wrapper pt-12 sm:pt-16">
        <div className="bg-gradient-to-r from-[#00685e] to-[#004d46] rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">311</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Total Beds Managed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">161</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Active Admissions Today</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">10+</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Ward Categories Supported</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">0 Zero</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Billing Discrepancy on Discharge</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FULLSCREEN IMAGE LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {fullScreenImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullScreenImg(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-1.5 sm:p-3 cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[98vw] max-h-[98vh] w-full h-full bg-[#0d1618] rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col cursor-default text-white"
            >
              {/* Header Bar */}
              <div className="px-4 py-2.5 bg-[#070c0d] border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#85f5e6] text-xl">fullscreen</span>
                  <h3 className="text-xs sm:text-sm font-bold font-mono text-white">{fullScreenImg.title} — Full Resolution View</h3>
                </div>
                <button
                  onClick={() => setFullScreenImg(null)}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-all shadow-md"
                  aria-label="Close fullscreen"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Image Container */}
              <div className="p-1 sm:p-2 overflow-auto flex-1 flex items-center justify-center bg-[#070c0d]">
                <img
                  src={fullScreenImg.src}
                  alt={fullScreenImg.title}
                  className="w-full h-auto min-w-[92vw] sm:min-w-[96vw] max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
