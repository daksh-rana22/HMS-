import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { pageTransition } from '../../utils/animations'
import sanjayImg from '../../assets/sanjay_shrotriya.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ── Advisors & Consultants Data ──
const advisorsData = [
  {
    name: 'Sanjay Shrotriya',
    photo: sanjayImg,
    title: 'Healthcare & Pharmacy Advisor',
    credentials: 'Mechanical Engineer | Healthcare & Pharmacy Professional | Business Leader | Rotary Leader | Ultra Runner',
    experience: '26+ Years Experience',
    consulting: '350-Bed Hospital Consultant',
    bio: [
      'Sanjay Shrotriya is a multidisciplinary professional with extensive experience across pharmacy, healthcare, hospital administration, technology and business operations. His career also includes around 12 years of experience in the steel industry across projects, operations and quality assurance.',
      'With qualifications in Mechanical Engineering, MBA (IT), MBA (Hospital Administration) and M. Pharm (Pharmacy Practice), he brings a unique combination of technical, healthcare and management expertise.',
      'He has worked extensively in pharmacy operations and management and has served as a Pharmacy Consultant for a 350-bed hospital. He also has experience in healthcare technology adoption and business leadership.',
      'Beyond his professional career, Sanjay has served as President of Rotary Club Gwalior Tejas and is an Ultra Runner and Marathoner.',
    ],
    takeaway: 'A multidisciplinary perspective shaped by engineering, healthcare, technology, business and leadership.',
    expertise: [
      'Pharmacy & Healthcare',
      'Hospital Pharmacy',
      'Hospital Administration',
      'Healthcare Technology',
      'Business Management',
      'Inventory & Supply Chain',
      'Operations & Quality Management',
    ],
  },
]

// ── Why Experience Matters Items ──
const whyExperienceMatters = [
  {
    title: 'Real-World Perspective',
    description: 'Insights grounded in practical experience, not just theory.',
    icon: 'psychology',
  },
  {
    title: 'Independent Thinking',
    description: 'Different perspectives help us challenge assumptions and improve decisions.',
    icon: 'lightbulb',
  },
  {
    title: 'Industry Knowledge',
    description: 'Experience across healthcare, technology and business helps us understand the bigger picture.',
    icon: 'domain',
  },
  {
    title: 'Practical Guidance',
    description: 'Advice focused on creating solutions that are useful, sustainable and relevant.',
    icon: 'verified',
  },
]

export default function Advisors() {
  return (
    <motion.div {...pageTransition} className="min-h-screen bg-[#F8FAFC]">

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION (Centered, Clean, No Logo)                    */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFC] to-[#F8FAFC] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 border-b border-slate-200/80">
        
        {/* Ambient background glow orbs */}
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[600px] h-[320px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-[450px] h-[280px] bg-[#ECC599]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="site-wrapper relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-7"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Tagline Badge in Champagne Gold & Navy */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#ECC599] text-[#1E3A8A] shadow-[0_2px_12px_rgba(236,197,153,0.3)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#D48D3B] animate-pulse" />
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide">
                Expertise. Perspective. Guidance.
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.14]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Experience That Guides{' '}
              <span className="relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 40%, #C78038 80%, #ECC599 100%)',
                  }}
                >
                  OMEDO
                </span>
              </span>
            </motion.h1>

            {/* Subtexts */}
            <motion.div variants={fadeUp} className="space-y-3 max-w-2xl mx-auto">
              <p className="text-base sm:text-lg md:text-xl text-[#1E293B] leading-relaxed font-normal">
                OMEDO works with experienced professionals who bring specialized knowledge, industry perspective and practical guidance across healthcare, technology, business and operations.
              </p>
              <p className="text-sm sm:text-base text-[#1E3A8A] font-bold">
                Their experience helps us challenge ideas, make informed decisions and build solutions around the real needs of healthcare organizations.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={fadeUp}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5"
            >
              <a
                href="#advisors-section"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#172554] hover:to-[#1E3A8A] text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-900/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span>View Advisors</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#1E3A8A] border border-[#ECC599] text-xs sm:text-sm font-bold shadow-xs hover:bg-[#FDF3E7] active:scale-98 transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span>Contact Us</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* 2. OUR ADVISORS (Large Premium Profile Cards)                  */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <section id="advisors-section" className="py-16 sm:py-20 lg:py-24 bg-white relative">
        <div className="site-wrapper space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF3E7] text-[#8C4E13] border border-[#ECC599] text-xs font-extrabold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm text-[#8C4E13]">groups_2</span>
              <span>Our Advisors &amp; Consultants</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              People Who Help Shape Our Journey
            </h2>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              OMEDO benefits from the guidance of professionals with diverse backgrounds and expertise. They contribute their experience and perspective across different areas of our product and business journey.
            </p>
          </div>

          {/* Large Premium Profile Card */}
          <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1360px] mx-auto">
            {advisorsData.map((advisor, idx) => (
              <motion.div
                key={advisor.name}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xl hover:shadow-2xl hover:border-[#ECC599] transition-all overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Left Column: Photo / Executive Portrait Sidebar */}
                  <div className="lg:col-span-4 xl:col-span-3 bg-gradient-to-br from-[#0C1938] via-[#142654] to-[#1E3A8A] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Ambient glow */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#ECC599]/20 blur-2xl rounded-full pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center space-y-5">
                      {/* Photo / Portrait Avatar */}
                      <div className="relative group">
                        <div className="w-40 h-44 sm:w-48 sm:h-52 rounded-3xl bg-gradient-to-tr from-[#ECC599] via-[#F6D3AC] to-[#ECC599] p-1 shadow-2xl">
                          <div className="w-full h-full rounded-[22px] bg-[#0A1633] overflow-hidden border-2 border-white/20 relative">
                            {advisor.photo ? (
                              <img
                                src={advisor.photo}
                                alt={advisor.name}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                                <span className="material-symbols-outlined text-4xl sm:text-5xl text-[#F6D3AC] mb-1">
                                  person
                                </span>
                                <span className="text-xs font-black tracking-widest text-[#ECC599] uppercase">
                                  {advisor.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Verified badge */}
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#ECC599] to-[#F6D3AC] text-[#0A1633] p-1.5 rounded-full shadow-md border-2 border-white">
                          <span className="material-symbols-outlined text-sm font-black block">verified</span>
                        </div>
                      </div>

                      {/* Name & Title in sidebar for mobile */}
                      <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl font-black text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {advisor.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#F6D3AC] font-bold">
                          {advisor.title}
                        </p>
                      </div>

                      {/* Highlight badges */}
                      <div className="w-full space-y-2 pt-2">
                        <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-left flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-base text-[#ECC599]">history_edu</span>
                          <div>
                            <div className="text-[10px] text-[#ECC599] uppercase font-bold tracking-wider">Experience</div>
                            <div className="text-xs font-bold text-white">{advisor.experience}</div>
                          </div>
                        </div>

                        <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-left flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-base text-[#ECC599]">local_hospital</span>
                          <div>
                            <div className="text-[10px] text-[#ECC599] uppercase font-bold tracking-wider">Hospital Consulting</div>
                            <div className="text-xs font-bold text-white">{advisor.consulting}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer note in sidebar */}
                    <div className="relative z-10 pt-6 mt-6 border-t border-white/15 text-center">
                      <span className="text-[11px] text-blue-200/90 font-medium">
                        Advisory &amp; Strategic Mentorship
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Full Profile, Bio & Expertise Tags */}
                  <div className="lg:col-span-8 xl:col-span-9 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between space-y-6">
                    <div className="space-y-6">
                      
                      {/* Header block (Desktop) */}
                      <div className="border-b border-slate-100 pb-5 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3
                            className="text-2xl sm:text-3xl font-black text-[#0F172A]"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            {advisor.name}
                          </h3>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF3E7] text-[#8C4E13] border border-[#ECC599] text-xs font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D48D3B]" />
                            {advisor.experience}
                          </span>
                        </div>
                        <div className="text-sm sm:text-base text-[#1E3A8A] font-bold">
                          {advisor.title}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {advisor.credentials}
                        </div>
                      </div>

                      {/* Short Bio */}
                      <div className="space-y-3.5 text-sm sm:text-base text-[#334155] leading-relaxed">
                        {advisor.bio.map((paragraph, pIdx) => (
                          <p key={pIdx}>{paragraph}</p>
                        ))}
                      </div>

                      {/* Expertise Tags */}
                      <div className="space-y-3 pt-2">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-[#1E3A8A] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">award_star</span>
                          <span>Areas of Expertise</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {advisor.expertise.map((skill) => (
                            <span
                              key={skill}
                              className="px-3.5 py-1.5 rounded-xl bg-[#FDF3E7] text-[#8C4E13] border border-[#ECC599] text-xs sm:text-sm font-bold shadow-2xs hover:bg-[#F6D3AC]/40 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Key Takeaway / Perspective Quote */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-[#FDF3E7]/80 border-l-4 border-[#1E3A8A] border border-slate-200/70 shadow-2xs mt-4">
                      <p className="text-xs sm:text-sm text-[#0F172A] font-bold italic">
                        "{advisor.takeaway}"
                      </p>
                    </div>

                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* 3. WHY THEIR EXPERIENCE MATTERS                               */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-[#EFF6FF]/40 to-white border-y border-slate-200">
        <div className="site-wrapper space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF3E7] text-[#8C4E13] border border-[#ECC599] text-xs font-extrabold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm text-[#8C4E13]">insights</span>
              <span>Why Their Experience Matters</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Real Insights. Better Healthcare.
            </h2>
            <p className="text-sm sm:text-base text-[#334155]">
              How multidisciplinary mentorship drives practical excellence into every layer of OMEDO.
            </p>
          </div>

          {/* 4 Value Props Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyExperienceMatters.map((item, idx) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#ECC599] transition-all flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F6D3AC] text-[#1E3A8A] flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>

                  <div>
                    <h3
                      className="text-lg font-bold text-[#0F172A] mb-2"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* 4. CLOSING STATEMENT & CTA                                    */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 pb-20 sm:pb-28">
        <div className="site-wrapper">
          <motion.div
            className="rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#172554] text-white shadow-2xl border border-[#ECC599]/40"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Ambient decorative background icon */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden sm:block">
              <span className="material-symbols-outlined text-[#F6D3AC]" style={{ fontSize: '140px' }}>hub</span>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <span className="px-4 py-1.5 rounded-full bg-[#F6D3AC]/20 text-[#F6D3AC] text-xs sm:text-sm font-extrabold uppercase tracking-wider inline-block border border-[#ECC599]/40">
                Building With Experience
              </span>

              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                "Technology becomes more meaningful when it is guided by people who understand the problems behind it."
              </h2>

              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
                OMEDO combines technology, healthcare knowledge and real-world experience to build a more connected healthcare ecosystem.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row flex-wrap justify-center gap-3.5 sm:gap-4">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#ECC599] via-[#F6D3AC] to-[#ECC599] hover:brightness-105 text-[#0A1633] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-black shadow-lg shadow-[#ECC599]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Contact Us</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto border border-white/40 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Book a Demo</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
