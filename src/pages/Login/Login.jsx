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
  copyQueryTableTSV,
  authenticateAdmin,
  logoutAdmin,
  getAuthToken,
  getAuthUser,
} from '../../services/api'

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

  // Managed Datasets
  const [clients, setClients] = useState(() => {
    const s = localStorage.getItem('omedo_admin_clients')
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
    const s = localStorage.getItem('omedo_admin_reviews')
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
    const s = localStorage.getItem('omedo_client_queries')
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

  // ── FETCH LIVE DEMO REQUESTS FROM BACKEND API: https://api.omedosoft.com/it/api/v1/omedo/demo-requests ──
  const loadLiveDemoRequests = useCallback(async (showToastNotice = false) => {
    if (!isAuthenticated) return
    setIsLoadingLive(true)
    try {
      const res = await fetchDemoRequests({
        search: searchQuery,
        fromDate,
        toDate,
      })

      if (res && res.success && Array.isArray(res.list)) {
        setIsBackendConnected(true)
        setLiveRequestsCount(res.total)
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))

        const normalized = res.list.map(normalizeQueryRecord)
        setQueries(normalized)
        localStorage.setItem('omedo_client_queries', JSON.stringify(normalized))

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
  }, [isAuthenticated, searchQuery, fromDate, toDate])

  // Initial load and filter change trigger (only when authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      loadLiveDemoRequests(false)
    }
  }, [loadLiveDemoRequests, isAuthenticated])

  // Sync datasets to localStorage
  useEffect(() => {
    localStorage.setItem('omedo_admin_clients', JSON.stringify(clients))
    window.dispatchEvent(new Event('omedo_clients_updated'))
  }, [clients])

  useEffect(() => {
    localStorage.setItem('omedo_admin_reviews', JSON.stringify(reviews))
    window.dispatchEvent(new Event('omedo_reviews_updated'))
  }, [reviews])

  useEffect(() => {
    localStorage.setItem('omedo_client_queries', JSON.stringify(queries))
  }, [queries])

  // Listen for real-time enquiries submitted on the site
  useEffect(() => {
    const handleExternalQueriesUpdate = () => {
      try {
        const s = localStorage.getItem('omedo_client_queries')
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
  const toggleItemStatus = (id, type) => {
    const toggle = (list) =>
      list.map((item, idx) => {
        const match = item.id !== undefined ? item.id === id : idx === id
        if (match) {
          const next = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
          return { ...item, status: next }
        }
        return item
      })

    if (type === 'clients') setClients(toggle)
    if (type === 'reviews') setReviews(toggle)
  }

  // Delete Item Handler
  const deleteItem = (id, type) => {
    if (!window.confirm('Are you sure you want to remove this record?')) return
    if (type === 'clients') setClients((prev) => prev.filter((i) => i.id !== id))
    if (type === 'reviews') setReviews((prev) => prev.filter((_, idx) => idx !== id))
    if (type === 'queries') setQueries((prev) => prev.filter((i) => i.id !== id))
  }

  // Filtered queries computation (search & date range only, no priority/status)
  const filteredQueries = useMemo(() => {
    return queries.filter((item) => {
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
  }, [queries, fromDate, toDate, searchQuery])

  // Summary counts
  const totalDisplayCount = liveRequestsCount !== null ? Math.max(liveRequestsCount, queries.length) : queries.length
  const uniqueLocationsCount = useMemo(() => {
    const locs = new Set(queries.map((q) => (q.location || '').trim()).filter(Boolean))
    return locs.size || 1
  }, [queries])
  const emailsProvidedCount = useMemo(() => queries.filter((q) => q.email && q.email.trim()).length, [queries])

  // Export to Excel handler
  const handleExcelExport = async () => {
    setIsExportingExcel(true)
    try {
      const res = await exportDemoRequestsExcel({
        search: searchQuery,
        fromDate,
        toDate,
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

  // Handle Logo File Upload
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setModalError('Please choose an image file under 5MB.')
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
            const canvas = document.createElement('canvas')
            const width = img.naturalWidth || img.width || 400
            const height = img.naturalHeight || img.height || 200
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            ctx.fillStyle = '#FFFFFF'
            ctx.fillRect(0, 0, width, height)
            ctx.drawImage(img, 0, 0, width, height)

            const processedUrl = canvas.toDataURL('image/png')
            const whiteBgFile = dataURLtoFile(processedUrl, file.name.replace(/\.[^/.]+$/, "") + ".png") || file
            setNewItemData((prev) => ({
              ...prev,
              logoUrl: processedUrl,
              logoFileName: file.name,
              logoFile: whiteBgFile,
            }))
          } catch (err) {
            console.error('Canvas processing error:', err)
            setNewItemData((prev) => ({
              ...prev,
              logoUrl: rawDataUrl,
              logoFileName: file.name,
              logoFile: file,
            }))
          }
        }
        img.onerror = () => {
          setNewItemData((prev) => ({
            ...prev,
            logoUrl: rawDataUrl,
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

        if (fileToSend) {
          const apiRes = await postClientDetails({
            file: fileToSend,
            clientName: name,
            cityName: location || '',
            isActive: true,
          })
          if (apiRes && apiRes.data) {
            savedRecord = apiRes.data
          }
        }
      } catch (err) {
        console.warn('Backend API client-details notification:', err)
        if (
          err.message &&
          !err.message.includes('Failed to fetch') &&
          !err.message.includes('NetworkError') &&
          !err.message.includes('502') &&
          !err.message.includes('504')
        ) {
          setModalError(err.message)
          setIsSaving(false)
          return
        }
      } finally {
        setIsSaving(false)
      }

      if (editingItem && editingItem.type === 'clients') {
        setClients((prev) =>
          prev.map((item, idx) =>
            item.id === editingItem.id || idx === editingItem.index
              ? {
                  ...item,
                  id: savedRecord?.id || item.id,
                  name: savedRecord?.client_name || name,
                  location: savedRecord?.city_name || location,
                  logoUrl: savedRecord?.image_base64 || logoUrl,
                  logoText: (savedRecord?.client_name || name).slice(0, 10).toUpperCase(),
                  status: (savedRecord?.is_active ?? true) ? 'ACTIVE' : 'INACTIVE',
                }
              : item
          )
        )
      } else {
        const created = {
          id: savedRecord?.id || Date.now(),
          name: savedRecord?.client_name || name,
          location: savedRecord?.city_name || location,
          logoUrl: savedRecord?.image_base64 || logoUrl,
          logoText: (savedRecord?.client_name || name).slice(0, 10).toUpperCase(),
          badgeColor: '#00685e',
          status: (savedRecord?.is_active ?? true) ? 'ACTIVE' : 'INACTIVE',
          featured: true,
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

      if (editingItem && editingItem.type === 'reviews') {
        setReviews((prev) =>
          prev.map((item, idx) =>
            idx === editingItem.index || (item.id && item.id === editingItem.id)
              ? {
                  ...item,
                  name,
                  organization,
                  content,
                  role: newItemData.role?.trim() || item.role || 'Verified Medical Practitioner',
                  rating: Number(newItemData.rating) || item.rating || 5,
                  avatar: name.slice(0, 2).toUpperCase(),
                }
              : item
          )
        )
      } else {
        const created = {
          id: Date.now(),
          name,
          role: newItemData.role?.trim() || 'Verified Medical Practitioner',
          organization,
          content,
          rating: Number(newItemData.rating) || 5,
          avatar: name.slice(0, 2).toUpperCase(),
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
      <motion.div {...pageTransition} className="min-h-screen bg-[#f8fafc] text-[#121d1f] flex flex-col font-sans pt-16 sm:pt-18 md:pt-21 2xl:pt-24">
        
        {/* ── TOP ADMIN CONSOLE SUB-HEADER ── */}
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-16 sm:top-18 md:top-21 2xl:top-24 z-30 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-2xs">
          
          {/* Left: Admin Status Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
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
              className="fixed top-28 right-4 sm:right-8 z-50 max-w-md bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 flex items-start gap-3"
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
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#107c41]/10 text-[#107c41] border border-[#107c41]/25 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">table_view</span>
                      Excel Spreadsheet Form
                    </span>
                  )}
                </h1>
                <p className="text-xs text-[#64748b] mt-1">
                  {activeMenu === 'queries' && 'Review, track, and export client hospital inquiries in Excel spreadsheet format.'}
                  {activeMenu === 'clients' && 'Manage, filter, and upload partner hospital & clinic chain logos.'}
                  {activeMenu === 'reviews' && 'Moderate, approve, and curate verified doctor testimonials & star ratings.'}
                </p>
              </div>

              {/* Quick Summary Badges for Queries + Live Refresh Button */}
              {activeMenu === 'queries' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Total Requests: <strong className="text-[#00685e] text-sm font-black">{totalDisplayCount}</strong></span>
                  </div>

                  <button
                    type="button"
                    onClick={() => loadLiveDemoRequests(true)}
                    disabled={isLoadingLive}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
                    title="Refresh data directly from backend endpoint: https://api.omedosoft.com/it/api/v1/omedo/demo-requests"
                  >
                    <span className={`material-symbols-outlined text-base ${isLoadingLive ? 'animate-spin' : ''}`}>
                      sync
                    </span>
                    <span>{isLoadingLive ? 'Syncing...' : 'Sync API'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* ── TOOLBAR: FILTER CONTROLS + DATE RANGE + SEARCH + EXPORT CONTROLS ── */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs mb-5 flex flex-col gap-3">
              
              {/* Row 1: Search Bar + View Switcher */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder={
                      activeMenu === 'queries'
                        ? 'Search by doctor, hospital, phone (+91...), email, city, message...'
                        : 'Search records...'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--t-primary)]/20 focus:border-[var(--t-primary)] font-medium"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      clear
                    </button>
                  )}
                </div>

                {/* View Switcher (for Queries) OR Add New Button (for Clients/Reviews only) */}
                <div className="flex items-center gap-2 justify-between lg:justify-end">
                  {activeMenu === 'queries' ? (
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setQueriesViewMode('sheet')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          queriesViewMode === 'sheet'
                            ? 'bg-white text-[#107c41] shadow-2xs font-extrabold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Excel Spreadsheet Grid View"
                      >
                        <span className="material-symbols-outlined text-base">table_chart</span>
                        <span className="hidden sm:inline">Sheet Grid</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setQueriesViewMode('card')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          queriesViewMode === 'card'
                            ? 'bg-white text-[var(--t-primary)] shadow-2xs font-extrabold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="CRM Cards View"
                      >
                        <span className="material-symbols-outlined text-base">view_agenda</span>
                        <span className="hidden sm:inline">Cards</span>
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

              {/* Row 2: Date Range Pickers + Excel Export Button */}
              {activeMenu === 'queries' && (
                <div className="pt-2.5 border-t border-slate-100 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
                  
                  {/* Date Filter Controls (Directly maps to backend fromDate & toDate params) */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">From:</span>
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="text-xs bg-transparent border-0 focus:outline-none text-slate-700 font-semibold cursor-pointer"
                        title="Filter from date (yyyy-MM-dd)"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">To:</span>
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
                        className="px-2 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Reset Date Range"
                      >
                        Reset Dates
                      </button>
                    )}
                  </div>

                  {/* ── EXPORT TO EXCEL BUTTON ── */}
                  <div className="flex items-center gap-2 shrink-0">
                    
                    {/* 1. Export Excel Button */}
                    <button
                      type="button"
                      onClick={handleExcelExport}
                      disabled={isExportingExcel}
                      className="px-3 py-2 rounded-xl text-xs font-extrabold text-white bg-[#107c41] hover:bg-[#0e6b37] active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-70"
                      title="Download queries as Excel (.xlsx / .csv)"
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

                </div>
              )}

            </div>

            {/* ═════════════════════════════════════════════════════════════ */}
            {/* 1. QUERIES SECTION: SPREADSHEET FORM                          */}
            {/* ═════════════════════════════════════════════════════════════ */}
            {activeMenu === 'queries' && (
              <div>
                {/* ── EXCEL SPREADSHEET GRID VIEW (NO PRIORITY / STATUS) ── */}
                {queriesViewMode === 'sheet' && (
                  <div className="bg-white rounded-2xl border border-slate-300/80 shadow-xs overflow-hidden flex flex-col">
                    
                    {/* Spreadsheet Sheet Top Ribbon / Status Bar */}
                    <div className="bg-slate-100 px-4 py-2 border-b border-slate-300 flex items-center justify-between text-xs font-medium text-slate-600">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#107c41]" />
                          <span>Sheet1: OMEDO_Client_Queries.xlsx</span>
                        </div>
                        <span className="text-slate-300">|</span>
                        <div className="hidden sm:flex items-center gap-1 font-mono text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          <span className="text-[#107c41] font-bold">fx</span>
                          <span>=FILTER(Queries{fromDate ? `, from="${fromDate}"` : ''}{toDate ? `, to="${toDate}"` : ''})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                        <span>Showing: <strong>{filteredQueries.length}</strong> of {totalDisplayCount} records</span>
                      </div>
                    </div>

                    {/* Table Container with Horizontal & Vertical Scroll */}
                    <div className="overflow-x-auto max-h-[640px] overflow-y-auto">
                      <table className="w-full border-collapse text-left text-xs">
                        
                        {/* Excel-Style Column Identifier Row (A, B, C, D...) */}
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-300 text-[10px] font-mono text-slate-500 select-none">
                            <th className="py-1 px-2 border-r border-slate-300 text-center w-10 font-bold">#</th>
                            <th className="py-1 px-3 border-r border-slate-300 font-bold">A</th>
                            <th className="py-1 px-3 border-r border-slate-300 font-bold">B</th>
                            <th className="py-1 px-3 border-r border-slate-300 font-bold">C</th>
                            <th className="py-1 px-3 border-r border-slate-300 font-bold">D</th>
                            <th className="py-1 px-3 border-r border-slate-300 font-bold">E</th>
                            <th className="py-1 px-3 border-r border-slate-300 font-bold">F</th>
                            <th className="py-1 px-3 border-r border-slate-300 font-bold">G</th>
                            <th className="py-1 px-3 border-r border-slate-300 font-bold">H</th>
                            <th className="py-1 px-3 font-bold text-center">I</th>
                          </tr>

                          {/* Data Column Headers */}
                          <tr className="bg-slate-50/90 sticky top-0 z-10 border-b border-slate-300 text-[11px] font-extrabold text-slate-700 uppercase tracking-wider backdrop-blur-xs">
                            <th className="py-2.5 px-2 border-r border-slate-200 text-center font-mono text-slate-400">Row</th>
                            <th className="py-2.5 px-3 border-r border-slate-200 min-w-[80px]">ID</th>
                            <th className="py-2.5 px-3 border-r border-slate-200 min-w-[130px]">Date &amp; Time</th>
                            <th className="py-2.5 px-3 border-r border-slate-200 min-w-[180px]">Doctor / Client Name</th>
                            <th className="py-2.5 px-3 border-r border-slate-200 min-w-[200px]">Hospital / Clinic</th>
                            <th className="py-2.5 px-3 border-r border-slate-200 min-w-[140px]">Mobile Contact</th>
                            <th className="py-2.5 px-3 border-r border-slate-200 min-w-[170px]">Email Address</th>
                            <th className="py-2.5 px-3 border-r border-slate-200 min-w-[130px]">Location</th>
                            <th className="py-2.5 px-3 border-r border-slate-200 min-w-[280px]">Inquiry Message</th>
                            <th className="py-2.5 px-3 text-center min-w-[90px]">Actions</th>
                          </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-slate-200 bg-white font-sans text-slate-700">
                          {filteredQueries.length === 0 ? (
                            <tr>
                              <td colSpan={10} className="py-12 text-center text-slate-400">
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-4xl text-slate-300">table_rows</span>
                                  <div className="text-sm font-bold text-slate-600">No client queries found</div>
                                  <div className="text-xs text-slate-400">Try adjusting your search query or date range filters.</div>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            filteredQueries.map((q, idx) => (
                              <tr
                                key={q.id || idx}
                                className={`hover:bg-teal-50/40 transition-colors group ${
                                  idx % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'
                                }`}
                              >
                                {/* Row Number */}
                                <td className="py-2.5 px-2 border-r border-slate-200 text-center font-mono text-[11px] text-slate-400 select-none bg-slate-50/60">
                                  {idx + 1}
                                </td>

                                {/* ID */}
                                <td className="py-2.5 px-3 border-r border-slate-200 font-mono text-[11px] font-bold text-slate-600">
                                  #{q.id}
                                </td>

                                {/* Date */}
                                <td className="py-2.5 px-3 border-r border-slate-200 text-[11px] font-medium text-slate-600 whitespace-nowrap">
                                  {q.date || q.rawDate || 'Recent'}
                                </td>

                                {/* Doctor / Client Name */}
                                <td className="py-2.5 px-3 border-r border-slate-200 font-bold text-slate-900 whitespace-nowrap">
                                  <span className="truncate max-w-[170px] block" title={q.name}>{q.name}</span>
                                </td>

                                {/* Hospital / Clinic */}
                                <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-[#00685e] whitespace-nowrap">
                                  <span className="truncate max-w-[190px] block" title={q.facility || q.hospital_clinic_name}>
                                    {q.facility || q.hospital_clinic_name || 'Healthcare Facility'}
                                  </span>
                                </td>

                                {/* Mobile Contact with direct WhatsApp / Call triggers */}
                                <td className="py-2.5 px-3 border-r border-slate-200 font-mono text-xs text-slate-700 whitespace-nowrap">
                                  <div className="flex items-center gap-2">
                                    <span>{q.mobile}</span>
                                    {q.mobile && (
                                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                                        <a
                                          href={`https://wa.me/${q.mobile.replace(/\D/g, '')}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-5 h-5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-700 flex items-center justify-center text-[10px]"
                                          title="Chat on WhatsApp"
                                        >
                                          <span className="material-symbols-outlined text-xs">chat</span>
                                        </a>
                                        <a
                                          href={`tel:${q.mobile}`}
                                          className="w-5 h-5 rounded bg-blue-100 hover:bg-blue-200 text-blue-700 flex items-center justify-center text-[10px]"
                                          title="Call client"
                                        >
                                          <span className="material-symbols-outlined text-xs">call</span>
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </td>

                                {/* Email */}
                                <td className="py-2.5 px-3 border-r border-slate-200 text-xs text-slate-600 whitespace-nowrap">
                                  {q.email ? (
                                    <a
                                      href={`mailto:${q.email}`}
                                      className="text-slate-600 hover:text-[#00685e] hover:underline flex items-center gap-1"
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
                                <td className="py-2.5 px-3 border-r border-slate-200 text-xs text-slate-600 whitespace-nowrap">
                                  <span className="truncate max-w-[120px] block" title={q.location}>
                                    {q.location || 'India'}
                                  </span>
                                </td>

                                {/* Inquiry Message */}
                                <td className="py-2.5 px-3 border-r border-slate-200 text-xs text-slate-700 max-w-[300px]">
                                  <div
                                    onClick={() => setSelectedQueryDetail(q)}
                                    className="truncate cursor-pointer hover:text-[#00685e] hover:underline"
                                    title={q.message}
                                  >
                                    {q.message}
                                  </div>
                                </td>

                                {/* Actions: View Details + Delete */}
                                <td className="py-2.5 px-3 text-center whitespace-nowrap">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setSelectedQueryDetail(q)}
                                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-[#00685e] cursor-pointer"
                                      title="View Full Inquiry Details"
                                    >
                                      <span className="material-symbols-outlined text-base">visibility</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => deleteItem(q.id, 'queries')}
                                      className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 cursor-pointer"
                                      title="Delete Query"
                                    >
                                      <span className="material-symbols-outlined text-base">delete</span>
                                    </button>
                                  </div>
                                </td>

                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Spreadsheet Bottom Status Row */}
                    <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-300 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="material-symbols-outlined text-sm text-[#107c41]">info</span>
                        <span>Click on any inquiry message to open the full dialogue drawer.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleExcelExport}
                          className="text-[11px] font-bold text-[#107c41] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">file_download</span>
                          <span>Download .xlsx</span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}

                {/* ── ALTERNATIVE CRM CARDS VIEW ── */}
                {queriesViewMode === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredQueries.map((q, idx) => (
                      <div
                        key={q.id || idx}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* Card Top Row */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-mono font-bold text-slate-400">#{q.id}</span>
                            <span className="text-[11px] text-slate-400 font-medium">{q.date || 'Recent'}</span>
                          </div>

                          {/* Client / Hospital Name */}
                          <h3 className="text-sm font-bold text-slate-900">{q.name}</h3>
                          <div className="text-xs font-bold text-[#00685e] mt-0.5">{q.facility || q.hospital_clinic_name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">location_on</span>
                            <span>{q.location || 'India'}</span>
                          </div>

                          {/* Inquiry Snippet */}
                          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 line-clamp-3 leading-relaxed">
                            {q.message}
                          </div>
                        </div>

                        {/* Card Bottom Controls */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1">
                            {q.mobile && (
                              <a
                                href={`https://wa.me/${q.mobile.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1 hover:bg-emerald-100"
                              >
                                <span className="material-symbols-outlined text-xs">chat</span>
                                <span>WhatsApp</span>
                              </a>
                            )}
                            {q.mobile && (
                              <a
                                href={`tel:${q.mobile}`}
                                className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1 hover:bg-blue-100"
                              >
                                <span className="material-symbols-outlined text-xs">call</span>
                                <span>Call</span>
                              </a>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => setSelectedQueryDetail(q)}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                              title="View Details"
                            >
                              <span className="material-symbols-outlined text-base">visibility</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteItem(q.id, 'queries')}
                              className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                              title="Delete Record"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-3.5">
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

                          {client.logoUrl ? (
                            <div className="my-1.5 h-18 sm:h-20 w-full rounded-xl flex items-center justify-center p-1 bg-white border border-slate-200/80 shadow-2xs overflow-hidden">
                              <img
                                src={client.logoUrl}
                                alt={client.name}
                                className="w-full h-full max-h-full max-w-full object-contain select-none"
                              />
                            </div>
                          ) : (
                            <div
                              className="my-1.5 h-18 sm:h-20 w-full rounded-xl flex items-center justify-center text-xs font-black tracking-wider text-white shadow-inner p-2 text-center"
                              style={{ background: client.badgeColor || '#00685e' }}
                            >
                              {client.logoText || client.name.slice(0, 10).toUpperCase()}
                            </div>
                          )}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {reviews
                  .filter((item) => activeFilter === 'ALL' || item.status === activeFilter)
                  .filter((item) => ((item.name || '') + (item.organization || '')).toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((review, idx) => {
                    const isActive = review.status !== 'INACTIVE'
                    return (
                      <div
                        key={review.id || idx}
                        className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center text-base">
                              <span className="material-symbols-outlined">rate_review</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50/90 border border-amber-200/80 shadow-2xs">
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className="material-symbols-outlined text-sm leading-none"
                                    style={{
                                      fontVariationSettings: star <= (review.rating || 5) ? "'FILL' 1" : "'FILL' 0",
                                      color: star <= (review.rating || 5) ? '#f59e0b' : '#cbd5e1',
                                    }}
                                  >
                                    star
                                  </span>
                                ))}
                              </div>
                              <span className="text-[10px] font-black text-amber-700">
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
                      <div className="text-xs font-mono font-bold text-slate-900 mt-0.5 flex items-center justify-between">
                        <span>{selectedQueryDetail.mobile || 'Not specified'}</span>
                        {selectedQueryDetail.mobile && (
                          <div className="flex items-center gap-1">
                            <a
                              href={`https://wa.me/${selectedQueryDetail.mobile.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1 hover:bg-emerald-200"
                            >
                              <span className="material-symbols-outlined text-xs">chat</span>
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={`tel:${selectedQueryDetail.mobile}`}
                              className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center gap-1 hover:bg-blue-200"
                            >
                              <span className="material-symbols-outlined text-xs">call</span>
                              <span>Call</span>
                            </a>
                          </div>
                        )}
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

                  <div className="pt-2 flex items-center justify-end">
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
                                <img
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
    <motion.div {...pageTransition} className="min-h-screen flex flex-col lg:flex-row bg-[#effcfe]/30 pt-16 sm:pt-18 md:pt-21 2xl:pt-24">
      
      {/* ── LEFT COLUMN: ONLY LOGO CENTERED IN GRADIENT CONTAINER ── */}
      <div
        className="w-full lg:w-[48%] xl:w-[45%] flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 relative overflow-hidden shrink-0 min-h-[360px] lg:min-h-[calc(100vh-5.5rem)]"
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

      {/* ── RIGHT COLUMN: LOGIN FORM PANEL ── */}
      <div className="w-full lg:w-[52%] xl:w-[55%] flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-[#effcfe]/40 relative">
        
        <div className="w-full flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6d7a77] hover:text-[#00685e] transition-colors"
          >
            <span className="material-symbols-outlined text-base">&larr;</span>
            <span>Back to main page</span>
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,104,94,0.08)] border border-[#bcc9c6]/40">
            
            <div className="text-center mb-7">
              <h2 className="text-2xl sm:text-3xl font-black text-[#121d1f] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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
                    className="w-full pl-11 pr-4 py-3 bg-[#effcfe]/30 border border-[#bcc9c6]/60 rounded-xl text-sm text-[#121d1f] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00685e]/25 focus:border-[#00685e] transition-all font-medium"
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
                    className="w-full pl-11 pr-11 py-3 bg-[#effcfe]/30 border border-[#bcc9c6]/60 rounded-xl text-sm text-[#121d1f] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00685e]/25 focus:border-[#00685e] transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6d7a77] hover:text-[#00685e] cursor-pointer"
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
                className="w-full py-3.5 rounded-xl font-extrabold text-white bg-[#00685e] hover:bg-[#00524a] active:scale-98 transition-all shadow-md shadow-[#00685e]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2 text-sm tracking-wide"
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

        <div className="hidden lg:block h-6" />

      </div>

    </motion.div>
  )
}
