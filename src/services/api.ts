import axios from 'axios';

// Use relative path to go through nginx proxy
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Use authToken to match AuthContext
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Type definitions
export interface Project {
  ProjectID: number;
  ProjectCode: string;
  ProjectDescription: string;
  IsActive: boolean;
  CreatedDate: string;
  ModifiedDate?: string;
  // Add camelCase compatibility
  projectID?: number;
  projectCode?: string;
  projectDescription?: string;
}


export interface CostCode {
  CostCodeID: number;
  CostCode: string;
  Description?: string;
  IsActive: boolean;
  // Add camelCase compatibility
  costCodeID?: number;
  costCode?: string;
  description?: string;
}

export interface ProjectExtra {
  ExtraID: number;
  ProjectID: number;
  ExtraValue: string;
  Description?: string;
  IsActive: boolean;
  // Add camelCase compatibility
  extraID?: number;
  projectID?: number;
  extraValue?: string;
  description?: string;
}

export interface Employee {
  EmployeeID: string;
  FullName: string;
  Email?: string;
  Class: string;
  Department?: string;
  ActiveEmp: boolean;
  // Add commonly used computed properties for compatibility
  employeeID?: string;
  fullName?: string;
  department?: string;
  firstName?: string;
  lastName?: string;
  class?: string;
}

export interface TimesheetEntry {
  EntryID?: number;
  EmployeeID: string;
  DateWorked: string;
  ProjectCode: string;
  ExtraValue?: string;
  CostCodeID: number;
  PayID: number;
  Hours: number;
  Notes?: string;
  Status: string;
  CreatedDate?: string;
  ModifiedDate?: string;
}

// API service objects
export const projectApi = {
  getAll: () => api.get<{ success: boolean; data: Project[] }>('/projects'),
  getById: (id: number) => api.get<{ success: boolean; data: Project }>(`/projects/${id}`),
  getByCode: (code: string) => api.get<{ success: boolean; data: Project }>(`/projects/code/${code}`),
  getExtras: (projectCode: string) => api.get<{ success: boolean; data: ProjectExtra[] }>(`/projects/${projectCode}/extras`),
  getCostCodes: (projectCode: string, extraValue?: string) => {
    const params = extraValue ? { extraValue } : {};
    return api.get<{ success: boolean; data: CostCode[] }>(`/projects/${projectCode}/costcodes`, { params });
  }
};

export const employeeApi = {
  getAll: () => api.get<{ success: boolean; data: Employee[] }>('/employees'),
  getById: (id: string) => api.get<{ success: boolean; data: Employee }>(`/employees/${id}`),
  getTimesheets: (id: string, params?: any) => 
    api.get<{ success: boolean; data: TimesheetEntry[] }>(`/employees/${id}/timesheets`, { params })
};

// Enhanced timesheet API with comprehensive features
export const timesheetApi = {
  getAll: (params?: any) => api.get<{ success: boolean; data: TimesheetEntry[] }>('/timesheets', { params }),
  getById: (id: number) => api.get<{ success: boolean; data: TimesheetEntry }>(`/timesheets/${id}`),
  create: (data: any) => api.post<{ success: boolean; data: TimesheetEntry }>('/timesheets', data),
  update: (id: number, data: Partial<TimesheetEntry>) => 
    api.put<{ success: boolean; data: TimesheetEntry }>(`/timesheets/${id}`, data),
  delete: (id: number) => api.delete<{ success: boolean }>(`/timesheets/${id}`),
  submit: (data: { employeeId: string; weekEndingDate: string }) => 
    api.post<{ success: boolean; data: any }>('/timesheets/submit', data),
  getWeeklySummary: (params: { employeeId: string; weekEndingDate: string }) =>
    api.get<{ success: boolean; data: any }>('/timesheets/summary', { params })
};

export const reportApi = {
  getWeeklySummary: (params?: any) => api.get('/reports/weekly-summary', { params }),
  getProjectHours: (params?: any) => api.get('/reports/project-hours', { params }),
  getEmployeeHours: (params?: any) => api.get('/reports/employee-hours', { params }),
  getOvertime: (params?: any) => api.get('/reports/overtime', { params })
};

// Export types for backward compatibility
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface TimesheetSubmission {
  id: number;
  employeeName: string;
  projectCode: string;
  projectDescription: string;
  weekEnding: string;
  submittedDate: string;
  totalHours: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
}

export interface TimesheetApproval {
  id: number;
  submissionId: number;
  approvedBy: string;
  approvedDate: string;
  notes?: string;
}

export default api;
