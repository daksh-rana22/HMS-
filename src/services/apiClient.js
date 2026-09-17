/**
 * Centralized HTTP Client
 * Provides unified request handling, token injection, timeout protection, and error handling.
 */

import { getAuthHeaders, logoutAdmin } from './auth.service'

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://api.omedosoft.com'
).replace(/\/$/, '')

// Centralized API Endpoints dictionary
export const API_ENDPOINTS = {
  AUTH_TOKEN: `${API_BASE_URL}/it/api/v1/platform/auth/token`,
  DEMO_REQUESTS: `${API_BASE_URL}/it/api/v1/omedo/demo-requests`,
  DEMO_REQUESTS_EXPORT_EXCEL: `${API_BASE_URL}/it/api/v1/omedo/demo-requests/export/excel`,
  COMPANY_CLIENTS: `${API_BASE_URL}/it/api/v1/omedo/websites/company-clients`,
  WEBSITE_CLIENTS: `${API_BASE_URL}/it/api/v1/omedo/websites/clients`,
  TESTIMONIALS: `${API_BASE_URL}/it/api/v1/omedo/websites/testimonials`,
  CLIENT_DETAILS: `${API_BASE_URL}/it/api/v1/omedo/websites/clients`,
  CLIENT_IMAGE: (id) => `${API_BASE_URL}/it/api/v1/omedo/websites/clients/${id}/image`,
  DEMO_REQUEST_ARCHIVE: (id) => `${API_BASE_URL}/it/api/v1/omedo/demo-requests/${id}/archive`,
}

// In-flight GET request deduplication map
const inFlightGetRequests = new Map()

/**
 * Universal request wrapper with authentication, timeouts, deduplication, and error handling
 * @param {string} endpoint
 * @param {Object} [options={}]
 * @param {string} [options.method='GET']
 * @param {any} [options.body]
 * @param {Record<string, string>} [options.headers]
 * @param {number} [options.timeout=15000]
 * @param {boolean} [options.isFormData=false]
 * @returns {Promise<any>}
 */
export async function request(endpoint, options = {}) {
  const {
    method = 'GET',
    body,
    headers = {},
    timeout = 15000,
    isFormData = false,
    ...customConfig
  } = options

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`
  const isGet = method.toUpperCase() === 'GET'

  // Deduplicate simultaneous GET requests for the same URL
  if (isGet && inFlightGetRequests.has(url)) {
    return inFlightGetRequests.get(url)
  }

  const execute = async () => {
    const authHeaders = getAuthHeaders()
    const defaultHeaders = {
      Accept: 'application/json',
      ...authHeaders,
      ...(!isFormData && body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    }

    // If body is FormData, browser will automatically set correct boundary Content-Type
    if (isFormData && defaultHeaders['Content-Type']) {
      delete defaultHeaders['Content-Type']
    }

    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
    const timer = controller ? setTimeout(() => controller.abort(), timeout) : null

    try {
      const fetchOptions = {
        method,
        headers: defaultHeaders,
        signal: controller ? controller.signal : undefined,
        ...customConfig,
      }

      if (body !== undefined) {
        fetchOptions.body = isFormData ? body : (typeof body === 'object' ? JSON.stringify(body) : body)
      }

      const response = await fetch(url, fetchOptions)

      // Global 401 Unauthorized handling
      if (response.status === 401) {
        logoutAdmin()
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth:unauthorized'))
        }
      }

      const contentType = response.headers.get('content-type') || ''
      const isJson = contentType.includes('application/json')
      const data = isJson ? await response.json().catch(() => ({})) : await response.text().catch(() => '')

      if (!response.ok) {
        const errorMessage =
          (typeof data === 'object' && (data.message || data.error)) ||
          (typeof data === 'string' && data) ||
          `Request failed with status ${response.status}`
        throw new Error(errorMessage)
      }

      return data
    } catch (err) {
      if (err.name === 'AbortError') {
        throw new Error('Network request timed out. Please check your connection and try again.')
      }
      throw err
    } finally {
      if (timer) clearTimeout(timer)
    }
  }

  if (isGet) {
    const fetchPromise = execute().finally(() => {
      inFlightGetRequests.delete(url)
    })
    inFlightGetRequests.set(url, fetchPromise)
    return fetchPromise
  }

  return execute()
}

/**
 * Convenient HTTP method shortcuts
 */
export const http = {
  get: (url, opts) => request(url, { ...opts, method: 'GET' }),
  post: (url, body, opts) => request(url, { ...opts, method: 'POST', body }),
  put: (url, body, opts) => request(url, { ...opts, method: 'PUT', body }),
  patch: (url, body, opts) => request(url, { ...opts, method: 'PATCH', body }),
  delete: (url, opts) => request(url, { ...opts, method: 'DELETE' }),
}
