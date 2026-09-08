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
  CLIENT_DETAILS: `${API_BASE_URL ? API_BASE_URL.replace(/\/$/, '') : ''}/it/api/v1/omedo/client-details`,
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
 * Form-Data Request Body:
 * - file: File (Binary) - Required (.png, .jpg, .jpeg, .webp, .svg, max 5MB)
 * - clientName: Text - Required (Max 100 characters)
 * - cityName: Text - Optional (Max 100 characters)
 * - isActive: Text / Boolean - Required (true / false)
 * 
 * Target Endpoint: POST http://103.153.58.135:8081/it/api/v1/omedo/client-details
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

  // Candidate endpoints (Direct remote backend, Vite proxy, and local fallback)
  const candidateEndpoints = [
    'http://103.153.58.135:8081/it/api/v1/omedo/client-details',
    API_ENDPOINTS.CLIENT_DETAILS,
    'http://localhost:8081/it/api/v1/omedo/client-details',
  ]

  let lastError = null

  for (const endpoint of candidateEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      // If proxy returns 502/504, try direct endpoint
      if ((response.status === 502 || response.status === 504) && endpoint === API_ENDPOINTS.CLIENT_DETAILS) {
        continue
      }

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
      lastError = err
      // If it's a specific validation response from backend (e.g. 400 Bad Request), don't keep trying, throw immediately
      if (
        err.message &&
        !err.message.includes('502') &&
        !err.message.includes('504') &&
        !err.message.includes('Failed to fetch') &&
        !err.message.includes('NetworkError')
      ) {
        throw err
      }
    }
  }

  throw lastError || new Error('Failed to post client details to http://103.153.58.135:8081/it/api/v1/omedo/client-details')
}
