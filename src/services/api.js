import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000;

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            localStorage.removeItem('token');
            window.location.href = '/login';
            return Promise.reject(error);
        }
        
        return Promise.reject(error);
    }
);

// API endpoints
export const auth = {
    login: (credentials) => api.post('/auth/login', credentials),
    logout: () => api.post('/auth/logout'),
};

export const agents = {
    getAll: () => api.get('/agents'),
    getById: (id) => api.get(`/agents/${id}`),
    create: (data) => api.post('/agents', data),
    update: (id, data) => api.put(`/agents/${id}`, data),
    delete: (id) => api.delete(`/agents/${id}`),
    updateStatus: (id, status) => api.patch(`/agents/${id}/status`, { status }),
};

export const lists = {
    getAll: () => api.get('/lists'),
    getByAgent: (agentId) => api.get(`/lists/agent/${agentId}`),
    create: (data) => api.post('/lists', data),
    update: (id, data) => api.put(`/lists/${id}`, data),
    delete: (id) => api.delete(`/lists/${id}`),
    updateStatus: (id, status) => api.patch(`/lists/${id}/status`, { status }),
    upload: (formData) => api.post('/lists/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
};

export const dashboard = {
    getStats: () => api.get('/dashboard/stats'),
    getRecentActivity: () => api.get('/dashboard/activity'),
};

export default api;
