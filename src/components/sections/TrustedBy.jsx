import { motion } from 'framer-motion'
import Container from '../ui/Container'
import { fadeIn, staggerContainer } from '../../utils/animations'

const logos = [
  'Apollo Healthcare',
  'Metro General',
  'Pacific Health',
  'Global Care',
  'Sunrise Medical',
  'CityMed',
  'WellPoint',
  'HealthFirst',
]

export default function TrustedBy() {
  return (
    <section className="py-12 md:py-16 border-y border-border/50 bg-background-light/50">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.p
            className="text-center text-sm font-medium text-gray mb-8 uppercase tracking-wider"
            variants={fadeIn}
          >
            Trusted by leading healthcare organizations
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14"
            variants={fadeIn}
          >
            {logos.map((logo) => (
              <div
                key={logo}
                className="text-gray-light/60 hover:text-gray transition-colors duration-300 text-base md:text-lg font-bold tracking-tight"
              >
                {logo}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
