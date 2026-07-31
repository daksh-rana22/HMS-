import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const features = [
  {
    icon: 'bolt',
    iconBg: '#afecde',
    iconColor: '#326c62',
    title: 'Operational Efficiency',
    description:
      'Automate billing, scheduling, and resource allocation. Our AI-driven algorithms predict patient inflow to optimize staff scheduling and reduce wait times by up to 40%.',
    items: ['Smart Appointment Booking', 'Automated Inventory Tracking'],
  },
  {
    icon: 'medical_services',
    iconBg: '#85f5e6',
    iconColor: '#00201d',
    title: 'Enhanced Patient Care',
    description:
      'Put patients first with integrated Electronic Health Records (EHR) that offer a 360-degree view of medical history, labs, and medications in real-time.',
    items: ['Real-time Health Monitoring', 'Unified Patient Portal'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsPvw1gBuCMEdZxp846HJBG2UowwXd29ZOoMN2Ptb_4MxA1N0VjaA4BnDtLOJNu8E4PcU3ijwto2Y5e_mx5Rkkpk5gj3Q1I8Mwh08F5PQVTpjtHyK0aEPrWtute5K6TSNCz-91wJxlo7OTKRmkjEHMXHdvVfIuNO3r-HXSN4MFp60C8yifizq8vaMuhQNLFvMadiGK-TlyEV3be6bQnh0bIzF6pNTXho8_rhDnE6oIZcv2KLZ5EAC-',
  },
  {
    icon: 'shield_lock',
    iconBg: '#6d7675',
    iconColor: '#f5fefc',
    title: 'Uncompromising Security',
    description:
      'HIPAA and GDPR compliant data storage. We employ bank-level encryption and multi-factor authentication to ensure sensitive patient data remains confidential.',
    items: ['End-to-end Data Encryption', 'Regular Security Audits'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }

export default function Features() {
  return (
    <section className="section-padding bg-[#eaf6f8] relative overflow-hidden">
      {/* Decorative rings — hidden on smallest screens */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-10 hidden md:block">
        <div className="w-[600px] 2xl:w-[800px] h-[600px] 2xl:h-[800px] border border-[#00685e] rounded-full" />
        <div className="absolute top-10 left-10 w-[500px] 2xl:w-[700px] h-[500px] 2xl:h-[700px] border border-[#2d685e] rounded-full" />
      </div>

      <div className="site-wrapper relative">
        {/* Section Title */}
        <div className="text-center mb-10 sm:mb-12 2xl:mb-16 space-y-2 sm:space-y-3">
          <h2
            className="heading-section text-[#00685e]"
          >
            Core Advantages
          </h2>
          <p className="heading-hero text-[#121d1f]">
            Designed for Clinical Excellence
          </p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 2xl:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
        >
          {features.map((feat, i) => (
            <motion.div
              key={i}
              className="group bg-white p-5 sm:p-6 2xl:p-8 rounded-2xl shadow-sm border border-[#bcc9c6]/30
                         hover:shadow-md hover:-translate-y-1 transition-all duration-300
                         flex flex-col items-start gap-4 sm:gap-5"
              variants={fadeUp}
            >
              {/* Optional image */}
              {feat.image && (
                <div className="w-full h-40 sm:h-48 2xl:h-56 overflow-hidden rounded-xl -mx-0">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              )}

              {/* Icon */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 2xl:w-16 2xl:h-16 rounded-full flex items-center justify-center
                           group-hover:scale-110 transition-transform shrink-0"
                style={{ backgroundColor: feat.iconBg }}
              >
                <span className="material-symbols-outlined text-2xl sm:text-3xl" style={{ color: feat.iconColor }}>
                  {feat.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl 2xl:text-2xl font-semibold text-[#121d1f]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {feat.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base 2xl:text-lg text-[#3d4947] leading-relaxed flex-grow"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {feat.description}
              </p>

              {/* Checklist */}
              <ul className="space-y-2.5 w-full">
                {feat.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm 2xl:text-base text-[#3d4947]"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    <CheckCircle2 size={18} className="text-[#00685e] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
