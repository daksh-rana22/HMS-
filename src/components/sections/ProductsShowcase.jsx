import { useState, useEffect } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

// ── PRODUCT 1: CLINIC MODULES ──
export const clinicModules = [
  {
    id: 'appointment',
    name: 'Appointment',
    tag: 'SCHEDULING & QUEUE',
    icon: 'calendar_month',
    desc: 'Smart online and walk-in appointment booking with automated SMS/WhatsApp reminders and token generation.',
    features: ['Instant Token Numbering', 'Doctor Shift Availability', 'WhatsApp / SMS Reminders', 'Waiting Room Display Sync'],
    badge: 'Core Module',
    previewType: 'appointment',
    stats: { primary: '45+ Appointments/Day', secondary: '0 Booking Clashes' }
  },
  {
    id: 'abdm',
    name: 'ABDM',
    tag: 'NHA HEALTH ID',
    icon: 'badge',
    desc: 'Full Ayushman Bharat Digital Mission enablement with 14-digit ABHA ID creation, Scan & Share check-in, and digital health records.',
    features: ['Instant 14-Digit ABHA ID', 'Express Scan & Share QR', 'Patient Consent Manager', 'Digital Health Card Printing'],
    badge: 'ABDM Enabled',
    previewType: 'abdm',
    stats: { primary: '10-Sec Express Check-in', secondary: '100% Consent Controlled' }
  },
  {
    id: 'opd',
    name: 'OPD',
    tag: 'OUTPATIENT WORKFLOW',
    icon: 'stethoscope',
    desc: 'Rapid OPD patient registration, demographic capture, vitals recording, and live doctor consultation queue tracking.',
    features: ['Quick 10-Sec Registration', 'Vitals & BMI Tracking', 'Doctor Queue Dispatch', 'Past Visit History'],
    badge: 'Core Module',
    previewType: 'opd',
    stats: { primary: '120+ Daily OPD Visits', secondary: 'Live Token Sync' }
  },
  {
    id: 'emr',
    name: 'EMR / Prescription',
    tag: 'DIGITAL PRESCRIPTION',
    icon: 'prescriptions',
    desc: '15-second electronic prescription generator with pre-configured dosage templates, ICD-10 diagnosis codes, and allergy alerts.',
    features: ['15-Sec Rapid Consult Rx', 'ICD-10 Diagnostic Codes', 'Drug Interaction Warnings', 'Print & WhatsApp Rx PDF'],
    badge: 'Doctor Suite',
    previewType: 'emr',
    stats: { primary: '15-Sec Fast Rx', secondary: 'Digital Print & WhatsApp' }
  },
  {
    id: 'reports',
    name: 'Reports & Analytics',
    tag: 'CLINIC INTELLIGENCE',
    icon: 'analytics',
    desc: 'Actionable financial reports, daily OPD patient footfall trends, doctor performance summaries, and cash collection breakdown.',
    features: ['Daily Cashier Collections', 'Doctor-Wise Revenue Split', 'Patient Footfall Graphs', 'One-Click GST Export'],
    badge: 'Business Insights',
    previewType: 'reports',
    stats: { primary: 'Real-Time Ledger', secondary: 'Zero Revenue Leakage' }
  },
]

// ── PRODUCT 2: HMS (HOSPITAL MANAGEMENT SYSTEM) MODULES ──
export const hmsModules = [
  {
    id: 'appointment',
    name: 'Appointment',
    tag: 'ENTERPRISE SCHEDULING',
    icon: 'calendar_month',
    desc: 'Centralized OPD scheduling across all specialty departments, automated doctor roster sync, and self-service kiosk check-in.',
    features: ['Multi-Doctor Rostering', 'Kiosk & Online Booking', 'Queue Token Screens', 'Specialty Department Triage'],
    badge: 'Enterprise Core',
    previewType: 'appointment',
  },
  {
    id: 'abdm',
    name: 'ABDM',
    tag: 'NHA M1, M2 & M3',
    icon: 'badge',
    desc: 'Full NHA Milestones 1, 2 & 3 integration — ABHA creation, FHIR R4 clinical record exchange, and consent gateway.',
    features: ['NHA M1, M2 & M3 Workflows', 'FHIR R4 Diagnostic Bundles', 'Scan & Share Express Desk', 'Consent-Based Health Vault'],
    badge: 'ABDM Enabled',
    previewType: 'abdm',
  },
  {
    id: 'opd',
    name: 'OPD',
    tag: 'OUTPATIENT COMMAND',
    icon: 'stethoscope',
    desc: 'High-volume outpatient management with multi-counter token display screens, emergency priority routing, and UHID dual-binding.',
    features: ['Multi-Counter Token Routing', 'Emergency Patient Intake', 'Demographics & Vitals Sync', 'Integrated Walk-In Billing'],
    badge: 'Core Module',
    previewType: 'opd',
  },
  {
    id: 'emr',
    name: 'EMR / Prescription',
    tag: 'CLINICAL INTELLIGENCE',
    icon: 'prescriptions',
    desc: 'Specialty-specific clinical EMR, ICD-10 diagnostic coding, pre-built e-prescriptions, and bi-directional diagnostic order links.',
    features: ['Specialty Clinical Templates', 'Digital Drug Formulary', 'Automated Lab & Rad Orders', 'Electronic Discharge Summaries'],
    badge: 'Doctor Suite',
    previewType: 'emr',
  },
  {
    id: 'ipd',
    name: 'IPD',
    tag: 'INPATIENT MANAGEMENT',
    icon: 'hotel',
    desc: 'Comprehensive inpatient suite with visual bed census (ICU, Private, General), doctor admission requests, and ward transfer tracking.',
    features: ['Visual Interactive Bed Matrix', 'Admission & Bed Allocations', 'Ward Transfer History', 'Provisional IPD Estimates'],
    badge: 'Hospital Suite',
    previewType: 'ipd',
  },
  {
    id: 'daycare',
    name: 'Day Care',
    tag: 'SHORT-STAY CARE',
    icon: 'bed',
    desc: 'Streamlined workflows for short-stay procedures, chemotherapy, hemodialysis, and same-day surgical observation beds.',
    features: ['Same-Day Bed Allocation', 'Procedure Time Tracking', 'Package Invoicing Sync', 'Fast-Track Discharge'],
    badge: 'Hospital Suite',
    previewType: 'daycare',
  },
  {
    id: 'ot',
    name: 'OT',
    tag: 'SURGICAL SUITE',
    icon: 'local_hospital',
    desc: 'Operation Theatre slot booking, Pre-Anesthesia Checkup (PAC) records, surgical safety checklists, and intra-operative logs.',
    features: ['OT Table Slot Booking', 'PAC Assessment Forms', 'Surgeon & Anesthetist Roster', 'Post-Op Recovery Tracking'],
    badge: 'Hospital Suite',
    previewType: 'ot',
  },
  {
    id: 'emergency',
    name: 'Emergency',
    tag: '24/7 TRAUMA & ER',
    icon: 'emergency',
    desc: '24/7 ER rapid intake desk, Red/Yellow/Green triage bay classification, emergency drug administration, and priority ICU escalation.',
    features: ['Color-Coded Triage Station', 'Immediate UHID Fast-Track', 'Emergency Deposit Handling', 'Critical Code Blue Alerts'],
    badge: 'Hospital Suite',
    previewType: 'emergency',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    tag: 'DRUG & DISPENSARY POS',
    icon: 'medication',
    desc: 'Complete hospital pharmacy POS, First-Expiry-First-Out (FEFO) dispensing, batch inventory tracking, and automated IPD indent clearing.',
    features: ['Batch & Expiry Alerts', 'FEFO Dispensing Logic', 'IPD Ward Indent Sync', 'Barcode Billing & Re-orders'],
    badge: 'Hospital Suite',
    previewType: 'pharmacy',
  },
  {
    id: 'laboratory',
    name: 'Laboratory',
    tag: 'DIAGNOSTIC LIS',
    icon: 'biotech',
    desc: 'Laboratory Information System (LIS) with unique barcode sample generation, bi-directional analyzer sync, and digital test verification.',
    features: ['Barcode Sample Labeling', 'Bi-Directional Analyzer Sync', 'Pathologist Verification', 'Instant Patient Portal Push'],
    badge: 'Diagnostics',
    previewType: 'laboratory',
  },
  {
    id: 'radiology',
    name: 'Radiology',
    tag: 'RIS & PACS IMAGING',
    icon: 'radiology',
    desc: 'Radiology Information System (RIS) with test scheduling, modality worklist sync, and direct DICOM PACS image link into doctor EMR.',
    features: ['Modality Worklist Sync', 'DICOM PACS Integration', 'Radiologist Report Builder', 'Stat Scan Prioritization'],
    badge: 'Diagnostics',
    previewType: 'radiology',
  },
  {
    id: 'nursing',
    name: 'Nursing',
    tag: 'MAR & WARD WORKSPACE',
    icon: 'assignment_ind',
    desc: 'Dedicated nurse station workspace with hourly vitals charting, Medication Administration Record (MAR), and handover shift logs.',
    features: ['Digital MAR Execution', 'Hourly Vitals Flowsheet', 'Nurse Handover Duty Notes', 'IV & Intake/Output Tracking'],
    badge: 'Clinical Care',
    previewType: 'nursing',
  },
  {
    id: 'billing',
    name: 'Billing & Accounts',
    tag: 'FINANCIAL COMMAND',
    icon: 'receipt_long',
    desc: 'Enterprise financial management with itemized IPD/OPD final bills, advance deposits, manager refund approvals, and Tally/GST sync.',
    features: ['Itemized Automatic Billing', 'Advance Payment Receipts', 'Controlled Refund Workflows', 'Direct Tally & GST Export'],
    badge: 'Finance Suite',
    previewType: 'billing',
  },
  {
    id: 'tpa',
    name: 'TPA / Insurance',
    tag: 'CASHLESS CLAIMS',
    icon: 'shield',
    desc: 'Seamless insurance pre-authorization, TPA rate tariff master configuration, document checklist verification, and NHCX claim sync.',
    features: ['Cashless Pre-Auth Desk', 'TPA Rate Tariff Master', 'Claims Document Checklist', 'NHCX Payer Integration'],
    badge: 'Finance Suite',
    previewType: 'tpa',
  },
  {
    id: 'mrd',
    name: 'MRD',
    tag: 'MEDICAL RECORDS DEPT',
    icon: 'folder_shared',
    desc: 'Medical Record Department file indexing, ICD-10 coding, Medico-Legal Case (MLC) file registers, and digitized archival retrieval.',
    features: ['Physical File Rack Indexing', 'ICD-10 Disease Coding', 'MLC & Birth/Death Registry', 'Digital Dossier Archival'],
    badge: 'Records Suite',
    previewType: 'mrd',
  },
  {
    id: 'reports',
    name: 'Reports & Analytics',
    tag: 'EXECUTIVE BI & QUALITY',
    icon: 'analytics',
    desc: 'Over 12 specialized analytical sub-modules covering cashier ledger audits, department revenue, bed occupancy, and quality metrics.',
    features: ['12 Analytical Sub-Modules', 'Bed Occupancy Analytics', 'Shift Cash Reconciliation', 'Quality Audit Ready Reports'],
    badge: 'Enterprise BI',
    previewType: 'reports',
  },
]

// ── SAMPLE MOCK DATA FOR LIVE SIMULATORS ──
const sampleAppointments = [
  { token: 'T-01', patient: 'Mrs. Priya Sharma', status: 'Confirmed' },
  { token: 'T-02', patient: 'Rajesh Gupta', status: 'Confirmed' },
  { token: 'T-03', patient: 'Ananya Roy', status: 'In Consultation' },
  { token: 'T-04', patient: 'Vikram Malhotra', status: 'Confirmed' },
  { token: 'T-05', patient: 'Suresh Raina', status: 'Confirmed' },
  { token: 'T-06', patient: 'Pooja Hegde', status: 'Confirmed' },
]

const sampleOpdDoctors = [
  { doctor: 'Dr. Avanish Dubey (Neurology)', waiting: 4 },
  { doctor: 'Dr. Kumar (Cardiology)', waiting: 2 },
  { doctor: 'Dr. Meera Verma (Pediatrics)', waiting: 5 },
  { doctor: 'Dr. Rajesh Sharma (Orthopedics)', waiting: 3 },
  { doctor: 'Dr. Sunita Rao (Gynecology)', waiting: 6 },
]

const samplePrescription = {
  patient: 'Rajesh Kumar (PAT-8120)',
  diagnosis: 'Type 2 Diabetes Mellitus with Hypertension (ICD-10: E11.9, I10)',
  rx: [
    { drug: 'Tab. Metformin 500mg', dose: '1-0-1', timing: 'After Meals', duration: '30 Days' },
    { drug: 'Tab. Telmisartan 40mg', dose: '1-0-0', timing: 'Morning', duration: '30 Days' },
    { drug: 'Cap. Multivitamin', dose: '0-0-1', timing: 'Night', duration: '15 Days' },
  ]
}

const sampleBeds = [
  { ward: 'ICU Ward A', total: 10, occupied: 8, available: 2 },
  { ward: 'General Ward', total: 30, occupied: 24, available: 6 },
  { ward: 'Deluxe Private', total: 8, occupied: 6, available: 2 },
  { ward: 'Day Care Bay', total: 12, occupied: 7, available: 5 },
]

const sampleEmergencyTriage = [
  { bay: 'Bay 01', level: 'RED (Critical)', condition: 'Acute STEMI / Cardiac Alert' },
  { bay: 'Bay 02', level: 'RED (Critical)', condition: 'Severe Head Injury Trauma' },
  { bay: 'Bay 03', level: 'YELLOW (Urgent)', condition: 'Acute Renal Colic' },
  { bay: 'Bay 04', level: 'GREEN (Normal)', condition: 'Minor Laceration Care' },
]

const samplePharmacyStocks = [
  { drug: 'Inj. Ceftriaxone 1g', batch: 'CFT-9921', stock: '450 Vials', expiry: 'Dec 2027', status: 'In Stock' },
  { drug: 'Tab. Paracetamol 650', batch: 'PCM-8102', stock: '1,200 Strips', expiry: 'Aug 2028', status: 'In Stock' },
  { drug: 'Inj. Pantoprazole 40', batch: 'PAN-3312', stock: '85 Vials', expiry: 'Nov 2026', status: 'Reorder' },
]

const sampleLabOrders = [
  { id: 'LAB-9012', test: 'Complete Blood Count (CBC)', patient: 'Meenakshi Sundaram', status: 'Analyzer Processing' },
  { id: 'LAB-9013', test: 'Lipid Profile & HbA1c', patient: 'Harpreet Singh', status: 'Doctor Verified' },
  { id: 'LAB-9014', test: 'Liver Function Test (LFT)', patient: 'Kavita Reddy', status: 'Sample Collected' },
]

const getModuleRoute = (id) => {
  switch (id) {
    case 'appointment':
      return '/modules/clinical?module=appointments#03'
    case 'abdm':
      return '/abdm-integration'
    case 'opd':
      return '/modules/clinical?module=opd#06'
    case 'emr':
      return '/modules/clinical?module=doctor#09'
    case 'emergency':
      return '/modules/clinical?module=emergency#05'
    case 'reports':
      return '/modules/reports'
    case 'ipd':
      return '/modules/ipd'
    case 'daycare':
      return '/modules/ipd'
    case 'nursing':
      return '/modules/ipd'
    case 'laboratory':
      return '/modules/laboratory'
    case 'billing':
    case 'tpa':
    case 'pharmacy':
      return '/modules/billing-accounts'
    case 'radiology':
      return '/modules/clinical'
    case 'ot':
      return '/modules/clinical'
    case 'mrd':
      return '/modules/reports'
    default:
      return '/modules/clinical'
  }
}

export default function ProductsShowcase({ showComparison = true }) {
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const [activeProduct, setActiveProduct] = useState('clinic') // 'clinic' | 'hms'
  const [clinicActiveIndex, setClinicActiveIndex] = useState(0)
  const [hmsActiveIndex, setHmsActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Sync state and smooth-scroll when URL query params change (?product=clinic&module=opd)
  useEffect(() => {
    const productParam = searchParams.get('product')
    const moduleParam = searchParams.get('module')

    if (productParam === 'clinic' || productParam === 'hms') {
      setActiveProduct(productParam)
      setIsPaused(true)

      const modulesList = productParam === 'clinic' ? clinicModules : hmsModules
      if (moduleParam) {
        const foundIdx = modulesList.findIndex(
          (m) =>
            m.id.toLowerCase() === moduleParam.toLowerCase() ||
            m.name.toLowerCase().replace(/[^a-z0-9]/g, '') === moduleParam.toLowerCase().replace(/[^a-z0-9]/g, '')
        )
        if (foundIdx !== -1) {
          if (productParam === 'clinic') {
            setClinicActiveIndex(foundIdx)
          } else {
            setHmsActiveIndex(foundIdx)
          }
        }
      }

      // Smooth scroll to the products showcase section
      const timer = setTimeout(() => {
        const section = document.getElementById('products')
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 150)

      return () => clearTimeout(timer)
    }
  }, [searchParams, location.search, location.pathname])

  // Auto-cycle active module preview every 6 seconds when not paused
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      if (activeProduct === 'clinic') {
        setClinicActiveIndex((prev) => (prev + 1) % clinicModules.length)
      } else {
        setHmsActiveIndex((prev) => (prev + 1) % hmsModules.length)
      }
    }, 6000)
    return () => clearInterval(timer)
  }, [activeProduct, isPaused])

  const currentModule = activeProduct === 'clinic' 
    ? clinicModules[clinicActiveIndex] 
    : hmsModules[hmsActiveIndex]

  const totalModulesCount = activeProduct === 'clinic' ? clinicModules.length : hmsModules.length

  return (
    <section 
      id="products"
      className="py-14 sm:py-20 lg:py-24 relative overflow-hidden scroll-mt-20"
      style={{ background: 'linear-gradient(180deg, var(--t-bg, #effcfe) 0%, color-mix(in srgb, var(--t-bg, #effcfe) 60%, white) 50%, var(--t-bg, #effcfe) 100%)' }}
    >
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] 2xl:w-[1000px] h-[450px] pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, var(--t-hero-glow, rgba(0,180,162,0.15)) 0%, transparent 70%)' }}
      />

      <div className="site-wrapper relative z-10 space-y-10 sm:space-y-14">

        {/* ── 1. SECTION TITLE & DUAL PRODUCT SELECTOR ── */}
        <motion.div 
          className="text-center max-w-4xl mx-auto space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--t-primary,#00685e)]/30 bg-white/90 backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--t-primary,#00685e)] animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--t-primary,#00685e)]">
              OMEDO PRODUCT SUITES
            </span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--t-text,#121d1f)] tracking-tight leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Two Tailored Platforms.{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--t-gradient-text, linear-gradient(135deg, #00685e 0%, #2d685e 100%))' }}>
              One Seamless Healthcare Standard.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[var(--t-text-secondary,#3d4947)] leading-relaxed max-w-2xl mx-auto">
            Choose the edition built specifically for your healthcare organization — whether you operate a focused medical clinic or an enterprise multi-branch hospital network.
          </p>

          {/* ── Interactive Product Switcher Pills ── */}
          <div className="pt-3 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[var(--t-border,#bcc9c6)]/60 shadow-md">
              <button
                type="button"
                onClick={() => setActiveProduct('clinic')}
                className={`relative px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                  activeProduct === 'clinic'
                    ? 'text-white shadow-md'
                    : 'text-[var(--t-text-secondary,#3d4947)] hover:text-[var(--t-text,#121d1f)] hover:bg-slate-50'
                }`}
                style={{
                  background: activeProduct === 'clinic' ? 'var(--t-primary, #00685e)' : 'transparent',
                }}
              >
                <span className="material-symbols-outlined text-lg sm:text-xl">stethoscope</span>
                <span>OMEDO Clinic</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeProduct === 'clinic' ? 'bg-white/20 text-white' : 'bg-[#eaf6f8] text-[var(--t-primary,#00685e)]'
                }`}>
                  5 Modules
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveProduct('hms')}
                className={`relative px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                  activeProduct === 'hms'
                    ? 'text-white shadow-md'
                    : 'text-[var(--t-text-secondary,#3d4947)] hover:text-[var(--t-text,#121d1f)] hover:bg-slate-50'
                }`}
                style={{
                  background: activeProduct === 'hms' ? 'var(--t-primary, #00685e)' : 'transparent',
                }}
              >
                <span className="material-symbols-outlined text-lg sm:text-xl">domain</span>
                <span>OMEDO HMS</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeProduct === 'hms' ? 'bg-white/20 text-white' : 'bg-[#eaf6f8] text-[var(--t-primary,#00685e)]'
                }`}>
                  16 Modules
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── 2. ACTIVE PRODUCT SHOWCASE CONTAINER ── */}
        <AnimatePresence mode="wait">
          {activeProduct === 'clinic' ? (
            /* ═══════════════════════════════════════════════════════════════
               PRODUCT 1: OMEDO CLINIC SHOWCASE
               ═══════════════════════════════════════════════════════════════ */
            <motion.div
              key="clinic-showcase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Product Header Banner */}
              <div 
                className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[var(--t-border,#bcc9c6)]/50 shadow-lg relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, white 0%, var(--t-bg-light, #f2fafb) 60%, white 100%)' }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#afecde] text-[#00685e]">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        CLINIC MANAGEMENT SUITE
                      </span>
                      <span className="text-xs font-bold text-[var(--t-text-muted,#6d7a77)]">
                        5 Core Modules Included
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      OMEDO Clinic Edition
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed max-w-2xl">
                      Engineered for independent medical practitioners, polyclinics, and specialty OPD centers. Eliminate paperwork with fast appointment scheduling, 15-second digital e-prescriptions, instant ABHA creation, and real-time daily revenue tracking.
                    </p>
                    <div className="pt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-[var(--t-primary,#00685e)]">Ideal for:</span>
                      {['Solo Doctors', 'Specialty Polyclinics', 'OPD Centers', 'Day Clinics'].map((item) => (
                        <span key={item} className="px-2.5 py-0.5 rounded-lg bg-white border border-[var(--t-border,#bcc9c6)]/50 text-[11px] font-semibold text-[var(--t-text)] shadow-2xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-center gap-3">
                    <Link
                      to="/contact"
                      className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white shadow-md hover:scale-[1.02] transition-all"
                      style={{ background: 'var(--t-primary, #00685e)' }}
                    >
                      <span>Book Clinic Demo</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                    <Link
                      to="/modules/clinical"
                      className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-white border border-[var(--t-border)] text-[var(--t-primary,#00685e)] hover:bg-[#eaf6f8] transition-all shadow-xs"
                    >
                      <span>Explore Clinic Modules</span>
                    </Link>
                  </div>
                </div>

                {/* 5 Module Pills Bar */}
                <div className="mt-6 pt-6 border-t border-[var(--t-border)]/30">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--t-primary,#00685e)] mb-3">
                    5 MODULES UNDER CLINIC SUITE:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    {clinicModules.map((m, idx) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setClinicActiveIndex(idx)}
                        className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                          clinicActiveIndex === idx
                            ? 'bg-[var(--t-primary,#00685e)] text-white border-[var(--t-primary,#00685e)] shadow-md scale-[1.02]'
                            : 'bg-white hover:bg-[#f2fafb] text-[var(--t-text)] border-[var(--t-border)]/50'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-xl ${
                          clinicActiveIndex === idx ? 'text-white' : 'text-[var(--t-primary,#00685e)]'
                        }`}>
                          {m.icon}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">{m.name}</div>
                          <div className={`text-[10px] truncate ${clinicActiveIndex === idx ? 'text-white/80' : 'text-[var(--t-text-muted)]'}`}>
                            {m.tag}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Live Simulator: Clinic Active Module Deep-Dive */}
              <div className="card-frosted rounded-3xl p-5 sm:p-7 lg:p-9 shadow-lg border border-[var(--t-border,#bcc9c6)]/50 relative overflow-hidden bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left: Module Details & Tabs */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-[#afecde] text-[#00685e] flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-2xl">{currentModule.icon}</span>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#afecde]/70 text-[#00685e] text-xs font-bold">
                          {currentModule.badge}
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--t-primary,#00685e)]">
                          {currentModule.tag}
                        </span>
                        <h4 className="text-2xl font-bold text-[var(--t-text,#121d1f)] mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {currentModule.name}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
                        {currentModule.desc}
                      </p>

                      <div className="space-y-2 pt-1">
                        {currentModule.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-[var(--t-text)]">
                            <span className="material-symbols-outlined text-sm text-[var(--t-primary,#00685e)]">check_circle</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Link
                          to={getModuleRoute(currentModule.id)}
                          className="inline-flex items-center gap-2 bg-[#00685e] hover:bg-[#005149] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                        >
                          <span>Explore Features</span>
                          <span className="material-symbols-outlined text-sm sm:text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[var(--t-border)]/30 flex items-center justify-between">
                      <div className="text-[11px] text-[var(--t-text-muted)] font-medium">
                        Click tabs to preview all 5 modules
                      </div>
                      <div className="flex gap-1.5">
                        {clinicModules.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setClinicActiveIndex(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                              clinicActiveIndex === i ? 'bg-[var(--t-primary,#00685e)] w-6' : 'bg-slate-200 hover:bg-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Live Interactive Mockup Screen */}
                  <div className="lg:col-span-7 bg-[#f8fcfd] rounded-2xl border border-[var(--t-border,#bcc9c6)]/50 shadow-inner p-4 sm:p-5 flex flex-col justify-between min-h-[380px] overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-[#bcc9c6]/30 text-xs">
                      <div className="flex items-center gap-2 font-bold text-[var(--t-primary,#00685e)]">
                        <span className="material-symbols-outlined text-sm">{currentModule.icon}</span>
                        <span>OMEDO Clinic Live Workspace — {currentModule.name}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        Live Simulation
                      </span>
                    </div>

                    {/* Dynamic Screen Content Based on Active Module */}
                    <div className="py-4 flex-1 overflow-y-auto">
                      {currentModule.previewType === 'appointment' && (
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-[#00685e] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Appointments Queue
                          </h4>
                          <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
                            <thead>
                              <tr className="border-b border-[#bcc9c6]/30 text-[#00685e] font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
                                <th className="py-2 px-1">TOKEN</th>
                                <th className="py-2 px-1">PATIENT</th>
                                <th className="py-2 px-1 whitespace-nowrap">STATUS</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#bcc9c6]/20">
                              {sampleAppointments.map((r) => (
                                <tr key={r.token} className="hover:bg-[#eaf6f8]/50 transition-colors">
                                  <td className="py-2 px-1 font-bold text-[#00685e] whitespace-nowrap">{r.token}</td>
                                  <td className="py-2 px-1 font-semibold text-[#121d1f]">{r.patient}</td>
                                  <td className="py-2 px-1 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c7d2fe]/70 text-[#3730a3] font-bold text-[9.5px] sm:text-[10px] whitespace-nowrap">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5] shrink-0" />
                                      {r.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {currentModule.previewType === 'abdm' && (
                        <div className="space-y-3">
                          <div className="bg-gradient-to-br from-[#00685e] to-[#004d46] text-white p-4 rounded-2xl shadow-md space-y-3">
                            <div className="flex items-center justify-between text-xs border-b border-white/20 pb-2">
                              <div className="flex items-center gap-1.5 font-bold">
                                <span className="material-symbols-outlined text-base">badge</span>
                                <span>ABHA Digital Health Profile</span>
                              </div>
                              <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded">NHA Ready</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <div className="text-[10px] text-white/70">ABHA Number</div>
                                <div className="font-mono font-bold text-sm tracking-wider text-[#85f5e6]">91-4829-1048-5729</div>
                              </div>
                              <div>
                                <div className="text-[10px] text-white/70">ABHA Address</div>
                                <div className="font-semibold text-xs text-white">priya.sharma@abdm</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-1 text-[11px] text-[#afecde]">
                              <span>✓ Aadhaar e-KYC Linked</span>
                              <span>✓ Scan & Share Auto-Linked</span>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-700">Counter QR Scan & Share</span>
                            <span className="font-bold text-[var(--t-primary,#00685e)]">Token #14 Generated in 8 Secs</span>
                          </div>
                        </div>
                      )}

                      {currentModule.previewType === 'opd' && (
                        <div className="flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-[#00685e] mb-3 flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                              <span className="material-symbols-outlined text-lg text-[#00685e]">add_box</span>
                              <span>OPD Department Status</span>
                            </h4>
                            <div className="space-y-2">
                              {sampleOpdDoctors.map((o) => (
                                <div key={o.doctor} className="p-2.5 sm:p-3 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px] sm:text-xs">
                                  <div className="font-semibold text-[#121d1f] flex items-center gap-2">
                                    <span>👨‍⚕️</span>
                                    <span>{o.doctor}</span>
                                  </div>
                                  <span className="font-bold text-[#00685e] px-2.5 py-0.5 rounded-full bg-white/90 shadow-2xs">
                                    Waiting: {o.waiting}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-[#6d7a77] pt-2">
                            Outpatient Department Active Doctor Consultations
                          </div>
                        </div>
                      )}

                      {currentModule.previewType === 'emr' && (
                        <div className="space-y-3">
                          <div className="bg-white p-3.5 rounded-xl border border-slate-100 space-y-2">
                            <div className="flex items-center justify-between border-b pb-1.5">
                              <div className="text-xs font-bold text-slate-800">Digital Prescription Pad</div>
                              <div className="text-[10px] font-mono text-[var(--t-primary,#00685e)]">Dr. Avanish Dubey, MD</div>
                            </div>
                            <div className="text-[11px] text-slate-600 font-medium">
                              <strong>Diagnosis:</strong> {samplePrescription.diagnosis}
                            </div>
                            <div className="space-y-1.5 pt-1">
                              {samplePrescription.rx.map((drug) => (
                                <div key={drug.drug} className="p-2 rounded-lg bg-slate-50 flex items-center justify-between text-[11px]">
                                  <div className="font-bold text-slate-800">{drug.drug}</div>
                                  <div className="text-slate-500">{drug.dose} • {drug.timing} • {drug.duration}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {currentModule.previewType === 'reports' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2 text-center">
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                              <div className="text-[10px] text-slate-500 font-semibold">TODAY COLLECTIONS</div>
                              <div className="text-lg font-extrabold text-[var(--t-primary,#00685e)]">₹42,800</div>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                              <div className="text-[10px] text-slate-500 font-semibold">PATIENT FOOTFALL</div>
                              <div className="text-lg font-extrabold text-[#008378]">38 OPD Visits</div>
                            </div>
                          </div>

                          <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                            <div className="flex justify-between font-semibold text-slate-700">
                              <span>UPI & Digital Collections</span>
                              <span className="font-bold text-emerald-600">₹29,400 (68%)</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full w-[68%]" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#bcc9c6]/30 flex items-center justify-between text-[11px] text-[var(--t-text-muted)] font-medium">
                      <span>Standardized Clinical Cloud Architecture</span>
                      <span className="text-[var(--t-primary,#00685e)] font-bold">OMEDO Clinic Platform</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ) : (
            /* ═══════════════════════════════════════════════════════════════
               PRODUCT 2: OMEDO HMS SHOWCASE
               ═══════════════════════════════════════════════════════════════ */
            <motion.div
              key="hms-showcase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Product Header Banner */}
              <div 
                className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[var(--t-border,#bcc9c6)]/50 shadow-lg relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, white 0%, var(--t-bg-light, #f2fafb) 60%, white 100%)' }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#00685e] text-white">
                        <span className="material-symbols-outlined text-sm">domain</span>
                        ENTERPRISE HOSPITAL MANAGEMENT SUITE
                      </span>
                      <span className="text-xs font-bold text-[var(--t-text-muted,#6d7a77)]">
                        16 Comprehensive Modules
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      OMEDO Hospital (HMS) Edition
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed max-w-2xl">
                      Full-spectrum enterprise operating system for single and multi-chain hospitals. Integrates clinical EMR, IPD bed census, 24/7 ER triage, operation theatre scheduling, pharmacy POS, laboratory LIS, radiology PACS, nursing MAR charting, cashless TPA insurance, and comprehensive executive BI analytics.
                    </p>
                    <div className="pt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-[var(--t-primary,#00685e)]">Ideal for:</span>
                      {['Multi-Specialty Hospitals', 'Nursing Homes', 'Hospital Chains', 'Diagnostic & Surgical Centers'].map((item) => (
                        <span key={item} className="px-2.5 py-0.5 rounded-lg bg-white border border-[var(--t-border,#bcc9c6)]/50 text-[11px] font-semibold text-[var(--t-text)] shadow-2xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-center gap-3">
                    <Link
                      to="/contact"
                      className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white shadow-md hover:scale-[1.02] transition-all"
                      style={{ background: 'var(--t-primary, #00685e)' }}
                    >
                      <span>Book OMEDO Enterprise Demo</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                    <Link
                      to="/modules"
                      className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-white border border-[var(--t-border)] text-[var(--t-primary,#00685e)] hover:bg-[#eaf6f8] transition-all shadow-xs"
                    >
                      <span>Explore All 16 Modules</span>
                    </Link>
                  </div>
                </div>

                {/* 16 Module Grid with Badges */}
                <div className="mt-6 pt-6 border-t border-[var(--t-border)]/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--t-primary,#00685e)]">
                      16 MODULES UNDER OMEDO HMS SUITE:
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">Click any module to preview</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                    {hmsModules.map((m, idx) => {
                      const isSelected = hmsActiveIndex === idx
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setHmsActiveIndex(idx)}
                          className={`p-2.5 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1.5 relative group ${
                            isSelected
                              ? 'bg-[var(--t-primary,#00685e)] text-white border-[var(--t-primary,#00685e)] shadow-md scale-[1.03]'
                              : 'bg-white hover:bg-[#f2fafb] text-[var(--t-text)] border-[var(--t-border)]/50'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-xl ${
                            isSelected ? 'text-white' : 'text-[var(--t-primary,#00685e)]'
                          }`}>
                            {m.icon}
                          </span>
                          <div className="text-[11px] font-bold truncate w-full leading-tight">
                            {m.name}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Interactive Live Simulator: HMS Active Module Deep-Dive */}
              <div className="card-frosted rounded-3xl p-5 sm:p-7 lg:p-9 shadow-lg border border-[var(--t-border,#bcc9c6)]/50 relative overflow-hidden bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left: Module Details & Scrollable Master List */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-[#00685e] text-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-2xl">{currentModule.icon}</span>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#afecde] text-[#00685e]">
                          {currentModule.badge}
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--t-primary,#00685e)]">
                          {currentModule.tag}
                        </span>
                        <h4 className="text-2xl font-bold text-[var(--t-text,#121d1f)] mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {currentModule.name}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
                        {currentModule.desc}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        {currentModule.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-[var(--t-text)]">
                            <span className="material-symbols-outlined text-sm text-[var(--t-primary,#00685e)]">check_circle</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Link
                          to={getModuleRoute(currentModule.id)}
                          className="inline-flex items-center gap-2 bg-[#00685e] hover:bg-[#005149] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                        >
                          <span>Explore Features</span>
                          <span className="material-symbols-outlined text-sm sm:text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[var(--t-border)]/30 flex items-center justify-between">
                      <div className="text-[11px] text-[var(--t-text-muted)] font-medium">
                        Showing module {hmsActiveIndex + 1} of 16
                      </div>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => setHmsActiveIndex((prev) => (prev - 1 + hmsModules.length) % hmsModules.length)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setHmsActiveIndex((prev) => (prev + 1) % hmsModules.length)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Live Interactive Mockup Screen for HMS */}
                  <div className="lg:col-span-7 bg-[#f8fcfd] rounded-2xl border border-[var(--t-border,#bcc9c6)]/50 shadow-inner p-4 sm:p-5 flex flex-col justify-between min-h-[400px] overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-[#bcc9c6]/30 text-xs">
                      <div className="flex items-center gap-2 font-bold text-[var(--t-primary,#00685e)]">
                        <span className="material-symbols-outlined text-sm">{currentModule.icon}</span>
                        <span>OMEDO HMS Live Command — {currentModule.name}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        Enterprise Simulation
                      </span>
                    </div>

                    {/* Dynamic Screen Content Based on Active HMS Module */}
                    <div className="py-4 flex-1 overflow-y-auto">
                      {currentModule.id === 'appointment' && (
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-[#00685e] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Appointments Queue
                          </h4>
                          <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
                            <thead>
                              <tr className="border-b border-[#bcc9c6]/30 text-[#00685e] font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
                                <th className="py-2 px-1">TOKEN</th>
                                <th className="py-2 px-1">PATIENT</th>
                                <th className="py-2 px-1 whitespace-nowrap">STATUS</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#bcc9c6]/20">
                              {sampleAppointments.map((r) => (
                                <tr key={r.token} className="hover:bg-[#eaf6f8]/50 transition-colors">
                                  <td className="py-2 px-1 font-bold text-[#00685e] whitespace-nowrap">{r.token}</td>
                                  <td className="py-2 px-1 font-semibold text-[#121d1f]">{r.patient}</td>
                                  <td className="py-2 px-1 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c7d2fe]/70 text-[#3730a3] font-bold text-[9.5px] sm:text-[10px] whitespace-nowrap">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5] shrink-0" />
                                      {r.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {currentModule.id === 'abdm' && (
                        <div className="space-y-3">
                          <div className="bg-gradient-to-br from-[#00685e] to-[#004d46] text-white p-4 rounded-2xl shadow-md space-y-3">
                            <div className="flex items-center justify-between text-xs border-b border-white/20 pb-2">
                              <div className="flex items-center gap-1.5 font-bold">
                                <span className="material-symbols-outlined text-base">badge</span>
                                <span>ABHA Digital Health Profile</span>
                              </div>
                              <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded">NHA Ready</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <div className="text-[10px] text-white/70">ABHA Number</div>
                                <div className="font-mono font-bold text-sm tracking-wider text-[#85f5e6]">91-4829-1048-5729</div>
                              </div>
                              <div>
                                <div className="text-[10px] text-white/70">ABHA Address</div>
                                <div className="font-semibold text-xs text-white">priya.sharma@abdm</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-1 text-[11px] text-[#afecde]">
                              <span>✓ Aadhaar e-KYC Linked</span>
                              <span>✓ Scan & Share Auto-Linked</span>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-700">Counter QR Scan & Share</span>
                            <span className="font-bold text-[var(--t-primary,#00685e)]">Token #14 Generated in 8 Secs</span>
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'opd' && (
                        <div className="flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-[#00685e] mb-3 flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                              <span className="material-symbols-outlined text-lg text-[#00685e]">add_box</span>
                              <span>OPD Department Status</span>
                            </h4>
                            <div className="space-y-2">
                              {sampleOpdDoctors.map((o) => (
                                <div key={o.doctor} className="p-2.5 sm:p-3 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px] sm:text-xs">
                                  <div className="font-semibold text-[#121d1f] flex items-center gap-2">
                                    <span>👨‍⚕️</span>
                                    <span>{o.doctor}</span>
                                  </div>
                                  <span className="font-bold text-[#00685e] px-2.5 py-0.5 rounded-full bg-white/90 shadow-2xs">
                                    Waiting: {o.waiting}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-[#6d7a77] pt-2">
                            Outpatient Department Active Doctor Consultations
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'emr' && (
                        <div className="space-y-3">
                          <div className="bg-white p-3.5 rounded-xl border border-slate-100 space-y-2">
                            <div className="flex items-center justify-between border-b pb-1.5">
                              <div className="text-xs font-bold text-slate-800">Digital Prescription Pad</div>
                              <div className="text-[10px] font-mono text-[var(--t-primary,#00685e)]">Dr. Avanish Dubey, MD</div>
                            </div>
                            <div className="text-[11px] text-slate-600 font-medium">
                              <strong>Diagnosis:</strong> {samplePrescription.diagnosis}
                            </div>
                            <div className="space-y-1.5 pt-1">
                              {samplePrescription.rx.map((drug) => (
                                <div key={drug.drug} className="p-2 rounded-lg bg-slate-50 flex items-center justify-between text-[11px]">
                                  <div className="font-bold text-slate-800">{drug.drug}</div>
                                  <div className="text-slate-500">{drug.dose} • {drug.timing} • {drug.duration}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'ipd' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {sampleBeds.map((w) => (
                              <div key={w.ward} className="bg-white p-2.5 rounded-xl border border-slate-100 text-center">
                                <div className="text-[10px] font-bold text-slate-700 truncate">{w.ward}</div>
                                <div className="text-base font-extrabold text-[var(--t-primary,#00685e)]">{w.occupied}/{w.total}</div>
                                <div className="text-[9px] text-emerald-600 font-semibold">{w.available} Beds Free</div>
                              </div>
                            ))}
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs flex items-center justify-between">
                            <span className="font-semibold text-slate-700">ICU Bed Census: 80% Occupancy</span>
                            <span className="text-[10px] font-bold text-[var(--t-primary,#00685e)]">Real-Time Bed Turnaround</span>
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'daycare' && (
                        <div className="space-y-3">
                          <div className="bg-white p-3.5 rounded-xl border border-slate-100 space-y-2 text-xs">
                            <div className="flex justify-between items-center border-b pb-1.5 font-bold text-slate-800">
                              <span>Day Care Procedure Bay</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800">Short-Stay (4-6 Hrs)</span>
                            </div>
                            <div className="space-y-1.5 text-[11px]">
                              <div className="p-2 bg-slate-50 rounded flex justify-between">
                                <span className="font-semibold">Dialysis Session — Bed 04</span>
                                <span className="text-emerald-600 font-bold">Completed (Discharged)</span>
                              </div>
                              <div className="p-2 bg-slate-50 rounded flex justify-between">
                                <span className="font-semibold">Chemotherapy Cycle — Bed 02</span>
                                <span className="text-amber-600 font-bold">In Infusion (2h remaining)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'ot' && (
                        <div className="space-y-3">
                          <div className="bg-white p-3.5 rounded-xl border border-slate-100 text-xs space-y-2">
                            <div className="flex justify-between items-center font-bold text-slate-800">
                              <span>OT Schedule &amp; PAC Dashboard</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Theatre 01 Active</span>
                            </div>
                            <div className="divide-y divide-slate-100 text-[11px] space-y-1.5 pt-1">
                              <div className="pt-1.5 flex justify-between items-center">
                                <div>
                                  <div className="font-bold text-slate-800">Laparoscopic Cholecystectomy</div>
                                  <div className="text-[10px] text-slate-500">Dr. S. K. Sharma • OT-01 • 10:30 AM</div>
                                </div>
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">In Procedure</span>
                              </div>
                              <div className="pt-1.5 flex justify-between items-center">
                                <div>
                                  <div className="font-bold text-slate-800">Total Knee Replacement (TKR)</div>
                                  <div className="text-[10px] text-slate-500">Dr. A. Verma • OT-02 • 01:00 PM</div>
                                </div>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">PAC Cleared</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'emergency' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            {sampleEmergencyTriage.map((t) => (
                              <div key={t.bay} className="bg-white p-2.5 rounded-xl border border-slate-100 text-xs">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-slate-800">{t.bay}</span>
                                  <span className="text-[9px] font-extrabold text-rose-600">{t.level}</span>
                                </div>
                                <div className="text-[10px] text-slate-600 font-medium">{t.condition}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'pharmacy' && (
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded-xl border border-slate-100">
                            <div className="text-xs font-bold text-slate-800 mb-2">Pharmacy Drug Formulary &amp; FEFO</div>
                            <div className="space-y-1.5 text-xs">
                              {samplePharmacyStocks.map((p) => (
                                <div key={p.batch} className="p-2 rounded-lg bg-slate-50 flex items-center justify-between text-[11px]">
                                  <div>
                                    <div className="font-bold text-slate-800">{p.drug}</div>
                                    <div className="text-[10px] text-slate-500">Batch: {p.batch} • Exp: {p.expiry}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold text-[var(--t-primary,#00685e)]">{p.stock}</div>
                                    <span className={`text-[9px] font-bold ${p.status === 'In Stock' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                      {p.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'laboratory' && (
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded-xl border border-slate-100">
                            <div className="text-xs font-bold text-slate-800 mb-2">LIS Investigation Queue &amp; Barcodes</div>
                            <div className="space-y-1.5 text-xs">
                              {sampleLabOrders.map((l) => (
                                <div key={l.id} className="p-2 rounded-lg bg-slate-50 flex items-center justify-between text-[11px]">
                                  <div>
                                    <div className="font-bold text-slate-800">{l.test}</div>
                                    <div className="text-[10px] text-slate-500">{l.patient} • #{l.id}</div>
                                  </div>
                                  <span className="text-[10px] font-bold text-[var(--t-primary,#00685e)] px-2 py-0.5 rounded-full bg-[#afecde]">
                                    {l.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'radiology' && (
                        <div className="space-y-3">
                          <div className="bg-white p-3.5 rounded-xl border border-slate-100 text-xs space-y-2">
                            <div className="flex justify-between items-center border-b pb-1.5 font-bold text-slate-800">
                              <span>RIS Modality Worklist</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-800">DICOM PACS</span>
                            </div>
                            <div className="space-y-1.5 text-[11px]">
                              <div className="p-2 bg-slate-50 rounded flex justify-between">
                                <span className="font-semibold">MRI Brain with Contrast (1.5T)</span>
                                <span className="text-emerald-600 font-bold">Images Archived</span>
                              </div>
                              <div className="p-2 bg-slate-50 rounded flex justify-between">
                                <span className="font-semibold">HRCT Chest Non-Contrast</span>
                                <span className="text-blue-600 font-bold">Report Signed</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'nursing' && (
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                            <div className="flex justify-between items-center font-bold text-slate-800">
                              <span>Ward 3A Nurse Flowsheet</span>
                              <span className="text-[10px] text-emerald-600 font-bold">Shift 08:00 - 16:00</span>
                            </div>
                            <div className="p-2 bg-slate-50 rounded text-[11px] space-y-1">
                              <div className="font-semibold text-slate-800">Bed 104: Amit Shah (Post-Op Day 1)</div>
                              <div className="text-slate-500">IV Drip 100 ml/hr • Vitals Normal • MAR Checked</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'billing' && (
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                            <div className="flex justify-between font-bold text-slate-800">
                              <span>Consolidated IPD Itemized Invoice</span>
                              <span className="text-[10px] font-mono text-emerald-600">INV-2026-8819</span>
                            </div>
                            <div className="divide-y divide-slate-100 text-[11px]">
                              <div className="py-1 flex justify-between"><span>Bed &amp; ICU Charges (4 Days)</span><span className="font-bold">₹28,000</span></div>
                              <div className="py-1 flex justify-between"><span>Surgeon &amp; PAC Fee</span><span className="font-bold">₹45,000</span></div>
                              <div className="py-1 flex justify-between"><span>Pharmacy &amp; Lab Consumables</span><span className="font-bold">₹18,500</span></div>
                              <div className="py-1.5 flex justify-between font-bold text-[var(--t-primary,#00685e)] text-xs border-t">
                                <span>Total Net Payable</span>
                                <span>₹91,500</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'tpa' && (
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                            <div className="flex justify-between items-center font-bold text-slate-800">
                              <span>TPA Cashless Pre-Authorization</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Approved</span>
                            </div>
                            <div className="p-2 bg-slate-50 rounded text-[11px] space-y-1">
                              <div className="font-semibold text-slate-800">Star Health &amp; Allied Insurance</div>
                              <div className="text-slate-500">Claim Ref: SH-9018274 • Approved Limit: ₹1,50,000</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentModule.id === 'mrd' && (
                        <div className="space-y-3">
                          <div className="bg-white p-3.5 rounded-xl border border-slate-100 text-xs space-y-2">
                            <div className="flex justify-between items-center font-bold text-slate-800">
                              <span>Medical Records &amp; Digitized Dossier Registry</span>
                              <span className="text-[10px] font-mono text-[var(--t-primary,#00685e)] font-bold">ICD-10 Sync</span>
                            </div>
                            <div className="space-y-1.5 text-[11px]">
                              <div className="p-2 bg-slate-50 rounded flex justify-between items-center">
                                <div>
                                  <div className="font-bold text-slate-800">Patient Dossier #MRD-88219</div>
                                  <div className="text-[10px] text-slate-500">Rack B-04 • Shelf 2 • Case: Acute Myocardial Infarction (I21.9)</div>
                                </div>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Archived &amp; Verified</span>
                              </div>
                              <div className="p-2 bg-slate-50 rounded flex justify-between items-center">
                                <div>
                                  <div className="font-bold text-slate-800">Medico-Legal Register #MLC-1042</div>
                                  <div className="text-[10px] text-slate-500">Police Intimation Form &amp; Digital Discharge Summary Linked</div>
                                </div>
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Digitized</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Default Fallback for other modules */}
                      {!['ipd', 'daycare', 'ot', 'emergency', 'pharmacy', 'laboratory', 'radiology', 'nursing', 'billing', 'tpa', 'mrd'].includes(currentModule.id) && (
                        <div className="space-y-3">
                          <div className="bg-white p-3.5 rounded-xl border border-slate-100 text-xs space-y-2">
                            <div className="flex justify-between font-bold text-slate-800">
                              <span>{currentModule.name} Dashboard</span>
                              <span className="text-[10px] font-mono text-[var(--t-primary,#00685e)]">Enterprise Mode</span>
                            </div>
                            <p className="text-slate-600 text-[11px] leading-relaxed">
                              {currentModule.desc}
                            </p>
                            <div className="grid grid-cols-2 gap-2 pt-2">
                              {currentModule.features.slice(0, 2).map((f) => (
                                <div key={f} className="p-2 bg-slate-50 rounded text-[10px] font-bold text-slate-700">
                                  ✓ {f}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#bcc9c6]/30 flex items-center justify-between text-[11px] text-[var(--t-text-muted)] font-medium">
                      <span>Enterprise Multi-Facility Healthcare Architecture</span>
                      <span className="text-[var(--t-primary,#00685e)] font-bold">OMEDO Hospital OS</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 3. SIDE-BY-SIDE FEATURE COMPARISON TABLE ── */}
        {showComparison && (
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[var(--t-border,#bcc9c6)]/50 shadow-md space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--t-primary,#00685e)]">
                COMPARISON AT A GLANCE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                OMEDO Clinic vs OMEDO HMS
              </h3>
              <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)]">
                Find the perfect fit for your clinical practice or hospital facility.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-3 px-4 text-slate-500 font-bold uppercase text-[11px]">Feature / Capability</th>
                    <th className="py-3 px-4 text-[var(--t-primary,#00685e)] font-extrabold text-sm w-1/3">
                      🩺 OMEDO Clinic (5 Modules)
                    </th>
                    <th className="py-3 px-4 text-[var(--t-primary,#00685e)] font-extrabold text-sm w-1/3">
                      🏥 OMEDO HMS (16 Modules)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">Target Healthcare Facility</td>
                    <td className="py-3 px-4 text-slate-600">Independent Clinics &amp; Polyclinics</td>
                    <td className="py-3 px-4 text-slate-600 font-semibold">Single &amp; Multi-Branch Hospitals</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">Appointment &amp; Token Scheduling</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Included</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Included (Multi-Department)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">ABDM &amp; ABHA Express Check-In</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Included</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Full M1, M2 &amp; M3</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">OPD &amp; EMR Prescriptions</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Included (15-Sec Rx)</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Full Specialty Templates</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">IPD Wards &amp; Bed Census Matrix</td>
                    <td className="py-3 px-4 text-slate-400">— Not Applicable</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Live Interactive Bed Map</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">Day Care &amp; Short-Stay Bays</td>
                    <td className="py-3 px-4 text-slate-400">— Not Applicable</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Included</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">24/7 ER Trauma &amp; Emergency Triage</td>
                    <td className="py-3 px-4 text-slate-400">— Not Applicable</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Included</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">Pharmacy POS &amp; Laboratory LIS</td>
                    <td className="py-3 px-4 text-slate-400">— Optional Add-on</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Fully Integrated</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">Cashless TPA Insurance Management</td>
                    <td className="py-3 px-4 text-slate-400">— Not Applicable</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Included (Pre-Auth Desk)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">OT (Operation Theatre) &amp; MRD</td>
                    <td className="py-3 px-4 text-slate-400">— Not Applicable</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Included</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">Reports &amp; Analytical MIS</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ Daily Clinic Reports</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">✓ 12+ Analytical Sub-Modules</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  )
}
