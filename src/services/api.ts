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
}

export interface ProjectExtra {
  ExtraID: number;
  ProjectID: number;
  ExtraValue: string;
  Description?: string;
  IsActive: boolean;
}

export interface CostCode {
  CostCodeID: number;
  CostCode: string;
  Description?: string;
  IsActive: boolean;
}

export interface Employee {
  EmployeeID: string;
  FullName: string;
  Email?: string;
  Class: string;
  Department?: string;
  ActiveEmp: boolean;
}

export interface TimesheetEntry {
<<<<<<< HEAD
  entryID: number;
  employeeID: string;
  dateWorked: string;
  projectID: number;
  extraID: number;
  costCodeID: number;
  payID: number;
  hours: number;
  unionID: number;
  entryType: string;
  notes: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'Exported';
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
  exportedDate: string;
  startTime: string;
  endTime: string;
  breakInTime: string;
  breakOutTime: string;
  timeIn: string;
  timeOut: string;
  breakIn: string;
  breakOut: string;
}

// Timesheet Submission interfaces
export interface TimesheetSubmission {
  submissionID?: number;
  employeeID: string;
  weekEndingDate: string;
  submissionType: string;
  submittedBy: string;
  submittedFor: string;
  submittedOn: string;
  totalStandardHours: number;
  totalOvertimeHours: number;
  submissionStatus: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
}

// Approval interfaces
export interface TimesheetApproval {
  approvalID?: number;
  submissionID: number;
  approvalLevel: number;
  approverID: string;
  approvalAction: 'Approved' | 'Rejected' | 'Returned';
  approvalDate?: string;
  approvalNotes?: string;
}

// Template interfaces
export interface TimesheetTemplate {
  templateID: number;
  employeeID: string;
  templateName: string;
  projectCode: string;
  extraValue: string;
  costCode: string;
  standardHours: number;
  overtimeHours: number;
  notes: string;
  isActive: boolean;
  createdDate: string;
}
=======
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
>>>>>>> f0a0cdd (feat: Complete Phase 1 - Frontend UI Implementation)

// Enhanced timesheet API with comprehensive features
export const timesheetApi = {
<<<<<<< HEAD
  getEntries: (employeeId: string, weekEnding?: string) => 
    apiClient.get<ApiResponse<TimesheetEntry[]>>(`/employees/${employeeId}/timesheets${weekEnding ? `?week=${weekEnding}` : ''}`),
  
  createEntry: (entry: Omit<TimesheetEntry, 'entryID'>) => 
    apiClient.post<ApiResponse<TimesheetEntry>>('/timesheets', entry),
  
  updateEntry: (entryId: number, entry: Partial<TimesheetEntry>) => 
    apiClient.put<ApiResponse<TimesheetEntry>>(`/timesheets/${entryId}`, entry),
  
  deleteEntry: (entryId: number) => 
    apiClient.delete<ApiResponse<void>>(`/timesheets/${entryId}`),

  // Enhanced features for comprehensive timesheet
  duplicateEntry: (entryId: number, newDate?: string) =>
    apiClient.post<ApiResponse<TimesheetEntry>>(`/timesheets/${entryId}/duplicate`, { newDate }),

  splitCrossMidnightEntry: (entryData: {
    employeeId: string;
    dateWorked: string;
    timeIn: string;
    timeOut: string;
    breakStart?: string;
    breakEnd?: string;
    projectCode: string;
    extraValue: string;
    costCode: string;
  }) =>
    apiClient.post<ApiResponse<TimesheetEntry[]>>('/timesheets/split-midnight', entryData),

  bulkCreateEntries: (entries: Omit<TimesheetEntry, 'entryID'>[]) =>
    apiClient.post<ApiResponse<TimesheetEntry[]>>('/timesheets/bulk', { entries }),

  bulkDeleteEntries: (entryIds: number[]) =>
    apiClient.delete<ApiResponse<void>>('/timesheets/bulk', { data: { entryIds } }),

  copyWeek: (employeeId: string, sourceWeek: string, targetWeek: string) =>
    apiClient.post<ApiResponse<TimesheetEntry[]>>('/timesheets/copy-week', {
      employeeId,
      sourceWeek,
      targetWeek
    }),

  // Template management
  getTemplates: (employeeId: string) =>
    apiClient.get<ApiResponse<TimesheetTemplate[]>>(`/employees/${employeeId}/templates`),

  createTemplate: (template: Omit<TimesheetTemplate, 'templateID'>) =>
    apiClient.post<ApiResponse<TimesheetTemplate>>('/timesheets/templates', template),

  applyTemplate: (templateId: number, dates: string[]) =>
    apiClient.post<ApiResponse<TimesheetEntry[]>>(`/timesheets/templates/${templateId}/apply`, { dates }),

  // Week management and submission
  submitWeek: (employeeId: string, weekEnding: string) => 
    apiClient.post<ApiResponse<TimesheetSubmission>>('/timesheets/submit', { employeeId, weekEnding }),
  
  getWeekSummary: (employeeId: string, weekEnding: string) =>
    apiClient.get<ApiResponse<{
      totalStandardHours: number;
      totalOvertimeHours: number;
      totalHours: number;
      entriesCount: number;
      status: string;
      dailyTotals: { [date: string]: number };
    }>>(`/employees/${employeeId}/week-summary?week=${weekEnding}`),

  // CSV Export
  exportWeekCSV: (employeeId: string, weekEnding: string) =>
    apiClient.get<Blob>(`/timesheets/export-csv?employeeId=${employeeId}&week=${weekEnding}`, {
      responseType: 'blob'
    }),

  exportDateRangeCSV: (employeeId: string, startDate: string, endDate: string) =>
    apiClient.get<Blob>(`/timesheets/export-csv?employeeId=${employeeId}&startDate=${startDate}&endDate=${endDate}`, {
      responseType: 'blob'
    }),

  // Manager functions
  getTeamEntries: (managerId: string, weekEnding?: string) =>
    apiClient.get<ApiResponse<TimesheetEntry[]>>(`/managers/${managerId}/team-timesheets${weekEnding ? `?week=${weekEnding}` : ''}`),

  createEntryForEmployee: (managerId: string, entry: Omit<TimesheetEntry, 'entryID' | 'createdBy'>) =>
    apiClient.post<ApiResponse<TimesheetEntry>>(`/managers/${managerId}/timesheets`, entry),
  
  getPendingApprovals: (managerId?: string) => 
    apiClient.get<ApiResponse<TimesheetSubmission[]>>(`/timesheets/pending${managerId ? `?managerId=${managerId}` : ''}`),
  
  approve: (submissionId: number, notes?: string) => 
    apiClient.post<ApiResponse<TimesheetApproval>>(`/timesheets/${submissionId}/approve`, { notes }),
  
  reject: (submissionId: number, reason: string) => 
    apiClient.post<ApiResponse<TimesheetApproval>>(`/timesheets/${submissionId}/reject`, { reason }),
  
  requestChanges: (submissionId: number, notes: string) => 
    apiClient.post<ApiResponse<TimesheetApproval>>(`/timesheets/${submissionId}/request-changes`, { notes }),
};

export const employeeApi = {
  getAll: () => apiClient.get<ApiResponse<Employee[]>>('/employees'),
  getById: (id: string) => apiClient.get<ApiResponse<Employee>>(`/employees/${id}`),
  getActive: () => apiClient.get<ApiResponse<Employee[]>>('/employees/active'),
};

export const projectApi = {
  getAll: () => apiClient.get<ApiResponse<Project[]>>('/projects'),
  getActive: () => apiClient.get<ApiResponse<Project[]>>('/projects/active'),
  getExtras: (projectId: number) => apiClient.get<ApiResponse<ProjectExtra[]>>(`/projects/${projectId}/extras`),
  getCostCodes: (projectId: number, extraId?: number) => 
    apiClient.get<ApiResponse<CostCode[]>>(`/projects/${projectId}/costcodes${extraId ? `?extraId=${extraId}` : ''}`),
};

export const costCodeApi = {
  getAll: () => apiClient.get<ApiResponse<CostCode[]>>('/costcodes'),
  getActive: () => apiClient.get<ApiResponse<CostCode[]>>('/costcodes/active'),
=======
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
>>>>>>> f0a0cdd (feat: Complete Phase 1 - Frontend UI Implementation)
};

export default api;
