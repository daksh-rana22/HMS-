import { motion } from 'framer-motion'
import { fadeUp, hoverLift } from '../../utils/animations'

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      className="group relative p-6 md:p-8 bg-white rounded-2xl border border-border/60 hover:border-primary/20 transition-all duration-300"
      variants={fadeUp}
      whileHover={hoverLift}
      style={{ boxShadow: 'var(--shadow-sm)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-text mb-2">{title}</h3>
      <p className="text-gray leading-relaxed text-sm">{description}</p>
    </motion.div>
  )
}
