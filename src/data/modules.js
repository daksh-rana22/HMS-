import {
  Stethoscope,
  ServerCog,
  FileBarChart,
  BedDouble,
  Receipt,
  FlaskConical,
} from 'lucide-react'

export const modules = [
  {
    icon: Stethoscope,
    title: 'Clinical',
    description:
      'Full-spectrum clinical management — from patient registration and electronic health records to prescriptions, treatment plans, and clinical decision support systems.',
    color: '#EF4444',
  },
  {
    icon: ServerCog,
    title: 'IT Administration',
    description:
      'Centralized system configuration with user management, role-based access control, audit logs, system monitoring, and automated backup management for robust IT governance.',
    color: '#64748B',
  },
  {
    icon: FileBarChart,
    title: 'Reports',
    description:
      'Generate and export insightful reports across departments with customizable templates, automated scheduling, and interactive visual dashboards for data-driven decisions.',
    color: '#0EA5E9',
  },
  {
    icon: BedDouble,
    title: 'IPD',
    description:
      'End-to-end inpatient care management including bed allocation, ward management, treatment tracking, nursing workflows, discharge summaries, and real-time bed availability.',
    color: '#22C55E',
  },
  {
    icon: Receipt,
    title: 'Billing & Accounts',
    description:
      'Comprehensive financial management including invoicing, insurance claims, payment processing, ledger management, and detailed financial reporting for complete fiscal transparency.',
    color: '#F59E0B',
  },
  {
    icon: FlaskConical,
    title: 'Laboratory',
    description:
      'Streamline lab operations with automated test ordering, sample tracking, result management, and seamless integration with clinical workflows for faster, more accurate diagnostics.',
    color: '#8B5CF6',
  },
]
