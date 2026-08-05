import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { pageTransition } from '../../utils/animations'
import { CheckCircle2, XCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const plans = [
  {
    tier: 'Basic',
    price: '$199',
    period: '/month',
    description: 'Essential clinical tools for small practices and solo practitioners.',
    featured: false,
    cta: 'Start 14-day Free Trial',
    features: [
      { label: 'Up to 3 practitioners',       included: true },
      { label: 'Patient Record Management',    included: true },
      { label: 'E-Prescription Module',        included: true },
      { label: 'Basic Appointment Scheduler',  included: true },
      { label: 'Inventory Management',         included: false },
    ],
  },
  {
    tier: 'Professional',
    price: '$499',
    period: '/month',
    description: 'Comprehensive management system for growing clinics and mid-sized hospitals.',
    featured: true,
    cta: 'Start Free Trial',
    features: [
      { label: 'Everything in Basic',          included: true },
      { label: 'Up to 15 practitioners',       included: true },
      { label: 'Lab Information System (LIS)', included: true },
      { label: 'Full Inventory & Pharmacy',    included: true },
      { label: 'Insurance Claims Processing',  included: true },
      { label: 'Advanced Analytics Reports',   included: true },
    ],
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Scalable solutions with dedicated support for large hospital networks.',
    featured: false,
    cta: 'Contact Sales',
    features: [
      { label: 'Unlimited practitioners',       included: true },
      { label: 'Multi-branch Coordination',     included: true },
      { label: 'On-premise / Hybrid Cloud',     included: true },
      { label: 'API Access & Custom Integration', included: true },
      { label: 'Dedicated Success Manager',     included: true },
      { label: '24/7 Priority VIP Support',     included: true },
    ],
  },
]

export default function Pricing() {
  return (
    <motion.div {...pageTransition}>
      <div className="relative overflow-hidden">

        {/* Ambient glow */}
        <div
          className="absolute top-0 right-0 -z-10 opacity-20 sm:opacity-30"
          style={{ width: 400, height: 400, background: 'radial-gradient(circle, #67d9ca 0%, transparent 70%)', transform: 'translate(25%, -50%)' }}
        />

        {/* ── Hero ── */}
        <section className="site-wrapper pt-24 sm:pt-28 md:pt-32 2xl:pt-40 pb-12 sm:pb-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl 2xl:max-w-4xl mx-auto">
            <motion.div
              className="inline-flex items-center px-4 py-1.5 bg-[#afecde] text-[#326c62] rounded-full text-sm mb-5 sm:mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }} variants={fadeUp}>
              <span className="material-symbols-outlined text-base sm:text-lg mr-1">verified</span>
              Transparent, patient-centric pricing
            </motion.div>
            <motion.h1 className="heading-hero text-[#121d1f] mb-5" variants={fadeUp}>
              Choose the right care for your practice
            </motion.h1>
            <motion.p className="text-description text-[#3d4947]" variants={fadeUp}>
              Scale your medical facility with precision. Whether you're a private clinic or a
              multi-specialty hospital, we have a plan built for your efficiency.
            </motion.p>
          </motion.div>
        </section>

        {/* ── Pricing Cards ── */}
        <section className="site-wrapper pb-16 sm:pb-20 2xl:pb-28">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 2xl:gap-8 items-stretch"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {plans.map((plan) => (
              <motion.div
                key={plan.tier}
                className={`relative flex flex-col rounded-2xl p-5 sm:p-8 2xl:p-10 ${
                  plan.featured
                    ? 'bg-white border-2 border-[#00685e] lg:scale-105 z-10 overflow-hidden shadow-xl'
                    : 'bg-white border border-[#bcc9c6]/40 hover:border-[#67d9ca] transition-colors duration-300'
                }`}
                style={{ boxShadow: plan.featured ? '0px 10px 40px rgba(18,155,142,0.15)' : 'var(--shadow-card)' }}
                variants={fadeUp}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 bg-[#00685e] text-white px-4 py-1 text-[11px] sm:text-xs font-bold rounded-bl-xl tracking-wider"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    BEST VALUE
                  </div>
                )}

                <div className="mb-5 sm:mb-8">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest"
                    style={{ color: plan.featured ? '#00685e' : '#555e5c', fontFamily: "'Inter', sans-serif" }}>
                    {plan.tier}
                  </span>
                  <div className="mt-2 flex items-baseline gap-1 flex-wrap">
                    <span className="text-[32px] sm:text-[40px] 2xl:text-[48px] font-bold text-[#121d1f]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-[#3d4947] text-sm sm:text-base">{plan.period}</span>}
                  </div>
                  <p className="mt-2.5 sm:mt-4 text-xs sm:text-base 2xl:text-lg text-[#3d4947]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {plan.description}
                  </p>
                </div>

                <div className="flex-grow space-y-3 sm:space-y-4 mb-6 sm:mb-10">
                  {plan.features.map((feat) => (
                    <div key={feat.label} className="flex items-start gap-2.5 sm:gap-3">
                      {feat.included
                        ? <CheckCircle2 size={18} className="text-[#00685e] shrink-0 mt-0.5" />
                        : <XCircle     size={18} className="text-[#bcc9c6] shrink-0 mt-0.5" />}
                      <span className={`text-xs sm:text-base 2xl:text-lg ${feat.included ? 'text-[#121d1f]' : 'text-[#6d7a77]'}`}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {feat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div>
                  <Link
                    to="/contact"
                    className={`w-full py-3.5 sm:py-4 2xl:py-5 min-h-[48px] px-4 rounded-full font-bold text-xs sm:text-sm 2xl:text-base transition-all active:scale-95 flex items-center justify-center ${
                      plan.featured
                        ? 'bg-[#00685e] text-white hover:opacity-90 shadow-lg'
                        : 'border-2 border-[#67d9ca] text-[#00685e] hover:bg-[#eaf6f8]'
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {plan.cta}
                  </Link>
                  {plan.featured && (
                    <p className="text-center mt-2.5 text-[11px] text-[#3d4947] opacity-70" style={{ fontFamily: "'Inter', sans-serif" }}>
                      No credit card required for 30 days
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── What's Included ── */}
        <section className="site-wrapper pb-16 sm:pb-20 2xl:pb-28">
          <h2 className="heading-section text-center text-[#121d1f] mb-8 sm:mb-10">
            What's included in every plan?
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 2xl:gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {/* Wide security card */}
            <motion.div
              className="sm:col-span-2 p-6 sm:p-8 2xl:p-10 bg-[#eaf6f8] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6"
              variants={fadeUp}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 2xl:w-20 2xl:h-20 shrink-0 bg-[#008378] rounded-xl sm:rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl sm:text-3xl">security</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl 2xl:text-2xl font-bold text-[#121d1f] mb-1"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Bank-Grade Security</h3>
                <p className="text-sm sm:text-base text-[#3d4947]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  HIPAA compliant, end-to-end encryption for all patient sensitive data.
                </p>
              </div>
            </motion.div>

            {['smartphone', 'cloud_sync'].map((icon, i) => (
              <motion.div key={i}
                className="p-6 sm:p-8 2xl:p-10 bg-[#eaf6f8] rounded-2xl flex flex-col justify-center text-center"
                variants={fadeUp}>
                <span className="material-symbols-outlined text-[#00685e] text-3xl sm:text-4xl 2xl:text-5xl mb-2 mx-auto">
                  {icon}
                </span>
                <h3 className="text-base sm:text-lg 2xl:text-xl font-bold text-[#121d1f]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {i === 0 ? 'Mobile App' : 'Daily Backups'}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Dark CTA Bar ── */}
        <section className="site-wrapper pb-16 sm:pb-20 2xl:pb-28">
          <div className="bg-[#273234] text-[#effcfe] p-6 sm:p-10 md:p-14 2xl:p-16 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
            <div className="max-w-xl">
              <h2 className="heading-section text-[#effcfe] mb-3 sm:mb-4">
                Ready to modernize your healthcare system?
              </h2>
              <p className="text-sm sm:text-base 2xl:text-lg text-[#bcc9c6]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Join over 1,200 medical facilities that trust MedCare HMS for their daily operations.
                No implementation fees, no hidden costs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto shrink-0">
              <Link to="/contact" className="flex-1 md:flex-none px-8 sm:px-10 py-3.5 sm:py-4 bg-[#85f5e6] text-[#00201d] font-bold rounded-full hover:opacity-90 active:scale-95 transition-all text-sm 2xl:text-base whitespace-nowrap flex items-center justify-center"
                style={{ fontFamily: "'Inter', sans-serif" }}>Get Started</Link>
              <Link to="/modules" className="flex-1 md:flex-none px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-[#85f5e6] text-[#85f5e6] font-bold rounded-full hover:bg-white/10 active:scale-95 transition-all text-sm 2xl:text-base whitespace-nowrap flex items-center justify-center"
                style={{ fontFamily: "'Inter', sans-serif" }}>See Features</Link>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  )
}
