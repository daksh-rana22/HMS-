import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'
import ABHAExplanationContainer from '../../components/sections/ABHAExplanationContainer'

const fadeUp = {
  hidden: { opacity: 0, y: 44, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.22 } } }

const milestonesData = [
  {
    id: 'M1',
    badge: 'MILESTONE 1',
    title: 'ABHA Creation & Registration',
    subtitle: 'Digital Health Identity Generation & Legacy UHID Mapping',
    icon: 'badge',
    status: 'NHA M1 Certified',
    color: 'var(--t-primary)',
    bgGradient: 'linear-gradient(135deg, color-mix(in srgb, var(--t-primary) 12%, transparent) 0%, transparent 100%)',
    highlights: [
      {
        title: 'Instant ABHA Number Generation',
        desc: 'Generate 14-digit ABHA numbers instantly at OPD/IPD desks via Aadhaar OTP or Mobile OTP verification.',
        icon: 'fingerprint',
      },
      {
        title: 'Custom ABHA Address (@abdm)',
        desc: 'Configure unique PHR handles (e.g. name@abdm) for easy patient lookup across national health portals.',
        icon: 'alternate_email',
      },
      {
        title: 'Automated UHID Sync',
        desc: 'Seamlessly bind your hospital’s existing internal UHID with the patient’s national ABHA ID.',
        icon: 'link',
      },
      {
        title: 'Digital Health Card Printing',
        desc: 'Print physical or digital ABHA cards with scannable QR codes directly from the registration counter.',
        icon: 'qr_code_2',
      },
    ],
    technicalDetails: 'Supports NHA API v2.0 for Demographic Verification, Aadhaar e-KYC, and Resend OTP handling with fallback protocols.',
  },
  {
    id: 'M2',
    title: 'Health Records Exchange (HIP & HIU)',
    badge: 'MILESTONE 2',
    subtitle: 'Digitizing EMR, Prescriptions, Lab Reports & Clinical Artifacts',
    icon: 'folder_shared',
    status: 'NHA M2 Certified',
    color: 'var(--t-primary-mid)',
    bgGradient: 'linear-gradient(135deg, color-mix(in srgb, var(--t-primary-mid) 12%, transparent) 0%, transparent 100%)',
    highlights: [
      {
        title: 'HIP (Health Info Provider) Engine',
        desc: 'Automatically push OPD prescriptions, lab reports, discharge summaries, and radiology imaging to NHA records repository.',
        icon: 'cloud_upload',
      },
      {
        title: 'HIU (Health Info User) Desk',
        desc: 'Fetch past medical histories, diagnostic trends, and vaccination logs from other ABDM-linked facilities during consultations.',
        icon: 'manage_search',
      },
      {
        title: 'FHIR R4 Data Standard',
        desc: 'Clinical data is formatted using international FHIR R4 & HL7 standards for 100% interoperability.',
        icon: 'data_object',
      },
      {
        title: 'Diagnostic LIS & RIS Linkage',
        desc: 'Pathology test results and DICOM radiology scans are automatically tagged with ABHA record tokens.',
        icon: 'biotech',
      },
    ],
    technicalDetails: 'Uses standardized SNOMED CT and LOINC clinical terminology code sets embedded inside FHIR bundle payloads.',
  },
  {
    id: 'M3',
    title: 'Consent Management & Full Compliance',
    badge: 'MILESTONE 3',
    subtitle: 'Patient-Centric Digital Consent Gateway & Ecosystem Integration',
    icon: 'verified_user',
    status: 'NHA M3 Certified',
    color: 'var(--t-primary)',
    bgGradient: 'linear-gradient(135deg, color-mix(in srgb, var(--t-primary) 12%, transparent) 0%, transparent 100%)',
    highlights: [
      {
        title: 'NHA Consent Manager Protocol',
        desc: 'Doctors request access to past records; patients receive instant push notifications to approve or decline via their PHR app.',
        icon: 'security',
      },
      {
        title: 'Granular Time & Purpose Controls',
        desc: 'Patient consents are strictly time-bound and purpose-specific (e.g. 24-hour access for emergency consultation).',
        icon: 'timer',
      },
      {
        title: 'PHR App Synchronization',
        desc: 'Compatible with popular Personal Health Record apps including Aarogya Setu, ABHA App, and insurance portals.',
        icon: 'smartphone',
      },
      {
        title: 'Immutable Audit Trail & Encryption',
        desc: 'End-to-end AES-256 bit encryption ensures medical data is unreadable in transit and fully logged for audit compliance.',
        icon: 'lock_reset',
      },
    ],
    technicalDetails: 'Implements Diffie-Hellman Key Exchange (ECDH) for secure peer-to-peer clinical data transfer between HIP and HIU endpoints.',
  },
]

const abdmArchitectureComponents = [
  {
    title: 'ABHA Health ID',
    desc: 'National 14-digit health identification number providing citizens a single digital health profile across all healthcare providers.',
    icon: 'badge',
    badge: 'PATIENT IDENTIFIER',
  },
  {
    title: 'Healthcare Professionals Registry (HPR)',
    desc: 'Comprehensive repository of verified medical practitioners (doctors, nurses) across modern and traditional medicine systems.',
    icon: 'stethoscope',
    badge: 'PRACTITIONER DIRECTORY',
  },
  {
    title: 'Health Facility Registry (HFR)',
    desc: 'Repository of all registered public and private healthcare facilities including hospitals, clinics, diagnostic centers, and pharmacies.',
    icon: 'domain',
    badge: 'FACILITY DIRECTORY',
  },
  {
    title: 'Health Information Exchange (HIE-CM)',
    desc: 'Network enabling secure, consent-based routing of encrypted digital health records between certified HIPs and HIUs.',
    icon: 'hub',
    badge: 'CONSENT GATEWAY',
  },
]

const abdmFaqs = [
  {
    q: 'What is ABDM and why is it mandatory/important for hospitals in India?',
    a: 'Ayushman Bharat Digital Mission (ABDM) is a nationwide digital health infrastructure initiative launched by the Government of India (National Health Authority - NHA). It establishes an interoperable digital health ecosystem across India. Integrating ABDM enables hospitals to issue 14-digit ABHA numbers, link longitudinal Electronic Health Records (EHR), enable instant QR-code Scan & Share registration, reduce OPD wait times by up to 70%, and fulfill government compliance mandates for NABH accreditation and NHA Digital Health Incentive Schemes (DHIS).',
  },
  {
    q: 'What is the difference between ABHA Number, ABHA Address, and Hospital UHID?',
    a: 'ABHA Number is a unique 14-digit national identifier (e.g., 91-4829-1048-5729) linked to Aadhaar or Mobile for citizen identification across India. ABHA Address is a virtual handle (e.g., patientname@abdm) used in Personal Health Record (PHR) mobile applications to receive, approve, and route clinical health data. Hospital UHID is your internal Unique Health Identification number. Omedo HMS automatically performs dual-binding—mapping your hospital’s internal UHID directly to the patient’s ABHA ID so existing hospital billing, EMR, and OPD workflows remain completely undisturbed.',
  },
  {
    q: 'What are ABDM Milestones M1, M2, and M3, and how does Omedo HMS implement them?',
    a: 'Milestone 1 (M1 - Health ID Creation & Verification) enables instant creation of ABHA numbers via Aadhaar/Mobile OTP and links ABHA to OPD/IPD registrations. Milestone 2 (M2 - Health Information Provider / HIP) converts prescriptions, diagnostic reports, lab test results, and discharge summaries into standardized FHIR R4 JSON bundles and pushes them to the ABDM gateway upon patient consent. Milestone 3 (M3 - Health Information User / HIU) allows authorized hospital clinicians to dispatch digital consent requests to patient PHR apps and view historical medical records from other hospitals. Omedo HMS is fully certified and production-ready for all three milestones.',
  },
  {
    q: 'How does the Consent Manager (HIP/HIU) framework protect patient privacy?',
    a: 'ABDM operates on a strict "Consent-First" architecture governed by the NHA Consent Gateway and compliant with India’s Digital Personal Data Protection (DPDP) Act. When a doctor requests a patient’s historical records, a digital consent request specifying data types (e.g., past 6 months prescriptions & lab reports), purpose of request, and expiration date is dispatched to the patient’s mobile PHR app (such as Aarogya Setu or ABHA App). Medical records are decrypted and transmitted peer-to-peer via AES-256 encryption ONLY after the patient grants explicit digital approval. Patients can grant, deny, or revoke consent at any time.',
  },
  {
    q: 'What is Scan & Share (Express OPD Check-in) and how does it reduce hospital queues?',
    a: 'Scan & Share allows patients arriving at hospital OPD counters to scan a designated NHA QR code displayed at registration desks using their ABHA or Aarogya Setu app. The patient’s verified demographic details (Name, Age, Gender, Address, ABHA ID) are instantly transmitted to Omedo HMS, auto-filling the OPD registration form in less than 10 seconds. This eliminates manual data entry errors, reduces OPD queue waiting times by up to 70%, and dramatically boosts daily patient throughput.',
  },
  {
    q: 'What FHIR R4 clinical data types are supported for electronic health record exchange?',
    a: 'Omedo HMS natively formats and validates clinical records according to the National Resource Center for EHR Standards (NRCeS) FHIR R4 profiles. Supported health document types include OPD Prescriptions, Diagnostic & Radiology Reports, Pathology Lab Results, Immunization Records, Discharge Summaries, and Clinical Consultation Notes. All data bundles are serialized into standard JSON/XML FHIR resources before encrypted transmission over the ABDM Gateway.',
  },
  {
    q: 'How does ABDM integration accelerate Insurance, TPA, and Cashless Claim Settlements?',
    a: 'With digitized prescriptions, diagnostic reports, and discharge summaries formatted in standardized FHIR formats, insurance providers and Third-Party Administrators (TPAs) integrated into the National Health Claims Exchange (NHCX) can instantly verify diagnosis reports, itemized billing, and treatment histories. This speeds up pre-authorization approvals from days to minutes, reduces claim rejection rates caused by missing paper files, and streamlines cashless discharge clearances.',
  },
  {
    q: 'Is patient health data stored centrally on NHA/Government servers?',
    a: 'No. ABDM follows a federated, decentralized architecture. The NHA gateway does NOT store any clinical records or medical histories on central government servers. Health records reside safely within your hospital’s secure Omedo HMS database. The ABDM Gateway acts purely as a secure routing and consent switchboard that facilitates encrypted peer-to-peer data transfer directly between the source hospital (HIP) and requesting doctor (HIU) only when explicit digital consent is active.',
  },
  {
    q: 'What security standards are implemented to protect health data in transit and at rest?',
    a: 'Omedo HMS implements military-grade security protocols for ABDM operations: Data at Rest is protected with AES-256 bit encryption for all patient medical records, lab reports, and cryptographic keys. Data in Transit uses TLS 1.3 encryption and Diffie-Hellman Key Exchange (ECDH) for peer-to-peer payload transfers. API Authentication utilizes OAuth 2.0 with JSON Web Tokens (JWT) for secure communication with NHA Sandbox and Production gateways, ensuring full adherence to ISO 27001, HIPAA, and DPDP Act guidelines.',
  },
  {
    q: 'How long does it take for a hospital to complete ABDM integration and onboarding?',
    a: 'With Omedo HMS, complete ABDM onboarding typically takes 3 to 7 business days. Our dedicated technical onboarding team manages the entire end-to-end process: registering your facility on the Health Facility Registry (HFR), verifying doctors on the Healthcare Professionals Registry (HPR), executing NHA Sandbox testing suite milestones (M1, M2, M3), and issuing your NHA Production Production Keys with zero downtime to ongoing hospital operations.',
  },
  {
    q: 'What happens if the internet connection or NHA Gateway goes down during OPD hours?',
    a: 'Omedo HMS features an intelligent Offline Fallback Mode. If internet connectivity drops or NHA servers experience temporary maintenance, hospital registration, consultation, billing, and clinical workflows continue operating uninterrupted in offline mode using local UHID generation. Once connectivity is restored, Omedo HMS automatically queues and synchronizes pending ABHA linkages and FHIR document signatures in the background.',
  },
  {
    q: 'Can doctors sign digital prescriptions and medical records using ABDM e-Sign?',
    a: 'Yes. Omedo HMS supports Digital Signature Certificate (DSC) and Aadhaar-based e-Sign integration for doctors registered on the Healthcare Professionals Registry (HPR). Every prescription and discharge summary generated in Omedo HMS is cryptographically signed by the treating physician, ensuring legal validity under the Information Technology Act and NHA guidelines.',
  },
]

export default function ABDM() {
  const [activeTab, setActiveTab] = useState('M1')
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveTab((prev) => {
        if (prev === 'M1') return 'M2'
        if (prev === 'M2') return 'M3'
        return 'M1'
      })
    }, 4000)
    return () => clearTimeout(timer)
  }, [activeTab])

  const currentMilestone = milestonesData.find((m) => m.id === activeTab) || milestonesData[0]

  return (
    <motion.div {...pageTransition} className="min-h-screen pt-16 sm:pt-20 lg:pt-24 pb-12" style={{ background: 'var(--t-bg, #effcfe)' }}>
      {/* ── 1. HERO BANNER ── */}
      <section className="relative overflow-hidden pt-2 pb-6 sm:pb-8 border-b" style={{ borderColor: 'var(--t-border-light)' }}>
        {/* ── ABDM Ambient Glow Background ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, var(--t-hero-glow, rgba(0,180,162,0.18)) 0%, transparent 70%)',
          }}
        />

        <div className="site-wrapper relative z-10 px-2 sm:px-4 lg:px-6 max-w-[96%] xl:max-w-[1440px]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-3 xl:gap-4">
            
            {/* ── LEFT IMAGE (Desktop only) ── */}
            <div className="hidden lg:flex w-full max-w-[280px] xl:max-w-[360px] shrink-0 order-1 items-center justify-center">
              <img
                src="/images/abdm_logo_bg.svg"
                alt="Ayushman Bharat Digital Mission Emblem Left"
                className="w-full h-auto object-contain filter drop-shadow-lg select-none"
              />
            </div>

            {/* ── CENTER HERO CONTENT ── */}
            <div className="flex-1 max-w-3xl mx-auto text-center order-1 lg:order-2 relative">
              {/* ── ABDM Emblem Background Watermark for Mobile POV (Centered directly behind text) ── */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 sm:opacity-25 lg:hidden z-0 overflow-hidden select-none">
                <img
                  src="/images/abdm_logo_bg.svg"
                  alt="Ayushman Bharat Digital Mission Emblem Mobile Background"
                  className="w-full max-w-[320px] sm:max-w-[420px] h-auto object-contain filter drop-shadow-md transform scale-110"
                />
              </div>

              <div className="relative z-10 space-y-4 sm:space-y-6">
                {/* Top Badges */}
                <motion.div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border bg-white/90 backdrop-blur-md shadow-sm"
                  style={{ borderColor: 'color-mix(in srgb, var(--t-primary) 30%, transparent)' }}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                >
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-bold tracking-wide" style={{ color: 'var(--t-primary)' }}>
                    NATIONAL HEALTH AUTHORITY (NHA) · ABDM &amp; ABHA READY
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight px-1"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                >
                  Transform Hospital Connectivity with{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'var(--t-gradient-text, linear-gradient(135deg, var(--t-primary) 0%, var(--t-accent) 100%))' }}
                  >
                    ABDM &amp; ABHA Integration
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className="text-xs sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto px-1"
                  style={{ color: 'var(--t-text-secondary)' }}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                >
                  Empower your hospital with India’s Ayushman Bharat Digital Mission. Enable digital health identity creation, consent-driven record sharing, and certified M1, M2 &amp; M3 milestone compliance directly within Omedo HMS.
                </motion.p>

                {/* CTAs (Side-by-side row on mobile) */}
                <motion.div
                  className="flex flex-row items-center justify-center gap-2 sm:gap-3.5 pt-1 sm:pt-2"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 sm:gap-2 text-white px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-[11px] sm:text-sm font-bold transition-all duration-200 hover:scale-[1.03] whitespace-nowrap shadow-md"
                    style={{
                      background: 'var(--t-primary)',
                      boxShadow: '0 4px 20px var(--t-btn-shadow)',
                    }}
                  >
                    <span>Book ABDM Demo</span>
                    <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                  </Link>
                  <a
                    href="#milestones-explorer"
                    className="inline-flex items-center gap-1 sm:gap-2 bg-white/90 backdrop-blur-sm border px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-[11px] sm:text-sm font-semibold hover:bg-white transition-all duration-200 shadow-sm whitespace-nowrap"
                    style={{
                      borderColor: 'var(--t-border)',
                      color: 'var(--t-primary)',
                    }}
                  >
                    <span className="material-symbols-outlined text-xs sm:text-sm">explore</span>
                    <span>Explore Milestones</span>
                  </a>
                </motion.div>
              </div>

            </div>

            {/* ── RIGHT IMAGE (Desktop only) ── */}
            <div className="hidden lg:flex w-full max-w-[280px] xl:max-w-[360px] shrink-0 order-3 items-center justify-center">
              <img
                src="/images/abdm_logo_bg.svg"
                alt="Ayushman Bharat Digital Mission Emblem Right"
                className="w-full h-auto object-contain filter drop-shadow-lg select-none"
              />
            </div>

          </div>

          {/* ── 4 Full-Width Key Capability Cards (Below Hero Row) ── */}
          <motion.div
            className="mt-4 sm:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {[
              {
                label: 'Instant ABHA Creation',
                desc: 'Generate 14-digit ABHA numbers via Aadhaar & Mobile OTP',
                icon: 'fingerprint',
                color: 'var(--t-primary)',
              },
              {
                label: 'FHIR R4 Data Exchange',
                desc: 'Standardized clinical data format for 100% interoperability',
                icon: 'sync_alt',
                color: 'var(--t-primary-mid)',
              },
              {
                label: 'Consent Manager Gateway',
                desc: 'Patient-controlled digital consent approval system',
                icon: 'verified_user',
                color: 'var(--t-primary-dark)',
              },
              {
                label: 'AES-256 Encrypted Records',
                desc: 'End-to-end encrypted medical record archival & logging',
                icon: 'lock',
                color: 'var(--t-primary)',
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="p-3 sm:p-5 rounded-xl sm:rounded-2xl border shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-2 sm:gap-3.5"
                style={{
                  borderColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)',
                  background: 'var(--t-surface, #fff)',
                }}
              >
                <div
                  className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
                  style={{
                    background: 'color-mix(in srgb, var(--t-primary) 10%, transparent)',
                    borderColor: 'color-mix(in srgb, var(--t-primary) 25%, transparent)',
                    color: item.color,
                  }}
                >
                  <span className="material-symbols-outlined text-lg sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {item.icon}
                  </span>
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-sm font-extrabold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
                    {item.label}
                  </h4>
                  <p className="text-[10px] sm:text-xs leading-snug mt-0.5 sm:mt-1" style={{ color: 'var(--t-text-secondary)' }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. WHAT IS ABDM? (EXPLANATION & OVERVIEW) ── */}
      <section className="py-8 sm:py-12 site-wrapper">
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 space-y-3">
          <span
            className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border inline-block"
            style={{
              background: 'color-mix(in srgb, var(--t-primary) 10%, transparent)',
              borderColor: 'color-mix(in srgb, var(--t-primary) 25%, transparent)',
              color: 'var(--t-primary)',
            }}
          >
            OVERVIEW &amp; ECOSYSTEM
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
            What is ABDM? (Ayushman Bharat Digital Mission)
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--t-text-secondary)' }}>
            Ayushman Bharat Digital Mission (ABDM) is a landmark healthcare infrastructure initiative by the <strong>Government of India (National Health Authority - NHA)</strong> aimed at developing the backbone necessary to support integrated digital health infrastructure across the country.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 sm:mb-10"
        >
          {[
            {
              title: 'ABHA Health Account',
              tag: 'DIGITAL IDENTITY',
              desc: 'A unique 14-digit health ID assigned to citizens to link, store, and access medical records across any certified healthcare provider in India.',
              icon: 'badge',
              color: 'var(--t-primary)',
            },
            {
              title: 'Healthcare Registry (HPR)',
              tag: 'DOCTOR DIRECTORY',
              desc: 'A verified national registry of doctors, surgeons, and healthcare practitioners across modern and traditional medicine systems.',
              icon: 'stethoscope',
              color: 'var(--t-primary-mid)',
            },
            {
              title: 'Facility Registry (HFR)',
              tag: 'HOSPITAL DIRECTORY',
              desc: 'A repository of verified public & private hospitals, diagnostic laboratories, clinics, and pharmacies across India.',
              icon: 'domain',
              color: 'var(--t-primary-dark)',
            },
            {
              title: 'Consent Manager (HIE)',
              tag: 'CONSENT GATEWAY',
              desc: 'A secure consent framework ensuring patient health records are encrypted and shared ONLY after digital patient approval.',
              icon: 'security',
              color: 'var(--t-primary)',
            },
          ].map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              className="p-6 rounded-2xl border bg-white/80 backdrop-blur-sm shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
              style={{
                background: 'var(--t-surface, #fff)',
                borderColor: 'var(--t-border-light)',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs"
                    style={{
                      background: 'color-mix(in srgb, var(--t-primary) 10%, transparent)',
                      borderColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)',
                      color: pillar.color,
                    }}
                  >
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {pillar.icon}
                    </span>
                  </div>
                  <span
                    className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
                    style={{
                      background: 'color-mix(in srgb, var(--t-primary) 8%, transparent)',
                      borderColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)',
                      color: 'var(--t-primary)',
                    }}
                  >
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-base font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
                  {pillar.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--t-text-secondary)' }}>
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-3 border-t flex items-center gap-1 text-[11px] font-bold" style={{ borderColor: 'var(--t-border-light)', color: 'var(--t-primary)' }}>
                <span>NHA Standard</span>
                <span className="material-symbols-outlined text-xs">verified</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Traditional vs ABDM Transformation Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.15 }}
          variants={fadeUp}
          className="rounded-3xl border p-6 sm:p-10 shadow-md overflow-hidden relative"
          style={{
            background: 'var(--t-surface, #fff)',
            borderColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)',
          }}
        >
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--t-primary)] mb-1 block">
              TRANSFORMING HEALTHCARE WORKFLOWS
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
              How ABDM Changes the Hospital &amp; Patient Experience
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Healthcare */}
            <div
              className="p-5 sm:p-6 rounded-2xl border space-y-4"
              style={{
                background: 'color-mix(in srgb, var(--t-surface-low) 80%, white)',
                borderColor: 'var(--t-border-light)',
              }}
            >
              <div className="flex items-center gap-2 text-rose-600 font-extrabold text-sm uppercase tracking-wide">
                <span className="material-symbols-outlined text-lg">cancel</span>
                Traditional Paper-Based System
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--t-text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-rose-500 text-sm shrink-0 mt-0.5">remove_circle</span>
                  <span>Patients carry physical paper files, lost prescriptions &amp; printed lab reports.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-rose-500 text-sm shrink-0 mt-0.5">remove_circle</span>
                  <span>Long OPD registration queues for manual demographic entry.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-rose-500 text-sm shrink-0 mt-0.5">remove_circle</span>
                  <span>No visibility into patient medical history during emergency consultations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-rose-500 text-sm shrink-0 mt-0.5">remove_circle</span>
                  <span>Manual insurance claims and slower pre-authorization processing.</span>
                </li>
              </ul>
            </div>

            {/* ABDM-Enabled System */}
            <div
              className="p-5 sm:p-6 rounded-2xl border space-y-4"
              style={{
                background: 'color-mix(in srgb, var(--t-primary) 6%, white)',
                borderColor: 'color-mix(in srgb, var(--t-primary) 30%, transparent)',
              }}
            >
              <div className="flex items-center gap-2 font-extrabold text-sm uppercase tracking-wide" style={{ color: 'var(--t-primary)' }}>
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                ABDM Enabled with Omedo HMS
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--t-text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm shrink-0 mt-0.5" style={{ color: 'var(--t-primary)' }}>check</span>
                  <span>100% digital health records linked to patient's 14-digit ABHA ID.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm shrink-0 mt-0.5" style={{ color: 'var(--t-primary)' }}>check</span>
                  <span>70% faster registration with instant Scan &amp; Share QR code check-in.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm shrink-0 mt-0.5" style={{ color: 'var(--t-primary)' }}>check</span>
                  <span>Instant access to past medical history via digital patient consent.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm shrink-0 mt-0.5" style={{ color: 'var(--t-primary)' }}>check</span>
                  <span>Standardized FHIR R4 data formats for fast cashless insurance clearance.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 3. COMPREHENSIVE ABHA EXPLANATION & HEALTH CARD CONTAINER ── */}
      <ABHAExplanationContainer />

      {/* ── 3. INTERACTIVE MILESTONES EXPLORER (M1, M2, M3 DEEP DIVE) ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.15 }}
        variants={fadeUp}
        id="milestones-explorer"
        className="py-8 sm:py-12 site-wrapper scroll-mt-24"
      >
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 space-y-3">
          <span
            className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border inline-block"
            style={{
              background: 'color-mix(in srgb, var(--t-primary) 10%, transparent)',
              borderColor: 'color-mix(in srgb, var(--t-primary) 25%, transparent)',
              color: 'var(--t-primary)',
            }}
          >
            ABDM CERTIFICATION ROADMAP
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}
          >
            Deep Dive into Integration Milestones
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--t-text-secondary)' }}>
            Click on any milestone to explore detailed feature capabilities, technical API specifications, and clinical workflows.
          </p>
          <div className="flex items-center justify-center gap-2 pt-1">
            <span
              className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1.5"
              style={{
                background: 'color-mix(in srgb, var(--t-primary) 8%, transparent)',
                borderColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)',
                color: 'var(--t-primary)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Auto-advancing every 4 seconds
            </span>
          </div>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 flex-wrap">
          {milestonesData.map((m) => {
            const isActive = activeTab === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveTab(m.id)}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer shadow-sm border"
                style={{
                  background: isActive ? 'var(--t-primary)' : 'var(--t-surface, #fff)',
                  color: isActive ? '#ffffff' : 'var(--t-text)',
                  borderColor: isActive ? 'var(--t-primary)' : 'var(--t-border-light)',
                  boxShadow: isActive ? '0 4px 20px var(--t-btn-shadow)' : 'none',
                }}
              >
                <span
                  className="w-6 h-6 rounded-lg text-[11px] flex items-center justify-center font-black"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'color-mix(in srgb, var(--t-primary) 15%, transparent)',
                    color: isActive ? '#ffffff' : 'var(--t-primary)',
                  }}
                >
                  {m.id}
                </span>
                <span>{m.title.split(' ')[0]} {m.title.split(' ')[1]}</span>
                {isActive && (
                  <span className="material-symbols-outlined text-sm text-white">check_circle</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Milestone Detail Display Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMilestone.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-3xl border shadow-lg overflow-hidden"
            style={{
              background: 'var(--t-surface, #fff)',
              borderColor: 'color-mix(in srgb, var(--t-primary) 25%, transparent)',
            }}
          >
            {/* Box Header */}
            <div
              className="p-6 sm:p-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-4"
              style={{
                background: currentMilestone.bgGradient,
                borderColor: 'var(--t-border-light)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md text-white border border-white/30"
                  style={{ background: 'var(--t-primary)' }}
                >
                  <span className="material-symbols-outlined text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {currentMilestone.icon}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full text-white"
                      style={{ background: 'var(--t-primary)' }}
                    >
                      {currentMilestone.badge}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-white/80"
                      style={{ color: 'var(--t-primary-dark)', borderColor: 'color-mix(in srgb, var(--t-primary) 30%, transparent)' }}
                    >
                      ✓ {currentMilestone.status}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
                    {currentMilestone.title}
                  </h3>
                  <p className="text-xs sm:text-sm mt-0.5 font-medium" style={{ color: 'var(--t-text-secondary)' }}>
                    {currentMilestone.subtitle}
                  </p>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full text-white shadow-sm self-start md:self-auto transition-transform hover:scale-105"
                style={{ background: 'var(--t-primary)' }}
              >
                <span>Request {currentMilestone.id} Integration</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Highlights Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentMilestone.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border bg-white/60 backdrop-blur-sm transition-all hover:shadow-md flex items-start gap-3.5"
                    style={{
                      borderColor: 'var(--t-border-light)',
                      background: 'color-mix(in srgb, var(--t-surface-low) 50%, white)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
                      style={{
                        background: 'color-mix(in srgb, var(--t-primary) 12%, transparent)',
                        borderColor: 'color-mix(in srgb, var(--t-primary) 25%, transparent)',
                        color: 'var(--t-primary)',
                      }}
                    >
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: 'var(--t-text-secondary)' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Specifications Note */}
              <div
                className="p-4 rounded-xl border flex items-center gap-3 text-xs"
                style={{
                  background: 'color-mix(in srgb, var(--t-primary) 6%, white)',
                  borderColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)',
                  color: 'var(--t-text-secondary)',
                }}
              >
                <span className="material-symbols-outlined text-lg shrink-0" style={{ color: 'var(--t-primary)' }}>
                  code
                </span>
                <div>
                  <span className="font-bold text-[var(--t-text)]">Technical Architecture Note: </span>
                  {currentMilestone.technicalDetails}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* ── 3. SAMPLE DIGITAL ABHA CARD SIMULATOR ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.15 }}
        variants={fadeUp}
        className="py-8 sm:py-12 border-y relative overflow-hidden"
        style={{ background: 'color-mix(in srgb, var(--t-surface-mid) 40%, transparent)', borderColor: 'var(--t-border-light)' }}
      >
        <div className="site-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Explanation */}
            <div
              className="lg:col-span-6 space-y-5 relative p-6 sm:p-8 rounded-3xl overflow-hidden border shadow-sm"
              style={{
                background: 'color-mix(in srgb, var(--t-surface, #fff) 90%, transparent)',
                borderColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)',
              }}
            >
              {/* Background Image Graphic directly behind the text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 sm:opacity-25 z-0 select-none overflow-hidden p-4">
                <img
                  src="/images/64ba7cd9ea0a30cccbc515d6_aa.svg"
                  alt="ABHA Card in Hand Graphic"
                  className="w-full max-w-[480px] sm:max-w-[550px] h-auto object-contain filter drop-shadow-md transform scale-105"
                />
              </div>

              <div className="relative z-10 space-y-5">
                <span
                  className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border inline-block"
                  style={{
                    background: 'color-mix(in srgb, var(--t-accent) 15%, transparent)',
                    borderColor: 'color-mix(in srgb, var(--t-accent) 30%, transparent)',
                    color: 'var(--t-primary-dark)',
                  }}
                >
                  LIVE PATIENT PREVIEW
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
                  Digital ABHA Health Card Generation
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--t-text-secondary)' }}>
                  Omedo HMS automatically renders a standardized, scannable Digital ABHA Card for every registered patient. Patients can store it digitally on their smartphones or receive a printed physical card during admission.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { text: 'Universal 14-Digit ABHA Health Number format', icon: 'pin' },
                    { text: 'Personalized @abdm virtual address for instant record linking', icon: 'alternate_email' },
                    { text: 'QR code verification for instant OPD counter check-in', icon: 'qr_code_scanner' },
                    { text: 'Dual-linked with internal Hospital UHID & Registration ID', icon: 'link' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs font-semibold" style={{ color: 'var(--t-text)' }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: 'var(--t-primary)' }}>
                        <span className="material-symbols-outlined text-xs">{item.icon}</span>
                      </div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Card Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.02, rotate: 0.5 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden p-6 sm:p-8 relative"
                style={{
                  background: 'linear-gradient(145deg, #1C0F05 0%, #0D1F2D 50%, #211F30 100%)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#ffffff',
                }}
              >
                {/* Card Background Glow */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none opacity-30"
                  style={{ background: 'radial-gradient(circle, var(--t-primary) 0%, transparent 70%)' }}
                />

                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                      <span className="material-symbols-outlined text-emerald-400 text-lg">local_hospital</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold tracking-wider text-emerald-400 uppercase">
                        ABHA HEALTH CARD
                      </div>
                      <div className="text-[9px] text-white/60">Ayushman Bharat Digital Mission</div>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                    VERIFIED ID
                  </div>
                </div>

                {/* Card Body */}
                <div className="grid grid-cols-12 gap-4 items-center mb-6">
                  {/* Photo / Avatar Placeholder */}
                  <div className="col-span-4 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-white/20 flex flex-col items-center justify-center overflow-hidden relative shadow-inner">
                      <span className="material-symbols-outlined text-4xl text-white/80">account_circle</span>
                    </div>
                    <span className="text-[9px] text-white/50 mt-1.5 font-mono">e-KYC VERIFIED</span>
                  </div>

                  {/* Patient Info */}
                  <div className="col-span-8 space-y-2">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/50 block">PATIENT NAME</span>
                      <span className="text-sm font-extrabold text-white tracking-wide">RAHUL SHARMA</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[8px] uppercase text-white/50 block">GENDER / AGE</span>
                        <span className="text-xs font-bold text-white">M / 34 YRS</span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase text-white/50 block">BLOOD GROUP</span>
                        <span className="text-xs font-bold text-emerald-300">O +VE</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] uppercase text-white/50 block">ABHA ADDRESS</span>
                      <span className="text-xs font-mono font-bold text-emerald-300">rahul.sharma@abdm</span>
                    </div>
                  </div>
                </div>

                {/* ABHA Number Highlight Bar */}
                <div className="p-3 rounded-xl bg-white/10 border border-white/15 mb-4 text-center">
                  <span className="text-[9px] uppercase tracking-widest text-white/60 block mb-0.5">ABHA NUMBER</span>
                  <span className="text-base sm:text-lg font-mono font-black tracking-widest text-white">
                    91-4829-1048-5729
                  </span>
                </div>

                {/* Footer Bar with QR & UHID */}
                <div className="flex items-center justify-between pt-2 text-[10px] text-white/70 border-t border-white/10">
                  <div>
                    <span className="block text-white/50 text-[8px]">HOSPITAL UHID</span>
                    <span className="font-mono font-bold text-white">UHID-2026-8492</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-lg text-slate-900 font-bold text-[9px]">
                    <span className="material-symbols-outlined text-base">qr_code_2</span>
                    <span>SCAN TO FETCH</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* ── 4. ABDM ARCHITECTURE COMPONENTS ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.15 }}
        variants={fadeUp}
        className="py-8 sm:py-12 site-wrapper"
      >
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 space-y-3">
          <span
            className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border inline-block"
            style={{
              background: 'color-mix(in srgb, var(--t-primary) 10%, transparent)',
              borderColor: 'color-mix(in srgb, var(--t-primary) 25%, transparent)',
              color: 'var(--t-primary)',
            }}
          >
            NATIONAL HEALTH STACK
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
            Core Pillars of ABDM Ecosystem
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--t-text-secondary)' }}>
            Omedo HMS seamlessly connects your hospital to all four key building blocks established by the National Health Authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {abdmArchitectureComponents.map((comp, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-6 rounded-2xl border bg-white/70 backdrop-blur-sm shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
              style={{
                background: 'var(--t-surface, #fff)',
                borderColor: 'var(--t-border-light)',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs"
                    style={{
                      background: 'color-mix(in srgb, var(--t-primary) 10%, transparent)',
                      borderColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)',
                      color: 'var(--t-primary)',
                    }}
                  >
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {comp.icon}
                    </span>
                  </div>
                  <span
                    className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
                    style={{
                      background: 'color-mix(in srgb, var(--t-primary) 8%, transparent)',
                      borderColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)',
                      color: 'var(--t-primary)',
                    }}
                  >
                    {comp.badge}
                  </span>
                </div>

                <h3 className="text-base font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
                  {comp.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--t-text-secondary)' }}>
                  {comp.desc}
                </p>
              </div>

              <div className="pt-3 border-t flex items-center gap-1 text-[11px] font-bold" style={{ borderColor: 'var(--t-border-light)', color: 'var(--t-primary)' }}>
                <span>NHA Integrated</span>
                <span className="material-symbols-outlined text-xs">verified</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── 5. FREQUENTLY ASKED QUESTIONS ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.15 }}
        variants={fadeUp}
        className="py-8 sm:py-12 site-wrapper"
      >
        <div className="text-center max-w-4xl mx-auto mb-8 space-y-3">
          <span
            className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border inline-block"
            style={{
              background: 'color-mix(in srgb, var(--t-primary) 10%, transparent)',
              borderColor: 'color-mix(in srgb, var(--t-primary) 25%, transparent)',
              color: 'var(--t-primary)',
            }}
          >
            HOSPITAL ONBOARDING FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
            Got Questions About ABDM Integration?
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--t-text-secondary)' }}>
            Everything you need to know about implementing Ayushman Bharat Digital Mission in your hospital.
          </p>
        </div>

        <div className="w-full space-y-3 px-3 sm:px-4 md:px-6">
          {abdmFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="rounded-2xl border overflow-hidden transition-all shadow-xs"
                style={{
                  background: 'var(--t-surface, #fff)',
                  borderColor: isOpen ? 'var(--t-primary)' : 'var(--t-border-light)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm cursor-pointer"
                  style={{ color: 'var(--t-text)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span>{faq.q}</span>
                  <span
                    className="material-symbols-outlined text-lg transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none', color: 'var(--t-primary)' }}
                  >
                    keyboard_arrow_down
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t pt-3"
                      style={{
                        color: 'var(--t-text-secondary)',
                        borderColor: 'color-mix(in srgb, var(--t-border-light) 60%, transparent)',
                      }}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </motion.section>

      {/* ── 6. FINAL CTA BANNER ── */}
      <section className="py-6 sm:py-10 site-wrapper">
        <div
          className="text-white rounded-3xl p-8 sm:p-12 lg:p-14 text-center shadow-xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--t-primary) 0%, var(--t-primary-mid) 100%)' }}
        >
          <div className="max-w-3xl mx-auto space-y-5 relative z-10">
            <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider inline-block">
              NHA SANDBOX &amp; PRODUCTION READY
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Enable ABDM in Your Hospital Today
            </h2>
            <p className="text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mx-auto opacity-90">
              Our clinical implementation team handles complete NHA sandbox testing, HFR registration, and doctor onboarding for your facility.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-extrabold shadow-md transition-all hover:scale-105"
                style={{ background: '#ffffff', color: 'var(--t-primary)' }}
              >
                Schedule ABDM Onboarding Call
              </Link>
              <Link
                to="/modules"
                className="border border-white/40 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-white/10 transition-all"
              >
                Explore All HMS Modules
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
