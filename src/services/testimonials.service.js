/**
 * Testimonials & Reviews API Services
 */

import { http, API_ENDPOINTS } from './apiClient'
import { sanitizeUrl } from '../utils/imageUtils'
import { fetchWebsiteClients, postClientDetails } from './clients.service'

/**
 * Format payload according to the API specification:
 * {
 *   "client_hospital": "string",
 *   "person_name": "string",
 *   "designation": "string",
 *   "profile_image_url": "string",
 *   "testimonial": "string",
 *   "rating": 1,
 *   "display_order": 0,
 *   "is_active": true
 * }
 *
 * @param {Object} payload
 * @returns {Object}
 */
export function formatTestimonialPayload(payload = {}) {
  return {
    client_hospital: (
      payload.client_hospital ??
      payload.organization ??
      payload.facility ??
      payload.client_name ??
      payload.hospital ??
      ''
    ).trim(),
    person_name: (payload.person_name || payload.name || '').trim().slice(0, 255),
    designation: (payload.designation || payload.role || '').trim().slice(0, 255),
    profile_image_url: sanitizeUrl(payload.profile_image_url || payload.avatarUrl || payload.image_url || '') || '',
    testimonial: payload.testimonial || payload.content || '',
    rating: Number(payload.rating ?? 5),
    display_order: Number(payload.display_order ?? payload.displayOrder ?? 0),
    is_active: payload.is_active !== undefined ? Boolean(payload.is_active) : (payload.status !== 'INACTIVE'),
  }
}

/**
 * Fetch list of testimonials
 * @returns {Promise<{ success: boolean, list: any[], raw?: any }>}
 */
export async function fetchTestimonials() {
  try {
    const data = await http.get(API_ENDPOINTS.TESTIMONIALS)
    let list = []
    if (Array.isArray(data)) list = data
    else if (data && Array.isArray(data.data)) list = data.data
    else if (data && Array.isArray(data.content)) list = data.content
    else if (data && Array.isArray(data.results)) list = data.results
    return { success: true, list, raw: data }
  } catch (err) {
    console.warn('fetchTestimonials error:', err.message)
    return { success: false, list: [] }
  }
}

/**
 * Post / Create testimonial directly to the testimonials endpoint
 * Endpoint: POST /it/api/v1/omedo/websites/testimonials
 * @param {Object} payload
 * @returns {Promise<any>}
 */
export async function postTestimonial(payload = {}) {
  const body = formatTestimonialPayload(payload)
  return http.post(API_ENDPOINTS.TESTIMONIALS, body)
}

/**
 * Alias for postTestimonial
 */
export const createTestimonial = postTestimonial

/**
 * Create testimonial under a specific client or fallback to direct testimonials POST
 * Endpoint: POST /it/api/v1/omedo/websites/clients/{client_id}/testimonials or POST /it/api/v1/omedo/websites/testimonials
 * @param {string|number} [clientId]
 * @param {Object} payload
 * @returns {Promise<any>}
 */
export async function createClientTestimonial(clientId, payload = {}) {
  // If called as createClientTestimonial(payload) where first argument is payload object
  if (typeof clientId === 'object' && clientId !== null && Object.keys(payload).length === 0) {
    payload = clientId
    clientId = payload.client_id || payload.clientId
  }

  let targetClientId = clientId || payload.client_id || payload.clientId
  const body = formatTestimonialPayload(payload)

  // If client ID is provided, try client-specific endpoint first
  if (targetClientId) {
    try {
      const endpoint = `${API_ENDPOINTS.WEBSITE_CLIENTS}/${targetClientId}/testimonials`
      return await http.post(endpoint, body)
    } catch (err) {
      console.warn('Client-specific testimonial post notice, attempting direct endpoint:', err.message)
    }
  }

  // Auto-resolve or post directly to central testimonials endpoint
  try {
    return await http.post(API_ENDPOINTS.TESTIMONIALS, body)
  } catch (err) {
    console.warn('Direct testimonial post notice:', err.message)
    throw err
  }
}

/**
 * Update testimonial
 * Endpoint: PUT /it/api/v1/omedo/websites/testimonials/{id}
 * @param {string|number} id
 * @param {Object} payload
 * @returns {Promise<any>}
 */
export async function updateTestimonial(id, payload = {}) {
  const body = formatTestimonialPayload(payload)
  return http.put(`${API_ENDPOINTS.TESTIMONIALS}/${id}`, body)
}

/**
 * Delete testimonial
 * Endpoint: DELETE /it/api/v1/omedo/websites/testimonials/{id}
 * @param {string|number} id
 * @returns {Promise<any>}
 */
export async function deleteTestimonial(id) {
  await http.delete(`${API_ENDPOINTS.TESTIMONIALS}/${id}`)
  return true
}

/**
 * Patch testimonial active status
 * Endpoint: PATCH /it/api/v1/omedo/websites/testimonials/{id}/status?isActive=boolean
 * @param {string|number} id
 * @param {boolean} isActive
 * @returns {Promise<any>}
 */
export async function patchTestimonialStatus(id, isActive) {
  const endpoint = `${API_ENDPOINTS.TESTIMONIALS}/${id}/status?isActive=${Boolean(isActive)}`
  return http.patch(endpoint, {
    is_active: Boolean(isActive),
    isActive: Boolean(isActive),
  })
}
