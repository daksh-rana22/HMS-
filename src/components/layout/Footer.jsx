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
  { name: 'Contact Us', path: '/contact' },
  { name: 'Privacy Policy', path: '/contact' },
  { name: 'Terms of Service', path: '/contact' },
]

export default function Footer() {
  return (
    <footer
      className="border-t text-slate-300 text-xs sm:text-sm"
      style={{
        background: 'color-mix(in srgb, var(--t-primary, #00685e) 12%, #081118)',
        borderColor: 'color-mix(in srgb, var(--t-primary, #00685e) 25%, transparent)',
      }}
    >
      <div className="site-wrapper py-10 sm:py-12 md:py-14">
        
        {/* Main 4-Column Flat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10">

          {/* 1. Brand & Offices (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/images/omedo_logo_white.png"
                alt="Omedo - Healthcare. Simplified."
                className="h-10 sm:h-11 w-auto object-contain"
                style={{ maxWidth: '190px' }}
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Enterprise Hospital Management System empowering modern medical centers across India with ABDM &amp; ABHA integration, clinical EMR, and real-time revenue intelligence.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ABDM &amp; NHA Milestone 1, 2 &amp; 3 Certified</span>
            </div>

            {/* Offices */}
            <div className="pt-2 space-y-2 text-xs text-slate-400 leading-relaxed border-t border-white/10">
              <div>
                <span className="font-semibold text-white">Lucknow Corporate HQ:</span> <a href="https://reckonsales.in/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline font-semibold">Reckon Sales Pvt. Ltd.</a>, SF-2 New Medicine Market, Meer Jaan Lane, Naya Gaon East, Gautam Budha Marg, Lucknow-226018, UP
              </div>
              <div>
                <span className="font-semibold text-white">Ghaziabad Office:</span> <a href="https://www.technohunk.in/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline font-semibold">Technohunk Info Solutions Pvt Ltd</a>, H-11, Sector-23, Sanjay Nagar, Ghaziabad — 201002, UP
              </div>
            </div>
          </div>

          {/* 2. HMS Core Modules (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              HMS Core Modules
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {moduleLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-slate-300 hover:text-white hover:underline transition-colors block py-0.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Quick Links & Legal (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {mainLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-slate-300 hover:text-white hover:underline transition-colors block py-0.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact & Support (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Contact &amp; Support
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <div>
                <span className="text-slate-400 block text-[11px] font-medium">Direct Lines:</span>
                <a href="tel:05224972500" className="hover:text-white block font-semibold text-white">Landline: 0522-4972500</a>
                <a href="tel:+919873003702" className="hover:text-white block font-semibold text-white">Mobile: +91 9873003702</a>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] font-medium">Sales Hotlines:</span>
                <span className="font-semibold text-emerald-400">
                  <a href="tel:+916389590600" className="hover:underline">+91 6389 590 600</a> | <a href="tel:+916389590700" className="hover:underline">+91 6389 590 700</a>
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] font-medium">Email Inquiries:</span>
                <div className="space-y-0.5">
                  <div>Support: <a href="mailto:care@reckonsales.com" className="text-cyan-300 hover:underline">care@reckonsales.com</a></div>
                  <div>Sales: <a href="mailto:sales@reckonsales.com" className="text-cyan-300 hover:underline">sales@reckonsales.com</a></div>
                  <div>General: <a href="mailto:Info@technohunk.co.in" className="text-cyan-300 hover:underline">Info@technohunk.co.in</a></div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-1">
                Helpdesk Hours: Mon–Sat 9:30 AM – 6:30 PM IST
              </div>
            </div>
          </div>

        </div>

        {/* Flat Bottom Copyright Strip */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <a href="https://reckonsales.in/" target="_blank" rel="noopener noreferrer" className="text-slate-200 font-semibold hover:underline">Reckon Sales Pvt. Ltd.</a> (Omedo). All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-[11px] text-slate-400">
            <span>HIPAA Compliant</span>
            <span>•</span>
            <span>GDPR Certified</span>
            <span>•</span>
            <span>ISO 27001</span>
            <span>•</span>
            <span>ABDM Certified</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
