import { Link } from 'react-router-dom'

const productLinks = [
  { name: 'Features', path: '/' },
  { name: 'EHR Integration', path: '#' },
  { name: 'Telemedicine', path: '#' },
  { name: 'Pharmacy', path: '#' },
]
const companyLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Careers', path: '#' },
  { name: 'News', path: '#' },
  { name: 'Contact', path: '/contact' },
]
const resourceLinks = [
  { name: 'Support Center', path: '#' },
  { name: 'Terms of Service', path: '#' },
  { name: 'Privacy Policy', path: '#' },
  { name: 'Sitemap', path: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#273234] border-t border-[#6d7a77]/20">
      <div className="site-wrapper">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 2xl:gap-12 py-16 md:py-20 2xl:py-24">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[#85f5e6] text-2xl 2xl:text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                medical_services
              </span>
              <span
                className="text-xl 2xl:text-2xl font-bold text-[#85f5e6]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                MedCare HMS
              </span>
            </div>
            <p className="text-[#bcc9c6] text-sm 2xl:text-base leading-relaxed max-w-xs">
              Advanced healthcare infrastructure for the modern world. Seamlessly integrating technology into patient care.
            </p>
            <div className="flex gap-5">
              {['public', 'mail', 'phone'].map((icon) => (
                <a key={icon} href="#" className="text-[#bcc9c6] hover:text-[#67d9ca] transition-colors">
                  <span className="material-symbols-outlined text-2xl 2xl:text-3xl">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <FooterCol title="Product" links={productLinks} isRouterLink />

          {/* Company */}
          <FooterCol title="Company" links={companyLinks} isRouterLink />

          {/* Resources */}
          <FooterCol title="Resources" links={resourceLinks} />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#6d7a77]/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#bcc9c6] text-xs 2xl:text-sm text-center sm:text-left" style={{ fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} MedCare Health Systems. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {['HIPAA Compliant', 'GDPR Certified', 'ISO 27001'].map((badge) => (
              <span key={badge} className="text-[#bcc9c6] text-xs 2xl:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links, isRouterLink }) {
  return (
    <div className="space-y-4">
      <h4
        className="text-[#e7f3f5] font-bold text-xs 2xl:text-sm uppercase tracking-wider border-b border-[#6d7a77]/20 pb-2 sm:border-b-0 sm:pb-0"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.name}>
            {isRouterLink ? (
              <Link
                to={link.path}
                className="text-[#bcc9c6] hover:text-[#67d9ca] transition-colors text-sm 2xl:text-base inline-block py-1 min-h-[36px] flex items-center"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {link.name}
              </Link>
            ) : (
              <a
                href={link.path}
                className="text-[#bcc9c6] hover:text-[#67d9ca] transition-colors text-sm 2xl:text-base inline-block py-1 min-h-[36px] flex items-center"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {link.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
