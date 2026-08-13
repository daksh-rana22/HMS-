import { Link } from 'react-router-dom'

const moduleLinks = [
  { name: 'Clinical Management', path: '/modules/clinical' },
  { name: 'IT Administration', path: '/modules/it-admin' },
  { name: 'Reports & Analytics', path: '/modules/reports' },
  { name: 'IPD Care', path: '/modules/ipd' },
  { name: 'Billing & Accounts', path: '/modules/billing-accounts' },
  { name: 'Laboratory', path: '/modules/laboratory' },
]

const mainLinks = [
  { name: 'Home', path: '/' },
  { name: 'All Modules', path: '/modules' },
  { name: 'ABDM Integration', path: '/abdm-integration' },
  { name: 'About Us', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact Us', path: '/contact' },
]

const legalLinks = [
  { name: 'Book a Demo', path: '/contact' },
  { name: 'Privacy Policy', path: '/contact' },
  { name: 'Terms of Service', path: '/contact' },
  { name: 'Security & Compliance', path: '/contact' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'color-mix(in srgb, var(--t-primary, #00685e) 12%, #111111)',
        borderTop: '1px solid color-mix(in srgb, var(--t-border, #6d7a77) 25%, transparent)',
        color: 'color-mix(in srgb, var(--t-accent, #67d9ca) 50%, #aaaaaa)',
      }}
    >
      <div className="site-wrapper">
        {/* Compact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 sm:py-10 lg:py-12">

          {/* Brand Info — Left Column */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4">
            <Link to="/" className="inline-flex items-center gap-1.5">
              <span
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-black text-white text-xs sm:text-sm"
                style={{ background: 'var(--t-primary, #00685e)' }}
              >
                +
              </span>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                MedCare<span style={{ color: 'var(--t-primary-mid, #008378)' }}>HMS</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed max-w-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Enterprise Hospital Management System empowering modern medical centers across India with ABDM & ABHA integration, clinical EMR, and real-time revenue intelligence.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] font-bold" style={{ color: 'var(--t-primary-mid, #008378)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ABDM &amp; NHA Milestone 1, 2 &amp; 3 Certified</span>
            </div>
          </div>

          {/* Modules Navigation Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              HMS Core Modules
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {moduleLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-white transition-colors duration-200 inline-block py-0.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {mainLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-white transition-colors duration-200 inline-block py-0.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Compliance Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Compliance &amp; Support
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm mb-3">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-white transition-colors duration-200 inline-block py-0.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-white/10 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-white/80 font-bold">
                <span className="material-symbols-outlined text-sm" style={{ color: 'var(--t-primary-mid, #008378)' }}>headset_mic</span>
                <span>24/7 Priority Support Desk</span>
              </div>
              <p className="text-[11px] opacity-75">support@medcarehms.in • +91 1800-419-8800</p>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright Strip */}
        <div
          className="border-t py-4 text-xs flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{
            borderColor: 'color-mix(in srgb, var(--t-border, #6d7a77) 20%, transparent)',
          }}
        >
          <p className="text-center sm:text-left" style={{ fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} MedCare Health Systems. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-center">
            <span>HIPAA Compliant</span>
            <span className="hidden sm:inline">•</span>
            <span>GDPR Certified</span>
            <span className="hidden sm:inline">•</span>
            <span>ISO 27001</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
