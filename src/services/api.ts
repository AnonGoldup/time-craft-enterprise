import axios from 'axios';

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

// Types
export interface Employee {
  EmployeeID: string;
  FullName: string;
  Email?: string;
  Class?: string;
  Department?: string;
  ActiveEmp: boolean;
}

export interface Project {
  ProjectID: number;
  ProjectCode: string;
  ProjectDescription: string;
  Status: string;
  IsActive: boolean;
}

export interface ProjectExtra {
  ExtraID: number;
  ExtraValue: string;
  Description?: string;
}

export interface CostCode {
  CostCodeID: number;
  CostCode: string;
  Description: string;
  DisplayText?: string;
}

export interface TimesheetEntry {
  EntryID?: number;
  EmployeeID: string;
  DateWorked: string;
  ProjectID: number;
  ExtraID?: number;
  CostCodeID: number;
  StandardHours: number;
  OvertimeHours: number;
  Notes?: string;
  Status?: string;
}

// API Services
export const authApi = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
};

export const employeeApi = {
  getAll: () => api.get<Employee[]>('/employees?active=true'),
  getActive: () => api.get<{ data: Employee[] }>('/employees?active=true'),
  getById: (id: string) => api.get<Employee>(`/employees/${id}`),
  update: (id: string, data: Partial<Employee>) => 
    api.put<Employee>(`/employees/${id}`, data),
  getTimesheets: (id: string) => 
    api.get<TimesheetEntry[]>(`/employees/${id}/timesheets`),
};

export const projectApi = {
  getAll: () => api.get<Project[]>('/projects'),
  getActive: () => api.get('/projects'),
  getByCode: (code: string) => api.get<Project>(`/projects/${code}`),
  getExtras: (code: string) => api.get<{ data: ProjectExtra[] }>(`/projects/${code}/extras`),
  getCostCodes: (code: string, extraValue?: string) => {
    const params = extraValue ? { extra: extraValue } : {};
    return api.get<{ data: CostCode[] }>(`/projects/${code}/costcodes`, { params });
  },
  // Add these methods that the component is using
  getProjectExtras: (projectId: number) => {
  
// Need to convert projectId to projectCode - for now use direct endpoint
    return api.get(`/projects/extras/${projectId}`);
  },
  getCostCodesByProject: (projectId: number, extraId?: number) => {
    const params = extraId ? { extraId } : {};
  return api.get(`/projects/costcodes/${projectId}`, { params });
  },
};

export const timesheetApi = {
  getAll: (params?: any) => api.get<TimesheetEntry[]>('/timesheets', { params }),
  create: (data: TimesheetEntry) => api.post<TimesheetEntry>('/timesheets', data),
  update: (id: number, data: Partial<TimesheetEntry>) => 
    api.put<TimesheetEntry>(`/timesheets/${id}`, data),
  delete: (id: number) => api.delete(`/timesheets/${id}`),
  submit: (entries: number[]) => api.post('/timesheets/submit', { entries }),
  getSummary: (params?: any) => api.get('/timesheets/summary', { params }),
};

export const reportApi = {
  getWeeklySummary: (params?: any) => 
    api.get('/reports/weekly-summary', { params }),
  getProjectHours: (params?: any) => 
    api.get('/reports/project-hours', { params }),
  getEmployeeHours: (params?: any) => 
    api.get('/reports/employee-hours', { params }),
  getOvertime: (params?: any) => 
    api.get('/reports/overtime', { params }),
};

export default api;
