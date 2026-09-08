import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { pageTransition } from '../../utils/animations'
import omedoLogo from '../../assets/omedo_logo.png'
import { initialClientLogos } from '../../data/clientLogos'
import { testimonials as initialTestimonials } from '../../data/testimonials'
import { postClientDetails, dataURLtoFile } from '../../services/api'

export default function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Defaults to true for immediate interactive access, or toggleable
  const [activeMenu, setActiveMenu] = useState('clients') // 'clients' | 'reviews'
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('ALL')

  // Auth Form State (for logged out state)
  const [email, setEmail] = useState('admin@omedosoft.com')
  const [password, setPassword] = useState('omedo@admin2026')
  const [showPassword, setShowPassword] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState(null)

  // Managed Datasets (Stored in localStorage with strict entity isolation)
  const [clients, setClients] = useState(() => {
    const s = localStorage.getItem('omedo_admin_clients')
    if (s) {
      try {
        const parsed = JSON.parse(s)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Keep only client records (not reviews that have doctor quote content)
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
          // Strictly keep only verified doctor reviews (must have quote content)
          const validReviews = parsed.filter((item) => item && item.content && typeof item.content === 'string' && item.content.trim().length > 0)
          if (validReviews.length > 0) return validReviews
        }
      } catch (e) {
        console.error(e)
      }
    }
    return initialTestimonials
  })

  // Modal State for Adding / Editing Item
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('clients') // 'clients' | 'reviews'
  const [editingItem, setEditingItem] = useState(null) // null or { id, index, type }
  const [newItemData, setNewItemData] = useState({})
  const [hoverRating, setHoverRating] = useState(0)
  const [modalError, setModalError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const openModal = () => {
    setEditingItem(null)
    setModalType(activeMenu) // Lock modal type strictly to current tab
    setNewItemData({
      rating: 5,
    })
    setHoverRating(0)
    setModalError(null)
    setIsModalOpen(true)
  }

  const openEditModal = (item, idx, type) => {
    setEditingItem({ id: item.id !== undefined ? item.id : idx, index: idx, type })
    setModalType(type) // Lock modal type strictly to item type
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

  // Sync to LocalStorage & Dispatch Cross-Component Update Event
  useEffect(() => {
    localStorage.setItem('omedo_admin_clients', JSON.stringify(clients))
    window.dispatchEvent(new Event('omedo_clients_updated'))
  }, [clients])
  useEffect(() => {
    localStorage.setItem('omedo_admin_reviews', JSON.stringify(reviews))
    window.dispatchEvent(new Event('omedo_reviews_updated'))
  }, [reviews])

  // Login handler
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError(null)
    setTimeout(() => {
      setAuthLoading(false)
      if (email.trim() && password.trim()) {
        setIsAuthenticated(true)
      } else {
        setAuthError('Please enter valid admin credentials.')
      }
    }, 500)
  }

  // Toggle Item Status Handler (ACTIVE / INACTIVE)
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
    if (!window.confirm('Are you sure you want to remove this item?')) return
    if (type === 'clients') setClients((prev) => prev.filter((i) => i.id !== id))
    if (type === 'reviews') setReviews((prev) => prev.filter((_, idx) => idx !== id))
  }

  // Handle Logo File Upload (reads file to base64 Data URL and gives a white background if image has transparent bg)
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

        // Process image to ensure any transparent background is filled with pure white
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

            // Fill solid white background for transparent images
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

  // Add or Edit Item Submit - Strictly Compulsory Validation & API Post
  const handleAddItemSubmit = async (e) => {
    e.preventDefault()
    setModalError(null)

    const targetType = editingItem?.type || modalType || activeMenu

    if (targetType === 'clients') {
      const name = newItemData.name?.trim()
      const location = newItemData.location?.trim()
      const logoUrl = newItemData.logoUrl

      if (!name) {
        setModalError('Hospital / Clinic Name is required. Please fill this field.')
        return
      }
      if (!location) {
        setModalError('Location / City is required. Please fill this field.')
        return
      }
      if (!logoUrl) {
        setModalError('Hospital Logo upload is compulsory. Please upload a logo before saving.')
        return
      }

      setIsSaving(true)
      let savedRecord = null
      try {
        let fileToSend = newItemData.logoFile
        if (!fileToSend && logoUrl && logoUrl.startsWith('data:')) {
          fileToSend = dataURLtoFile(logoUrl, newItemData.logoFileName || `${name.toLowerCase().replace(/\s+/g, '-')}-logo.png`)
        }

        // Post client details to API endpoint: http://103.153.58.135:8081/it/api/v1/omedo/client-details
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
        setModalError('Doctor / Client Name is required. Please fill this field.')
        return
      }
      if (!organization) {
        setModalError('Hospital / Medical Center is required. Please fill this field.')
        return
      }
      if (!content) {
        setModalError('Review Quote is required. Please fill this field.')
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

  // ═════════════════════════════════════════════════════════════════════════
  // 1. AUTHENTICATED ADMIN CONSOLE LAYOUT (Matching Reference Format)
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
                AD
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[#1e293b] leading-tight">Admin</div>
                <div className="text-[9px] text-[#64748b]">Super Admin</div>
              </div>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 border border-red-200 bg-red-50/70 hover:bg-red-100 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* ── BODY: SIDEBAR + MAIN CONTENT GRID ── */}
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* ── LEFT SIDEBAR NAVIGATION ── */}
          <aside className="w-full md:w-60 lg:w-64 bg-white border-r border-slate-200 p-4 shrink-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible">
            
            {[
              { id: 'clients', label: 'Client Logos', icon: 'domain' },
              { id: 'reviews', label: 'Reviews Manager', icon: 'rate_review' },
            ].map((menu) => {
              const isActive = activeMenu === menu.id
              return (
                <button
                  key={menu.id}
                  type="button"
                  onClick={() => {
                    setActiveMenu(menu.id)
                    setActiveFilter('ALL')
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-left whitespace-nowrap border ${
                    isActive
                      ? 'shadow-xs'
                      : 'border-transparent hover:bg-slate-100 hover:text-slate-900'
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
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{
                      color: isActive ? 'var(--t-primary, #00685e)' : '#64748b',
                    }}
                  >
                    {menu.icon}
                  </span>
                  <span
                    className="font-bold text-xs"
                    style={{
                      color: isActive ? 'var(--t-primary, #00685e)' : '#334155',
                    }}
                  >
                    {menu.label}
                  </span>
                </button>
              )
            })}
          </aside>

          {/* ── MAIN CONTENT AREA ── */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#f8fafc] overflow-y-auto">
            
            {/* Header section */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {activeMenu === 'clients' ? 'Client Logos' : 'Reviews Manager'}
              </h1>
              <p className="text-xs text-[#64748b] mt-1">
                {activeMenu === 'clients'
                  ? 'Manage, filter, and upload partner hospital & clinic chain logos.'
                  : 'Moderate, approve, and curate verified doctor testimonials & star ratings.'}
              </p>
            </div>

            {/* ── TOOLBAR: FILTER PILLS + SEARCH + ACTIONS ── */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              
              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                {['ALL', 'ACTIVE', 'INACTIVE'].map((filter) => {
                  const isSelected = activeFilter === filter
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                        isSelected
                          ? 'shadow-xs'
                          : 'bg-slate-100 text-[#64748b] hover:bg-slate-200 hover:text-[#1e293b]'
                      }`}
                      style={
                        isSelected
                          ? {
                              backgroundColor: 'var(--t-primary, #00685e)',
                              color: '#ffffff',
                            }
                          : {}
                      }
                    >
                      {filter}
                    </button>
                  )
                })}
              </div>

              {/* Search + Add Item */}
              <div className="flex items-center gap-2.5">
                <div className="relative flex-1 sm:w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--t-primary)]/20 focus:border-[var(--t-primary)]"
                  />
                </div>

                <button
                  type="button"
                  onClick={openModal}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer shrink-0"
                  style={{
                    backgroundColor: 'var(--t-primary, #00685e)',
                    color: '#ffffff',
                  }}
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  <span>Add New</span>
                </button>
              </div>

            </div>

            {/* ── 1. CLIENT LOGOS CARDS (COMPACT 5 PER ROW) ── */}
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
                          {/* Top: Hospital / Client Name */}
                          <h3 className="text-xs font-bold text-[#0f172a] truncate mb-0.5" title={client.name}>
                            {client.name}
                          </h3>

                          {/* Compact Logo Display (Uniform 1-Size, Clean Background) */}
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

                        {/* Card Bottom: Location Pill + Toggle Switch */}
                        <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-1.5">
                            {/* Location Pill */}
                            <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold text-[#64748b] bg-slate-100 border border-slate-200 truncate max-w-[85px] sm:max-w-[100px]" title={client.location || 'Pan India'}>
                              {client.location || 'Pan India'}
                            </span>

                            {/* Toggle Switch */}
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

                          {/* Action Buttons */}
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

            {/* ── 2. REVIEWS MANAGER CARDS (3-COLUMNS) ── */}
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
                          {/* Top Row: Icon + Star Rating */}
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

                          {/* Doctor & Hospital Name */}
                          <h3 className="text-sm font-bold text-[#0f172a] truncate">{review.name}</h3>
                          <p className="text-xs font-semibold mt-0.5 truncate" style={{ color: 'var(--t-primary, #00685e)' }}>
                            {review.organization}
                          </p>
                          <p className="text-[11px] text-[#64748b] truncate">{review.role}</p>

                          {/* Quote Box */}
                          <p className="mt-3 text-xs text-[#334155] leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100 line-clamp-3">
                            "{review.content}"
                          </p>
                        </div>

                        {/* Card Bottom: Toggle + Actions */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-3">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-[#64748b] text-[11px]">Verified Doctor</span>
                            
                            {/* Toggle Switch */}
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

        {/* ── ADD ITEM MODAL ── */}
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
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0f172a]">
                      {editingItem ? 'Edit' : 'Add New'} {modalType === 'clients' ? 'Hospital Client' : 'Doctor Review'}
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

                {/* Validation Error Alert Banner */}
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

                      {/* Upload Hospital Logo (Compulsory at the last) */}
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

                      {/* Interactive Star Rating Selector */}
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
                          {/* 5 Clickable & Hoverable Stars */}
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

                          {/* Quick Rating Selector Chips */}
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
                          <span>Publishing...</span>
                        </>
                      ) : (
                        <span>{editingItem ? 'Save Changes' : 'Save & Publish'}</span>
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
        {/* Floating Glassmorphic Ambient Shapes */}
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

        {/* Centered Big Logo */}
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

        {/* Bottom subtle copyright */}
        <div className="absolute bottom-6 text-center z-10 text-[11px] text-[#6d7a77] font-medium">
          © {new Date().getFullYear()} OMEDO Software Solutions Pvt. Ltd.
        </div>
      </div>

      {/* ── RIGHT COLUMN: LOGIN FORM PANEL ── */}
      <div className="w-full lg:w-[52%] xl:w-[55%] flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-[#effcfe]/40 relative">
        
        {/* Back Link */}
        <div className="w-full flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6d7a77] hover:text-[#00685e] transition-colors"
          >
            <span className="material-symbols-outlined text-base">&larr;</span>
            <span>Back to main page</span>
          </Link>
        </div>

        {/* Floating Center Card */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,104,94,0.08)] border border-[#bcc9c6]/40">
            
            {/* Card Header */}
            <div className="text-center mb-7">
              <h2 className="text-2xl sm:text-3xl font-black text-[#121d1f] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Admin Login
              </h2>
              <p className="text-xs text-[#6d7a77] mt-1.5 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Enter your credentials to access the dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* EMAIL */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#3d4947] mb-1.5">
                  EMAIL
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6d7a77] text-lg">
                    person_outline
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@omedosoft.com"
                    className="w-full pl-11 pr-4 py-3 bg-[#effcfe]/30 border border-[#bcc9c6]/60 rounded-xl text-sm text-[#121d1f] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00685e]/25 focus:border-[#00685e] transition-all font-medium"
                  />
                </div>
              </div>

              {/* PASSWORD */}
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

              {/* Error Alert */}
              {authError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                  {authError}
                </div>
              )}

              {/* Submit Button */}
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

            {/* Quick Demo Credentials note */}
            <div className="mt-5 p-3 rounded-xl bg-[#effcfe]/70 border border-[#bcc9c6]/40 text-center">
              <p className="text-[11px] text-[#3d4947]">
                ⚡ <strong>Quick Sign-In:</strong> Pre-filled with demo credentials. Click <strong>Sign In</strong> to access the admin dashboard.
              </p>
            </div>

          </div>
        </div>

        {/* Empty space filler for bottom alignment */}
        <div className="hidden lg:block h-6" />

      </div>

    </motion.div>
  )
}
