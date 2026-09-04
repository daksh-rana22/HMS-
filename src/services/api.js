/**
 * Centralized API Configuration and Service Methods
 * All API routes and network calls should be managed here.
 */

// Base backend URL:
// - If VITE_API_BASE_URL is set in .env / Vercel env, use it.
// - Otherwise, defaults to '' (relative) to leverage Vercel & Vite proxies cleanly over HTTPS.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL !== undefined
    ? import.meta.env.VITE_API_BASE_URL
    : ''

// Centralized API Paths / Endpoints dictionary
export const API_ENDPOINTS = {
  DEMO_REQUESTS: `${API_BASE_URL ? API_BASE_URL.replace(/\/$/, '') : ''}/it/api/v1/omedo/demo-requests`,
  // Future API routes can simply be added below:
  // CONTACT_US: `${API_BASE_URL ? API_BASE_URL.replace(/\/$/, '') : ''}/it/api/v1/omedo/contact`,
  // NEWSLETTER: `${API_BASE_URL ? API_BASE_URL.replace(/\/$/, '') : ''}/it/api/v1/omedo/newsletter`,
}

/**
 * Submit Demo Request / Enquiry Form
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.mobile - e.g. +919876543210
 * @param {string} payload.email
 * @param {string} payload.hospital_clinic_name
 * @param {string} payload.location
 * @param {string} payload.message
 * @returns {Promise<any>}
 */
export async function submitDemoRequest(payload) {
  const response = await fetch(API_ENDPOINTS.DEMO_REQUESTS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}))
    throw new Error(
      errData.message ||
      errData.error ||
      `Submission failed with status ${response.status}. Please check your details and try again.`
    )
  }

  return response.json().catch(() => ({ success: true }))
}
