export const navLinks = [
  { name: 'Products', path: '/products' },
  { 
    name: 'Modules', 
    path: '/modules',
    dropdownLabel: 'System Sub-Modules',
    icon: 'grid_view',
    dropdownWidth: 'w-80',
    children: [
      { name: 'Clinical', path: '/modules/clinical', icon: 'clinical_notes', desc: 'OPD, IPD Admissions, Doctor & Nurse Workspaces' },
      { name: 'IPD', path: '/modules/ipd', icon: 'bed', desc: 'Nurse dashboard, provisional estimates & ward billing' },
      { name: 'Laboratory', path: '/modules/laboratory', icon: 'science', desc: 'Patient investigation requests & test verification' },
      { name: 'Billing & Accounts', path: '/modules/billing-accounts', icon: 'payments', desc: 'Invoicing, TPA claims, Doctor payouts & GST ledgers' },
      { name: 'ABDM', path: '/abdm-integration', icon: 'verified_user', desc: 'ABDM & ABHA digital health ecosystem integration' },
      { name: 'Reports & Analytics', path: '/modules/reports', icon: 'analytics', desc: 'Doctor performance, cashier collections & bill registers' },
      { name: 'IT Admin', path: '/modules/it-admin', icon: 'admin_panel_settings', desc: 'Role permissions, ward setup & master controls' },
    ]
  },
  { name: 'ABDM', path: '/abdm-integration' },
  {
    name: 'Company',
    path: '/about',
    dropdownLabel: 'Company & Advisory',
    icon: 'corporate_fare',
    dropdownWidth: 'w-80',
    children: [
      { name: 'About Us', path: '/about', icon: 'info', desc: 'Our mission, vision, leadership & story' },
      { name: 'Advisors & Consultants', path: '/advisors-consultants', icon: 'groups_2', desc: 'Industry experience that guides OMEDO' },
      { name: 'Contact Us', path: '/contact', icon: 'support_agent', desc: 'Get in touch, sales enquiries & 24/7 support' },
    ]
  },
]


