import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
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

// Auth APIs
export const login = (credentials) => api.post('/auth/login', credentials);

// Agent APIs
export const getAgents = () => api.get('/agents');
export const createAgent = (agentData) => api.post('/agents', agentData);
export const updateAgent = (id, agentData) => api.put(`/agents/${id}`, agentData);
export const deleteAgent = (id) => api.delete(`/agents/${id}`);

// List APIs
export const uploadList = (formData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    return api.post('/lists/upload', formData, config);
};

export const getListsByAgent = (agentId) => api.get(`/lists/agent/${agentId}`);
export const updateListStatus = (id, status) => api.put(`/lists/${id}/status`, { status });

export default api;
