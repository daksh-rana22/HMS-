import { motion } from 'framer-motion'
import { pageTransition } from '../../utils/animations'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

const stats = [
  { value: '40%', label: 'Efficiency Increase' },
  { value: '12M+', label: 'Patient Records' },
  { value: '500+', label: 'Hospitals Unified' },
  { value: '0',    label: 'Data Breaches' },
]

const timeline = [
  { year: '2012', title: 'The Inception', description: 'Founded by a team of pediatricians and software engineers in Zurich, aiming to digitize paper records.' },
  { year: '2017', title: 'Global Expansion', description: 'MedCare HMS 2.0 launched with cloud-native architecture, supporting multiple languages and international coding standards.' },
  { year: '2024', title: 'AI-Driven Care', description: 'Integration of MedAI—predictive diagnostics and intelligent resource scheduling for hospitals of the future.' },
]

export default function About() {
  return (
    <motion.div {...pageTransition}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#effcfe] pt-24 sm:pt-28 md:pt-36 2xl:pt-44 pb-16 sm:pb-20 2xl:pb-28">
        <div className="site-wrapper grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 2xl:gap-24 items-center">
          {/* Text */}
          <motion.div className="space-y-5 sm:space-y-6 text-center lg:text-left"
            initial="hidden" animate="visible" variants={stagger}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#afecde] text-[#326c62] text-sm mx-auto lg:mx-0"
              style={{ fontFamily: "'Inter', sans-serif" }} variants={fadeUp}>
              <span className="material-symbols-outlined text-base sm:text-lg">verified_user</span>
              <span className="font-medium text-xs sm:text-sm">Redefining Healthcare Since 2012</span>
            </motion.div>

            <motion.h1 className="heading-hero text-[#121d1f]" variants={fadeUp}>
              Our Story: <br className="hidden sm:block" />
              Bridging the Gap Between{' '}
              <span className="text-[#00685e]">Care & Technology.</span>
            </motion.h1>

            <motion.p className="text-description text-[#3d4947] max-w-xl mx-auto lg:mx-0" variants={fadeUp}>
              At MedCare HMS, we believe that medical professionals shouldn't be bogged down by
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
                className="w-full h-auto object-cover rounded-2xl max-h-[400px] sm:max-h-[500px] 2xl:max-h-[600px] object-center"
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

      {/* ── Core Principles Bento ── */}
      <section className="section-padding">
        <div className="site-wrapper">
          <div className="text-center mb-10 sm:mb-12 2xl:mb-16">
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

      {/* ── Timeline ── */}
      <section className="section-padding">
        <div className="site-wrapper">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="heading-section text-[#121d1f] mb-2">Our Evolution</h2>
            <p className="text-description text-[#3d4947]">A decade of transforming healthcare delivery.</p>
          </div>

          <div className="relative max-w-4xl 2xl:max-w-5xl mx-auto">
            {/* Vertical line — md+ */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-[#bcc9c6]/30 hidden md:block" />

            <div className="space-y-12 sm:space-y-16 2xl:space-y-20">
              {timeline.map((item, i) => (
                <motion.div key={i}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6 }}>

                  {/* Mobile: left line */}
                  <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-[#bcc9c6]/30 md:hidden last:hidden" />

                  <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-12 md:pl-0`}>
                    <div className="text-[40px] sm:text-[56px] 2xl:text-[72px] font-bold text-[#00685e] opacity-15 mb-1 leading-none"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
                      {item.year}
                    </div>
                    <h4 className="text-lg sm:text-2xl 2xl:text-3xl font-semibold text-[#121d1f] mb-2"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-base 2xl:text-lg text-[#3d4947]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-2/12 justify-center shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#00685e] rounded-full z-10 border-4 border-[#effcfe]" />
                  </div>

                  {/* Mobile dot */}
                  <div className="absolute left-2.5 top-2 w-5 h-5 bg-[#00685e] rounded-full border-4 border-[#effcfe] md:hidden z-10" />

                  <div className="md:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding">
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
              Join thousands of medical facilities that trust MedCare HMS to handle their operations,
              allowing them to focus entirely on patient recovery.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <button className="w-full sm:w-auto bg-[#00685e] text-white px-8 sm:px-12 py-3.5 sm:py-4 2xl:py-5 min-h-[48px] rounded-full text-xs sm:text-sm 2xl:text-base font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Book a Demo Today
              </button>
              <button className="w-full sm:w-auto border border-[#bcc9c6] text-[#00685e] px-8 sm:px-12 py-3.5 sm:py-4 2xl:py-5 min-h-[48px] rounded-full text-xs sm:text-sm 2xl:text-base font-bold hover:bg-[#eaf6f8] active:scale-95 transition-all flex items-center justify-center"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                View Product Tour
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
