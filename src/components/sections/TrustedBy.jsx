import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import { fadeIn, staggerContainer } from '../../utils/animations'
import { initialClientLogos } from '../../data/clientLogos'

export default function TrustedBy() {
  const [clients, setClients] = useState(() => {
    const s = localStorage.getItem('omedo_admin_clients')
    if (s) {
      try {
        const parsed = JSON.parse(s)
        if (Array.isArray(parsed) && parsed.length > 0 && parsed.some((item) => item.logoUrl)) {
          return parsed
        }
      } catch (e) {
        console.error(e)
      }
    }
    return initialClientLogos
  })

  useEffect(() => {
    const handleSync = () => {
      const s = localStorage.getItem('omedo_admin_clients')
      if (s) {
        try {
          const parsed = JSON.parse(s)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setClients(parsed)
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
    window.addEventListener('storage', handleSync)
    window.addEventListener('omedo_clients_updated', handleSync)
    return () => {
      window.removeEventListener('storage', handleSync)
      window.removeEventListener('omedo_clients_updated', handleSync)
    }
  }, [])

  const activeClients = useMemo(() => {
    const list = clients.filter((c) => c.status !== 'INACTIVE')
    return list.length > 0 ? list : initialClientLogos
  }, [clients])

  return (
    <section className="py-10 md:py-14 border-y border-border/50 bg-slate-50/50 relative overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.p
            className="text-center text-xs font-bold text-[#64748b] uppercase tracking-widest"
            variants={fadeIn}
          >
            TRUSTED BY LEADING INSTITUTIONS
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            variants={fadeIn}
          >
            {activeClients.map((client, idx) => (
              <div
                key={client.id || idx}
                className="flex flex-col items-center group transition-transform duration-300 hover:scale-105 px-1 sm:px-1.5"
              >
                <div className="w-40 sm:w-44 md:w-48 h-18 sm:h-20 md:h-22 bg-white rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-center p-1 sm:p-1.5 overflow-hidden transition-all duration-300 group-hover:shadow-md">
                  {client.logoUrl ? (
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="w-full h-full max-h-full max-w-full object-contain select-none transition-all duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-xl flex items-center justify-center text-xs font-black tracking-wider text-white shadow-inner p-1 text-center"
                      style={{ background: client.badgeColor || '#00685e' }}
                    >
                      {client.logoText || (client.name || 'HOSPITAL').slice(0, 10).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-center text-[#334155] group-hover:text-[#00685e] truncate mt-2 w-40 sm:w-44 md:w-48 transition-colors">
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
