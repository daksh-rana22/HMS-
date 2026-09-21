import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { pageTransition } from '../../utils/animations'
import omedoLogo from '../../assets/omedo_logo.png'
import { initialClientLogos } from '../../data/clientLogos'
import { testimonials as initialTestimonials } from '../../data/testimonials'
import { initialQueries } from '../../data/queries'
import {
  postClientDetails,
  dataURLtoFile,
  exportDemoRequestsExcel,
  fetchDemoRequests,
  archiveDemoRequest,
  copyQueryTableTSV,
  authenticateAdmin,
  logoutAdmin,
  getAuthToken,
  getAuthUser,
  fetchCompanyClients,
  createCompanyClient,
  updateCompanyClient,
  deleteCompanyClient,
  patchCompanyClientStatus,
  patchCompanyClientFeatured,
  fetchTestimonials,
  postTestimonial,
  createTestimonial,
  createClientTestimonial,
  updateTestimonial,
  deleteTestimonial,
  patchTestimonialStatus,
  formatLogoUrl,
  getClientImageUrl,
  API_BASE_URL,
} from '../../services/api'
import SafeImage from '../../components/common/SafeImage'
import { safeSetItem, safeGetItem } from '../../utils/storage'

export default function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(getAuthToken())
  })
  const [authUser, setAuthUser] = useState(() => getAuthUser())
  const [activeMenu, setActiveMenu] = useState('queries') // 'queries' | 'clients' | 'reviews'
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('ALL')

  // Date Range Filters for Queries & Backend Export
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [queriesViewMode, setQueriesViewMode] = useState('sheet') // 'sheet' | 'card'
  const [selectedQueryDetail, setSelectedQueryDetail] = useState(null)
  const [isExportingExcel, setIsExportingExcel] = useState(false)
  const [exportToast, setExportToast] = useState(null)

  // Live Backend Sync State for Demo Requests
  const [isLoadingLive, setIsLoadingLive] = useState(false)
  const [liveRequestsCount, setLiveRequestsCount] = useState(null)
  const [isBackendConnected, setIsBackendConnected] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState(null)

  // Auth Form State (for logged out state)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState(null)

  // Managed Datasets (safely retrieved from storage)
  const [clients, setClients] = useState(() => {
    const s = safeGetItem('omedo_admin_clients')
    if (s) {
      try {
        const parsed = JSON.parse(s)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const validClients = parsed.filter((item) => item && (item.logoUrl || item.location || !item.content))
          if (validClients.length > 0) return validClients
        }
      } catch (e) {
        console.error(e)
      }
    }
    return initialClientLogos
  })

  const [reviews, setReviews] = useState(() => {
    const s = safeGetItem('omedo_admin_reviews')
    if (s) {
      try {
        const parsed = JSON.parse(s)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const validReviews = parsed.filter((item) => item && item.content && typeof item.content === 'string' && item.content.trim().length > 0)
          if (validReviews.length > 0) return validReviews
        }
      } catch (e) {
        console.error(e)
      }
    }
    return initialTestimonials
  })

  const [queries, setQueries] = useState(() => {
    const s = safeGetItem('omedo_client_queries')
    if (s) {
      try {
        const parsed = JSON.parse(s)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out legacy hardcoded sample IDs (101-106)
          const realOnly = parsed.filter((item) => item && ![101, 102, 103, 104, 105, 106].includes(item.id))
          return realOnly
        }
      } catch (e) {
        console.error(e)
      }
    }
    return []
  })

  // Archived Inquiries Dataset
  const [archivedQueries, setArchivedQueries] = useState(() => {
    const s = safeGetItem('omedo_archived_queries')
    if (s) {
      try {
        const parsed = JSON.parse(s)
        if (Array.isArray(parsed)) return parsed
      } catch (e) {
        console.error(e)
      }
    }
    return []
  })
  const [inquiryTab, setInquiryTab] = useState('active') // 'active' | 'archived'

  // Modal State for Adding / Editing Items (Clients & Reviews Only)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('clients') // 'clients' | 'reviews'
  const [editingItem, setEditingItem] = useState(null)
  const [newItemData, setNewItemData] = useState({})
  const [hoverRating, setHoverRating] = useState(0)
  const [modalError, setModalError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  // Normalizer helper for backend demo-requests items
  const normalizeQueryRecord = (item, idx) => {
    const createdDate = item.created_on || item.createdOn || item.createdAt || item.date || ''
    let formattedDate = item.date
    let rawDate = item.rawDate
    if (createdDate && !formattedDate) {
      try {
        const d = new Date(createdDate)
        if (!isNaN(d.getTime())) {
          formattedDate = `${d.toISOString().split('T')[0]} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
          rawDate = d.toISOString().split('T')[0]
        } else {
          formattedDate = String(createdDate)
          rawDate = String(createdDate).slice(0, 10)
        }
      } catch {
        formattedDate = String(createdDate)
      }
    }

    return {
      id: item.id !== undefined ? item.id : Date.now() + idx,
      name: item.name || item.client_name || item.doctorName || 'Doctor / Administrator',
      facility: item.hospital_clinic_name || item.hospitalClinicName || item.facility || item.organization || item.hospitalName || 'Healthcare Facility',
      mobile: item.mobile || item.phoneNumber || item.phone || '',
      email: item.email || item.emailId || '',
      location: item.location || item.cityName || item.city || 'India',
      message: item.message || item.query || item.notes || item.requirement || 'Requested OMEDO HMS presentation and module pricing details.',
      date: formattedDate || 'Recent',
      rawDate: rawDate || (formattedDate ? formattedDate.slice(0, 10) : ''),
    }
  }

  // Normalizer for Company Clients
  const normalizeCompanyClient = (c, idx) => ({
    id: c.id !== undefined ? c.id : Date.now() + idx,
    name: c.client_name || c.name || 'Healthcare Partner',
    location: c.short_description || c.location || '',
    logoUrl: formatLogoUrl(c.logo_url || c.logoUrl || c.image_base64 || null),
    logoText: (c.client_name || c.name || 'HOSPITAL').slice(0, 10).toUpperCase(),
    status: (c.is_active ?? (c.status !== 'INACTIVE')) ? 'ACTIVE' : 'INACTIVE',
    featured: Boolean(c.is_featured ?? c.featured ?? true),
    displayOrder: c.display_order ?? idx,
    badgeColor: c.badgeColor || '#00685e',
  })

  // Normalizer for Testimonials
  const normalizeTestimonialRecord = (t, idx) => ({
    id: t.id !== undefined ? t.id : Date.now() + idx,
    clientId: t.client_id,
    name: t.person_name || t.name || 'Doctor / Administrator',
    role: t.designation || t.role || 'Verified Medical Practitioner',
    organization: t.client_hospital || t.organization || t.facility || t.client_name || 'Healthcare Network',
    content: t.testimonial || t.content || '',
    rating: Number(t.rating) || 5,
    avatar: (t.person_name || t.name || 'DR').slice(0, 2).toUpperCase(),
    avatarUrl: t.profile_image_url || t.avatarUrl || null,
    displayOrder: Number(t.display_order ?? idx),
    status: (t.is_active ?? (t.status !== 'INACTIVE')) ? 'ACTIVE' : 'INACTIVE',
  })

  // ── FETCH LIVE DEMO REQUESTS FROM BACKEND API: https://api.omedosoft.com/it/api/v1/omedo/demo-requests ──
  const loadLiveDemoRequests = useCallback(async (showToastNotice = false) => {
    if (!isAuthenticated) return
    setIsLoadingLive(true)
    try {
      const res = await fetchDemoRequests({
        search: searchQuery,
        fromDate,
        toDate,
        isActive: inquiryTab === 'active' ? true : (inquiryTab === 'archived' ? false : undefined),
        page: 0,
        size: 200,
      })

      if (res && res.success && Array.isArray(res.list)) {
        setIsBackendConnected(true)
        setLiveRequestsCount(res.total)
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))

        const normalized = res.list.map(normalizeQueryRecord)
        if (inquiryTab === 'archived') {
          setArchivedQueries(normalized)
          safeSetItem('omedo_archived_queries', normalized)
        } else {
          setQueries(normalized)
          safeSetItem('omedo_client_queries', normalized)
        }

        if (showToastNotice) {
          setExportToast({
            type: 'success',
            title: 'Live Sync Successful',
            message: `Fetched live data from backend: ${res.total} total demo request${res.total === 1 ? '' : 's'}.`,
          })
          setTimeout(() => setExportToast(null), 4500)
        }
      } else {
        setIsBackendConnected(false)
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        if (showToastNotice) {
          setExportToast({
            type: 'error',
            title: 'Live Sync Notice',
            message: 'Backend server not responding. Using cached demo requests.',
          })
          setTimeout(() => setExportToast(null), 5000)
        }
      }
    } catch (err) {
      console.warn('Backend live sync notice:', err)
      setIsBackendConnected(false)
    } finally {
      setIsLoadingLive(false)
    }
  }, [isAuthenticated, searchQuery, fromDate, toDate, inquiryTab])

  // ── FETCH LIVE COMPANY CLIENTS FROM BACKEND API: https://api.omedosoft.com/it/api/v1/omedo/websites/company-clients ──
  const loadLiveCompanyClients = useCallback(async () => {
    if (!isAuthenticated) return
    try {
      const res = await fetchCompanyClients()
      if (res && res.success && Array.isArray(res.list) && res.list.length > 0) {
        const normalized = res.list.map(normalizeCompanyClient)
        setClients(normalized)
        safeSetItem('omedo_admin_clients', normalized)
      }
    } catch (err) {
      console.warn('Live company clients sync error:', err)
    }
  }, [isAuthenticated])

  // ── FETCH LIVE TESTIMONIALS FROM BACKEND API: https://api.omedosoft.com/it/api/v1/omedo/websites/testimonials ──
  const loadLiveReviews = useCallback(async () => {
    if (!isAuthenticated) return
    try {
      const res = await fetchTestimonials()
      if (res && res.success && Array.isArray(res.list) && res.list.length > 0) {
        const normalized = res.list.map(normalizeTestimonialRecord)
        setReviews(normalized)
        safeSetItem('omedo_admin_reviews', normalized)
      }
    } catch (err) {
      console.warn('Live testimonials sync error:', err)
    }
  }, [isAuthenticated])

  // Load data on-demand only for the currently active tab when authenticated
  useEffect(() => {
    if (!isAuthenticated) return

    if (activeMenu === 'queries') {
      loadLiveDemoRequests(false)
    } else if (activeMenu === 'clients') {
      loadLiveCompanyClients()
    } else if (activeMenu === 'reviews') {
      loadLiveReviews()
    }
  }, [isAuthenticated, activeMenu, loadLiveDemoRequests, loadLiveCompanyClients, loadLiveReviews])

  // Sync datasets safely to storage with Quota protection
  useEffect(() => {
    safeSetItem('omedo_admin_clients', clients)
    window.dispatchEvent(new Event('omedo_clients_updated'))
  }, [clients])

  useEffect(() => {
    safeSetItem('omedo_admin_reviews', reviews)
    window.dispatchEvent(new Event('omedo_reviews_updated'))
  }, [reviews])

  useEffect(() => {
    safeSetItem('omedo_client_queries', queries)
  }, [queries])

  // Listen for real-time enquiries submitted on the site
  useEffect(() => {
    const handleExternalQueriesUpdate = () => {
      try {
        const s = safeGetItem('omedo_client_queries')
        if (s) {
          const parsed = JSON.parse(s)
          if (Array.isArray(parsed)) setQueries(parsed)
        }
      } catch (e) {
        console.error(e)
      }
      if (isAuthenticated) {
        loadLiveDemoRequests(false)
      }
    }
    window.addEventListener('omedo_queries_updated', handleExternalQueriesUpdate)
    return () => window.removeEventListener('omedo_queries_updated', handleExternalQueriesUpdate)
  }, [loadLiveDemoRequests, isAuthenticated])

  // Listen for session expiry / unauthorized API events
  useEffect(() => {
    const handleUnauthorizedReset = (e) => {
      setIsAuthenticated(false)
      setAuthUser(null)
      const msg = e.detail?.message || 'Authorization header is missing or session expired. Please sign in again.'
      setAuthError(msg)
    }

    window.addEventListener('auth:unauthorized', handleUnauthorizedReset)
    window.addEventListener('auth:logout_reset', handleUnauthorizedReset)

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorizedReset)
      window.removeEventListener('auth:logout_reset', handleUnauthorizedReset)
    }
  }, [])

  const openModal = () => {
    setEditingItem(null)
    setModalType(activeMenu === 'queries' ? 'clients' : activeMenu)
    setNewItemData({
      rating: 5,
    })
    setHoverRating(0)
    setModalError(null)
    setIsModalOpen(true)
  }

  const openEditModal = (item, idx, type) => {
    if (type === 'queries') return
    setEditingItem({ id: item.id !== undefined ? item.id : idx, index: idx, type })
    setModalType(type)
    setNewItemData({
      name: item.name || '',
      location: item.location || '',
      organization: item.organization || '',
      content: item.content || '',
      role: item.role || '',
      rating: item.rating || 5,
      profileImageUrl: item.avatarUrl || item.profile_image_url || '',
      displayOrder: item.displayOrder ?? item.display_order ?? 0,
      logoUrl: item.logoUrl || null,
      logoFileName: item.name ? `${item.name.toLowerCase().replace(/\s+/g, '-')}-logo.png` : 'current-logo.png',
    })
    setHoverRating(0)
    setModalError(null)
    setIsModalOpen(true)
  }

  // Login handler using Platform Auth Token API: https://api.omedosoft.com/it/api/v1/platform/auth/token
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError(null)

    try {
      const res = await authenticateAdmin({
        username: email.trim(),
        email: email.trim(),
        password: password.trim(),
      })

      if (res && res.success) {
        setIsAuthenticated(true)
        if (res.user) setAuthUser(res.user)
      } else {
        setAuthError('Authentication failed. Please verify your credentials.')
      }
    } catch (err) {
      console.warn('Authentication error:', err)
      setAuthError(err.message || 'Authentication failed. Please verify your credentials.')
    } finally {
      setAuthLoading(false)
    }
  }

  // Logout handler
  const handleLogout = () => {
    logoutAdmin()
    setIsAuthenticated(false)
    setAuthUser(null)
  }

  // Toggle Item Status Handler for Clients & Reviews
  const toggleItemStatus = async (id, type) => {
    if (type === 'clients') {
      const target = clients.find((item, idx) => (item.id !== undefined ? item.id === id : idx === id))
      const nextStatus = target && target.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      setClients((prev) =>
        prev.map((item, idx) => {
          const match = item.id !== undefined ? item.id === id : idx === id
          return match ? { ...item, status: nextStatus } : item
        })
      )
      try {
        if (target && target.id && typeof target.id === 'number') {
          await patchCompanyClientStatus(target.id, nextStatus === 'ACTIVE')
        }
      } catch (err) {
        console.warn('Backend company-client status patch notice:', err)
      }
    }
    if (type === 'reviews') {
      const target = reviews.find((item, idx) => (item.id !== undefined ? item.id === id : idx === id))
      const nextStatus = target && target.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      setReviews((prev) =>
        prev.map((item, idx) => {
          const match = item.id !== undefined ? item.id === id : idx === id
          return match ? { ...item, status: nextStatus } : item
        })
      )
      try {
        if (target && target.id && typeof target.id === 'number') {
          await patchTestimonialStatus(target.id, nextStatus === 'ACTIVE')
        }
      } catch (err) {
        console.warn('Backend testimonial status patch notice:', err)
      }
    }
  }

  // Archive Query / Client Details Handler
  const handleArchiveQuery = async (queryItemOrId) => {
    const targetId = typeof queryItemOrId === 'object' ? queryItemOrId.id : queryItemOrId
    const targetItem = queries.find((q) => q.id === targetId) || (typeof queryItemOrId === 'object' ? queryItemOrId : null)

    if (!window.confirm(`Are you sure you want to archive inquiry #${targetId}${targetItem?.name ? ` for ${targetItem.name}` : ''}?`)) {
      return
    }

    // Move from active queries to archived queries
    setQueries((prev) => {
      const updated = prev.filter((i) => i.id !== targetId)
      safeSetItem('omedo_client_queries', updated)
      return updated
    })

    if (targetItem) {
      setArchivedQueries((prev) => {
        const updated = [targetItem, ...prev.filter((i) => i.id !== targetId)]
        safeSetItem('omedo_archived_queries', updated)
        return updated
      })
    }

    if (selectedQueryDetail && selectedQueryDetail.id === targetId) {
      setSelectedQueryDetail(null)
    }

    setExportToast({
      type: 'success',
      title: 'Inquiry Archived',
      message: `Inquiry #${targetId} moved to Archived. Switch to the Archived tab to view or restore it.`,
    })
    setTimeout(() => setExportToast(null), 4500)

    try {
      if (targetId && (typeof targetId === 'number' || !isNaN(Number(targetId)))) {
        await archiveDemoRequest(targetId)
      }
    } catch (err) {
      console.warn('Backend archiveDemoRequest notice:', err)
    }
  }

  // Restore / Unarchive Query Handler
  const handleRestoreQuery = async (queryItemOrId) => {
    const targetId = typeof queryItemOrId === 'object' ? queryItemOrId.id : queryItemOrId
    const targetItem = archivedQueries.find((q) => q.id === targetId) || (typeof queryItemOrId === 'object' ? queryItemOrId : null)

    // Move from archived queries back to active queries
    setArchivedQueries((prev) => {
      const updated = prev.filter((i) => i.id !== targetId)
      safeSetItem('omedo_archived_queries', updated)
      return updated
    })

    if (targetItem) {
      setQueries((prev) => {
        const updated = [targetItem, ...prev.filter((i) => i.id !== targetId)]
        safeSetItem('omedo_client_queries', updated)
        return updated
      })
    }

    if (selectedQueryDetail && selectedQueryDetail.id === targetId) {
      setSelectedQueryDetail(null)
    }

    setExportToast({
      type: 'success',
      title: 'Inquiry Restored',
      message: `Inquiry #${targetId} has been restored to Unarchived.`,
    })
    setTimeout(() => setExportToast(null), 4000)

    try {
      if (targetId && (typeof targetId === 'number' || !isNaN(Number(targetId)))) {
        await archiveDemoRequest(targetId)
      }
    } catch (err) {
      console.warn('Backend restore archiveDemoRequest notice:', err)
    }
  }

  // Delete Item Handler
  const deleteItem = async (id, type) => {
    if (type === 'queries') {
      return handleArchiveQuery(id)
    }
    if (!window.confirm('Are you sure you want to remove this record?')) return
    if (type === 'clients') {
      const target = clients.find((item, idx) => (item.id !== undefined ? item.id === id : idx === id))
      setClients((prev) => prev.filter((i, idx) => (i.id !== undefined ? i.id !== id : idx !== id)))
      try {
        if (target && target.id && typeof target.id === 'number') {
          await deleteCompanyClient(target.id)
        }
      } catch (err) {
        console.warn('Backend delete company-client notice:', err)
      }
    }
    if (type === 'reviews') {
      const target = reviews.find((item, idx) => (item.id !== undefined ? item.id === id : idx === id))
      setReviews((prev) => prev.filter((_, idx) => (target?.id !== undefined ? _.id !== id : idx !== id)))
      try {
        if (target && target.id && typeof target.id === 'number') {
          await deleteTestimonial(target.id)
        }
      } catch (err) {
        console.warn('Backend delete testimonial notice:', err)
      }
    }
  }

  const currentQueriesDataset = inquiryTab === 'archived' ? archivedQueries : queries

  // Filtered queries computation (search & date range only, no priority/status)
  const filteredQueries = useMemo(() => {
    return currentQueriesDataset.filter((item) => {
      // 1. Date Range Filter (fromDate, toDate in yyyy-MM-dd)
      const itemDate = item.rawDate || (item.date ? item.date.slice(0, 10) : '')
      if (fromDate && itemDate && itemDate < fromDate) return false
      if (toDate && itemDate && itemDate > toDate) return false

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const text = `${item.name || ''} ${item.facility || item.hospital_clinic_name || ''} ${item.mobile || ''} ${item.email || ''} ${item.location || ''} ${item.message || ''}`.toLowerCase()
        if (!text.includes(q)) return false
      }

      return true
    })
  }, [currentQueriesDataset, fromDate, toDate, searchQuery])

  // Summary counts
  const totalDisplayCount = inquiryTab === 'archived'
    ? archivedQueries.length
    : (liveRequestsCount !== null ? Math.max(liveRequestsCount, queries.length) : queries.length)
  const uniqueLocationsCount = useMemo(() => {
    const locs = new Set(queries.map((q) => (q.location || '').trim()).filter(Boolean))
    return locs.size || (queries.length > 0 ? 1 : 0)
  }, [queries])
  const uniqueFacilitiesCount = useMemo(() => {
    const facs = new Set(queries.map((q) => (q.facility || q.hospital_clinic_name || '').trim()).filter(Boolean))
    return facs.size || (queries.length > 0 ? 1 : 0)
  }, [queries])
  const emailsProvidedCount = useMemo(() => queries.filter((q) => q.email && q.email.trim()).length, [queries])
  const phonesProvidedCount = useMemo(() => queries.filter((q) => q.mobile && q.mobile.trim()).length, [queries])

  // Avatar helper for doctor/client initials
  const getInitials = (name) => {
    if (!name) return 'CL'
    const clean = name.replace(/^(Dr\.|Dr|Mr\.|Mr|Ms\.|Ms|Mrs\.|Mrs)\s+/i, '').trim()
    const parts = clean.split(' ').filter(Boolean)
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return (parts[0] ? parts[0].slice(0, 2) : 'CL').toUpperCase()
  }

  // Consistent pleasant avatar background color palette
  const getAvatarBg = (name = '') => {
    const colors = [
      'bg-teal-100 text-teal-800 border-teal-200',
      'bg-sky-100 text-sky-800 border-sky-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-emerald-100 text-emerald-800 border-emerald-200',
      'bg-amber-100 text-amber-800 border-amber-200',
      'bg-rose-100 text-rose-800 border-rose-200',
    ]
    let sum = 0
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i)
    return colors[sum % colors.length]
  }

  // Export to Excel handler
  const handleExcelExport = async () => {
    setIsExportingExcel(true)
    try {
      const res = await exportDemoRequestsExcel({
        search: searchQuery,
        fromDate,
        toDate,
        isActive: inquiryTab === 'active' ? true : (inquiryTab === 'archived' ? false : undefined),
        fallbackData: filteredQueries,
      })
      setExportToast({
        type: 'success',
        title: 'Excel Export Complete',
        message: res.source === 'backend'
          ? 'Excel spreadsheet successfully downloaded via backend API (/demo-requests/export/excel).'
          : 'Excel-compatible CSV spreadsheet downloaded with all filtered client queries.',
      })
    } catch (err) {
      setExportToast({
        type: 'error',
        title: 'Export Failed',
        message: err.message || 'Unable to export Excel file. Please try again.',
      })
    } finally {
      setIsExportingExcel(false)
      setTimeout(() => setExportToast(null), 6000)
    }
  }

  // Quick Copy Table Data TSV to Clipboard
  const handleCopyQueryTable = () => {
    const ok = copyQueryTableTSV(filteredQueries)
    if (ok) {
      setExportToast({
        type: 'success',
        title: 'Copied to Clipboard',
        message: 'Tabular client queries copied. You can paste directly into Excel or spreadsheets (Ctrl+V).',
      })
      setTimeout(() => setExportToast(null), 5000)
    }
  }

  // Handle Logo File Upload with Automatic High-Resolution Downscaling & Compression
  // Prevents 413 "Request Entity Too Large" by bounding dimensions to max 480x240 px and compressing
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setModalError('Please choose an image file under 15MB.')
        return
      }
      setModalError(null)
      const reader = new FileReader()
      reader.onload = (uploadEvent) => {
        const rawDataUrl = uploadEvent.target.result
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          try {
            const MAX_WIDTH = 480
            const MAX_HEIGHT = 240
            let srcWidth = img.naturalWidth || img.width || 400
            let srcHeight = img.naturalHeight || img.height || 200

            let targetWidth = srcWidth
            let targetHeight = srcHeight

            if (srcWidth > MAX_WIDTH || srcHeight > MAX_HEIGHT) {
              const scaleRatio = Math.min(MAX_WIDTH / srcWidth, MAX_HEIGHT / srcHeight)
              targetWidth = Math.max(1, Math.round(srcWidth * scaleRatio))
              targetHeight = Math.max(1, Math.round(srcHeight * scaleRatio))
            }

            const canvas = document.createElement('canvas')
            canvas.width = targetWidth
            canvas.height = targetHeight
            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.imageSmoothingEnabled = true
              ctx.imageSmoothingQuality = 'high'
              ctx.fillStyle = '#FFFFFF'
              ctx.fillRect(0, 0, targetWidth, targetHeight)
              ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

              const processedUrl = canvas.toDataURL('image/png')
              const safeFile = dataURLtoFile(
                processedUrl,
                file.name.replace(/\.[^/.]+$/, '') + '.png'
              ) || file

              setNewItemData((prev) => ({
                ...prev,
                logoUrl: processedUrl,
                logoFileName: file.name,
                logoFile: safeFile,
              }))
              return
            }
          } catch (err) {
            console.error('Canvas processing error:', err)
          }

          setNewItemData((prev) => ({
            ...prev,
            logoUrl: formatLogoUrl(rawDataUrl),
            logoFileName: file.name,
            logoFile: file,
          }))
        }
        img.onerror = () => {
          setNewItemData((prev) => ({
            ...prev,
            logoUrl: formatLogoUrl(rawDataUrl),
            logoFileName: file.name,
            logoFile: file,
          }))
        }
        img.src = rawDataUrl
      }
      reader.readAsDataURL(file)
    }
  }

  // Add or Edit Item Submit (for Clients & Reviews)
  const handleAddItemSubmit = async (e) => {
    e.preventDefault()
    setModalError(null)
    const targetType = editingItem?.type || modalType

    if (targetType === 'clients') {
      const name = newItemData.name?.trim()
      const location = newItemData.location?.trim()
      const logoUrl = newItemData.logoUrl

      if (!name) {
        setModalError('Hospital / Clinic Name is required.')
        return
      }
      if (!location) {
        setModalError('Location / City is required.')
        return
      }
      if (!logoUrl) {
        setModalError('Hospital Logo upload is compulsory.')
        return
      }

      setIsSaving(true)
      let savedRecord = null
      try {
        let fileToSend = newItemData.logoFile
        if (!fileToSend && logoUrl && logoUrl.startsWith('data:')) {
          fileToSend = dataURLtoFile(logoUrl, newItemData.logoFileName || `${name.toLowerCase().replace(/\s+/g, '-')}-logo.png`)
        }

        let backendLogoUrl = ''
        if (logoUrl && !logoUrl.startsWith('data:') && logoUrl.length <= 500) {
          backendLogoUrl = logoUrl
        }

        // 1. If file/dataURL is available, upload to multipart clients endpoint first
        if (fileToSend) {
          try {
            const apiRes = await postClientDetails({
              file: fileToSend,
              clientName: name,
              cityName: location || '',
              isActive: true,
            })
            if (apiRes && apiRes.data) {
              savedRecord = apiRes.data
              if (apiRes.data.id) {
                backendLogoUrl = getClientImageUrl(apiRes.data.id)
              }
            }
          } catch (err) {
            console.warn('Backend multipart upload notice:', err)
          }
        }

        if (editingItem && editingItem.type === 'clients') {
          // 2. Update company client in backend (/it/api/v1/omedo/websites/company-clients/{id})
          try {
            const updateRes = await updateCompanyClient(editingItem.id, {
              client_name: name,
              logo_url: backendLogoUrl || (logoUrl && !logoUrl.startsWith('data:') ? logoUrl : ''),
              short_description: location,
              is_featured: true,
              is_active: true,
            })
            if (updateRes) savedRecord = updateRes.data || updateRes || savedRecord
          } catch (err) {
            console.warn('Backend update company client notice:', err)
          }
        } else {
          // 3. Create company client in backend (/it/api/v1/omedo/websites/company-clients)
          try {
            const createRes = await createCompanyClient({
              client_name: name,
              logo_url: backendLogoUrl || (logoUrl && !logoUrl.startsWith('data:') ? logoUrl : ''),
              short_description: location,
              is_featured: true,
              is_active: true,
            })
            if (createRes) savedRecord = createRes.data || createRes || savedRecord
          } catch (err) {
            console.warn('Backend create company client notice:', err)
          }
        }
      } catch (err) {
        console.warn('Backend client save error:', err)
      } finally {
        setIsSaving(false)
      }

      const finalLogo = formatLogoUrl(
        savedRecord?.image_base64 ||
        savedRecord?.logo_url ||
        (savedRecord?.id ? getClientImageUrl(savedRecord.id) : logoUrl),
        savedRecord?.id
      )

      if (editingItem && editingItem.type === 'clients') {
        setClients((prev) =>
          prev.map((item, idx) =>
            item.id === editingItem.id || idx === editingItem.index
              ? {
                  ...item,
                  id: savedRecord?.id || item.id,
                  name: savedRecord?.client_name || name,
                  location: savedRecord?.short_description || savedRecord?.city_name || location,
                  logoUrl: finalLogo,
                  logoText: (savedRecord?.client_name || name).slice(0, 10).toUpperCase(),
                  status: (savedRecord?.is_active ?? true) ? 'ACTIVE' : 'INACTIVE',
                  featured: Boolean(savedRecord?.is_featured ?? true),
                }
              : item
          )
        )
      } else {
        const created = {
          id: savedRecord?.id || Date.now(),
          name: savedRecord?.client_name || name,
          location: savedRecord?.short_description || savedRecord?.city_name || location,
          logoUrl: finalLogo,
          logoText: (savedRecord?.client_name || name).slice(0, 10).toUpperCase(),
          badgeColor: '#00685e',
          status: (savedRecord?.is_active ?? true) ? 'ACTIVE' : 'INACTIVE',
          featured: Boolean(savedRecord?.is_featured ?? true),
        }
        setClients([created, ...clients])
      }
    } else if (targetType === 'reviews') {
      const name = newItemData.name?.trim()
      const organization = newItemData.organization?.trim()
      const content = newItemData.content?.trim()

      if (!name) {
        setModalError('Doctor / Client Name is required.')
        return
      }
      if (!organization) {
        setModalError('Hospital / Medical Center is required.')
        return
      }
      if (!content) {
        setModalError('Review Quote is required.')
        return
      }

      setIsSaving(true)
      let savedReview = null
      const payload = {
        client_hospital: organization,
        person_name: name,
        designation: newItemData.role?.trim() || 'Verified Medical Practitioner',
        profile_image_url: newItemData.profileImageUrl?.trim() || '',
        testimonial: content,
        rating: Number(newItemData.rating) || 5,
        display_order: Number(newItemData.displayOrder ?? 0),
        is_active: true,
      }

      try {
        if (editingItem && editingItem.type === 'reviews') {
          const apiRes = await updateTestimonial(editingItem.id, payload).catch((err) => {
            console.warn('updateTestimonial notice:', err)
            return null
          })
          if (apiRes) savedReview = apiRes.data || apiRes
        } else {
          const apiRes = await postTestimonial(payload).catch(async (err) => {
            console.warn('postTestimonial direct notice, trying client fallback:', err)
            const matchedClient = clients.find(
              (c) => c && c.name && organization && c.name.toLowerCase().trim() === organization.toLowerCase().trim()
            )
            const targetClientId = matchedClient?.id || (clients[0] && typeof clients[0].id === 'number' ? clients[0].id : null)
            return createClientTestimonial(targetClientId, payload).catch(() => null)
          })
          if (apiRes) savedReview = apiRes.data || apiRes
        }
      } catch (err) {
        console.warn('Review API notice:', err)
      } finally {
        setIsSaving(false)
      }

      if (editingItem && editingItem.type === 'reviews') {
        setReviews((prev) =>
          prev.map((item, idx) =>
            idx === editingItem.index || (item.id && item.id === editingItem.id)
              ? {
                  ...item,
                  id: savedReview?.id || item.id,
                  name: savedReview?.person_name || name,
                  organization: savedReview?.client_hospital || savedReview?.organization || organization,
                  content: savedReview?.testimonial || content,
                  role: savedReview?.designation || newItemData.role?.trim() || item.role || 'Verified Medical Practitioner',
                  rating: Number(savedReview?.rating ?? newItemData.rating ?? item.rating ?? 5),
                  avatar: name.slice(0, 2).toUpperCase(),
                  avatarUrl: savedReview?.profile_image_url || newItemData.profileImageUrl || item.avatarUrl || null,
                  displayOrder: Number(savedReview?.display_order ?? newItemData.displayOrder ?? item.displayOrder ?? 0),
                  status: (savedReview?.is_active ?? true) ? 'ACTIVE' : 'INACTIVE',
                }
              : item
          )
        )
      } else {
        const created = {
          id: savedReview?.id || Date.now(),
          name: savedReview?.person_name || name,
          role: savedReview?.designation || newItemData.role?.trim() || 'Verified Medical Practitioner',
          organization: savedReview?.client_hospital || organization,
          content: savedReview?.testimonial || content,
          rating: Number(savedReview?.rating ?? newItemData.rating ?? 5),
          avatar: name.slice(0, 2).toUpperCase(),
          avatarUrl: savedReview?.profile_image_url || newItemData.profileImageUrl || null,
          displayOrder: Number(savedReview?.display_order ?? newItemData.displayOrder ?? 0),
          status: 'ACTIVE',
        }
        setReviews([created, ...reviews])
      }
    }

    setNewItemData({})
    setEditingItem(null)
    setModalError(null)
    setIsModalOpen(false)
  }

  // Sidebar Menu Items Definition
  const sidebarMenus = [
    {
      id: 'queries',
      label: 'Client Queries',
      icon: 'table_chart',
      desc: 'Live requests from backend API',
    },
    {
      id: 'clients',
      label: 'Client Logos',
      icon: 'domain',
      desc: 'Hospital & partner clinic brand logos',
    },
    {
      id: 'reviews',
      label: 'Reviews Manager',
      icon: 'rate_review',
      desc: 'Doctor testimonials & ratings',
    },
  ]

  // ═════════════════════════════════════════════════════════════════════════
  // 1. AUTHENTICATED ADMIN CONSOLE LAYOUT
  // ═════════════════════════════════════════════════════════════════════════
  if (isAuthenticated) {
    return (
      <motion.div {...pageTransition} className="min-h-screen bg-[#f8fafc] text-[#121d1f] flex flex-col font-sans">
        
        {/* ── TOP ADMIN CONSOLE SUB-HEADER ── */}
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-2xs">
          
          {/* Left: Logo & Admin Status Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="flex items-center shrink-0 transition-transform duration-200 hover:scale-[1.02]" title="Return to Homepage">
              <img
                src={omedoLogo}
                alt="OMEDO Hospital Management System"
                className="h-7 sm:h-8 md:h-9 w-auto object-contain"
              />
            </Link>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#00685e] text-white shadow-xs">
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          {/* Right: Actions + Profile + Logout */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#334155] bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="hidden sm:inline">Back to Site</span>
            </Link>

            {/* Profile Pill */}
            <div className="flex items-center gap-2 pl-1.5 pr-2.5 sm:pr-3 py-1 bg-slate-50 border border-slate-200 rounded-full">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#00685e] text-white flex items-center justify-center text-[10px] font-bold">
                {authUser?.username ? authUser.username.slice(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[#1e293b] leading-tight">
                  {authUser?.name || authUser?.username || 'Admin'}
                </div>
                <div className="text-[9px] text-[#64748b]">
                  {authUser?.role || 'Super Admin'}
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 border border-red-200 bg-red-50/70 hover:bg-red-100 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* ── TOAST NOTIFICATION POPUP ── */}
        <AnimatePresence>
          {exportToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-4 sm:right-8 z-50 max-w-md bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 flex items-start gap-3"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  exportToast.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {exportToast.type === 'success' ? 'check_circle' : 'error'}
                </span>
              </div>
              <div className="flex-1 text-left">
                <h4 className="text-xs font-black text-slate-900">{exportToast.title}</h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{exportToast.message}</p>
              </div>
              <button
                type="button"
                onClick={() => setExportToast(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BODY: SIDEBAR + MAIN CONTENT GRID ── */}
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* ── LEFT SIDEBAR NAVIGATION ── */}
          <aside className="w-full md:w-60 lg:w-68 bg-white border-r border-slate-200 p-3 sm:p-4 shrink-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible">
            
            {sidebarMenus.map((menu) => {
              const isActive = activeMenu === menu.id
              return (
                <button
                  key={menu.id}
                  type="button"
                  onClick={() => {
                    setActiveMenu(menu.id)
                    setActiveFilter('ALL')
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer text-left whitespace-nowrap border ${
                    isActive
                      ? 'shadow-xs'
                      : 'border-transparent hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: 'color-mix(in srgb, var(--t-primary, #00685e) 12%, #ffffff)',
                          borderColor: 'color-mix(in srgb, var(--t-primary, #00685e) 35%, transparent)',
                        }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{
                        color: isActive ? 'var(--t-primary, #00685e)' : '#64748b',
                      }}
                    >
                      {menu.icon}
                    </span>
                    <div>
                      <div
                        className="font-bold text-xs"
                        style={{
                          color: isActive ? 'var(--t-primary, #00685e)' : '#1e293b',
                        }}
                      >
                        {menu.label}
                      </div>
                      <div className="text-[10px] text-[#64748b] hidden lg:block font-normal mt-0.5">
                        {menu.desc}
                      </div>
                    </div>
                  </div>

                  {menu.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-black rounded-full text-white shadow-xs shrink-0 ${menu.badgeColor || 'bg-emerald-500'}`}>
                      {menu.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </aside>

          {/* ── MAIN CONTENT AREA ── */}
          <main className="flex-1 p-3 sm:p-5 lg:p-7 bg-[#f8fafc] overflow-y-auto">
            
            {/* Header section */}
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight flex items-center gap-2.5 flex-wrap" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <span>
                    {activeMenu === 'queries' && 'Client Queries & Demo Requests'}
                    {activeMenu === 'clients' && 'Client Logos'}
                    {activeMenu === 'reviews' && 'Reviews Manager'}
                  </span>
                  {activeMenu === 'queries' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Data Table
                    </span>
                  )}
                </h1>
                <p className="text-xs text-[#64748b] mt-1">
                  {activeMenu === 'queries' && 'Manage, inspect, and export inbound doctor demo inquiries & hospital consultation requests.'}
                  {activeMenu === 'clients' && 'Manage, filter, and upload partner hospital & clinic chain logos.'}
                  {activeMenu === 'reviews' && 'Moderate, approve, and curate verified doctor testimonials & star ratings.'}
                </p>
              </div>

              {/* Quick Live Refresh & Status Badge */}
              {activeMenu === 'queries' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-700 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                    <span>Total Inquiries: <strong className="text-[#00685e] text-sm font-black">{totalDisplayCount}</strong></span>
                  </div>

                  <button
                    type="button"
                    onClick={() => loadLiveDemoRequests(true)}
                    disabled={isLoadingLive}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200 shadow-2xs disabled:opacity-60"
                    title={lastSyncTime ? `Last synced: ${lastSyncTime}` : 'Sync live inquiries from backend'}
                  >
                    <span className={`material-symbols-outlined text-base text-[#00685e] ${isLoadingLive ? 'animate-spin' : ''}`}>
                      sync
                    </span>
                    <span>{isLoadingLive ? 'Syncing...' : 'Sync API'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* ── KPI METRIC CARDS: TOTAL INQUIRIES, TOTAL LOGOS, TOTAL REVIEWS ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5">
              {/* Card 1: Total Inquiries */}
              <div
                onClick={() => {
                  setActiveMenu('queries')
                  setActiveFilter('ALL')
                }}
                className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer shadow-2xs hover:shadow-xs flex items-center justify-between ${
                  activeMenu === 'queries' ? 'border-[#00685e] ring-1 ring-[#00685e]/20' : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Inquiries</p>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">{totalDisplayCount}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Inbound requests
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-50 text-[#00685e] border border-teal-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">mark_email_unread</span>
                </div>
              </div>

              {/* Card 2: Total Logos */}
              <div
                onClick={() => {
                  setActiveMenu('clients')
                  setActiveFilter('ALL')
                }}
                className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer shadow-2xs hover:shadow-xs flex items-center justify-between ${
                  activeMenu === 'clients' ? 'border-[#00685e] ring-1 ring-[#00685e]/20' : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Logos</p>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">{clients.length}</p>
                  <p className="text-[10px] text-sky-600 font-semibold mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    Partner hospital logos
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">domain</span>
                </div>
              </div>

              {/* Card 3: Total Reviews */}
              <div
                onClick={() => {
                  setActiveMenu('reviews')
                  setActiveFilter('ALL')
                }}
                className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer shadow-2xs hover:shadow-xs flex items-center justify-between ${
                  activeMenu === 'reviews' ? 'border-[#00685e] ring-1 ring-[#00685e]/20' : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Reviews</p>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">{reviews.length}</p>
                  <p className="text-[10px] text-violet-600 font-semibold mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    Doctor testimonials posted
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">rate_review</span>
                </div>
              </div>
            </div>

            {/* ── TOOLBAR: FILTER CONTROLS + DATE RANGE + SEARCH + EXPORT CONTROLS ── */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs mb-5 flex flex-col gap-3">
              
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder={
                      activeMenu === 'queries'
                        ? 'Search doctor, hospital clinic, phone, email, city, requirement message...'
                        : 'Search records...'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00685e]/20 focus:border-[#00685e] font-medium text-slate-800 transition-all placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  )}
                </div>

                {/* Right Toolbar Controls */}
                {activeMenu === 'queries' ? (
                  <div className="flex items-center gap-2.5 flex-wrap justify-between lg:justify-end">
                    
                    {/* Date Filter Range */}
                    <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-1 px-2 py-1">
                        <span className="material-symbols-outlined text-slate-400 text-sm">calendar_month</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">From:</span>
                        <input
                          type="date"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          className="text-xs bg-transparent border-0 focus:outline-none text-slate-700 font-semibold cursor-pointer"
                          title="Filter from date (yyyy-MM-dd)"
                        />
                      </div>
                      <span className="text-slate-300 font-light">—</span>
                      <div className="flex items-center gap-1 px-2 py-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">To:</span>
                        <input
                          type="date"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          className="text-xs bg-transparent border-0 focus:outline-none text-slate-700 font-semibold cursor-pointer"
                          title="Filter to date (yyyy-MM-dd)"
                        />
                      </div>
                      {(fromDate || toDate) && (
                        <button
                          type="button"
                          onClick={() => {
                            setFromDate('')
                            setToDate('')
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                          title="Reset Date Filters"
                        >
                          <span className="material-symbols-outlined text-sm">restart_alt</span>
                        </button>
                      )}
                    </div>

                    {/* Active vs Archived Tab Switcher */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setInquiryTab('active')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          inquiryTab === 'active'
                            ? 'bg-white text-[#00685e] shadow-2xs font-extrabold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="View Unarchived Inquiries"
                      >
                        <span className="material-symbols-outlined text-base">inbox</span>
                        <span>Unarchived</span>
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-teal-50 text-[#00685e] font-bold">
                          {queries.length}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setInquiryTab('archived')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          inquiryTab === 'archived'
                            ? 'bg-amber-600 text-white shadow-2xs font-extrabold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="View Archived Inquiries"
                      >
                        <span className="material-symbols-outlined text-base">archive</span>
                        <span>Archived</span>
                        {archivedQueries.length > 0 && (
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${inquiryTab === 'archived' ? 'bg-white text-amber-700' : 'bg-amber-100 text-amber-800'}`}>
                            {archivedQueries.length}
                          </span>
                        )}
                      </button>
                    </div>

                    {/* View Switcher: Table vs Cards */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setQueriesViewMode('sheet')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          queriesViewMode === 'sheet'
                            ? 'bg-white text-[#00685e] shadow-2xs font-extrabold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Modern Data Table View"
                      >
                        <span className="material-symbols-outlined text-base">table_chart</span>
                        <span className="hidden sm:inline">Table</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setQueriesViewMode('card')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          queriesViewMode === 'card'
                            ? 'bg-white text-[#00685e] shadow-2xs font-extrabold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="CRM Cards View"
                      >
                        <span className="material-symbols-outlined text-base">grid_view</span>
                        <span className="hidden sm:inline">Cards</span>
                      </button>
                    </div>

                    {/* Export Excel Button */}
                    <button
                      type="button"
                      onClick={handleExcelExport}
                      disabled={isExportingExcel}
                      className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-70"
                      title="Download all queries as Excel spreadsheet (.xlsx)"
                    >
                      {isExportingExcel ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Exporting...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-base">download</span>
                          <span>Export Excel</span>
                        </>
                      )}
                    </button>

                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {/* Active/Inactive filters for Clients & Reviews */}
                    <div className="flex items-center gap-1">
                      {['ALL', 'ACTIVE', 'INACTIVE'].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setActiveFilter(f)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeFilter === f
                              ? 'bg-[#00685e] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={openModal}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                      style={{
                        backgroundColor: 'var(--t-primary, #00685e)',
                        color: '#ffffff',
                      }}
                    >
                      <span className="material-symbols-outlined text-base">add</span>
                      <span>Add New</span>
                    </button>
                  </div>
                )}

              </div>

            </div>

            {/* ═════════════════════════════════════════════════════════════ */}
            {/* 1. QUERIES SECTION: TABLE & CARDS VIEW                        */}
            {/* ═════════════════════════════════════════════════════════════ */}
            {activeMenu === 'queries' && (
              <div>
                {/* ── MODERN DATA TABLE VIEW ── */}
                {queriesViewMode === 'sheet' && (
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
                    
                    {/* Table Header Ribbon */}
                    <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs font-medium text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${inquiryTab === 'archived' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        <span className="font-bold text-slate-800">
                          Showing <strong className={inquiryTab === 'archived' ? 'text-amber-700' : 'text-[#00685e]'}>{filteredQueries.length}</strong> of {totalDisplayCount} {inquiryTab === 'archived' ? 'Archived Inquiries' : 'Unarchived Inquiries'}
                        </span>
                        {inquiryTab === 'archived' && (
                          <span className="ml-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold uppercase tracking-wider">
                            Archive Vault
                          </span>
                        )}
                        {(searchQuery || fromDate || toDate) && (
                          <span className="ml-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                            Filters Active
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopyQueryTable}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                          title="Copy tab-separated table rows to paste directly into Excel / Spreadsheets"
                        >
                          <span className="material-symbols-outlined text-sm text-slate-500">content_copy</span>
                          <span className="hidden sm:inline">Copy TSV</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleExcelExport}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                          title="Download Excel spreadsheet"
                        >
                          <span className="material-symbols-outlined text-sm">file_download</span>
                          <span>Download .xlsx</span>
                        </button>
                      </div>
                    </div>

                    {/* Table Container with Horizontal & Vertical Scroll */}
                    <div className="overflow-x-auto max-h-[640px] overflow-y-auto">
                      <table className="w-full border-collapse text-left text-xs">
                        <thead>
                          <tr className="bg-slate-100/90 sticky top-0 z-10 border-b border-slate-200 text-[11px] font-extrabold text-slate-700 uppercase tracking-wider backdrop-blur-xs">
                            <th className="py-3 px-3.5 min-w-[70px]">ID</th>
                            <th className="py-3 px-3.5 min-w-[140px]">Date &amp; Time</th>
                            <th className="py-3 px-3.5 min-w-[200px]">Doctor / Client Name</th>
                            <th className="py-3 px-3.5 min-w-[210px]">Hospital / Clinic</th>
                            <th className="py-3 px-3.5 min-w-[140px]">Mobile Contact</th>
                            <th className="py-3 px-3.5 min-w-[180px]">Email Address</th>
                            <th className="py-3 px-3.5 min-w-[130px]">Location</th>
                            <th className="py-3 px-3.5 min-w-[260px]">Inquiry Message</th>
                            <th className="py-3 px-3.5 text-center min-w-[90px]">Actions</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 bg-white font-sans text-slate-700">
                          {filteredQueries.length === 0 ? (
                            <tr>
                              <td colSpan={9} className="py-16 text-center text-slate-400">
                                <div className="flex flex-col items-center justify-center gap-3">
                                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                                    <span className="material-symbols-outlined text-3xl">search_off</span>
                                  </div>
                                  <div className="text-sm font-bold text-slate-700">No client inquiries found</div>
                                  <div className="text-xs text-slate-400 max-w-sm">
                                    No records match your current search or date range filters. Try clearing or expanding your criteria.
                                  </div>
                                  {(searchQuery || fromDate || toDate) && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSearchQuery('')
                                        setFromDate('')
                                        setToDate('')
                                      }}
                                      className="mt-1 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                                    >
                                      Clear Filters
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ) : (
                            filteredQueries.map((q, idx) => (
                              <tr
                                key={q.id || idx}
                                className="hover:bg-teal-50/40 transition-colors group border-b border-slate-100"
                              >
                                {/* ID */}
                                <td className="py-3 px-3.5 font-mono text-[11px] font-bold text-slate-600 whitespace-nowrap">
                                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                                    #{q.id}
                                  </span>
                                </td>

                                {/* Date & Time */}
                                <td className="py-3 px-3.5 text-xs text-slate-600 whitespace-nowrap font-medium">
                                  <div className="flex items-center gap-1.5 text-slate-700">
                                    <span className="material-symbols-outlined text-xs text-slate-400">schedule</span>
                                    <span>{q.date || q.rawDate || 'Recent'}</span>
                                  </div>
                                </td>

                                {/* Doctor / Client Name */}
                                <td className="py-3 px-3.5 whitespace-nowrap">
                                  <div className="flex items-center gap-2.5">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${getAvatarBg(q.name)} shrink-0 shadow-2xs`}>
                                      {getInitials(q.name)}
                                    </div>
                                    <div>
                                      <span
                                        className="font-bold text-slate-900 block text-xs hover:text-[#00685e] cursor-pointer transition-colors"
                                        onClick={() => setSelectedQueryDetail(q)}
                                        title={q.name}
                                      >
                                        {q.name}
                                      </span>
                                    </div>
                                  </div>
                                </td>

                                {/* Hospital / Clinic */}
                                <td className="py-3 px-3.5 font-semibold text-[#00685e] whitespace-nowrap">
                                  <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-sm text-[#00685e]/70">local_hospital</span>
                                    <span className="truncate max-w-[180px] block" title={q.facility || q.hospital_clinic_name}>
                                      {q.facility || q.hospital_clinic_name || 'Healthcare Facility'}
                                    </span>
                                  </div>
                                </td>

                                {/* Mobile Contact */}
                                <td className="py-3 px-3.5 font-mono text-xs text-slate-700 whitespace-nowrap">
                                  <span className="font-semibold text-slate-800">{q.mobile || '-'}</span>
                                </td>

                                {/* Email Address */}
                                <td className="py-3 px-3.5 text-xs text-slate-600 whitespace-nowrap">
                                  {q.email ? (
                                    <a
                                      href={`mailto:${q.email}`}
                                      className="text-slate-600 hover:text-[#00685e] hover:underline flex items-center gap-1.5"
                                      title={q.email}
                                    >
                                      <span className="material-symbols-outlined text-xs text-slate-400">mail</span>
                                      <span className="truncate max-w-[150px]">{q.email}</span>
                                    </a>
                                  ) : (
                                    <span className="text-slate-400 italic text-[11px]">-</span>
                                  )}
                                </td>

                                {/* Location */}
                                <td className="py-3 px-3.5 text-xs text-slate-600 whitespace-nowrap">
                                  <div className="flex items-center gap-1 text-slate-700">
                                    <span className="material-symbols-outlined text-xs text-slate-400">location_on</span>
                                    <span className="truncate max-w-[120px] block" title={q.location}>
                                      {q.location || 'India'}
                                    </span>
                                  </div>
                                </td>

                                {/* Inquiry Message */}
                                <td className="py-3 px-3.5 text-xs text-slate-700 max-w-[260px]">
                                  <div
                                    onClick={() => setSelectedQueryDetail(q)}
                                    className="truncate cursor-pointer hover:text-[#00685e] hover:underline text-slate-600 group-hover:text-slate-900 transition-colors"
                                    title={q.message}
                                  >
                                    {q.message}
                                  </div>
                                </td>

                                {/* Actions */}
                                <td className="py-3 px-3.5 text-center whitespace-nowrap">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setSelectedQueryDetail(q)}
                                      className="w-7 h-7 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#00685e] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                      title="View Full Inquiry Details"
                                    >
                                      <span className="material-symbols-outlined text-sm">visibility</span>
                                    </button>
                                    {inquiryTab === 'archived' ? (
                                      <button
                                        type="button"
                                        onClick={() => handleRestoreQuery(q)}
                                        className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs border border-emerald-200/60"
                                        title="Restore Inquiry to Unarchived"
                                      >
                                        <span className="material-symbols-outlined text-sm">unarchive</span>
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => handleArchiveQuery(q)}
                                        className="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs border border-amber-200/60"
                                        title="Archive Inquiry"
                                      >
                                        <span className="material-symbols-outlined text-sm">archive</span>
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Table Bottom Status Row */}
                    <div className="px-5 py-3 border-t border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="material-symbols-outlined text-sm text-[#00685e]">help_outline</span>
                        <span>Click on any doctor or message row to open the complete dialogue &amp; hospital notes.</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={handleExcelExport}
                          className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">file_download</span>
                          <span>Download Spreadsheet (.xlsx)</span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}

                {/* ── ALTERNATIVE CRM CARDS VIEW ── */}
                {queriesViewMode === 'card' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {filteredQueries.map((q, idx) => (
                      <div
                        key={q.id || idx}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* Card Top Row */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 font-mono text-[10px] font-bold">
                              #{q.id}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">schedule</span>
                              {q.date || 'Recent'}
                            </span>
                          </div>

                          {/* Client / Hospital Name */}
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${getAvatarBg(q.name)} shrink-0`}>
                              {getInitials(q.name)}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate" title={q.name}>{q.name}</h3>
                              <div className="text-[11px] font-semibold text-[#00685e] truncate" title={q.facility || q.hospital_clinic_name}>
                                {q.facility || q.hospital_clinic_name}
                              </div>
                            </div>
                          </div>

                          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">location_on</span>
                            <span className="truncate">{q.location || 'India'}</span>
                          </div>

                          {/* Inquiry Snippet */}
                          <div
                            onClick={() => setSelectedQueryDetail(q)}
                            className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 line-clamp-3 leading-relaxed cursor-pointer hover:bg-teal-50/30 transition-colors"
                          >
                            "{q.message}"
                          </div>
                        </div>

                        {/* Card Bottom Controls */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div className="font-mono text-xs text-slate-700 font-semibold truncate">
                            <span>{q.mobile || 'No phone'}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedQueryDetail(q)}
                              className="w-7 h-7 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#00685e] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                              title="View Details"
                            >
                              <span className="material-symbols-outlined text-sm">visibility</span>
                            </button>
                            {inquiryTab === 'archived' ? (
                              <button
                                type="button"
                                onClick={() => handleRestoreQuery(q)}
                                className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs border border-emerald-200/60"
                                title="Restore to Unarchived"
                              >
                                <span className="material-symbols-outlined text-sm">unarchive</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleArchiveQuery(q)}
                                className="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs border border-amber-200/60"
                                title="Archive Inquiry"
                              >
                                <span className="material-symbols-outlined text-sm">archive</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════ */}
            {/* 2. CLIENT LOGOS CARDS                                         */}
            {/* ═════════════════════════════════════════════════════════════ */}
            {activeMenu === 'clients' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-3.5">
                {clients
                  .filter((item) => activeFilter === 'ALL' || item.status === activeFilter)
                  .filter((item) => (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((client, idx) => {
                    const isActive = client.status === 'ACTIVE'
                    return (
                      <div
                        key={client.id || idx}
                        className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                      >
                        <div>
                          <h3 className="text-xs font-bold text-[#0f172a] truncate mb-0.5" title={client.name}>
                            {client.name}
                          </h3>

                          <div className="my-1.5 h-18 sm:h-20 w-full rounded-xl flex items-center justify-center p-1 bg-white border border-slate-200/80 shadow-2xs overflow-hidden">
                            <SafeImage
                              src={client.logoUrl}
                              alt={client.name}
                              className="w-full h-full max-h-full max-w-full object-contain select-none"
                              fallback={
                                <div
                                  className="w-full h-full rounded-xl flex items-center justify-center text-xs font-black tracking-wider text-white shadow-inner p-2 text-center"
                                  style={{ background: client.badgeColor || '#00685e' }}
                                >
                                  {client.logoText || client.name.slice(0, 10).toUpperCase()}
                                </div>
                              }
                            />
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold text-[#64748b] bg-slate-100 border border-slate-200 truncate max-w-[85px] sm:max-w-[100px]" title={client.location || 'Pan India'}>
                              {client.location || 'Pan India'}
                            </span>

                            <div className="flex items-center gap-1 shrink-0">
                              <span className={`text-[9px] font-bold ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {isActive ? 'ACTIVE' : 'INACTIVE'}
                              </span>
                              <button
                                type="button"
                                onClick={() => toggleItemStatus(client.id, 'clients')}
                                className={`w-7 h-4 rounded-full transition-colors relative cursor-pointer ${
                                  isActive ? 'bg-emerald-500' : 'bg-slate-300'
                                }`}
                              >
                                <span
                                  className={`block w-3 h-3 rounded-full bg-white shadow-xs transition-transform absolute top-0.5 ${
                                    isActive ? 'right-0.5' : 'left-0.5'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditModal(client, idx, 'clients')}
                              className="flex-1 py-1 px-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-semibold text-[#334155] flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                            >
                              <span className="material-symbols-outlined text-xs">edit</span>
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteItem(client.id, 'clients')}
                              className="p-1 rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-100 text-red-600 cursor-pointer transition-all flex items-center justify-center"
                              title="Delete Record"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════ */}
            {/* 3. REVIEWS MANAGER CARDS                                      */}
            {/* ═════════════════════════════════════════════════════════════ */}
            {activeMenu === 'reviews' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {reviews
                  .filter((item) => activeFilter === 'ALL' || item.status === activeFilter)
                  .filter((item) => ((item.name || '') + (item.organization || '')).toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((review, idx) => {
                    const isActive = review.status !== 'INACTIVE'
                    return (
                      <div
                        key={review.id || idx}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between overflow-hidden"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center text-base shrink-0">
                              <span className="material-symbols-outlined text-base">rate_review</span>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50/90 border border-amber-200/80 shadow-2xs shrink-0">
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className="material-symbols-outlined text-xs leading-none"
                                    style={{
                                      fontVariationSettings: star <= (review.rating || 5) ? "'FILL' 1" : "'FILL' 0",
                                      color: star <= (review.rating || 5) ? '#f59e0b' : '#cbd5e1',
                                    }}
                                  >
                                    star
                                  </span>
                                ))}
                              </div>
                              <span className="text-[10px] font-black text-amber-700 ml-0.5">
                                {(Number(review.rating) || 5).toFixed(1)}
                              </span>
                            </div>
                          </div>

                          <h3 className="text-sm font-bold text-[#0f172a] truncate">{review.name}</h3>
                          <p className="text-xs font-semibold mt-0.5 truncate" style={{ color: 'var(--t-primary, #00685e)' }}>
                            {review.organization}
                          </p>
                          <p className="text-[11px] text-[#64748b] truncate">{review.role}</p>

                          <p className="mt-3 text-xs text-[#334155] leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100 line-clamp-3">
                            "{review.content}"
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-3">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-[#64748b] text-[11px]">Verified Doctor</span>
                            
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {isActive ? 'ACTIVE' : 'INACTIVE'}
                              </span>
                              <button
                                type="button"
                                onClick={() => toggleItemStatus(review.id || idx, 'reviews')}
                                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                                  isActive ? 'bg-emerald-500' : 'bg-slate-300'
                                }`}
                              >
                                <span
                                  className={`block w-4 h-4 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                                    isActive ? 'right-0.5' : 'left-0.5'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(review, idx, 'reviews')}
                              className="flex-1 py-1.5 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-[#334155] flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                            >
                              <span className="material-symbols-outlined text-sm">edit</span>
                              <span>Edit Review</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteItem(review.id || idx, 'reviews')}
                              className="p-1.5 rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-100 text-red-600 cursor-pointer transition-all"
                              title="Delete Record"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}

          </main>
        </div>

        {/* ── VIEW QUERY FULL DETAIL MODAL / DRAWER (CLEAN READ-ONLY) ── */}
        <AnimatePresence>
          {selectedQueryDetail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
              onClick={() => setSelectedQueryDetail(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-100"
              >
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                      QUERY #{selectedQueryDetail.id}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-2">
                      {selectedQueryDetail.name}
                    </h3>
                    <p className="text-xs font-bold text-[#00685e]">
                      {selectedQueryDetail.facility || selectedQueryDetail.hospital_clinic_name}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedQueryDetail(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>

                {/* Details Grid */}
                <div className="space-y-4">
                  
                  {/* Contact Action Pill Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Mobile Number</div>
                      <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                        <span>{selectedQueryDetail.mobile || 'Not specified'}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Email Address</div>
                      <div className="text-xs font-semibold text-slate-900 mt-0.5 truncate">
                        {selectedQueryDetail.email ? (
                          <a href={`mailto:${selectedQueryDetail.email}`} className="hover:underline text-[#00685e]">
                            {selectedQueryDetail.email}
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Location</div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">{selectedQueryDetail.location || 'India'}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Date Logged</div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">
                        {selectedQueryDetail.date || 'Recent'}
                      </div>
                    </div>
                  </div>

                  {/* Full Message Block */}
                  <div>
                    <div className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                      Client Requirement / Message
                    </div>
                    <div className="p-4 rounded-2xl bg-[#effcfe]/40 border border-[#00685e]/20 text-xs text-slate-800 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap font-medium">
                      {selectedQueryDetail.message}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2">
                    {archivedQueries.some((a) => a.id === selectedQueryDetail.id) ? (
                      <button
                        type="button"
                        onClick={() => handleRestoreQuery(selectedQueryDetail)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center gap-1.5 border border-emerald-200 cursor-pointer transition-colors"
                        title="Restore this inquiry to unarchived"
                      >
                        <span className="material-symbols-outlined text-sm">unarchive</span>
                        <span>Unarchive Inquiry</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleArchiveQuery(selectedQueryDetail)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center gap-1.5 border border-amber-200 cursor-pointer transition-colors"
                        title="Archive this inquiry record"
                      >
                        <span className="material-symbols-outlined text-sm">archive</span>
                        <span>Archive Inquiry</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedQueryDetail(null)}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ADD / EDIT ITEM MODAL (CLIENTS & REVIEWS ONLY) ── */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0f172a]">
                      {editingItem ? 'Edit' : 'Add New'}{' '}
                      {modalType === 'clients' ? 'Hospital Client' : 'Doctor Review'}
                    </h3>
                    <p className="text-[11px] text-[#64748b] mt-0.5 font-medium">
                      {editingItem ? 'Update information and save changes below.' : 'All fields marked with * are strictly compulsory.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      setEditingItem(null)
                      setNewItemData({})
                      setModalError(null)
                    }}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>

                {modalError && (
                  <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2.5 animate-shake">
                    <span className="material-symbols-outlined text-lg text-red-600 shrink-0">error</span>
                    <span>{modalError}</span>
                  </div>
                )}

                <form onSubmit={handleAddItemSubmit} className="space-y-4">
                  {modalType === 'clients' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-[#334155] mb-1">
                          Hospital / Clinic Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Manipal Super Specialty Hospital"
                          value={newItemData.name || ''}
                          onChange={(e) => {
                            setNewItemData({ ...newItemData, name: e.target.value })
                            if (modalError) setModalError(null)
                          }}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--t-primary)]/25 focus:border-[var(--t-primary)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#334155] mb-1">
                          Location / Cities <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Bengaluru, Karnataka"
                          value={newItemData.location || ''}
                          onChange={(e) => {
                            setNewItemData({ ...newItemData, location: e.target.value })
                            if (modalError) setModalError(null)
                          }}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--t-primary)]/25 focus:border-[var(--t-primary)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#334155] mb-1">
                          Upload Hospital Logo <span className="text-red-500">*</span>
                        </label>
                        
                        {newItemData.logoUrl ? (
                          <div className="p-3 rounded-2xl border border-emerald-200 bg-emerald-50/40 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-14 rounded-xl bg-white border border-emerald-200 p-1 flex items-center justify-center overflow-hidden shadow-2xs">
                                <SafeImage
                                  src={newItemData.logoUrl}
                                  alt="Logo preview"
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                              <div className="text-left">
                                <div className="text-xs font-bold text-[#0f172a] truncate max-w-[200px]">
                                  {newItemData.logoFileName || 'logo-image.png'}
                                </div>
                                <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                                  <span className="material-symbols-outlined text-xs text-emerald-600">check_circle</span>
                                  <span>Ready to publish</span>
                                </div>
                              </div>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => {
                                setNewItemData((prev) => ({ ...prev, logoUrl: null, logoFileName: null }))
                                if (modalError) setModalError(null)
                              }}
                              className="px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-100/70 rounded-lg transition-colors cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <label
                            className={`flex flex-col items-center justify-center p-4 sm:p-5 border-2 border-dashed rounded-2xl cursor-pointer transition-all text-center group ${
                              modalError && !newItemData.logoUrl
                                ? 'border-red-400 bg-red-50/40'
                                : 'border-slate-200 hover:border-[#00685e] bg-slate-50/60 hover:bg-teal-50/30'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-full bg-teal-50 text-[#00685e] group-hover:bg-[#00685e] group-hover:text-white transition-all flex items-center justify-center mb-2">
                              <span className="material-symbols-outlined text-xl">upload_file</span>
                            </div>
                            <span className="text-xs font-bold text-[#334155]">
                              Click to browse or drag &amp; drop logo <span className="text-red-500">*</span>
                            </span>
                            <span className="text-[10px] text-[#64748b] mt-0.5 font-medium">
                              PNG, JPG, SVG or WebP (Max 5MB) — Required
                            </span>
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/svg+xml, image/webp"
                              onChange={handleLogoUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </>
                  )}

                  {modalType === 'reviews' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-[#334155] mb-1">
                          Doctor / Client Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Rajesh K. Sharma"
                          value={newItemData.name || ''}
                          onChange={(e) => {
                            setNewItemData({ ...newItemData, name: e.target.value })
                            if (modalError) setModalError(null)
                          }}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--t-primary)]/25 focus:border-[var(--t-primary)]"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-[#334155] mb-1">
                            Hospital / Medical Center <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Apollo Healthcare Network"
                            value={newItemData.organization || ''}
                            onChange={(e) => {
                              setNewItemData({ ...newItemData, organization: e.target.value })
                              if (modalError) setModalError(null)
                            }}
                            className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--t-primary)]/25 focus:border-[var(--t-primary)]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#334155] mb-1">
                            Role / Designation
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Senior Consultant / MD"
                            value={newItemData.role || ''}
                            onChange={(e) => {
                              setNewItemData({ ...newItemData, role: e.target.value })
                              if (modalError) setModalError(null)
                            }}
                            className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--t-primary)]/25 focus:border-[var(--t-primary)]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#334155] mb-1">
                          Profile Photo URL <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="url"
                          placeholder="https://example.com/doctor-photo.jpg"
                          value={newItemData.profileImageUrl || ''}
                          onChange={(e) => {
                            setNewItemData({ ...newItemData, profileImageUrl: e.target.value })
                            if (modalError) setModalError(null)
                          }}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--t-primary)]/25 focus:border-[var(--t-primary)]"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-[#334155]">
                            Rating / Stars <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 shadow-2xs">
                            {(hoverRating || newItemData.rating || 5) === 5 && '5.0 Stars — Excellent'}
                            {(hoverRating || newItemData.rating || 5) === 4 && '4.0 Stars — Very Good'}
                            {(hoverRating || newItemData.rating || 5) === 3 && '3.0 Stars — Good'}
                            {(hoverRating || newItemData.rating || 5) === 2 && '2.0 Stars — Fair'}
                            {(hoverRating || newItemData.rating || 5) === 1 && '1.0 Star — Poor'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((starVal) => {
                              const activeScore = hoverRating || newItemData.rating || 5
                              const isFilled = starVal <= activeScore
                              return (
                                <button
                                  key={starVal}
                                  type="button"
                                  onMouseEnter={() => setHoverRating(starVal)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  onClick={() => {
                                    setNewItemData((prev) => ({ ...prev, rating: starVal }))
                                    if (modalError) setModalError(null)
                                  }}
                                  className="p-1 rounded-lg hover:scale-120 transition-all duration-150 cursor-pointer flex items-center justify-center focus:outline-none group"
                                  title={`${starVal} Star${starVal > 1 ? 's' : ''}`}
                                >
                                  <span
                                    className="material-symbols-outlined text-2xl transition-all duration-150 group-hover:drop-shadow-sm"
                                    style={{
                                      fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0",
                                      color: isFilled ? '#f59e0b' : '#cbd5e1',
                                    }}
                                  >
                                    star
                                  </span>
                                </button>
                              )
                            })}
                          </div>

                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((num) => {
                              const isSelected = (newItemData.rating || 5) === num
                              return (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => {
                                    setNewItemData((prev) => ({ ...prev, rating: num }))
                                    if (modalError) setModalError(null)
                                  }}
                                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-amber-500 text-white shadow-xs scale-105'
                                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                                  }`}
                                >
                                  {num}★
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#334155] mb-1">
                          Review Quote <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Enter doctor's feedback regarding OMEDO HMS..."
                          value={newItemData.content || ''}
                          onChange={(e) => {
                            setNewItemData({ ...newItemData, content: e.target.value })
                            if (modalError) setModalError(null)
                          }}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--t-primary)]/25 focus:border-[var(--t-primary)]"
                        />
                      </div>
                    </>
                  )}

                  <div className="pt-3 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false)
                        setEditingItem(null)
                        setNewItemData({})
                        setModalError(null)
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-[#475569] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: 'var(--t-primary, #00685e)',
                        color: '#ffffff',
                      }}
                    >
                      {isSaving ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>{editingItem ? 'Save Changes' : 'Save Record'}</span>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    )
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 2. UNAUTHENTICATED SIGN-IN SCREEN
  // ═════════════════════════════════════════════════════════════════════════
  return (
    <motion.div {...pageTransition} className="min-h-screen flex flex-col lg:flex-row bg-[#effcfe]/30 selection:bg-[#00685e]/20 selection:text-[#00685e]">
      
      {/* ── LEFT COLUMN: BRANDING HERO CANVAS (DESKTOP ONLY) ── */}
      <div
        className="hidden lg:flex lg:w-[48%] xl:w-[45%] flex-col items-center justify-center p-8 lg:p-16 relative overflow-hidden shrink-0 min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #ccfbf1 0%, #e6faf7 35%, #e0f2fe 70%, #bae6fd 100%)',
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-3xl rotate-12 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.12) 100%)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.7)',
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.1) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.6)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl bg-white/85 backdrop-blur-2xl border border-white shadow-[0_20px_60px_rgba(0,104,94,0.14)] max-w-sm sm:max-w-md w-full mx-auto"
        >
          <Link to="/" className="block group transition-transform duration-300 hover:scale-105" title="Return to OMEDO Homepage">
            <img
              src={omedoLogo}
              alt="OMEDO - Hospital Management Software"
              className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] h-auto object-contain mx-auto drop-shadow-sm"
            />
          </Link>
          <div className="mt-5 pt-3.5 border-t border-slate-200/80 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-[#00685e]">
              Admin Portal
            </span>
          </div>
        </motion.div>

        <div className="absolute bottom-6 text-center z-10 text-[11px] text-[#6d7a77] font-medium">
          © {new Date().getFullYear()} OMEDO Software Solutions Pvt. Ltd.
        </div>
      </div>

      {/* ── RIGHT COLUMN: LOGIN FORM PANEL (RESPONSIVE FOR ALL SCREEN SIZES) ── */}
      <div className="w-full lg:w-[52%] xl:w-[55%] min-h-screen flex flex-col justify-between p-4 xs:p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-[#effcfe]/40 via-[#f0fdfa]/30 to-[#f8fafc] relative">
        
        {/* Top Back Navigation Bar */}
        <div className="w-full flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6d7a77] hover:text-[#00685e] transition-colors py-1 px-2 rounded-lg hover:bg-white/60"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to main page</span>
          </Link>

          <span className="lg:hidden text-[10px] font-extrabold uppercase tracking-wider text-[#00685e] bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded-full">
            Admin Portal
          </span>
        </div>

        {/* Center Card Container */}
        <div className="w-full max-w-[420px] mx-auto my-auto py-6 sm:py-8">
          
          {/* Mobile Logo Branding (shown only on mobile < lg) */}
          <div className="text-center mb-5 lg:hidden">
            <Link to="/" className="inline-block transition-transform duration-200 hover:scale-105" title="OMEDO Home">
              <img
                src={omedoLogo}
                alt="OMEDO"
                className="h-10 sm:h-12 w-auto mx-auto object-contain drop-shadow-xs"
              />
            </Link>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-9 shadow-[0_15px_45px_rgba(0,104,94,0.08)] border border-slate-200/80">
            
            <div className="text-center mb-6 sm:mb-7">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-[#121d1f] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Admin Login
              </h2>
              <p className="text-xs text-[#6d7a77] mt-1.5 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Enter your credentials to access the dashboard
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#3d4947] mb-1.5">
                  USERNAME / EMAIL
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6d7a77] text-lg">
                    person_outline
                  </span>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Username or admin@omedosoft.com"
                    className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-[#effcfe]/30 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#121d1f] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00685e]/25 focus:border-[#00685e] transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#3d4947] mb-1.5">
                  PASSWORD
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6d7a77] text-lg">
                    lock_outline
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-11 pr-11 py-2.5 sm:py-3 bg-[#effcfe]/30 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#121d1f] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00685e]/25 focus:border-[#00685e] transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6d7a77] hover:text-[#00685e] cursor-pointer p-1"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 sm:py-3.5 rounded-xl font-extrabold text-white bg-[#00685e] hover:bg-[#00524a] active:scale-98 transition-all shadow-md shadow-[#00685e]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-3 text-xs sm:text-sm tracking-wide"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {authLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

          </div>
        </div>

        {/* Footer info on mobile & desktop */}
        <div className="text-center py-2 text-[10px] sm:text-[11px] text-[#64748b] font-medium">
          © {new Date().getFullYear()} OMEDO Software Solutions Pvt. Ltd. · Secure Admin Portal
        </div>

      </div>

    </motion.div>
  )
}
