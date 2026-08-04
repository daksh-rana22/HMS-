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
    <footer className="bg-[#172224] border-t border-[#6d7a77]/25 text-[#bcc9c6]">
      <div className="site-wrapper">
        {/* Compact Grid: 1 col on mobile for brand, 2-cols for links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 sm:py-10 lg:py-12">
          
          {/* Brand Column (4 Cols on desktop) */}
          <div className="lg:col-span-4 space-y-3">
            <Link to="/" className="inline-flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#85f5e6] text-xl sm:text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
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
            <p className="text-xs text-[#9eb2af] leading-relaxed max-w-sm">
              Unified healthcare management platform for modern hospitals, OPD/IPD workflows, labs, and billing automation.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {['public', 'mail', 'phone'].map((icon) => (
                <Link key={icon} to="/contact" className="w-8 h-8 rounded-full bg-[#243336] hover:bg-[#00685e] text-[#85f5e6] hover:text-white transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">{icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Grid: 2 columns on mobile (grid-cols-2), 3 cols on tablet (sm:grid-cols-3) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
            
            {/* System Modules */}
            <div className="space-y-2.5">
              <h4
                className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#6d7a77]/30 pb-1.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                System Modules
              </h4>
              <ul className="space-y-1.5 text-xs">
                {moduleLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-[#85f5e6] transition-colors py-0.5 inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-2.5">
              <h4
                className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#6d7a77]/30 pb-1.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Navigation
              </h4>
              <ul className="space-y-1.5 text-xs">
                {mainLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-[#85f5e6] transition-colors py-0.5 inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Legal */}
            <div className="col-span-2 sm:col-span-1 space-y-2.5 pt-2 sm:pt-0">
              <h4
                className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#6d7a77]/30 pb-1.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Support & Legal
              </h4>
              <ul className="space-y-1.5 text-xs flex flex-wrap sm:block gap-x-4 gap-y-1.5">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-[#85f5e6] transition-colors py-0.5 inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar - Mobile Friendly */}
        <div className="border-t border-[#6d7a77]/20 py-4 flex flex-col sm:flex-row justify-between items-center gap-2.5 text-[11px] text-[#869996]">
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
