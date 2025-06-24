import axios from 'axios';

// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    timestamp: string;
    version: string;
  };
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    field?: string;
    details?: any[];
  };
}

// Employee interfaces matching SQL schema
export interface Employee {
  employeeID: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  class: string;
  department: string;
  unionID: number;
  activeEmp: boolean;
  createdDate: string;
  modifiedDate: string;
}

// Project interfaces
export interface Project {
  projectID: number;
  projectCode: string;
  projectDescription: string;
  status: string;
  isActive: boolean;
  createdDate: string;
  modifiedDate: string;
}

// Cost Code interfaces
export interface CostCode {
  costCodeID: number;
  costCode: string;
  costCodeForSAGE: string;
  description: string;
  isActive: boolean;
}

// Project Extra interfaces
export interface ProjectExtra {
  extraID: number;
  projectID: number;
  extraValue: string;
  description: string;
  isActive: boolean;
}

// Timesheet Entry interfaces
export interface TimesheetEntry {
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

// Enhanced timesheet API with comprehensive features
export const timesheetApi = {
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
};

export default apiClient;
