import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageTransition } from '../../utils/animations'

const fadeUp = {
  hidden: { opacity: 0, y: 44, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.22 } } }

// ── SAMPLE SERVICE ORDERS DATA FOR LABORATORY ──
const labOrders = [
  { name: 'Lalit', id: 'LCI202600438', date: '30/07/2026 02:27 PM', doctor: 'Avanish Dubey', dept: 'Neurology', status: 'Completed', payment: 'Paid' },
  { name: 'Yasodha', id: 'LCI202600450', date: '30/07/2026 10:39 AM', doctor: 'Doctor Kumar', dept: 'Cardiology', status: 'Completed', payment: 'Paid' },
  { name: 'Neelam', id: 'LCI202600449', date: '30/07/2026 10:18 AM', doctor: 'Doctor Kumar', dept: 'Cardiology', status: 'Completed', payment: 'Paid' },
  { name: 'Shabnam Gill', id: 'LCI202600448', date: '29/07/2026 09:54 AM', doctor: 'Avanish Dubey', dept: 'Neurology', status: 'Completed', payment: 'Paid' },
  { name: 'Ratnesh Chaturvedi', id: 'LCI202600426', date: '28/07/2026 01:38 PM', doctor: 'Avanish Dubey', dept: 'Neurology', status: 'Completed', payment: 'Paid' },
]

// ── BILLING & ACCOUNTS DATA FOR ALL 6 VIEWS ──
const billingAccountGroups = [
  { name: 'Liabilities', sub: '2 sub-groups', code: 'AG002', nature: 'Cr', status: 'Active' },
  { name: 'Income-Revenue', sub: '1 sub-groups', code: 'AG003', nature: 'Cr', status: 'Active' },
  { name: 'Expense Direct', sub: '1 sub-groups', code: 'AG004', nature: 'Dr', status: 'Active' },
  { name: 'Expense Indirect', sub: '2 sub-groups', code: 'AG005', nature: 'Dr', status: 'Active' },
  { name: 'Income Indirect', sub: '1 sub-groups', code: 'AG006', nature: 'Cr', status: 'Active' },
  { name: 'Assets', sub: '2 sub-groups', code: 'AG001', nature: 'Dr', status: 'Active' },
]

const billingLedgers = [
  { name: 'Acme Pharmaceuticals', type: 'ASSETS • Jane Smith', code: 'LDG_CUST_002', balance: '₹1,500 Dr', location: 'Bangalore, KA', gst: '298888822228222', status: 'Active' },
  { name: 'Patient Ledger – John Doe', type: 'INCOME • John Doe', code: 'LDG-PAT-001', balance: '₹0', location: 'Bengaluru, KA', gst: '29AAACB1234F1Z5', status: 'Active' },
  { name: 'Supplier – MediCorp Inc', type: 'LIABILITIES • Rahul Sharma', code: 'LDG004', balance: '₹15,000 Dr', location: 'Mumbai, MH', gst: '27AADC82258M1Z2', status: 'Active' },
  { name: 'ABC Diagnostic Centre', type: 'ASSETS • Amit Verma', code: 'LDG005', balance: '₹75,000 Dr', location: 'New Delhi, DL', gst: '07AABCA1234F1Z5', status: 'Active' },
  { name: 'Prime Diagnostics Pvt Ltd', type: 'ASSETS • Vinay', code: 'LDG007', balance: '₹12,000,000 Dr', location: 'Gonda, UP', gst: '29000002222D2Z2', status: 'Active' },
]

const billingServices = [
  { code: 'CON001', name: 'CBC Test', type: 'Consultations', hsn: '899311', rate: '₹500.00', status: 'Active' },
  { code: 'CON002', name: 'MRI Brain Scan with Contrast', type: 'Consultations', hsn: '999312', rate: '₹1,000.00', status: 'Active' },
  { code: 'OPD-CONSULT', name: 'OPD Consultancy', type: 'OPD Consultation', hsn: '999311', rate: '₹200.00', status: 'Active' },
  { code: 'REG-FEE', name: 'OPD Registration Fee', type: 'OPD Consultation', hsn: '–', rate: '₹200.00', status: 'Active' },
  { code: 'IPD-ADVANCE', name: 'IPD Advanced Fee', type: 'OPD Consultation', hsn: '999311', rate: '₹200.00', status: 'Active' },
  { code: 'LAB002', name: 'CBC Test', type: 'Laboratory', hsn: '123123', rate: '₹1,000.00', status: 'Active' },
]

const billingGstRates = [
  { code: 'GST018', name: 'GST 18%', cgst: '9%', sgst: '9%', igst: '18%', cess: '0%', status: 'Active' },
  { code: 'GST017', name: 'GST 0%', cgst: '0%', sgst: '0%', igst: '0%', cess: '0%', status: 'Active' },
  { code: 'GST020', name: 'GST 12%', cgst: '6%', sgst: '6%', igst: '12%', cess: '0%', status: 'Active' },
  { code: 'GST021', name: 'GST 5%', cgst: '2.5%', sgst: '2.5%', igst: '5%', cess: '0%', status: 'Active' },
  { code: 'GST005', name: 'GST 28%', cgst: '14%', sgst: '14%', igst: '28%', cess: '0%', status: 'Active' },
  { code: 'GST006', name: 'Cosmetic surgeries', cgst: '9.5%', sgst: '9.5%', igst: '19%', cess: '0%', status: 'Active' },
]

const billingVoucherTypes = [
  { name: 'Receipt', code: 'VT001', status: 'Active' },
  { name: 'Payment', code: 'VT002', status: 'Active' },
  { name: 'Journal', code: 'VT003', status: 'Active' },
  { name: 'Sales', code: 'VT004', status: 'Active' },
  { name: 'Purchase', code: 'VT005', status: 'Active' },
  { name: 'Credit Note', code: 'VT006', status: 'Active' },
  { name: 'Debit Note', code: 'VT008', status: 'Active' },
]

const billingVouchers = [
  { name: 'Advance Voucher', code: 'VT001', prefix: 'ADV', lastNo: '0', fy: '26-27', type: 'RECEIPT', status: 'Active' },
  { name: 'OPD Billing', code: 'VT002', prefix: 'SV', lastNo: '2586', fy: '26-27', type: 'PAYMENT', status: 'Active' },
  { name: 'new ipd voucher', code: 'VT001', prefix: 'SV/IPD/2627/', lastNo: '11', fy: '26-27', type: 'RECEIPT', status: 'Active' },
  { name: 'Refund Receipt', code: 'VT001', prefix: 'REC', lastNo: '46', fy: '26-27', type: 'RECEIPT', status: 'Active' },
  { name: 'Miscellaneous Invoice', code: 'VT004', prefix: 'INV/SVC', lastNo: '57', fy: '26-27', type: 'SALES', status: 'Active' },
]

// ── SAMPLE CLINICAL DATA ──
const clinicalDashboardData = { opdToday: 142, ipdAdmitted: 38, todayRevenue: '₹2,84,500', activeDoctors: 12 }

const clinicalPatients = [
  { id: 'PAT2026-0812', name: 'Rajesh Kumar', age: '45 Yrs / Male', mobile: '+91 98765-43210', abha: 'ABHA-9821-4321', ehr: 'Active' },
  { id: 'PAT2026-0813', name: 'Meenakshi Sundaram', age: '32 Yrs / Female', mobile: '+91 98123-45678', abha: 'ABHA-3312-8812', ehr: 'Active' },
  { id: 'PAT2026-0814', name: 'Harpreet Singh', age: '58 Yrs / Male', mobile: '+91 97654-32109', abha: 'ABHA-5512-9901', ehr: 'Active' },
  { id: 'PAT2026-0815', name: 'Kavita Reddy', age: '29 Yrs / Female', mobile: '+91 99887-76655', abha: 'ABHA-1200-4491', ehr: 'Active' },
  { id: 'PAT2026-0816', name: 'Amitabh Sen', age: '64 Yrs / Male', mobile: '+91 98321-99887', abha: 'ABHA-4411-0023', ehr: 'Active' },
  { id: 'PAT2026-0817', name: 'Sunita Deshmukh', age: '51 Yrs / Female', mobile: '+91 97112-33445', abha: 'ABHA-8823-1190', ehr: 'Active' },
]

const clinicalAppointments = [
  { token: 'T-01', patient: 'Mrs. Priya Sharma', doctor: 'Dr. Avanish Dubey', dept: 'Neurology', time: '10:15 AM', status: 'Confirmed' },
  { token: 'T-02', patient: 'Rajesh Gupta', doctor: 'Dr. Kumar', dept: 'Cardiology', time: '10:30 AM', status: 'Confirmed' },
  { token: 'T-03', patient: 'Ananya Roy', doctor: 'Dr. Meera Verma', dept: 'Pediatrics', time: '11:00 AM', status: 'In Consultation' },
  { token: 'T-04', patient: 'Vikram Malhotra', doctor: 'Dr. Avanish Dubey', dept: 'Neurology', time: '11:30 AM', status: 'Confirmed' },
  { token: 'T-05', patient: 'Suresh Raina', doctor: 'Dr. Rajesh Sharma', dept: 'Orthopedics', time: '11:45 AM', status: 'Confirmed' },
  { token: 'T-06', patient: 'Pooja Hegde', doctor: 'Dr. Sunita Rao', dept: 'Gynecology', time: '12:15 PM', status: 'Confirmed' },
]

const clinicalCollections = [
  { ref: 'COL-901', category: 'OPD Consultation Fee', mode: 'UPI / Cash', amount: '₹42,600' },
  { ref: 'COL-902', category: 'IPD Ward & Surgery Advance', mode: 'Bank Wire', amount: '₹1,50,000' },
  { ref: 'COL-903', category: 'Pharmacy Counter POS', mode: 'Card POS', amount: '₹34,200' },
  { ref: 'COL-904', category: 'Lab & Diagnostics Billing', mode: 'Online UPI', amount: '₹57,700' },
  { ref: 'COL-905', category: 'Radiology MRI & CT Scans', mode: 'Card POS', amount: '₹88,000' },
  { ref: 'COL-906', category: 'Emergency ER Deposit', mode: 'Cash', amount: '₹25,000' },
]

const clinicalEmergency = [
  { bay: 'ER Bay 1', triage: 'Red (Critical)', protocol: 'Cardiac Arrest Protocol Active' },
  { bay: 'ER Bay 2', triage: 'Red (Critical)', protocol: 'Acute Stroke Thrombolysis Bay' },
  { bay: 'ER Bay 3', triage: 'Yellow (Urgent)', protocol: 'Acute Abdominal Pain / FAST Scan' },
  { bay: 'ER Bay 4', triage: 'Yellow (Urgent)', protocol: 'Polytrauma Fracture Stabilization' },
  { bay: 'ER Bay 5', triage: 'Green (Non-Urgent)', protocol: 'Minor Laceration Suturing' },
]

const clinicalOpdData = [
  { doctor: 'Dr. Avanish Dubey (Neurology)', totalPatients: 24, waiting: 4 },
  { doctor: 'Dr. Kumar (Cardiology)', totalPatients: 18, waiting: 2 },
  { doctor: 'Dr. Meera Verma (Pediatrics)', totalPatients: 31, waiting: 5 },
  { doctor: 'Dr. Rajesh Sharma (Orthopedics)', totalPatients: 22, waiting: 3 },
  { doctor: 'Dr. Sunita Rao (Gynecology)', totalPatients: 29, waiting: 6 },
]

const clinicalIpdData = [
  { ward: 'ICU Unit A', totalBeds: 10, occupied: 8, available: 2 },
  { ward: 'General Medical Ward 2', totalBeds: 24, occupied: 19, available: 5 },
  { ward: 'Private Deluxe Suite B', totalBeds: 6, occupied: 5, available: 1 },
  { ward: 'Surgical Care Ward 3C', totalBeds: 16, occupied: 12, available: 4 },
  { ward: 'Pediatric Care Unit', totalBeds: 12, occupied: 9, available: 3 },
]

const clinicalNurseDashboard = [
  { ward: 'Ward 3A - Bed 104', patient: 'Amit Shah (Post-Op Day 1)', status: 'Vitals Normal' },
  { ward: 'Ward 2B - Bed 201', patient: 'Fatima Begum', status: 'IV Drip 100 ml/hr' },
  { ward: 'Ward 4C - Bed 305', patient: 'Suresh Raina', status: 'Pre-Discharge Summary Ready' },
  { ward: 'ICU Bed 04', patient: 'Rameshwar Prasad', status: 'Ventilator Weaning Phase' },
  { ward: 'Ward 1A - Bed 112', patient: 'Kavita Verma', status: 'Post-Lab Results Received' },
]

const clinicalDoctorDashboard = {
  currentPatient: 'Priya Sharma (38 / F)',
  complaint: 'Recurrent migraine with photophobia (3 days duration)',
  vitals: { bp: '120/80 mmHg', temp: '98.6°F', pulse: '74 bpm', spo2: '99%' },
  prescription: ['Tab Sumatriptan 50mg BD', 'Tab Propranolol 40mg OD', 'Brain MRI (Contrast) Advised'],
}

const clinicalServiceBilling = [
  { invoice: 'INV-8801', patient: 'Karthik Murthy', total: '₹1,200.00' },
  { invoice: 'INV-8802', patient: 'Sunita Patel', total: '₹2,500.00' },
  { invoice: 'INV-8803', patient: 'Rohan Deshmukh', total: '₹4,800.00' },
  { invoice: 'INV-8804', patient: 'Anita Sen', total: '₹3,150.00' },
  { invoice: 'INV-8805', patient: 'Vikram Joshi', total: '₹12,400.00' },
]

const clinicalWaitingScreen = [
  { token: 'Token #14', patient: 'Sunil Verma', status: 'NOW CALLING' },
  { token: 'Token #15', patient: 'Pooja Hegde', status: 'NEXT IN QUEUE' },
  { token: 'Token #16', patient: 'Alok Nath', status: 'WAITING' },
  { token: 'Token #17', patient: 'Meena Saxena', status: 'WAITING' },
  { token: 'Token #18', patient: 'Kiran Bedi', status: 'WAITING' },
]

const clinicalRefunds = [
  { ref: 'RFD-102', patient: 'Rohan Joshi', amount: '₹200.00' },
  { ref: 'RFD-103', patient: 'Sita Ram', amount: '₹500.00' },
  { ref: 'RFD-104', patient: 'Anand Gopal', amount: '₹1,200.00' },
  { ref: 'RFD-105', patient: 'Maya Pillai', amount: '₹350.00' },
]

const clinicalRapidData = { opdToken: 'OPD Token #42 (Express Check-in)', patient: 'Sneha Deshmukh (F / 31)' }

// ── SAMPLE REPORTS DATA ──
const reportDoctorPerf = [
  { doctor: 'Dr. Avanish Dubey', dept: 'Neurology', count: 48, revenue: '₹24,000' },
  { doctor: 'Dr. Kumar', dept: 'Cardiology', count: 36, revenue: '₹36,000' },
  { doctor: 'Dr. Meera Verma', dept: 'Pediatrics', count: 52, revenue: '₹18,200' },
  { doctor: 'Dr. Rajesh Sharma', dept: 'Orthopedics', count: 41, revenue: '₹41,000' },
  { doctor: 'Dr. Sunita Rao', dept: 'Gynecology', count: 45, revenue: '₹31,500' },
  { doctor: 'Dr. Alok Gupta', dept: 'Gastroenterology', count: 33, revenue: '₹29,700' },
]

const reportOpdRegSummary = { newPatients: 64, revisitPatients: 78, totalOpd: 142 }
const reportOpdApptSummary = { scheduled: 120, attended: 108, cancelled: 8 }

const reportUserwiseCollection = [
  { user: 'Cashier Desk 1 (Sunil)', totalInvoices: 54, amount: '₹1,12,000' },
  { user: 'Cashier Desk 2 (Anjali)', totalInvoices: 41, amount: '₹89,500' },
  { user: 'Pharmacy Counter POS', totalInvoices: 68, amount: '₹64,200' },
  { user: 'Emergency ER Counter', totalInvoices: 29, amount: '₹45,000' },
  { user: 'Online Portal Gateway', totalInvoices: 47, amount: '₹83,000' },
]

const reportDeptwiseCollection = [
  { dept: 'Cardiology', revenue: '₹1,20,000' },
  { dept: 'Neurology', revenue: '₹85,000' },
  { dept: 'Radiology & PACS', revenue: '₹65,000' },
  { dept: 'General OPD', revenue: '₹74,500' },
  { dept: 'Orthopedics', revenue: '₹58,000' },
  { dept: 'Pediatrics', revenue: '₹42,000' },
]

const reportBillwiseCollection = [
  { bill: 'BILL-1002', patient: 'Lalit', amount: '₹1,200.00' },
  { bill: 'BILL-1003', patient: 'Yasodha', amount: '₹2,500.00' },
  { bill: 'BILL-1004', patient: 'Neelam', amount: '₹800.00' },
  { bill: 'BILL-1005', patient: 'Shabnam Gill', amount: '₹3,400.00' },
  { bill: 'BILL-1006', patient: 'Ratnesh Chaturvedi', amount: '₹1,850.00' },
  { bill: 'BILL-1007', patient: 'Kavita Reddy', amount: '₹5,200.00' },
]

const reportPaymentModeCollection = [
  { mode: 'UPI & PhonePe / GPay', amount: '₹1,45,000' },
  { mode: 'Credit & Debit Cards', amount: '₹85,000' },
  { mode: 'Cash Counter POS', amount: '₹44,500' },
  { mode: 'Insurance TPA Claim', amount: '₹35,000' },
  { mode: 'Bank NEFT Wire', amount: '₹50,000' },
]

const reportDueAmount = [
  { patient: 'Ramesh Chandra', balance: '₹14,500.00' },
  { patient: 'Swati Kulkarni', balance: '₹1,800.00' },
  { patient: 'Ganesh Shinde', balance: '₹8,200.00' },
  { patient: 'Farida Khan', balance: '₹22,000.00' },
]

const reportRefunds = [
  { ref: 'RF-401', patient: 'Rohan Joshi', amount: '₹200.00' },
  { ref: 'RF-402', patient: 'Sita Ram', amount: '₹500.00' },
  { ref: 'RF-403', patient: 'Anand Gopal', amount: '₹1,200.00' },
  { ref: 'RF-404', patient: 'Maya Pillai', amount: '₹350.00' },
]

const reportDiscounts = [
  { scheme: 'Senior Citizen Discount (15%)', totalConcession: '₹12,400' },
  { scheme: 'Staff & Family Concession (20%)', totalConcession: '₹8,900' },
  { scheme: 'BPL / Charity Trust Subsidy (50%)', totalConcession: '₹25,000' },
  { scheme: 'Corporate Group Privilege (10%)', totalConcession: '₹14,200' },
]

const reportCancelledBills = [
  { bill: 'CB-201', amount: '₹500.00' },
  { bill: 'CB-202', amount: '₹1,200.00' },
  { bill: 'CB-203', amount: '₹850.00' },
  { bill: 'CB-204', amount: '₹2,100.00' },
]

const reportBillRegister = { totalInvoices: 142, grossRevenue: '₹3,44,500', taxCollected: '₹31,005' }

// ── SAMPLE IT ADMINISTRATION DATA FOR ALL 18 SUB-MODULES (FROM USER SCREENSHOT) ──
const itDashboardData = { activeUsers: 64, systemUptime: '99.99%', encryptedBackups: 'Completed Today', activeModules: 18 }

const itDoctorSchedule = [
  { doctor: 'Dr. Avanish Dubey', dept: 'Neurology', shift: 'Morning (09:00 AM - 02:00 PM)', cabin: 'Cabin 102', status: 'Active Shift' },
  { doctor: 'Dr. Kumar', dept: 'Cardiology', shift: 'Evening (03:00 PM - 08:00 PM)', cabin: 'Cabin 105', status: 'Active Shift' },
  { doctor: 'Dr. Meera Verma', dept: 'Pediatrics', shift: 'Morning (08:30 AM - 01:30 PM)', cabin: 'Cabin 101', status: 'Active Shift' },
  { doctor: 'Dr. Rajesh Sharma', dept: 'Orthopedics', shift: 'Afternoon (01:00 PM - 06:00 PM)', cabin: 'Cabin 103', status: 'Active Shift' },
  { doctor: 'Dr. Sunita Rao', dept: 'Gynecology', shift: 'Morning (10:00 AM - 03:00 PM)', cabin: 'Cabin 104', status: 'Active Shift' },
  { doctor: 'Dr. Alok Gupta', dept: 'Gastroenterology', shift: 'Evening (04:00 PM - 09:00 PM)', cabin: 'Cabin 106', status: 'Active Shift' },
]

const itOpdRooms = [
  { room: 'Cabin 101', dept: 'Pediatrics OPD', doctor: 'Dr. Meera Verma', status: 'Occupied' },
  { room: 'Cabin 102', dept: 'Neurology OPD', doctor: 'Dr. Avanish Dubey', status: 'Occupied' },
  { room: 'Cabin 103', dept: 'Orthopedics OPD', doctor: 'Dr. Rajesh Sharma', status: 'Occupied' },
  { room: 'Cabin 104', dept: 'Gynecology OPD', doctor: 'Dr. Sunita Rao', status: 'Available' },
  { room: 'Cabin 105', dept: 'Cardiology OPD', doctor: 'Dr. Kumar', status: 'Occupied' },
  { room: 'Cabin 106', dept: 'Gastroenterology OPD', doctor: 'Dr. Alok Gupta', status: 'Available' },
]

const itDoctorTpa = [
  { doctor: 'Dr. Avanish Dubey', tpa: 'Star Health / Max Bupa', rate: 'Approved Cashless', limit: '₹5,00,000' },
  { doctor: 'Dr. Kumar', tpa: 'Care Health / HDFC Ergo', rate: 'Approved Cashless', limit: '₹7,50,000' },
  { doctor: 'Dr. Meera Verma', tpa: 'ICICI Lombard / Bajaj', rate: 'Approved Cashless', limit: '₹4,00,000' },
  { doctor: 'Dr. Rajesh Sharma', tpa: 'New India Assurance', rate: 'Approved Cashless', limit: '₹6,00,000' },
  { doctor: 'Dr. Sunita Rao', tpa: 'Aditya Birla Health', rate: 'Approved Cashless', limit: '₹5,50,000' },
]

const itWardManagement = [
  { ward: 'ICU Ward A', type: 'Critical Care', totalBeds: 12, dailyTariff: '₹8,500', status: 'Configured' },
  { ward: 'Deluxe Private Suite', type: 'Private Suite', totalBeds: 8, dailyTariff: '₹12,000', status: 'Configured' },
  { ward: 'General Medical Ward 2', type: 'General Ward', totalBeds: 24, dailyTariff: '₹2,500', status: 'Configured' },
  { ward: 'Surgical Care Ward 3C', type: 'Special Care', totalBeds: 16, dailyTariff: '₹4,800', status: 'Configured' },
  { ward: 'Pediatric Care Unit', type: 'Pediatric Ward', totalBeds: 12, dailyTariff: '₹3,500', status: 'Configured' },
]

const itInsuranceManagement = [
  { company: 'Star Health Insurance', code: 'TPA-STAR-01', PreAuthLimit: '₹5,00,000', status: 'Active TPA' },
  { company: 'Max Bupa Health Insurance', code: 'TPA-MAX-02', PreAuthLimit: '₹7,50,000', status: 'Active TPA' },
  { company: 'Care Health Insurance', code: 'TPA-CARE-03', PreAuthLimit: '₹6,00,000', status: 'Active TPA' },
  { company: 'HDFC ERGO General Insurance', code: 'TPA-HDFC-04', PreAuthLimit: '₹8,00,000', status: 'Active TPA' },
  { company: 'ICICI Lombard Health', code: 'TPA-ICICI-05', PreAuthLimit: '₹5,50,000', status: 'Active TPA' },
]

const itModuleManagement = [
  { module: 'Laboratory & LIS System', status: 'Enabled', license: 'Enterprise Unlimited' },
  { module: 'Billing & Accounts POS', status: 'Enabled', license: 'Enterprise Unlimited' },
  { module: 'Clinical EMR / EHR Portal', status: 'Enabled', license: 'Enterprise Unlimited' },
  { module: 'RIS & PACS Imaging Module', status: 'Enabled', license: 'Enterprise Unlimited' },
  { module: 'Pharmacy & Drug Stock', status: 'Enabled', license: 'Enterprise Unlimited' },
  { module: 'Staff Payroll & Shift Attendance', status: 'Enabled', license: 'Enterprise Unlimited' },
]

const itVitalMaster = [
  { vital: 'Blood Pressure (BP)', normalRange: '90/60 - 120/80 mmHg', unit: 'mmHg', status: 'Active' },
  { vital: 'Oxygen Saturation (SpO2)', normalRange: '95% - 100%', unit: '%', status: 'Active' },
  { vital: 'Heart Pulse Rate', normalRange: '60 - 100 bpm', unit: 'bpm', status: 'Active' },
  { vital: 'Body Temperature', normalRange: '97.8°F - 99.1°F', unit: '°F', status: 'Active' },
  { vital: 'Respiratory Rate', normalRange: '12 - 20 breaths/min', unit: 'bpm', status: 'Active' },
  { vital: 'Random Blood Sugar (RBS)', normalRange: '70 - 140 mg/dL', unit: 'mg/dL', status: 'Active' },
]

const itVitalCategory = [
  { category: 'Adult General Vitals', ageRange: '18 - 65 Yrs', status: 'Active' },
  { category: 'Pediatric Care Vitals', ageRange: '0 - 17 Yrs', status: 'Active' },
  { category: 'Neonatal ICU Vitals', ageRange: '0 - 28 Days', status: 'Active' },
  { category: 'Geriatric Care Vitals', ageRange: '65+ Yrs', status: 'Active' },
  { category: 'Emergency Triage Vitals', ageRange: 'All Ages', status: 'Active' },
]

const itDiagnosisMaster = [
  { icdCode: 'G43.909', name: 'Migraine, unspecified, not intractable', category: 'Neurology', status: 'Active' },
  { icdCode: 'I10', name: 'Essential Primary Hypertension', category: 'Cardiology', status: 'Active' },
  { icdCode: 'E11.9', name: 'Type 2 Diabetes Mellitus without complications', category: 'Endocrinology', status: 'Active' },
  { icdCode: 'J45.909', name: 'Unspecified Asthma, uncomplicated', category: 'Pulmonology', status: 'Active' },
  { icdCode: 'K21.9', name: 'Gastro-esophageal Reflux Disease without esophagitis', category: 'Gastroenterology', status: 'Active' },
]

const itDiseaseMaster = [
  { disease: 'Acute Upper Respiratory Infection', code: 'DIS-012', reportable: 'Yes', status: 'Tracked' },
  { disease: 'Type 2 Diabetes Mellitus', code: 'DIS-044', reportable: 'No', status: 'Tracked' },
  { disease: 'Dengue Hemorrhagic Fever', code: 'DIS-089', reportable: 'Yes', status: 'Tracked' },
  { disease: 'Essential Hypertension', code: 'DIS-102', reportable: 'No', status: 'Tracked' },
  { disease: 'Acute Gastroenteritis', code: 'DIS-145', reportable: 'Yes', status: 'Tracked' },
]

const itUserManagement = [
  { user: 'admin_sys', role: 'System SuperAdmin', email: 'admin@medcarehms.com', rbac: 'Full Access' },
  { user: 'dr_avanish', role: 'Consultant Physician', email: 'avanish@medcarehms.com', rbac: 'Doctor Portal' },
  { user: 'nurse_anjali', role: 'Ward Charge Nurse', email: 'anjali@medcarehms.com', rbac: 'Nurse Portal' },
  { user: 'cashier_sunil', role: 'Senior Billing Cashier', email: 'sunil@medcarehms.com', rbac: 'Billing Counter' },
  { user: 'lab_tech_rohan', role: 'Chief LIS Technologist', email: 'rohan@medcarehms.com', rbac: 'Lab Portal' },
]

const itHospitalConfig = {
  hospitalName: 'MedCare Super Specialty Hospital',
  licenseNo: 'HOSP-TX-2026-9812',
  gstin: '27AADC82258M1Z2',
  address: '1278 Health Parkway, Austin, TX 78701',
}

const itNurseAssignment = [
  { nurse: 'Nurse Anjali Sharma', shift: 'Day Shift (8 AM - 4 PM)', ward: 'ICU Ward A', status: 'Assigned' },
  { nurse: 'Nurse Priya Nair', shift: 'Night Shift (8 PM - 8 AM)', ward: 'General Ward 2', status: 'Assigned' },
  { nurse: 'Nurse Sunita Patel', shift: 'Evening Shift (4 PM - 12 AM)', ward: 'Deluxe Suite B', status: 'Assigned' },
  { nurse: 'Nurse Kavita Verma', shift: 'Day Shift (8 AM - 4 PM)', ward: 'Pediatric Unit', status: 'Assigned' },
]

const itProMaster = [
  { pro: 'Rajesh Varma (PRO)', area: 'VIP Patient Desk', contact: '+91 98765-00112', status: 'Active' },
  { pro: 'Meena Saxena (PRO)', area: 'OPD Reception Desk', contact: '+91 98123-99001', status: 'Active' },
  { pro: 'Amitabh Sen (PRO)', area: 'IPD Admission Helpdesk', contact: '+91 97654-11223', status: 'Active' },
]

const itReferralDoctor = [
  { doctor: 'Dr. S. K. Mehta (Ref Clinic)', share: '10% OPD Ref', mobile: '+91 99123-44556', status: 'Empaneled' },
  { doctor: 'Dr. R. P. Gupta (City Diagnostic)', share: '12% Lab Ref', mobile: '+91 98765-11223', status: 'Empaneled' },
  { doctor: 'Dr. Neha Deshmukh (Polyclinic)', share: '8% OPD Ref', mobile: '+91 97112-88776', status: 'Empaneled' },
]

const itTreatmentMaster = [
  { treatment: 'Laparoscopic Appendectomy', code: 'TRT-8801', dept: 'General Surgery', baseCost: '₹45,000' },
  { treatment: 'Coronary Angiography', code: 'TRT-8802', dept: 'Cardiology', baseCost: '₹28,000' },
  { treatment: 'Total Knee Replacement (TKR)', code: 'TRT-8803', dept: 'Orthopedics', baseCost: '₹1,85,000' },
  { treatment: 'Cataract Phacoemulsification', code: 'TRT-8804', dept: 'Ophthalmology', baseCost: '₹32,000' },
  { treatment: 'Normal Delivery Care Package', code: 'TRT-8805', dept: 'Obstetrics', baseCost: '₹35,000' },
]

const itBillingThreshold = [
  { category: 'General Cash Patient', maxDiscount: '10%', maxCredit: '₹5,000', status: 'Enforced' },
  { category: 'Empaneled TPA Corporate', maxDiscount: '15%', maxCredit: '₹50,000', status: 'Enforced' },
  { category: 'Senior Citizen Privilege', maxDiscount: '20%', maxCredit: '₹10,000', status: 'Enforced' },
  { category: 'Hospital Employee Family', maxDiscount: '25%', maxCredit: '₹25,000', status: 'Enforced' },
]

const itBedTpa = [
  { roomType: 'Deluxe Suite', rackRate: '₹12,000/day', tpaCap: '₹8,500/day', plan: 'Star Health / Max Bupa' },
  { roomType: 'Semi Deluxe', rackRate: '₹7,500/day', tpaCap: '₹5,500/day', plan: 'Care Health / HDFC Ergo' },
  { roomType: 'General Ward', rackRate: '₹2,500/day', tpaCap: '₹2,000/day', plan: 'ICICI Lombard' },
  { roomType: 'ICU / NICU', rackRate: '₹15,000/day', tpaCap: '₹12,000/day', plan: 'Aditya Birla Health' },
]

// ── IPD SHOWCASE DATA ──
const ipdAdmissions = [
  { id: 'IPD-2026-1041', patient: 'Ramesh Verma', ward: 'General Ward', bed: 'BED-04', doctor: 'Dr. Avanish Dubey', dept: 'Neurology', status: 'Admitted' },
  { id: 'IPD-2026-1039', patient: 'Sunita Devi', ward: 'Semi Deluxe', bed: 'BED-12', doctor: 'Dr. Kumar', dept: 'Cardiology', status: 'Admitted' },
  { id: 'IPD-2026-1037', patient: 'Mohan Lal', ward: 'ICU', bed: 'ICU-02', doctor: 'Dr. Meera Verma', dept: 'Pediatrics', status: 'Critical' },
  { id: 'IPD-2026-1034', patient: 'Priya Singh', ward: 'Deluxe Room', bed: 'DLX-03', doctor: 'Dr. Rajesh Sharma', dept: 'Orthopedics', status: 'Stable' },
  { id: 'IPD-2026-1031', patient: 'Anita Gupta', ward: 'A/C Room', bed: 'AC-07', doctor: 'Dr. Sunita Rao', dept: 'Gynecology', status: 'Admitted' },
]

const ipdBedMatrix = [
  { ward: 'General Ward', total: 40, occupied: 34, available: 6, icu: false },
  { ward: 'Semi Deluxe', total: 20, occupied: 16, available: 4, icu: false },
  { ward: 'Deluxe Room', total: 15, occupied: 11, available: 4, icu: false },
  { ward: 'A/C Room', total: 10, occupied: 8, available: 2, icu: false },
  { ward: 'ICU / NICU', total: 12, occupied: 9, available: 3, icu: true },
]

const ipdNurseTasks = [
  { task: 'Vitals Check', patient: 'Ramesh Verma (BED-04)', time: '08:00 AM', status: 'Done' },
  { task: 'IV Drip Change', patient: 'Mohan Lal (ICU-02)', time: '09:30 AM', status: 'Done' },
  { task: 'Medication Round', patient: 'Sunita Devi (BED-12)', time: '11:00 AM', status: 'Pending' },
  { task: 'Doctor Round Note', patient: 'Priya Singh (DLX-03)', time: '12:00 PM', status: 'Pending' },
  { task: 'Discharge Summary', patient: 'Anita Gupta (AC-07)', time: '02:00 PM', status: 'Pending' },
]

const ipdAccountingData = [
  { label: 'Advance Collected', amount: '₹1,45,000', type: 'credit' },
  { label: 'Services Billed', amount: '₹3,82,500', type: 'credit' },
  { label: 'TPA Claims Pending', amount: '₹98,000', type: 'pending' },
  { label: 'Refunds Issued', amount: '₹12,200', type: 'debit' },
  { label: 'Net Revenue (IPD)', amount: '₹5,27,500', type: 'net' },
]

// ── REST OF CORE MODULES ──
const restModules = [
  {
    icon: 'bed',
    title: 'IPD (Inpatient Dept)',
    tagline: 'Ward, Bed Allocation & Discharge Workflow',
    desc: 'End-to-end inpatient care management including bed allocation, ward management, treatment tracking, nursing chart workflows, discharge summaries, and real-time bed availability dashboards.',
    badge: 'Real-Time Bed Matrix',
    color: '#00685e',
    features: ['Visual Bed Matrix Map', 'Nursing Station Workflow', 'OT & Surgical Scheduling', 'Discharge Summary Builder'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTX_XuGv-iLY9CPwfMTka3uz-lZPGhGmU4AcVHPu93-aoe_Dom4JjK7tFRC1X_Lt4OyhhUL6Vzy3YsW1nOu6O7vFFDS5yZIyzqy4_ntzLj8IGvhwBMZdcCsplG432I9X-BAPtn8CxmVnWt6UckA88h_pzZm-szEG6BvsFKF01yTlmsXnkIdzokBaYXvCEqcxJ1p90PQCj22z8CuhtuISHx6L4e7aLupNa4KEs8WWBI_l7IrZbAZFTd',
  },
]

// ── ADDITIONAL SPECIALIZED CONTAINERS ──
const additionalContainers = [
  { icon: 'event_available', title: 'OPD & Scheduling', desc: 'Outpatient queue management, doctor appointment booking, and automated SMS reminders.' },
  { icon: 'medication', title: 'Pharmacy & Stock', desc: 'Real-time drug inventory, batch tracking, expiry alerts, and POS billing integration.' },
  { icon: 'radiology', title: 'RIS & PACS Imaging', desc: 'High-speed DICOM imaging storage, diagnostic viewing, and radiology reporting.' },
  { icon: 'groups', title: 'Staff & Payroll', desc: 'Shift duty roistering, biometric attendance, credential tracking, and HR payroll.' },
  { icon: 'inventory_2', title: 'Central Supply (CSSD)', desc: 'Sterilization tracking, equipment maintenance, and consumable supply management.' },
  { icon: 'video_chat', title: 'Telehealth Portal', desc: 'Virtual video consultations, remote patient monitoring, and digital prescription issuance.' },
]

export default function Modules() {
  const [billingActiveTab, setBillingActiveTab] = useState(0)
  const [clinicalActiveTab, setClinicalActiveTab] = useState(0)
  const [reportsActiveTab, setReportsActiveTab] = useState(0)
  const [ipdActiveTab, setIpdActiveTab] = useState(0)
  
  // Auto-rotating state for IT Administration (0 to 18 - ALL 19 FIELDS FROM USER SCREENSHOT!)
  const [itActiveTab, setItActiveTab] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setBillingActiveTab((prev) => (prev + 1) % 6), 5000)
    return () => clearInterval(timer)
  }, [billingActiveTab])

  useEffect(() => {
    const timer = setInterval(() => setClinicalActiveTab((prev) => (prev + 1) % 13), 5000)
    return () => clearInterval(timer)
  }, [clinicalActiveTab])

  useEffect(() => {
    const timer = setInterval(() => setReportsActiveTab((prev) => (prev + 1) % 12), 5000)
    return () => clearInterval(timer)
  }, [reportsActiveTab])

  useEffect(() => {
    const timer = setInterval(() => setItActiveTab((prev) => (prev + 1) % 19), 5000)
    return () => clearInterval(timer)
  }, [itActiveTab])

  const billingTabs = [
    { id: 0, key: 'groups', label: 'Account Groups', icon: 'folder' },
    { id: 1, key: 'ledger', label: 'Ledger Master', icon: 'menu_book' },
    { id: 2, key: 'service', label: 'Service Master', icon: 'medical_services' },
    { id: 3, key: 'gst', label: '% GST Master', icon: 'percent' },
    { id: 4, key: 'vouchertype', label: 'Voucher Type Master', icon: 'receipt' },
    { id: 5, key: 'voucher', label: 'Voucher Master', icon: 'confirmation_number' },
  ]

  const clinicalTabs = [
    { id: 0, key: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 1, key: 'patients', label: 'Patients', icon: 'group' },
    { id: 2, key: 'appointments', label: 'Appointments', icon: 'calendar_month' },
    { id: 3, key: 'collections', label: 'Collections', icon: 'payments' },
    { id: 4, key: 'emergency', label: 'Emergency', icon: 'emergency' },
    { id: 5, key: 'opd', label: 'OPD', icon: 'add_box' },
    { id: 6, key: 'ipd', label: 'IPD Admission', icon: 'bed' },
    { id: 7, key: 'nurse', label: 'Nurse Dashboard', icon: 'health_and_safety' },
    { id: 8, key: 'doctor', label: 'Doctor Dashboard', icon: 'clinical_notes' },
    { id: 9, key: 'billing', label: 'Service Billing', icon: 'receipt_long' },
    { id: 10, key: 'waiting', label: 'Waiting Screen', icon: 'hourglass_top' },
    { id: 11, key: 'refunds', label: 'Cancel And Refunds', icon: 'currency_rupee' },
    { id: 12, key: 'rapid', label: 'Rapid Consultation', icon: 'medical_services' },
  ]

  useEffect(() => {
    const timer = setInterval(() => setIpdActiveTab((prev) => (prev + 1) % 2), 5000)
    return () => clearInterval(timer)
  }, [ipdActiveTab])

  const ipdTabs = [
    { id: 0, key: 'nursedashboard', label: 'Nurse Dashboard' },
    { id: 1, key: 'accounting', label: 'Accounting' },
  ]

  const reportsTabs = [
    { id: 0, key: 'doctorperf', label: 'Doctor Consultation Performance', icon: 'analytics' },
    { id: 1, key: 'opdreg', label: 'OPD Registration Summary', icon: 'assignment' },
    { id: 2, key: 'opdappt', label: 'OPD Appointment Summary', icon: 'event_note' },
    { id: 3, key: 'userwise', label: 'Userwise Collection', icon: 'person' },
    { id: 4, key: 'deptwise', label: 'Departmentwise Collection', icon: 'domain' },
    { id: 5, key: 'billwise', label: 'Billwise Collection', icon: 'receipt_long' },
    { id: 6, key: 'paymode', label: 'Payment Mode Collection', icon: 'credit_card' },
    { id: 7, key: 'dueamt', label: 'Due Amount', icon: 'hourglass_empty' },
    { id: 8, key: 'refundrpt', label: 'Refund Report', icon: 'price_change' },
    { id: 9, key: 'discountrpt', label: 'Discount Report', icon: 'sell' },
    { id: 10, key: 'cancelbills', label: 'Cancelled Bills', icon: 'cancel' },
    { id: 11, key: 'billreg', label: 'Bill Register', icon: 'auto_stories' },
  ]

  // ALL 19 IT ADMINISTRATION SUB-MODULE FIELDS FROM USER SCREENSHOT
  const itTabs = [
    { id: 0, key: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 1, key: 'drschedule', label: 'Doctor OPD Schedule', icon: 'schedule' },
    { id: 2, key: 'opdrooms', label: 'OPD Room Details', icon: 'door_front' },
    { id: 3, key: 'drtpa', label: 'Doctor TPA', icon: 'badge' },
    { id: 4, key: 'wardmgmt', label: 'Ward Management', icon: 'bed' },
    { id: 5, key: 'insmgmt', label: 'Insurance Management', icon: 'verified_user' },
    { id: 6, key: 'modulemgmt', label: 'Module Management', icon: 'settings' },
    { id: 7, key: 'vitalmaster', label: 'Vital Master', icon: 'monitor_heart' },
    { id: 8, key: 'vitalcat', label: 'Vital Category', icon: 'category' },
    { id: 9, key: 'diagnosis', label: 'Diagnosis', icon: 'medical_services' },
    { id: 10, key: 'disease', label: 'Disease', icon: 'sick' },
    { id: 11, key: 'usermgmt', label: 'User Management', icon: 'manage_accounts' },
    { id: 12, key: 'hospconfig', label: 'Hospital Configuration', icon: 'domain_add' },
    { id: 13, key: 'nurseassign', label: 'Nurse Assignment', icon: 'assignment_ind' },
    { id: 14, key: 'promaster', label: 'PRO Master', icon: 'support_agent' },
    { id: 15, key: 'refdrmaster', label: 'Referral Doctor Master', icon: 'group_add' },
    { id: 16, key: 'treatmentmaster', label: 'Treatment Master', icon: 'healing' },
    { id: 17, key: 'billingthresh', label: 'Billing Threshold Config', icon: 'tune' },
    { id: 18, key: 'bedtpa', label: 'Bed TPA', icon: 'hotel' },
  ]

  return (
    <motion.div {...pageTransition}>
      <main className="site-wrapper pt-24 sm:pt-28 md:pt-32 2xl:pt-40 pb-16 sm:pb-20 2xl:pb-28">

        {/* Header */}
        <motion.header className="max-w-3xl 2xl:max-w-5xl mb-10 sm:mb-14 2xl:mb-20"
          initial="hidden" animate="visible" variants={stagger}>
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#afecde]/80 border border-[#00685e]/20 text-[#326c62] text-xs sm:text-sm font-semibold mb-4 sm:mb-5 shadow-sm"
            style={{ fontFamily: "'Inter', sans-serif" }} variants={fadeUp}>
            <span className="material-symbols-outlined text-base sm:text-lg text-[#00685e]">apps</span>
            <span>Enterprise Modular Platform</span>
          </motion.div>
          <motion.h1 className="heading-hero text-[#00685e] mb-4 sm:mb-6 leading-tight" variants={fadeUp}>
            Comprehensive Hospital Management Ecosystem
          </motion.h1>
          <motion.p className="text-description text-[#3d4947] text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8" variants={fadeUp}>
            Empower every department with specialized, interconnected clinical and administrative software modules. Explore live interactive dashboards for <strong>Clinical EMR</strong>, <strong>19 IT Administration Masters</strong>, <strong>Analytics & Reports</strong>, <strong>IPD Inpatient Suite</strong>, <strong>Billing & Accounts</strong>, and <strong>Laboratory LIS</strong> — built to scale from specialty clinics to multi-chain hospital networks.
          </motion.p>

          {/* Quick Feature Pills Bar */}
          <motion.div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 sm:py-0 sm:flex-wrap" variants={fadeUp}>
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#bcc9c6]/40 text-xs font-bold text-[#00685e] shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">stethoscope</span> Clinical EMR
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#bcc9c6]/40 text-xs font-bold text-[#00685e] shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span> 18 IT Masters
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#bcc9c6]/40 text-xs font-bold text-[#00685e] shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">analytics</span> Analytics & BI
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#bcc9c6]/40 text-xs font-bold text-[#00685e] shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">hotel</span> IPD Bed Matrix
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#bcc9c6]/40 text-xs font-bold text-[#00685e] shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">receipt_long</span> Billing & POS
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#bcc9c6]/40 text-xs font-bold text-[#00685e] shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">biotech</span> Laboratory LIS
            </div>
          </motion.div>
        </motion.header>

        {/* ── 1. CLINICAL SHOWCASE ── */}
        <motion.div
          className="card-frosted rounded-2xl sm:rounded-3xl p-5 sm:p-6 2xl:p-10 mb-8 sm:mb-10 2xl:mb-14 shadow-md border border-[#bcc9c6]/40 relative overflow-hidden"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}
        >
          {/* Background Image Overlay - Enhanced High Visibility */}
          <img 
            src="/images/clinical_bg_soft.png" 
            alt="Clinical background" 
            className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none mix-blend-multiply transition-opacity duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#effcfe]/45 via-white/20 to-[#effcfe]/45 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 items-stretch relative z-10">
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4 2xl:space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3 2xl:mb-4">
                  <div className="w-12 h-12 2xl:w-14 2xl:h-14 module-badge-icon rounded-xl 2xl:rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#00685e] text-2xl 2xl:text-3xl">clinical_notes</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full bg-[#afecde] text-[#326c62] text-[11px] 2xl:text-xs font-semibold">
                    13 Clinical Modules Integrated
                  </span>
                </div>

                <div className="text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-[#00685e] mb-1">EMR, EHR & TREATMENT DECISION SUPPORT</div>
                <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#121d1f] mb-2 sm:mb-3">Clinical</h2>
                <p className="text-xs sm:text-sm 2xl:text-base text-[#3d4947] leading-relaxed mb-4 2xl:mb-6 bg-white/25 backdrop-blur-sm p-2.5 sm:p-3 2xl:p-4 rounded-xl border border-white/30">
                  Full-spectrum clinical management — patient registration, EHR, OPD, IPD admissions, nurse/doctor dashboards, emergency & rapid consultations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 2xl:gap-3 mb-4 2xl:mb-6">
                  {['Dashboard & Patients EMR', 'Appointments & OPD Queue', 'Collections & Billing', 'Emergency & Triage Bay', 'IPD Admission & Bed Matrix', 'Nurse & Doctor Dashboards', 'Waiting Screen Display', 'Rapid Consultations & Refunds'].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-sm text-[#121d1f] font-medium">
                      <span className="material-symbols-outlined text-[#00685e] text-sm 2xl:text-base">check_circle</span>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <Link to="/modules/clinical" className="inline-flex items-center gap-2 bg-[#2d685e] text-white px-5 py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs sm:text-sm 2xl:text-base font-bold shadow-md hover:bg-[#00685e] transition-all cursor-pointer">
                  Explore Clinical Features <span className="material-symbols-outlined text-sm 2xl:text-base">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm rounded-2xl border border-[#bcc9c6]/40 shadow-sm overflow-hidden flex flex-col justify-between min-h-[420px] sm:h-[400px] 2xl:h-[480px] 3xl:h-[500px] relative z-10">
              <div className="bg-[#effcfe] px-4 py-3 border-b border-[#bcc9c6]/30 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
                <div className="flex items-center gap-2 font-bold text-[#00685e]">Clinical Care Master (13 Sub-Modules)</div>
                <div className="text-[10px] text-[#6d7a77]">Auto-changes 5s (13 views)</div>
              </div>

              <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
                <div className="w-full sm:w-52 bg-[#008378] text-white p-2 flex flex-row sm:flex-col overflow-x-auto sm:overflow-y-auto no-scrollbar sm:custom-scrollbar gap-1 shrink-0 text-xs">
                  {clinicalTabs.map((tab) => (
                    <button key={tab.id} onClick={() => setClinicalActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between p-1.5 px-2 rounded-lg text-left transition-all ${
                        clinicalActiveTab === tab.id ? 'bg-[#00685e] text-white font-bold' : 'hover:bg-white/10 text-white/90'
                      }`}>
                      <span className="truncate text-[11px]">{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex-1 p-3 overflow-x-auto overflow-y-auto flex flex-col justify-between">
                  {clinicalActiveTab === 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#00685e] mb-2">Clinical Executive Dashboard</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-[#eaf6f8] p-2 rounded-xl"><div className="text-[10px]">TODAY OPD</div><div className="text-lg font-bold text-[#00685e]">{clinicalDashboardData.opdToday}</div></div>
                        <div className="bg-[#eaf6f8] p-2 rounded-xl"><div className="text-[10px]">IPD BEDS</div><div className="text-lg font-bold text-[#008378]">{clinicalDashboardData.ipdAdmitted}</div></div>
                      </div>
                    </div>
                  )}

                  {clinicalActiveTab === 1 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#00685e] mb-2">Patient EMR Registry</h4>
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead><tr className="border-b text-[#00685e]"><th className="py-1">ID</th><th className="py-1">Name</th><th className="py-1">Mobile</th></tr></thead>
                        <tbody>{clinicalPatients.map((r) => (<tr key={r.id}><td className="py-1 font-bold text-[#00685e]">{r.id}</td><td className="py-1 font-semibold">{r.name}</td><td className="py-1">{r.mobile}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}

                  {clinicalActiveTab === 2 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#00685e] mb-2">Appointments Queue</h4>
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead><tr className="border-b text-[#00685e]"><th className="py-1">Token</th><th className="py-1">Patient</th><th className="py-1">Status</th></tr></thead>
                        <tbody>{clinicalAppointments.map((r) => (<tr key={r.token}><td className="py-1 font-bold text-[#00685e]">{r.token}</td><td className="py-1 font-semibold">{r.patient}</td><td className="py-1">• {r.status}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}

                  {clinicalActiveTab === 3 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#00685e] mb-2">Collections Summary</h4>
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead><tr className="border-b text-[#00685e]"><th className="py-1">Category</th><th className="py-1">Amount</th></tr></thead>
                        <tbody>{clinicalCollections.map((r) => (<tr key={r.ref}><td className="py-1 font-semibold">{r.category}</td><td className="py-1 font-bold text-[#008378]">{r.amount}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}

                  {/* FIELD 4: EMERGENCY */}
                  {clinicalActiveTab === 4 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">emergency</span> Emergency ER Triage
                        </h4>
                        <div className="space-y-2">
                          {clinicalEmergency.map((e) => (
                            <div key={e.bay} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <div className="font-bold text-[#121d1f] flex items-center gap-1.5">
                                <span>🚨</span>
                                <span>{e.bay}</span>
                              </div>
                              <span className="font-semibold text-[#00685e]">{e.triage}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">24/7 ER Triage Protocol Station</div>
                    </div>
                  )}

                  {/* FIELD 5: OPD */}
                  {clinicalActiveTab === 5 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">add_box</span> OPD Department Status
                        </h4>
                        <div className="space-y-2">
                          {clinicalOpdData.map((o) => (
                            <div key={o.doctor} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <div className="font-semibold text-[#121d1f]">👨‍⚕️ {o.doctor}</div>
                              <span className="font-bold text-[#00685e]">Waiting: {o.waiting}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Outpatient Department Active Doctor Consultations</div>
                    </div>
                  )}

                  {/* FIELD 6: IPD ADMISSION */}
                  {clinicalActiveTab === 6 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">bed</span> IPD Ward Bed Matrix
                        </h4>
                        <div className="space-y-2">
                          {clinicalIpdData.map((i) => (
                            <div key={i.ward} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <div className="font-bold text-[#121d1f]">🛏️ {i.ward}</div>
                              <span className="font-semibold text-[#00685e]">Occupied: {i.occupied}/{i.totalBeds}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Live Inpatient Ward & Bed Matrix Map</div>
                    </div>
                  )}

                  {/* FIELD 7: NURSE DASHBOARD */}
                  {clinicalActiveTab === 7 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">health_and_safety</span> Nurse Station Workflows
                        </h4>
                        <div className="space-y-2">
                          {clinicalNurseDashboard.map((n) => (
                            <div key={n.ward} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <div className="font-semibold text-[#121d1f]">🏥 {n.ward}</div>
                              <span className="font-bold text-[#00685e]">{n.patient}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Real-time Nursing Medication & Charting Workflow</div>
                    </div>
                  )}

                  {/* FIELD 8: DOCTOR DASHBOARD */}
                  {clinicalActiveTab === 8 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">clinical_notes</span> Doctor Consultation Workspace
                        </h4>
                        <div className="p-3 bg-[#eaf6f8] rounded-2xl text-[11px] space-y-1">
                          <div className="font-bold text-[#121d1f]">{clinicalDoctorDashboard.currentPatient}</div>
                          <div className="text-[10px] text-[#3d4947]">Complaint: {clinicalDoctorDashboard.complaint}</div>
                          <div className="text-[#00685e] font-bold">BP: {clinicalDoctorDashboard.vitals.bp}</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Doctor OPD Consultation Workspace</div>
                    </div>
                  )}

                  {/* FIELD 9: SERVICE BILLING */}
                  {clinicalActiveTab === 9 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">receipt_long</span> Service Billing Charges
                        </h4>
                        <table className="w-full text-left border-collapse text-[11px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          <thead>
                            <tr className="border-b border-[#bcc9c6]/30 text-[#00685e] font-bold uppercase">
                              <th className="py-1.5 px-1">Invoice</th>
                              <th className="py-1.5 px-1">Patient</th>
                              <th className="py-1.5 px-1">Total Amount</th>
                              <th className="py-1.5 px-1">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#bcc9c6]/20">
                            {clinicalServiceBilling.map((b) => (
                              <tr key={b.invoice} className="hover:bg-[#eaf6f8]/50 transition-colors">
                                <td className="py-1.5 px-1 font-bold text-[#00685e]">{b.invoice}</td>
                                <td className="py-1.5 px-1 font-semibold text-[#121d1f]">{b.patient}</td>
                                <td className="py-1.5 px-1 font-bold text-[#008378]">{b.total}</td>
                                <td className="py-1.5 px-1">
                                  <span className="px-2 py-0.5 rounded-full bg-[#afecde] text-[#326c62] font-bold text-[9px]">
                                    • Billed
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Itemized Service Billing & Charge Sheets</div>
                    </div>
                  )}

                  {/* FIELD 10: WAITING SCREEN */}
                  {clinicalActiveTab === 10 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">hourglass_top</span> Patient Waiting Screen Monitor
                        </h4>
                        <div className="space-y-2">
                          {clinicalWaitingScreen.map((w) => (
                            <div key={w.token} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <div className="font-bold text-[#121d1f]">{w.token} - {w.patient}</div>
                              <span className="px-2.5 py-0.5 bg-[#afecde] text-[#326c62] rounded-full text-[9px] font-bold">• {w.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Public OPD Waiting Monitor Display</div>
                    </div>
                  )}

                  {/* FIELD 11: CANCEL AND REFUNDS */}
                  {clinicalActiveTab === 11 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">currency_rupee</span> Cancel & Refund Logs
                        </h4>
                        <table className="w-full text-left border-collapse text-[11px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          <thead>
                            <tr className="border-b border-[#bcc9c6]/30 text-[#00685e] font-bold uppercase">
                              <th className="py-1.5 px-1">Ref ID</th>
                              <th className="py-1.5 px-1">Patient</th>
                              <th className="py-1.5 px-1">Refund Amount</th>
                              <th className="py-1.5 px-1">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#bcc9c6]/20">
                            {clinicalRefunds.map((r) => (
                              <tr key={r.ref} className="hover:bg-[#eaf6f8]/50 transition-colors">
                                <td className="py-1.5 px-1 font-bold text-[#00685e]">{r.ref}</td>
                                <td className="py-1.5 px-1 font-semibold text-[#121d1f]">{r.patient}</td>
                                <td className="py-1.5 px-1 font-bold text-[#008378]">{r.amount}</td>
                                <td className="py-1.5 px-1">
                                  <span className="px-2 py-0.5 rounded-full bg-[#afecde] text-[#326c62] font-bold text-[9px]">
                                    • Processed
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Audit-Approved Cancellation & Refund Management</div>
                    </div>
                  )}

                  {/* FIELD 12: RAPID CONSULTATION */}
                  {clinicalActiveTab === 12 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">medical_services</span> Rapid Consultation Token
                        </h4>
                        <div className="p-3.5 bg-[#eaf6f8] rounded-2xl text-[11px] space-y-1">
                          <div className="font-bold text-[#00685e]">{clinicalRapidData.opdToken}</div>
                          <div className="font-semibold text-[#121d1f]">Patient: {clinicalRapidData.patient}</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Express Check-In OPD Consultation System</div>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-1 pt-2 border-t border-[#bcc9c6]/20 shrink-0">
                    {clinicalTabs.map((t) => (
                      <button key={t.id} onClick={() => setClinicalActiveTab(t.id)}
                        className={`h-1.5 rounded-full transition-all ${clinicalActiveTab === t.id ? 'w-5 bg-[#00685e]' : 'w-1.5 bg-[#bcc9c6]'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 2. IT ADMINISTRATION SHOWCASE ── */}
        <motion.div
          className="card-frosted rounded-2xl sm:rounded-3xl p-5 sm:p-6 2xl:p-10 mb-8 sm:mb-10 2xl:mb-14 shadow-md border border-[#bcc9c6]/40 relative overflow-hidden"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}
        >
          {/* Background Image Overlay - Enhanced High Visibility (Mirrored) */}
          <img 
            src="/images/it_admin_bg_soft.png" 
            alt="IT Administration background" 
            className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none mix-blend-multiply transition-opacity duration-700 -scale-x-100" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#effcfe]/45 via-white/20 to-[#effcfe]/45 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 items-stretch relative z-10">
            
            {/* Left side: IT Admin Details */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4 2xl:space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3 2xl:mb-4">
                  <div className="w-12 h-12 2xl:w-14 2xl:h-14 module-badge-icon rounded-xl 2xl:rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#00685e] text-2xl 2xl:text-3xl">admin_panel_settings</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full bg-[#afecde] text-[#326c62] text-[11px] 2xl:text-xs font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    18 IT Governance Modules
                  </span>
                </div>

                <div className="text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-[#00685e] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  GOVERNANCE, RBAC & SECURITY MONITORING
                </div>
                <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#121d1f] mb-2 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  IT Administration
                </h2>
                <p className="text-xs sm:text-sm 2xl:text-base text-[#3d4947] leading-relaxed mb-4 2xl:mb-6 bg-white/25 backdrop-blur-sm p-2.5 sm:p-3 2xl:p-4 rounded-xl border border-white/30" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Centralized system configuration — Doctor Schedules, OPD Rooms, TPA Empanelments, Wards, Insurance, Vital Masters, Diagnosis ICD-10, Disease Tracking, User RBAC Roles, Hospital Config, Nurse & PRO Masters, Referral Doctors, Treatments & Billing Thresholds.
                </p>

                {/* Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 2xl:gap-3 mb-4 2xl:mb-6">
                  {[
                    'User Management & RBAC Roles',
                    'Doctor OPD Schedules & Room Details',
                    'TPA & Insurance Management',
                    'Vital Masters & Diagnosis ICD-10',
                    'Ward & Treatment Tariffs Config',
                    'Hospital Config & Print Templates',
                    'PRO & Referral Doctor Masters',
                    'Billing Threshold & Discount Limits',
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-sm text-[#121d1f] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="material-symbols-outlined text-[#00685e] text-sm 2xl:text-base">check_circle</span>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-1">
                <Link 
                  to="/modules/it-admin"
                  className="inline-flex items-center gap-2 bg-[#326c62] text-white px-5 py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs sm:text-sm 2xl:text-base font-bold shadow-md hover:bg-[#00685e] transition-all"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Explore IT Administration
                  <span className="material-symbols-outlined text-sm 2xl:text-base">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right Side Card */}
            <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm rounded-2xl border border-[#bcc9c6]/40 shadow-sm overflow-hidden flex flex-col justify-between min-h-[420px] sm:h-[400px] 2xl:h-[480px] 3xl:h-[500px] relative z-10">
              
              {/* Card Header */}
              <div className="bg-[#effcfe] px-4 py-3 border-b border-[#bcc9c6]/30 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0" style={{ fontFamily: "'Inter', sans-serif" }}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#00685e]">laptop</span>
                  <span className="font-bold text-[#00685e]">IT Administration Master (19 Sub-Modules)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#6d7a77]">Auto-changes 5s (19 views)</span>
                  <span className="w-2 h-2 rounded-full bg-[#00685e] animate-pulse"></span>
                </div>
              </div>

              {/* App Body Layout */}
              <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
                
                {/* Left Sidebar Menu */}
                <div className="w-full sm:w-56 bg-[#008378] text-white p-2 flex flex-row sm:flex-col overflow-x-auto sm:overflow-y-auto no-scrollbar sm:custom-scrollbar gap-1 shrink-0 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <div className="font-bold text-white/70 text-[9px] uppercase tracking-wider mb-1 px-2">
                    IT Admin Menu (19 Fields)
                  </div>
                  {itTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setItActiveTab(tab.id)}
                      className={`w-full flex items-center p-1.5 px-2 rounded-lg text-left transition-all ${
                        itActiveTab === tab.id
                          ? 'bg-[#00685e] text-white font-bold shadow-sm'
                          : 'hover:bg-white/10 text-white/90'
                      }`}
                    >
                      <span className="truncate text-[11px]">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Right Interactive View Container for ALL 19 IT ADMIN VIEWS */}
                <div className="flex-1 p-3 overflow-x-auto overflow-y-auto flex flex-col justify-between">
                  
                  {/* FIELD 0: DASHBOARD */}
                  {itActiveTab === 0 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">grid_view</span> IT Infrastructure Dashboard
                        </h4>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="bg-[#eaf6f8] p-2.5 rounded-xl border border-[#bcc9c6]/30">
                            <div className="text-[10px] text-[#6d7a77]">ACTIVE USER SESSIONS</div>
                            <div className="text-lg font-bold text-[#00685e]">{itDashboardData.activeUsers} Users Online</div>
                          </div>
                          <div className="bg-[#eaf6f8] p-2.5 rounded-xl border border-[#bcc9c6]/30">
                            <div className="text-[10px] text-[#6d7a77]">SYSTEM UPTIME</div>
                            <div className="text-lg font-bold text-[#008378]">{itDashboardData.systemUptime}</div>
                          </div>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-[#bcc9c6]/30 text-[11px]">
                          Encrypted Cloud Backups: <strong className="text-[#00685e]">{itDashboardData.encryptedBackups}</strong> | Configured Modules: <strong>18 Active</strong>
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Centralized Governance & Audit Tracking</div>
                    </div>
                  )}

                  {/* FIELD 1: DOCTOR OPD SCHEDULE */}
                  {itActiveTab === 1 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">schedule</span> Doctor OPD Roster Schedule
                        </h4>
                        <table className="w-full text-left text-[11px]">
                          <thead><tr className="border-b text-[#00685e] uppercase"><th className="py-1">Doctor</th><th className="py-1">Shift Timing</th><th className="py-1">Cabin</th></tr></thead>
                          <tbody>
                            {itDoctorSchedule.map((r) => (
                              <tr key={r.doctor}>
                                <td className="py-1.5 px-1 font-semibold">{r.doctor} <div className="text-[9px] text-[#6d7a77]">{r.dept}</div></td>
                                <td className="py-1.5 px-1 text-[#3d4947]">{r.shift}</td>
                                <td className="py-1.5 px-1 font-bold text-[#00685e]">{r.cabin}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">OPD Shift & Roster Master Settings</div>
                    </div>
                  )}

                  {/* FIELD 2: OPD ROOM DETAILS */}
                  {itActiveTab === 2 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">door_front</span> OPD Cabin & Room Details
                        </h4>
                        <div className="space-y-1.5">
                          {itOpdRooms.map((r) => (
                            <div key={r.room} className="p-2 bg-[#eaf6f8] rounded-xl flex justify-between text-[11px]">
                              <div>
                                <span className="font-bold text-[#121d1f]">🚪 {r.room}</span> ({r.dept})
                                <div className="text-[10px] text-[#6d7a77]">Assigned: {r.doctor}</div>
                              </div>
                              <span className="px-2 py-0.5 bg-[#afecde] text-[#326c62] rounded text-[9px] font-bold h-fit">{r.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Consultation Cabin Master Allocation</div>
                    </div>
                  )}

                  {/* FIELD 3: DOCTOR TPA */}
                  {itActiveTab === 3 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">badge</span> Doctor TPA Insurance Rates
                        </h4>
                        {itDoctorTpa.map((r) => (
                          <div key={r.doctor} className="p-2 bg-white rounded-xl border border-[#bcc9c6]/30 mb-1.5 text-[11px]">
                            <div className="font-bold text-[#121d1f]">👨‍⚕️ {r.doctor}</div>
                            <div className="text-[10px] text-[#3d4947]">Empaneled TPAs: <strong>{r.tpa}</strong></div>
                            <div className="text-[10px] text-[#00685e] font-bold">Max Pre-Auth Limit: {r.limit}</div>
                          </div>
                        ))}
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">TPA Cashless Pre-Auth Doctor Configuration</div>
                    </div>
                  )}

                  {/* FIELD 4: WARD MANAGEMENT */}
                  {itActiveTab === 4 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">bed</span> Ward & Room Management
                        </h4>
                        <div className="space-y-1.5">
                          {itWardManagement.map((r) => (
                            <div key={r.ward} className="p-2 bg-[#eaf6f8] rounded-xl flex justify-between text-[11px]">
                              <div>
                                <span className="font-bold text-[#121d1f]">🛏️ {r.ward}</span> ({r.type})
                                <div className="text-[10px] text-[#6d7a77]">Beds: {r.totalBeds}</div>
                              </div>
                              <span className="font-bold text-[#00685e]">{r.dailyTariff}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Inpatient Ward Tariff Master Settings</div>
                    </div>
                  )}

                  {/* FIELD 5: INSURANCE MANAGEMENT */}
                  {itActiveTab === 5 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">verified_user</span> Insurance & TPA Master
                        </h4>
                        <div className="space-y-2">
                          {itInsuranceManagement.map((r) => (
                            <div key={r.company} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <div>
                                <span className="font-bold text-[#121d1f]">🛡️ {r.company}</span>
                                <div className="text-[10px] text-[#6d7a77]">{r.code}</div>
                              </div>
                              <span className="font-bold text-[#008378]">{r.PreAuthLimit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Corporate Insurance Partner Configuration</div>
                    </div>
                  )}

                  {/* FIELD 6: MODULE MANAGEMENT */}
                  {itActiveTab === 6 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">settings</span> Module Management & Licensing
                        </h4>
                        <div className="space-y-2">
                          {itModuleManagement.map((r) => (
                            <div key={r.module} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-[#121d1f]">{r.module}</span>
                              <span className="px-2.5 py-0.5 bg-[#afecde] text-[#326c62] rounded-full text-[9px] font-bold">• {r.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Enterprise System Feature Toggles</div>
                    </div>
                  )}

                  {/* FIELD 7: VITAL MASTER */}
                  {itActiveTab === 7 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">monitor_heart</span> Vital Signs Master
                        </h4>
                        <div className="space-y-2">
                          {itVitalMaster.map((r) => (
                            <div key={r.vital} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <div>
                                <span className="font-bold text-[#121d1f]">🫀 {r.vital}</span>
                                <div className="text-[10px] text-[#6d7a77]">Normal: {r.normalRange}</div>
                              </div>
                              <span className="text-[#00685e] font-bold">{r.unit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Clinical Vitals Threshold Master Settings</div>
                    </div>
                  )}

                  {/* FIELD 8: VITAL CATEGORY */}
                  {itActiveTab === 8 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">category</span> Vital Categories
                        </h4>
                        <div className="space-y-2">
                          {itVitalCategory.map((r) => (
                            <div key={r.category} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-[#121d1f]">{r.category}</span>
                              <span className="text-[#00685e] font-bold">{r.ageRange}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Age-based Clinical Vitals Rule Master</div>
                    </div>
                  )}

                  {/* FIELD 9: DIAGNOSIS */}
                  {itActiveTab === 9 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">medical_services</span> ICD-10 Diagnosis Master
                        </h4>
                        <div className="space-y-2">
                          {itDiagnosisMaster.map((r) => (
                            <div key={r.icdCode} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <span className="font-bold text-[#00685e]">{r.icdCode}</span>
                              <span className="font-semibold text-[#121d1f]">{r.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">International Classification of Diseases (ICD-10)</div>
                    </div>
                  )}

                  {/* FIELD 10: DISEASE */}
                  {itActiveTab === 10 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">sick</span> Disease Registry
                        </h4>
                        <div className="space-y-2">
                          {itDiseaseMaster.map((r) => (
                            <div key={r.disease} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-[#121d1f]">🦠 {r.disease}</span>
                              <span className="text-[#00685e] font-bold">Reportable: {r.reportable}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Epidemiological Disease Tracking Master</div>
                    </div>
                  )}

                  {/* FIELD 11: USER MANAGEMENT */}
                  {itActiveTab === 11 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">manage_accounts</span> User Accounts & RBAC Roles
                        </h4>
                        <div className="space-y-2">
                          {itUserManagement.map((r) => (
                            <div key={r.user} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <div>
                                <div className="font-bold text-[#121d1f] flex items-center gap-1.5">
                                  <span>👤</span>
                                  <span>{r.user}</span>
                                </div>
                                <div className="text-[10px] text-[#6d7a77] mt-0.5">{r.email} • Role: {r.rbac}</div>
                              </div>
                              <span className="font-bold text-[#00685e]">{r.role}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Role-Based Access Control (RBAC) System</div>
                    </div>
                  )}

                  {/* FIELD 12: HOSPITAL CONFIGURATION */}
                  {itActiveTab === 12 && (
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">domain_add</span> Hospital Master Profile
                        </h4>
                        <div className="bg-[#eaf6f8] p-3.5 rounded-2xl text-[11px] space-y-1">
                          <div className="font-bold text-[#00685e]">{itHospitalConfig.hospitalName}</div>
                          <div>License No: <strong>{itHospitalConfig.licenseNo}</strong></div>
                          <div>GSTIN: <strong>{itHospitalConfig.gstin}</strong></div>
                          <div className="text-[#3d4947]">{itHospitalConfig.address}</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Hospital Print Header & Billing Configuration</div>
                    </div>
                  )}

                  {/* FIELD 13: NURSE ASSIGNMENT */}
                  {itActiveTab === 13 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">assignment_ind</span> Nurse Shift Assignment
                        </h4>
                        <div className="space-y-2">
                          {itNurseAssignment.map((r) => (
                            <div key={r.nurse} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <div>
                                <div className="font-semibold text-[#121d1f]">👩‍⚕️ {r.nurse}</div>
                                <div className="text-[10px] text-[#6d7a77] mt-0.5">{r.shift} • {r.ward}</div>
                              </div>
                              <span className="px-2.5 py-0.5 bg-[#afecde] text-[#326c62] rounded-full text-[9px] font-bold">• {r.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Nursing Shift Roster Master</div>
                    </div>
                  )}

                  {/* FIELD 14: PRO MASTER */}
                  {itActiveTab === 14 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">support_agent</span> Patient Relation Officer (PRO)
                        </h4>
                        <div className="space-y-2">
                          {itProMaster.map((r) => (
                            <div key={r.pro} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <div>
                                <span className="font-bold text-[#121d1f]">{r.pro}</span>
                                <div className="text-[10px] text-[#6d7a77]">{r.area}</div>
                              </div>
                              <span className="text-[#00685e] font-bold">{r.contact}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">VIP Patient Desk & PRO Management</div>
                    </div>
                  )}

                  {/* FIELD 15: REFERRAL DOCTOR MASTER */}
                  {itActiveTab === 15 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">group_add</span> Referral Doctor Master
                        </h4>
                        <table className="w-full text-left border-collapse text-[11px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          <thead>
                            <tr className="border-b border-[#bcc9c6]/30 text-[#00685e] font-bold uppercase">
                              <th className="py-1.5 px-1">Referral Doctor</th>
                              <th className="py-1.5 px-1">Mobile</th>
                              <th className="py-1.5 px-1">Commission Share</th>
                              <th className="py-1.5 px-1">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#bcc9c6]/20">
                            {itReferralDoctor.map((r) => (
                              <tr key={r.doctor} className="hover:bg-[#eaf6f8]/50 transition-colors">
                                <td className="py-1.5 px-1 font-semibold text-[#121d1f]">👨‍⚕️ {r.doctor}</td>
                                <td className="py-1.5 px-1 text-[#3d4947]">{r.mobile}</td>
                                <td className="py-1.5 px-1 font-bold text-[#008378]">{r.share}</td>
                                <td className="py-1.5 px-1">
                                  <span className="px-2 py-0.5 rounded-full bg-[#afecde] text-[#326c62] font-bold text-[9px]">
                                    • {r.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Referring Physician Empanelment & Rules</div>
                    </div>
                  )}

                  {/* FIELD 16: TREATMENT TARIFF MASTER */}
                  {itActiveTab === 16 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">healing</span> Treatment Tariff Master
                        </h4>
                        <table className="w-full text-left border-collapse text-[11px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          <thead>
                            <tr className="border-b border-[#bcc9c6]/30 text-[#00685e] font-bold uppercase">
                              <th className="py-1.5 px-1">Code</th>
                              <th className="py-1.5 px-1">Treatment Name</th>
                              <th className="py-1.5 px-1">Department</th>
                              <th className="py-1.5 px-1">Base Tariff</th>
                              <th className="py-1.5 px-1">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#bcc9c6]/20">
                            {itTreatmentMaster.map((r) => (
                              <tr key={r.code} className="hover:bg-[#eaf6f8]/50 transition-colors">
                                <td className="py-1.5 px-1 font-bold text-[#00685e]">• {r.code}</td>
                                <td className="py-1.5 px-1 font-semibold text-[#121d1f]">{r.treatment}</td>
                                <td className="py-1.5 px-1 text-[#3d4947]">{r.dept}</td>
                                <td className="py-1.5 px-1 font-bold text-[#008378]">{r.baseCost}</td>
                                <td className="py-1.5 px-1">
                                  <span className="px-2 py-0.5 rounded-full bg-[#afecde] text-[#326c62] font-bold text-[9px]">
                                    • Active
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Surgical & Procedure Tariff Master</div>
                    </div>
                  )}

                  {/* FIELD 17: BILLING THRESHOLD CONFIG */}
                  {itActiveTab === 17 && (
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">tune</span> Billing Threshold & Discount Limits
                        </h4>
                        <table className="w-full text-left border-collapse text-[11px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          <thead>
                            <tr className="border-b border-[#bcc9c6]/30 text-[#00685e] font-bold uppercase">
                              <th className="py-1.5 px-1">Category</th>
                              <th className="py-1.5 px-1">Max Discount</th>
                              <th className="py-1.5 px-1">Max Credit Limit</th>
                              <th className="py-1.5 px-1">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#bcc9c6]/20">
                            {itBillingThreshold.map((r) => (
                              <tr key={r.category} className="hover:bg-[#eaf6f8]/50 transition-colors">
                                <td className="py-1.5 px-1 font-semibold text-[#121d1f]">{r.category}</td>
                                <td className="py-1.5 px-1 font-bold text-[#00685e]">{r.maxDiscount}</td>
                                <td className="py-1.5 px-1 font-bold text-[#008378]">{r.maxCredit}</td>
                                <td className="py-1.5 px-1">
                                  <span className="px-2 py-0.5 rounded-full bg-[#afecde] text-[#326c62] font-bold text-[9px]">
                                    • {r.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Corporate Credit & Discount Limit Enforcer</div>
                    </div>
                  )}

                  {/* FIELD 18: BED TPA TARIFF MAPPING */}
                  {itActiveTab === 18 && (
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">hotel</span> Bed TPA Tariff Mapping
                        </h4>
                        <table className="w-full text-left border-collapse text-[11px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          <thead>
                            <tr className="border-b border-[#bcc9c6]/30 text-[#00685e] font-bold uppercase">
                              <th className="py-1.5 px-1">Room Category</th>
                              <th className="py-1.5 px-1">Hospital Rack Rate</th>
                              <th className="py-1.5 px-1">TPA Negotiated Cap</th>
                              <th className="py-1.5 px-1">Empaneled TPA Plan</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#bcc9c6]/20">
                            {itBedTpa.map((r) => (
                              <tr key={r.roomType} className="hover:bg-[#eaf6f8]/50 transition-colors">
                                <td className="py-1.5 px-1 font-semibold text-[#121d1f]">{r.roomType}</td>
                                <td className="py-1.5 px-1 font-bold text-[#6d7a77]">{r.rackRate}</td>
                                <td className="py-1.5 px-1 font-bold text-[#00685e]">{r.tpaCap}</td>
                                <td className="py-1.5 px-1">
                                  <span className="px-2 py-0.5 rounded-full bg-[#afecde] text-[#326c62] font-bold text-[9px]">
                                    • {r.plan}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Insurance Bed Rate & Room Rent Cap Mapping</div>
                    </div>
                  )}

                  {/* Manual tab indicator dots */}
                  <div className="flex items-center justify-center gap-1 pt-2 border-t border-[#bcc9c6]/20 shrink-0">
                    {itTabs.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setItActiveTab(t.id)}
                        className={`h-1.5 rounded-full transition-all ${
                          itActiveTab === t.id ? 'w-4 bg-[#00685e]' : 'w-1 bg-[#bcc9c6]'
                        }`}
                        title={t.label}
                      />
                    ))}
                  </div>

                </div>

              </div>
            </div>

          </div>
        </motion.div>

        {/* ── 3. REPORTS & ANALYTICS SHOWCASE ── */}
        <motion.div
          className="card-frosted rounded-2xl sm:rounded-3xl p-5 sm:p-6 2xl:p-10 mb-8 sm:mb-10 2xl:mb-14 shadow-md border border-[#bcc9c6]/40 relative overflow-hidden"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}
        >
          {/* Background Image Overlay - Enhanced High Visibility (Mirrored) */}
          <img 
            src="/images/reports_bg_soft.png" 
            alt="Reports & Analytics background" 
            className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none mix-blend-multiply transition-opacity duration-700 -scale-x-100" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#effcfe]/45 via-white/20 to-[#effcfe]/45 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 items-stretch relative z-10">
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4 2xl:space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3 2xl:mb-4">
                  <div className="w-12 h-12 2xl:w-14 2xl:h-14 module-badge-icon rounded-xl 2xl:rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#00685e] text-2xl 2xl:text-3xl">analytics</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full bg-[#afecde] text-[#326c62] text-[11px] 2xl:text-xs font-semibold">
                    12 Business Intelligence Reports
                  </span>
                </div>

                <div className="text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-[#00685e] mb-1">BI DASHBOARDS & EXECUTIVE REPORTING</div>
                <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#121d1f] mb-2 sm:mb-3">Reports & Analytics</h2>
                <p className="text-xs sm:text-sm 2xl:text-base text-[#3d4947] leading-relaxed mb-4 2xl:mb-6 bg-white/25 backdrop-blur-sm p-2.5 sm:p-3 2xl:p-4 rounded-xl border border-white/30">
                  Generate and export insightful reports across departments — Doctor Performance, OPD Summaries, Collections, Refunds & Discounts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 2xl:gap-3 mb-4 2xl:mb-6">
                  {['Doctor Consultation Performance', 'OPD Registration & Appt Summaries', 'Userwise & Department Collections', 'Billwise & Payment Mode Analytics', 'Due Amount & Refund Tracking', 'Discount & Cancelled Bills Audit', 'Automated PDF / Excel Export', 'Real-Time KPI Dashboards'].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-sm text-[#121d1f] font-medium">
                      <span className="material-symbols-outlined text-[#00685e] text-sm 2xl:text-base">check_circle</span>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <Link to="/modules/reports" className="inline-flex items-center gap-2 bg-[#00685e] text-white px-5 py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs sm:text-sm 2xl:text-base font-bold shadow-md hover:bg-[#005049] transition-all">
                  Explore Reports & Analytics <span className="material-symbols-outlined text-sm 2xl:text-base">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm rounded-2xl border border-[#bcc9c6]/40 shadow-sm overflow-hidden flex flex-col justify-between min-h-[420px] sm:h-[400px] 2xl:h-[480px] 3xl:h-[500px] relative z-10">
              <div className="bg-[#effcfe] px-4 py-3 border-b border-[#bcc9c6]/30 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
                <div className="flex items-center gap-2 font-bold text-[#00685e]">Reports Master (12 Sub-Modules)</div>
                <div className="text-[10px] text-[#6d7a77]">Auto-changes 5s (12 views)</div>
              </div>

              <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
                <div className="w-full sm:w-56 bg-[#008378] text-white p-2 flex flex-row sm:flex-col overflow-x-auto sm:overflow-y-auto no-scrollbar sm:custom-scrollbar gap-1 shrink-0 text-xs">
                  {reportsTabs.map((tab) => (
                    <button key={tab.id} onClick={() => setReportsActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between p-1.5 px-2 rounded-lg text-left transition-all ${
                        reportsActiveTab === tab.id ? 'bg-[#00685e] text-white font-bold' : 'hover:bg-white/10 text-white/90'
                      }`}>
                      <span className="truncate text-[11px]">{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex-1 p-3 overflow-x-auto overflow-y-auto flex flex-col justify-between">
                  {reportsActiveTab === 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#00685e] mb-2">Doctor Consultation Performance</h4>
                      <table className="w-full text-left text-[11px]">
                        <thead><tr className="border-b text-[#00685e]"><th className="py-1">Doctor</th><th className="py-1">Consults</th><th className="py-1">Revenue</th></tr></thead>
                        <tbody>{reportDoctorPerf.map((r) => (<tr key={r.doctor}><td className="py-1 font-semibold">{r.doctor}</td><td className="py-1">{r.count}</td><td className="py-1 font-bold text-[#008378]">{r.revenue}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}

                  {reportsActiveTab === 1 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#00685e] mb-2">OPD Registration Summary</h4>
                      <div className="grid grid-cols-2 gap-2"><div className="bg-[#eaf6f8] p-2 rounded">New: <strong>{reportOpdRegSummary.newPatients}</strong></div><div className="bg-[#eaf6f8] p-2 rounded">Re-visit: <strong>{reportOpdRegSummary.revisitPatients}</strong></div></div>
                    </div>
                  )}

                  {reportsActiveTab === 2 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#00685e] mb-2">OPD Appointment Summary</h4>
                      <div className="grid grid-cols-3 gap-1 text-center"><div className="bg-[#eaf6f8] p-1.5 rounded">Attended: {reportOpdApptSummary.attended}</div><div className="bg-[#eaf6f8] p-1.5 rounded">Cancelled: {reportOpdApptSummary.cancelled}</div></div>
                    </div>
                  )}

                  {reportsActiveTab === 3 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#00685e] mb-2">Userwise Collection</h4>
                      <table className="w-full text-left text-[11px]">
                        <thead><tr className="border-b text-[#00685e]"><th className="py-1">User</th><th className="py-1">Amount</th></tr></thead>
                        <tbody>{reportUserwiseCollection.map((r) => (<tr key={r.user}><td className="py-1 font-semibold">{r.user}</td><td className="py-1 font-bold text-[#008378]">{r.amount}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}

                  {/* FIELD 4: DEPARTMENTWISE COLLECTION */}
                  {reportsActiveTab === 4 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">domain</span> Departmentwise Collection
                        </h4>
                        <div className="space-y-2">
                          {reportDeptwiseCollection.map((r) => (
                            <div key={r.dept} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-[#121d1f]">{r.dept}</span>
                              <span className="font-bold text-[#00685e]">{r.revenue}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Departmental Revenue Share Breakdown</div>
                    </div>
                  )}

                  {/* FIELD 5: BILLWISE COLLECTION */}
                  {reportsActiveTab === 5 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">receipt_long</span> Billwise Detailed Collections
                        </h4>
                        <table className="w-full text-left border-collapse text-[11px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          <thead>
                            <tr className="border-b border-[#bcc9c6]/30 text-[#00685e] font-bold uppercase">
                              <th className="py-1.5 px-1">Bill No</th>
                              <th className="py-1.5 px-1">Patient</th>
                              <th className="py-1.5 px-1">Total Paid</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#bcc9c6]/20">
                            {reportBillwiseCollection.map((r) => (
                              <tr key={r.bill} className="hover:bg-[#eaf6f8]/50 transition-colors">
                                <td className="py-1.5 px-1 font-bold text-[#00685e]">{r.bill}</td>
                                <td className="py-1.5 px-1 font-semibold text-[#121d1f]">{r.patient}</td>
                                <td className="py-1.5 px-1 font-bold text-[#008378]">{r.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Individual Invoice Reconciliation Audit</div>
                    </div>
                  )}

                  {/* FIELD 6: PAYMENT MODE COLLECTION */}
                  {reportsActiveTab === 6 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">credit_card</span> Payment Mode Collections
                        </h4>
                        <div className="space-y-2">
                          {reportPaymentModeCollection.map((r) => (
                            <div key={r.mode} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-[#121d1f]">💳 {r.mode}</span>
                              <span className="font-bold text-[#00685e]">{r.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Payment Gateway Channel Revenue Analysis</div>
                    </div>
                  )}

                  {/* FIELD 7: DUE AMOUNT */}
                  {reportsActiveTab === 7 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">hourglass_empty</span> Due Amount Log
                        </h4>
                        <div className="space-y-2">
                          {reportDueAmount.map((r) => (
                            <div key={r.patient} className="p-2.5 bg-[#fef2f2] rounded-2xl flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-[#121d1f]">{r.patient}</span>
                              <span className="font-bold text-red-600">Due: {r.balance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Inpatient & Outpatient Pending Receivables</div>
                    </div>
                  )}

                  {/* FIELD 8: REFUND REPORT */}
                  {reportsActiveTab === 8 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">price_change</span> Refund Audit Report
                        </h4>
                        <div className="space-y-2">
                          {reportRefunds.map((r) => (
                            <div key={r.ref} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <div>
                                <span className="font-bold text-[#00685e]">{r.ref}</span>
                                <span className="font-semibold text-[#121d1f] ml-2">{r.patient}</span>
                              </div>
                              <span className="font-bold text-[#008378]">{r.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Manager-Approved Refund Log</div>
                    </div>
                  )}

                  {/* FIELD 9: DISCOUNT REPORT */}
                  {reportsActiveTab === 9 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">sell</span> Discount & Concession Report
                        </h4>
                        <div className="space-y-2">
                          {reportDiscounts.map((r) => (
                            <div key={r.scheme} className="p-2.5 bg-[#eaf6f8] rounded-2xl flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-[#121d1f]">{r.scheme}</span>
                              <span className="font-bold text-[#00685e]">{r.totalConcession}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Concession & Special Discount Audits</div>
                    </div>
                  )}

                  {/* FIELD 10: CANCELLED BILLS AUDIT */}
                  {reportsActiveTab === 10 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">cancel</span> Cancelled Bills Audit
                        </h4>
                        <div className="space-y-2">
                          {reportCancelledBills.map((r) => (
                            <div key={r.bill} className="p-2.5 bg-[#fef2f2] rounded-2xl flex items-center justify-between text-[11px]">
                              <div className="font-bold text-red-700 flex items-center gap-1.5">
                                <span>🚫</span>
                                <span>{r.bill}</span>
                              </div>
                              <span className="font-bold text-red-600">{r.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Audit-Compliant Voided Invoice Register</div>
                    </div>
                  )}

                  {/* FIELD 11: MASTER BILL REGISTER */}
                  {reportsActiveTab === 11 && (
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <h4 className="text-sm font-bold text-[#00685e] mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">auto_stories</span> Master Bill Register
                        </h4>
                        <div className="bg-[#eaf6f8] p-3.5 rounded-2xl text-[11px] space-y-1">
                          <div className="flex justify-between"><span>Total Invoices Generated:</span> <strong>{reportBillRegister.totalInvoices}</strong></div>
                          <div className="flex justify-between"><span>Gross Hospital Revenue:</span> <strong className="text-[#00685e]">{reportBillRegister.grossRevenue}</strong></div>
                          <div className="flex justify-between"><span>Total Tax Collected (GST):</span> <strong>{reportBillRegister.taxCollected}</strong></div>
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77]">Complete Monthly Financial Bill Register</div>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-1 pt-2 border-t border-[#bcc9c6]/20 shrink-0">
                    {reportsTabs.map((t) => (
                      <button key={t.id} onClick={() => setReportsActiveTab(t.id)}
                        className={`h-1.5 rounded-full transition-all ${reportsActiveTab === t.id ? 'w-5 bg-[#00685e]' : 'w-1.5 bg-[#bcc9c6]'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 4. IPD SHOWCASE ── */}
        <motion.div
          className="card-frosted rounded-2xl sm:rounded-3xl p-5 sm:p-6 2xl:p-10 mb-8 sm:mb-10 2xl:mb-14 shadow-md border border-[#bcc9c6]/40 relative overflow-hidden"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}
        >
          <img 
            src="/images/ipd_bg_soft.png" 
            alt="IPD Inpatient background" 
            className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none mix-blend-multiply transition-opacity duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#effcfe]/45 via-white/20 to-[#effcfe]/45 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 items-stretch relative z-10">
            {/* Left: IPD Details */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4 2xl:space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3 2xl:mb-4">
                  <div className="w-12 h-12 2xl:w-14 2xl:h-14 module-badge-icon rounded-xl 2xl:rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#00685e] text-2xl 2xl:text-3xl">bed</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full bg-[#afecde] text-[#326c62] text-[11px] 2xl:text-xs font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    Real-Time Bed Matrix
                  </span>
                </div>

                <div className="text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-[#00685e] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>INPATIENT CARE, WARDS & BED MANAGEMENT</div>
                <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#121d1f] mb-2 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>IPD</h2>
                <p className="text-xs sm:text-sm 2xl:text-base text-[#3d4947] leading-relaxed mb-4 2xl:mb-6 bg-white/25 backdrop-blur-sm p-2.5 sm:p-3 2xl:p-4 rounded-xl border border-white/30" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  End-to-end inpatient care — bed allocation, ward management, nurse dashboards, treatment tracking, discharge summaries & IPD accounting.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-2 mb-4 2xl:mb-6">
                  {['Visual Bed Matrix', 'Nurse Dashboard', 'IPD Accounting', 'Discharge Summary', 'Ward Management', 'OT Scheduling'].map((feat) => (
                    <span key={feat} className="px-2.5 py-1 rounded-full bg-[#eaf6f8] border border-[#00685e]/20 text-[#00685e] text-[10px] font-bold">{feat}</span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 2xl:gap-3 mb-4 2xl:mb-6">
                  {['IPD Admission & Bed Allocation', 'Nurse & Doctor Duty Dashboard', 'Ward Bed Availability Matrix', 'Patient Treatment Chart', 'IPD Advance & Billing Ledger', 'TPA & Insurance IPD Claims', 'Discharge Summary Builder', 'OT & Surgical Scheduling'].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-sm text-[#121d1f] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="material-symbols-outlined text-[#00685e] text-sm 2xl:text-base">check_circle</span>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <Link
                  to="/modules/ipd"
                  className="inline-flex items-center gap-2 bg-[#2d685e] text-white px-5 py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs sm:text-sm 2xl:text-base font-bold shadow-md hover:bg-[#00685e] transition-all"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Explore IPD Features <span className="material-symbols-outlined text-sm 2xl:text-base">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right: Interactive IPD Card */}
            <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm rounded-2xl border border-[#bcc9c6]/40 shadow-sm overflow-hidden flex flex-col justify-between min-h-[420px] sm:h-[400px] 2xl:h-[480px] 3xl:h-[500px] relative z-10">

              {/* Card Header */}
              <div className="bg-[#effcfe] px-4 py-3 border-b border-[#bcc9c6]/30 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0" style={{ fontFamily: "'Inter', sans-serif" }}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#00685e]">bed</span>
                  <span className="font-bold text-[#00685e]">IPD — Inpatient Management (2 Views)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#6d7a77]">Auto-changes 5s (2 views)</span>
                  <span className="w-2 h-2 rounded-full bg-[#00685e] animate-pulse"></span>
                </div>
              </div>

              {/* App Body */}
              <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">

                {/* Sidebar */}
                <div className="w-full sm:w-48 bg-[#008378] text-white p-2 flex flex-row sm:flex-col overflow-x-auto sm:overflow-y-auto no-scrollbar sm:custom-scrollbar gap-1 shrink-0 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <div className="font-bold text-white/70 text-[9px] uppercase tracking-wider mb-1 px-2 hidden sm:block">IPD</div>
                  {ipdTabs.map((tab) => (
                    <button key={tab.id} onClick={() => setIpdActiveTab(tab.id)}
                      className={`w-full flex items-center p-1.5 px-2 rounded-lg text-left transition-all ${
                        ipdActiveTab === tab.id ? 'bg-[#00685e] text-white font-bold' : 'hover:bg-white/10 text-white/90'
                      }`}>
                      <span className="truncate text-[11px]">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Main Content */}
                <div className="flex-1 p-3 overflow-x-auto overflow-y-auto flex flex-col justify-between">

                  {/* NURSE DASHBOARD */}
                  {ipdActiveTab === 0 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-bold text-[#00685e] flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">health_and_safety</span> Nurse Dashboard — Ward Overview
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#afecde] text-[#326c62]">Live 311 Beds</span>
                        </div>

                        {/* Top Bed Metrics Cards */}
                        <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                          <div className="bg-[#eaf6f8] p-1.5 rounded-xl border border-[#00685e]/20 text-center">
                            <div className="text-[9px] font-bold text-[#6d7a77]">TOTAL BEDS</div>
                            <div className="text-sm font-extrabold text-[#00685e]">311</div>
                            <div className="text-[8px] text-[#008378]">Occ: 68 (21.9%)</div>
                          </div>
                          <div className="bg-[#eaf6f8] p-1.5 rounded-xl border border-[#00685e]/20 text-center">
                            <div className="text-[9px] font-bold text-[#6d7a77]">ADMITTED</div>
                            <div className="text-sm font-extrabold text-[#008378]">161</div>
                            <div className="text-[8px] text-[#6d7a77]">Today: +0</div>
                          </div>
                          <div className="bg-red-50 p-1.5 rounded-xl border border-red-200 text-center">
                            <div className="text-[9px] font-bold text-red-600">EMERGENCY</div>
                            <div className="text-sm font-extrabold text-red-700">49</div>
                            <div className="text-[8px] text-red-500">Needs attention</div>
                          </div>
                          <div className="bg-emerald-50 p-1.5 rounded-xl border border-emerald-200 text-center">
                            <div className="text-[9px] font-bold text-emerald-600">DISCHARGES</div>
                            <div className="text-sm font-extrabold text-emerald-700">0</div>
                            <div className="text-[8px] text-emerald-500">Today</div>
                          </div>
                        </div>

                        {/* Patient Registry Table */}
                        <table className="w-full text-left text-[10px]">
                          <thead>
                            <tr className="border-b text-[#00685e] font-bold uppercase">
                              <th className="py-1">Name</th>
                              <th className="py-1">UHID</th>
                              <th className="py-1">Ward / Bed</th>
                              <th className="py-1">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: 'Lucifer Yadav', uhid: 'LCI202600464', ward: 'EMERGENCY - E101', status: 'Stable' },
                              { name: 'Suresh sharma', uhid: 'LCI202600453', ward: 'Pvt - bed103', status: 'Stable' },
                              { name: 'Neelam', uhid: 'LCI202600449', ward: 'Pvt - bed102', status: 'Stable' },
                              { name: 'Charu', uhid: 'LCI202600432', ward: 'Gen - 104', status: 'Stable' },
                            ].map((r) => (
                              <tr key={r.uhid} className="border-b border-[#bcc9c6]/20">
                                <td className="py-1 font-semibold text-[#121d1f]">{r.name}</td>
                                <td className="py-1 font-mono text-[#00685e]">{r.uhid}</td>
                                <td className="py-1 text-[#3d4947]">{r.ward}</td>
                                <td className="py-1">
                                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[8px]">• {r.status}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-[10px] text-[#6d7a77] mt-1">Real-Time Inpatient Nursing Dashboard</div>
                    </div>
                  )}

                  {/* ACCOUNTING */}
                  {ipdActiveTab === 1 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-bold text-[#00685e] flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">account_balance_wallet</span> IPD Accounting Sub-Features
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#afecde] text-[#326c62]">6 Options</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {[
                            { name: 'IPD Dashboard', icon: 'grid_view', active: false },
                            { name: 'Advance Payment', icon: 'payments', active: false },
                            { name: 'Provisional Billing', icon: 'receipt_long', active: false },
                            { name: 'Package Billing', icon: 'inventory_2', active: false },
                            { name: 'Provisional Estimate', icon: 'assignment', active: true },
                            { name: 'Final Bill', icon: 'assignment_turned_in', active: false },
                          ].map((sub) => (
                            <div
                              key={sub.name}
                              className={`flex items-center gap-2 p-2 rounded-2xl border text-[11px] transition-all ${
                                sub.active
                                  ? 'bg-[#00685e] text-white font-bold border-[#00685e] shadow-sm'
                                  : 'bg-[#eaf6f8]/80 text-[#121d1f] font-semibold border-[#bcc9c6]/40 hover:bg-[#eaf6f8]'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                                sub.active ? 'bg-white/20 text-white' : 'bg-white text-[#00685e]'
                              }`}>
                                <span className="material-symbols-outlined text-sm">{sub.icon}</span>
                              </div>
                              <span className="truncate">{sub.name}</span>
                            </div>
                          ))}
                        </div>
                        <div className="p-2 bg-[#eaf6f8] rounded-xl text-[10px] text-[#3d4947] flex items-center justify-between font-medium">
                          <span>Active View: <strong>Provisional Estimate</strong></span>
                          <span className="font-bold text-[#00685e]">Ref: IP-99023</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-[#6d7a77] mt-2">Inpatient Financial & Billing Sub-Modules</div>
                    </div>
                  )}

                  {/* Progress Dots */}
                  <div className="flex items-center justify-center gap-1 pt-2 border-t border-[#bcc9c6]/20 shrink-0">
                    {ipdTabs.map((t) => (
                      <button key={t.id} onClick={() => setIpdActiveTab(t.id)}
                        className={`h-1.5 rounded-full transition-all ${ipdActiveTab === t.id ? 'w-5 bg-[#00685e]' : 'w-1.5 bg-[#bcc9c6]'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 5. BILLING & ACCOUNTS SHOWCASE ── */}
        <motion.div
          className="card-frosted rounded-2xl sm:rounded-3xl p-5 sm:p-6 2xl:p-10 mb-8 sm:mb-10 2xl:mb-14 shadow-md border border-[#bcc9c6]/40 relative overflow-hidden"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}
        >
          {/* Background Image Overlay - Enhanced High Visibility */}
          <img 
            src="/images/billing_bg_soft.png" 
            alt="Billing & Accounts background" 
            className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none mix-blend-multiply transition-opacity duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#effcfe]/45 via-white/20 to-[#effcfe]/45 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 items-stretch relative z-10">
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4 2xl:space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3 2xl:mb-4">
                  <div className="w-12 h-12 2xl:w-14 2xl:h-14 module-badge-icon rounded-xl 2xl:rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#00685e] text-2xl 2xl:text-3xl">receipt_long</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full bg-[#afecde] text-[#326c62] text-[11px] 2xl:text-xs font-semibold">
                    Real-time Audit Trail
                  </span>
                </div>

                <div className="text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-[#00685e] mb-1">REVENUE CYCLE & FISCAL MANAGEMENT</div>
                <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#121d1f] mb-2 sm:mb-3">Billing & Accounts</h2>
                <p className="text-xs sm:text-sm 2xl:text-base text-[#3d4947] leading-relaxed mb-4 2xl:mb-6 bg-white/25 backdrop-blur-sm p-2.5 sm:p-3 2xl:p-4 rounded-xl border border-white/30">
                  Comprehensive financial management including invoicing, insurance claims, ledger master, GST & vouchers.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 2xl:gap-3 mb-4 2xl:mb-6">
                  {['Insurance Claims Engine', 'Multi-currency POS Billing', 'Automated Tariff Lists', 'Revenue Cycle Analytics', 'Account Groups & Ledgers', 'GST & Voucher Masters'].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-sm text-[#121d1f] font-medium">
                      <span className="material-symbols-outlined text-[#00685e] text-sm 2xl:text-base">check_circle</span>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <Link to="/modules/billing-accounts" className="inline-flex items-center gap-2 bg-[#008378] text-white px-5 py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs sm:text-sm 2xl:text-base font-bold shadow-md hover:bg-[#00685e] transition-all cursor-pointer">
                  Explore Billing & Accounts Features <span className="material-symbols-outlined text-sm 2xl:text-base">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm rounded-2xl border border-[#bcc9c6]/40 shadow-sm overflow-hidden flex flex-col justify-between min-h-[420px] sm:h-[400px] 2xl:h-[480px] 3xl:h-[500px] relative z-10">
              <div className="bg-[#effcfe] px-4 py-3 border-b border-[#bcc9c6]/30 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
                <div className="flex items-center gap-2 font-bold text-[#00685e]">Billing & Accounts Master</div>
                <div className="text-[10px] text-[#6d7a77]">Auto-changes 5s (6 views)</div>
              </div>

              <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
                <div className="w-full sm:w-48 bg-[#008378] text-white p-2 sm:p-2.5 flex flex-row sm:flex-col overflow-x-auto sm:overflow-y-auto no-scrollbar sm:custom-scrollbar gap-1 shrink-0 text-xs">
                  {billingTabs.map((tab) => (
                    <button key={tab.id} onClick={() => setBillingActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between p-1.5 px-2 rounded-lg text-left transition-all ${
                        billingActiveTab === tab.id ? 'bg-[#00685e] text-white font-bold' : 'hover:bg-white/10 text-white/90'
                      }`}>
                      <span className="truncate text-[11px]">{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex-1 p-3 overflow-x-auto overflow-y-auto flex flex-col justify-between">
                  {billingActiveTab === 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#121d1f] mb-2">Account Groups</h4>
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead><tr className="border-b text-[#00685e]"><th className="py-1">Group</th><th className="py-1">Code</th><th className="py-1">Nature</th></tr></thead>
                        <tbody>{billingAccountGroups.map((r) => (<tr key={r.code}><td className="py-1 font-semibold">{r.name}</td><td className="py-1">• {r.code}</td><td className="py-1 font-bold">{r.nature}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}

                  {billingActiveTab === 1 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#121d1f] mb-2">Ledger Master</h4>
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead><tr className="border-b text-[#00685e]"><th className="py-1">Ledger</th><th className="py-1">Code</th><th className="py-1">Balance</th></tr></thead>
                        <tbody>{billingLedgers.map((r) => (<tr key={r.code}><td className="py-1 font-semibold">{r.name}</td><td className="py-1">{r.code}</td><td className="py-1 font-bold text-[#00685e]">{r.balance}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}

                  {billingActiveTab === 2 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#121d1f] mb-2">Service Master Registry</h4>
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead><tr className="border-b text-[#00685e]"><th className="py-1">Code</th><th className="py-1">Name</th><th className="py-1">Rate</th></tr></thead>
                        <tbody>{billingServices.map((r) => (<tr key={r.code + r.name}><td className="py-1 font-bold text-[#00685e]">• {r.code}</td><td className="py-1 font-semibold">{r.name}</td><td className="py-1 font-bold text-[#008378]">{r.rate}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}

                  {billingActiveTab === 3 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#121d1f] mb-2">GST Rate Master</h4>
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead><tr className="border-b text-[#00685e]"><th className="py-1">Code</th><th className="py-1">Name</th><th className="py-1">IGST</th></tr></thead>
                        <tbody>{billingGstRates.map((r) => (<tr key={r.code}><td className="py-1 font-bold text-[#00685e]">• {r.code}</td><td className="py-1 font-semibold">{r.name}</td><td className="py-1 font-bold text-[#008378]">{r.igst}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}

                  {billingActiveTab === 4 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#121d1f] mb-2">Voucher Type Master</h4>
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead><tr className="border-b text-[#00685e]"><th className="py-1">Name</th><th className="py-1">Code</th></tr></thead>
                        <tbody>{billingVoucherTypes.map((r) => (<tr key={r.code + r.name}><td className="py-1 font-semibold">{r.name}</td><td className="py-1 font-bold text-[#00685e]">{r.code}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}

                  {billingActiveTab === 5 && (
                    <div>
                      <h4 className="text-sm font-bold text-[#121d1f] mb-2">Voucher Master</h4>
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead><tr className="border-b text-[#00685e]"><th className="py-1">Name</th><th className="py-1">Prefix</th><th className="py-1">Type</th></tr></thead>
                        <tbody>{billingVouchers.map((r) => (<tr key={r.name + r.prefix}><td className="py-1 font-semibold">{r.name}</td><td className="py-1 font-bold text-[#00685e]">{r.prefix}</td><td className="py-1">{r.type}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-[#bcc9c6]/20 shrink-0">
                    {billingTabs.map((t) => (
                      <button key={t.id} onClick={() => setBillingActiveTab(t.id)}
                        className={`h-1.5 rounded-full transition-all ${billingActiveTab === t.id ? 'w-6 bg-[#00685e]' : 'w-2 bg-[#bcc9c6]'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 6. LABORATORY SHOWCASE ── */}
        <motion.div
          className="card-frosted rounded-2xl sm:rounded-3xl p-5 sm:p-6 2xl:p-10 mb-8 sm:mb-10 2xl:mb-14 shadow-md border border-[#bcc9c6]/40 relative overflow-hidden"
          initial="hidden" whileInView="visible" viewport={{ amount: 0.15 }} variants={fadeUp}
        >
          {/* Background Image Overlay - Increased Visibility */}
          <img 
            src="/images/lab_bg_soft.png" 
            alt="Laboratory background" 
            className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none mix-blend-multiply transition-opacity duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#effcfe]/60 via-white/35 to-[#effcfe]/60 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 items-stretch relative z-10">
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4 2xl:space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3 2xl:mb-4">
                  <div className="w-12 h-12 2xl:w-14 2xl:h-14 module-badge-icon rounded-xl 2xl:rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#00685e] text-2xl 2xl:text-3xl">biotech</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full bg-[#afecde] text-[#326c62] text-[11px] 2xl:text-xs font-semibold">
                    ISO 15189 Compliant
                  </span>
                </div>

                <div className="text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-[#00685e] mb-1">DIAGNOSTICS & SPECIMEN WORKFLOW</div>
                <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#121d1f] mb-2 sm:mb-3">Laboratory</h2>
                <p className="text-xs sm:text-sm 2xl:text-base text-[#3d4947] leading-relaxed mb-4 2xl:mb-6 bg-white/25 backdrop-blur-sm p-2.5 sm:p-3 2xl:p-4 rounded-xl border border-white/30">
                  Streamline lab operations with automated test ordering, sample tracking, result management, and seamless clinical integration.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 2xl:gap-3 mb-4 2xl:mb-6">
                  {['Automated Sample Tracking', 'HL7 & LIS Integration', 'Abnormal Result Flagging', 'Barcoded Specimen Management', 'OPD Lab Orders Sync', 'Instant PDF Report Generation'].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-sm text-[#121d1f] font-medium">
                      <span className="material-symbols-outlined text-[#00685e] text-sm 2xl:text-base">check_circle</span>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <Link to="/modules/laboratory" className="inline-flex items-center gap-2 bg-[#00685e] text-white px-5 py-2.5 2xl:px-6 2xl:py-3 rounded-full text-xs sm:text-sm 2xl:text-base font-bold shadow-md hover:bg-[#005049] transition-all">
                  Explore Laboratory Features <span className="material-symbols-outlined text-sm 2xl:text-base">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm rounded-2xl border border-[#bcc9c6]/40 shadow-sm overflow-hidden flex flex-col justify-between min-h-[420px] sm:h-[400px] 2xl:h-[480px] 3xl:h-[500px] relative z-10">
              <div className="bg-[#effcfe] px-4 py-3 border-b border-[#bcc9c6]/30 flex flex-wrap items-center justify-between gap-2 text-xs text-[#3d4947] shrink-0">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#00685e]">home</span>
                  <span>Home &gt; Reception &gt;</span>
                  <span className="font-bold text-[#00685e]">Service Orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-white border border-[#bcc9c6]/30 rounded-lg text-[11px] font-semibold text-[#00685e]">📅 Select Date</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
                <div className="w-full sm:w-44 bg-[#008378] text-white p-2.5 sm:p-3 flex flex-row sm:flex-col overflow-x-auto sm:overflow-y-auto no-scrollbar sm:custom-scrollbar gap-1 shrink-0 text-xs">
                  <div className="flex items-center gap-2 p-2 bg-[#00685e] rounded-lg font-bold">
                    <span className="material-symbols-outlined text-sm">biotech</span>
                    <span>Laboratory</span>
                  </div>
                  <div className="pl-6 py-1 text-[#afecde] font-semibold">↳ OPD Lab Orders</div>
                  <div className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg opacity-80">Billing & Accounts</div>
                  <div className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg opacity-80">Clinical</div>
                  <div className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg opacity-80">Reports</div>
                </div>

                <div className="flex-1 p-3 overflow-x-auto overflow-y-auto flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-[#121d1f]">Service Orders</h4>
                      <span className="px-2 py-0.5 bg-[#afecde] text-[#326c62] rounded text-[10px] font-bold">LIVE SYNC</span>
                    </div>

                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead>
                        <tr className="border-b border-[#bcc9c6]/30 text-[#00685e] font-bold uppercase">
                          <th className="py-1.5 px-1">Patient</th>
                          <th className="py-1.5 px-1">Ordered At</th>
                          <th className="py-1.5 px-1">Doctor</th>
                          <th className="py-1.5 px-1">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#bcc9c6]/20">
                        {labOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="py-1.5 px-1 font-semibold">{order.name} <div className="text-[9px] text-[#6d7a77]">{order.id}</div></td>
                            <td className="py-1.5 px-1 text-[#3d4947] whitespace-nowrap">{order.date}</td>
                            <td className="py-1.5 px-1 text-[#3d4947]">{order.doctor}</td>
                            <td className="py-1.5 px-1"><span className="px-2 py-0.5 rounded-full bg-[#afecde] text-[#326c62] font-bold text-[10px]">• {order.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>


        {/* ── ADDITIONAL SPECIALIZED CONTAINERS ── */}
        <div className="mb-10">
          <h2 className="heading-section text-[#121d1f] mb-3">Additional Integrated Services</h2>
          <p className="text-description text-[#3d4947]">Specialized sub-systems built seamlessly into the core MedCare platform.</p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 2xl:gap-8"
          initial="hidden" whileInView="visible" viewport={{ amount: 0.15 }} variants={stagger}>
          {additionalContainers.map((m) => (
            <motion.div key={m.title}
              className="card-frosted rounded-2xl p-6 flex items-start gap-4"
              variants={fadeUp}>
              <div className="shrink-0 w-12 h-12 module-badge-icon rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[#00685e] text-2xl">{m.icon}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#00685e] mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {m.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#3d4947] leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </main>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.15 }}
        variants={fadeUp}
        className="bg-[#00685e] section-padding text-white"
      >
        <div className="site-wrapper text-center">
          <h2 className="heading-hero text-white mb-5 sm:mb-6">Ready to Deploy MedCare HMS?</h2>
          <p className="text-description text-white/80 max-w-2xl 2xl:max-w-3xl mx-auto mb-8 sm:mb-10">
            Join over 500+ healthcare facilities worldwide using our core modules to deliver superior patient outcomes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="bg-white text-[#00685e] px-10 sm:px-12 py-3.5 sm:py-4 rounded-full text-sm 2xl:text-base font-bold shadow-lg hover:bg-[#f0f9f7] active:scale-95 transition-all flex items-center justify-center"
              style={{ fontFamily: "'Inter', sans-serif" }}>Get Started Now</Link>
            <Link to="/contact" className="border-2 border-white/30 text-white px-10 sm:px-12 py-3.5 sm:py-4 rounded-full text-sm 2xl:text-base font-bold hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center"
              style={{ fontFamily: "'Inter', sans-serif" }}>Request Demo</Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}
