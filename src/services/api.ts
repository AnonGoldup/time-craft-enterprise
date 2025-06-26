import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.124:4000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: async (employeeId: string, password: string) => {
    const response = await api.post('/auth/login', { employeeId, password });
    return response.data;
  },
  
  setupPassword: async (token: string, password: string) => {
    const response = await api.post('/auth/setup-password', { token, password });
    return response.data;
  },
  
  logout: async () => {
    // Backend doesn't have logout endpoint yet, just clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};

// Employee endpoints
export const employeeAPI = {
  getAll: async () => {
    const response = await api.get('/employees');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },
};

// Project endpoints
export const projectAPI = {
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  
  getByCode: async (code: string) => {
    const response = await api.get(`/projects/${code}`);
    return response.data;
  },
  
  getExtras: async (code: string) => {
    const response = await api.get(`/projects/${code}/extras`);
    return response.data;
  },
  
  getCostCodes: async (code: string) => {
    const response = await api.get(`/projects/${code}/costcodes`);
    return response.data;
  },
};

// Timesheet endpoints
export const timesheetAPI = {
  create: async (data: any) => {
    const response = await api.post('/timesheets', data);
    return response.data;
  },
  
  update: async (id: number, data: any) => {
    const response = await api.put(`/timesheets/${id}`, data);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/timesheets/${id}`);
    return response.data;
  },
  
  getByEmployee: async (employeeId: string, startDate?: string, endDate?: string) => {
    const response = await api.get('/timesheets', {
      params: { employeeId, startDate, endDate }
    });
    return response.data;
  },
  
  submit: async (data: any) => {
    const response = await api.post('/timesheets/submit', data);
    return response.data;
  },
  
  getSummary: async (employeeId: string, weekEndingDate: string) => {
    const response = await api.get('/timesheets/summary', {
      params: { employeeId, weekEndingDate }
    });
    return response.data;
  },
};

export default api;
