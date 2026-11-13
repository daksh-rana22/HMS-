import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'
import { initialClientLogos } from '../../data/clientLogos'
import { fetchCompanyClients, formatLogoUrl } from '../../services/api'
import SafeImage from '../../components/common/SafeImage'
import { safeSetItem, safeGetItem } from '../../utils/storage'
import trustedByBg from '../../assets/trusted_by_bg.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

// ── 13 COMPREHENSIVE HMS MODULES ──
const hmsModulesData = [
  {
    id: 'appointment',
    name: 'Appointment & Rostering',
    category: 'Clinical & Inpatient',
    tag: 'ENTERPRISE SCHEDULING',
    icon: 'calendar_month',
    badge: 'Enterprise Core',
    desc: 'Centralized OPD scheduling across all specialty departments, automated doctor duty roster synchronization, self-service kiosk check-in, and department triage routing.',
    features: [
      'Multi-department & multi-doctor rostering',
      'Self-service kiosk and patient portal booking',
      'Multi-counter token screen synchronization',
      'Specialty department triage and priority tagging',
      'Automated SMS & WhatsApp appointment notifications',
      'Consultant leave management and slot rescheduling',
    ],
  },
  {
    id: 'abdm',
    name: 'ABDM (M1, M2 & M3)',
    category: 'Clinical & Inpatient',
    tag: 'NHA HEALTH INTEROPERABILITY',
    icon: 'badge',
    badge: 'ABDM Certified',
    desc: 'Complete National Health Authority Milestones 1, 2 & 3 integration — instant 14-digit ABHA creation, Scan & Share express check-in, and FHIR R4 clinical record exchange with consent gateway.',
    features: [
      'Full NHA Milestones 1, 2 & 3 certified workflows',
      'FHIR R4 standardized diagnostic & clinical bundles',
      'Counter QR Scan & Share express check-in (<10s)',
      'Patient Consent-Controlled Health Record Vault',
      'Dual-binding linking ABHA with hospital UHID',
      'Aadhaar e-KYC & Mobile OTP patient verification',
    ],
  },
  {
    id: 'opd',
    name: 'OPD Outpatient Command',
    category: 'Clinical & Inpatient',
    tag: 'OUTPATIENT WORKFLOW',
    icon: 'stethoscope',
    badge: 'Core Module',
    desc: 'High-volume outpatient management with multi-counter token display screens, emergency priority routing, demographic intake, vitals tracking, and UHID dual-binding.',
    features: [
      'Multi-counter token routing across 50+ chambers',
      'Emergency patient intake & immediate triage tagging',
      'Demographic & vitals recording (BP, Pulse, SpO2, BMI)',
      'Integrated walk-in consultation & procedure billing',
      'Instant UHID barcode wristband and card generation',
      'Historical visit lookup across all past consultations',
    ],
  },
  {
    id: 'emr',
    name: 'EMR & Clinical Intelligence',
    category: 'Clinical & Inpatient',
    tag: 'SPECIALTY CLINICAL SUITE',
    icon: 'prescriptions',
    badge: 'Doctor Suite',
    desc: 'Specialty-specific clinical EMR, ICD-10 diagnostic coding, pre-built e-prescriptions, bi-directional diagnostic order links, and digitized discharge summaries.',
    features: [
      'Specialty clinical templates (Cardio, Ortho, Neuro, etc.)',
      'Digital hospital drug formulary & dosage calculators',
      'Automated bi-directional lab order entry',
      'Electronic discharge summary builder with e-Sign',
      'Known drug allergy & cross-interaction warnings',
      'Longitudinal medical history and timeline flowsheets',
    ],
  },
  {
    id: 'ipd',
    name: 'IPD Inpatient Management',
    category: 'Clinical & Inpatient',
    tag: 'INPATIENT COMMAND & CENSUS',
    icon: 'hotel',
    badge: 'Hospital Core',
    desc: 'Comprehensive inpatient suite with visual interactive bed matrix (ICU, Private, Semi-Private, General), doctor admission requests, ward transfers, and provisional IPD estimates.',
    features: [
      'Visual interactive bed occupancy matrix',
      'Doctor admission advice & bed allocation workflows',
      'Real-time inter-ward and ICU transfer audit trail',
      'Provisional IPD billing estimates & advance tracking',
      'Discharge clearance checklist (Nursing, Pharmacy, Accounts)',
      'Multi-bed census dashboard with live turnover stats',
    ],
  },
  {
    id: 'emergency',
    name: '24/7 Emergency & Trauma',
    category: 'Emergency & Critical Care',
    tag: '24/7 CRITICAL CARE',
    icon: 'emergency',
    badge: 'Critical Care',
    desc: '24/7 ER rapid intake desk, Red/Yellow/Green triage bay classification, emergency drug administration, Code Blue alerts, and priority ICU escalation.',
    features: [
      'Color-coded Red/Yellow/Green triage classification',
      'Instant emergency UHID generation in under 5 seconds',
      'Immediate emergency deposit & credit billing',
      'Critical Code Blue, Code Red, and Trauma alerts',
      'Direct priority bed transfer to ICU and High Dependency Units',
      'Medico-Legal Case (MLC) registration with police intimation',
    ],
  },
  {
    id: 'pharmacy',
    name: 'Hospital Pharmacy POS',
    category: 'Diagnostics & Pharmacy',
    tag: 'DRUG & DISPENSARY POS',
    icon: 'medication',
    badge: 'Dispensary Suite',
    desc: 'Complete hospital pharmacy POS, First-Expiry-First-Out (FEFO) dispensing, batch inventory tracking, barcode sales, automated IPD ward indents, and reorder levels.',
    features: [
      'First-Expiry-First-Out (FEFO) dispensing logic',
      'Automated batch number, expiry date & MRP tracking',
      'Live IPD ward indent clearance & return processing',
      'Barcode billing with rapid checkout and generic search',
      'Purchase order creation with supplier invoice matching',
      'Schedule H1 & narcotic drug register compliance',
    ],
  },
  {
    id: 'laboratory',
    name: 'Laboratory (LIS)',
    category: 'Diagnostics & Pharmacy',
    tag: 'DIAGNOSTIC LIS',
    icon: 'biotech',
    badge: 'Diagnostics',
    desc: 'Full Laboratory Information System (LIS) with unique barcode sample generation, bi-directional analyzer sync, digital pathologist verification, and patient portal push.',
    features: [
      'Unique barcode sample collection & tube labeling',
      'Bi-directional automated analyzer interfacing',
      'Delta check alerts for abnormal clinical values',
      'Digital pathologist signature and verification flow',
      'Instant SMS/WhatsApp delivery of verified PDF reports',
      'NABL compliant quality control (QC) tracking',
    ],
  },
  {
    id: 'nursing',
    name: 'Nursing & Ward Station',
    category: 'Clinical & Inpatient',
    tag: 'MAR & WARD WORKSPACE',
    icon: 'assignment_ind',
    badge: 'Clinical Care',
    desc: 'Dedicated nurse station workspace with hourly vitals charting, Medication Administration Record (MAR), nurse handover shift logs, and intake/output fluid tracking.',
    features: [
      'Digital Medication Administration Record (MAR) execution',
      'Hourly vitals flowsheet with color-coded fever trends',
      'Nurse shift handover duty logs and critical care notes',
      'Intravenous (IV) fluid balance & Intake/Output tracking',
      'Automated pharmacy indenting directly from bed station',
      'Doctor instruction acknowledgment and execution log',
    ],
  },
  {
    id: 'billing',
    name: 'Billing & Accounts Command',
    category: 'Financial & Insurance',
    tag: 'FINANCIAL COMMAND',
    icon: 'receipt_long',
    badge: 'Finance Suite',
    desc: 'Enterprise financial management with itemized IPD/OPD final bills, advance deposits, manager refund approvals, tariff masters, and direct Tally / GST export.',
    features: [
      'Itemized consolidated IPD & OPD billing generation',
      'Advance payment collection with receipt printing',
      'Controlled multi-level manager refund approvals',
      'Custom tariff masters (General, Private, Corporate, TPA)',
      'Department-wise revenue sharing and doctor payouts',
      'Seamless Tally ERP sync and GST return export',
    ],
  },
  {
    id: 'tpa',
    name: 'TPA & Cashless Claims',
    category: 'Financial & Insurance',
    tag: 'CASHLESS CLAIMS DESK',
    icon: 'shield',
    badge: 'Finance Suite',
    desc: 'Seamless insurance pre-authorization, TPA rate tariff masters, claims document checklist verification, cashless discharge clearance, and NHCX payer integration.',
    features: [
      'Cashless insurance pre-authorization request tracker',
      'TPA and insurance rate tariff master configuration',
      'Comprehensive claim document checklist & verification',
      'Co-payment, deductible, and non-medical item splits',
      'National Health Claims Exchange (NHCX) ready',
      'Payer outstanding ledger and aging analysis',
    ],
  },
  {
    id: 'mrd',
    name: 'MRD (Medical Records)',
    category: 'Governance & Records',
    tag: 'MEDICAL RECORDS DEPT',
    icon: 'folder_shared',
    badge: 'Records Suite',
    desc: 'Medical Record Department file indexing, ICD-10 disease coding, Medico-Legal Case (MLC) registers, birth/death certificate logs, and digitized dossier archival.',
    features: [
      'Physical file rack and shelf location indexing',
      'ICD-10 clinical diagnosis & procedure coding',
      'Medico-Legal Case (MLC) file register with police records',
      'Birth and Death certificate registry and government sync',
      'Digitized patient dossier scanning & permanent archival',
      'NABH compliant medical record audit checklists',
    ],
  },
  {
    id: 'reports',
    name: 'Executive BI & MIS Analytics',
    category: 'Governance & Records',
    tag: 'EXECUTIVE INTELLIGENCE',
    icon: 'analytics',
    badge: 'Enterprise BI',
    desc: 'Over 12 specialized analytical sub-modules covering cashier ledger audits, department revenue, bed occupancy, average length of stay (ALOS), and NABH quality metrics.',
    features: [
      '12+ Specialized analytical sub-modules & dashboards',
      'Bed occupancy rate (BOR) & Average Length of Stay (ALOS)',
      'Shift-wise cashier reconciliation and audit trails',
      'Departmental profit/loss & revenue contribution graphs',
      'Clinical quality indicators and hospital mortality audits',
      'Automated daily executive summary reports on email',
    ],
  },
]

// ── SAMPLE SIMULATION DATA FOR HMS ──
const sampleBeds = [
  { ward: 'ICU Ward A', total: 10, occupied: 8, available: 2, status: 'High Occupancy' },
  { ward: 'General Ward - Male', total: 30, occupied: 24, available: 6, status: 'Normal' },
  { ward: 'General Ward - Female', total: 30, occupied: 22, available: 8, status: 'Normal' },
  { ward: 'Deluxe Private Rooms', total: 12, occupied: 10, available: 2, status: 'High Occupancy' },
  { ward: 'High Dependency Unit (HDU)', total: 8, occupied: 6, available: 2, status: 'Active Monitoring' },
]

const sampleEmergencyTriage = [
  { bay: 'Bay 01', level: 'RED (Critical)', patient: 'PAT-9012', condition: 'Acute STEMI / Cardiac Alert', time: '10 Mins Ago' },
  { bay: 'Bay 02', level: 'RED (Critical)', patient: 'PAT-9015', condition: 'Severe Polytrauma Head Injury', time: '18 Mins Ago' },
  { bay: 'Bay 03', level: 'YELLOW (Urgent)', patient: 'PAT-9018', condition: 'Acute Renal Colic with Hematuria', time: '25 Mins Ago' },
  { bay: 'Bay 04', level: 'GREEN (Normal)', patient: 'PAT-9021', condition: 'Minor Laceration & Dressing', time: '40 Mins Ago' },
]

const samplePharmacyStocks = [
  { drug: 'Inj. Ceftriaxone 1g', batch: 'CFT-9921', stock: '450 Vials', expiry: 'Dec 2027', status: 'In Stock' },
  { drug: 'Tab. Paracetamol 650', batch: 'PCM-8102', stock: '1,200 Strips', expiry: 'Aug 2028', status: 'In Stock' },
  { drug: 'Inj. Pantoprazole 40', batch: 'PAN-3312', stock: '85 Vials', expiry: 'Nov 2026', status: 'Reorder' },
  { drug: 'Inj. Meropenem 1g', batch: 'MER-4419', stock: '120 Vials', expiry: 'Mar 2027', status: 'In Stock' },
]

const sampleLabOrders = [
  { id: 'LAB-9012', test: 'Complete Blood Count (CBC)', patient: 'Meenakshi S.', status: 'Analyzer Processing' },
  { id: 'LAB-9013', test: 'Lipid Profile & HbA1c', patient: 'Harpreet Singh', status: 'Doctor Verified' },
  { id: 'LAB-9014', test: 'Liver Function Test (LFT)', patient: 'Kavita Reddy', status: 'Sample Collected' },
  { id: 'LAB-9015', test: 'Troponin-I Rapid Assay', patient: 'Rajesh K. (ER)', status: 'Stat Verified' },
]

const hmsFaqs = [
  {
    q: 'What bed size hospitals is OMEDO HMS best suited for?',
    a: 'OMEDO HMS is architected for hospitals ranging from 30 beds to 500+ beds across single and multi-branch networks. Its modular architecture allows hospitals to activate specific modules as they scale, from general nursing homes to NABH-accredited multi-specialty tertiary care hospitals.',
  },
  {
    q: 'How does OMEDO HMS manage IPD bed census and ward transfers?',
    a: 'The system features an interactive visual Bed Matrix that displays real-time occupancy across all wards (ICU, Private, Semi-Private, General). Clinicians and admission desks can allocate beds, schedule transfers, reserve beds for planned surgeries, and view provisional billing estimates instantly.',
  },
  {
    q: 'Can our laboratory analyzers and external diagnostic devices be integrated?',
    a: 'Yes. OMEDO Laboratory integrates bi-directionally with standard clinical pathology analyzers using HL7 / ASTM protocols, eliminating manual result typing and pushing verified digital test reports directly into patient EMR files.',
  },
  {
    q: 'How does the TPA and cashless insurance claim workflow work?',
    a: 'OMEDO features a dedicated Cashless Insurance Desk that manages insurance pre-authorizations, custom tariff masters, claim document checklists, and NHCX payer integration. It clearly separates patient co-pays and non-medical deductions, ensuring zero claim rejection due to missing paperwork.',
  },
  {
    q: 'Can we migrate our existing patient records, doctor masters, and price tariffs?',
    a: 'Yes. Our specialized data engineering team manages complete legacy data migration from your current software or Excel spreadsheets. We validate and import patient master registries, historical visit summaries, pharmacy inventory, and rate cards with zero operational downtime.',
  },
  {
    q: 'How long does full hospital deployment and staff training take?',
    a: 'A typical 50-to-150 bed hospital goes live within 7 to 14 business days. We provide on-site and remote training for all hospital cadres: receptionists, doctors, nurses, pharmacists, lab technicians, cashier staff, and hospital administrators.',
  },
]

export default function OmedoHMS() {
  const [searchParams] = useSearchParams()
  const [activeModuleIdx, setActiveModuleIdx] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  // Client Logos state synced with Admin Console
  const [clients, setClients] = useState(() => {
    const s = safeGetItem('omedo_admin_clients')
    if (s) {
      try {
        const parsed = JSON.parse(s)
        if (Array.isArray(parsed) && parsed.length > 0 && parsed.some((item) => item.logoUrl)) {
          return parsed
        }
      } catch (e) {
        console.error(e)
      }
    }
    return initialClientLogos
  })

  useEffect(() => {
    const loadLive = async () => {
      try {
        const cRes = await fetchCompanyClients()
        if (cRes && cRes.success && Array.isArray(cRes.list) && cRes.list.length > 0) {
          const normClients = cRes.list.map((c, idx) => ({
            id: c.id ?? idx + 1,
            name: c.client_name || c.name || 'Healthcare Partner',
            location: c.short_description || c.location || '',
            logoUrl: formatLogoUrl(c.logo_url || c.logoUrl || c.image_base64 || null),
            logoText: (c.client_name || c.name || 'HOSPITAL').slice(0, 10).toUpperCase(),
            status: (c.is_active ?? (c.status !== 'INACTIVE')) ? 'ACTIVE' : 'INACTIVE',
            featured: c.is_featured ?? c.featured ?? true,
            badgeColor: c.badgeColor || '#00685e',
          }))
          setClients(normClients)
          safeSetItem('omedo_admin_clients', normClients)
        }
      } catch (err) {
        console.warn('Clients sync notice:', err)
      }
    }
    loadLive()

    const handleSync = () => {
      const sClients = safeGetItem('omedo_admin_clients')
      if (sClients) {
        try {
          const parsed = JSON.parse(sClients)
          if (Array.isArray(parsed) && parsed.length > 0) {
            const validClients = parsed.filter((item) => item && (item.logoUrl || item.location || !item.content))
            if (validClients.length > 0) setClients(validClients)
          }
        } catch (e) {
          console.error(e)
        }
      }
    }

    window.addEventListener('storage', handleSync)
    window.addEventListener('omedo_clients_updated', handleSync)
    return () => {
      window.removeEventListener('storage', handleSync)
      window.removeEventListener('omedo_clients_updated', handleSync)
    }
  }, [])

  const activeClients = useMemo(() => {
    return clients.filter((c) => c.status !== 'INACTIVE')
  }, [clients])

  const loopedClients = useMemo(() => {
    if (activeClients.length === 0) return []
    let repeated = [...activeClients]
    while (repeated.length < 10) {
      repeated = [...repeated, ...activeClients]
    }
    return [...repeated, ...repeated]
  }, [activeClients])

  // Handle URL query parameter (?module=ipd)
  useEffect(() => {
    const moduleParam = searchParams.get('module')
    if (moduleParam) {
      const idx = hmsModulesData.findIndex(
        (m) =>
          m.id.toLowerCase() === moduleParam.toLowerCase() ||
          m.name.toLowerCase().replace(/[^a-z0-9]/g, '') === moduleParam.toLowerCase().replace(/[^a-z0-9]/g, '')
      )
      if (idx !== -1) {
        setActiveModuleIdx(idx)
        const el = document.getElementById('hms-modules')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [searchParams])

  const activeModule = hmsModulesData[activeModuleIdx] || hmsModulesData[0]

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
                OMEDO ENTERPRISE HMS • NABH &amp; ABDM READY HOSPITAL OS
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-4">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--t-text,#121d1f)] tracking-tight leading-[1.15]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              The Complete Operating System for{' '}
              <span
                className="bg-clip-text text-transparent block sm:inline"
                style={{ backgroundImage: 'var(--t-gradient-text, linear-gradient(135deg, #00685e 0%, #008378 100%))' }}
              >
                Modern Multi-Specialty Hospitals.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--t-text-secondary,#3d4947)] leading-relaxed max-w-3xl mx-auto font-normal">
              A unified healthcare infrastructure connecting clinical, diagnostic, inpatient, and financial operations across 13 synchronized modules. From emergency triage and IPD bed census to pharmacy POS, diagnostic laboratory LIS, nursing MAR charting, and cashless insurance claims.
            </p>
          </motion.div>

          {/* Target Facility Badges */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs font-bold text-[var(--t-primary,#00685e)]">Engineered for:</span>
            {['Multi-Specialty Hospitals (30-500+ Beds)', 'Hospital Chains & Multi-Branch Networks', 'Surgical Centers', 'Nursing Homes', 'Super-Specialty Institutes'].map((item) => (
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
              <span>Book Enterprise Demo</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>

            <a
              href="#hms-modules"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-white text-[var(--t-primary,#00685e)] border border-[var(--t-primary,#00685e)]/40 hover:bg-[#eaf6f8] transition-all shadow-xs"
            >
              <span>Explore 13 Hospital Modules</span>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </a>
          </motion.div>

          {/* Key Stat Cards Strip */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6">
            {[
              { num: '13 Modules', label: 'Hospital Wide Integration', icon: 'domain' },
              { num: 'ABDM M1, M2, M3', label: 'NHA Certified Interoperability', icon: 'verified' },
              { num: '360° Bed Matrix', label: 'Real-Time Ward & ICU Census', icon: 'hotel' },
              { num: 'Zero Leakage', label: 'Itemized Billing & TPA Sync', icon: 'receipt_long' },
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

      {/* ── 2. ENTERPRISE HOSPITAL CORE PILLARS ── */}
      <section className="py-6 sm:py-8 lg:py-10 site-wrapper space-y-6 sm:space-y-8">
        <div className="text-center max-w-4xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#afecde]/70 text-[#00685e]">
            <span className="material-symbols-outlined text-sm">hub</span>
            ENTERPRISE ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Engineered for High-Pressure Hospital Operations
          </h2>
          <p className="text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
            Eliminate silos between clinical care, diagnostic labs, pharmacies, nursing stations, and accounts with real-time bi-directional synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: 'hotel',
              title: 'Visual IPD Bed Matrix',
              desc: 'Live interactive map of General Wards, Private Rooms, and ICUs. Monitor bed turnover, transfers, and provisional bill estimates in real time.',
            },
            {
              icon: 'emergency',
              title: '24/7 ER Trauma Triage',
              desc: 'Color-coded Red/Yellow/Green prioritization, 5-second emergency UHID dispatch, immediate bedside orders, and Code Blue alerts.',
            },
            {
              icon: 'receipt_long',
              title: 'Billing & Financial Command',
              desc: 'Itemized consolidated IPD/OPD billing, advance receipts, multi-tier refund approvals, custom tariffs, and direct Tally/GST sync.',
            },
            {
              icon: 'biotech',
              title: 'LIS Diagnostic Lab',
              desc: 'Barcode sample generation, bi-directional analyzer interfacing, delta check abnormal alerts, and automated pathologist e-Sign.',
            },
            {
              icon: 'analytics',
              title: 'Executive BI & Quality MIS',
              desc: '12+ analytical sub-modules tracking bed occupancy (BOR), length of stay (ALOS), department revenue, and NABH quality indicators.',
            },
            {
              icon: 'medication',
              title: 'FEFO Hospital Pharmacy',
              desc: 'First-Expiry-First-Out dispensing logic, ward indent sync, narcotic register audit compliance, and barcode checkout POS.',
            },
            {
              icon: 'shield',
              title: 'Cashless TPA & NHCX',
              desc: 'Cashless pre-auth tracker, insurance tariff masters, claim document checklists, and direct National Health Claims Exchange sync.',
            },
            {
              icon: 'assignment_ind',
              title: 'Digital Nursing MAR',
              desc: 'Medication Administration Records, hourly vitals flowsheets, fluid intake/output balances, and nurse shift handover logs.',
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

      {/* ── 3. INTERACTIVE 13 MODULES GRID & LIVE SIMULATOR ── */}
      <section id="hms-modules" className="py-4 sm:py-6 lg:py-8 bg-white/70 border-y border-[var(--t-border,#bcc9c6)]/30 scroll-mt-20">
        <div className="site-wrapper space-y-3 sm:space-y-4">
          <div className="text-center w-full mx-auto space-y-1 sm:space-y-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--t-primary,#00685e)]">
              13 ENTERPRISE HOSPITAL MODULES
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Explore the Complete OMEDO HMS Suite
            </h2>
            <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed max-w-2xl mx-auto">
              Click any module tab below to inspect its features and experience a live command simulation.
            </p>

            {/* 13 Module Grid Buttons */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
              {hmsModulesData.map((m, idx) => {
                const isSelected = activeModuleIdx === idx
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveModuleIdx(idx)}
                    className={`p-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-[var(--t-primary,#00685e)] text-white border-[var(--t-primary,#00685e)] shadow-md scale-[1.02]'
                        : 'bg-white hover:bg-[#f2fafb] text-[var(--t-text)] border-[var(--t-border)]/50'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-lg ${isSelected ? 'text-white' : 'text-[var(--t-primary,#00685e)]'}`}>
                      {m.icon}
                    </span>
                    <div className="text-[10.5px] font-bold truncate w-full leading-tight">
                      {m.name}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Module Deep-Dive & Live Simulator Container */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-7 border border-[var(--t-border,#bcc9c6)]/50 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left Column: Module Details */}
              <div className="lg:col-span-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#00685e] text-white flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-2xl">{activeModule.icon}</span>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#afecde] text-[#00685e] text-xs font-bold">
                    {activeModule.badge}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--t-primary,#00685e)]">
                      {activeModule.tag}
                    </span>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-[11px] font-medium text-slate-500">{activeModule.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--t-text,#121d1f)] mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {activeModule.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
                  {activeModule.desc}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-[var(--t-border,#bcc9c6)]/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--t-text,#121d1f)]">Hospital Capabilities:</h4>
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
                    <span>Schedule Hospital Demo</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Enterprise Simulator Screen */}
              <div className="lg:col-span-7 bg-[#f8fcfd] rounded-2xl border border-[var(--t-border,#bcc9c6)]/60 shadow-inner p-4 sm:p-6 flex flex-col justify-between min-h-[430px] overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#bcc9c6]/30 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[var(--t-primary,#00685e)]">
                    <span className="material-symbols-outlined text-base">{activeModule.icon}</span>
                    <span>OMEDO HMS Live Command — {activeModule.name}</span>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Enterprise Simulation
                  </span>
                </div>

                {/* Dynamic Screen Content */}
                <div className="py-4 flex-1">
                  {/* IPD Screen */}
                  {activeModule.id === 'ipd' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#00685e]">Live Ward &amp; Bed Census Matrix</h4>
                        <span className="text-[10px] text-slate-500">Auto-updated from Nursing Stations</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {sampleBeds.map((w) => (
                          <div key={w.ward} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800">{w.ward}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                {w.available} Free
                              </span>
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-600">
                              <span>Occupied: <strong>{w.occupied}/{w.total}</strong></span>
                              <span className="font-mono text-[10px] text-slate-400">{Math.round((w.occupied / w.total) * 100)}% Cap</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-[#00685e] h-full" style={{ width: `${(w.occupied / w.total) * 100}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Emergency Screen */}
                  {activeModule.id === 'emergency' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-rose-700 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">emergency</span>
                          24/7 ER Triage Command
                        </h4>
                        <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">Code Red Active</span>
                      </div>
                      <div className="space-y-2">
                        {sampleEmergencyTriage.map((t) => (
                          <div key={t.bay} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs shadow-2xs">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">{t.bay}</span>
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                                  t.level.includes('RED') ? 'bg-red-100 text-red-700' : t.level.includes('YELLOW') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {t.level}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-600 font-medium mt-0.5">{t.condition}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-mono text-[10px] text-slate-400">{t.patient}</div>
                              <div className="text-[10px] text-slate-500">{t.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pharmacy Screen */}
                  {activeModule.id === 'pharmacy' && (
                    <div className="space-y-3">
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs text-xs space-y-2">
                        <div className="flex justify-between items-center border-b pb-1.5 font-bold text-slate-800">
                          <span>Dispensary Inventory &amp; FEFO Batches</span>
                          <span className="text-[10px] text-slate-500 font-normal">First-Expiry-First-Out</span>
                        </div>
                        <div className="space-y-1.5 text-[11px]">
                          {samplePharmacyStocks.map((p) => (
                            <div key={p.batch} className="p-2 rounded-lg bg-slate-50 flex items-center justify-between">
                              <div>
                                <div className="font-bold text-slate-800">{p.drug}</div>
                                <div className="text-[10px] text-slate-500">Batch: {p.batch} • Exp: {p.expiry}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-[#00685e]">{p.stock}</div>
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

                  {/* Laboratory Screen */}
                  {activeModule.id === 'laboratory' && (
                    <div className="space-y-3">
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs text-xs space-y-2">
                        <div className="flex justify-between items-center border-b pb-1.5 font-bold text-slate-800">
                          <span>LIS Investigation Barcode Queue</span>
                          <span className="text-[10px] text-emerald-700 font-bold">Bi-Directional Sync</span>
                        </div>
                        <div className="space-y-1.5 text-[11px]">
                          {sampleLabOrders.map((l) => (
                            <div key={l.id} className="p-2 rounded-lg bg-slate-50 flex items-center justify-between">
                              <div>
                                <div className="font-bold text-slate-800">{l.test}</div>
                                <div className="text-[10px] text-slate-500">{l.patient} • #{l.id}</div>
                              </div>
                              <span className="text-[10px] font-bold text-[#00685e] px-2.5 py-0.5 rounded-full bg-[#afecde]">
                                {l.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Billing Screen */}
                  {activeModule.id === 'billing' && (
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-xs space-y-2">
                        <div className="flex justify-between font-bold text-slate-800 border-b pb-1.5">
                          <span>Consolidated IPD Itemized Final Invoice</span>
                          <span className="font-mono text-emerald-700">INV-2026-8819</span>
                        </div>
                        <div className="divide-y divide-slate-100 text-[11px]">
                          <div className="py-1.5 flex justify-between"><span>Bed &amp; ICU Charges (4 Days)</span><span className="font-bold">₹28,000</span></div>
                          <div className="py-1.5 flex justify-between"><span>Doctor &amp; Nursing Care Fee</span><span className="font-bold">₹45,000</span></div>
                          <div className="py-1.5 flex justify-between"><span>Pharmacy &amp; Consumables</span><span className="font-bold">₹18,500</span></div>
                          <div className="py-1.5 flex justify-between"><span>Diagnostic Pathology Lab</span><span className="font-bold">₹12,400</span></div>
                          <div className="py-2 flex justify-between font-bold text-[#00685e] text-xs border-t pt-2">
                            <span>Total Net Payable</span>
                            <span>₹1,03,900</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Default Preview Screen for Other Modules */}
                  {!['ipd', 'emergency', 'pharmacy', 'laboratory', 'billing'].includes(activeModule.id) && (
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-xs space-y-2">
                        <div className="flex justify-between font-bold text-slate-800 border-b pb-1.5">
                          <span>{activeModule.name} Workspace</span>
                          <span className="font-mono text-[#00685e]">Enterprise Mode</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {activeModule.desc}
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          {activeModule.features.slice(0, 4).map((f) => (
                            <div key={f} className="p-2 bg-slate-50 rounded text-[10px] font-bold text-slate-700 flex items-center gap-1.5">
                              <span className="text-emerald-600">✓</span>
                              <span className="truncate">{f}</span>
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
        </div>
      </section>

      {/* ── 4. END-TO-END HOSPITAL PATIENT JOURNEY FLOW ── */}
      <section className="py-6 sm:py-8 lg:py-10 site-wrapper space-y-6 sm:space-y-8">
        <div className="text-center max-w-4xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#afecde]/70 text-[#00685e]">
            <span className="material-symbols-outlined text-sm">timeline</span>
            CONNECTED CLINICAL ECOSYSTEM
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            The Seamless Patient Journey in OMEDO HMS
          </h2>
          <p className="text-sm text-[var(--t-text-secondary,#3d4947)] leading-relaxed">
            Every clinical event, pharmacy dispensation, diagnostic result, and procedure is automatically synchronized with the patient’s central longitudinal EHR and billing ledger.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {[
            { step: '01', title: 'Intake / ER Triage', desc: 'Patient arrives via OPD or 24/7 ER. Instant 5-sec UHID & ABHA QR binding.', icon: 'emergency' },
            { step: '02', title: 'Consult & Admission', desc: 'Doctor examination with clinical templates & direct admission advice.', icon: 'stethoscope' },
            { step: '03', title: 'Bed Allocation', desc: 'Admission desk assigns ward or ICU bed via visual matrix with advance receipt.', icon: 'hotel' },
            { step: '04', title: 'Pathology Diagnostics', desc: 'LIS investigation barcodes, bi-directional analyzer sync, and digital reports.', icon: 'biotech' },
            { step: '05', title: 'Nursing MAR & Care', desc: 'Hourly vitals flowsheet, medication administration, and doctor shift notes.', icon: 'assignment_ind' },
            { step: '06', title: 'TPA & Discharge', desc: 'Cashless pre-auth clearance, itemized invoice, and e-Signed discharge card.', icon: 'check_circle' },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-2xl p-4 border border-[var(--t-border,#bcc9c6)]/50 shadow-xs flex flex-col justify-between space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#00685e] bg-[#eaf6f8] px-2 py-0.5 rounded">
                  STEP {s.step}
                </span>
                <span className="material-symbols-outlined text-lg text-[#00685e]">{s.icon}</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {s.title}
                </h4>
                <p className="text-[11px] text-slate-600 leading-tight">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. NEED A LIGHTER CLINIC / POLYCLINIC SOLUTION? CROSS-LINK BANNER ── */}
      <section className="py-8 site-wrapper">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-[#85f5e6]">
              <span className="material-symbols-outlined text-sm">stethoscope</span>
              LOOKING FOR CLINIC / OPD SOFTWARE?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Operating an Outpatient Clinic or Polyclinic?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If your healthcare center does not require inpatient bed management or 24/7 hospital wards, explore our streamlined 5-module OMEDO Clinic Edition designed specifically for outpatient doctors.
            </p>
          </div>
          <Link
            to="/omedo-clinic"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#00685e] text-white shadow-md hover:bg-[#005149] hover:scale-[1.02] transition-all"
          >
            <span>Explore OMEDO Clinic (5 Modules)</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* ── 6. FREQUENTLY ASKED QUESTIONS (HOSPITAL SPECIFIC) ── */}
      <section className="pt-6 sm:pt-8 pb-3 sm:pb-4 site-wrapper space-y-4 sm:space-y-5">
        <div className="text-center w-full max-w-4xl mx-auto space-y-1.5">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--t-primary,#00685e)]">
            HOSPITAL IT &amp; GOVERNANCE FAQS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Frequently Asked Questions for Hospitals
          </h2>
          <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)]">
            Technical, clinical, and operational answers for Hospital Directors and Medical Superintendents.
          </p>
        </div>

        <div className="w-full max-w-5xl xl:max-w-6xl mx-auto space-y-2">
          {hmsFaqs.map((faq, idx) => {
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

      {/* ── 7. TRUSTED BY LEADING INSTITUTIONS CONTAINER (FROM HOME) ── */}
      <section
        className="py-12 sm:py-14 md:py-16 my-6 sm:my-8 relative overflow-hidden shadow-2xl transition-all duration-500 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${trustedByBg})`,
          backgroundColor: '#07152d',
          borderTop: '1px solid rgba(245, 158, 11, 0.28)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.22)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05), 0 18px 36px -12px rgba(7, 21, 45, 0.5)',
        }}
      >
        {/* Subtle Ambient Radial Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(7, 21, 45, 0.4) 0%, rgba(7, 21, 45, 0.8) 100%)',
          }}
        />

        {/* Content Header */}
        <div className="site-wrapper text-center relative z-10 space-y-2 sm:space-y-3 mb-8 sm:mb-10">
          <p
            className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow-sm"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            TRUSTED BY LEADING INSTITUTIONS
          </p>

          <h2
            className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-extrabold text-white tracking-tight drop-shadow-md"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Healthcare Organizations &amp; Medical Centers
          </h2>

          <p
            className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide max-w-xl mx-auto text-blue-100/90"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Hospitals &nbsp;<span className="text-amber-300 font-normal">•</span>&nbsp; Specialty Clinics &nbsp;<span className="text-amber-300 font-normal">•</span>&nbsp; Diagnostic Centers Across India
          </p>

          {/* Glowing Indicator Accent Bars */}
          <div className="flex items-center justify-center gap-1.5 pt-0.5">
            <span className="w-6 h-1 rounded-full bg-white/25" />
            <span className="w-11 h-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
            <span className="w-6 h-1 rounded-full bg-white/25" />
          </div>
        </div>

        {/* ── CLIENT LOGOS CAROUSEL / TICKER AS SEEN IN REFERENCE IMAGE ── */}
        {activeClients.length > 0 && (
          <div className="relative w-full overflow-hidden z-10 py-2">
            {/* Edge Blur / Fade Mask Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#07152d]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#07152d]/80 to-transparent z-20 pointer-events-none" />

            {/* Continuous Infinite Ticker Row (Boundaryless Clean Logos) */}
            <div className="flex w-max animate-omedo-marquee items-center gap-6 sm:gap-10 md:gap-12 px-4">
              {loopedClients.map((client, idx) => (
                <div
                  key={`${client.id || idx}-${idx}`}
                  className="flex flex-col items-center shrink-0 group transition-transform duration-300 hover:scale-105 px-1 sm:px-1.5"
                >
                  {/* Uniform 4:3 Ratio Card (Borderless Edge-to-Edge with Hover Overlay) */}
                  <div className="relative w-32 sm:w-36 md:w-40 aspect-[4/3] rounded-2xl shadow-md flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 cursor-pointer">
                    <SafeImage
                      src={client.logoUrl}
                      alt={client.name}
                      className="w-full h-full object-fill select-none rounded-2xl transition-transform duration-300 group-hover:scale-105"
                      fallback={
                        <div
                          className="w-full h-full rounded-2xl flex items-center justify-center text-xs sm:text-sm font-black tracking-wider text-white shadow-inner p-2 text-center"
                          style={{ background: client.badgeColor || '#00685e' }}
                        >
                          {client.logoText || (client.name || 'HOSPITAL').slice(0, 10).toUpperCase()}
                        </div>
                      }
                    />

                    {/* Dark Frosted Hover Overlay with Purple Pin and Location */}
                    <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 z-10 select-none">
                      <span className="material-symbols-outlined text-[#a855f7] text-xl sm:text-2xl drop-shadow-md mb-0.5">
                        location_on
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-black uppercase text-white tracking-wider text-center leading-tight drop-shadow-md px-1 line-clamp-2">
                        {client.location || client.name || 'INDIA'}
                      </span>
                    </div>
                  </div>

                  {/* Client Name Label Below (Uniform Fixed Width Matching 4:3 Card) */}
                  <p className="text-[10px] sm:text-[11px] font-semibold text-center truncate mt-2.5 w-32 sm:w-36 md:w-40 transition-colors tracking-wide text-blue-100/90 group-hover:text-amber-300 drop-shadow-sm">
                    {client.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── 8. FINAL HIGH-IMPACT CTA ── */}
      <section className="pt-2 sm:pt-3 pb-8 sm:pb-12 site-wrapper">
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[var(--t-border,#bcc9c6)]/60 shadow-xl text-center space-y-4 w-full max-w-5xl xl:max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#afecde]/70 text-[#00685e]">
            <span className="material-symbols-outlined text-sm">domain</span>
            ENTERPRISE DEPLOYMENT &amp; ONBOARDING
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--t-text,#121d1f)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ready to Upgrade Your Hospital Operations?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--t-text-secondary,#3d4947)] max-w-2xl mx-auto leading-relaxed">
            Schedule a customized architecture walkthrough with our hospital solutions engineers. We assess your facility workflows, bed count, and system integrations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-md hover:scale-[1.02] transition-all"
              style={{ background: 'var(--t-primary, #00685e)' }}
            >
              <span>Request Hospital Demo &amp; SOW</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
            <a
              href="tel:+917457912924"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-slate-50 hover:bg-slate-100 text-[var(--t-primary,#00685e)] border border-slate-200 transition-all"
            >
              <span className="material-symbols-outlined text-base">call</span>
              <span>Enterprise Sales: +91 74579 12924</span>
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
