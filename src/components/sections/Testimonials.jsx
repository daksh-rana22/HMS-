import { motion } from 'framer-motion'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import TestimonialCard from '../common/TestimonialCard'
import { testimonials } from '../../data/testimonials'
import { staggerContainer } from '../../utils/animations'

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-background-light">
      <Container>
        <SectionTitle
          badge="Testimonials"
          title="What Healthcare Leaders Say"
          subtitle="Hear from the doctors, administrators, and IT leaders who trust Omedo to power their healthcare operations."
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
