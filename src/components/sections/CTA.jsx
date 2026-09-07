import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="site-wrapper">
        <motion.div
          className="rounded-2xl sm:rounded-3xl px-6 sm:px-12 md:px-16 2xl:px-24 py-12 sm:py-16 2xl:py-20 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--t-primary) 0%, var(--t-primary-mid) 100%)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 2xl:w-96 h-48 sm:h-64 2xl:h-96 bg-white/5 rounded-full -mr-24 sm:-mr-32 2xl:-mr-48 -mt-24 sm:-mt-32 2xl:-mt-48 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 sm:w-64 2xl:w-96 h-48 sm:h-64 2xl:h-96 bg-white/5 rounded-full -ml-24 sm:-ml-32 2xl:-ml-48 -mb-24 sm:-mb-32 2xl:-mb-48 pointer-events-none" />

          <div className="relative z-10 max-w-xl sm:max-w-2xl 2xl:max-w-3xl mx-auto space-y-6">
            <h2
              className="heading-hero"
              style={{ color: '#ffffff' }}
            >
              Ready to transform your healthcare operations?
            </h2>
            <div className="flex justify-center pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5
                           px-8 sm:px-10 2xl:px-12 py-4 rounded-full
                           text-sm 2xl:text-base font-bold shadow-lg hover:shadow-2xl
                           hover:scale-[1.03] active:scale-95 transition-all duration-200"
                style={{
                  background: 'white',
                  color: 'var(--t-primary)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span>Book a Free OMEDO Demo</span>
                <span className="material-symbols-outlined text-base font-bold">arrow_forward</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
