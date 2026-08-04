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
    <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 lg:pb-24 text-[#0F172A]">
      {/* Animated Enterprise Healthcare SaaS Hero Background */}
      <HeroBackground />

      <div className="site-wrapper relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ── Left Content Column ── */}
          <motion.div className="lg:col-span-5 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start" initial="hidden" animate="visible" variants={stagger}>

            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2563EB]/20 bg-white/80 backdrop-blur-md shadow-md shadow-blue-500/5">
              <span className="flex w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="text-xs font-semibold text-[#2563EB] tracking-wide">
                Trusted by Modern Healthcare Providers
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-[#0F172A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Modern <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                Hospital Management System
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal">
              Simplify hospital operations with a unified platform for patient management, appointments, billing, pharmacy, laboratory, inventory, HR, and analytics.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 w-full">
              <Link to="/contact"
                className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.03] transition-all duration-200"
              >
                Request Demo
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link to="/modules"
                className="inline-flex items-center gap-2 bg-white/80 hover:bg-white border border-[#3B82F6]/30 text-[#2563EB] px-7 py-3.5 rounded-full text-sm font-semibold shadow-sm backdrop-blur-md hover:shadow-md hover:scale-[1.02] transition-all duration-200"
              >
                Explore Features
              </Link>
            </motion.div>

            {/* Trust Metrics Below Buttons */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 w-full border-t border-slate-200/60 mt-2">
              <div className="bg-white/80 backdrop-blur-md border border-white p-3 rounded-2xl shadow-sm text-center lg:text-left">
                <div className="text-lg font-extrabold text-[#2563EB] leading-tight">500+</div>
                <div className="text-[11px] font-medium text-[#64748B]">Hospitals</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md border border-white p-3 rounded-2xl shadow-sm text-center lg:text-left">
                <div className="text-lg font-extrabold text-[#06B6D4] leading-tight">50K+</div>
                <div className="text-[11px] font-medium text-[#64748B]">Patients Managed Daily</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md border border-white p-3 rounded-2xl shadow-sm text-center lg:text-left">
                <div className="text-lg font-extrabold text-[#10B981] leading-tight">99.9%</div>
                <div className="text-[11px] font-medium text-[#64748B]">Uptime</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md border border-white p-3 rounded-2xl shadow-sm text-center lg:text-left">
                <div className="text-lg font-extrabold text-[#3B82F6] leading-tight">256-bit</div>
                <div className="text-[11px] font-medium text-[#64748B]">Secure Cloud Platform</div>
              </div>
            </motion.div>

          </motion.div>

          {/* ── Right Content Column: Floating Glassmorphism Dashboard Mockup ── */}
          <motion.div
            className="lg:col-span-7 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="relative w-full max-w-xl bg-white/70 backdrop-blur-xl border border-white/90 rounded-3xl shadow-2xl p-4 sm:p-6 space-y-4 shadow-blue-500/10">

              {/* Dashboard Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-[#0F172A] ml-2 tracking-wide flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                    MedCare Enterprise Live Hub
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-[#10B981] bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
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
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-lg">person_search</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]">trending_up</span> +12.4%
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold text-[#64748B]">Patient Statistics</div>
                    <div className="text-lg font-extrabold text-[#0F172A] tracking-tight">1,482 <span className="text-xs font-medium text-[#64748B]">Active</span></div>
                  </div>
                  {/* Mini Sparkline Bar Chart */}
                  <div className="flex items-end gap-1 h-5 mt-2 pt-1">
                    <div className="w-1/6 bg-blue-200 h-[40%] rounded-t" />
                    <div className="w-1/6 bg-blue-300 h-[65%] rounded-t" />
                    <div className="w-1/6 bg-blue-400 h-[50%] rounded-t" />
                    <div className="w-1/6 bg-[#2563EB] h-[85%] rounded-t" />
                    <div className="w-1/6 bg-blue-400 h-[70%] rounded-t" />
                    <div className="w-1/6 bg-[#06B6D4] h-[100%] rounded-t animate-pulse" />
                  </div>
                </motion.div>

                {/* 2. Today's Appointments */}
                <motion.div 
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/90 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-cyan-50 text-[#06B6D4] flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">calendar_month</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full">142 OPD</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold text-[#64748B]">Today's Appointments</div>
                    <div className="text-xs font-bold text-[#0F172A] mt-0.5 truncate">Dr. Sarah Jenkins</div>
                    <div className="text-[10px] text-[#64748B] flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Room 304 • In Progress
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
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#3B82F6] flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">bed</span>
                    </div>
                    <span className="text-xs font-extrabold text-[#3B82F6]">88%</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold text-[#64748B]">Bed Occupancy</div>
                    <div className="text-xs font-bold text-[#0F172A] mt-0.5">176 / 200 Wards Occupied</div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] h-full rounded-full w-[88%]" />
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
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">payments</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-full">+18.4%</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold text-[#64748B]">Revenue Overview</div>
                    <div className="text-lg font-extrabold text-[#0F172A] tracking-tight">$124,500 <span className="text-[10px] font-medium text-[#64748B]">/ Month</span></div>
                  </div>
                </motion.div>

                {/* 5. Pharmacy Stock */}
                <motion.div 
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/90 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">medication</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">12 Reorders</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold text-[#64748B]">Pharmacy Stock</div>
                    <div className="text-xs font-bold text-[#0F172A] mt-0.5">98.4% Optimal Supply</div>
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
                    <div className="text-[11px] font-semibold text-[#64748B]">Laboratory Reports</div>
                    <div className="text-xs font-bold text-[#0F172A] mt-0.5">342 Tests Processed</div>
                  </div>
                </motion.div>

                {/* 7. Staff Management */}
                <motion.div 
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/90 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">groups</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full">48 Active</span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold text-[#64748B]">Staff Management</div>
                    <div className="text-xs font-bold text-[#0F172A] mt-0.5">18 Doctors • 30 Nurses</div>
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
                    <div className="text-[11px] font-semibold text-[#64748B]">Emergency Cases</div>
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
