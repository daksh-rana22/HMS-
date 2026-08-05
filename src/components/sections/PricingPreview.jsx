import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'
import { fadeUp, staggerContainer } from '../../utils/animations'

const plans = [
  {
    name: 'Starter',
    price: '499',
    features: ['Up to 50 beds', 'Patient Management', 'Basic Billing', 'Email Support'],
  },
  {
    name: 'Professional',
    price: '999',
    highlighted: true,
    badge: 'Most Popular',
    features: ['Up to 250 beds', 'All Modules', 'Advanced Analytics', 'Priority Support'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Unlimited Beds', 'Custom Integrations', 'Dedicated Manager', '24/7 Support'],
  },
]

export default function PricingPreview() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionTitle
          badge="Pricing"
          title="Simple, Transparent Pricing"
          subtitle="Choose the plan that fits your facility. No hidden fees, no surprises."
        />

        <motion.div
          className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative p-6 rounded-2xl border-2 text-center ${
                plan.highlighted
                  ? 'border-primary bg-white'
                  : 'border-border bg-white hover:border-primary/30'
              } transition-all duration-300`}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              style={{ boxShadow: plan.highlighted ? 'var(--shadow-xl)' : 'var(--shadow-sm)' }}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="gradient-bg text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold text-text mb-2">{plan.name}</h3>
              <div className="mb-4">
                {plan.price !== 'Custom' && <span className="text-gray">$</span>}
                <span className="text-3xl font-extrabold text-text">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-gray text-sm">/mo</span>}
              </div>

              <ul className="space-y-2 mb-6 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray">
                    <Check size={16} className="text-accent shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? 'primary' : 'outline'}
                size="sm"
                className="w-full"
                href="/contact"
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            View Full Pricing Details
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
