import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'
import { Send } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

// Base URL for the contact API — set VITE_API_URL in your .env file.
// Development:  VITE_API_URL=http://localhost:5000
// Production:   VITE_API_URL=https://your-backend-domain.com
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    facility: '',
    location: '',
    message: '',
    // Honeypot — hidden from real users, bots fill this automatically.
    // The backend silently rejects any submission where this field is non-empty.
    website: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Prevent double-submit while a request is already in-flight
    if (sending) return

    setSending(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          facility: formData.facility,
          location: formData.location,
          message: formData.message,
          website: formData.website, // honeypot
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // ✅ Success — clear the form and show confirmation
        setSent(true)
        setFormData({ name: '', mobile: '', email: '', facility: '', location: '', message: '', website: '' })
        setTimeout(() => setSent(false), 5000)
      } else {
        // ❌ Server returned a validation or business-logic error
        setError(
          data.message || 'Something went wrong. Please try again or contact us directly.'
        )
      }
    } catch {
      // ❌ Network error — keep form data so the user can retry
      setError('Something went wrong. Please try again or contact us directly.')
    } finally {
      setSending(false)
    }
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
                  Talk to Us About OMEDO
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

                  {/* ── Honeypot field — hidden from real users, traps bots ── */}
                  {/* aria-hidden prevents screen readers from reading it       */}
                  <div aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* 1. Name* & 2. Mobile* */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="space-y-1">
                      <label
                        className="text-xs sm:text-sm font-medium text-[#3d4947] ml-1"
                        htmlFor="name"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Name <span className="text-red-500 font-bold">*</span>
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
                        htmlFor="mobile"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Mobile <span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        placeholder="+91 98*** *****"
                        required
                        value={formData.mobile}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* 3. Email & 4. Hospital / Clinic Name* */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="space-y-1">
                      <label
                        className="text-xs sm:text-sm font-medium text-[#3d4947] ml-1"
                        htmlFor="email"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="sarah.j@clinic.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        className="text-xs sm:text-sm font-medium text-[#3d4947] ml-1"
                        htmlFor="facility"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Hospital / Clinic Name <span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        id="facility"
                        name="facility"
                        type="text"
                        placeholder="St. Mary's General Hospital"
                        required
                        value={formData.facility}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* 5. Location* */}
                  <div className="space-y-1">
                    <label
                      className="text-xs sm:text-sm font-medium text-[#3d4947] ml-1"
                      htmlFor="location"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Location <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="City, State (e.g. Mumbai, Maharashtra)"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/* 6. Message */}
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
                      placeholder="Tell us what you're looking for..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input resize-none"
                    />
                  </div>

                  {/* ── Success banner ── */}
                  <AnimatePresence>
                    {sent && (
                      <motion.div
                        key="success-banner"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                        className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5"
                        role="status"
                        aria-live="polite"
                      >
                        <span className="material-symbols-outlined text-emerald-600 text-xl mt-0.5">check_circle</span>
                        <p className="text-sm text-emerald-800 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Thank you! Your enquiry has been sent successfully. Our team will contact you shortly.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Error banner ── */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        key="error-banner"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                        className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5"
                        role="alert"
                        aria-live="assertive"
                      >
                        <span className="material-symbols-outlined text-red-500 text-xl mt-0.5">error</span>
                        <p className="text-sm text-red-700 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-3 pt-1">
                    <button
                      type="submit"
                      disabled={sending || sent}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[48px] rounded-full text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all duration-200 ${
                        sent
                          ? 'bg-[#2d685e] text-white cursor-default'
                          : sending
                            ? 'bg-[#00685e] text-white opacity-75 cursor-not-allowed'
                            : 'bg-[#00685e] text-white hover:bg-[#008378]'
                      }`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {sending ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                          Submitting Request...
                        </>
                      ) : sent ? (
                        <>
                          <span className="material-symbols-outlined text-lg">check_circle</span>
                          Request Submitted!
                        </>
                      ) : (
                        <>
                          Request a Demo
                          <Send size={16} />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-[#52605e] flex items-center gap-1.5 ml-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="material-symbols-outlined text-sm text-[#00685e]">schedule</span>
                      Our team will get back to you within 1 business day.
                    </p>
                  </div>
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
                  <span>Online Support 24*7</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Direct Contact &amp; Offices
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Connect directly with our specialized teams for sales, onboarding, technical assistance, or corporate inquiries.
                </p>
              </div>

              <div className="space-y-5 text-xs sm:text-sm">
                
                {/* 1. Email Inquiries */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5 text-[#00685e]">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email Inquiries</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a
                        href="mailto:support@omedosoft.com"
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 hover:border-teal-200 transition-all text-center group block"
                      >
                        <span className="text-[9px] font-bold text-emerald-700 uppercase block tracking-wider">Support</span>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#00685e] truncate block">support@omedosoft.com</span>
                      </a>
                      <a
                        href="mailto:sales@omedosoft.com"
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 hover:border-teal-200 transition-all text-center group block"
                      >
                        <span className="text-[9px] font-bold text-teal-700 uppercase block tracking-wider">Sales</span>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#00685e] truncate block">sales@omedosoft.com</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-slate-100" />

                {/* 3. Corporate Office (Ghaziabad) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5 text-[#00685e]">
                    <span className="material-symbols-outlined text-xl">apartment</span>
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Corporate Office</div>
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
                      <span className="font-bold text-slate-900 text-sm">
                        OMEDO Software Solutions Pvt Ltd.
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      H-11, Sector-23, Sanjay Nagar, Ghaziabad — 201002, Uttar Pradesh, India
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
