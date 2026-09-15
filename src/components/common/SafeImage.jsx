import { useState, useEffect } from 'react'
import { getAuthHeaders, formatLogoUrl } from '../../services/api'

// In-memory cache for resolved Blob URLs to prevent duplicate network calls across components
const blobUrlCache = new Map()
// In-flight promise cache to deduplicate simultaneous requests for the same image
const pendingFetchMap = new Map()

async function resolveImageUrl(url) {
  if (!url) return null
  if (blobUrlCache.has(url)) {
    return blobUrlCache.get(url)
  }
  if (pendingFetchMap.has(url)) {
    return pendingFetchMap.get(url)
  }

  const fetchPromise = (async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders({
          Accept: 'image/*, application/octet-stream, */*',
        }),
      })

      if (response.ok) {
        const blob = await response.blob()
        if (blob && blob.size > 0 && !blob.type?.includes('json')) {
          const objectUrl = URL.createObjectURL(blob)
          blobUrlCache.set(url, objectUrl)
          return objectUrl
        }
      }
      return url
    } catch {
      return url
    } finally {
      pendingFetchMap.delete(url)
    }
  })()

  pendingFetchMap.set(url, fetchPromise)
  return fetchPromise
}

/**
 * SafeImage Component
 * Automatically resolves and fetches images (including authenticated backend endpoints)
 * using Authorization Bearer token headers when required, and converts them to Blob URLs.
 * If image fails to load or is invalid, gracefully renders the fallback component without
 * displaying broken image browser icons.
 */
export default function SafeImage({
  src,
  alt = '',
  className = '',
  fallback = null,
  loading = 'lazy',
  ...props
}) {
  const formattedUrl = formatLogoUrl(src)

  const isDirectUrl = Boolean(
    formattedUrl &&
    (formattedUrl.startsWith('data:') ||
     formattedUrl.startsWith('blob:') ||
     formattedUrl.startsWith('/assets/') ||
     formattedUrl.startsWith('/images/'))
  )

  const [imageSrc, setImageSrc] = useState(() => {
    if (!formattedUrl) return null
    if (isDirectUrl) return formattedUrl
    return blobUrlCache.get(formattedUrl) || formattedUrl
  })

  const [hasError, setHasError] = useState(false)
  const [triedAuthFetch, setTriedAuthFetch] = useState(false)

  useEffect(() => {
    const url = formatLogoUrl(src)
    if (!url) {
      setImageSrc(null)
      setHasError(false)
      setTriedAuthFetch(false)
      return
    }

    if (
      url.startsWith('data:') ||
      url.startsWith('blob:') ||
      url.startsWith('/assets/') ||
      url.startsWith('/images/')
    ) {
      setImageSrc(url)
      setHasError(false)
      setTriedAuthFetch(false)
      return
    }

    if (blobUrlCache.has(url)) {
      setImageSrc(blobUrlCache.get(url))
      setHasError(false)
      setTriedAuthFetch(true)
      return
    }

    setImageSrc(url)
    setHasError(false)
    setTriedAuthFetch(false)

    // Pre-resolve authenticated blob in background
    resolveImageUrl(url).then((resolved) => {
      if (resolved && resolved.startsWith('blob:')) {
        setImageSrc(resolved)
        setHasError(false)
      }
    })
  }, [src])

  const handleImageError = async () => {
    if (!formattedUrl) {
      setHasError(true)
      return
    }

    // If direct image URL failed and we haven't tried authenticated blob fetch yet:
    if (!triedAuthFetch && !isDirectUrl) {
      setTriedAuthFetch(true)
      const resolved = await resolveImageUrl(formattedUrl)
      if (resolved && resolved.startsWith('blob:')) {
        setImageSrc(resolved)
        setHasError(false)
        return
      }
    }

    setHasError(true)
  }

  if (hasError || !imageSrc) {
    return fallback || null
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleImageError}
      {...props}
    />
  )
}
