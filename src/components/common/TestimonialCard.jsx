import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'
import { Star, Quote } from 'lucide-react'

export default function TestimonialCard({ name, role, organization, content, rating, avatar }) {
  return (
    <motion.div
      className="relative p-6 md:p-8 bg-white rounded-2xl border border-border/60 transition-all duration-300 flex flex-col"
      variants={fadeUp}
      whileHover={{ y: -4 }}
      style={{ boxShadow: 'var(--shadow-card)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
      }}
    >
      <Quote className="w-8 h-8 text-primary/15 mb-4" />

      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-gray leading-relaxed text-sm mb-6 flex-1">"{content}"</p>

      <div className="flex items-center gap-3 pt-4 border-t border-border/60">
        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
          <span className="text-white text-sm font-bold">{avatar}</span>
        </div>
        <div>
          <p className="font-semibold text-text text-sm">{name}</p>
          <p className="text-gray text-xs">
            {role}, {organization}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
