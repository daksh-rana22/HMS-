import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

const avatars = [
  { initials: 'DR', bg: '#85f5e6', text: '#00201d' },
  { initials: 'MS', bg: '#b2eee1', text: '#00201b' },
  { initials: 'JA', bg: '#dbe4e2', text: '#151d1c' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden hero-glow-bg pt-24 sm:pt-28 md:pt-32 2xl:pt-40 pb-16 sm:pb-20 md:pb-24 2xl:pb-32">
      {/* Ambient radial blob */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] 2xl:w-[900px] h-[500px] sm:h-[700px] 2xl:h-[900px] rounded-full pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle, rgba(133,245,230,0.15) 0%, transparent 70%)' }}
      />

      <div className="site-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 2xl:gap-20 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            className="lg:col-span-6 space-y-5 sm:space-y-6 2xl:space-y-8 text-center lg:text-left"
            initial="hidden" animate="visible" variants={stagger}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#afecde] text-[#326c62] mx-auto lg:mx-0"
              variants={fadeUp}
            >
              <CheckCircle2 size={18} className="text-[#00685e] shrink-0" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif" }}>
                Trusted by 500+ Hospitals Globally
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="heading-hero font-bold text-[#121d1f]"
              variants={fadeUp}
            >
              Streamline Your{' '}
              <span className="text-[#00685e]">Clinical Workflow</span>
              {' '}with Intelligent Automation
            </motion.h1>

            {/* Body */}
            <motion.p
              className="text-description text-[#3d4947] max-w-xl mx-auto lg:mx-0"
              variants={fadeUp}
            >
              Empower your medical staff with a unified Hospital Management System designed for the
              modern healthcare era. Reduce administrative burden and focus on what matters most:
              patient health.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1 justify-center lg:justify-start"
              variants={fadeUp}
            >
              <button
                className="inline-flex items-center justify-center gap-2 bg-[#00685e] text-white
                           px-8 sm:px-10 h-12 sm:h-14 2xl:h-16 rounded-full
                           text-sm 2xl:text-base font-bold
                           hover:shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Book a Demo
                <ArrowRight size={18} />
              </button>
              <button
                className="inline-flex items-center justify-center
                           border-2 border-[#00685e] text-[#00685e]
                           px-8 sm:px-10 h-12 sm:h-14 2xl:h-16 rounded-full
                           text-sm 2xl:text-base font-bold
                           hover:bg-[#00685e]/5 active:scale-95 transition-all duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Explore Features
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex items-center gap-3 sm:gap-4 pt-1 justify-center lg:justify-start"
              variants={fadeUp}
            >
              <div className="flex -space-x-3">
                {avatars.map((av) => (
                  <div
                    key={av.initials}
                    className="w-9 h-9 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12 rounded-full border-2 border-white flex items-center justify-center text-[11px] sm:text-[12px] font-bold"
                    style={{ backgroundColor: av.bg, color: av.text }}
                  >
                    {av.initials}
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#3d4947]" style={{ fontFamily: "'Inter', sans-serif" }}>
                Join thousands of physicians today
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: Dashboard image ── */}
          <motion.div
            className="lg:col-span-6 relative mt-6 lg:mt-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Card */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#bcc9c6]/20 p-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpwLpGzqAFUezisZk95pTf_rOJ7YMdKZlrmZvTCb5pvyrGpqmjs5kD7xH9_Pk4oH1DVIKQXTYSoZMLhGxrC3Mq71IlJrmlh-6jUExFC_LJFOeSsULCeKxxUS9Lx_657gat5cOwMhKwDLVKwyfDSGX73UmOgXgg7EFMsRQa_fk6xpJlf4xGDezjj19Evm9UMC4sZcl9xlOINPadMXnxmKmS9Jw1ijhg4ra0zpe8n-Xv8fmb_SE9N_uf"
                alt="Modern healthcare facility with medical staff"
                className="w-full h-auto rounded-xl object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentNode.style.background = 'linear-gradient(135deg, #effcfe 0%, #b2eee1 100%)'
                  e.target.parentNode.style.minHeight = '300px'
                }}
              />
            </div>

            {/* Decorative blobs */}
            <div
              className="absolute -top-10 -right-10 w-32 sm:w-40 2xl:w-56 h-32 sm:h-40 2xl:h-56 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-glow"
              style={{ backgroundColor: '#b2eee1' }}
            />
            <div
              className="absolute -bottom-10 -left-10 w-40 sm:w-48 2xl:w-64 h-40 sm:h-48 2xl:h-64 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-glow"
              style={{ backgroundColor: '#85f5e6', animationDelay: '2s' }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
