export const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'Modules', 
    path: '/modules',
    children: [
      { name: 'Clinical', path: '/modules/clinical', icon: 'clinical_notes', desc: 'OPD, IPD Admissions, Doctor & Nurse Workspaces, Rapid Consult' },
      { name: 'IT Administration', path: '/modules/it-admin', icon: 'admin_panel_settings', desc: 'Role permissions, ward setup, TPA tariffs & master controls' },
      { name: 'Reports & Analytics', path: '/modules/reports', icon: 'analytics', desc: 'Doctor performance, cashier collections, due amounts & bill registers' },
      { name: 'IPD', path: '/modules/ipd', icon: 'bed', desc: 'Nurse dashboard, provisional estimates, bed matrix & ward billing' },
      { name: 'Billing & Accounts', path: '/modules/billing-accounts', icon: 'payments', desc: 'Invoicing, TPA claims, Doctor payouts & GST ledgers' },
      { name: 'Laboratory', path: '/modules/laboratory', icon: 'science', desc: 'Patient investigation requests, OPD lab orders & test report verification' },
    ]
  },
  { name: 'About Us', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact Us', path: '/contact' },
]
