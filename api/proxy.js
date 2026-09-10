export default async function handler(req, res) {
  // Allow all origins on Vercel proxy
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const match = req.query.match || ''
    
    // Reconstruct extra query parameters (e.g. search, fromDate, toDate)
    const queryParams = new URLSearchParams()
    for (const [key, value] of Object.entries(req.query || {})) {
      if (key !== 'match') {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(key, v))
        } else if (value !== undefined) {
          queryParams.append(key, value)
        }
      }
    }
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ''
    const targetUrl = `https://api.omedosoft.com/it/api/${match}${queryString}`

    // Prepare headers for upstream request
    const upstreamHeaders = {}
    if (req.headers['content-type']) {
      upstreamHeaders['Content-Type'] = req.headers['content-type']
    }
    if (req.headers['accept']) {
      upstreamHeaders['Accept'] = req.headers['accept']
    }
    if (req.headers['authorization']) {
      upstreamHeaders['Authorization'] = req.headers['authorization']
    }

    // Set Origin to localhost to bypass backend CORS restriction on api.omedosoft.com
    upstreamHeaders['Origin'] = 'http://localhost:5173'
    upstreamHeaders['Referer'] = 'http://localhost:5173/'

    const fetchOptions = {
      method: req.method,
      headers: upstreamHeaders,
    }

    // Attach request body for non-GET/HEAD methods
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      if (req.body) {
        fetchOptions.body = typeof req.body === 'object' ? JSON.stringify(req.body) : req.body
      }
    }

    const upstreamRes = await fetch(targetUrl, fetchOptions)

    res.status(upstreamRes.status)

    const contentType = upstreamRes.headers.get('content-type')
    if (contentType) {
      res.setHeader('Content-Type', contentType)
    }
    const disposition = upstreamRes.headers.get('content-disposition')
    if (disposition) {
      res.setHeader('Content-Disposition', disposition)
    }

    if (
      contentType &&
      (contentType.includes('application/vnd') ||
        contentType.includes('octet-stream') ||
        contentType.includes('image/'))
    ) {
      const buffer = await upstreamRes.arrayBuffer()
      res.send(Buffer.from(buffer))
    } else {
      const text = await upstreamRes.text()
      res.send(text)
    }
  } catch (error) {
    console.error('Vercel proxy handler error:', error)
    res.status(502).json({
      error: 'Proxy Error',
      message: error.message || 'Failed to proxy request to backend',
    })
  }
}
