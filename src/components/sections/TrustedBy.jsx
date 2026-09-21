import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import { fadeIn, staggerContainer } from '../../utils/animations'
import { initialClientLogos } from '../../data/clientLogos'
import { fetchCompanyClients, formatLogoUrl } from '../../services/api'
import SafeImage from '../common/SafeImage'
import { safeSetItem, safeGetItem } from '../../utils/storage'
import trustedByBg from '../../assets/trusted_by_bg.jpg'

export default function TrustedBy() {
  const [clients, setClients] = useState(() => {
    const s = safeGetItem('omedo_admin_clients')
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

  // Normalize API company client object to component format
  const normalizeClient = (c, idx) => ({
    id: c.id ?? idx + 1,
    name: c.client_name || c.name || 'Healthcare Partner',
    location: c.short_description || c.location || '',
    logoUrl: formatLogoUrl(c.logo_url || c.logoUrl || c.image_base64 || null),
    logoText: (c.client_name || c.name || 'HOSPITAL').slice(0, 10).toUpperCase(),
    status: (c.is_active ?? (c.status !== 'INACTIVE')) ? 'ACTIVE' : 'INACTIVE',
    featured: c.is_featured ?? c.featured ?? true,
    badgeColor: c.badgeColor || '#00685e',
  })

  useEffect(() => {
    // Attempt live fetch from /it/api/v1/omedo/websites/company-clients
    const loadLiveClients = async () => {
      try {
        const res = await fetchCompanyClients()
        if (res && res.success && Array.isArray(res.list) && res.list.length > 0) {
          const normalized = res.list.map(normalizeClient)
          setClients(normalized)
          safeSetItem('omedo_admin_clients', normalized)
        }
      } catch (err) {
        console.warn('TrustedBy live clients sync:', err)
      }
    }

    loadLiveClients()

    const handleSync = () => {
      const s = safeGetItem('omedo_admin_clients')
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
    return clients.filter((c) => c.status !== 'INACTIVE')
  }, [clients])

  return (
    <section
      className="py-12 md:py-16 relative overflow-hidden bg-cover bg-center bg-no-repeat shadow-2xl"
      style={{
        backgroundImage: `url(${trustedByBg})`,
        backgroundColor: '#07152d',
        borderTop: '1px solid rgba(245, 158, 11, 0.28)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.22)',
      }}
    >
      {/* Ambient radial overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(7, 21, 45, 0.4) 0%, rgba(7, 21, 45, 0.8) 100%)',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.p
            className="text-center text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow-sm"
            variants={fadeIn}
          >
            TRUSTED BY LEADING INSTITUTIONS
          </motion.p>

          {activeClients.length > 0 && (
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
              variants={fadeIn}
            >
              {activeClients.map((client, idx) => (
                <div
                  key={client.id || idx}
                  className="flex flex-col items-center group transition-transform duration-300 hover:scale-105 px-1 sm:px-1.5"
                >
                  <div className="relative w-32 sm:w-36 md:w-40 aspect-[4/3] rounded-2xl shadow-md flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 cursor-pointer">
                    <SafeImage
                      src={client.logoUrl}
                      alt={client.name}
                      className="w-full h-full object-fill select-none rounded-2xl transition-all duration-300"
                      fallback={
                        <div
                          className="w-full h-full rounded-2xl flex items-center justify-center text-xs sm:text-sm font-black tracking-wider text-white shadow-inner p-2 text-center"
                          style={{ background: client.badgeColor || '#00685e' }}
                        >
                          {client.logoText || (client.name || 'HOSPITAL').slice(0, 10).toUpperCase()}
                        </div>
                      }
                    />

                    {/* Dark Frosted Hover Overlay with Purple Pin and Location */}
                    <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 z-10 select-none">
                      <span className="material-symbols-outlined text-[#a855f7] text-xl sm:text-2xl drop-shadow-md mb-0.5">
                        location_on
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-black uppercase text-white tracking-wider text-center leading-tight drop-shadow-md px-1 line-clamp-2">
                        {client.location || client.name || 'INDIA'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-center text-blue-100/90 group-hover:text-amber-300 truncate mt-2.5 w-32 sm:w-36 md:w-40 transition-colors drop-shadow-sm">
                    {client.name}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
