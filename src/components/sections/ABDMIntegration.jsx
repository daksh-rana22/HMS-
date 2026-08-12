import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

const milestones = [
  {
    id: 'M1',
    label: 'Milestone 1',
    icon: 'person_add',
    title: 'ABHA Creation & Linking',
    desc: 'Integration Milestone 1 — Support for patient ABHA (Ayushman Bharat Health Account) identity creation and linking within the HMS registration workflow.',
    color: 'var(--t-primary)',
  },
  {
    id: 'M2',
    label: 'Milestone 2',
    icon: 'folder_shared',
    title: 'Health Records Exchange',
    desc: 'Integration Milestone 2 — Secure sharing and fetching of patient health records via the ABDM Health Information Exchange (HIE) framework.',
    color: 'var(--t-primary-mid)',
  },
  {
    id: 'M3',
    label: 'Milestone 3',
    icon: 'cloud_sync',
    title: 'Full ABDM Compliance',
    desc: 'Integration Milestone 3 — End-to-end ABDM ecosystem compliance including HIP/HIU roles, consent management, and digital health records archival.',
    color: 'var(--t-accent)',
  },
]

export default function ABDMIntegration() {
  return (
    <section
      className="py-14 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{ background: 'var(--t-bg, #effcfe)' }}
      id="abdm-integration"
    >
      {/* Subtle background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, var(--t-hero-glow, rgba(0,180,162,0.10)) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--t-border, #bcc9c6), transparent)' }}
      />

      <div className="site-wrapper relative z-10 px-2 sm:px-4 lg:px-6 max-w-[96%] xl:max-w-[1440px]">

        {/* ── Section Header with 2 Flanking ABDM Emblem Images ── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-3 xl:gap-4 mb-12 sm:mb-16">
          
          {/* Left Still ABDM Image (Bigger) */}
          <div className="w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[260px] xl:max-w-[320px] shrink-0 order-2 lg:order-1 flex items-center justify-center">
            <img
              src="/images/abdm_logo_bg.svg"
              alt="Ayushman Bharat Digital Mission Emblem Left"
              className="w-full h-auto object-contain filter drop-shadow-lg select-none"
            />
          </div>

          {/* Center Content */}
          <motion.div
            className="flex-1 max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* India flag + ABDM badge */}
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border"
                style={{
                  background: 'color-mix(in srgb, var(--t-primary) 8%, white)',
                  borderColor: 'color-mix(in srgb, var(--t-primary) 25%, transparent)',
                  color: 'var(--t-primary)',
                }}
              >
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
                Govt. of India Initiative
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border"
                style={{
                  background: 'color-mix(in srgb, var(--t-accent) 10%, white)',
                  borderColor: 'color-mix(in srgb, var(--t-accent) 25%, transparent)',
                  color: 'var(--t-primary-dark)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                NHA · ABDM Ecosystem
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}
            >
              ABDM &amp;{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'var(--t-gradient-text, linear-gradient(135deg, var(--t-primary) 0%, var(--t-accent) 100%))' }}
              >
                ABHA Integration
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--t-primary)' }}
            >
              Ayushman Bharat Digital Mission
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'var(--t-text-secondary)' }}
            >
              Empowering hospitals with seamless digital healthcare connectivity through ABDM and ABHA integration.
            </motion.p>
          </motion.div>

          {/* Right Still ABDM Image (Bigger) */}
          <div className="w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[260px] xl:max-w-[320px] shrink-0 order-3 flex items-center justify-center">
            <img
              src="/images/abdm_logo_bg.svg"
              alt="Ayushman Bharat Digital Mission Emblem Right"
              className="w-full h-auto object-contain filter drop-shadow-lg select-none"
            />
          </div>

        </div>

        {/* ── 4 Full-Width Key Capability Cards (Below Header Row) ── */}
        <motion.div
          className="mb-10 sm:mb-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
              color: 'var(--t-accent)',
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="p-5 rounded-2xl border shadow-sm hover:shadow-md transition-all flex items-start gap-3.5"
              style={{
                borderColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)',
                background: 'var(--t-surface, #fff)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
                style={{
                  background: 'color-mix(in srgb, var(--t-primary) 10%, transparent)',
                  borderColor: 'color-mix(in srgb, var(--t-primary) 25%, transparent)',
                  color: item.color,
                }}
              >
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {item.icon}
                </span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
                  {item.label}
                </h4>
                <p className="text-[11px] leading-relaxed mt-1" style={{ color: 'var(--t-text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── ABHA Integration Header Card ── */}
        <motion.div
          className="rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-10 border shadow-md"
          style={{ borderColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)', background: 'var(--t-surface, #fff)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Gradient header bar */}
          <div
            className="px-6 sm:px-10 py-4 sm:py-5 flex items-center justify-between flex-wrap gap-3"
            style={{
              background: 'linear-gradient(135deg, var(--t-primary) 0%, var(--t-primary-mid) 100%)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  health_and_safety
                </span>
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base sm:text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  ABHA INTEGRATION
                </h3>
                <p className="text-white/75 text-[11px] sm:text-xs font-medium">
                  Ayushman Bharat Health Account · Digital Health Identity
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              <span className="text-white/80 text-[11px] font-semibold">Integration Active</span>
            </div>
          </div>

          {/* Milestone progression label */}
          <div
            className="px-6 sm:px-10 py-3 border-b flex items-center justify-between flex-wrap gap-2"
            style={{
              borderColor: 'var(--t-border-light)',
              background: 'color-mix(in srgb, var(--t-surface-low) 80%, transparent)',
            }}
          >
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--t-text-muted)' }}>
              ABDM Integration Milestones
            </span>
            <div className="flex items-center gap-1.5">
              {milestones.map((m, i) => (
                <div key={m.id} className="flex items-center gap-1.5">
                  <span
                    className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                    style={{
                      background: 'color-mix(in srgb, var(--t-primary) 12%, transparent)',
                      color: 'var(--t-primary)',
                    }}
                  >
                    {m.id}
                  </span>
                  {i < milestones.length - 1 && (
                    <span className="material-symbols-outlined text-[12px]" style={{ color: 'var(--t-border)' }}>
                      chevron_right
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* M1 → M2 → M3 milestone cards */}
          <div className="p-5 sm:p-8">
            {/* Desktop: horizontal with connector line */}
            <div className="relative">

              {/* Connector line — desktop only */}
              <div
                className="hidden md:block absolute top-8 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 z-0"
                style={{ background: 'linear-gradient(90deg, var(--t-primary), var(--t-primary-mid), var(--t-accent))' }}
              >
                {/* Animated travelling dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-md"
                  style={{ background: 'var(--t-primary)' }}
                  animate={{ left: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                {milestones.map((m) => (
                  <motion.div
                    key={m.id}
                    variants={fadeUp}
                    className="flex flex-col items-center md:items-start text-center md:text-left rounded-xl sm:rounded-2xl border p-5 sm:p-6 shadow-sm relative overflow-hidden group"
                    style={{
                      background: 'var(--t-surface, #fff)',
                      borderColor: 'var(--t-border-light)',
                    }}
                  >
                    {/* Soft background glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl sm:rounded-2xl"
                      style={{ background: 'color-mix(in srgb, var(--t-primary) 4%, transparent)' }}
                    />

                    {/* Milestone number badge */}
                    <div className="flex items-center gap-3 mb-4 relative z-10 w-full">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm border"
                        style={{
                          background: 'linear-gradient(135deg, var(--t-primary) 0%, var(--t-primary-mid) 100%)',
                          borderColor: 'color-mix(in srgb, var(--t-primary) 30%, transparent)',
                        }}
                      >
                        <span
                          className="text-white font-extrabold text-xl"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {m.id}
                        </span>
                      </div>
                      <div>
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest block"
                          style={{ color: 'var(--t-text-muted)' }}
                        >
                          {m.label}
                        </span>
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5"
                          style={{
                            background: 'color-mix(in srgb, var(--t-accent) 12%, transparent)',
                            color: 'var(--t-primary-dark)',
                          }}
                        >
                          <span className="material-symbols-outlined text-[10px]">verified</span>
                          ABDM Certified
                        </span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 relative z-10"
                      style={{
                        background: 'color-mix(in srgb, var(--t-primary) 10%, transparent)',
                        border: '1px solid color-mix(in srgb, var(--t-primary) 20%, transparent)',
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-xl"
                        style={{ color: 'var(--t-primary)', fontVariationSettings: "'FILL' 1" }}
                      >
                        {m.icon}
                      </span>
                    </div>

                    <h4
                      className="font-bold text-sm sm:text-base mb-2 relative z-10"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}
                    >
                      {m.title}
                    </h4>
                    <p
                      className="text-[11px] sm:text-xs leading-relaxed relative z-10"
                      style={{ color: 'var(--t-text-secondary)' }}
                    >
                      {m.desc}
                    </p>

                    {/* Mobile connector arrow */}
                    <div className="md:hidden mt-4 flex justify-center w-full relative z-10">
                      {m.id !== 'M3' && (
                        <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--t-border)' }}>
                          keyboard_arrow_down
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── ABDM & ABHA Info Cards ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >

          {/* About ABDM */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border p-6 sm:p-8 shadow-sm flex flex-col gap-4"
            style={{
              background: 'var(--t-surface, #fff)',
              borderColor: 'color-mix(in srgb, var(--t-primary) 18%, transparent)',
            }}
          >
            {/* ABDM badge */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{
                    background: 'linear-gradient(135deg, var(--t-primary) 0%, var(--t-primary-mid) 100%)',
                    borderColor: 'color-mix(in srgb, var(--t-primary) 30%, transparent)',
                  }}
                >
                  <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    account_balance
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
                    About ABDM
                  </h4>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mt-0.5"
                    style={{
                      background: 'color-mix(in srgb, var(--t-primary) 10%, transparent)',
                      color: 'var(--t-primary)',
                    }}
                  >
                    ABDM
                  </span>
                </div>
              </div>
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                style={{
                  borderColor: 'color-mix(in srgb, var(--t-primary) 25%, transparent)',
                  color: 'var(--t-primary)',
                  background: 'color-mix(in srgb, var(--t-primary) 6%, white)',
                }}
              >
                NHA · India
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--t-text-secondary)' }}>
              Ayushman Bharat Digital Mission (ABDM) is India's digital health ecosystem initiative,
              designed to enable interoperable digital healthcare services and secure exchange of health information.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {['Interoperable', 'Secure HIE', 'NHA Backed', 'Open Standards'].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: 'color-mix(in srgb, var(--t-primary) 8%, transparent)',
                    color: 'var(--t-primary)',
                    border: '1px solid color-mix(in srgb, var(--t-primary) 18%, transparent)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ABHA Integration */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border p-6 sm:p-8 shadow-sm flex flex-col gap-4"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--t-surface) 95%, var(--t-accent)), var(--t-surface))',
              borderColor: 'color-mix(in srgb, var(--t-accent) 25%, transparent)',
            }}
          >
            {/* ABHA badge */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{
                    background: 'linear-gradient(135deg, var(--t-primary-dark) 0%, var(--t-primary) 100%)',
                    borderColor: 'color-mix(in srgb, var(--t-primary) 30%, transparent)',
                  }}
                >
                  <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    badge
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
                    ABHA Integration
                  </h4>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mt-0.5"
                    style={{
                      background: 'color-mix(in srgb, var(--t-accent) 15%, transparent)',
                      color: 'var(--t-primary-dark)',
                    }}
                  >
                    ABHA
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-semibold" style={{ color: 'var(--t-text-muted)' }}>Supported</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--t-text-secondary)' }}>
              ABHA (Ayushman Bharat Health Account) enables individuals to establish a digital health identity
              within the ABDM ecosystem — linking all health records to a single secure, portable health ID.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {['Digital Health ID', 'Consent Based', 'Portable Records', 'Privacy First'].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: 'color-mix(in srgb, var(--t-accent) 10%, transparent)',
                    color: 'var(--t-primary-dark)',
                    border: '1px solid color-mix(in srgb, var(--t-accent) 25%, transparent)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          className="mt-8 sm:mt-10 rounded-2xl border px-6 sm:px-10 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: 'color-mix(in srgb, var(--t-primary) 5%, var(--t-surface))',
            borderColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span
              className="material-symbols-outlined text-2xl shrink-0"
              style={{ color: 'var(--t-primary)', fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <div>
              <p className="font-bold text-sm sm:text-base" style={{ color: 'var(--t-text)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Ready to integrate ABDM with your hospital?
              </p>
              <p className="text-[11px] sm:text-xs" style={{ color: 'var(--t-text-muted)' }}>
                Our team guides you through full ABDM onboarding and certification.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white whitespace-nowrap shrink-0 transition-all hover:scale-[1.03]"
            style={{
              background: 'var(--t-primary)',
              boxShadow: '0 4px 20px var(--t-btn-shadow)',
            }}
          >
            Talk to Our Team
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
