import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

// ── IT ADMIN MODULE TOPICS DATA (Matching 19 Master Modules) ──
const itAdminTopics = [
  {
    id: '01',
    title: 'Dashboard',
    subtitle: 'System infrastructure overview — active staff metrics, department counts, OPD rooms, system roles & staff distribution',
    img: '/images/it_admin_master_01.png',
    tags: [
      { text: 'SYSTEM OVERVIEW', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      { text: 'MASTER CONTROL', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
    ],
    items: [
      'Real-time staff metrics tracking active accounts, system roles, and online users',
      'Hospital department and ward count tracking across all clinical and administrative wings',
      'Staff distribution analytics by department for workforce allocation management',
      'Department head directory listing and active staff count summaries',
    ],
  },
  {
    id: '02',
    title: 'Doctor OPD Schedule',
    subtitle: 'Doctor roster scheduling — shift timings, IPD round charges, OT fees & follow-up validity rules',
    img: '/images/it_admin_master_02.png',
    tags: [
      { text: 'OPD SCHEDULING', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
      { text: 'DOCTOR TIMINGS', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    ],
    items: [
      'Doctor OPD roster ledger with master schedule creation and shift assignment',
      'Consultation fee mapping covering OPD visits, IPD rounds, and surgical OT charges',
      'Specialist tariff controls with department-wise fee rules and follow-up validity days',
      'Flexible schedule editing controls for roster adjustments and cabin assignments',
    ],
  },
  {
    id: '03',
    title: 'OPD Room Details',
    subtitle: 'OPD consultation room registry — room number allocation, active status, creator audit logs & toggle switches',
    img: '/images/it_admin_master_03.png',
    tags: [
      { text: 'ROOM MASTER', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { text: 'OPD CLINICS', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    ],
    items: [
      'OPD consultation room master list with active and inactive status filters',
      'Room allocation registry for outpatient clinics and specialty consultation desks',
      'System audit trail logging for creator credentials and configuration timestamps',
      'Instant room activation toggle switches and inline configuration controls',
    ],
  },
  {
    id: '04',
    title: 'Doctor TPA',
    subtitle: 'Insurance empanelment tariff mapping — insurance plan selection, TPA consultation fees & emergency rates',
    img: '/images/it_admin_master_04.png',
    tags: [
      { text: 'TPA EMPANELMENT', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      { text: 'DOCTOR TARIFFS', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
    ],
    items: [
      'Insurance provider and plan filter bar for custom tariff configuration',
      'General hospital fee versus TPA empanelment rate comparison matrix',
      'Doctor consultancy fee mapping for empanelled insurance policies',
      'Specialist emergency visit fee rules with automated claim rate calculations',
    ],
  },
  {
    id: '05',
    title: 'Ward Management',
    subtitle: 'Building block infrastructure — floor layouts, ward classifications, room numbers & bed capacity matrix',
    img: '/images/it_admin_master_05.png',
    tags: [
      { text: 'WARD SETUP', color: 'bg-rose-100 text-rose-700 border-rose-200' },
      { text: 'BED MATRIX', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    ],
    items: [
      'Building master directory managing main hospital blocks, surgical wings, and care units',
      'Infrastructure hierarchy tracking across building blocks, floors, wards, and rooms',
      'Surgical and intensive care bed allocation mapping',
      'Interactive floor, ward, and room tab navigation with quick building creation controls',
    ],
  },
  {
    id: '06',
    title: 'Insurance Management',
    subtitle: 'TPA insurance provider directory — cashless policy registry, deductibles, validity periods & plan rules',
    img: '/images/it_admin_master_06.png',
    tags: [
      { text: 'TPA REGISTRY', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
      { text: 'CASHLESS CLAIMS', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    ],
    items: [
      'Insurance policy directory ledger with empanelled TPA company filters',
      'TPA provider mapping for cashless hospitalization and claim processing',
      'Policy deductible configuration, coverage caps, and agreement validity dates',
      'Patient co-payment indicators and new insurance plan onboarding controls',
    ],
  },
  {
    id: '07',
    title: 'Module Management',
    subtitle: 'System module sequence & feature toggles — OPD, IPD, Emergency, Pharmacy, Lab, RIS & OT active controls',
    img: '/images/it_admin_master_07.png',
    tags: [
      { text: 'MODULE TOGGLES', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      { text: 'SYSTEM CONTROL', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
    ],
    items: [
      'System module status controls for core outpatient, inpatient, and emergency workflows',
      'Clinical subsystem feature switches for Pharmacy, Laboratory, Radiology, and OT',
      'Module sequence ordering and role permission link configuration',
      'Instant active or inactive status switches for global system navigation',
    ],
  },
  {
    id: '08',
    title: 'Vital Master',
    subtitle: 'Clinical vitals parameter setup — blood pressure, pulse rate, oxygen saturation & reference ranges',
    img: '/images/it_admin_master_08.png',
    tags: [
      { text: 'CLINICAL VITALS', color: 'bg-teal-100 text-teal-700 border-teal-200' },
      { text: 'REFERENCE RANGES', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    ],
    items: [
      'Vital parameter registry with category, unit, and status filter controls',
      'Standardized measurement units and age/gender-based normal reference ranges',
      'Gender applicability rules and mandatory parameter flags for triage desks',
      'Parameter configuration controls with custom unit definitions',
    ],
  },
  {
    id: '09',
    title: 'Vital Category',
    subtitle: 'Vitals parameter grouping master — general vitals, anthropometry, neurology, oncology & specialty sets',
    img: '/images/it_admin_master_09.png',
    tags: [
      { text: 'VITAL GROUPS', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { text: 'TEMPLATES', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    ],
    items: [
      'Vital category grouping master list with department filter controls',
      'Department-specific clinical vital templates for specialized care units',
      'Pain assessment, respiratory, and neurological vital category definitions',
      'Quick category creation actions and active status indicators',
    ],
  },
  {
    id: '10',
    title: 'Diagnosis',
    subtitle: 'Diagnostic master catalog & ICD-10 code library — clinical disease search, priority tags & department mapping',
    img: '/images/it_admin_master_10.png',
    tags: [
      { text: 'ICD-10 CODES', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
      { text: 'DIAGNOSIS LIBRARY', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
    ],
    items: [
      'ICD-10 code and diagnostic terminology search database for electronic health records',
      'Departmental diagnostic mapping for OPD, emergency, and inpatient care',
      'Clinical severity priority classification tags for acute versus routine diagnoses',
      'Diagnostic library management controls with status activation switches',
    ],
  },
  {
    id: '11',
    title: 'Disease',
    subtitle: 'Disease registry master — specialty medical conditions, department mapping & priority tracking',
    img: '/images/it_admin_master_11.png',
    tags: [
      { text: 'DISEASE REGISTRY', color: 'bg-rose-100 text-rose-700 border-rose-200' },
      { text: 'EPIDEMIC TRACKING', color: 'bg-red-100 text-red-700 border-red-200' },
    ],
    items: [
      'Disease master catalog with department and severity filter dropdowns',
      'General medicine condition entries with routine and priority status flags',
      'Specialty department condition mapping across Cardiology, Oncology, and Surgery',
      'Disease entry management with status toggles and specialty tagging',
    ],
  },
  {
    id: '12',
    title: 'User Management',
    subtitle: 'Hospital staff account creation, role-based access control (RBAC) & security governance',
    img: '/images/user_mgmt_staff.png',
    tags: [
      { text: 'STAFF ACCOUNTS', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
      { text: 'ROLE ACCESS (RBAC)', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    ],
    items: [
      'Employee user account creation for doctors, nurses, cashiers, lab techs, and pharmacists',
      'Granular role-based access permission assignment (Read, Write, Delete, Approve)',
      'Security enforcement with password policies, authentication rules, and access restriction controls',
      'Account lock management, session timeouts, and password reset workflows',
    ],
  },
  {
    id: '13',
    title: 'Hospital Configuration',
    subtitle: 'Hospital profile branding, POS billing terminals, receipt printer config & registration tariffs',
    img: '/images/hosp_config_details.png',
    tags: [
      { text: 'HOSPITAL BRANDING', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      { text: 'LETTERHEAD SETUP', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    ],
    items: [
      'Hospital organization details setup including legal name, header logo, and print letterhead settings',
      'POS counter terminal registration for cashier, pharmacy, and OPD billing desks',
      'Thermal printer configuration table for invoice and receipt printing',
      'OPD registration fee tariff configuration and validity period rules',
    ],
  },
  {
    id: '14',
    title: 'Nurse Assignment',
    subtitle: 'Nursing station shift allotment — nurse and doctor pairing, ward duty rosters & shift tracking',
    img: '/images/it_admin_master_14.png',
    tags: [
      { text: 'NURSE ROSTER', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
      { text: 'WARD ASSIGNMENT', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    ],
    items: [
      'Nurse duty assignment registry with search and filter controls',
      'Nursing staff pairing with attending consultants and ward units',
      'Shift assignment change logging with timestamp audit tracking',
      'Inline edit controls for updating nurse-doctor shift allotments',
    ],
  },
  {
    id: '15',
    title: 'PRO Master',
    subtitle: 'Patient Relations Officer (PRO) directory — liaison contact profiles, area coverage & status management',
    img: '/images/it_admin_master_15.png',
    tags: [
      { text: 'PRO RELATIONS', color: 'bg-rose-100 text-rose-700 border-rose-200' },
      { text: 'PATIENT REFERRALS', color: 'bg-[#afecde]/60 text-[#00685e] border-[#00685e]/30' },
    ],
    items: [
      'Patient Relations Officer directory with search and active status filters',
      'PRO officer contact details and assigned territory coverage tracking',
      'Account creation audit logging with active status toggle controls',
      'Profile management controls for updating liaison officer credentials',
    ],
  },
  {
    id: '16',
    title: 'Referral Doctor Master',
    subtitle: 'Referral doctor directory — internal and external physician profiles, specializations & contact registry',
    img: '/images/it_admin_master_16.png',
    tags: [
      { text: 'REFERRAL DOCTORS', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
      { text: 'EXTERNAL PARTNERS', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    ],
    items: [
      'Referral doctor directory with search by name, source, and specialty dropdowns',
      'Physician specialization tracking across surgical and clinical specialties',
      'Source classification tags distinguishing internal and external referral sources',
      'Contact directory management with active status toggles and profile controls',
    ],
  },
  {
    id: '17',
    title: 'Treatment Master',
    subtitle: 'Treatment procedure catalog — surgical packages, medical procedures & department tariff mapping',
    img: '/images/it_admin_master_17.png',
    tags: [
      { text: 'TREATMENT PACKAGES', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      { text: 'PROCEDURE MASTER', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    ],
    items: [
      'Treatment master catalog search with department and status filter dropdowns',
      'Surgical and medical procedure package definitions across clinical departments',
      'Department mapping for Cardiology, Gynecology, Oncology, and General Surgery',
      'Procedure priority classification and new treatment package onboarding controls',
    ],
  },
  {
    id: '18',
    title: 'Billing Threshold Config',
    subtitle: 'Corporate credit and billing threshold limits — credit cap alerts & discount limit enforcers',
    img: '/images/it_admin_master_18.png',
    tags: [
      { text: 'CREDIT THRESHOLDS', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      { text: 'BILLING RULES', color: 'bg-rose-100 text-rose-700 border-rose-200' },
    ],
    items: [
      'Hospital credit threshold configuration ledger with search and status filters',
      'Corporate and insurance credit limit cap settings with automated alert thresholds',
      'Active enforcement status toggles and modification audit logging',
      'Configuration controls for setting maximum discount and credit limits',
    ],
  },
  {
    id: '19',
    title: 'Bed TPA',
    subtitle: 'Insurance bed rate mapping — ward room tariffs vs negotiated TPA cashless caps',
    img: '/images/it_admin_master_19.png',
    tags: [
      { text: 'TPA BED RATES', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      { text: 'ROOM RENT CAPS', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    ],
    items: [
      'Insurance provider and policy plan selection dropdowns for TPA bed rate mapping',
      'Bed tariff mapping table for Deluxe, Semi-Deluxe, General Ward, and ICU rooms',
      'Hospital rack rates versus empanelled TPA negotiated room rent cap comparison',
      'One-click tariff cloning and bed rate copy tools across insurance plans',
    ],
  },
]

// ── USER MANAGEMENT 8 SUB-FEATURES DATA (Matching User's Screenshot) ──
const userMgmtSubFeatures = [
  {
    id: 'staff-mgmt',
    name: 'Staff Management',
    icon: 'group',
    img: '/images/user_mgmt_staff.png',
    tag: 'EMPLOYEE DIRECTORY',
    subtitle: 'Comprehensive hospital staff registry, doctor & nurse registrations & personal details',
    items: [
      'Comprehensive hospital employee directory (Doctors, Nurses, Receptionists, Cashiers)',
      'Employee personal info, qualification, department assignment & contact details',
      'Staff active status management, onboard date tracking & ID cards',
    ],
  },
  {
    id: 'staff-type',
    name: 'Staff Type',
    icon: 'badge',
    img: '/images/user_mgmt_staff_type.png',
    tag: 'EMPLOYMENT CATEGORY',
    subtitle: 'Staff classification (Permanent, Contractual, Visiting Consultant, Trainee)',
    items: [
      'Employee categorization setup (Doctor, Nursing Staff, Administrative, Paramedical, Support)',
      'Contractual vs Permanent staff employment terms & pay scale mapping',
      'Specialist consultant classification & duty rules',
    ],
  },
  {
    id: 'department',
    name: 'Department',
    icon: 'corporate_fare',
    img: '/images/user_mgmt_department.png',
    tag: 'HOSPITAL DEPARTMENTS',
    subtitle: 'Clinical & administrative department master, head of department mapping',
    items: [
      'Clinical & Non-clinical department master list (Cardiology, OPD, IPD, ICU, Pharmacy, Accounts)',
      'Head of Department (HOD) appointment & supervisory hierarchy',
      'Department-wise cost center code & budget allocation',
    ],
  },
  {
    id: 'ui-access',
    name: 'UI Access Management',
    icon: 'admin_panel_settings',
    img: '/images/user_mgmt_ui_access.png',
    tag: 'SCREEN PERMISSIONS',
    subtitle: 'Screen-level permission controls, menu visibility & action button rights',
    items: [
      'Granular screen & menu item access control per user role',
      'Action button permission toggles (View, Create, Edit, Delete, Export, Approve)',
      'Custom UI theme & layout permissions per department',
    ],
  },
  {
    id: 'login-access',
    name: 'Login & Access',
    icon: 'manage_accounts',
    img: '/images/user_mgmt_login_access.png',
    tag: 'SECURITY & 2FA',
    subtitle: 'User login credentials, password policies, 2FA security & IP restrictions',
    items: [
      'System username & secure password creation for hospital staff',
      'Two-Factor Authentication (2FA) enforcement & mobile OTP verification',
      'IP address whitelisting, session timeout & failed login lockout rules',
    ],
  },
  {
    id: 'api-permission',
    name: 'API Permission',
    icon: 'hub',
    img: '/images/user_mgmt_api_permission.png',
    tag: 'REST API ENDPOINTS',
    subtitle: 'API Permission master (BED_READ, BED_CREATE, BED_UPDATE, BED_DELETE, ETR_READ, PATIENT_READ)',
    items: [
      'API Permission Code matrix with search, HTTP Method, Status & Public Status filters',
      'HTTP Method verbs (GET, POST, PUT, DELETE) & Path patterns (/api/beds/**, /api/etr/**, /api/patients/**)',
      'Public access toggle switches & Active status flags',
      'Action toolbar controls (+ Add Permission button, Edit permission, Description log)',
    ],
  },
  {
    id: 'staff-availability',
    name: 'Staff Availability',
    icon: 'calendar_month',
    img: '/images/user_mgmt_staff_availability.png',
    tag: 'LEAVE ASSIGNMENT',
    subtitle: 'Staff Directory & Leave Assignment (Assign leaves, check leave stats & manage staff leave)',
    items: [
      'Staff Directory & Staff Leave Assignment ledger with Search & Date filters',
      'Staff Name, Leave Count (1 day(s)), Leave Dates (2026-08-03) & Reason (Scheduled Leave)',
      'One-click Manage Leave action button & + Manage Staff Leave master control',
      'Staff leave status tracking & roster availability update',
    ],
  },
  {
    id: 'staff-designation',
    name: 'Staff Designation',
    icon: 'work',
    img: '/images/user_mgmt_staff_designation.png',
    tag: 'DESIGNATION MASTER',
    subtitle: 'Staff Designation Master (ACTING HOD, ASSOCIATE_CONSULTANT, CONSULTANT, DEPUTY_HOD, HEAD_NURSE, HOD)',
    items: [
      'Staff Designation Master list with Search & All Status dropdown filters',
      'Hospital job title designations (ACTING HOD, ASSOCIATE_CONSULTANT, BILLING EXECUTIVE, CONSULTANT)',
      'Executive rank hierarchy (DEPUTY_HOD, HEAD_NURSE, HOD, JUNIOR_CONSULTANT, SR_CONSULTANT, STAFF_NURSE)',
      'Created On dates, Active status tags & + Add Designation action button',
    ],
  },
]

// ── HOSPITAL CONFIGURATION 4 SUB-FEATURES DATA (Matching User's Screenshot) ──
const hospConfigSubFeatures = [
  {
    id: 'hosp-details',
    name: 'Hospital Details',
    icon: 'local_hospital',
    img: '/images/hosp_config_details.png',
    tag: 'PROFILE & BRANDING',
    subtitle: 'Zivo Multi Speciality Hospital profile setup (General Info, Contact, Address, Registration)',
    items: [
      'General Info form fields (Hospital Name: Zivo Multi Speciality Hospital, Short Name: ZIVO)',
      'Speciality Focus (Cardiology, Orthopedics, Neurology, Oncology) & Established Year (2015)',
      'Hospital tagline (Compassionate Care, Advanced Medicine) & Logo URL loader',
      'System HUID (HOSP001) & Edit Configuration action button',
    ],
  },
  {
    id: 'pos-machine',
    name: 'POS Machine',
    icon: 'point_of_sale',
    img: '/images/hosp_config_pos.png',
    tag: 'CARD PAYMENT TERMINALS',
    subtitle: 'POS Machine Config (Billing Counter B, FOPOS, Pharmacy Counter 1)',
    items: [
      'POS Machine Config registry table with computer & counter terminal mappings',
      'Computer Name & POS Name mapping (PC-BILLING-01: Billing Counter B, PC-PHARMACY-01: Pharmacy Counter 1)',
      'Username assignments (receptionist, fghfgh, counter, pharmacy_user_01)',
      'Active status indicators & + Add Config action button',
    ],
  },
  {
    id: 'printer-config',
    name: 'Printer Configuration',
    icon: 'print',
    img: '/images/hosp_config_printer.png',
    tag: 'RECEIPT & RX PRINTERS',
    subtitle: 'Printer Configurations (HP-INVOICE-01, EPSON-RECEIPT-01 on FRONTDESK-PC)',
    items: [
      'Printer Configurations table for Invoice & Receipt printing management',
      'Printer Name & Computer mapping (HP-INVOICE-01: FRONTDESK-PC, EPSON-RECEIPT-01: FRONTDESK-PC)',
      'Printer Type tags (Invoice / Receipt printing modes)',
      'Active status toggles & + Add Printer action button',
    ],
  },
  {
    id: 'registration-fee',
    name: 'Registration Fee',
    icon: 'payments',
    img: '/images/hosp_config_reg_fee.png',
    tag: 'PATIENT REGISTRATION TARIF',
    subtitle: 'Registration Fee Config (₹ 250.00, ₹ 1,000.00, ₹ 100.00 tariff setup)',
    items: [
      'Registration Fee Config matrix with fee amount, applicability & validity rules',
      'Fee tariff tiers (₹ 250.00, ₹ 1,000.00, ₹ 100.00 rates)',
      'Fee Validity rules (Lifetime Validity / 7 Days validity duration)',
      'Fee Applicable status tags (Applicable / Not Applicable) & + Add Config action',
    ],
  },
]

export default function ITAdminManagement() {
  const [activeTopicId, setActiveTopicId] = useState('01')
  const [activeUserSubFeatureId, setActiveUserSubFeatureId] = useState('staff-mgmt')
  const [activeHospConfigSubFeatureId, setActiveHospConfigSubFeatureId] = useState('hosp-details')
  const [fullScreenImg, setFullScreenImg] = useState(null)

  const handleTopicSelect = (id) => {
    setActiveTopicId(prevId => prevId === id ? null : id)
  }

  const currentSubFeature = userMgmtSubFeatures.find(f => f.id === activeUserSubFeatureId) || userMgmtSubFeatures[0]
  const currentHospConfigSubFeature = hospConfigSubFeatures.find(f => f.id === activeHospConfigSubFeatureId) || hospConfigSubFeatures[0]

  // Interactive Real Software UI Mockup Component for IT Admin Modules
  const renderSoftwareUIPreview = () => {
    const currentTopic = itAdminTopics.find(t => t.id === activeTopicId) || itAdminTopics[0]
    let displayImg = currentTopic?.img
    let displayTitle = currentTopic?.title

    if (currentTopic.id === '12') {
      displayImg = currentSubFeature.img
      displayTitle = `User Management — ${currentSubFeature.name}`
    } else if (currentTopic.id === '13') {
      displayImg = currentHospConfigSubFeature.img
      displayTitle = `Hospital Configuration — ${currentHospConfigSubFeature.name}`
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
              <span className="material-symbols-outlined text-base">admin_panel_settings</span>
              HMS Core Sub-Module • IT Admin Control Center
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121d1f] tracking-tight leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              IT Administration <span className="text-[#00685e]">Master System</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xs sm:text-sm md:text-base text-[#3d4947] leading-relaxed max-w-2xl mx-auto">
              Comprehensive hospital configurations, Doctor schedules, Ward bed matrices, Role-based user permissions (RBAC), TPA tariffs & ICD-10 diagnostic masters.
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
            18 Master <span className="text-[#00685e]">IT Admin Sub-Modules</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#3d4947] mt-2">
            Click any IT admin step to inspect live governance workflows, access control matrices, and full-resolution screenshot previews.
          </p>
        </div>

        {/* Central Vertical Timeline Dashed Line */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-44 bottom-28 w-0.5 border-l-2 border-dashed border-[#00685e]/35 pointer-events-none z-0" />

        <div className="space-y-16 sm:space-y-20 relative z-10">
          {itAdminTopics.map((topic, index) => {
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
                          className="px-6 pb-6 pt-2 border-t border-[#bcc9c6]/20 bg-[#effcfe]/30 rounded-b-3xl space-y-3"
                        >
                          {topic.id === '12' ? (
                            <div className="space-y-3 pt-2">
                              <div className="text-xs font-bold text-[#00685e] flex items-center justify-between border-b border-[#bcc9c6]/30 pb-2">
                                <span>Select User Management Sub-Feature (8 Options):</span>
                                <span className="text-[10px] bg-[#afecde] text-[#00685e] px-2 py-0.5 rounded-full font-extrabold">
                                  {currentSubFeature.name}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                {userMgmtSubFeatures.map((feat) => {
                                  const isSel = activeUserSubFeatureId === feat.id
                                  return (
                                    <button
                                      key={feat.id}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveUserSubFeatureId(feat.id)
                                      }}
                                      className={`p-2 rounded-xl text-left text-xs font-bold transition-all flex flex-col justify-between border ${
                                        isSel
                                          ? 'bg-[#00685e] text-white shadow-md border-[#00685e]'
                                          : 'bg-white text-[#3d4947] hover:bg-[#afecde]/40 border-[#bcc9c6]/40'
                                      }`}
                                    >
                                      <div className="flex items-center gap-1.5 mb-1">
                                        <span className="material-symbols-outlined text-sm">{feat.icon}</span>
                                        <span className="truncate text-[11px]">{feat.name}</span>
                                      </div>
                                    </button>
                                  )
                                })}
                              </div>

                              <ul className="space-y-2 pt-2 border-t border-[#bcc9c6]/20 text-xs sm:text-sm text-[#3d4947]">
                                {currentSubFeature.items.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined text-base sm:text-lg text-[#00685e] shrink-0 mt-0.5">check_circle</span>
                                    <span className="leading-snug">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : topic.id === '13' ? (
                            <div className="space-y-3 pt-2">
                              <div className="text-xs font-bold text-[#00685e] flex items-center justify-between border-b border-[#bcc9c6]/30 pb-2">
                                <span>Select Hospital Configuration Sub-Feature (4 Options):</span>
                                <span className="text-[10px] bg-[#afecde] text-[#00685e] px-2 py-0.5 rounded-full font-extrabold">
                                  {currentHospConfigSubFeature.name}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                {hospConfigSubFeatures.map((feat) => {
                                  const isSel = activeHospConfigSubFeatureId === feat.id
                                  return (
                                    <button
                                      key={feat.id}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveHospConfigSubFeatureId(feat.id)
                                      }}
                                      className={`p-2 rounded-xl text-left text-xs font-bold transition-all flex flex-col justify-between border ${
                                        isSel
                                          ? 'bg-[#00685e] text-white shadow-md border-[#00685e]'
                                          : 'bg-white text-[#3d4947] hover:bg-[#afecde]/40 border-[#bcc9c6]/40'
                                      }`}
                                    >
                                      <div className="flex items-center gap-1.5 mb-1">
                                        <span className="material-symbols-outlined text-sm">{feat.icon}</span>
                                        <span className="truncate text-[11px]">{feat.name}</span>
                                      </div>
                                    </button>
                                  )
                                })}
                              </div>

                              <ul className="space-y-2 pt-2 border-t border-[#bcc9c6]/20 text-xs sm:text-sm text-[#3d4947]">
                                {currentHospConfigSubFeature.items.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined text-base sm:text-lg text-[#00685e] shrink-0 mt-0.5">check_circle</span>
                                    <span className="leading-snug">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#3d4947]">
                              {topic.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                  <span className="material-symbols-outlined text-base sm:text-lg text-[#00685e] shrink-0 mt-0.5">check_circle</span>
                                  <span className="leading-snug">{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                </div>

                {/* Opposite Side Container (Shows Screen View when Active, or Placeholder on Desktop) */}
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
            <span>19 IT ADMIN MASTERS &amp; ROLE-BASED ACCESS CONTROL (RBAC) READY</span>
          </div>
        </div>

      </section>

      {/* ── KEY METRICS BANNER ── */}
      <section className="site-wrapper pt-12 sm:pt-16">
        <div className="bg-gradient-to-r from-[#00685e] to-[#004d46] rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">19 Masters</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Configurable IT Admin Modules</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">100%</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Granular Role Permission Control</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">99.99%</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">System Uptime & Audit Security</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-[#85f5e6]">0 Zero</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Unauthorized Data Access Violations</div>
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
