/**
 * VESLocal API Client Service
 * Provides centralized, authenticated HTTP client for backend REST endpoints
 * with automatic Bearer token injection and graceful error parsing.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Universal request wrapper
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  // Attach JWT token from localStorage if available
  const token = localStorage.getItem('veslocal_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const config = {
    ...options,
    headers
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error = new Error(data?.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    // If server is unreachable (offline / connection refused)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      const offlineErr = new Error('Backend server is unreachable. Please verify the API server is running on port 5000.');
      offlineErr.status = 503;
      offlineErr.isOffline = true;
      throw offlineErr;
    }
    throw error;
  }
}

// Authentication API
export const authAPI = {
  login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
  register: (userData) => request('/auth/register', { method: 'POST', body: userData }),
  getMe: () => request('/auth/me', { method: 'GET' }),
  logout: () => request('/auth/logout', { method: 'POST' })
};

// Students Directory API
export const studentsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    if (params.department) query.append('department', params.department);
    if (params.skill) query.append('skill', params.skill);
    if (params.search) query.append('search', params.search);
    const queryString = query.toString();
    return request(`/students${queryString ? `?${queryString}` : ''}`, { method: 'GET' });
  },
  getById: (id) => request(`/students/${id}`, { method: 'GET' }),
  create: (studentData) => request('/students', { method: 'POST', body: studentData }),
  update: (id, updates) => request(`/students/${id}`, { method: 'PUT', body: updates }),
  delete: (id) => request(`/students/${id}`, { method: 'DELETE' })
};

// Opportunities / Collaboration Board API
export const opportunitiesAPI = {
  getAll: () => request('/opportunities', { method: 'GET' }),
  create: (oppData) => request('/opportunities', { method: 'POST', body: oppData }),
  toggleInterest: (id) => request(`/opportunities/${id}/interest`, { method: 'POST' }),
  delete: (id) => request(`/opportunities/${id}`, { method: 'DELETE' })
};

// Direct Messaging API
export const messagesAPI = {
  getThreads: () => request('/messages', { method: 'GET' }),
  sendMessage: (chatId, text) => request(`/messages/${chatId}`, { method: 'POST', body: { text } })
};

// Server Health API
export const healthAPI = {
  check: () => request('/health', { method: 'GET' })
};

export default {
  auth: authAPI,
  students: studentsAPI,
  opportunities: opportunitiesAPI,
  messages: messagesAPI,
  health: healthAPI,
  BASE_URL
};
