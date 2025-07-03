import { 
  mockEmployees, 
  mockProjects, 
  mockProjectExtras, 
  mockCostCodes, 
  mockProjectExtraCostCodes,
  mockTimesheetEntries,
  mockTimesheetSubmissions,
  mockTimesheetApprovals,
  getMockData,
  setMockData,
  initializeMockData
} from '@/data/mockData';
import { 
  ApiResponse, 
  Employee, 
  Project, 
  ProjectExtra, 
  CostCode, 
  TimesheetEntry, 
  TimesheetSubmission, 
  TimesheetApproval 
} from './api';

// Initialize mock data on service load
initializeMockData();

// Simulate API delay
const simulateDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApiService = {
  // Employee endpoints
  employees: {
    getAll: async (): Promise<ApiResponse<Employee[]>> => {
      await simulateDelay();
      const employees = getMockData('employees', mockEmployees);
      return {
        success: true,
        data: employees
      };
    },

    getById: async (id: string): Promise<ApiResponse<Employee>> => {
      await simulateDelay();
      const employees = getMockData('employees', mockEmployees);
      const employee = employees.find(emp => emp.EmployeeID === id);
      
      if (!employee) {
        throw new Error(`Employee with ID ${id} not found`);
      }

      return {
        success: true,
        data: employee
      };
    },

    getTimesheets: async (id: string, params?: any): Promise<ApiResponse<TimesheetEntry[]>> => {
      await simulateDelay();
      const entries = getMockData('timesheetEntries', mockTimesheetEntries);
      const employeeEntries = entries.filter(entry => entry.EmployeeID === id);
      return {
        success: true,
        data: employeeEntries
      };
    }
  },

  // Project endpoints
  projects: {
    getAll: async (): Promise<ApiResponse<Project[]>> => {
      await simulateDelay();
      const projects = getMockData('projects', mockProjects);
      return {
        success: true,
        data: projects
      };
    },

    getById: async (id: number): Promise<ApiResponse<Project>> => {
      await simulateDelay();
      const projects = getMockData('projects', mockProjects);
      const project = projects.find(p => p.ProjectID === id);
      
      if (!project) {
        throw new Error(`Project with ID ${id} not found`);
      }

      return {
        success: true,
        data: project
      };
    },

    getByCode: async (code: string): Promise<ApiResponse<Project>> => {
      await simulateDelay();
      const projects = getMockData('projects', mockProjects);
      const project = projects.find(p => p.ProjectCode === code);
      
      if (!project) {
        throw new Error(`Project with code ${code} not found`);
      }

      return {
        success: true,
        data: project
      };
    },

    getExtras: async (projectCode: string): Promise<ApiResponse<ProjectExtra[]>> => {
      await simulateDelay();
      const extras = getMockData('projectExtras', mockProjectExtras);
      const projects = getMockData('projects', mockProjects);
      const project = projects.find(p => p.ProjectCode === projectCode);
      
      if (!project) {
        return {
          success: true,
          data: []
        };
      }

      const projectExtras = extras.filter(extra => extra.ProjectID === project.ProjectID);
      return {
        success: true,
        data: projectExtras
      };
    },

    getCostCodes: async (projectCode: string, extraValue?: string): Promise<ApiResponse<CostCode[]>> => {
      await simulateDelay();
      const costCodes = getMockData('costCodes', mockCostCodes);
      const projects = getMockData('projects', mockProjects);
      const project = projects.find(p => p.ProjectCode === projectCode);
      
      if (!project) {
        return {
          success: true,
          data: []
        };
      }

      // For simplicity, return all cost codes for now
      // In real implementation, this would filter based on project and extra mappings
      return {
        success: true,
        data: costCodes
      };
    }
  },

  // Timesheet endpoints
  timesheets: {
    getAll: async (params?: any): Promise<ApiResponse<TimesheetEntry[]>> => {
      await simulateDelay();
      const entries = getMockData('timesheetEntries', mockTimesheetEntries);
      return {
        success: true,
        data: entries
      };
    },

    getById: async (id: number): Promise<ApiResponse<TimesheetEntry>> => {
      await simulateDelay();
      const entries = getMockData('timesheetEntries', mockTimesheetEntries);
      const entry = entries.find(e => e.EntryID === id);
      
      if (!entry) {
        throw new Error(`Timesheet entry with ID ${id} not found`);
      }

      return {
        success: true,
        data: entry
      };
    },

    create: async (data: Omit<TimesheetEntry, 'EntryID'>): Promise<ApiResponse<TimesheetEntry>> => {
      await simulateDelay();
      const currentEntries = getMockData('timesheetEntries', mockTimesheetEntries);
      
      const newEntry: TimesheetEntry = {
        EntryID: Math.max(...currentEntries.map(e => e.EntryID || 0)) + 1,
        ...data,
        CreatedDate: new Date().toISOString(),
        ModifiedDate: ''
      };

      const updatedEntries = [...currentEntries, newEntry];
      setMockData('timesheetEntries', updatedEntries);

      return {
        success: true,
        data: newEntry
      };
    },

    update: async (id: number, data: Partial<TimesheetEntry>): Promise<ApiResponse<TimesheetEntry>> => {
      await simulateDelay();
      const currentEntries = getMockData('timesheetEntries', mockTimesheetEntries);
      const entryIndex = currentEntries.findIndex(e => e.EntryID === id);
      
      if (entryIndex === -1) {
        throw new Error(`Timesheet entry with ID ${id} not found`);
      }

      const updatedEntry = {
        ...currentEntries[entryIndex],
        ...data,
        ModifiedDate: new Date().toISOString()
      };

      const updatedEntries = [...currentEntries];
      updatedEntries[entryIndex] = updatedEntry;
      setMockData('timesheetEntries', updatedEntries);

      return {
        success: true,
        data: updatedEntry
      };
    },

    delete: async (id: number): Promise<ApiResponse<void>> => {
      await simulateDelay();
      const currentEntries = getMockData('timesheetEntries', mockTimesheetEntries);
      const updatedEntries = currentEntries.filter(e => e.EntryID !== id);
      setMockData('timesheetEntries', updatedEntries);

      return {
        success: true,
        data: undefined
      };
    },

    submit: async (data: { employeeId: string; weekEndingDate: string }): Promise<ApiResponse<TimesheetSubmission>> => {
      await simulateDelay();
      const currentSubmissions = getMockData('timesheetSubmissions', mockTimesheetSubmissions);
      
      const newSubmission: TimesheetSubmission = {
        id: Math.max(...currentSubmissions.map(s => s.id)) + 1,
        employeeName: 'Test Employee',
        projectCode: 'PROJ001',
        projectDescription: 'Test Project',
        weekEnding: data.weekEndingDate,
        submittedDate: new Date().toISOString(),
        totalHours: 40,
        status: 'Pending',
        notes: ''
      };

      const updatedSubmissions = [...currentSubmissions, newSubmission];
      setMockData('timesheetSubmissions', updatedSubmissions);

      return {
        success: true,
        data: newSubmission
      };
    },

    getWeeklySummary: async (params: { employeeId: string; weekEndingDate: string }): Promise<ApiResponse<TimesheetSubmission[]>> => {
      await simulateDelay();
      const submissions = getMockData('timesheetSubmissions', mockTimesheetSubmissions);
      return {
        success: true,
        data: submissions
      };
    }
  },

  // Approval endpoints
  approvals: {
    create: async (data: Omit<TimesheetApproval, 'id'>): Promise<ApiResponse<TimesheetApproval>> => {
      await simulateDelay();
      const currentApprovals = getMockData('timesheetApprovals', mockTimesheetApprovals);
      
      const newApproval: TimesheetApproval = {
        id: Math.max(...currentApprovals.map(a => a.id)) + 1,
        ...data
      };

      const updatedApprovals = [...currentApprovals, newApproval];
      setMockData('timesheetApprovals', updatedApprovals);

      return {
        success: true,
        data: newApproval
      };
    },

    approve: async (submissionId: number, data: { approvedBy: string; notes?: string }): Promise<ApiResponse<TimesheetApproval>> => {
      await simulateDelay();
      const currentApprovals = getMockData('timesheetApprovals', mockTimesheetApprovals);
      
      const newApproval: TimesheetApproval = {
        id: Math.max(...currentApprovals.map(a => a.id)) + 1,
        submissionId,
        approvedBy: data.approvedBy,
        approvedDate: new Date().toISOString(),
        notes: data.notes || ''
      };

      const updatedApprovals = [...currentApprovals, newApproval];
      setMockData('timesheetApprovals', updatedApprovals);

      return {
        success: true,
        data: newApproval
      };
    },

    reject: async (submissionId: number, data: { approvedBy: string; notes?: string }): Promise<ApiResponse<TimesheetApproval>> => {
      await simulateDelay();
      const currentApprovals = getMockData('timesheetApprovals', mockTimesheetApprovals);
      
      const newApproval: TimesheetApproval = {
        id: Math.max(...currentApprovals.map(a => a.id)) + 1,
        submissionId,
        approvedBy: data.approvedBy,
        approvedDate: new Date().toISOString(),
        notes: data.notes || 'Rejected'
      };

      const updatedApprovals = [...currentApprovals, newApproval];
      setMockData('timesheetApprovals', updatedApprovals);

      return {
        success: true,
        data: newApproval
      };
    }
  },

  // Cost code endpoints
  costCodes: {
    getAll: async (): Promise<ApiResponse<CostCode[]>> => {
      await simulateDelay();
      const costCodes = getMockData('costCodes', mockCostCodes);
      return {
        success: true,
        data: costCodes
      };
    },

    getByProject: async (projectCode: string): Promise<ApiResponse<CostCode[]>> => {
      await simulateDelay();
      const costCodes = getMockData('costCodes', mockCostCodes);
      return {
        success: true,
        data: costCodes
      };
    }
  }
};