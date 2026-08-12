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

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-3">
            <Link to="/" className="inline-flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-xl sm:text-2xl"
                style={{ fontVariationSettings: "'FILL' 1", color: 'var(--t-accent-light, #85f5e6)' }}
              >
                medical_services
              </span>
              <span
                className="text-lg sm:text-xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                MedCare HMS
              </span>
            </Link>
            <p style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--t-accent, #67d9ca) 40%, #999)', lineHeight: '1.6', maxWidth: '28rem' }}>
              Unified healthcare management platform for modern hospitals, OPD/IPD workflows, labs, and billing automation.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {['public', 'mail', 'phone'].map((icon) => (
                <Link
                  key={icon}
                  to="/contact"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: 'color-mix(in srgb, var(--t-primary, #00685e) 30%, #1a1a1a)',
                    color: 'var(--t-accent-light, #85f5e6)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--t-primary, #00685e)'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'color-mix(in srgb, var(--t-primary, #00685e) 30%, #1a1a1a)'
                    e.currentTarget.style.color = 'var(--t-accent-light, #85f5e6)'
                  }}
                >
                  <span className="material-symbols-outlined text-base">{icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">

            {/* System Modules */}
            <div className="space-y-2.5">
              <h4
                className="font-bold text-xs uppercase tracking-wider pb-1.5"
                style={{
                  color: 'white',
                  borderBottom: '1px solid color-mix(in srgb, var(--t-border, #6d7a77) 30%, transparent)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                System Modules
              </h4>
              <ul className="space-y-1.5 text-xs">
                {moduleLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="py-0.5 inline-block transition-colors"
                      style={{ color: 'inherit' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--t-accent-light, #85f5e6)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-2.5">
              <h4
                className="font-bold text-xs uppercase tracking-wider pb-1.5"
                style={{
                  color: 'white',
                  borderBottom: '1px solid color-mix(in srgb, var(--t-border, #6d7a77) 30%, transparent)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Navigation
              </h4>
              <ul className="space-y-1.5 text-xs">
                {mainLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="py-0.5 inline-block transition-colors"
                      style={{ color: 'inherit' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--t-accent-light, #85f5e6)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Legal */}
            <div className="col-span-2 sm:col-span-1 space-y-2.5 pt-2 sm:pt-0">
              <h4
                className="font-bold text-xs uppercase tracking-wider pb-1.5"
                style={{
                  color: 'white',
                  borderBottom: '1px solid color-mix(in srgb, var(--t-border, #6d7a77) 30%, transparent)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Support & Legal
              </h4>
              <ul className="space-y-1.5 text-xs flex flex-wrap sm:block gap-x-4 gap-y-1.5">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="py-0.5 inline-block transition-colors"
                      style={{ color: 'inherit' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--t-accent-light, #85f5e6)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="py-4 flex flex-col sm:flex-row justify-between items-center gap-2.5 text-[11px]"
          style={{
            borderTop: '1px solid color-mix(in srgb, var(--t-border, #6d7a77) 20%, transparent)',
            color: 'color-mix(in srgb, var(--t-accent, #67d9ca) 35%, #888)',
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
