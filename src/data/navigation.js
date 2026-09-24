export const navLinks = [
  { name: 'Products', path: '/products' },
  { name: 'ABDM', path: '/abdm-integration' },
  {
    name: 'Company',
    path: '/about',
    dropdownLabel: 'Company & Advisory',
    icon: 'corporate_fare',
    dropdownWidth: 'w-80',
    children: [
      { name: 'About Us', path: '/about', icon: 'info', desc: 'Our mission, vision, leadership & story' },
      { name: 'Our Advisors', path: '/advisors-consultants', icon: 'groups_2', desc: 'Industry experience that guides OMEDO' },
      { name: 'Contact Us', path: '/contact', icon: 'support_agent', desc: 'Get in touch, sales enquiries & 24/7 support' },
    ]
  },
]


