import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

// ── CLINICAL MODULE TOPICS DATA (Matching 13 Sub-Modules) ──
const clinicalTopics = [
  {
    id: '01',
    title: 'Dashboard',
    subtitle: 'Real-time hospital census — total bed availability, OPD registrations, scheduled appointments, emergency cases & doctors on duty',
    img: '/images/clinical_master_01.png',
    tags: [
      { text: 'CLINICAL OVERVIEW', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      { text: 'LIVE CENSUS', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
    ],
    items: [
      'Real-time bed occupancy stats tracking total capacity and live ward availability',
      'Daily OPD consultations summary and scheduled appointment queue status',
      '24/7 active emergency case tracker for immediate triage monitoring',
      'Live patient directory lookup and real-time on-duty doctor roster',
    ],
  },
  {
    id: '02',
    title: 'Patients',
    subtitle: 'New patient registration, demographic records, emergency contact details & automated UHID generation',
    img: '/images/clinical_master_02.png',
    tags: [
      { text: 'UHID DIRECTORY', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { text: 'REGISTRATION', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    ],
    items: [
      'Patient demographic entry covering personal details, identity records, and ABHA health ID integration',
      'Emergency next-of-kin contact details recording and relationship mapping',
      'Address details registration with automated city and state dropdown selections',
      'Instant unique Health ID (UHID) generation upon saving patient profile',
    ],
  },
  {
    id: '03',
    title: 'Appointments',
    subtitle: 'OPD appointment scheduling, patient search lookup, medical consultant allocation & chief complaint notes',
    img: '/images/clinical_master_03.png',
    tags: [
      { text: 'OPD ROSTER', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
      { text: 'SLOT BOOKING', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    ],
    items: [
      'Fast existing patient lookup by name, UHID, or mobile number with quick new entry option',
      'Patient visit details entry with chief complaints and clinical symptom notes',
      'Medical consultant assignment with department auto-fill and calendar slot selector',
      'Instant booking confirmation with OPD token queue number generation',
    ],
  },
  {
    id: '04',
    title: 'Collections',
    subtitle: 'Real-time fee collection tracking — OPD consultations, procedures, TPA insurance & cashier desk settlements',
    img: '/images/clinical_master_04.png',
    tags: [
      { text: 'FEE COLLECTIONS', color: 'bg-rose-100 text-rose-700 border-rose-200' },
      { text: 'CASHIER COUNTER', color: 'bg-amber-100 text-amber-[#00685e] border-amber-200' },
    ],
    items: [
      'Live collection metrics dashboard for OPD, procedural, TPA, and discount breakdowns',
      'Detailed collection ledger table tracking invoices, departments, consultants, and net amounts',
      'Department-wise collection invoice tracking with real-time payment mode indicators',
      'One-click Excel data exports and end-of-shift cashier counter closing summaries',
    ],
  },
  {
    id: '05',
    title: 'Emergency',
    subtitle: '24/7 emergency trauma registration, anonymous patient entry, triage bay assignment & bed placement',
    img: '/images/clinical_master_05.png',
    tags: [
      { text: 'TRAUMA DESK', color: 'bg-red-100 text-red-700 border-red-200' },
      { text: '24/7 TRIAGE', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    ],
    items: [
      'Rapid emergency registration supporting named trauma entries or anonymous patient profiles',
      'Accompanying relative contact recording and emergency relation details logging',
      'Interactive ward and bed placement allocation with live emergency bed availability',
      'Emergency medical team assignment with instant clinical summary dispatch',
    ],
  },
  {
    id: '06',
    title: 'OPD',
    subtitle: 'OPD consultation billing desk — patient details lookup, doctor selection, payment summary & bill generation',
    img: '/images/clinical_master_06.png',
    tags: [
      { text: 'OUTPATIENT', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      { text: 'OPD BILLING', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
    ],
    items: [
      'Quick patient lookup by UHID or 1-click new patient registration toggle',
      'Consultation details entry including consultant selection, slot timing, case type, and referral doctor',
      'Real-time payment summary calculation for registration fees, consultation tariffs, and net balance due',
      'Multi-method payment settlement supporting cash, card, or online payments with instant bill printing',
    ],
  },
  {
    id: '07',
    title: 'IPD Admission',
    subtitle: 'Inpatient admission desk — patient identification, medical team assignment, clinical diagnosis & ward bed matrix',
    img: '/images/clinical_master_07.png',
    tags: [
      { text: 'INPATIENT', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { text: 'BED MATRIX', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    ],
    items: [
      'Patient lookup bar for instant IPD admission record creation',
      'Admission details logging for referral doctor, admission reason, and initial clinical assessment',
      'Primary consultant allocation with department assignment',
      'Interactive ward bed placement matrix with advance payment collection integration',
    ],
  },
  {
    id: '08',
    title: 'Nurse Dashboard',
    subtitle: 'Nursing station care workspace — assigned patients list, pre-consultation vitals recording & triage queue',
    img: '/images/clinical_master_08.png',
    tags: [
      { text: 'NURSING CARE', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
      { text: 'MAR LOGS', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    ],
    items: [
      'Real-time nursing metrics tracking assigned patients, completed vitals, and queue status',
      'Live patient queue tracker with clinical reason updates and priority indicators',
      'Pre-consultation vitals entry panel for temperature, blood pressure, pulse, SpO2, and nurse notes',
      'Active patient monitoring with status dispatch to assigned doctor consultation rooms',
    ],
  },
  {
    id: '09',
    title: 'Doctor Dashboard',
    subtitle: 'Physician consultation workspace — patient queue monitoring, clinical notes, prescriptions & consultation history',
    img: '/images/clinical_master_09.png',
    tags: [
      { text: 'DOCTOR DESK', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
      { text: 'CONSULT WORKSPACE', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
    ],
    items: [
      'Doctor performance metric cards tracking total patients, pending consults, and emergency alerts',
      'Active consultation workspace with electronic health record (EHR) integration',
      'Real-time OPD waiting queue panel with patient call status controls',
      'Completed consultations list with visit summary archives and digital prescription logs',
    ],
  },
  {
    id: '10',
    title: 'Service Billing',
    subtitle: 'Procedural service billing point-of-sale — service selection, itemized charges, discounts & invoice settlement',
    img: '/images/clinical_master_10.png',
    tags: [
      { text: 'PROCEDURE BILLING', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      { text: 'SERVICE POS', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    ],
    items: [
      'Patient identification lookup bar for fast itemized billing',
      'Service catalog dropdowns for service category, procedure selection, and bill addition',
      'Flexible payment configuration supporting discounts, corporate tie-ups, and special tariffs',
      'Payment summary card with instant receipt printing and cashier ledger posting',
    ],
  },
  {
    id: '11',
    title: 'Waiting Screen',
    subtitle: 'Public OPD queue TV display monitor, automated token calling & consultation room locator display',
    img: '/images/home_hero_reception.png',
    tags: [
      { text: 'TOKEN DISPLAY', color: 'bg-teal-100 text-teal-700 border-teal-200' },
      { text: 'QUEUE TV', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
    ],
    items: [
      'Public lobby TV display monitor showing live token queue numbers and doctor room numbers',
      'Multilingual audio announcement integration for patient token calling',
      'Real-time queue movement updates to streamline outpatient waiting flow',
      'Emergency and priority case token calling override capabilities',
    ],
  },
  {
    id: '12',
    title: 'Cancel And Refunds',
    subtitle: 'Audit-approved cancellation and refund ledger — invoice lookup, refund authorizations & reversal tracking',
    img: '/images/clinical_master_12.png',
    tags: [
      { text: 'BILL REVERSAL', color: 'bg-rose-100 text-rose-700 border-rose-200' },
      { text: 'REFUND AUDIT', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    ],
    items: [
      'Comprehensive cancellation and refund audit log table with invoice and receipt cross-referencing',
      'Patient refund tracking covering payment modes, original invoice amounts, and net refund values',
      'Consultation and procedure reversal authorization controls with supervisor audit trails',
      'Action toolbar controls for viewing invoice breakdowns and printing refund vouchers',
    ],
  },
  {
    id: '13',
    title: 'Rapid Consultation',
    subtitle: 'Express OPD registration & consultation workflow — fast demographics entry, doctor assignment & instant check-in',
    img: '/images/clinical_master_13.png',
    tags: [
      { text: 'EXPRESS CONSULT', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
      { text: 'WALK-IN RX', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
    ],
    items: [
      'Streamlined patient demographics form for rapid walk-in consultation check-ins',
      'Fast doctor assignment with department auto-fill and visit reason entry',
      'Automated consultation fee calculation with instant payment processing',
      'One-click save and print action for express OPD consultation tokens',
    ],
  },
]

export default function ClinicalManagement() {
  const [activeTopicId, setActiveTopicId] = useState('01')
  const [fullScreenImg, setFullScreenImg] = useState(null)

  const handleTopicSelect = (id) => {
    setActiveTopicId(prevId => prevId === id ? null : id)
  }

  // Interactive Real Software UI Mockup Component for Clinical Modules
  const renderSoftwareUIPreview = () => {
    const currentTopic = clinicalTopics.find(t => t.id === activeTopicId) || clinicalTopics[0]

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
              <span className="material-symbols-outlined text-base">clinical_notes</span>
              HMS Core Sub-Module • Clinical Suite
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121d1f] tracking-tight leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Clinical Management <span className="text-[#00685e]">System</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xs sm:text-sm md:text-base text-[#3d4947] leading-relaxed max-w-2xl mx-auto">
              Integrated OPD/IPD workflows, Doctor & Nurse workspaces, Digital Prescriptions, Ward Bed Allocation, Token TV Displays, and NABH Quality Metrics.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-[#00685e] text-white px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:bg-[#005049] transition-all">
                Request Demo <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link to="/modules" className="inline-flex items-center gap-2 border border-[#bcc9c6] text-[#00685e] px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-white transition-all">
                All Modules
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CRISS-CROSS ALTERNATING TIMELINE ROADMAP SECTION ── */}
      <section className="site-wrapper py-12 sm:py-16 px-4 relative max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121d1f] tracking-tight">
            13 Master <span className="text-[#00685e]">Clinical Sub-Modules</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#3d4947] mt-2">
            Click any clinical step to inspect live consultation workflows, EMR schemas, and full-resolution screenshot previews.
          </p>
        </div>
        
        {/* Central Vertical Timeline Dashed Line */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-44 bottom-28 w-0.5 border-l-2 border-dashed border-[#00685e]/35 pointer-events-none z-0" />

        <div className="space-y-16 sm:space-y-20 relative z-10">
          {clinicalTopics.map((topic, index) => {
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

                {/* Topic Card Container (Alternates Left vs Right) */}
                <div className={`${isEven ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8'}`}>
                  <motion.div
                    className={`relative rounded-3xl transition-all duration-300 border ${
                      isActive
                        ? 'bg-white border-[#00685e] shadow-2xl ring-4 ring-[#00685e]/15'
                        : 'bg-white/95 border-[#bcc9c6]/50 shadow-md hover:border-[#00685e]/50 hover:shadow-xl'
                    }`}
                  >
                    {/* Header bar of topic card */}
                    <div 
                      onClick={() => handleTopicSelect(topic.id)}
                      className="p-5 sm:p-7 cursor-pointer flex items-center justify-between gap-4 select-none"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Number Badge (01, 02, 03...) */}
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
                          className="px-6 pb-6 pt-2 border-t border-[#bcc9c6]/20 bg-[#effcfe]/30 rounded-b-3xl"
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

                {/* Opposite Side Container (Shows Clinical Screen View when Active, or Placeholder on Desktop) */}
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

        {/* Bottom Production Ready / Audit Complete Badge Pill */}
        <div className="flex justify-center pt-16 pb-4">
          <div className="bg-[#afecde]/90 backdrop-blur-md text-[#00685e] border border-[#00685e]/40 px-7 py-3 rounded-full text-xs sm:text-sm font-mono font-bold flex items-center gap-2.5 shadow-xl">
            <span className="w-3 h-3 rounded-full bg-[#00685e] animate-pulse" />
            <span>NABH COMPLIANT &amp; ICD-10 READY CLINICAL SUITE</span>
          </div>
        </div>

      </section>

      {/* ── KEY METRICS BANNER ── */}
      <section className="site-wrapper pt-12 sm:pt-16">
        <div className="bg-gradient-to-r from-[#00685e] to-[#004d46] rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">15 Seconds</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Rapid Consult Prescription</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">100%</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">ICD-10 & EMR Digitized</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">99.4%</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">On-Time Nurse MAR Execution</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">0 Zero</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">OPD Token Queue Delays</div>
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
