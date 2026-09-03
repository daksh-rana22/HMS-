import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageTransition } from '../../utils/animations'

const sections = [
  {
    id: 'sec-1',
    num: '1',
    title: 'SCOPE OF THIS PRIVACY POLICY',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>This Privacy Policy applies to information processed through:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>OMEDO website;</li>
          <li>OMEDO web application;</li>
          <li>OMEDO mobile applications;</li>
          <li>Hospital and clinic management modules;</li>
          <li>Patient registration systems;</li>
          <li>OPD and IPD modules;</li>
          <li>EMR systems;</li>
          <li>Doctor consultation and prescription modules;</li>
          <li>Nursing modules;</li>
          <li>Pharmacy modules;</li>
          <li>Laboratory modules;</li>
          <li>Billing and accounts modules;</li>
          <li>Insurance and TPA modules;</li>
          <li>Oncology and treatment modules;</li>
          <li>Appointment and queue management;</li>
          <li>Communication and notification services;</li>
          <li>APIs and integrations;</li>
          <li>Customer support and implementation services.</li>
        </ul>
        <p>
          This Policy applies to information collected directly from individuals as well as information processed on behalf of hospitals, clinics, doctors, and other healthcare organizations using OMEDO.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-2',
    num: '2',
    title: 'IMPORTANT INFORMATION ABOUT HEALTHCARE DATA',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO is a healthcare technology platform.</p>
        <p>
          Healthcare organizations using OMEDO may enter or upload sensitive information relating to their patients, including medical records, prescriptions, diagnostic reports, treatment information, and other healthcare-related information.
        </p>
        <p>
          In many cases, the hospital, clinic, doctor, or healthcare organization using OMEDO determines why and how patient information is collected and processed.
        </p>
        <p>
          Accordingly, OMEDO may process Patient Data on behalf of the healthcare organization as part of providing the Services.
        </p>
        <p>
          The healthcare organization remains responsible for ensuring that Patient Data is collected, used, disclosed, and retained lawfully and that appropriate notices, permissions, and consents are obtained where required.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-3',
    num: '3',
    title: 'INFORMATION WE COLLECT',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Depending on how you interact with OMEDO, we may collect different categories of information.</p>
        <div>
          <p className="font-bold text-slate-900 mb-1">3.1 Account Information</p>
          <p className="text-slate-700 mb-2">When a Customer or User creates an account, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Name;</li>
            <li>Designation;</li>
            <li>Department;</li>
            <li>Professional information;</li>
            <li>Email address;</li>
            <li>Mobile number;</li>
            <li>Username;</li>
            <li>Login credentials;</li>
            <li>Organization name;</li>
            <li>Hospital/clinic details;</li>
            <li>Address;</li>
            <li>Subscription information.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'sec-4',
    num: '4',
    title: 'PATIENT INFORMATION',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>When OMEDO is used by a healthcare organization, the Customer may enter or generate Patient Data including:</p>
        
        <div>
          <p className="font-bold text-slate-900 mb-1">Patient Identification</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Patient name;</li>
            <li>UHID;</li>
            <li>Registration number;</li>
            <li>Date of birth;</li>
            <li>Age;</li>
            <li>Gender;</li>
            <li>Photograph, where applicable;</li>
            <li>Address;</li>
            <li>Contact information;</li>
            <li>Identification information.</li>
          </ul>
        </div>

        <div>
          <p className="font-bold text-slate-900 mb-1">Healthcare Information</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Chief complaints;</li>
            <li>Medical history;</li>
            <li>Allergies;</li>
            <li>Diagnosis;</li>
            <li>Clinical observations;</li>
            <li>Vital signs;</li>
            <li>Examination findings;</li>
            <li>Treatment information;</li>
            <li>Doctor notes;</li>
            <li>Nursing notes;</li>
            <li>Prescriptions;</li>
            <li>Medication history;</li>
            <li>Investigation requests;</li>
            <li>Laboratory results;</li>
            <li>Radiology reports;</li>
            <li>Medical documents;</li>
            <li>Discharge summaries;</li>
            <li>Follow-up information.</li>
          </ul>
        </div>

        <div>
          <p className="font-bold text-slate-900 mb-1">Hospitalization Information</p>
          <p className="text-slate-700 mb-1 text-xs">For IPD patients, information may include:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Admission details;</li>
            <li>Bed and room information;</li>
            <li>Doctor information;</li>
            <li>Nursing information;</li>
            <li>Treatment orders;</li>
            <li>Medication administration;</li>
            <li>Investigation details;</li>
            <li>Procedures;</li>
            <li>Surgery information;</li>
            <li>Discharge information;</li>
            <li>Length of stay;</li>
            <li>Billing information.</li>
          </ul>
        </div>

        <div>
          <p className="font-bold text-slate-900 mb-1">Financial and Insurance Information</p>
          <p className="text-slate-700 mb-1 text-xs">Where applicable:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Billing information;</li>
            <li>Payment information;</li>
            <li>Insurance details;</li>
            <li>TPA information;</li>
            <li>Claim information;</li>
            <li>Policy information;</li>
            <li>Authorization information;</li>
            <li>Financial transactions relating to healthcare services.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'sec-5',
    num: '5',
    title: 'ABHA / ABDM INFORMATION',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>
          Where OMEDO provides integration with ABHA/ABDM or other government healthcare infrastructure, information may be processed as necessary to provide the requested functionality.
        </p>
        <p>Depending on the integration and services enabled by the Customer, this may include:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>ABHA-related identifiers;</li>
          <li>ABHA address;</li>
          <li>Healthcare records;</li>
          <li>Consent-related information;</li>
          <li>Health information exchanged through ABDM-enabled workflows;</li>
          <li>Information required for authentication or verification.</li>
        </ul>
        <p>
          ABHA/ABDM-connected information will be processed in accordance with applicable ABDM requirements, technical specifications, consent mechanisms, and applicable law.
        </p>
        <p>
          ABDM&apos;s own privacy documentation emphasizes purpose limitation and consent-based access to health records. (ABDM)
        </p>
        <p className="font-semibold text-slate-900">
          Important: OMEDO will not represent that every OMEDO installation automatically has access to ABHA/ABDM data. Such functionality depends on the applicable integration, Customer configuration, technical availability, and authorization.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-6',
    num: '6',
    title: 'DOCTOR, STAFF AND USER INFORMATION',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may process information about doctors, nurses, pharmacists, technicians, receptionists, administrators, accountants, and other authorized Users.</p>
        <p>This may include:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Name;</li>
          <li>Employee/User ID;</li>
          <li>Professional designation;</li>
          <li>Department;</li>
          <li>Contact details;</li>
          <li>Login information;</li>
          <li>Role and permissions;</li>
          <li>Activity logs;</li>
          <li>Attendance information where applicable;</li>
          <li>Actions performed within the system.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sec-7',
    num: '7',
    title: 'INFORMATION COLLECTED AUTOMATICALLY',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>When you access OMEDO, certain technical information may be automatically collected, including:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>IP address;</li>
          <li>Browser type;</li>
          <li>Operating system;</li>
          <li>Device type;</li>
          <li>Device identifiers where technically required;</li>
          <li>Application version;</li>
          <li>Login timestamps;</li>
          <li>Access logs;</li>
          <li>Pages or modules accessed;</li>
          <li>Session information;</li>
          <li>Error logs;</li>
          <li>Performance information;</li>
          <li>Security-related events.</li>
        </ul>
        <p>This information helps us maintain security, troubleshoot problems, improve performance, and operate the Services.</p>
      </div>
    ),
  },
  {
    id: 'sec-8',
    num: '8',
    title: 'COOKIES',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may use cookies and similar technologies on its website and applications.</p>
        <p>Cookies may be used for:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Authentication;</li>
          <li>Maintaining login sessions;</li>
          <li>Security;</li>
          <li>Remembering preferences;</li>
          <li>Website functionality;</li>
          <li>Analytics;</li>
          <li>Performance monitoring;</li>
          <li>Improving user experience.</li>
        </ul>
        <p>Cookies may be:</p>
        <div className="space-y-2 text-xs">
          <p><strong className="text-slate-900 text-sm">Essential Cookies</strong><br />Required for core functionality and security.</p>
          <p><strong className="text-slate-900 text-sm">Preference Cookies</strong><br />Used to remember user preferences.</p>
          <p><strong className="text-slate-900 text-sm">Analytics Cookies</strong><br />Used to understand how visitors use our website and improve website performance.</p>
          <p><strong className="text-slate-900 text-sm">Marketing Cookies</strong><br />If used, these may help measure advertising or marketing activity.</p>
        </div>
        <p>Users may be able to control certain cookies through browser settings. Disabling essential cookies may affect website functionality.</p>
      </div>
    ),
  },
  {
    id: 'sec-9',
    num: '9',
    title: 'HOW WE USE INFORMATION',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may process information for the following purposes:</p>
        
        <div>
          <p className="font-bold text-slate-900 mb-1">Providing Services</p>
          <p className="text-slate-700 mb-1 text-xs">To:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Create and manage accounts;</li>
            <li>Provide OMEDO functionality;</li>
            <li>Process Customer Data;</li>
            <li>Manage patients;</li>
            <li>Generate healthcare records;</li>
            <li>Generate prescriptions and reports;</li>
            <li>Manage appointments;</li>
            <li>Manage billing;</li>
            <li>Provide hospital workflows;</li>
            <li>Provide integrations.</li>
          </ul>
        </div>

        <div>
          <p className="font-bold text-slate-900 mb-1">Security</p>
          <p className="text-slate-700 mb-1 text-xs">To:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Detect unauthorized access;</li>
            <li>Prevent fraud;</li>
            <li>Detect malicious activity;</li>
            <li>Protect accounts;</li>
            <li>Investigate security incidents;</li>
            <li>Maintain audit logs.</li>
          </ul>
        </div>

        <div>
          <p className="font-bold text-slate-900 mb-1">Support</p>
          <p className="text-slate-700 mb-1 text-xs">To:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Respond to support requests;</li>
            <li>Troubleshoot technical problems;</li>
            <li>Provide implementation assistance;</li>
            <li>Diagnose software issues;</li>
            <li>Provide training where applicable.</li>
          </ul>
        </div>

        <div>
          <p className="font-bold text-slate-900 mb-1">Product Improvement</p>
          <p className="text-slate-700 mb-1 text-xs">We may use appropriately limited technical and operational information to:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Improve performance;</li>
            <li>Fix bugs;</li>
            <li>Improve usability;</li>
            <li>Develop new features;</li>
            <li>Monitor reliability.</li>
          </ul>
          <p className="mt-2 text-slate-700 font-semibold">
            We will not use identifiable Patient Data for unrelated product-development purposes merely because such data is available to us.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'sec-10',
    num: '10',
    title: 'LEGAL BASIS / PERMITTED PURPOSES FOR PROCESSING',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may process personal information where permitted or required under applicable law, including where processing is:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Based on consent;</li>
          <li>Necessary to provide requested Services;</li>
          <li>Necessary to perform an agreement;</li>
          <li>Necessary to comply with a legal obligation;</li>
          <li>Necessary to protect security or prevent fraud;</li>
          <li>Otherwise permitted under applicable law.</li>
        </ul>
        <p>
          The Digital Personal Data Protection Act, 2023 establishes a framework for processing digital personal data while recognizing individuals&apos; rights and lawful processing requirements. The Government notified the Digital Personal Data Protection Rules, 2025 on 13 November 2025 with phased commencement provisions. (MeitY)
        </p>
        <p>
          OMEDO will adapt its privacy and data-handling practices as applicable provisions become effective and as regulatory requirements develop.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-11',
    num: '11',
    title: "CUSTOMER DATA AND OMEDO'S ROLE",
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>For healthcare organizations using OMEDO, the Customer generally determines:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>What Patient Data is collected;</li>
          <li>Why it is collected;</li>
          <li>Which Users can access it;</li>
          <li>How it is used within the healthcare organization;</li>
          <li>How long it should be retained;</li>
          <li>When it should be deleted or archived.</li>
        </ul>
        <p>
          OMEDO primarily provides the technology infrastructure and services necessary to process such information on behalf of the Customer.
        </p>
        <p>
          The precise legal roles of OMEDO and the Customer may depend on the particular service, processing activity, contractual arrangement, and applicable law.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-12',
    num: '12',
    title: 'DATA SHARING AND DISCLOSURE',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p className="font-bold text-slate-900">OMEDO does not sell Patient Data.</p>
        <p>We may disclose or provide access to information where reasonably necessary to provide the Services or where legally permitted or required.</p>
        <p>This may include:</p>
        
        <div>
          <p className="font-bold text-slate-900 mb-1">12.1 Customer and Authorized Users</p>
          <p className="text-slate-700">Information may be accessible to authorized Users of the healthcare organization according to roles and permissions configured by the Customer.</p>
        </div>

        <div>
          <p className="font-bold text-slate-900 mb-1">12.2 Service Providers</p>
          <p className="text-slate-700 mb-1">We may use trusted third-party service providers for services such as:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Cloud hosting;</li>
            <li>Data storage;</li>
            <li>Backup;</li>
            <li>SMS;</li>
            <li>Email;</li>
            <li>WhatsApp or communication services;</li>
            <li>Payment processing;</li>
            <li>Analytics;</li>
            <li>Security;</li>
            <li>Technical infrastructure;</li>
            <li>Customer support.</li>
          </ul>
          <p className="mt-1 text-slate-700">
            Such providers may process information only as necessary for the services they provide and subject to appropriate contractual or legal requirements.
          </p>
        </div>

        <div>
          <p className="font-bold text-slate-900 mb-1">12.3 Government / Regulatory Authorities</p>
          <p className="text-slate-700">Information may be disclosed where required by applicable law, court order, regulatory requirement, or lawful government request.</p>
        </div>

        <div>
          <p className="font-bold text-slate-900 mb-1">12.4 Healthcare Integrations</p>
          <p className="text-slate-700">Information may be shared with third-party or government healthcare systems when such sharing is initiated or authorized through the relevant OMEDO functionality and permitted under applicable law.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'sec-13',
    num: '13',
    title: 'THIRD-PARTY INTEGRATIONS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may integrate with third-party services, including:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>ABDM/ABHA;</li>
          <li>Payment gateways;</li>
          <li>SMS providers;</li>
          <li>Email providers;</li>
          <li>WhatsApp or communication providers;</li>
          <li>Insurance/TPA systems;</li>
          <li>Banking services;</li>
          <li>Laboratory systems;</li>
          <li>Medical devices;</li>
          <li>Other healthcare APIs.</li>
        </ul>
        <p>Each third-party service may have its own privacy policy and terms.</p>
        <p>OMEDO is not responsible for privacy practices independently controlled by third-party providers.</p>
        <p>Customers should review the relevant third-party policies before enabling an integration.</p>
      </div>
    ),
  },
  {
    id: 'sec-14',
    num: '14',
    title: 'DATA SECURITY',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO takes reasonable technical and organizational measures designed to protect personal information against unauthorized:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Access;</li>
          <li>Disclosure;</li>
          <li>Modification;</li>
          <li>Loss;</li>
          <li>Destruction;</li>
          <li>Misuse.</li>
        </ul>
        <p>Depending on the service and technical architecture, security measures may include:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Authentication;</li>
          <li>Role-based access controls;</li>
          <li>Access restrictions;</li>
          <li>Encryption where applicable;</li>
          <li>Secure communications;</li>
          <li>Logging and monitoring;</li>
          <li>Backup mechanisms;</li>
          <li>Security updates;</li>
          <li>Infrastructure controls;</li>
          <li>Incident monitoring.</li>
        </ul>
        <p>No internet-based system can be guaranteed to be completely secure.</p>
        <p>Therefore, while OMEDO takes reasonable measures to protect information, we cannot guarantee absolute security against every possible threat.</p>
      </div>
    ),
  },
  {
    id: 'sec-15',
    num: '15',
    title: 'ROLE-BASED ACCESS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may provide role-based access controls.</p>
        <p>For example:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Doctor;</li>
          <li>Nurse;</li>
          <li>Receptionist;</li>
          <li>Pharmacist;</li>
          <li>Lab Technician;</li>
          <li>Accountant;</li>
          <li>Administrator;</li>
          <li>Super Administrator.</li>
        </ul>
        <p>The Customer is responsible for configuring appropriate permissions and ensuring that Users receive only the access necessary for their role.</p>
        <p>The Customer should promptly disable accounts belonging to employees or Users who no longer require access.</p>
      </div>
    ),
  },
  {
    id: 'sec-16',
    num: '16',
    title: 'AUDIT LOGS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may maintain logs relating to activities performed within the system.</p>
        <p>Audit information may include:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>User login;</li>
          <li>Logout;</li>
          <li>Record access;</li>
          <li>Record creation;</li>
          <li>Record modification;</li>
          <li>Record deletion;</li>
          <li>Prescription activity;</li>
          <li>Billing activity;</li>
          <li>Administrative changes;</li>
          <li>Security events.</li>
        </ul>
        <p>Audit logs may be used for:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Security;</li>
          <li>Troubleshooting;</li>
          <li>Compliance;</li>
          <li>Accountability;</li>
          <li>Fraud detection;</li>
          <li>System administration.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sec-17',
    num: '17',
    title: 'DATA RETENTION',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>
          OMEDO retains information only for as long as reasonably necessary for the purposes for which it was collected, to provide the Services, to comply with contractual requirements, to meet legal obligations, resolve disputes, enforce agreements, and maintain appropriate security and operational records.
        </p>
        <p>For Patient Data stored on behalf of a healthcare Customer, retention may primarily be determined by:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>The Customer&apos;s requirements;</li>
          <li>Applicable healthcare laws;</li>
          <li>Regulatory requirements;</li>
          <li>The Customer&apos;s data-retention policy;</li>
          <li>Contractual arrangements with OMEDO.</li>
        </ul>
        <p>Different categories of information may therefore be retained for different periods.</p>
      </div>
    ),
  },
  {
    id: 'sec-18',
    num: '18',
    title: 'DATA DELETION',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Subject to applicable law and contractual obligations, personal information may be deleted, anonymized, or otherwise disposed of when it is no longer required for the relevant purpose.</p>
        <p>A Customer may request deletion or export of Customer Data in accordance with the applicable agreement and technical capabilities of the Services.</p>
        <p>Certain information may need to be retained where required by law, regulatory obligations, security requirements, financial records, dispute resolution, or legitimate operational requirements.</p>
      </div>
    ),
  },
  {
    id: 'sec-19',
    num: '19',
    title: 'DATA EXPORT',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Where technically supported, Customers may request an export of their Customer Data.</p>
        <p>Data export may be provided in formats supported by OMEDO.</p>
        <p>Large-scale migration, historical data extraction, database-level exports, or specialized migration services may be subject to additional technical or commercial requirements.</p>
      </div>
    ),
  },
  {
    id: 'sec-20',
    num: '20',
    title: 'PATIENT RIGHTS AND CUSTOMER RESPONSIBILITIES',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Patients and other individuals whose information is processed through OMEDO may have rights under applicable law.</p>
        <p>Depending on the applicable legal framework, such rights may include rights relating to:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Access to personal information;</li>
          <li>Correction;</li>
          <li>Updating inaccurate information;</li>
          <li>Withdrawal of consent where applicable;</li>
          <li>Erasure/deletion where legally applicable;</li>
          <li>Grievance redressal;</li>
          <li>Other rights provided by applicable law.</li>
        </ul>
        <p>
          Because OMEDO frequently processes Patient Data on behalf of healthcare organizations, individuals may need to submit requests to the hospital, clinic, doctor, or healthcare organization that collected their information.
        </p>
        <p>Where OMEDO is legally responsible for handling a particular request directly, we will provide an appropriate mechanism for doing so.</p>
      </div>
    ),
  },
  {
    id: 'sec-21',
    num: '21',
    title: "CHILDREN'S DATA",
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may process information relating to minors as part of providing healthcare-management functionality to hospitals and clinics.</p>
        <p>The healthcare organization using OMEDO is responsible for ensuring that appropriate legal requirements, permissions, parental/guardian requirements, and healthcare procedures are followed when collecting and processing information relating to children.</p>
        <p>OMEDO will process such information only as necessary to provide the relevant Services or as otherwise permitted or required by law.</p>
      </div>
    ),
  },
  {
    id: 'sec-22',
    num: '22',
    title: 'MARKETING COMMUNICATIONS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Where permitted by law and subject to applicable consent or communication preferences, OMEDO may send:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Product updates;</li>
          <li>Service announcements;</li>
          <li>Training information;</li>
          <li>Security notices;</li>
          <li>Important account communications;</li>
          <li>Promotional communications.</li>
        </ul>
        <p>Users may opt out of non-essential marketing communications.</p>
        <p>We may continue to send essential communications relating to accounts, security, payments, service availability, and contractual obligations.</p>
      </div>
    ),
  },
  {
    id: 'sec-23',
    num: '23',
    title: 'ANALYTICS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may use analytics technologies to understand:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Website traffic;</li>
          <li>Feature usage;</li>
          <li>Performance;</li>
          <li>User interaction;</li>
          <li>Errors;</li>
          <li>Device/browser information.</li>
        </ul>
        <p>Analytics data may be aggregated or otherwise processed to improve the Services.</p>
        <p className="font-semibold text-slate-900">
          OMEDO will not intentionally use identifiable Patient Medical Records for general marketing analytics.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-24',
    num: '24',
    title: 'PAYMENT INFORMATION',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Where Customers make payments for OMEDO services, payment transactions may be processed through third-party payment providers.</p>
        <p>OMEDO may receive limited transaction information such as:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Transaction ID;</li>
          <li>Payment status;</li>
          <li>Amount;</li>
          <li>Date;</li>
          <li>Payment reference.</li>
        </ul>
        <p>Where payment card or banking information is processed directly by a third-party payment provider, OMEDO may not receive or store the complete payment credentials.</p>
        <p>The third-party provider&apos;s privacy policy will apply to information processed directly by that provider.</p>
      </div>
    ),
  },
  {
    id: 'sec-25',
    num: '25',
    title: 'INTERNATIONAL DATA TRANSFERS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>
          Depending on the infrastructure and third-party service providers used, personal information may be processed or stored in India or other jurisdictions, subject to applicable law and contractual arrangements.
        </p>
        <p>
          Where applicable law imposes restrictions on cross-border transfer or processing of personal data, OMEDO will take reasonable steps to comply with those requirements.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-26',
    num: '26',
    title: 'DATA BREACH AND SECURITY INCIDENTS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>If OMEDO becomes aware of a security incident involving personal information, we will take reasonable steps to:</p>
        <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
          <li>Investigate the incident;</li>
          <li>Contain the incident;</li>
          <li>Mitigate potential harm;</li>
          <li>Restore affected services;</li>
          <li>Take corrective measures;</li>
          <li>Provide notifications where required by applicable law.</li>
        </ol>
        <p>Where Patient Data is processed on behalf of a Customer, OMEDO may coordinate with the Customer regarding incident response and legally required notifications.</p>
      </div>
    ),
  },
  {
    id: 'sec-27',
    num: '27',
    title: 'CUSTOMER RESPONSIBILITY FOR PRIVACY',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Customers using OMEDO are responsible for:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Providing appropriate privacy notices to patients;</li>
          <li>Obtaining required consent;</li>
          <li>Configuring user permissions;</li>
          <li>Maintaining accurate records;</li>
          <li>Protecting login credentials;</li>
          <li>Restricting unauthorized access;</li>
          <li>Following applicable healthcare and data-protection requirements;</li>
          <li>Responding to patient requests where applicable;</li>
          <li>Establishing appropriate retention practices.</li>
        </ul>
        <p>OMEDO provides technology to support these processes but does not replace the Customer&apos;s legal or professional responsibilities.</p>
      </div>
    ),
  },
  {
    id: 'sec-28',
    num: '28',
    title: 'PRIVACY OF THE OMEDO WEBSITE',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>The OMEDO public website may collect information differently from the OMEDO healthcare application.</p>
        <p>For example, visitors to the website may provide:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Name;</li>
          <li>Email;</li>
          <li>Phone number;</li>
          <li>Organization name;</li>
          <li>Enquiry details;</li>
          <li>Demo requests;</li>
          <li>Contact information.</li>
        </ul>
        <p>This information may be used to:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Respond to enquiries;</li>
          <li>Schedule demonstrations;</li>
          <li>Provide information about OMEDO;</li>
          <li>Communicate regarding products and services;</li>
          <li>Improve our website and services.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sec-29',
    num: '29',
    title: 'SOCIAL MEDIA AND EXTERNAL LINKS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>The OMEDO website may contain links to external websites, applications, or social media platforms.</p>
        <p>OMEDO does not control the privacy practices of those external services.</p>
        <p>Users should review the privacy policies of third-party websites before submitting personal information.</p>
      </div>
    ),
  },
  {
    id: 'sec-30',
    num: '30',
    title: 'CHANGES TO THIS PRIVACY POLICY',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may update this Privacy Policy from time to time.</p>
        <p>Changes may be made due to:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>New features;</li>
          <li>Changes in technology;</li>
          <li>Changes in data-processing practices;</li>
          <li>New legal requirements;</li>
          <li>Regulatory developments;</li>
          <li>Security improvements.</li>
        </ul>
        <p>The updated Privacy Policy will be published on the OMEDO website with an updated &quot;Last Updated&quot; date.</p>
        <p>Where required by law, OMEDO may provide additional notice regarding material changes.</p>
      </div>
    ),
  },
  {
    id: 'sec-31',
    num: '31',
    title: 'GRIEVANCE REDRESSAL',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>If you have a concern regarding the processing of your personal information, you may contact OMEDO using the contact information below.</p>
        <p>We will review and address privacy-related complaints in accordance with applicable law and our internal procedures.</p>
        <p>For Patient Data processed on behalf of a hospital, clinic, or healthcare organization, individuals may also need to contact the relevant healthcare organization directly.</p>
      </div>
    ),
  },
  {
    id: 'sec-32',
    num: '32',
    title: 'CONTACT US',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <p className="font-bold text-slate-900">OMEDO Software Solutions Private Limited</p>
          <div>
            <p className="font-semibold text-slate-800">Address:</p>
            <p className="text-slate-700">H-11, Sector-23, Sanjay Nagar,<br />Ghaziabad – 201002,<br />Uttar Pradesh, India</p>
          </div>
          <p className="text-slate-700"><strong>Email:</strong> <a href="mailto:privacy@omedosoft.com" className="text-[#00685e] hover:underline">privacy@omedosoft.com</a></p>
          <p className="text-slate-700"><strong>Support:</strong> <a href="mailto:support@omedosoft.com" className="text-[#00685e] hover:underline">support@omedosoft.com</a></p>
          <p className="text-slate-700"><strong>Website:</strong> <a href="https://www.omedosoft.com" target="_blank" rel="noopener noreferrer" className="text-[#00685e] hover:underline">www.omedosoft.com</a></p>
          <p className="text-slate-700"><strong>Phone:</strong> +91 96500 00000</p>
        </div>
      </div>
    ),
  },
  {
    id: 'sec-33',
    num: '33',
    title: 'IMPORTANT LEGAL NOTICE',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>
          This Privacy Policy describes OMEDO&apos;s intended privacy and data-handling practices. It does not override any specific contractual agreement entered into between OMEDO and a Customer.
        </p>
        <p>
          Where a separate written agreement, Data Processing Agreement, Service Agreement, or other legally binding document contains specific data-processing obligations, those provisions may apply to the extent of any inconsistency.
        </p>
      </div>
    ),
  },
]

export default function Privacy() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isTocCollapsed, setIsTocCollapsed] = useState(false)

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections
    const q = searchQuery.toLowerCase()
    return sections.filter((s) => s.title.toLowerCase().includes(q) || s.num.includes(q))
  }, [searchQuery])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.div {...pageTransition} className="min-h-screen bg-[#f8fdfe] pt-24 sm:pt-28 pb-16">
      
      {/* ── HEADER HERO ── */}
      <section className="bg-gradient-to-b from-[#effcfe] via-[#f5fdfe] to-[#f8fdfe] py-10 sm:py-16 border-b border-[#bcc9c6]/30">
        <div className="site-wrapper text-center max-w-6xl mx-auto px-4 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#afecde]/80 text-[#00685e] text-xs sm:text-sm font-bold shadow-xs">
            <span className="material-symbols-outlined text-base">shield</span>
            <span>Privacy &amp; Data Governance</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121d1f] tracking-tight leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Privacy <span className="text-[#00685e]">Policy</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto font-medium">
            Last Updated: <strong className="text-slate-900 font-bold">25-08-2026</strong>
          </p>

          {/* Intro Notice Banner (Word-for-Word from Document) */}
          <div className="w-full text-left p-6 sm:p-8 lg:p-10 bg-white rounded-3xl border border-[#00685e]/30 shadow-lg text-sm sm:text-base text-slate-800 leading-relaxed space-y-4">
            <p>
              <strong>OMEDO Software Solutions Private Limited</strong> (&quot;OMEDO&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects the privacy of individuals and is committed to protecting personal information processed through the OMEDO platform, website, applications, and related services.
            </p>
            <p className="text-slate-700">
              This Privacy Policy explains how we collect, use, disclose, store, protect, and otherwise process information when you access or use OMEDO, our hospital and healthcare management software platform.
            </p>
            <div className="p-4 sm:p-5 bg-[#effcfe] border border-[#afecde] rounded-2xl space-y-1">
              <p className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                OMEDO is owned and operated by:
              </p>
              <p className="text-slate-800 text-xs sm:text-sm">
                <strong>OMEDO Software Solutions Private Limited</strong><br />
                Address: H-11, Sector-23, Sanjay Nagar, Ghaziabad – 201002, Uttar Pradesh, India
              </p>
              <p className="text-slate-600 text-xs pt-1">
                This Privacy Policy should be read together with our <Link to="/terms" className="text-[#00685e] font-bold underline">Terms &amp; Conditions</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER (WIDER) ── */}
      <section className="site-wrapper py-8 sm:py-12 px-4 max-w-6xl mx-auto space-y-8">
        
        {/* ── TABLE OF CONTENTS CARD (COMPACT & STREAMLINED) ── */}
        <div id="table-of-contents" className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#bcc9c6]/50 shadow-xs space-y-3 scroll-mt-28">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#effcfe] text-[#00685e] border border-[#afecde] flex items-center justify-center">
                <span className="material-symbols-outlined text-base">format_list_bulleted</span>
              </div>
              <h2 className="text-sm font-bold text-[#121d1f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Table of Contents
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#afecde] text-[#00685e]">
                33 Clauses
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-56">
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Filter clauses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1 rounded-lg text-xs border border-slate-200 focus:outline-none focus:border-[#00685e] focus:ring-1 focus:ring-[#00685e]/20"
                />
              </div>

              {/* Collapse/Expand toggle */}
              <button
                type="button"
                onClick={() => setIsTocCollapsed(!isTocCollapsed)}
                className="px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-sm">
                  {isTocCollapsed ? 'expand_more' : 'expand_less'}
                </span>
                <span>{isTocCollapsed ? 'Show' : 'Hide'}</span>
              </button>

              {/* Print Button */}
              <button
                type="button"
                onClick={() => window.print()}
                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-xs">print</span>
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>

          {/* Compact 4-Column Grid of Clauses with Smooth Scroll */}
          {!isTocCollapsed && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 max-h-52 overflow-y-auto pr-1">
              {filteredSections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToSection(s.id)}
                  className="w-full text-left py-1.5 px-2 rounded-lg bg-[#effcfe]/30 hover:bg-[#effcfe] border border-transparent hover:border-[#afecde] text-slate-700 hover:text-[#00685e] transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-md bg-white border border-[#afecde] font-mono font-bold text-[9px] text-[#00685e] flex items-center justify-center shrink-0 group-hover:bg-[#00685e] group-hover:text-white transition-colors">
                    {s.num}
                  </span>
                  <span className="truncate font-medium text-[11px]">
                    {s.title}
                  </span>
                </button>
              ))}
            </div>
          )}

        </div>

        {/* ── ALL 33 CLAUSES ── */}
        <div className="space-y-6">
          {sections.map((sec) => (
            <div
              key={sec.id}
              id={sec.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#bcc9c6]/40 shadow-xs hover:border-[#00685e]/40 transition-all scroll-mt-28 space-y-4"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#effcfe] text-[#00685e] border border-[#afecde] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {sec.num}
                  </span>
                  <h3
                    className="text-base sm:text-lg font-bold text-[#121d1f] tracking-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {sec.num}. {sec.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('table-of-contents')}
                  className="text-[11px] font-semibold text-[#00685e] hover:underline flex items-center gap-0.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                >
                  <span>Top</span>
                  <span className="material-symbols-outlined text-xs">arrow_upward</span>
                </button>
              </div>

              <div className="pt-1">
                {sec.content}
              </div>
            </div>
          ))}

          {/* Bottom Legal Support Card */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#00685e] to-[#004d46] text-white rounded-3xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-base sm:text-lg font-bold">Have questions about our Privacy Policy?</div>
              <div className="text-xs text-white/80">Our data governance and compliance team is available to assist you.</div>
            </div>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-full bg-white text-[#00685e] font-bold text-xs hover:bg-[#effcfe] transition-all shadow-sm shrink-0"
            >
              Contact Privacy Team
            </Link>
          </div>
        </div>

      </section>

      {/* ── FLOATING QUICK TOP / TOC BUTTON ── */}
      <button
        type="button"
        onClick={() => scrollToSection('table-of-contents')}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#00685e] text-white shadow-xl hover:bg-[#005049] transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
        title="Jump to Table of Contents"
      >
        <span className="material-symbols-outlined text-base">format_list_bulleted</span>
        <span className="hidden sm:inline">Table of Contents</span>
      </button>

    </motion.div>
  )
}
