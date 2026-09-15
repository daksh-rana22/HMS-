/**
 * Export and Download Utilities (Excel, CSV, TSV, Clipboard)
 */

/**
 * Helper to download Blob file in browser
 * @param {Blob} blob
 * @param {string} filename
 */
export function triggerBlobDownload(blob, filename) {
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

/**
 * Client-Side CSV fallback exporter
 * @param {Array} [data=[]]
 * @param {string} [filename='OMEDO_Client_Queries.csv']
 */
export function downloadClientSideExcelCSV(data = [], filename = 'OMEDO_Client_Queries.csv') {
  const headers = [
    'Query ID',
    'Date & Time',
    'Client / Doctor Name',
    'Hospital / Clinic Name',
    'Mobile Number',
    'Email Address',
    'Location',
    'Inquiry Message',
  ]
  const escapeCSV = (str) => {
    if (str === null || str === undefined) return '""'
    const s = String(str).replace(/"/g, '""')
    return `"${s}"`
  }

  const csvRows = [headers.map(escapeCSV).join(',')]
  data.forEach((item, index) => {
    const row = [
      item.id || index + 1,
      item.date || item.created_on || new Date().toLocaleDateString(),
      item.name || item.client_name || '',
      item.facility || item.hospital_clinic_name || '',
      item.mobile || '',
      item.email || '',
      item.location || item.cityName || '',
      item.message || '',
    ]
    csvRows.push(row.map(escapeCSV).join(','))
  })

  const blob = new Blob(['\ufeff' + csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' })
  triggerBlobDownload(blob, filename)
}

/**
 * Copy data formatted as TSV for pasting directly into spreadsheets
 * @param {Array} [data=[]]
 * @returns {boolean}
 */
export function copyQueryTableTSV(data = []) {
  const headers = [
    'Query ID',
    'Date & Time',
    'Client / Doctor Name',
    'Hospital / Clinic Name',
    'Mobile Number',
    'Email Address',
    'Location',
    'Inquiry Message',
  ]

  const cleanTSV = (val) => {
    if (val === undefined || val === null) return ''
    return String(val).replace(/[\t\r\n]+/g, ' ').trim()
  }

  const rows = data.map((item, idx) => [
    cleanTSV(item.id || idx + 1),
    cleanTSV(item.date || item.created_on || new Date().toLocaleDateString()),
    cleanTSV(item.name || item.client_name || ''),
    cleanTSV(item.facility || item.hospital_clinic_name || ''),
    cleanTSV(item.mobile || ''),
    cleanTSV(item.email || ''),
    cleanTSV(item.location || item.cityName || ''),
    cleanTSV(item.message || ''),
  ])

  const tsvContent = [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n')

  try {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(tsvContent)
      return true
    }
  } catch (err) {
    console.warn('Clipboard write failed:', err)
  }
  return false
}
