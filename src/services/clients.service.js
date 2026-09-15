/**
 * Company Clients and Website Clients API Services
 */

import { http, API_ENDPOINTS } from './apiClient'
import { sanitizeUrl } from '../utils/imageUtils'

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * COMPANY CLIENTS API SERVICES
 * Endpoint: /it/api/v1/omedo/websites/company-clients
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Fetch list of company clients
 * @returns {Promise<{ success: boolean, list: any[], raw?: any }>}
 */
export async function fetchCompanyClients() {
  try {
    const data = await http.get(API_ENDPOINTS.COMPANY_CLIENTS)
    let list = []
    if (Array.isArray(data)) list = data
    else if (data && Array.isArray(data.data)) list = data.data
    else if (data && Array.isArray(data.content)) list = data.content
    else if (data && Array.isArray(data.results)) list = data.results
    return { success: true, list, raw: data }
  } catch (err) {
    console.warn('fetchCompanyClients error:', err.message)
    return { success: false, list: [] }
  }
}

/**
 * Create a new company client
 * @param {Object} payload
 * @returns {Promise<any>}
 */
export async function createCompanyClient(payload) {
  const body = {
    client_name: (payload.client_name || payload.name || '').trim().slice(0, 255),
    logo_url: sanitizeUrl(payload.logo_url || payload.logoUrl),
    website_url: sanitizeUrl(payload.website_url || payload.websiteUrl),
    short_description: (payload.short_description || payload.location || payload.description || '').slice(0, 500),
    display_order: Number(payload.display_order ?? payload.displayOrder ?? 0),
    is_featured: payload.is_featured ?? payload.featured ?? true,
    is_active: payload.is_active ?? (payload.status !== 'INACTIVE'),
  }

  return http.post(API_ENDPOINTS.COMPANY_CLIENTS, body)
}

/**
 * Update an existing company client
 * @param {string|number} id
 * @param {Object} payload
 * @returns {Promise<any>}
 */
export async function updateCompanyClient(id, payload) {
  const body = {
    client_name: (payload.client_name || payload.name || '').trim().slice(0, 255),
    logo_url: sanitizeUrl(payload.logo_url || payload.logoUrl),
    website_url: sanitizeUrl(payload.website_url || payload.websiteUrl),
    short_description: (payload.short_description || payload.location || payload.description || '').slice(0, 500),
    display_order: Number(payload.display_order ?? payload.displayOrder ?? 0),
    is_featured: payload.is_featured ?? payload.featured ?? true,
    is_active: payload.is_active ?? (payload.status !== 'INACTIVE'),
  }

  return http.put(`${API_ENDPOINTS.COMPANY_CLIENTS}/${id}`, body)
}

/**
 * Delete a company client
 * @param {string|number} id
 * @returns {Promise<any>}
 */
export async function deleteCompanyClient(id) {
  await http.delete(`${API_ENDPOINTS.COMPANY_CLIENTS}/${id}`)
  return true
}

/**
 * Patch company client active status
 * @param {string|number} id
 * @param {boolean} isActive
 * @returns {Promise<any>}
 */
export async function patchCompanyClientStatus(id, isActive) {
  const endpoint = `${API_ENDPOINTS.COMPANY_CLIENTS}/${id}/status?isActive=${Boolean(isActive)}`
  return http.patch(endpoint, {
    is_active: Boolean(isActive),
    isActive: Boolean(isActive),
  })
}

/**
 * Patch company client featured flag
 * @param {string|number} id
 * @param {boolean} isFeatured
 * @returns {Promise<any>}
 */
export async function patchCompanyClientFeatured(id, isFeatured) {
  const endpoint = `${API_ENDPOINTS.COMPANY_CLIENTS}/${id}/featured?isFeatured=${Boolean(isFeatured)}`
  return http.patch(endpoint, {
    is_featured: Boolean(isFeatured),
    isFeatured: Boolean(isFeatured),
  })
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * WEBSITE CLIENTS API SERVICES (BLOB / Multipart Logo)
 * Endpoint: /it/api/v1/omedo/websites/clients
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Fetch list of website clients
 * @returns {Promise<{ success: boolean, list: any[], raw?: any }>}
 */
export async function fetchWebsiteClients() {
  try {
    const data = await http.get(API_ENDPOINTS.WEBSITE_CLIENTS)
    let list = []
    if (Array.isArray(data)) list = data
    else if (data && Array.isArray(data.data)) list = data.data
    else if (data && Array.isArray(data.content)) list = data.content
    return { success: true, list, raw: data }
  } catch (err) {
    console.warn('fetchWebsiteClients error:', err.message)
    return { success: false, list: [] }
  }
}

/**
 * Post Client Details (Hospital / Client Logo and Metadata)
 * @param {Object} params
 * @param {File|Blob} [params.file] - Binary file
 * @param {string} params.clientName - Name of the client
 * @param {string} [params.cityName] - City name
 * @param {boolean} [params.isActive=true] - Initial active status
 * @returns {Promise<{ message?: string, data?: any }>}
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
    return await http.post(API_ENDPOINTS.WEBSITE_CLIENTS, formData, { isFormData: true })
  } catch (err) {
    throw err instanceof Error ? err : new Error('Failed to post client details. Please try again.')
  }
}

/**
 * Delete a website client
 * @param {string|number} id
 * @returns {Promise<any>}
 */
export async function deleteWebsiteClient(id) {
  await http.delete(`${API_ENDPOINTS.WEBSITE_CLIENTS}/${id}`)
  return true
}

/**
 * Patch website client status
 * @param {string|number} id
 * @param {boolean} isActive
 * @returns {Promise<any>}
 */
export async function patchWebsiteClientStatus(id, isActive) {
  const endpoint = `${API_ENDPOINTS.WEBSITE_CLIENTS}/${id}/status?isActive=${Boolean(isActive)}`
  return http.patch(endpoint, {
    is_active: Boolean(isActive),
    isActive: Boolean(isActive),
  })
}
