/**
 * Testimonials & Reviews API Services
 */

import { http, API_ENDPOINTS } from './apiClient'
import { sanitizeUrl } from '../utils/imageUtils'
import { fetchWebsiteClients, postClientDetails } from './clients.service'

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
 * Create testimonial under a specific client
 * Endpoint: POST /it/api/v1/omedo/websites/clients/{client_id}/testimonials
 * @param {string|number} [clientId]
 * @param {Object} payload
 * @returns {Promise<any>}
 */
export async function createClientTestimonial(clientId, payload = {}) {
  let targetClientId = clientId || payload.client_id || payload.clientId

  // 1. If no clientId provided, auto-resolve from existing website clients
  if (!targetClientId) {
    try {
      const clientListRes = await fetchWebsiteClients()
      if (clientListRes && clientListRes.success && Array.isArray(clientListRes.list) && clientListRes.list.length > 0) {
        targetClientId = clientListRes.list[0].id
      }
    } catch (err) {
      console.warn('Auto-resolve client ID notice:', err)
    }

    // 2. If no clients exist yet, create a client record first to obtain an ID
    if (!targetClientId) {
      try {
        const newClient = await postClientDetails({
          clientName: payload.organization || payload.facility || payload.name || 'Healthcare Client',
          cityName: payload.location || 'India',
          isActive: true,
        })
        if (newClient && newClient.data && newClient.data.id) {
          targetClientId = newClient.data.id
        }
      } catch (clientErr) {
        console.warn('Auto client registration notice:', clientErr)
      }
    }
  }

  // 3. Fallback default client ID if not resolved
  if (!targetClientId) {
    targetClientId = 1
  }

  const body = {
    person_name: (payload.person_name || payload.name || '').trim().slice(0, 255),
    designation: (payload.designation || payload.role || '').slice(0, 255),
    profile_image_url: sanitizeUrl(payload.profile_image_url || payload.avatarUrl),
    testimonial: payload.testimonial || payload.content || '',
    rating: Number(payload.rating || 5),
    display_order: Number(payload.display_order ?? payload.displayOrder ?? 0),
    is_active: payload.is_active ?? (payload.status !== 'INACTIVE'),
  }

  const endpoint = `${API_ENDPOINTS.WEBSITE_CLIENTS}/${targetClientId}/testimonials`
  return http.post(endpoint, body)
}

/**
 * Update testimonial
 * @param {string|number} id
 * @param {Object} payload
 * @returns {Promise<any>}
 */
export async function updateTestimonial(id, payload) {
  const body = {
    person_name: (payload.person_name || payload.name || '').trim().slice(0, 255),
    designation: (payload.designation || payload.role || '').slice(0, 255),
    profile_image_url: sanitizeUrl(payload.profile_image_url || payload.avatarUrl),
    testimonial: payload.testimonial || payload.content || '',
    rating: Number(payload.rating || 5),
    display_order: Number(payload.display_order ?? payload.displayOrder ?? 0),
    is_active: payload.is_active ?? (payload.status !== 'INACTIVE'),
  }

  return http.put(`${API_ENDPOINTS.TESTIMONIALS}/${id}`, body)
}

/**
 * Delete testimonial
 * @param {string|number} id
 * @returns {Promise<any>}
 */
export async function deleteTestimonial(id) {
  await http.delete(`${API_ENDPOINTS.TESTIMONIALS}/${id}`)
  return true
}

/**
 * Patch testimonial active status
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
