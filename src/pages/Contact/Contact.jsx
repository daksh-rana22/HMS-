import { useState } from 'react'
import { motion } from 'framer-motion'
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="card-frosted p-5 sm:p-8 md:p-10 rounded-2xl">
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
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-5 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Direct Contact – teal card */}
            <div className="bg-[#00685e] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-3xl"
                style={{ backgroundColor: '#67d9ca' }}
              />
              <h2
                className="text-2xl font-semibold mb-8 relative z-10"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Direct Contact
              </h2>
              <div className="space-y-6 relative z-10">
                {[
                  {
                    icon: 'location_on',
                    label: 'Office Address',
                    value: '1278 Health Parkway, Suite 400\nMedical District, Austin, TX 78701',
                  },
                  {
                    icon: 'mail',
                    label: 'Support Email',
                    value: 'hello@medcarehms.com\nsupport@medcarehms.com',
                  },
                  {
                    icon: 'phone_iphone',
                    label: 'Phone Number',
                    value: '+1 (555) 234-5678\nMon-Fri: 8:00 AM – 6:00 PM CST',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-xl">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-xs opacity-80 uppercase tracking-wider mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {item.label}
                      </p>
                      <p className="text-base whitespace-pre-line" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex gap-4 relative z-10">
                {['hub', 'share', 'public'].map((icon) => (
                  <a key={icon} href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-3xl">{icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="card-frosted h-56 rounded-2xl overflow-hidden relative group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA76cw09jaIL-VHZ9Dq8E0Y_AEue2htqWYuzPQ615mciZmRwBXynlAS41AFPz5EiotFkZ46tTZyIfU83iLjKlnUPMZnDCAh9HhiGPmc5FgQs36bW-nTDqJfRFziU3-S-RaXW0tmUw6O1T9-mUhz7dAZeWQsKfHHb-IQGzsJY51AortjbKMTFX_LFEbIPXilaz6m3SB6jYwMVJeWmRdE0BqifjoIu3Ve0KNFRKd1VCVp5HGVvdhranaV')`,
                  backgroundSize: 'cover',
                }}
              />
              <div className="absolute inset-0 bg-[#00685e]/10 mix-blend-multiply" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl flex items-center justify-between border border-[#bcc9c6]/30">
                <div>
                  <p className="text-sm font-bold text-[#00685e]" style={{ fontFamily: "'Inter', sans-serif" }}>Austin HQ</p>
                  <p className="text-xs text-[#3d4947]" style={{ fontFamily: "'Inter', sans-serif" }}>Central Medical Center</p>
                </div>
                <a href="#" className="text-sm text-[#00685e] font-semibold flex items-center gap-1 hover:underline" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Get Directions
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-[#afecde] p-4 rounded-2xl flex items-center justify-between border border-[#2d685e]/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2d685e] rounded-full flex items-center justify-center text-white">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#326c62]" style={{ fontFamily: "'Inter', sans-serif" }}>Chat with Sales</p>
                  <p className="text-xs text-[#326c62]/80" style={{ fontFamily: "'Inter', sans-serif" }}>Average response: 2 mins</p>
                </div>
              </div>
              <button
                className="bg-[#2d685e] text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Live Chat
              </button>
            </div>
          </motion.div>
        </div>

        {/* FAQ CTA */}
        <section className="mt-16 text-center p-10 bg-[#eaf6f8] rounded-2xl border border-[#bcc9c6]/20">
          <h3 className="text-2xl font-semibold text-[#121d1f] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Have a quick question?
          </h3>
          <p className="text-[#3d4947] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Check out our Knowledge Base for immediate answers to common setup and billing questions.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#00685e] font-bold hover:gap-3 transition-all"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Visit Help Center
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </a>
        </section>
      </main>
    </motion.div>
  )
}
