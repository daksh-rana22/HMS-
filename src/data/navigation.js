export const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'Modules', 
    path: '/modules',
    children: [
      { name: 'Clinical', path: '/modules/clinical', icon: 'clinical_notes', desc: 'OPD, IPD Admissions, Doctor & Nurse Workspaces' },
      { name: 'IT Administration', path: '/modules/it-admin', icon: 'admin_panel_settings', desc: 'Role permissions, ward setup & master controls' },
      { name: 'Reports & Analytics', path: '/modules/reports', icon: 'analytics', desc: 'Doctor performance, cashier collections & bill registers' },
      { name: 'IPD', path: '/modules/ipd', icon: 'bed', desc: 'Nurse dashboard, provisional estimates & ward billing' },
      { name: 'Billing & Accounts', path: '/modules/billing-accounts', icon: 'payments', desc: 'Invoicing, TPA claims, Doctor payouts & GST ledgers' },
      { name: 'Laboratory', path: '/modules/laboratory', icon: 'science', desc: 'Patient investigation requests & test verification' },
      { name: 'ABDM Integration', path: '/abdm-integration', icon: 'verified_user', desc: 'ABDM & ABHA digital health ecosystem integration' },
    ]
  },
  { name: 'ABDM Integration', path: '/abdm-integration' },
  { name: 'About Us', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact Us', path: '/contact' },
]
