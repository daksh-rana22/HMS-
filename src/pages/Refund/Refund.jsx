import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageTransition } from '../../utils/animations'

const sections = [
  {
    id: 'sec-1',
    num: '1',
    title: 'GENERAL POLICY',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>
          OMEDO provides healthcare management software and related technology services primarily to hospitals, clinics, nursing homes, doctors, diagnostic centres, and other healthcare organizations.
        </p>
        <p>
          Because OMEDO services may involve software configuration, implementation, data migration, customization, training, integration, and allocation of technical resources, payments are generally non-refundable once the applicable service or subscription has commenced, except where expressly stated in this Policy or agreed separately in writing.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-2',
    num: '2',
    title: 'SUBSCRIPTION CANCELLATION',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>
          Customers may request cancellation of their OMEDO subscription by contacting OMEDO through the registered email address or other authorized communication channel.
        </p>
        <p>Cancellation requests should include:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Customer/Hospital name;</li>
          <li>Registered email address;</li>
          <li>Subscription/account details;</li>
          <li>Reason for cancellation, where applicable;</li>
          <li>Requested cancellation date.</li>
        </ul>
        <p>
          Cancellation will generally become effective at the end of the current paid subscription period unless otherwise agreed.
        </p>
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="font-bold text-amber-900 mb-1">Important</p>
          <p className="text-amber-800 text-xs sm:text-sm">
            Cancellation of a subscription does not automatically entitle the Customer to a refund for the unused portion of an already-paid subscription period.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'sec-3',
    num: '3',
    title: 'MONTHLY SUBSCRIPTIONS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>For monthly subscriptions:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>The Customer may cancel before the next billing cycle.</li>
          <li>Cancellation will normally prevent the next recurring charge.</li>
          <li>The Customer may continue using the Services until the end of the already-paid billing period.</li>
          <li>Amounts already paid for the current billing period are generally non-refundable.</li>
        </ul>
        <p>
          If the Customer has subscribed through a separate written agreement, the cancellation terms in that agreement will prevail.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-4',
    num: '4',
    title: 'ANNUAL SUBSCRIPTIONS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>For annual subscriptions:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Customers may request cancellation at any time.</li>
          <li>Cancellation will normally prevent renewal for the following subscription period.</li>
          <li>Fees already paid for the current annual subscription are generally non-refundable, including where the Customer stops using the Services before the end of the subscription period.</li>
        </ul>
        <p>
          Any exception will be considered only where specifically agreed in writing or required under applicable law.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-5',
    num: '5',
    title: 'FREE TRIAL / DEMO',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Where OMEDO offers a free trial or demonstration:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>No refund is applicable because no subscription payment has been made.</li>
          <li>Trial accounts may have limited functionality.</li>
          <li>OMEDO may modify or discontinue a trial program at any time.</li>
          <li>Customer Data entered during a trial may be deleted after the trial period, subject to applicable retention requirements.</li>
        </ul>
        <p className="font-semibold text-slate-900">
          Customers should not use a free trial as their sole storage location for important healthcare information.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-6',
    num: '6',
    title: 'IMPLEMENTATION AND ONBOARDING FEES',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Implementation and onboarding may include:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Software configuration;</li>
          <li>Master creation;</li>
          <li>Hospital setup;</li>
          <li>User setup;</li>
          <li>Workflow configuration;</li>
          <li>Data migration;</li>
          <li>Training;</li>
          <li>Testing;</li>
          <li>Deployment;</li>
          <li>Technical consultation.</li>
        </ul>
        <p>
          Once implementation work has commenced, implementation and onboarding charges are generally non-refundable.
        </p>
        <p>
          If the Customer cancels before implementation work begins, OMEDO may, at its discretion, provide a refund after deducting any costs or work already incurred.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-7',
    num: '7',
    title: 'CUSTOMIZATION & DEVELOPMENT SERVICES',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may provide customized development, reports, integrations, workflows, APIs, forms, or other software modifications.</p>
        <p className="font-semibold text-slate-900">Unless otherwise agreed in writing:</p>
        <p>Payments made toward customization or development work are non-refundable once development has commenced.</p>
        <p>Where a project is cancelled after development begins, OMEDO may charge for the work completed up to the cancellation date.</p>
      </div>
    ),
  },
  {
    id: 'sec-8',
    num: '8',
    title: 'THIRD-PARTY INTEGRATIONS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may incur costs from third-party services or providers, including:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>SMS;</li>
          <li>WhatsApp;</li>
          <li>Payment gateways;</li>
          <li>Banking APIs;</li>
          <li>ABDM/ABHA-related integrations;</li>
          <li>Cloud services;</li>
          <li>External APIs;</li>
          <li>Software licenses;</li>
          <li>Hardware or device integrations.</li>
        </ul>
        <p>
          Fees already paid or incurred for third-party services may be non-refundable, even if the Customer subsequently cancels its OMEDO subscription.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-9',
    num: '9',
    title: 'DATA MIGRATION SERVICES',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>If OMEDO provides data migration services from another software system, the applicable migration charges may include:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Data extraction;</li>
          <li>Data cleaning;</li>
          <li>Data transformation;</li>
          <li>Data mapping;</li>
          <li>Data validation;</li>
          <li>Import;</li>
          <li>Testing.</li>
        </ul>
        <p>Once migration work has commenced, migration fees are generally non-refundable.</p>
        <p>The Customer remains responsible for providing accurate and legally usable source data.</p>
      </div>
    ),
  },
  {
    id: 'sec-10',
    num: '10',
    title: 'TRAINING FEES',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Where training is purchased separately, including:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>On-site training;</li>
          <li>Online training;</li>
          <li>User training;</li>
          <li>Administrator training;</li>
          <li>Specialized module training;</li>
        </ul>
        <p>the applicable fees are generally non-refundable once the training session or training program has commenced.</p>
        <p>If a scheduled training session is cancelled or rescheduled by the Customer, OMEDO may apply its applicable rescheduling terms.</p>
      </div>
    ),
  },
  {
    id: 'sec-11',
    num: '11',
    title: 'AMC / SUPPORT / MAINTENANCE',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>
          Annual Maintenance Contracts (&quot;AMC&quot;), support plans, maintenance services, and similar recurring service charges are generally non-refundable once the applicable service period has commenced.
        </p>
        <p>Cancellation of an AMC will generally prevent renewal for the next applicable period.</p>
      </div>
    ),
  },
  {
    id: 'sec-12',
    num: '12',
    title: "REFUND DUE TO OMEDO'S FAILURE TO PROVIDE SERVICE",
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>
          If OMEDO is unable to provide a contracted Service due to a material failure solely attributable to OMEDO, the Customer may contact OMEDO and request a review.
        </p>
        <p>OMEDO may, depending on the circumstances:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Correct the issue;</li>
          <li>Extend the subscription period;</li>
          <li>Provide service credits;</li>
          <li>Provide a partial refund; or</li>
          <li>Provide another commercially reasonable remedy.</li>
        </ul>
        <p>Any refund will be determined based on the specific circumstances, applicable agreement, and applicable law.</p>
      </div>
    ),
  },
  {
    id: 'sec-13',
    num: '13',
    title: 'DUPLICATE PAYMENTS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>If a Customer accidentally makes a duplicate payment for the same invoice or subscription, the Customer should notify OMEDO promptly.</p>
        <p>After verification, OMEDO may:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Adjust the excess amount against a future invoice; or</li>
          <li>Refund the duplicate amount through the original or an appropriate payment method.</li>
        </ul>
        <p>Applicable payment processing charges, taxes, or bank charges may be deducted where legally and commercially appropriate.</p>
      </div>
    ),
  },
  {
    id: 'sec-14',
    num: '14',
    title: 'FAILED TRANSACTIONS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>
          If money has been debited from a Customer&apos;s bank account or payment method but the OMEDO transaction is shown as failed or incomplete, the Customer should contact OMEDO with the transaction details.
        </p>
        <p>OMEDO will verify the transaction with the applicable payment provider.</p>
        <p>Where the payment was successfully received by OMEDO but the service was not activated, the amount may be:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Applied to the Customer&apos;s account; or</li>
          <li>Refunded after verification.</li>
        </ul>
        <p>Banking and payment-provider processing times may apply.</p>
      </div>
    ),
  },
  {
    id: 'sec-15',
    num: '15',
    title: 'TAXES',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Refund calculations may take into account applicable taxes, including GST.</p>
        <p>Where a tax invoice has already been issued, any refund or credit will be processed in accordance with applicable tax requirements.</p>
        <p>OMEDO may issue appropriate credit notes or other documentation where required.</p>
      </div>
    ),
  },
  {
    id: 'sec-16',
    num: '16',
    title: 'REFUND PROCESS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Where a refund is approved, the Customer may be required to provide:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Customer name;</li>
          <li>Invoice number;</li>
          <li>Transaction ID;</li>
          <li>Registered email;</li>
          <li>Bank/payment details where necessary;</li>
          <li>Any other information reasonably required to verify the transaction.</li>
        </ul>
        <p>Refunds will generally be processed through the original payment method where technically and commercially possible.</p>
        <p>
          The time taken for the refunded amount to appear in the Customer&apos;s account may depend on the payment gateway, bank, card issuer, or other financial institution.
        </p>
      </div>
    ),
  },
  {
    id: 'sec-17',
    num: '17',
    title: 'CANCELLATION DUE TO NON-PAYMENT',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may suspend or terminate Services if the Customer fails to pay applicable fees within the agreed payment period.</p>
        <p>Suspension or termination due to non-payment does not automatically create a right to a refund for amounts already paid.</p>
        <p>The Customer remains responsible for outstanding amounts incurred before termination.</p>
      </div>
    ),
  },
  {
    id: 'sec-18',
    num: '18',
    title: 'CANCELLATION BY OMEDO',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may suspend or terminate a Customer&apos;s access where permitted under the Terms &amp; Conditions, including circumstances involving:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Material breach of the agreement;</li>
          <li>Non-payment;</li>
          <li>Fraudulent activity;</li>
          <li>Unauthorized use;</li>
          <li>Security threats;</li>
          <li>Illegal activities;</li>
          <li>Misuse of the platform;</li>
          <li>Attempts to compromise OMEDO&apos;s infrastructure.</li>
        </ul>
        <p>Where termination is caused by a Customer&apos;s breach, amounts already paid will generally not be refundable.</p>
      </div>
    ),
  },
  {
    id: 'sec-19',
    num: '19',
    title: 'DATA AFTER CANCELLATION',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Cancellation of an OMEDO subscription does not necessarily mean that Customer Data is immediately deleted.</p>
        <p>Following cancellation, data may be retained for a limited period according to:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>The Customer&apos;s agreement;</li>
          <li>Data retention requirements;</li>
          <li>Applicable healthcare requirements;</li>
          <li>Legal obligations;</li>
          <li>Backup procedures;</li>
          <li>Security requirements.</li>
        </ul>
        <p>Customers should request data export or migration before termination where they require access to their data.</p>
        <p>Any professional data migration or specialized export service may be subject to additional charges.</p>
      </div>
    ),
  },
  {
    id: 'sec-20',
    num: '20',
    title: 'NON-REFUNDABLE SERVICES',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Unless otherwise expressly agreed in writing, the following are generally non-refundable after the applicable service has commenced:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Subscription fees;</li>
          <li>Implementation fees;</li>
          <li>Onboarding fees;</li>
          <li>Customization charges;</li>
          <li>Development charges;</li>
          <li>Integration charges;</li>
          <li>Data migration charges;</li>
          <li>Training charges;</li>
          <li>AMC fees;</li>
          <li>Support fees;</li>
          <li>Professional service charges;</li>
          <li>Third-party service charges.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sec-21',
    num: '21',
    title: 'EXCEPTIONS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may consider exceptions to this Policy on a case-by-case basis.</p>
        <p>Any exception:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Must be approved by OMEDO;</li>
          <li>Does not create a continuing obligation to provide refunds in similar circumstances;</li>
          <li>May be subject to applicable taxes, payment charges, and contractual terms.</li>
        </ul>
        <p>Nothing in this Policy limits any rights that cannot legally be excluded under applicable law.</p>
      </div>
    ),
  },
  {
    id: 'sec-22',
    num: '22',
    title: 'CHARGEBACKS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>Customers should contact OMEDO first regarding any billing dispute.</p>
        <p>Unauthorized chargebacks or payment reversals without first providing OMEDO an opportunity to investigate may result in:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Temporary account suspension;</li>
          <li>Investigation of the account;</li>
          <li>Recovery of legitimate outstanding amounts;</li>
          <li>Additional administrative or payment-provider charges where permitted.</li>
        </ul>
        <p>This section does not restrict any rights available to Customers under applicable law.</p>
      </div>
    ),
  },
  {
    id: 'sec-23',
    num: '23',
    title: 'CONTACT FOR CANCELLATION & REFUND REQUESTS',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>For cancellation or refund-related requests, please contact:</p>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <p className="font-bold text-slate-900">OMEDO Software Solutions Private Limited</p>
          <div>
            <p className="font-semibold text-slate-800">Address:</p>
            <p className="text-slate-700">H-11, Sector-23, Sanjay Nagar,<br />Ghaziabad – 201002,<br />Uttar Pradesh, India</p>
          </div>
          <p className="text-slate-700"><strong>Email:</strong> <a href="mailto:billing@omedosoft.com" className="text-[#00685e] hover:underline">billing@omedosoft.com</a></p>
          <p className="text-slate-700"><strong>Support:</strong> <a href="mailto:support@omedosoft.com" className="text-[#00685e] hover:underline">support@omedosoft.com</a></p>
          <p className="text-slate-700"><strong>Website:</strong> <a href="https://www.omedosoft.com" target="_blank" rel="noopener noreferrer" className="text-[#00685e] hover:underline">www.omedosoft.com</a></p>
          <p className="text-slate-700"><strong>Phone:</strong> +91 96500 00000</p>
        </div>
      </div>
    ),
  },
  {
    id: 'sec-24',
    num: '24',
    title: 'CHANGES TO THIS POLICY',
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <p>OMEDO may update this Refund &amp; Cancellation Policy from time to time.</p>
        <p>Any updated version will be published on the OMEDO website along with the revised &quot;Last Updated&quot; date.</p>
      </div>
    ),
  },
]

export default function Refund() {
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
            <span className="material-symbols-outlined text-base">payments</span>
            <span>Billing &amp; Commercial Policy</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121d1f] tracking-tight leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Refund &amp; <span className="text-[#00685e]">Cancellation Policy</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto font-medium">
            Last Updated: <strong className="text-slate-900 font-bold">25-08-2026</strong>
          </p>

          {/* Intro Notice Banner (Word-for-Word from Document) */}
          <div className="w-full text-left p-6 sm:p-8 lg:p-10 bg-white rounded-3xl border border-[#00685e]/30 shadow-lg text-sm sm:text-base text-slate-800 leading-relaxed space-y-4">
            <p>
              This Refund &amp; Cancellation Policy (&quot;Policy&quot;) applies to the products and services provided by <strong>OMEDO Software Solutions Private Limited</strong> (&quot;OMEDO&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) through OMEDO, including its software platform, website, applications, subscriptions, implementation services, integrations, customization, training, support, and other related services.
            </p>
            <div className="p-4 sm:p-5 bg-[#effcfe] border border-[#afecde] rounded-2xl space-y-1">
              <p className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                Company Address:
              </p>
              <p className="text-slate-800 text-xs sm:text-sm">
                <strong>OMEDO Software Solutions Private Limited</strong><br />
                H-11, Sector-23, Sanjay Nagar, Ghaziabad – 201002, Uttar Pradesh, India.
              </p>
              <p className="text-slate-600 text-xs pt-1">
                This Policy should be read together with OMEDO&apos;s <Link to="/terms" className="text-[#00685e] font-bold underline">Terms &amp; Conditions</Link> and <Link to="/privacy" className="text-[#00685e] font-bold underline">Privacy Policy</Link>.
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
                24 Clauses
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

        {/* ── ALL 24 CLAUSES ── */}
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
              <div className="text-base sm:text-lg font-bold">Have questions about Billing or Cancellations?</div>
              <div className="text-xs text-white/80">Our accounts and commercial support team is available to assist you.</div>
            </div>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-full bg-white text-[#00685e] font-bold text-xs hover:bg-[#effcfe] transition-all shadow-sm shrink-0"
            >
              Contact Billing Support
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
