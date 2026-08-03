import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

// Framer Motion Animation Variants
const pageTransition = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
}

// ── 12 REPORTS & ANALYTICS SUB-MODULES (Matching User's Menu) ──
export const reportsTopics = [
  {
    id: '01',
    title: 'Doctor Consultation Performance',
    subtitle: 'Doctor performance analytics — consultation volumes, revenue generated, department throughput & active doctor metrics',
    img: '/images/reports_master_01.png',
    tags: [
      { text: 'DOCTOR ANALYTICS', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
      { text: 'OPD THROUGHPUT', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    ],
    items: [
      'Real-time KPI metrics tracking total completed consultations, overall revenue, and active consultant counts',
      'Doctor-wise performance leaderboard ranking consultants by patient volume and generated revenue',
      'Specialty department throughput metrics with patient volume and average fee tracking',
      'Multi-filter controls for date range, department selection, and consultant search with one-click export',
    ],
  },
  {
    id: '02',
    title: 'OPD Registration Summary',
    subtitle: 'Outpatient visit analytics — new patient registrations, follow-up visits, department breakdowns & visit trends',
    img: '/images/reports_master_02.png',
    tags: [
      { text: 'OPD REGISTRATION', color: 'bg-teal-100 text-teal-700 border-teal-200' },
      { text: 'PATIENT VISITS', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    ],
    items: [
      'OPD visit metrics tracking first-time consultations, returning patients, and total outpatient volume',
      'Consultant breakdown table detailing new versus follow-up visit percentages per physician',
      'Department-wise OPD registration volume tracking across Neurology, Cardiology, and Surgery',
      'Custom date range filtering with department dropdown selection and export options',
    ],
  },
  {
    id: '03',
    title: 'OPD Appointment Summary',
    subtitle: 'OPD appointment status report — registered bookings, cancellations, rescheduling & slot utilization metrics',
    img: '/images/reports_master_03.png',
    tags: [
      { text: 'APPOINTMENT TRENDS', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { text: 'SLOT UTILIZATION', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    ],
    items: [
      'Appointment KPI summary cards tracking registered, cancelled, and rescheduled appointment counts',
      'Appointment status breakdown table with percentage distribution indicators',
      'Visual distribution graphs featuring appointment status pie charts and monthly volume bars',
      'Multi-variable filtering by date range, clinical department, and assigned doctor',
    ],
  },
  {
    id: '04',
    title: 'Userwise Collection',
    subtitle: 'Cashier shift collection ledger — total bills generated, collection channel split (cash/online) & cashier auditing',
    img: '/images/reports_master_04.png',
    tags: [
      { text: 'CASHIER RECONCILIATION', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      { text: 'SHIFT COLLECTION', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    ],
    items: [
      'Cashier summary ledger cards tracking bill counts, gross amounts, cash received, and digital payments',
      'User-wise collection table detailing individual cashier and receptionist daily totals',
      'Payment mode reconciliation comparing cash drawer totals against online payment gateways',
      'One-click collection ledger exports and cashier shift closing report generation',
    ],
  },
  {
    id: '05',
    title: 'Departmentwise Collection',
    subtitle: 'Departmental revenue analytics — collection breakdowns across Cardiology, OPD, Lab, RIS & Surgical departments',
    img: '/images/reports_master_05.png',
    tags: [
      { text: 'DEPARTMENT REVENUE', color: 'bg-rose-100 text-rose-700 border-rose-200' },
      { text: 'SPECIALTY AUDIT', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    ],
    items: [
      'Departmental revenue metrics tracking bill counts, gross collections, and net earnings per specialty',
      'Department-wise collection ledger table comparing OPD, IPD, diagnostic, and surgical revenue',
      'Specialty income distribution tracking with visual department revenue pie charts',
      'Custom date range filtering with automated Excel and PDF report exports',
    ],
  },
  {
    id: '06',
    title: 'Billwise Collection',
    subtitle: 'Itemized invoice collection report — bill numbers, patient names, consultant details, net amounts & clerk attribution',
    img: '/images/reports_master_06.png',
    tags: [
      { text: 'INVOICE LEDGER', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
      { text: 'BILL DETAILS', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
    ],
    items: [
      'Complete invoice collection ledger listing individual bill numbers, amounts, and payment modes',
      'Granular billing table tracking patient details, attending doctors, and cashier clerk attribution',
      'Search and filter bar supporting bill number lookup, patient search, and date range filters',
      'Full billing ledger data export capabilities for accounting reconciliation',
    ],
  },
  {
    id: '07',
    title: 'Payment Mode Collection',
    subtitle: 'Payment channel collection report — cash, credit card, debit card, UPI, net banking & corporate credit breakdown',
    img: '/images/reports_master_07.png',
    tags: [
      { text: 'PAYMENT MODES', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      { text: 'UPI & CARD LEDGER', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    ],
    items: [
      'Collection overview cards summarizing total bills, gross revenue, discounts, and net collections',
      'Payment channel breakdown comparing cash drawer totals, card terminal receipts, and UPI transfers',
      'Payment mode percentage distribution table with visual percentage share indicators',
      'Multi-filter controls for date ranges, department selection, and cashier accounts',
    ],
  },
  {
    id: '08',
    title: 'Due Amount',
    subtitle: 'Outstanding dues audit report — unpaid patient balances, corporate credit dues & aging analysis',
    img: '/images/reports_master_08.png',
    tags: [
      { text: 'OUTSTANDING DUES', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      { text: 'AGING ANALYSIS', color: 'bg-red-100 text-red-700 border-red-200' },
    ],
    items: [
      'Due amount summary cards tracking outstanding bill count, total gross, paid balance, and net due amount',
      'Outstanding dues table detailing invoice numbers, patient names, attending doctors, and balance due',
      'Amount mix donut chart and top due bills ranking for focused recovery tracking',
      'Exportable due reports with filter options for department, doctor, and date range',
    ],
  },
  {
    id: '09',
    title: 'Refund Report',
    subtitle: 'Audit-approved refund register — processed refund receipts, patient details, net refunded amounts & reason tracking',
    img: '/images/reports_master_09.png',
    tags: [
      { text: 'REFUND REGISTER', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      { text: 'AUDIT SECURITY', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    ],
    items: [
      'Refund metrics cards tracking total refund count, net refunded amounts, and unique patient UHIDs',
      'Detailed refund report table listing refund receipt numbers, original bill references, and net amounts',
      'Department and doctor-wise refund breakdown charts for clinical audit monitoring',
      'Date range and department filter controls with automated refund audit export tools',
    ],
  },
  {
    id: '10',
    title: 'Discount Report',
    subtitle: 'Concession and discount audit report — authorized discounts, fee waivers, gross vs net bill breakdown & approvals',
    img: '/images/reports_master_10.png',
    tags: [
      { text: 'DISCOUNT AUDIT', color: 'bg-rose-100 text-rose-700 border-rose-200' },
      { text: 'CONCESSION TRACK', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    ],
    items: [
      'Discount audit summary cards tracking discounted invoice counts, total concessions, and net amounts',
      'Discount report table detailing invoice numbers, patient details, attending doctors, and discount values',
      'Fee concession tracking comparing gross bill totals against applied discount amounts',
      'Visual discount ranking charts and clerk attribution audit logs',
    ],
  },
  {
    id: '11',
    title: 'Cancelled Bills',
    subtitle: 'Voided invoice audit register — cancelled bill tracking, gross voided value, cancellation reasons & approval logs',
    img: '/images/reports_master_11.png',
    tags: [
      { text: 'CANCELLED INVOICES', color: 'bg-red-100 text-red-700 border-red-200' },
      { text: 'VOID AUDIT TRAIL', color: 'bg-rose-100 text-rose-700 border-rose-200' },
    ],
    items: [
      'Voided bills summary cards tracking total cancelled invoices, gross value, and net voided amount',
      'Cancelled bills audit table detailing bill number, patient name, doctor, department, net amount, and cancellation reason',
      'Reason-wise cancellation auditing identifying wrong consultation selections or billing errors',
      'Doctor-wise cancelled bill charts, date range filtering, and supervisor authorization tracking',
    ],
  },
  {
    id: '12',
    title: 'Bill Register',
    subtitle: 'Master billing register — complete chronological bill log, gross charges, discounts & net bill balances',
    img: '/images/reports_master_12.png',
    tags: [
      { text: 'BILL REGISTER', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
      { text: 'TAX & AUDIT LEDGER', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    ],
    items: [
      'Master bill register summary cards tracking total bill count, gross revenue, discounts, and net billing',
      'Comprehensive chronological billing table detailing bill numbers, patient names, departments, and net amounts',
      'Multi-department and multi-doctor billing transaction logs for general ledger audit',
      'Paginated bill register navigation with customizable date range filters and data export tools',
    ],
  },
]

export default function ReportsAnalytics() {
  const [activeTopicId, setActiveTopicId] = useState('01')
  const [fullScreenImg, setFullScreenImg] = useState(null)

  const handleTopicSelect = (id) => {
    setActiveTopicId(prevId => prevId === id ? null : id)
  }

  // Interactive Real Software UI Mockup Component for Reports & Analytics
  const renderSoftwareUIPreview = () => {
    const currentTopic = reportsTopics.find(t => t.id === activeTopicId) || reportsTopics[0]

    return (
      <div className="bg-white rounded-2xl shadow-xl border border-[#bcc9c6]/50 overflow-hidden text-[#121d1f] w-full transition-all p-2 sm:p-3">
        <div 
          onClick={() => setFullScreenImg({ src: currentTopic?.img, title: currentTopic?.title })}
          className="relative rounded-xl overflow-hidden shadow-sm border border-[#bcc9c6]/30 bg-white group cursor-pointer"
        >
          <img
            src={currentTopic?.img}
            alt={currentTopic?.title}
            className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02] max-h-[380px]"
          />

          {/* Hover Fullscreen Overlay Hint */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-bold text-xs sm:text-sm">
            <span className="material-symbols-outlined text-xl">zoom_in</span>
            <span>Click for Fullscreen View</span>
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
              <span className="material-symbols-outlined text-base">analytics</span>
              HMS Core Sub-Module • Reports & Analytical Intelligence
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121d1f] tracking-tight leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Reports & <span className="text-[#00685e]">Analytics Intelligence</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xs sm:text-sm md:text-base text-[#3d4947] leading-relaxed max-w-2xl mx-auto">
              Real-time hospital revenue ledgers, Doctor consultation performance, OPD registration summaries, Userwise cashier collections, Discount audits & Bill registers.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-[#00685e] text-white px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:bg-[#005049] transition-all">
                Request Reports Demo <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link to="/modules" className="inline-flex items-center gap-2 border border-[#bcc9c6] text-[#00685e] px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-white transition-all">
                All Modules
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ROADMAP STEPS & INTERACTIVE PREVIEW SECTION ── */}
      <section className="site-wrapper py-12 sm:py-16 px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121d1f] tracking-tight">
            12 Master <span className="text-[#00685e]">Report Sub-Modules</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#3d4947] mt-2">
            Click any report step to inspect live analytical data schemas, collection ledgers, and full-resolution screenshot previews.
          </p>
        </div>

        {/* Vertical Criss-Cross Roadmap Timeline */}
        <div className="relative">
          
          {/* Central Vertical Line (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00685e]/20 via-[#00685e] to-[#00685e]/20 -translate-x-1/2 rounded-full" />

          <div className="space-y-12 sm:space-y-16">
            {reportsTopics.map((topic, index) => {
              const isActive = activeTopicId === topic.id
              const isEven = index % 2 === 0

              return (
                <div key={topic.id} className="relative">
                  
                  {/* Timeline Center Node Dot (Desktop Only) */}
                  <button
                    onClick={() => handleTopicSelect(topic.id)}
                    className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 w-6 h-6 rounded-full bg-white border-2 transition-all cursor-pointer items-center justify-center z-20 ${
                      isActive 
                        ? 'border-[#00685e] scale-110 shadow-md ring-2 ring-[#00685e]/20' 
                        : 'border-[#bcc9c6] hover:border-[#00685e]'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#00685e]' : 'bg-[#bcc9c6]'}`} />
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
                    
                    {/* Topic Card Container */}
                    <div className={`${isEven ? 'lg:order-1 lg:pl-8' : 'lg:order-2 lg:pr-8'}`}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className={`rounded-3xl border transition-all duration-300 overflow-hidden bg-white ${
                          isActive
                            ? 'border-[#00685e] shadow-xl ring-2 ring-[#00685e]/10'
                            : 'border-[#bcc9c6]/40 shadow-sm hover:shadow-md hover:border-[#00685e]/40'
                        }`}
                      >
                        {/* Header Bar */}
                        <div 
                          onClick={() => handleTopicSelect(topic.id)}
                          className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-xs font-mono font-extrabold px-3 py-1 rounded-full ${
                              isActive ? 'bg-[#00685e] text-white' : 'bg-[#eaf6f8] text-[#00685e]'
                            }`}>
                              {topic.id}
                            </span>

                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-[#121d1f] flex flex-wrap items-center gap-2">
                                {topic.title}
                              </h3>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {topic.tags.map((tag, idx) => (
                                  <span key={idx} className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${tag.color}`}>
                                    {tag.text}
                                  </span>
                                ))}
                              </div>
                              <p className="text-xs sm:text-sm text-[#6d7a77] leading-relaxed mt-1">
                                {topic.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Expand / Collapse Button (+ / -) */}
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

                        {/* Accordion Expandable Details */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="px-6 pb-6 pt-2 border-t border-[#bcc9c6]/20 bg-[#effcfe]/30 rounded-b-3xl space-y-3"
                            >
                              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#3d4947]">
                                {topic.items.map((item, idx) => (
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

                    {/* Opposite Side Container (Shows Screen View when Active, or Placeholder on Desktop) */}
                    <div className={`${isEven ? 'lg:order-2 lg:pr-8' : 'lg:order-1 lg:pl-8'}`}>
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
                              Click step {topic.id} to inspect full screen view
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Production Ready / Audit Complete Badge Pill */}
        <div className="flex justify-center pt-16 pb-4">
          <div className="bg-[#afecde]/90 backdrop-blur-md text-[#00685e] border border-[#00685e]/40 px-7 py-3 rounded-full text-xs sm:text-sm font-mono font-bold flex items-center gap-2.5 shadow-xl">
            <span className="w-3 h-3 rounded-full bg-[#00685e] animate-pulse" />
            <span>12 REPORT &amp; ANALYTICAL SUB-MODULES READY FOR NABH AUDIT</span>
          </div>
        </div>

      </section>

      {/* ── KEY METRICS BANNER ── */}
      <section className="site-wrapper pt-12 sm:pt-16">
        <div className="bg-gradient-to-r from-[#00685e] to-[#004d46] rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">12 Reports</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Analytical Sub-Modules</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">100%</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Financial & Audit Reconciliation</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">Real-time</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Cashier Shift Ledger Tracking</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">0 Zero</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Data Loss & Revenue Discrepancy</div>
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

              {/* Image Container (Takes Maximum Available Viewport Width & Height) */}
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
