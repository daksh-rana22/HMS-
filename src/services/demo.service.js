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
    const res = await http.post(API_ENDPOINTS.DEMO_REQUESTS, payload)
    return res || { success: true }
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
 * @returns {Promise<{ list: any[], total: number, success: boolean, raw?: any }>}
 */
export async function fetchDemoRequests({ search, fromDate, toDate } = {}) {
  const params = new URLSearchParams()
  if (search && search.trim()) params.append('search', search.trim())
  if (fromDate && fromDate.trim()) params.append('fromDate', fromDate.trim())
  if (toDate && toDate.trim()) params.append('toDate', toDate.trim())

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
      total = data.total || data.count || data.totalRequests || 0
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
