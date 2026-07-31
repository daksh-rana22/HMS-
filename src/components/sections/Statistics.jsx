import { motion } from 'framer-motion'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import StatisticCard from '../common/StatisticCard'
import { stats } from '../../data/stats'
import { staggerContainer } from '../../utils/animations'

export default function Statistics() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionTitle
          badge="By the Numbers"
          title="Trusted by Healthcare Leaders"
          subtitle="Our numbers speak for themselves — real impact, real results, real trust."
        />

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {stats.map((stat, index) => (
            <StatisticCard key={index} {...stat} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
