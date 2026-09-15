/**
 * Image Utilities and Formatting Helpers
 */

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://api.omedosoft.com'
).replace(/\/$/, '')

/**
 * Get the direct backend client logo image URL
 * Endpoint: https://api.omedosoft.com/it/api/v1/omedo/websites/clients/{id}/image
 * @param {string|number} id - Client ID
 * @returns {string|null}
 */
export function getClientImageUrl(id) {
  if (!id) return null
  return `${API_BASE_URL}/it/api/v1/omedo/websites/clients/${id}/image`
}

/**
 * Helper to sanitize URLs for VARCHAR(500) backend columns
 * Strips raw base64 data URLs and limits length to 500 chars.
 * @param {string} url
 * @param {number} [maxLen=500]
 * @returns {string}
 */
export function sanitizeUrl(url, maxLen = 500) {
  if (!url || typeof url !== 'string') return ''
  const trimmed = url.trim()
  if (trimmed.startsWith('data:')) {
    // Base64 data URLs exceed 500 characters and cause backend HTTP 400 validation error
    return ''
  }
  return trimmed.slice(0, maxLen)
}

/**
 * Helper to convert Base64 Data URL to a File Object for multipart upload
 * @param {string} dataurl - Base64 Data URL
 * @param {string} [filename='client-logo.png'] - Output file name
 * @returns {File|null}
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
 * Format any image source (URL, Data URI, or raw Base64 string from API)
 * Ensures <img> tags can render it correctly without broken image icons.
 * @param {string|number} [val]
 * @returns {string|null}
 */
export function formatLogoUrl(val) {
  if (!val) return null
  if (typeof val === 'number') {
    return getClientImageUrl(val)
  }
  if (typeof val !== 'string') return null
  const trimmed = val.trim()
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return null

  // 1. Data URLs, Blob URLs, full HTTP(S) URLs
  if (
    trimmed.startsWith('data:') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed
  }

  // 2. Numeric IDs passed as strings
  if (/^\d+$/.test(trimmed)) {
    return getClientImageUrl(trimmed)
  }

  // 3. Raw JPEG base64 (standard prefix is /9j/)
  if (trimmed.startsWith('/9j/')) {
    return `data:image/jpeg;base64,${trimmed}`
  }

  // 4. Raw PNG base64 (standard prefix is iVBOR)
  if (trimmed.startsWith('iVBOR')) {
    return `data:image/png;base64,${trimmed}`
  }

  // 5. Raw WebP / GIF / SVG base64
  if (trimmed.startsWith('UklGR')) {
    return `data:image/webp;base64,${trimmed}`
  }
  if (trimmed.startsWith('R0lGOD')) {
    return `data:image/gif;base64,${trimmed}`
  }
  if (trimmed.startsWith('PHN2Zy') || trimmed.startsWith('<svg')) {
    return trimmed.startsWith('<svg')
      ? `data:image/svg+xml;utf8,${encodeURIComponent(trimmed)}`
      : `data:image/svg+xml;base64,${trimmed}`
  }

  // 6. Relative local asset paths or API paths
  if (
    trimmed.startsWith('/assets/') ||
    trimmed.startsWith('/images/') ||
    trimmed.startsWith('/public/') ||
    trimmed.startsWith('./')
  ) {
    return trimmed
  }

  if (trimmed.startsWith('/it/api/') || trimmed.startsWith('it/api/')) {
    const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
    return `${API_BASE_URL}${cleanPath}`
  }

  // If path is a short relative path starting with /
  if (trimmed.startsWith('/') && trimmed.length < 500) {
    return `${API_BASE_URL}${trimmed}`
  }

  // 7. Generic raw base64 string fallback
  return `data:image/png;base64,${trimmed}`
}
