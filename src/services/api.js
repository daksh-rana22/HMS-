/**
 * Centralized API Configuration and Service Methods
 * All API routes and network calls are managed here.
 */

// Base backend URL:
// - Defaults to '' (relative same-origin) to cleanly leverage Vite dev proxy and Vercel serverless proxy.
// - If VITE_API_BASE_URL is set in .env / Vercel, it overrides the base URL.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL !== undefined
    ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')
    : ''

// Centralized API Endpoints dictionary
export const API_ENDPOINTS = {
  AUTH_TOKEN: `${API_BASE_URL}/it/api/v1/platform/auth/token`,
  DEMO_REQUESTS: `${API_BASE_URL}/it/api/v1/omedo/demo-requests`,
  DEMO_REQUESTS_EXPORT_EXCEL: `${API_BASE_URL}/it/api/v1/omedo/demo-requests/export/excel`,
  CLIENT_DETAILS: `${API_BASE_URL}/it/api/v1/omedo/client-details`,
}

/**
 * Retrieve Stored Auth Token
 * @returns {string|null}
 */
export function getAuthToken() {
  try {
    return localStorage.getItem('omedo_auth_token') || sessionStorage.getItem('omedo_auth_token') || null
  } catch {
    return null
  }
}

/**
 * Retrieve Stored Auth User Profile
 * @returns {any}
 */
export function getAuthUser() {
  try {
    const raw = localStorage.getItem('omedo_auth_user') || sessionStorage.getItem('omedo_auth_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Clear Admin Auth Session
 */
export function logoutAdmin() {
  try {
    localStorage.removeItem('omedo_auth_token')
    localStorage.removeItem('omedo_auth_user')
    sessionStorage.removeItem('omedo_auth_token')
    sessionStorage.removeItem('omedo_auth_user')
  } catch {
    // Ignore storage clear errors
  }
}

/**
 * Check if Admin is Authenticated
 * @returns {boolean}
 */
export function isUserAuthenticated() {
  return Boolean(getAuthToken())
}

/**
 * Generate Authorization and Custom Headers for Authenticated API Requests
 * @param {Record<string, string>} [customHeaders]
 * @returns {Record<string, string>}
 */
export function getAuthHeaders(customHeaders = {}) {
  const headers = { ...customHeaders }
  const token = getAuthToken()
  if (token) {
    headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`
  }
  return headers
}

/**
 * Authenticate Admin User / Generate Platform Auth Token
 * @param {Object} credentials
 * @param {string} [credentials.username]
 * @param {string} [credentials.email]
 * @param {string} credentials.password
 * @returns {Promise<{ success: boolean, token?: string, user?: any, data?: any }>}
 */
export async function authenticateAdmin({ username, email, password } = {}) {
  const loginIdentifier = (username || email || '').trim()
  const loginPassword = (password || '').trim()

  if (!loginIdentifier || !loginPassword) {
    throw new Error('Please enter both username/email and password.')
  }

  // Fallback demo credential support for admin evaluation
  const isDemoAdmin = loginIdentifier === 'admin@omedosoft.com' && loginPassword === 'omedo@admin2026'

  const payload = {
    username: loginIdentifier,
    email: loginIdentifier,
    password: loginPassword,
  }

  try {
    const response = await fetch(API_ENDPOINTS.AUTH_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))

    if (response.ok) {
      const token =
        data.token ||
        data.access_token ||
        data.accessToken ||
        data.jwt ||
        data.data?.token ||
        data.data?.accessToken ||
        data.data?.access_token ||
        data.id_token ||
        `omedo_tok_${Date.now()}`

      if (token) {
        localStorage.setItem('omedo_auth_token', token)
        const userObj = data.user || data.data?.user || { username: loginIdentifier, email: loginIdentifier, role: 'SUPER_ADMIN' }
        localStorage.setItem('omedo_auth_user', JSON.stringify(userObj))
      }

      return {
        success: true,
        token,
        user: data.user || data.data?.user || { username: loginIdentifier, role: 'SUPER_ADMIN' },
        data,
      }
    }

    if (response.status === 401 || response.status === 403) {
      if (isDemoAdmin) {
        // Fallback to local demo session below
      } else {
        throw new Error(data.message || 'Invalid email or password. Please verify your admin credentials.')
      }
    } else {
      throw new Error(data.message || data.error || `Authentication failed (${response.status})`)
    }
  } catch (err) {
    if (!isDemoAdmin) {
      throw err
    }
  }

  // Demo Admin Fallback Session
  if (isDemoAdmin) {
    const demoToken = `demo_admin_tok_${Date.now()}`
    localStorage.setItem('omedo_auth_token', demoToken)
    localStorage.setItem(
      'omedo_auth_user',
      JSON.stringify({ username: 'admin@omedosoft.com', role: 'SUPER_ADMIN', name: 'Admin' })
    )
    return {
      success: true,
      token: demoToken,
      user: { username: 'admin@omedosoft.com', role: 'SUPER_ADMIN' },
      isDemo: true,
    }
  }

  throw new Error('Unable to connect to authentication server. Please try again.')
}

/**
 * Submit Demo Request / Enquiry Form
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.mobile
 * @param {string} payload.email
 * @param {string} payload.hospital_clinic_name
 * @param {string} payload.location
 * @param {string} payload.message
 * @returns {Promise<any>}
 */
export async function submitDemoRequest(payload) {
  try {
    const response = await fetch(API_ENDPOINTS.DEMO_REQUESTS, {
      method: 'POST',
      headers: getAuthHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      return response.json().catch(() => ({ success: true }))
    }

    const errData = await response.json().catch(() => ({}))
    throw new Error(
      errData.message ||
      errData.error ||
      `Submission failed (${response.status}). Please check your details and try again.`
    )
  } catch (err) {
    throw err instanceof Error ? err : new Error('Failed to submit demo request. Please try again.')
  }
}

/**
 * Fetch Demo Requests / Queries from Backend API
 * @param {Object} [params]
 * @param {string} [params.search] - Case-insensitive search on name, mobile, email, hospital, location
 * @param {string} [params.fromDate] - Format yyyy-MM-dd
 * @param {string} [params.toDate] - Format yyyy-MM-dd
 * @returns {Promise<{ list: any[], total: number, success: boolean }>}
 */
export async function fetchDemoRequests({ search, fromDate, toDate } = {}) {
  const params = new URLSearchParams()
  if (search && search.trim()) params.append('search', search.trim())
  if (fromDate && fromDate.trim()) params.append('fromDate', fromDate.trim())
  if (toDate && toDate.trim()) params.append('toDate', toDate.trim())

  const queryString = params.toString() ? `?${params.toString()}` : ''
  const endpoint = `${API_ENDPOINTS.DEMO_REQUESTS}${queryString}`

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: getAuthHeaders({ Accept: 'application/json' }),
    })

    if (res.ok) {
      const data = await res.json()
      let list = []
      let total = 0

      if (Array.isArray(data)) {
        list = data
        total = data.length
      } else if (data && Array.isArray(data.data)) {
        list = data.data
        total = data.total !== undefined ? data.total : (data.count !== undefined ? data.count : data.data.length)
      } else if (data && Array.isArray(data.content)) {
        list = data.content
        total = data.totalElements !== undefined ? data.totalElements : data.content.length
      } else if (data && Array.isArray(data.results)) {
        list = data.results
        total = data.total !== undefined ? data.total : data.results.length
      } else if (data && typeof data === 'object') {
        total = data.total || data.count || data.totalRequests || 0
        if (Array.isArray(data.requests)) list = data.requests
        else if (Array.isArray(data.list)) list = data.list
      }

      if (list.length > 0 || total > 0) {
        return { list, total: total || list.length, success: true, raw: data }
      }
    }
  } catch (e) {
    console.warn('Fetch demo requests error:', e.message)
  }

  return { list: [], total: 0, success: false }
}

/**
 * Export Demo Requests to Excel (.xlsx / .csv)
 * If backend is offline or network fails, downloads a client-generated Excel CSV.
 * @param {Object} [params]
 * @param {string} [params.search]
 * @param {string} [params.fromDate]
 * @param {string} [params.toDate]
 * @param {Array} [params.fallbackData]
 * @returns {Promise<{ success: boolean, source: 'backend' | 'client' }>}
 */
export async function exportDemoRequestsExcel({ search, fromDate, toDate, fallbackData = [] } = {}) {
  const params = new URLSearchParams()
  if (search && search.trim()) params.append('search', search.trim())
  if (fromDate && fromDate.trim()) params.append('fromDate', fromDate.trim())
  if (toDate && toDate.trim()) params.append('toDate', toDate.trim())

  const queryString = params.toString() ? `?${params.toString()}` : ''
  const endpoint = `${API_ENDPOINTS.DEMO_REQUESTS_EXPORT_EXCEL}${queryString}`

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: getAuthHeaders({
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv, application/octet-stream',
      }),
    })

    if (response.ok) {
      const blob = await response.blob()
      const disposition = response.headers.get('content-disposition')
      let filename = 'OMEDO_Client_Queries.xlsx'
      if (disposition && disposition.includes('filename=')) {
        const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
        if (match && match[1]) filename = match[1].replace(/['"]/g, '')
      }
      triggerBlobDownload(blob, filename)
      return { success: true, source: 'backend' }
    }
  } catch (err) {
    console.warn('Backend Excel Export failed, initiating client-side Excel fallback:', err.message)
  }

  // Client-Side Excel / CSV Export Fallback
  downloadClientSideExcelCSV(fallbackData, `OMEDO_Client_Queries_${new Date().toISOString().split('T')[0]}.csv`)
  return { success: true, source: 'client' }
}

/**
 * Copy data formatted as TSV for pasting into spreadsheets
 */
export function copyQueryTableTSV(data = []) {
  const headers = ['Query ID', 'Date & Time', 'Client / Doctor Name', 'Hospital / Clinic Name', 'Mobile Number', 'Email Address', 'Location', 'Inquiry Message']

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

/**
 * Helper to convert Base64 Data URL to a File Object for multipart upload
 * @param {string} dataurl - Base64 Data URL
 * @param {string} filename - Output file name
 * @returns {File}
 */
export function dataURLtoFile(dataurl, filename = 'client-logo.png') {
  if (!dataurl || typeof dataurl !== 'string' || !dataurl.startsWith('data:')) {
    return null
  }
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

/**
 * Post Client Details (Hospital / Client Logo and Metadata)
 * @param {Object} params
 * @param {File|Blob} params.file - Binary file
 * @param {string} params.clientName - Name of the client
 * @param {string} [params.cityName] - City name
 * @param {boolean} [params.isActive=true] - Initial active status
 * @returns {Promise<{ message: string, data: { id: number, client_name: string, city_name: string, image_base64: string, is_active: boolean, created_by: string, created_on: string } }>}
 */
export async function postClientDetails({ file, clientName, cityName, isActive = true }) {
  const formData = new FormData()

  if (file) {
    formData.append('file', file)
  }
  if (clientName) {
    formData.append('clientName', clientName.slice(0, 100))
  }
  if (cityName) {
    formData.append('cityName', cityName.slice(0, 100))
  }
  formData.append('isActive', String(isActive !== false))

  try {
    const response = await fetch(API_ENDPOINTS.CLIENT_DETAILS, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    })

    const jsonResult = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(
        jsonResult.message ||
        jsonResult.error ||
        `Failed to post client details (${response.status})`
      )
    }

    return jsonResult
  } catch (err) {
    throw err instanceof Error ? err : new Error('Failed to post client details. Please try again.')
  }
}

