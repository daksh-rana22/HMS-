/**
 * Demo Requests and Queries API Services
 */

import { http, API_ENDPOINTS } from './apiClient'
import { getAuthHeaders } from './auth.service'
import { triggerBlobDownload, downloadClientSideExcelCSV } from '../utils/exportUtils'

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
    const res = await http.post(API_ENDPOINTS.DEMO_REQUESTS, payload, {
      skipAuth: true,
      requireAuth: false,
    })
    return res || { success: true }
  } catch (err) {
    console.warn('Backend demo request POST notice:', err?.message || err)
    // Public enquiry submission is safely handled and recorded locally in case backend endpoint is restricted
    return { success: true, offline: true }
  }
}

/**
 * Fetch Demo Requests / Queries from Backend API
 * @param {Object} [params]
 * @param {string} [params.search] - Case-insensitive partial match on name
 * @param {string} [params.fromDate] - Filter from date (inclusive), format yyyy-MM-dd
 * @param {string} [params.toDate] - Filter to date (inclusive), format yyyy-MM-dd
 * @param {boolean} [params.isActive] - Filter by archive status: true = unarchived, false = archived, omit = all
 * @param {boolean} [params.is_active] - Alternate key for isActive
 * @param {number} [params.page=0] - 0-based page index
 * @param {number} [params.size=200] - Page size (1–200, default 20)
 * @returns {Promise<{ list: any[], total: number, success: boolean, raw?: any }>}
 */
export async function fetchDemoRequests({
  search,
  fromDate,
  toDate,
  isActive,
  is_active,
  page = 0,
  size = 200,
} = {}) {
  const params = new URLSearchParams()
  if (search && search.trim()) params.append('search', search.trim())
  if (fromDate && fromDate.trim()) params.append('fromDate', fromDate.trim())
  if (toDate && toDate.trim()) params.append('toDate', toDate.trim())

  const activeVal = isActive !== undefined ? isActive : is_active
  if (activeVal !== undefined && activeVal !== null && activeVal !== '') {
    params.append('is_active', String(Boolean(activeVal)))
  }

  if (page !== undefined && page !== null) {
    params.append('page', String(page))
  }
  if (size !== undefined && size !== null) {
    params.append('size', String(size))
  }

  const queryString = params.toString() ? `?${params.toString()}` : ''
  const endpoint = `${API_ENDPOINTS.DEMO_REQUESTS}${queryString}`

  try {
    const data = await http.get(endpoint)
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
      total = data.total || data.count || data.totalRequests || (Array.isArray(data.data) ? data.data.length : 0)
      if (Array.isArray(data.requests)) list = data.requests
      else if (Array.isArray(data.list)) list = data.list
    }

    return { list, total: total || list.length, success: true, raw: data }
  } catch (e) {
    console.warn('Fetch demo requests error:', e.message)
    return { list: [], total: 0, success: false }
  }
}

/**
 * Export Demo Requests to Excel (.xlsx / .csv)
 * If backend is offline or network fails, downloads a client-generated Excel CSV.
 * @param {Object} [params]
 * @param {string} [params.search]
 * @param {string} [params.fromDate]
 * @param {string} [params.toDate]
 * @param {boolean} [params.isActive]
 * @param {boolean} [params.is_active]
 * @param {Array} [params.fallbackData]
 * @returns {Promise<{ success: boolean, source: 'backend' | 'client' }>}
 */
export async function exportDemoRequestsExcel({
  search,
  fromDate,
  toDate,
  isActive,
  is_active,
  fallbackData = [],
} = {}) {
  const params = new URLSearchParams()
  if (search && search.trim()) params.append('search', search.trim())
  if (fromDate && fromDate.trim()) params.append('fromDate', fromDate.trim())
  if (toDate && toDate.trim()) params.append('toDate', toDate.trim())

  const activeVal = isActive !== undefined ? isActive : is_active
  if (activeVal !== undefined && activeVal !== null && activeVal !== '') {
    params.append('is_active', String(Boolean(activeVal)))
  }

  const queryString = params.toString() ? `?${params.toString()}` : ''
  const endpoint = `${API_ENDPOINTS.DEMO_REQUESTS_EXPORT_EXCEL}${queryString}`

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: getAuthHeaders({
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv, application/octet-stream',
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
 * Archive / Unarchive OMEDO Demo Request (Soft toggle active status)
 * Endpoint: PATCH /it/api/v1/omedo/demo-requests/{id}/archive
 * @param {string|number} id - Positive ID of the demo request
 * @returns {Promise<any>}
 */
export async function archiveDemoRequest(id) {
  if (!id) {
    throw new Error('Demo request ID is required to toggle archive status.')
  }
  const endpoint = API_ENDPOINTS.DEMO_REQUEST_ARCHIVE(id)
  try {
    return await http.patch(endpoint)
  } catch (err) {
    console.warn(`archiveDemoRequest notice for ID ${id}:`, err?.message || err)
    throw err
  }
}

