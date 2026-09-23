import { Link } from 'react-router-dom'
import omedoLogo from '../../assets/omedo_logo.png'

const moduleLinks = [
  { name: 'Clinical', path: '/modules/clinical' },
  { name: 'IPD', path: '/modules/ipd' },
  { name: 'Laboratory', path: '/modules/laboratory' },
  { name: 'Billing & Accounts', path: '/modules/billing-accounts' },
  { name: 'ABDM', path: '/abdm-integration' },
  { name: 'Reports & Analytics', path: '/modules/reports' },
  { name: 'IT Admin', path: '/modules/it-admin' },
]

const mainLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About Us', path: '/about' },
  { name: 'Advisors & Consultants', path: '/advisors-consultants' },
  { name: 'Contact Us', path: '/contact' },
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
            <Link to="/" className="inline-block bg-white p-2 sm:p-2.5 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.02] transition-all">
              <img
                src={omedoLogo}
                alt="OMEDO - Best Hospital Management Software in India!"
                className="h-12 sm:h-14 w-auto object-contain rounded-xl"
                style={{ maxWidth: '180px' }}
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Enterprise Hospital Management System empowering modern medical centers across India with ABDM &amp; ABHA integration, clinical EMR, and real-time revenue intelligence.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ABDM &amp; NHA Milestone 1, 2 &amp; 3 Integration Ready</span>
            </div>
          </div>

          {/* 2. OMEDO Core Modules (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              OMEDO Core Modules
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
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Contact &amp; Support
            </h4>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              {/* Email Inquiries */}
              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">Email Inquiries</span>
                <div className="space-y-1 text-slate-300">
                  <div>Sales: <a href="tel:+917457912924" className="text-cyan-300 hover:underline font-medium">+91 74579 12924</a> &bull; <a href="mailto:sales@omedosoft.com" className="text-cyan-300 hover:underline font-medium">sales@omedosoft.com</a></div>
                  <div>Support: <a href="tel:+917457912923" className="text-cyan-300 hover:underline font-medium">+91 74579 12923</a> &bull; <a href="mailto:support@omedosoft.com" className="text-cyan-300 hover:underline font-medium">support@omedosoft.com</a></div>
                </div>
              </div>

              {/* Corporate Office */}
              <div className="pt-3.5 text-xs leading-relaxed border-t border-white/10 space-y-2">
                <div>
                  <div className="font-semibold text-white tracking-wide">Corporate Office</div>
                  <div className="text-cyan-300 font-semibold text-xs mt-0.5">OMEDO Software Solutions Pvt Ltd.</div>
                </div>
                
                <div className="text-slate-300 text-xs leading-relaxed">
                  H-154, Sector-23, Sanjay Nagar,<br />
                  Ghaziabad — 201001, Uttar Pradesh, India
                </div>

                <div className="text-[11px] text-slate-400 space-y-0.5 pt-0.5">
                  <div><strong className="text-slate-300">CIN:</strong> U62099UW2026PTC257817</div>
                  <div><strong className="text-slate-300">MSME:</strong> UDYAM-UP-29-0255247</div>
                </div>
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
            © {new Date().getFullYear()} <span className="text-slate-200 font-semibold">OMEDO Software Solutions Pvt Ltd</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-[11px] text-slate-400">
            <Link to="/terms" className="hover:text-slate-200 transition-colors uppercase tracking-wider font-medium hover:underline">
              TERMS &amp; CONDITIONS
            </Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-slate-200 transition-colors uppercase tracking-wider font-medium hover:underline">
              PRIVACY POLICY
            </Link>
            <span>•</span>
            <Link to="/refund" className="hover:text-slate-200 transition-colors uppercase tracking-wider font-medium hover:underline">
              REFUND &amp; CANCELLATION POLICY
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
