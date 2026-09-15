/**
 * Safe LocalStorage Utility with automatic Quota Management and Fallbacks
 * Prevents QuotaExceededError crashes when caching datasets in browser storage.
 */

/**
 * Strips huge base64 payloads from items before saving to prevent QuotaExceededError
 */
export function sanitizeDataForStorage(data) {
  if (!data) return data
  try {
    if (Array.isArray(data)) {
      return data.map((item) => {
        if (item && typeof item === 'object') {
          const cloned = { ...item }
          // If logoUrl or image_base64 is a huge base64 string (> 30,000 characters), preserve URL endpoint instead of null
          if (typeof cloned.logoUrl === 'string' && cloned.logoUrl.length > 30000) {
            cloned.logoUrl = cloned.id ? `https://api.omedosoft.com/it/api/v1/omedo/websites/clients/${cloned.id}/image` : null
          }
          if (typeof cloned.image_base64 === 'string' && cloned.image_base64.length > 30000) {
            cloned.image_base64 = null
          }
          return cloned
        }
        return item
      })
    }
  } catch {
    // Return original data on parse error
  }
  return data
}

/**
 * Safe localStorage.setItem wrapper
 * @param {string} key
 * @param {any} value
 * @returns {boolean}
 */
export function safeSetItem(key, value) {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value)
    localStorage.setItem(key, serialized)
    return true
  } catch (err) {
    console.warn(`[Storage] Quota warning for "${key}":`, err.message)
    // If quota exceeded, sanitize heavy base64 strings and retry
    try {
      if (typeof value === 'object' && value !== null) {
        const lightweight = sanitizeDataForStorage(value)
        localStorage.setItem(key, JSON.stringify(lightweight))
        return true
      }
    } catch (retryErr) {
      console.warn(`[Storage] Retry failed for "${key}":`, retryErr.message)
      // If still exceeding, try clearing oversized legacy keys
      try {
        localStorage.removeItem('omedo_admin_clients')
        localStorage.removeItem('omedo_admin_reviews')
      } catch {
        // Suppress error
      }
    }
    return false
  }
}

/**
 * Safe localStorage.getItem wrapper
 * @param {string} key
 * @returns {string|null}
 */
export function safeGetItem(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * Safe localStorage.removeItem wrapper
 * @param {string} key
 */
export function safeRemoveItem(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    // Ignore
  }
}
