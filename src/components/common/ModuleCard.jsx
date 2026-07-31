import { motion } from 'framer-motion'
import { fadeUp, hoverLift } from '../../utils/animations'
import { ArrowRight } from 'lucide-react'

export default function ModuleCard({ icon: Icon, title, description, color }) {
  return (
    <motion.div
      className="group relative p-6 md:p-8 bg-white rounded-2xl border border-border/60 hover:border-transparent transition-all duration-300 overflow-hidden"
      variants={fadeUp}
      whileHover={hoverLift}
      style={{ boxShadow: 'var(--shadow-card)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
      }}
    >
      {/* Top color accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />

      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}12` }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>

      <h3 className="text-xl font-bold text-text mb-3">{title}</h3>
      <p className="text-gray leading-relaxed text-sm mb-6">{description}</p>

      <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300 cursor-pointer">
        Learn More
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </motion.div>
  )
}
