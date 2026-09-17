import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { pageTransition } from '../../utils/animations'
import omedoLogo from '../../assets/omedo_logo.png'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
// ── What We Do Pillars ──
const whatWeDoItems = [
  {
    icon: 'stethoscope',
    title: 'Clinical Care',
    description: 'OPD, IPD, EMR, prescriptions and patient management.',
    badge: 'Clinical Workflows',
    accentColor: '#1E3A8A',
    iconBg: '#EFF6FF',
    badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
  },
  {
    icon: 'local_hospital',
    title: 'Hospital Operations',
    description: 'Appointments, admissions, beds, nursing and departmental workflows.',
    badge: 'Bed & Ward Mgmt',
    accentColor: '#1E3A8A',
    iconBg: '#F6D3AC',
    badgeColor: 'bg-[#FDF3E7] text-[#8C4E13] border-[#ECC599]',
  },
  {
    icon: 'biotech',
    title: 'Diagnostics & Pharmacy',
    description: 'Laboratory, investigations, pharmacy and inventory.',
    badge: 'Labs & Pharmacy POS',
    accentColor: '#2563EB',
    iconBg: '#EFF6FF',
    badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
  },
  {
    icon: 'account_balance_wallet',
    title: 'Billing & Finance',
    description: 'Service billing, payments, revenue and financial workflows.',
    badge: 'Billing & GST',
    accentColor: '#1E3A8A',
    iconBg: '#F6D3AC',
    badgeColor: 'bg-[#FDF3E7] text-[#8C4E13] border-[#ECC599]',
  },
  {
    icon: 'hub',
    title: 'Digital Healthcare',
    description: 'ABDM integration and connected digital health workflows.',
    badge: 'ABDM & M1-M3',
    accentColor: '#1D4ED8',
    iconBg: '#EFF6FF',
    badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
  },
  {
    icon: 'analytics',
    title: 'Reports & Analytics',
    description: 'Dashboards, reports and operational insights.',
    badge: 'Business Insights',
    accentColor: '#1E3A8A',
    iconBg: '#F6D3AC',
    badgeColor: 'bg-[#FDF3E7] text-[#8C4E13] border-[#ECC599]',
  },
]

// ── Our Approach Process Steps ──
const approachSteps = [
  {
    step: '01',
    title: 'Understand',
    icon: 'psychology',
    desc: 'Deeply study real-world hospital workflows, clinical bottlenecks, and administrative hurdles.',
  },
  {
    step: '02',
    title: 'Simplify',
    icon: 'auto_fix_high',
    desc: 'Eliminate redundant clicks, reduce paperwork, and build intuitive user interfaces.',
  },
  {
    step: '03',
    title: 'Connect',
    icon: 'hub',
    desc: 'Unify doctors, nurses, labs, pharmacy, billing, and ABDM digital health in real time.',
  },
  {
    step: '04',
    title: 'Improve',
    icon: 'trending_up',
    desc: 'Deliver ongoing updates, data-backed insights, and continuous operational refinements.',
  },
]

// ── Experience Pillars ──
const experiencePillars = [
  { name: 'Healthcare Software', icon: 'medical_information' },
  { name: 'Technology', icon: 'developer_mode' },
  { name: 'Product Development', icon: 'design_services' },
  { name: 'Sales & Onboarding', icon: 'handshake' },
  { name: 'Operations & Support', icon: 'support_agent' },
]

// ── Mission Goals ──
const missionGoals = [
  'Simplify everyday workflows across all hospital departments',
  'Connect departments and eliminate information silos',
  'Reduce unnecessary administrative and manual paperwork',
  'Improve operational visibility with real-time dashboards',
  'Strengthen financial control and avoid billing leakages',
  'Adopt digital healthcare and ABDM standards with confidence',
]

// ── Why OMEDO Value Props ──
const whyOmedoProps = [
  {
    title: 'Healthcare Focused',
    description: 'Built around real healthcare workflows and designed specifically for medical professionals.',
    icon: 'health_and_safety',
    accent: '#1E3A8A',
  },
  {
    title: 'Connected',
    description: 'Clinical, operational and financial processes work together in real-time synchronicity.',
    icon: 'device_hub',
    accent: '#D97706',
  },
  {
    title: 'Practical',
    description: 'Designed to solve real everyday problems without unnecessary complexity or bloated menus.',
    icon: 'task_alt',
    accent: '#2563EB',
  },
  {
    title: 'Scalable',
    description: 'Built to grow effortlessly with healthcare organizations from single clinics to multi-branch hospitals.',
    icon: 'domain_add',
    accent: '#B45309',
  },
  {
    title: 'Future Ready',
    description: 'Designed to evolve seamlessly with digital healthcare, ABDM standards, and modern cloud technologies.',
    icon: 'rocket_launch',
    accent: '#1D4ED8',
  },
]

export default function About() {
  return (
    <motion.div {...pageTransition} className="min-h-screen bg-[#F8FAFC]">

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION (Left Aligned with Right Logo Showcase)        */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFC] to-[#F8FAFC] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 lg:pb-24 border-b border-slate-200/80">
        
        {/* Ambient background glow orbs in Sapphire & Gold */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[360px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-[500px] h-[300px] bg-[#ECC599]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="site-wrapper relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Left Column: Text Content */}
            <motion.div className="lg:col-span-7 space-y-6 text-left flex flex-col items-start">
              
              {/* Tagline Badge in Champagne Gold & Navy */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#ECC599] text-[#1E3A8A] shadow-[0_2px_12px_rgba(236,197,153,0.3)]"
              >
                <span className="w-2 h-2 rounded-full bg-[#D48D3B] animate-pulse" />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide">
                  Healthcare. Simplified. Connected.
                </span>
              </motion.div>

              {/* Main Headline with Navy to Gold Gradient */}
              <motion.h1
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.14]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Building the Future of{' '}
                <span className="relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 40%, #C78038 80%, #ECC599 100%)',
                    }}
                  >
                    Connected Healthcare
                  </span>
                </span>
              </motion.h1>

              {/* Subtexts */}
              <motion.div variants={fadeUp} className="space-y-3 max-w-xl">
                <p className="text-base sm:text-lg text-[#1E293B] leading-relaxed font-normal">
                  OMEDO is a healthcare technology company simplifying how hospitals, clinics and healthcare organizations manage people, processes and information.
                </p>
                <p className="text-sm sm:text-base text-[#1E3A8A] font-bold">
                  We connect clinical, operational, financial and digital healthcare workflows through one unified platform.
                </p>
              </motion.div>

              {/* Action Buttons in Navy & Gold */}
              <motion.div
                variants={fadeUp}
                className="pt-2 flex flex-col sm:flex-row items-center justify-start gap-3.5 w-full sm:w-auto"
              >
                <a
                  href="#what-we-do"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#172554] hover:to-[#1E3A8A] text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-900/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>Explore OMEDO</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#1E3A8A] border border-[#ECC599] text-xs sm:text-sm font-bold shadow-xs hover:bg-[#FDF3E7] active:scale-98 transition-all flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>Contact Us</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </motion.div>

            </motion.div>

            {/* Right Column: Logo Only (Proportionally Balanced with Left Text) */}
            <motion.div
              className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full h-full"
              variants={fadeUp}
            >
              <div className="relative flex items-center justify-center w-full">
                {/* Soft ambient backlight behind logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/15 via-[#ECC599]/20 to-blue-600/10 blur-3xl rounded-full scale-125 pointer-events-none" />
                
                <img
                  src={omedoLogo}
                  alt="OMEDO - Connected Healthcare Platform"
                  className="relative z-10 w-full max-w-[300px] sm:max-w-[390px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[530px] max-h-[320px] sm:max-h-[360px] lg:max-h-[390px] h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* 2. OUR STORY                                                  */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative">
        <div className="site-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Story Text Column */}
            <motion.div
              className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF3E7] text-[#8C4E13] border border-[#ECC599] text-xs font-extrabold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm text-[#8C4E13]">history_edu</span>
                <span>Our Story</span>
              </div>

              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Healthcare Technology, Built From Experience
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#334155] leading-relaxed">
                <p>
                  Healthcare involves patients, doctors, nurses, laboratories, pharmacy, billing and administration—all working together.
                </p>
                <p>
                  When these functions operate through disconnected systems, information becomes fragmented and everyday work becomes more complicated.
                </p>
                <p>
                  <strong className="text-[#1E3A8A] font-bold">OMEDO brings these workflows together into one connected healthcare platform.</strong>
                </p>
              </div>

              {/* Callout Quote Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#FDF3E7]/80 via-white to-blue-50/80 border-l-4 border-[#ECC599] shadow-2xs space-y-1 w-full text-left border border-[#ECC599]/40">
                <div className="text-xs font-bold text-[#8C4E13] uppercase tracking-wider">Core Philosophy</div>
                <div className="text-base sm:text-lg font-extrabold text-[#0F172A] italic">
                  "Technology should make healthcare simpler—not more complicated."
                </div>
              </div>
            </motion.div>

            {/* Story Visual Highlight Card */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-[#EFF6FF] via-white to-[#FDF3E7]/60 border border-blue-200/80 shadow-xl space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] text-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-2xl">device_hub</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                  Connecting Healthcare Across Every Touchpoint
                </h3>

                <ul className="space-y-3 text-xs sm:text-sm text-[#334155]">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#C78038] text-base shrink-0 mt-0.5">check_circle</span>
                    <span>Zero fragmented records or manual paperwork transfers</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-blue-700 text-base shrink-0 mt-0.5">check_circle</span>
                    <span>Synchronized doctor, nurse, lab, and pharmacy workflows</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#C78038] text-base shrink-0 mt-0.5">check_circle</span>
                    <span>Transparent billing and real-time operational insights</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-blue-700 text-base shrink-0 mt-0.5">check_circle</span>
                    <span>Faster patient turnaround and better clinical outcomes</span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Unified Database</span>
                  <span className="text-[#1E3A8A] font-bold">100% Real-Time</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* 3. WHAT WE DO                                                 */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <section id="what-we-do" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] relative">
        <div className="site-wrapper space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1E3A8A] border border-blue-200 text-xs font-extrabold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">widgets</span>
              <span>What We Do</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              One Platform. Connected Healthcare.
            </h2>
            <p className="text-sm sm:text-base text-[#334155]">
              OMEDO connects the essential workflows of modern healthcare organizations.
            </p>
          </div>

          {/* 6 Feature Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {whatWeDoItems.map((item, idx) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs hover:shadow-md hover:border-amber-400/80 transition-all group flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs"
                      style={{
                        backgroundColor: item.iconBg,
                        color: item.accentColor,
                      }}
                    >
                      <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="text-lg sm:text-xl font-bold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors mb-2"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* 4. OUR APPROACH                                               */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-[#EFF6FF]/40 to-white border-y border-slate-200">
        <div className="site-wrapper space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF3E7] text-[#8C4E13] border border-[#ECC599] text-xs font-extrabold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm text-[#8C4E13]">route</span>
              <span>Our Approach</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Simple. Connected. Practical.
            </h2>
            <p className="text-sm sm:text-base text-[#334155]">
              We believe healthcare software should be easy to use and built around real-world workflows.
            </p>
          </div>

          {/* 4-Step Process Cards (Wide Spacing with Prominent ECG Pulse Connectors) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 xl:gap-20 max-w-7xl mx-auto">
            {approachSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                className={`bg-white rounded-3xl p-6 sm:p-7 border ${
                  idx === 0 ? 'border-[#ECC599] shadow-[0_4px_24px_rgba(236,197,153,0.35)]' : 'border-slate-200/90 shadow-2xs'
                } hover:shadow-lg hover:border-[#ECC599] transition-all relative flex flex-col justify-between min-h-[220px] sm:min-h-[240px]`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Top Row: Step Number & Icon */}
                <div className="flex items-center justify-between pb-3">
                  <span className="text-xl sm:text-2xl font-black text-[#C78038] font-mono tracking-tight">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-[#F6D3AC] text-[#1E3A8A] flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-xl">{step.icon}</span>
                  </div>
                </div>

                {/* Bottom Content: Title & Description */}
                <div className="space-y-2">
                  <h3
                    className="text-base sm:text-lg font-bold text-[#0F172A]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                {/* ECG Heartbeat Pulse Wave Connector (Spanning the Wide Gap between 1-2, 2-3, 3-4) */}
                {idx < approachSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-16 xl:-right-20 top-1/2 -translate-y-1/2 w-16 xl:w-20 h-10 items-center justify-center pointer-events-none z-20">
                    <svg
                      viewBox="0 0 100 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-8 overflow-visible"
                    >
                      {/* Base ECG track in Navy */}
                      <path
                        d="M0 16 L25 16 L30 16 L34 9 L39 25 L45 2 L52 30 L58 11 L63 20 L67 16 L72 16 L100 16"
                        stroke="#1E3A8A"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeOpacity="0.25"
                      />
                      {/* Animated traveling heartbeat pulse */}
                      <motion.path
                        d="M0 16 L25 16 L30 16 L34 9 L39 25 L45 2 L52 30 L58 11 L63 20 L67 16 L72 16 L100 16"
                        stroke="#1E3A8A"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0.35, pathOffset: 0 }}
                        animate={{
                          pathOffset: [0, 1],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: idx * 0.45,
                        }}
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Evolving Commitment Banner */}
          <div className="p-6 rounded-3xl bg-white border border-[#ECC599]/80 shadow-xs max-w-3xl mx-auto text-center bg-gradient-to-r from-[#FDF3E7]/70 via-white to-blue-50/40">
            <p className="text-xs sm:text-sm text-[#1E3A8A] font-extrabold">
              We continuously develop OMEDO around the needs of healthcare organizations and the evolving healthcare technology landscape.
            </p>
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* 5. OUR EXPERIENCE (Deep Imperial Navy & Champagne Gold)        */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-12 lg:py-14 bg-gradient-to-r from-[#0C1938] via-[#142654] to-[#0C1938] text-white relative overflow-hidden">
        {/* Glow ambient background mesh in Sapphire & Champagne Gold */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#ECC599]/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="site-wrapper relative z-10 space-y-6 sm:space-y-7">
          
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6D3AC]/20 text-[#F6D3AC] border border-[#ECC599]/40 text-xs font-bold uppercase tracking-wider shadow-xs">
              <span className="material-symbols-outlined text-sm text-[#F6D3AC]">workspace_premium</span>
              <span>Our Experience</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-black text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Built on Experience. Designed for What's Next.
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 font-normal">
              OMEDO is a new company built on extensive experience across:
            </p>
          </div>

          {/* Experience Badges Pill Grid */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-4xl mx-auto">
            {experiencePillars.map((exp) => (
              <div
                key={exp.name}
                className="px-4.5 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#ECC599] hover:bg-white/15 transition-all flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs group"
              >
                <span className="material-symbols-outlined text-[#F6D3AC] text-lg sm:text-xl drop-shadow-[0_1px_6px_rgba(246,211,172,0.45)] group-hover:scale-110 transition-transform">
                  {exp.icon}
                </span>
                <span>{exp.name}</span>
              </div>
            ))}
          </div>

          {/* Deep Insight Conclusion */}
          <div className="max-w-2xl mx-auto text-center pt-1">
            <p className="text-xs sm:text-[13px] text-blue-100/80 leading-relaxed font-normal">
              Our experience helps us understand both the technology challenges and practical business realities of healthcare organizations.
            </p>
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* 6. OUR MISSION & VISION (Navy & Champagne Gold Bento)          */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC]">
        <div className="site-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Mission Card */}
            <motion.div
              className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1E3A8A] border border-blue-200 text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm">flag</span>
                  <span>Our Mission</span>
                </div>

                <h3
                  className="text-xl sm:text-2xl font-black text-[#0F172A]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Make Healthcare Technology Simple, Connected and Useful
                </h3>

                <p className="text-xs sm:text-sm text-[#334155]">
                  We aim to help healthcare organizations:
                </p>

                <ul className="space-y-3 pt-2">
                  {missionGoals.map((goal) => (
                    <li key={goal} className="flex items-start gap-3 text-xs sm:text-sm text-[#334155]">
                      <span className="w-5 h-5 rounded-full bg-[#FDF3E7] text-[#8C4E13] flex items-center justify-center shrink-0 mt-0.5 border border-[#ECC599]">
                        <span className="material-symbols-outlined text-xs">check</span>
                      </span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Vision Card (Navy Gradient with Champagne Gold Accents) */}
            <motion.div
              className="bg-gradient-to-br from-[#1E3A8A] via-[#172554] to-[#0F172A] rounded-3xl p-7 sm:p-10 border border-[#ECC599]/40 shadow-xl flex flex-col justify-between space-y-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6D3AC] text-[#0A1633] text-xs font-black uppercase tracking-wider border border-[#ECC599]">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  <span>Our Vision</span>
                </div>

                <h3
                  className="text-xl sm:text-2xl font-black text-white"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  A Healthcare Ecosystem Where Everything Connects
                </h3>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  We envision healthcare where information flows seamlessly between people, departments and systems.
                </p>

                {/* 3 Pillars Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
                    <div className="text-[10px] font-bold text-[#F6D3AC] uppercase">Information</div>
                    <div className="text-sm font-black text-white mt-0.5">Better Info</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
                    <div className="text-[10px] font-bold text-[#F6D3AC] uppercase">Operations</div>
                    <div className="text-sm font-black text-white mt-0.5">Better Work</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
                    <div className="text-[10px] font-bold text-[#F6D3AC] uppercase">Outcomes</div>
                    <div className="text-sm font-black text-white mt-0.5">Better Care</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#ECC599] via-[#F6D3AC] to-[#ECC599] text-[#0A1633] text-center font-black text-xs sm:text-sm shadow-md">
                Better information. Better operations. Better healthcare.
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* 7. WHY OMEDO                                                  */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-y border-slate-200">
        <div className="site-wrapper space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF3E7] text-[#8C4E13] border border-[#ECC599] text-xs font-extrabold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm text-[#8C4E13]">verified</span>
              <span>Why OMEDO</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Built for Practical Excellence
            </h2>
            <p className="text-sm sm:text-base text-[#334155]">
              Why healthcare leaders choose OMEDO as their operational backbone.
            </p>
          </div>

          {/* 5 Value Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
            {whyOmedoProps.map((prop, idx) => (
              <motion.div
                key={prop.title}
                className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-xs hover:border-[#ECC599] transition-all flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div className="space-y-3">
                  <div
                    className="w-11 h-11 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-xs"
                    style={{ color: prop.accent }}
                  >
                    <span className="material-symbols-outlined text-xl">{prop.icon}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{prop.title}</h3>
                  <p className="text-xs text-[#334155] leading-relaxed">{prop.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* 8. FINAL CTA (Imperial Navy & Champagne Gold Banner)          */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 pb-20 sm:pb-28">
        <div className="site-wrapper">
          <motion.div
            className="rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#172554] text-white shadow-2xl border border-[#ECC599]/40"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Ambient decorative elements */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden sm:block">
              <span className="material-symbols-outlined text-[#F6D3AC]" style={{ fontSize: '140px' }}>hub</span>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <span className="px-4 py-1.5 rounded-full bg-[#F6D3AC]/20 text-[#F6D3AC] text-xs sm:text-sm font-extrabold uppercase tracking-wider inline-block border border-[#ECC599]/40">
                Healthcare. Simplified. Connected.
              </span>

              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Let's Build Better Healthcare, Together.
              </h2>

              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
                OMEDO brings people, processes and technology together on one connected healthcare platform.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row flex-wrap justify-center gap-3.5 sm:gap-4">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#ECC599] via-[#F6D3AC] to-[#ECC599] hover:brightness-105 text-[#0A1633] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-black shadow-lg shadow-[#ECC599]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Contact Us</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto border border-white/40 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Book a Demo</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
