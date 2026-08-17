import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'
import { Send } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    facility: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setFormData({ name: '', email: '', facility: '', message: '' })
      setTimeout(() => setSent(false), 3000)
    }, 1500)
  }

  return (
    <motion.div {...pageTransition} className="bg-[#effcfe]">
      <main className="min-h-screen py-24 sm:py-28 md:py-36 site-wrapper">
        {/* Hero */}
        <motion.section
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1
            className="heading-hero text-[#121d1f] mb-4"
            variants={fadeUp}
          >
            We're Here to{' '}
            <span className="text-[#00685e]">Help Your Clinic</span> Thrive
          </motion.h1>
          <motion.p
            className="text-description text-[#3d4947] max-w-2xl mx-auto"
            variants={fadeUp}
          >
            Whether you have questions about our modules, need technical support, or want to see a
            live demo, our team is ready to assist you.
          </motion.p>
        </motion.section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-7 h-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="card-frosted p-5 sm:p-8 md:p-10 rounded-2xl h-full flex flex-col justify-between">
              <div>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-[#121d1f] mb-5 sm:mb-6"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="space-y-1">
                      <label
                        className="text-xs sm:text-sm font-medium text-[#3d4947] ml-1"
                        htmlFor="name"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Dr. Sarah Johnson"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        className="text-xs sm:text-sm font-medium text-[#3d4947] ml-1"
                        htmlFor="email"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="sarah.j@clinic.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      className="text-xs sm:text-sm font-medium text-[#3d4947] ml-1"
                      htmlFor="facility"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Healthcare Facility Name
                    </label>
                    <input
                      id="facility"
                      name="facility"
                      type="text"
                      placeholder="St. Mary's General Hospital"
                      value={formData.facility}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      className="text-xs sm:text-sm font-medium text-[#3d4947] ml-1"
                      htmlFor="message"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="How can we help your medical practice today?"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[48px] rounded-full text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all duration-200 ${
                      sent
                        ? 'bg-[#2d685e] text-white'
                        : 'bg-[#00685e] text-white hover:bg-[#008378]'
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {sending ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                        Sending...
                      </>
                    ) : sent ? (
                      <>
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6 relative overflow-hidden">
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00685e] via-[#67d9ca] to-[#00685e]" />

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Support Hours: Mon–Sat 9:30 AM – 6:30 PM IST</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Direct Contact &amp; Offices
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Connect directly with our specialized teams for sales, onboarding, technical assistance, or corporate inquiries.
                </p>
              </div>

              <div className="space-y-5 text-xs sm:text-sm">
                
                {/* 1. Direct Phone Lines */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5 text-[#00685e]">
                    <span className="material-symbols-outlined text-xl">call</span>
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Phone &amp; Sales Hotlines</div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a
                        href="tel:05224972500"
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 hover:border-teal-200 transition-all block group"
                      >
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Landline (Lucknow)</span>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#00685e] transition-colors">0522-4972500</span>
                      </a>
                      <a
                        href="tel:+919873003702"
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 hover:border-teal-200 transition-all block group"
                      >
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Mobile</span>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#00685e] transition-colors">+91 9873003702</span>
                      </a>
                    </div>

                    <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-wrap items-center justify-between gap-1 text-slate-700">
                      <span className="text-[11px] font-semibold text-slate-500">Sales Hotlines:</span>
                      <div className="font-bold text-[#00685e]">
                        <a href="tel:+916389590600" className="hover:underline">+91 6389 590 600</a>
                        <span className="text-slate-300 mx-1.5">|</span>
                        <a href="tel:+916389590700" className="hover:underline">+91 6389 590 700</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-slate-100" />

                {/* 2. Email Inquiries */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5 text-[#00685e]">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email Inquiries</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <a
                        href="mailto:care@reckonsales.com"
                        className="p-2 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 hover:border-teal-200 transition-all text-center group block"
                      >
                        <span className="text-[9px] font-bold text-emerald-700 uppercase block tracking-wider">Support</span>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#00685e] truncate block">care@reckonsales.com</span>
                      </a>
                      <a
                        href="mailto:sales@reckonsales.com"
                        className="p-2 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 hover:border-teal-200 transition-all text-center group block"
                      >
                        <span className="text-[9px] font-bold text-teal-700 uppercase block tracking-wider">Sales</span>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#00685e] truncate block">sales@reckonsales.com</span>
                      </a>
                      <a
                        href="mailto:Info@technohunk.co.in"
                        className="p-2 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 hover:border-teal-200 transition-all text-center group block"
                      >
                        <span className="text-[9px] font-bold text-cyan-700 uppercase block tracking-wider">General</span>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#00685e] truncate block">Info@technohunk.co.in</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-slate-100" />

                {/* 3. Corporate HQ (Lucknow) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5 text-[#00685e]">
                    <span className="material-symbols-outlined text-xl">apartment</span>
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Corporate HQ • Lucknow</div>
                      <a
                        href="https://maps.google.com/?q=SF-2+New+Medicine+Market+Meer+Jaan+Lane+Naya+Gaon+East+Gautam+Budha+Marg+Lucknow+226018"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-[#00685e] hover:underline px-2 py-0.5 rounded-md bg-teal-50 hover:bg-teal-100 transition-colors"
                      >
                        Directions
                      </a>
                    </div>
                    <div>
                      <a href="https://reckonsales.in/" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 hover:text-[#00685e] hover:underline text-sm">
                        Reckon Sales Pvt. Ltd.
                      </a>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      SF-2 New Medicine Market, Meer Jaan Lane, Naya Gaon East, Gautam Budha Marg, Lucknow-226018, Uttar Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-slate-100" />

                {/* 4. Regional Office (Ghaziabad / NCR) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5 text-[#00685e]">
                    <span className="material-symbols-outlined text-xl">domain</span>
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Regional Office • NCR</div>
                      <a
                        href="https://maps.google.com/?q=H-11+Sector-23+Sanjay+Nagar+Ghaziabad+201002"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-[#00685e] hover:underline px-2 py-0.5 rounded-md bg-teal-50 hover:bg-teal-100 transition-colors"
                      >
                        Directions
                      </a>
                    </div>
                    <div>
                      <a href="https://www.technohunk.in/" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 hover:text-[#00685e] hover:underline text-sm">
                        Technohunk Info Solutions Pvt Ltd
                      </a>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      H-11, Sector-23, Sanjay Nagar, Ghaziabad — 201002 (U.P.), India
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        </div>
      </main>
    </motion.div>
  )
}
