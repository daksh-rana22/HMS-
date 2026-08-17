import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Monitor } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { fadeUp } from '../../utils/animations'

const screenshots = [
  {
    title: 'Patient Dashboard',
    description: 'Comprehensive patient overview with real-time health metrics and treatment history.',
  },
  {
    title: 'Appointment Scheduling',
    description: 'Smart scheduling system with drag-and-drop calendar and automated reminders.',
  },
  {
    title: 'Lab Results Management',
    description: 'Streamlined laboratory workflow with automated test tracking and instant notifications.',
  },
  {
    title: 'Billing & Invoicing',
    description: 'Automated billing with insurance claim processing and detailed financial reports.',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time analytics with customizable widgets and actionable insights.',
  },
]

export default function DashboardPreview() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % screenshots.length)
  const prev = () => setCurrent((prev) => (prev - 1 + screenshots.length) % screenshots.length)

  return (
    <section className="py-16 md:py-24 bg-background-light">
      <Container>
        <SectionTitle
          badge="Dashboard Preview"
          title="See Omedo HMS in Action"
          subtitle="Explore the intuitive interfaces that make hospital management effortless."
        />

        <motion.div
          className="relative max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          {/* Browser Frame */}
          <div className="bg-white rounded-2xl border border-border/80 overflow-hidden" style={{ boxShadow: 'var(--shadow-2xl)' }}>
            {/* Browser Top Bar */}
            <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-border/60 bg-background-light/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-7 bg-white rounded-lg max-w-sm mx-auto flex items-center justify-center border border-border/40">
                  <span className="text-xs text-gray-light">app.Omedo.com/{screenshots[current].title.toLowerCase().replace(/\s+/g, '-')}</span>
                </div>
              </div>
            </div>

            {/* Screenshot Content */}
            <div className="relative aspect-[16/9] bg-gradient-to-br from-background-light to-white p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mb-6">
                    <Monitor className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-text mb-3 text-center">
                    {screenshots[current].title}
                  </h3>
                  <p className="text-gray text-center max-w-lg">
                    {screenshots[current].description}
                  </p>

                  {/* Mock UI Elements */}
                  <div className="mt-8 w-full max-w-2xl grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white rounded-xl p-4 border border-border/40" style={{ boxShadow: 'var(--shadow-sm)' }}>
                        <div className="h-2 bg-border/50 rounded-full w-3/4 mb-2" />
                        <div className="h-6 bg-primary/10 rounded-lg mb-2" />
                        <div className="h-2 bg-border/30 rounded-full w-1/2" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-background-light transition-colors cursor-pointer"
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={18} className="text-gray" />
            </button>

            <div className="flex items-center gap-2">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    current === index
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-border hover:bg-gray-light'
                  }`}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-background-light transition-colors cursor-pointer"
              aria-label="Next screenshot"
            >
              <ChevronRight size={18} className="text-gray" />
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
