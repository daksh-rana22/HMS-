import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroBackground from '../common/HeroBackground'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 lg:pb-24" style={{ color: 'var(--t-text)' }}>
      {/* Animated Enterprise Healthcare SaaS Hero Background */}
      <HeroBackground />

      <div className="site-wrapper relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ── Left Content Column ── */}
          <motion.div className="lg:col-span-5 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start" initial="hidden" animate="visible" variants={stagger}>

            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-md"
              style={{ border: '1px solid color-mix(in srgb, var(--t-primary) 20%, transparent)' }}>
              <span className="flex w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: 'var(--t-accent)', boxShadow: '0 0 8px var(--t-accent)' }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--t-primary)' }}>
                Trusted by Modern Healthcare Providers
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--t-text)' }}>
              Modern <br className="hidden sm:inline" />
              <span style={{
                background: 'var(--t-gradient-text, linear-gradient(135deg, var(--t-primary) 0%, var(--t-accent) 100%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Hospital Management System
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p variants={fadeUp} className="text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal"
              style={{ color: 'var(--t-text-secondary)' }}>
              Simplify hospital operations with a unified platform for patient management, appointments, billing, pharmacy, laboratory, inventory, HR, and analytics.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 w-full">
              <Link to="/contact"
                className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full text-sm font-bold hover:scale-[1.03] transition-all duration-200"
                style={{
                  background: 'var(--t-primary)',
                  boxShadow: '0 8px 24px var(--t-btn-shadow)',
                }}
              >
                Request Demo
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link to="/modules"
                className="inline-flex items-center gap-2 bg-white/80 hover:bg-white px-7 py-3.5 rounded-full text-sm font-semibold backdrop-blur-md hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                style={{
                  border: '1px solid color-mix(in srgb, var(--t-primary) 30%, transparent)',
                  color: 'var(--t-primary)',
                }}
              >
                Explore Features
              </Link>
            </motion.div>

            {/* Trust Metrics Below Buttons */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 w-full mt-2"
              style={{ borderTop: '1px solid color-mix(in srgb, var(--t-border) 60%, transparent)' }}>
              {[
                { value: '500+', label: 'Hospitals', colorVar: '--t-primary' },
                { value: '50K+', label: 'Patients Managed Daily', colorVar: '--t-accent' },
                { value: '99.9%', label: 'Uptime', colorVar: '--t-accent-light' },
                { value: '256-bit', label: 'Secure Cloud Platform', colorVar: '--t-primary-mid' },
              ].map(({ value, label, colorVar }) => (
                <div key={label} className="bg-white/80 backdrop-blur-md border border-white p-3 rounded-2xl shadow-sm text-center lg:text-left">
                  <div className="text-lg font-extrabold leading-tight" style={{ color: `var(${colorVar})` }}>{value}</div>
                  <div className="text-[11px] font-medium" style={{ color: 'var(--t-text-muted)' }}>{label}</div>
                </div>
              ))}
            </motion.div>

          </motion.div>

          {/* ── Right Content Column: Floating Glassmorphism Dashboard Mockup ── */}
          <motion.div
            className="lg:col-span-7 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="relative w-full max-w-xl bg-white/70 backdrop-blur-xl border border-white/90 rounded-3xl shadow-2xl p-4 sm:p-6 space-y-4"
              style={{ boxShadow: '0 24px 64px var(--t-btn-shadow, rgba(0,104,94,0.15))' }}>

              {/* Dashboard Header Bar */}
              <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid color-mix(in srgb, var(--t-border) 40%, transparent)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold ml-2 tracking-wide flex items-center gap-1.5" style={{ color: 'var(--t-text)' }}>
                    <span className="w-2 h-2 rounded-full animate-ping" style={{ background: 'var(--t-accent)' }} />
                    MedCare Enterprise Live Hub
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ color: 'var(--t-primary)', background: 'color-mix(in srgb, var(--t-accent) 15%, white)', border: '1px solid color-mix(in srgb, var(--t-accent) 30%, transparent)' }}>
                  <span className="material-symbols-outlined text-xs">shield</span>
                  System 100% Operational
                </div>
              </div>

              {/* Grid of Glassmorphism Dashboard Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

                {/* 1. Patient Statistics */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/90 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold"
                      style={{ background: 'color-mix(in srgb, var(--t-primary) 10%, white)', color: 'var(--t-primary)' }}>
                      <span className="material-symbols-outlined text-lg">person_search</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5"
                      style={{ color: 'var(--t-accent)', background: 'color-mix(in srgb, var(--t-accent) 15%, white)' }}>
                      <span className="material-symbols-outlined text-[10px]">trending_up</span> +12.4%
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold" style={{ color: 'var(--t-text-muted)' }}>Patient Statistics</div>
                    <div className="text-lg font-extrabold tracking-tight" style={{ color: 'var(--t-text)' }}>1,482 <span className="text-xs font-medium" style={{ color: 'var(--t-text-muted)' }}>Active</span></div>
                  </div>
                  {/* Mini Sparkline Bar Chart */}
                  <div className="flex items-end gap-1 h-5 mt-2 pt-1">
                    <div className="w-1/6 h-[40%] rounded-t" style={{ background: 'color-mix(in srgb, var(--t-primary) 20%, white)' }} />
                    <div className="w-1/6 h-[65%] rounded-t" style={{ background: 'color-mix(in srgb, var(--t-primary) 40%, white)' }} />
                    <div className="w-1/6 h-[50%] rounded-t" style={{ background: 'color-mix(in srgb, var(--t-primary) 55%, white)' }} />
                    <div className="w-1/6 h-[85%] rounded-t" style={{ background: 'var(--t-primary)' }} />
                    <div className="w-1/6 h-[70%] rounded-t" style={{ background: 'color-mix(in srgb, var(--t-primary) 70%, white)' }} />
                    <div className="w-1/6 h-[100%] rounded-t animate-pulse" style={{ background: 'var(--t-accent)' }} />
                  </div>
                </motion.div>

                {/* 2. Today's Appointments */}
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/90 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: 'color-mix(in srgb, var(--t-accent) 15%, white)', color: 'var(--t-accent)' }}>
                      <span className="material-symbols-outlined text-lg">calendar_month</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ color: 'var(--t-primary)', background: 'color-mix(in srgb, var(--t-primary) 10%, white)' }}>142 OPD</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold" style={{ color: 'var(--t-text-muted)' }}>Today's Appointments</div>
                    <div className="text-xs font-bold mt-0.5 truncate" style={{ color: 'var(--t-text)' }}>Dr. Sarah Jenkins</div>
                    <div className="text-[10px] flex items-center gap-1 mt-0.5" style={{ color: 'var(--t-text-muted)' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--t-accent)' }} /> Room 304 • In Progress
                    </div>
                  </div>
                </motion.div>

                {/* 3. Bed Occupancy */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/90 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: 'color-mix(in srgb, var(--t-primary-mid) 12%, white)', color: 'var(--t-primary-mid)' }}>
                      <span className="material-symbols-outlined text-lg">bed</span>
                    </div>
                    <span className="text-xs font-extrabold" style={{ color: 'var(--t-primary-mid)' }}>88%</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold" style={{ color: 'var(--t-text-muted)' }}>Bed Occupancy</div>
                    <div className="text-xs font-bold mt-0.5" style={{ color: 'var(--t-text)' }}>176 / 200 Wards Occupied</div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 rounded-full mt-2 overflow-hidden" style={{ background: 'color-mix(in srgb, var(--t-border) 50%, white)' }}>
                      <div className="h-full rounded-full w-[88%]"
                        style={{ background: 'linear-gradient(to right, var(--t-primary), var(--t-accent))' }} />
                    </div>
                  </div>
                </motion.div>

                {/* 4. Revenue Overview */}
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/90 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: 'color-mix(in srgb, var(--t-accent) 15%, white)', color: 'var(--t-accent)' }}>
                      <span className="material-symbols-outlined text-lg">payments</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ color: 'var(--t-accent)', background: 'color-mix(in srgb, var(--t-accent) 15%, white)' }}>+18.4%</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold" style={{ color: 'var(--t-text-muted)' }}>Revenue Overview</div>
                    <div className="text-lg font-extrabold tracking-tight" style={{ color: 'var(--t-text)' }}>$124,500 <span className="text-[10px] font-medium" style={{ color: 'var(--t-text-muted)' }}>/ Month</span></div>
                  </div>
                </motion.div>

                {/* 5. Pharmacy Stock */}
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/90 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: 'color-mix(in srgb, var(--t-accent-light) 15%, white)', color: 'var(--t-accent-light)' }}>
                      <span className="material-symbols-outlined text-lg">medication</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">12 Reorders</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold" style={{ color: 'var(--t-text-muted)' }}>Pharmacy Stock</div>
                    <div className="text-xs font-bold mt-0.5" style={{ color: 'var(--t-text)' }}>98.4% Optimal Supply</div>
                  </div>
                </motion.div>

                {/* 6. Laboratory Reports */}
                <motion.div
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/90 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">science</span>
                    </div>
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">8 Pending</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold" style={{ color: 'var(--t-text-muted)' }}>Laboratory Reports</div>
                    <div className="text-xs font-bold mt-0.5" style={{ color: 'var(--t-text)' }}>342 Tests Processed</div>
                  </div>
                </motion.div>

                {/* 7. Staff Management */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/90 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: 'color-mix(in srgb, var(--t-primary) 10%, white)', color: 'var(--t-primary)' }}>
                      <span className="material-symbols-outlined text-lg">groups</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ color: 'var(--t-primary)', background: 'color-mix(in srgb, var(--t-primary) 10%, white)' }}>48 Active</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold" style={{ color: 'var(--t-text-muted)' }}>Staff Management</div>
                    <div className="text-xs font-bold mt-0.5" style={{ color: 'var(--t-text)' }}>18 Doctors • 30 Nurses</div>
                  </div>
                </motion.div>

                {/* 8. Emergency Cases */}
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/90 backdrop-blur-md border border-rose-100 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all bg-gradient-to-r from-white to-rose-50/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">e911_emergency</span>
                    </div>
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-full animate-pulse">Critical ER</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold" style={{ color: 'var(--t-text-muted)' }}>Emergency Cases</div>
                    <div className="text-xs font-bold text-rose-700 mt-0.5">3 Critical Admissions Active</div>
                  </div>
                </motion.div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
