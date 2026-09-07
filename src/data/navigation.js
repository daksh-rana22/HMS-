export const navLinks = [
  { name: 'Products', path: '/products' },
  { 
    name: 'Modules', 
    path: '/modules',
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
  { name: 'About Us', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
]
