/**
 * Centralized API & Service Barrel Export
 * Re-exports all domain services, HTTP client, and utilities for 100% backward compatibility.
 */

// Core HTTP Client & Endpoints
export {
  API_BASE_URL,
  API_ENDPOINTS,
  request,
  http,
} from './apiClient'

// Authentication & Session Management
export {
  AUTH_TOKEN_ENDPOINT,
  getAuthToken,
  getAuthUser,
  logoutAdmin,
  isUserAuthenticated,
  getAuthHeaders,
  authenticateAdmin,
} from './auth.service'

// Demo Requests & Inquiries
export {
  submitDemoRequest,
  fetchDemoRequests,
  exportDemoRequestsExcel,
} from './demo.service'

// Company & Website Clients
export {
  fetchCompanyClients,
  createCompanyClient,
  updateCompanyClient,
  deleteCompanyClient,
  patchCompanyClientStatus,
  patchCompanyClientFeatured,
  fetchWebsiteClients,
  postClientDetails,
  deleteWebsiteClient,
  patchWebsiteClientStatus,
} from './clients.service'

// Testimonials & Reviews
export {
  fetchTestimonials,
  createClientTestimonial,
  updateTestimonial,
  deleteTestimonial,
  patchTestimonialStatus,
} from './testimonials.service'

// Export & File Utilities
export {
  triggerBlobDownload,
  downloadClientSideExcelCSV,
  copyQueryTableTSV,
} from '../utils/exportUtils'

// Image & URL Utilities
export {
  getClientImageUrl,
  sanitizeUrl,
  dataURLtoFile,
  formatLogoUrl,
} from '../utils/imageUtils'
