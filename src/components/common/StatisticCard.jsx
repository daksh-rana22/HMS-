import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '../../utils/animations'

function useAnimatedCounter(target, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return

    let start = 0
    const startTime = performance.now()

    function update(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }, [target, duration, startCounting])

  return count
}

export default function StatisticCard({ icon: Icon, value, suffix, label, description }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const count = useAnimatedCounter(value, 2000, isInView)

  const displayValue = Number.isInteger(value)
    ? Math.floor(count).toLocaleString()
    : count.toFixed(1)

  return (
    <motion.div
      ref={ref}
      className="text-center p-6"
      variants={fadeUp}
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <div className="text-3xl md:text-4xl font-extrabold text-text mb-1">
        {displayValue}
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-lg font-semibold text-text mb-0.5">{label}</p>
      <p className="text-sm text-gray">{description}</p>
    </motion.div>
  )
}
