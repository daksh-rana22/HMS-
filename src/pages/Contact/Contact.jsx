import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '../../utils/animations'
import { Send } from 'lucide-react'
import { submitDemoRequest } from '../../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    facility: '',
    location: '',
    message: '',
    // Honeypot — hidden from real users, bots fill this automatically.
    website: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'mobile') {
      // Allow only numbers and cap at 10 digits
      const cleaned = value.replace(/\D/g, '').slice(0, 10)
      setFormData((prev) => ({ ...prev, mobile: cleaned }))
      if (fieldErrors.mobile && cleaned.length === 10) {
        setFieldErrors((prev) => ({ ...prev, mobile: '' }))
      }
    } else if (name === 'email') {
      setFormData((prev) => ({ ...prev, email: value }))
      if (fieldErrors.email) {
        if (!value.trim() || emailRegex.test(value.trim())) {
          setFieldErrors((prev) => ({ ...prev, email: '' }))
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
      if (fieldErrors[name]) {
        setFieldErrors((prev) => ({ ...prev, [name]: '' }))
      }
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    if (name === 'mobile') {
      if (value && value.length !== 10) {
        setFieldErrors((prev) => ({ ...prev, mobile: 'Mobile number must be exactly 10 digits' }))
      }
    } else if (name === 'email') {
      if (value.trim() && !emailRegex.test(value.trim())) {
        setFieldErrors((prev) => ({ ...prev, email: 'Please enter a valid email address (e.g. name@clinic.com)' }))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = {}
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name'
    }

    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required'
    } else if (formData.mobile.length !== 10) {
      errors.mobile = 'Mobile number must be exactly 10 digits'
    }

    if (formData.email.trim() && !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@clinic.com)'
    }

    if (!formData.facility.trim()) {
      errors.facility = 'Hospital / Clinic Name is required'
    }

    if (!formData.location.trim()) {
      errors.location = 'Location is required'
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})

    // Prevent double-submit while a request is already in-flight
    if (sending) return

    // If honeypot is filled, silently ignore (bot trap)
    if (formData.website) {
      setSent(true)
      setFormData({ name: '', mobile: '', email: '', facility: '', location: '', message: '', website: '' })
      return
    }

    setSending(true)
    setError(null)

    try {
      const rawMobile = formData.mobile.trim()
      const formattedMobile = rawMobile ? (rawMobile.startsWith('+') ? rawMobile : `+91${rawMobile}`) : ''

      const payload = {
        name: formData.name.trim(),
        mobile: formattedMobile,
        email: formData.email.trim(),
        hospital_clinic_name: formData.facility.trim(),
        location: formData.location.trim(),
        message: formData.message.trim(),
      }

      await submitDemoRequest(payload)

      // Success
      setSent(true)
      setFormData({ name: '', mobile: '', email: '', facility: '', location: '', message: '', website: '' })
      setTimeout(() => setSent(false), 6000)
    } catch (err) {
      console.error('Demo request error:', err)
      setError(
        err.message ||
        'Unable to submit your enquiry at this moment. Please check your internet connection or try again later.'
      )
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
            Let's{' '}
            <span className="text-[#00685e]">Simplify Healthcare Management</span> Together
          </motion.h1>
          <motion.p
            className="text-description text-[#3d4947] max-w-2xl mx-auto"
            variants={fadeUp}
          >
            Whether you're looking for a complete hospital management solution, ABDM integration, or support with your existing OMEDO setup, our team is ready to help.
          </motion.p>
        </motion.section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-6 h-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="card-frosted p-5 sm:p-6 md:p-7 rounded-2xl h-full flex flex-col justify-between">
              <div>
                <h2
                  className="text-lg sm:text-xl font-bold text-[#121d1f] mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Talk to Us About OMEDO
                </h2>
                <form onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-4">

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

                  {/* 1. Name* */}
                  <div className="space-y-0.5">
                    <label
                      className="text-xs font-semibold text-[#3d4947] ml-1"
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
                      className={`form-input py-2 sm:py-2.5 text-xs sm:text-sm ${
                        fieldErrors.name ? '!border-red-500 ring-1 !ring-red-400 bg-red-50/20' : ''
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-0.5 ml-1">
                        <span className="material-symbols-outlined text-xs">error</span>
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* 2. Mobile* (Digits only, Max 10) */}
                  <div className="space-y-0.5">
                    <label
                      className="text-xs font-semibold text-[#3d4947] ml-1"
                      htmlFor="mobile"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Mobile <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      placeholder="9876543210 (10 digits)"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input py-2 sm:py-2.5 text-xs sm:text-sm ${
                        fieldErrors.mobile ? '!border-red-500 ring-1 !ring-red-400 bg-red-50/20' : ''
                      }`}
                    />
                    {fieldErrors.mobile && (
                      <p className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-0.5 ml-1">
                        <span className="material-symbols-outlined text-xs">error</span>
                        {fieldErrors.mobile}
                      </p>
                    )}
                  </div>

                  {/* 3. Email */}
                  <div className="space-y-0.5">
                    <label
                      className="text-xs font-semibold text-[#3d4947] ml-1"
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
                      onBlur={handleBlur}
                      className={`form-input py-2 sm:py-2.5 text-xs sm:text-sm ${
                        fieldErrors.email ? '!border-red-500 ring-1 !ring-red-400 bg-red-50/20' : ''
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-0.5 ml-1">
                        <span className="material-symbols-outlined text-xs">error</span>
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  {/* 4. Hospital / Clinic Name* */}
                  <div className="space-y-0.5">
                    <label
                      className="text-xs font-semibold text-[#3d4947] ml-1"
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
                      className={`form-input py-2 sm:py-2.5 text-xs sm:text-sm ${
                        fieldErrors.facility ? '!border-red-500 ring-1 !ring-red-400 bg-red-50/20' : ''
                      }`}
                    />
                    {fieldErrors.facility && (
                      <p className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-0.5 ml-1">
                        <span className="material-symbols-outlined text-xs">error</span>
                        {fieldErrors.facility}
                      </p>
                    )}
                  </div>

                  {/* 5. Location* */}
                  <div className="space-y-0.5">
                    <label
                      className="text-xs font-semibold text-[#3d4947] ml-1"
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
                      className={`form-input py-2 sm:py-2.5 text-xs sm:text-sm ${
                        fieldErrors.location ? '!border-red-500 ring-1 !ring-red-400 bg-red-50/20' : ''
                      }`}
                    />
                    {fieldErrors.location && (
                      <p className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-0.5 ml-1">
                        <span className="material-symbols-outlined text-xs">error</span>
                        {fieldErrors.location}
                      </p>
                    )}
                  </div>

                  {/* 6. Message */}
                  <div className="space-y-0.5">
                    <label
                      className="text-xs font-semibold text-[#3d4947] ml-1"
                      htmlFor="message"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Tell us what you're looking for..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input py-2 sm:py-2.5 text-xs sm:text-sm resize-none"
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
                        className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
                        role="status"
                        aria-live="polite"
                      >
                        <span className="material-symbols-outlined text-emerald-600 text-lg mt-0.5">check_circle</span>
                        <p className="text-xs sm:text-sm text-emerald-800 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
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
                        className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                        role="alert"
                        aria-live="assertive"
                      >
                        <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">error</span>
                        <p className="text-xs sm:text-sm text-red-700 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2 pt-1">
                    <button
                      type="submit"
                      disabled={sending || sent}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-2.5 sm:py-3 min-h-[42px] rounded-full text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all duration-200 ${
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
                          <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                          Submitting Request...
                        </>
                      ) : sent ? (
                        <>
                          <span className="material-symbols-outlined text-base">check_circle</span>
                          Request Submitted!
                        </>
                      ) : (
                        <>
                          Request a Demo
                          <Send size={15} />
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
            className="lg:col-span-6 flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6 relative overflow-hidden">
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00685e] via-[#67d9ca] to-[#00685e]" />

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Contact OMEDO
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Connect with our team for product demos, onboarding, technical assistance, and business inquiries.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* 1. Sales */}
                <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-100 hover:border-teal-200 transition-all space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00685e] shrink-0">
                      <span className="material-symbols-outlined text-lg">trending_up</span>
                    </div>
                    <span className="font-bold text-slate-900 text-sm tracking-wide">Sales</span>
                  </div>
                  <div className="space-y-1.5 pl-10">
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="material-symbols-outlined text-sm text-[#00685e]">call</span>
                      <a href="tel:+91XXXXXXXXXX" className="font-semibold text-slate-800 hover:text-[#00685e] transition-colors">
                        +91 XXXXX XXXXX
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="material-symbols-outlined text-sm text-[#00685e]">mail</span>
                      <span>Email :</span>
                      <a href="mailto:sales@omedosoft.com" className="font-semibold text-[#00685e] hover:underline">
                        sales@omedosoft.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. Support */}
                <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-100 hover:border-teal-200 transition-all space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00685e] shrink-0">
                      <span className="material-symbols-outlined text-lg">headset_mic</span>
                    </div>
                    <span className="font-bold text-slate-900 text-sm tracking-wide">Support</span>
                  </div>
                  <div className="space-y-1.5 pl-10">
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="material-symbols-outlined text-sm text-[#00685e]">call</span>
                      <a href="tel:+91XXXXXXXXXX" className="font-semibold text-slate-800 hover:text-[#00685e] transition-colors">
                        +91 XXXXX XXXXX
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="material-symbols-outlined text-sm text-[#00685e]">mail</span>
                      <span>Email:</span>
                      <a href="mailto:support@omedosoft.com" className="font-semibold text-[#00685e] hover:underline">
                        support@omedosoft.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-slate-100" />

                {/* 3. Corporate Office with Embedded Map */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-100 hover:border-teal-200 transition-all space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00685e] shrink-0">
                        <span className="material-symbols-outlined text-lg">apartment</span>
                      </div>
                      <span className="font-bold text-slate-900 text-sm tracking-wide">Corporate Office</span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=H-154+Sector-23+Sanjay+Nagar+Ghaziabad+201001"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00685e] hover:underline"
                    >
                      <span>View in Google Maps</span>
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    {/* Left: Office Address Details */}
                    <div className="sm:col-span-7 space-y-2 text-slate-700 pl-0 sm:pl-1">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        OMEDO Software Solutions Private Limited
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        H-154, Sector-23, Sanjay Nagar,<br />
                        Ghaziabad – 201001, Uttar Pradesh, India
                      </p>
                      <div className="text-[11px] text-slate-500 font-medium space-y-0.5 pt-0.5">
                        <div><span className="font-semibold text-slate-700">CIN:</span> U62099UW2026PTC257817</div>
                        <div><span className="font-semibold text-slate-700">MSME:</span> UDYAM-UP-29-0255247</div>
                      </div>
                    </div>

                    {/* Right: Embedded Google Map */}
                    <div className="sm:col-span-5 h-[160px] sm:h-[180px] w-full rounded-xl overflow-hidden border border-slate-200/90 shadow-xs relative bg-slate-100">
                      <iframe
                        title="OMEDO Corporate Office Location Map"
                        src="https://maps.google.com/maps?q=H-154%20Sector-23%20Sanjay%20Nagar%20Ghaziabad%20201001&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen=""
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-slate-100" />

                {/* 4. Timing */}
                <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-100 hover:border-teal-200 transition-all space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00685e] shrink-0">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                    </div>
                    <span className="font-bold text-slate-900 text-sm tracking-wide">Timing</span>
                  </div>
                  
                  <div className="pl-10 space-y-1.5 text-slate-700 text-xs sm:text-sm">
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-600 font-medium">Mon - Sat</span>
                      <span className="font-bold text-slate-900">9:00 AM – 9:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between py-0.5 border-t border-slate-200/60">
                      <span className="text-slate-600 font-medium">Sunday</span>
                      <span className="font-bold text-slate-900">10:00 AM – 6:00 PM</span>
                    </div>
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
