import { motion } from 'framer-motion'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import ModuleCard from '../common/ModuleCard'
import { modules } from '../../data/modules'
import { staggerContainer } from '../../utils/animations'

export default function ModulesOverview() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionTitle
          badge="Modules"
          title="Comprehensive HMS Modules"
          subtitle="Six powerful, integrated modules designed to manage every aspect of your hospital operations with precision and efficiency."
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {modules.map((module, index) => (
            <ModuleCard key={index} {...module} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
