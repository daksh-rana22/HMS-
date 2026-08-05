import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'
import { Check, X } from 'lucide-react'
import Button from '../ui/Button'

export default function PricingCard({ plan }) {
  const { name, price, period, description, features, highlighted, badge, cta } = plan

  return (
    <motion.div
      className={`relative p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col ${
        highlighted
          ? 'border-primary bg-white shadow-xl scale-[1.02]'
          : 'border-border bg-white hover:border-primary/30'
      }`}
      variants={fadeUp}
      whileHover={{ y: -4 }}
      style={{ boxShadow: highlighted ? 'var(--shadow-xl)' : 'var(--shadow-card)' }}
    >
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="gradient-bg text-white text-sm font-semibold px-4 py-1.5 rounded-full">
            {badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-text mb-2">{name}</h3>
        <p className="text-gray text-sm">{description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          {price !== 'Custom' && <span className="text-gray text-lg">$</span>}
          <span className="text-4xl md:text-5xl font-extrabold text-text">{price}</span>
          {period && <span className="text-gray text-base">{period}</span>}
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            {feature.included ? (
              <Check size={18} className="text-accent mt-0.5 shrink-0" />
            ) : (
              <X size={18} className="text-border mt-0.5 shrink-0" />
            )}
            <span
              className={`text-sm ${
                feature.included ? 'text-text' : 'text-gray-light'
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant={highlighted ? 'primary' : 'secondary'}
        size="lg"
        className="w-full"
        href="/contact"
      >
        {cta}
      </Button>
    </motion.div>
  )
}
