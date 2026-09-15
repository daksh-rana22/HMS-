import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import TestimonialCard from '../common/TestimonialCard'
import { testimonials as initialTestimonials } from '../../data/testimonials'
import { staggerContainer } from '../../utils/animations'
import { fetchTestimonials } from '../../services/api'
import { safeSetItem, safeGetItem } from '../../utils/storage'

export default function Testimonials() {
  const [reviews, setReviews] = useState(() => {
    const s = safeGetItem('omedo_admin_reviews')
    if (s) {
      try {
        const parsed = JSON.parse(s)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const valid = parsed.filter((item) => item && item.content && typeof item.content === 'string' && item.content.trim().length > 0)
          if (valid.length > 0) return valid
        }
      } catch (e) {
        console.error(e)
      }
    }
    return initialTestimonials
  })

  // Normalize API testimonial object to component card format
  const normalizeTestimonial = (t, idx) => ({
    id: t.id ?? idx + 1,
    name: t.person_name || t.name || 'Healthcare Practitioner',
    role: t.designation || t.role || 'Medical Leader',
    organization: t.organization || t.facility || t.client_name || 'Healthcare Network',
    content: t.testimonial || t.content || '',
    rating: Number(t.rating) || 5,
    avatar: (t.person_name || t.name || 'HP').slice(0, 2).toUpperCase(),
    status: (t.is_active ?? (t.status !== 'INACTIVE')) ? 'ACTIVE' : 'INACTIVE',
  })

  useEffect(() => {
    const loadLiveTestimonials = async () => {
      try {
        const res = await fetchTestimonials()
        if (res && res.success && Array.isArray(res.list) && res.list.length > 0) {
          const normalized = res.list.map(normalizeTestimonial)
          setReviews(normalized)
          safeSetItem('omedo_admin_reviews', normalized)
        }
      } catch (err) {
        console.warn('Testimonials live sync:', err)
      }
    }

    loadLiveTestimonials()

    const handleSync = () => {
      const s = safeGetItem('omedo_admin_reviews')
      if (s) {
        try {
          const parsed = JSON.parse(s)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReviews(parsed)
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
    window.addEventListener('storage', handleSync)
    window.addEventListener('omedo_reviews_updated', handleSync)
    return () => {
      window.removeEventListener('storage', handleSync)
      window.removeEventListener('omedo_reviews_updated', handleSync)
    }
  }, [])

  const activeReviews = useMemo(() => {
    const list = reviews.filter((r) => r.status !== 'INACTIVE' && r.content)
    return list.length > 0 ? list : initialTestimonials
  }, [reviews])

  return (
    <section className="py-16 md:py-24 bg-background-light">
      <Container>
        <SectionTitle
          badge="Testimonials"
          title="What Healthcare Leaders Say"
          subtitle="Hear from the doctors, administrators, and IT leaders who trust OMEDO to power their healthcare operations."
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {activeReviews.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id || index} {...testimonial} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
