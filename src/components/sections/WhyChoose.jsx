import { motion } from 'framer-motion'
import { CheckCircle, TrendingUp, Shield, Clock, HeartPulse, Layers } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { fadeUp, slideRight, slideLeft, staggerContainer } from '../../utils/animations'

const benefits = [
  {
    icon: TrendingUp,
    title: 'Boost Efficiency by 40%',
    description: 'Automate repetitive tasks and optimize workflows to dramatically reduce administrative overhead.',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: 'Military-grade encryption, HIPAA compliance, and regular security audits protect sensitive patient data.',
  },
  {
    icon: Clock,
    title: 'Reduce Wait Times by 60%',
    description: 'Smart scheduling and queue management ensure patients spend less time waiting and more time receiving care.',
  },
  {
    icon: HeartPulse,
    title: 'Improve Patient Outcomes',
    description: 'Clinical decision support and real-time alerts help clinicians make better, faster treatment decisions.',
  },
  {
    icon: Layers,
    title: 'Unified Platform',
    description: 'One integrated system replaces 10+ separate tools, eliminating data silos and miscommunication.',
  },
  {
    icon: CheckCircle,
    title: 'Proven ROI',
    description: 'Our clients see an average 3x return on investment within the first year of implementation.',
  },
]

export default function WhyChoose() {
  return (
    <section className="py-16 md:py-24 bg-background-light">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Illustration */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={slideRight}
            className="relative"
          >
            <div className="bg-white rounded-2xl border border-border/60 p-6 md:p-8" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <div className="space-y-5">
                {/* Efficiency Metric */}
                <div className="flex items-center gap-4 p-4 bg-background-light rounded-xl">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text">Operational Efficiency</p>
                    <div className="mt-2 h-2 bg-border/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full gradient-bg rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: '92%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                    <p className="text-xs text-gray mt-1">92% improvement</p>
                  </div>
                </div>

                {/* Patient Satisfaction */}
                <div className="flex items-center gap-4 p-4 bg-background-light rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <HeartPulse className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text">Patient Satisfaction</p>
                    <div className="mt-2 h-2 bg-border/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: '96%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                    <p className="text-xs text-gray mt-1">96% satisfaction rate</p>
                  </div>
                </div>

                {/* Cost Reduction */}
                <div className="flex items-center gap-4 p-4 bg-background-light rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text">Cost Reduction</p>
                    <div className="mt-2 h-2 bg-border/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-secondary rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: '78%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9, duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                    <p className="text-xs text-gray mt-1">78% reduction in costs</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Benefits */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block px-4 py-1.5 text-sm font-semibold text-primary bg-primary/5 border border-primary/10 rounded-full mb-4">
                Why MedFlow
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight leading-tight mb-4">
                Why Leading Hospitals Choose{' '}
                <span className="gradient-text">MedFlow HMS</span>
              </h2>
              <p className="text-gray leading-relaxed mb-8">
                Join 500+ healthcare facilities that have transformed their operations with our intelligent, comprehensive hospital management platform.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl hover:bg-background-light transition-colors duration-200"
                  variants={fadeUp}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text mb-1">{benefit.title}</h4>
                    <p className="text-xs text-gray leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
