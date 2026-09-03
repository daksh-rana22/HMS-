import { motion } from 'framer-motion'
import { pageTransition } from '../../utils/animations'
import ProductsShowcase from '../../components/sections/ProductsShowcase'

export default function Products() {
  return (
    <motion.div {...pageTransition} className="pt-20 sm:pt-24 min-h-screen">
      <ProductsShowcase />
    </motion.div>
  )
}
