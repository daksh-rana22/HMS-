import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'

export default function SectionTitle({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignment = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  return (
    <motion.div
      className={`max-w-3xl mb-12 md:mb-16 ${alignment[align]} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeUp}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 text-sm font-semibold text-primary bg-primary/5 border border-primary/10 rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
