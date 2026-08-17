import { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import FAQAccordion from '../common/FAQAccordion'
import { faqs } from '../../data/faq'
import { staggerContainer, fadeUp } from '../../utils/animations'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-16 md:py-24 bg-background-light">
      <Container>
        <SectionTitle
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about Omedo HMS."
        />

        <motion.div
          className="w-full space-y-3 px-3 sm:px-4 md:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={fadeUp}>
              <FAQAccordion
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
