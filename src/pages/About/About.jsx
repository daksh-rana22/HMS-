import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { pageTransition } from '../../utils/animations'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

const stats = [
  { value: '40%', label: 'Efficiency Increase' },
  { value: '12M+', label: 'Patient Records' },
  { value: '150+ / 50+', label: 'Hospitals & Clinics' },
  { value: '0',    label: 'Data Breaches' },
]

const aboutFaqs = [
  {
    question: 'How long does it take to implement Omedo HMS in our hospital?',
    answer:
      'Typical deployment takes 2 to 4 weeks for single-facility hospitals. Our dedicated onboarding team handles full data migration, module configuration, and hands-on staff training with zero downtime.',
  },
  {
    question: 'Is Omedo HMS HIPAA compliant and secure for patient data?',
    answer:
      'Yes, 100%. We employ bank-grade 256-bit encryption, role-based access control (RBAC), automatic daily encrypted backups, and full HIPAA audit logging.',
  },
  {
    question: 'Can Omedo HMS integrate with our existing lab machines and pharmacy POS?',
    answer:
      'Absolutely. Omedo HMS supports REST APIs and HL7/FHIR healthcare standards for seamless integration with laboratory equipment, RIS/PACS imaging, pharmacy POS hardware, and Tally accounting.',
  },
  {
    question: 'What kind of customer support and training is provided?',
    answer:
      'We provide 24/7 dedicated support via phone, live chat, and email, along with personalized on-site and remote training modules for doctors, nurses, cashiers, and IT administrators.',
  },
  {
    question: 'Can I schedule a live personalized demo for my medical facility?',
    answer:
      'Yes! Simply fill out the contact form or reach out to our team, and we will organize a customized walk-through tailored to your hospital’s specific specialty workflows.',
  },
  {
    question: 'Does Omedo HMS support multi-branch hospital chains and centralized reporting?',
    answer:
      'Yes. Omedo HMS offers centralized cloud administration allowing hospital groups to manage multiple branches, consolidate financial analytics, share doctor schedules, and track inventory across locations seamlessly.',
  },
  {
    question: 'How are automated backups and cloud uptime handled?',
    answer:
      'We maintain a 99.99% cloud uptime SLA backed by AWS & Azure redundant infrastructure. Automated encrypted backups are generated hourly with instant disaster recovery and failover protection.',
  },
  {
    question: 'Can we customize department workflows and doctor prescription templates?',
    answer:
      'Absolutely. Every module—including IPD bed management, OPD clinical notes, e-prescriptions, and lab test master templates—can be fully configured according to your specialty and hospital procedures.',
  },
  {
    question: 'Does the system handle insurance TPA claims, patient billing, and tax exports?',
    answer:
      'Yes. The Billing & Accounts module features automated TPA tariff calculation, itemized billing, insurance pre-authorization workflows, and one-click export to Tally, Quickbooks, and GST filing tools.',
  },
  {
    question: 'Is there a patient portal or mobile access for doctors on duty?',
    answer:
      'Yes! Omedo HMS includes a responsive web portal and mobile-friendly interface for doctors to review IPD rounds, approve lab reports, and check patient vitals anytime, anywhere.',
  },
]

export default function About() {
  const [openFaq, setOpenFaq] = useState(null)
  return (
    <motion.div {...pageTransition}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#effcfe] pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 md:pb-10">
        <div className="site-wrapper grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 2xl:gap-16 items-center">
          {/* Text */}
          <motion.div className="space-y-5 sm:space-y-6 text-center lg:text-left"
            initial="hidden" animate="visible" variants={stagger}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#afecde] text-[#326c62] text-sm mx-auto lg:mx-0"
              style={{ fontFamily: "'Inter', sans-serif" }} variants={fadeUp}>
              <span className="material-symbols-outlined text-base sm:text-lg">verified_user</span>
              <span className="font-medium text-xs sm:text-sm">25+ Years of ERP Excellence &amp; Healthcare Innovation</span>
            </motion.div>

            <motion.h1 className="heading-hero text-[#121d1f]" variants={fadeUp}>
              Our Story: <br className="hidden sm:block" />
              Bridging the Gap Between{' '}
              <span className="text-[#00685e]">Care & Technology.</span>
            </motion.h1>

            <motion.p className="text-description text-[#3d4947] max-w-xl mx-auto lg:mx-0" variants={fadeUp}>
              At Omedo HMS, we believe that medical professionals shouldn't be bogged down by
              inefficient systems. We build the digital infrastructure that lets healers focus on
              what matters: patients.
            </motion.p>
          </motion.div>

          {/* Image */}
          <motion.div className="relative mx-auto w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl card-frosted p-1">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLatTJhDYJMxHOcrt035OUJtWdNT5cLm5ImRjFbTh03W05PzhNFHidhsSIfgBftQs53bbyQV8T-tHhPllZhsmasuMR33unqL-w-QDwCUee2H7TxNO_UGHuNiCuKuve9jdBq8461Rd7HNpECJ4m093m6EQjF0hDGfXQjPeZF2KfcIz-WzA8RcL3rVTNxPZB4q5G0nrIXCIayGfHkPtNUUnVwAeGssWk0Qi7H8Gtuk3TxfDdA3im0LDe"
                alt="Medical team in modern hospital"
                className="w-full h-auto object-cover rounded-2xl max-h-[360px] sm:max-h-[440px] 2xl:max-h-[500px] object-center"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentNode.style.background = 'linear-gradient(135deg, #b2eee1, #effcfe)'
                  e.target.parentNode.style.minHeight = '300px'
                }}
              />
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── 25+ Years ERP Heritage & Enterprise Expertise Section ── */}
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--t-bg, #effcfe) 40%, white) 0%, color-mix(in srgb, var(--t-bg, #effcfe) 80%, white) 100%)' }}>
        <div className="site-wrapper space-y-10 sm:space-y-14">
          
          {/* Main Wide 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 2xl:gap-16 items-center">
            
            {/* Left Column: Heading & Highlight Cards */}
            <motion.div
              className="lg:col-span-5 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-xs"
                style={{
                  background: 'color-mix(in srgb, var(--t-primary, #00685e) 10%, white)',
                  borderColor: 'color-mix(in srgb, var(--t-primary, #00685e) 25%, transparent)',
                  color: 'var(--t-primary, #00685e)',
                }}>
                <span className="material-symbols-outlined text-base sm:text-lg">location_on</span>
                <span className="font-bold text-xs sm:text-sm tracking-wide">Lucknow, India • 25+ Years Legacy</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121d1f] leading-[1.15] tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Engineering Enterprise Software with{' '}
                <span style={{
                  background: 'var(--t-gradient-text, linear-gradient(135deg, var(--t-primary, #00685e) 0%, var(--t-accent, #67d9ca) 100%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Over 25 Years of Excellence
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#3d4947] leading-relaxed"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                From robust multi-location retail &amp; distribution networks to mission-critical hospital ecosystems, we build software engineered for resilience, efficiency, and scale.
              </p>

              {/* 3 Value Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-2">
                <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#bcc9c6]/40 shadow-xs text-left">
                  <div className="text-2xl font-black text-[#00685e]">25+</div>
                  <div className="text-[11px] font-semibold text-[#6d7a77] uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#bcc9c6]/40 shadow-xs text-left">
                  <div className="text-2xl font-black text-[#00685e]">Multi</div>
                  <div className="text-[11px] font-semibold text-[#6d7a77] uppercase tracking-wider">Location ERP</div>
                </div>
                <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#bcc9c6]/40 shadow-xs text-left">
                  <div className="text-2xl font-black text-[#00685e]">Cloud</div>
                  <div className="text-[11px] font-semibold text-[#6d7a77] uppercase tracking-wider">&amp; Mobile Native</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Spacious Executive Story Card */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div
                className="w-full bg-white/95 backdrop-blur-xl border border-white p-7 sm:p-10 lg:p-12 rounded-3xl space-y-6 relative overflow-hidden"
                style={{
                  boxShadow: '0 20px 60px rgba(0,104,94,0.08), 0 4px 16px rgba(0,0,0,0.04)',
                }}
              >
                {/* Decorative background watermark */}
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none select-none">
                  <span className="material-symbols-outlined" style={{ fontSize: '180px', color: '#00685e' }}>corporate_fare</span>
                </div>

                {/* Paragraph 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{ background: 'color-mix(in srgb, var(--t-primary, #00685e) 12%, white)', color: 'var(--t-primary, #00685e)' }}>
                    <span className="material-symbols-outlined text-xl">hub</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Empowering Adaptable Enterprise Workflows
                    </h3>
                    <p className="text-sm sm:text-base text-[#3d4947] leading-relaxed text-justify" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      We make <strong className="text-[#00685e] font-bold">ERP software</strong> to make your business more efficient and adaptable. Based out of Lucknow, India, we have industry experience of more than <strong className="text-[#00685e] font-bold">25 years</strong>. With a team of dedicated veterans of the industry, we want to empower your business and make it as seamless as possible.
                    </p>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#bcc9c6]/40 to-transparent" />

                {/* Paragraph 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{ background: 'color-mix(in srgb, var(--t-accent, #67d9ca) 20%, white)', color: 'var(--t-primary, #00685e)' }}>
                    <span className="material-symbols-outlined text-xl">cloud_sync</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Multi-Sector Reach &amp; Cloud Dynamism
                    </h3>
                    <p className="text-sm sm:text-base text-[#3d4947] leading-relaxed text-justify" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Our services include ERP solutions for <strong className="text-[#121d1f] font-semibold">Retail, Distribution &amp; Multi-Location businesses</strong> in various sectors like Pharmaceutical, Super Market, FMCG, Auto Parts, Textile, Footwear, and Restaurants. Dynamism is one of the key visions of our company and that is why we have ventured into providing mobile and cloud-based services for our clients.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Full-Width Industry Sectors Showcase */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-[#bcc9c6]/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-[#00685e]" />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#00685e]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Sectors Powered by Our ERP Solutions
                </span>
              </div>
              <span className="text-xs font-semibold text-[#6d7a77] hidden sm:inline">8+ Industry Verticals</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
              {[
                { icon: 'medication', label: 'Pharmaceutical', desc: 'Batch & Expiry' },
                { icon: 'shopping_cart', label: 'Super Market', desc: 'POS & Billing' },
                { icon: 'inventory_2', label: 'FMCG', desc: 'Distribution' },
                { icon: 'precision_manufacturing', label: 'Auto Parts', desc: 'Inventory Master' },
                { icon: 'dry_cleaning', label: 'Textile', desc: 'Variants & SKUs' },
                { icon: 'roller_skating', label: 'Footwear', desc: 'Barcoding' },
                { icon: 'restaurant', label: 'Restaurants', desc: 'KOT & Table Mgmt' },
                { icon: 'local_hospital', label: 'Healthcare', desc: 'HMS & Clinical' },
              ].map((sector) => (
                <div
                  key={sector.label}
                  className="bg-white/95 backdrop-blur-md border border-[#bcc9c6]/40 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-center shadow-xs hover:shadow-lg hover:-translate-y-1.5 hover:border-[#00685e] transition-all duration-300 group cursor-default"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                    style={{ background: 'color-mix(in srgb, var(--t-primary, #00685e) 10%, white)', color: 'var(--t-primary, #00685e)' }}>
                    <span className="material-symbols-outlined text-2xl">{sector.icon}</span>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {sector.label}
                    </div>
                    <div className="text-[10px] text-[#6d7a77] font-medium mt-0.5">
                      {sector.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Core Principles Bento ── */}
      <section className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20">
        <div className="site-wrapper">
          <div className="text-center mb-8 sm:mb-10 2xl:mb-12">
            <h2 className="heading-section text-[#121d1f] mb-2">Built on Core Principles</h2>
            <p className="text-description text-[#3d4947]">The foundations of every line of code we write.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 2xl:gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>

            {/* Mission — wide */}
            <motion.div
              className="sm:col-span-2 card-frosted rounded-2xl sm:rounded-3xl p-6 sm:p-8 2xl:p-10 flex flex-col justify-between"
              variants={fadeUp}>
              <div className="space-y-3 sm:space-y-4">
                <span className="material-symbols-outlined text-[#00685e] text-3xl sm:text-4xl">rocket_launch</span>
                <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-semibold text-[#121d1f]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>The Mission</h3>
                <p className="text-sm sm:text-base 2xl:text-lg text-[#3d4947] leading-relaxed"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  To empower healthcare providers with intuitive, intelligent, and interoperable
                  technology that simplifies administrative complexity and enhances clinical outcomes globally.
                </p>
              </div>
              <div className="mt-8 flex items-center -space-x-3">
                {['DR', 'MS', 'JA'].map((av) => (
                  <div key={av} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-[#e4f0f2] flex items-center justify-center text-xs font-bold text-[#00685e]">{av}</div>
                ))}
                <div className="pl-4 sm:pl-6 text-xs sm:text-sm text-[#3d4947]" style={{ fontFamily: "'Inter', sans-serif" }}>Trusted by 5,000+ Professionals</div>
              </div>
            </motion.div>

            {/* Security First — dark */}
            <motion.div
              className="bg-[#00685e] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 2xl:p-10 flex flex-col justify-between shadow-lg"
              variants={fadeUp}>
              <span className="material-symbols-outlined text-[#85f5e6] text-3xl sm:text-4xl">security</span>
              <div>
                <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-semibold mb-2 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Security First</h3>
                <p className="opacity-90 text-sm sm:text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  HIPAA compliance isn't a goal; it's our baseline. We protect patient data with military-grade encryption.
                </p>
              </div>
            </motion.div>

            {/* Transparency */}
            <motion.div className="card-frosted rounded-2xl sm:rounded-3xl p-6 sm:p-8 2xl:p-10" variants={fadeUp}>
              <span className="material-symbols-outlined text-[#2d685e] text-3xl sm:text-4xl mb-3 sm:mb-4 block">visibility</span>
              <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-semibold text-[#121d1f] mb-2 sm:mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Transparency</h3>
              <p className="text-sm sm:text-base text-[#3d4947]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Clear communication and ethical technology development in every partnership.
              </p>
            </motion.div>

            {/* Innovation — wide */}
            <motion.div
              className="sm:col-span-2 card-frosted rounded-2xl sm:rounded-3xl p-6 sm:p-8 2xl:p-10 relative overflow-hidden"
              variants={fadeUp}>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-[#00685e] text-3xl sm:text-4xl mb-3 sm:mb-4 block">lightbulb</span>
                <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-semibold text-[#121d1f] mb-2 sm:mb-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Continuous Innovation</h3>
                <p className="text-sm sm:text-base text-[#3d4947] max-w-md" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  We ship updates every two weeks. Our software grows alongside the evolving needs of
                  the medical field, integrating AI and predictive analytics.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden sm:block">
                <span className="material-symbols-outlined" style={{ fontSize: '200px', color: '#00685e' }}>smart_toy</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── Dark Impact Stats ── */}
      <section className="bg-[#273234] section-padding">
        <div className="site-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 2xl:gap-24 items-center">
            <div>
              <h2 className="heading-hero text-[#effcfe] mb-4 sm:mb-5">Real Impact in Numbers</h2>
              <p className="text-description text-[#bcc9c6] mb-8 sm:mb-10">
                We measure our success by the time saved for doctors and the quality of care received
                by patients. Our footprint spans across continents, hospitals, and clinics.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map((s) => (
                  <motion.div key={s.label} className="p-4 sm:p-6 2xl:p-8 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div className="text-[36px] sm:text-[48px] 2xl:text-[56px] font-bold text-[#85f5e6] leading-none mb-1"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
                      {s.value}
                    </div>
                    <div className="text-xs sm:text-xs text-[#bcc9c6] uppercase tracking-widest"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: 'monitoring', label: 'Real-time Monitoring' },
                { icon: 'shield_lock', label: 'HIPAA Compliant' },
                { icon: 'cloud_sync', label: 'Cloud-Native' },
                { icon: 'support_agent', label: '24/7 Support' },
              ].map((item) => (
                <div key={item.label}
                  className="p-4 sm:p-6 2xl:p-8 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 flex flex-col items-center gap-2 sm:gap-3 text-center">
                  <span className="material-symbols-outlined text-[#67d9ca] text-3xl sm:text-4xl 2xl:text-5xl">{item.icon}</span>
                  <span className="text-xs sm:text-sm 2xl:text-base text-[#bcc9c6]" style={{ fontFamily: "'Inter', sans-serif" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Q&A Section ── */}
      <section className="py-8 sm:py-12 site-wrapper">
        <div className="text-center max-w-4xl mx-auto mb-8 space-y-3">
          <span
            className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border inline-block"
            style={{
              background: 'color-mix(in srgb, var(--t-primary, #00685e) 10%, transparent)',
              borderColor: 'color-mix(in srgb, var(--t-primary, #00685e) 25%, transparent)',
              color: 'var(--t-primary, #00685e)',
            }}
          >
            ABOUT Omedo HMS FAQ
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text, #121d1f)' }}
          >
            Frequently Asked Questions (Q&A)
          </h2>
          <p
            className="text-xs sm:text-sm"
            style={{ color: 'var(--t-text-secondary, #3d4947)' }}
          >
            Find detailed answers to common queries regarding implementation, data security, system integrations, and multi-branch management.
          </p>
        </div>

        <div className="w-full space-y-3 px-3 sm:px-4 md:px-6">
          {aboutFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="rounded-2xl border overflow-hidden transition-all shadow-xs"
                style={{
                  background: 'var(--t-surface, #fff)',
                  borderColor: isOpen ? 'var(--t-primary, #00685e)' : 'var(--t-border-light, #bcc9c6)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm cursor-pointer"
                  style={{ color: 'var(--t-text, #121d1f)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span>{faq.question}</span>
                  <span
                    className="material-symbols-outlined text-lg transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none', color: 'var(--t-primary, #00685e)' }}
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
                        color: 'var(--t-text-secondary, #3d4947)',
                        borderColor: 'color-mix(in srgb, var(--t-border-light, #bcc9c6) 60%, transparent)',
                      }}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pt-4 sm:pt-6 pb-12 sm:pb-16 md:pb-20">
        <div className="site-wrapper">
          <motion.div
            className="card-frosted rounded-2xl p-8 sm:p-12 md:p-16 2xl:p-20 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="absolute top-0 right-0 p-6 sm:p-10 opacity-10 pointer-events-none hidden sm:block">
              <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>health_and_safety</span>
            </div>
            <h2 className="heading-hero text-[#121d1f] mb-5">Ready to Modernize Your Care?</h2>
            <p className="text-description text-[#3d4947] max-w-2xl mx-auto mb-8 sm:mb-10">
              Join thousands of medical facilities that trust Omedo HMS to handle their operations,
              allowing them to focus entirely on patient recovery.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Link to="/contact" className="w-full sm:w-auto bg-[#00685e] text-white px-8 sm:px-12 py-3.5 sm:py-4 2xl:py-5 min-h-[48px] rounded-full text-xs sm:text-sm 2xl:text-base font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Book a Demo Today
              </Link>
              <Link to="/contact" className="w-full sm:w-auto border border-[#bcc9c6] text-[#00685e] px-8 sm:px-12 py-3.5 sm:py-4 2xl:py-5 min-h-[48px] rounded-full text-xs sm:text-sm 2xl:text-base font-bold hover:bg-[#eaf6f8] active:scale-95 transition-all flex items-center justify-center"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                View Product Tour
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
