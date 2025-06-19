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
        data: employees,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    getById: async (id: string): Promise<ApiResponse<Employee>> => {
      await simulateDelay();
      const employees = getMockData('employees', mockEmployees);
      const employee = employees.find(emp => emp.employeeID === id);
      
      if (!employee) {
        throw new Error(`Employee with ID ${id} not found`);
      }

      return {
        success: true,
        data: employee,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    getActive: async (): Promise<ApiResponse<Employee[]>> => {
      await simulateDelay();
      const employees = getMockData('employees', mockEmployees);
      const activeEmployees = employees.filter(emp => emp.activeEmp);
      
      return {
        success: true,
        data: activeEmployees,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
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
        data: projects,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    getActive: async (): Promise<ApiResponse<Project[]>> => {
      await simulateDelay();
      const projects = getMockData('projects', mockProjects);
      const activeProjects = projects.filter(proj => proj.isActive);
      
      return {
        success: true,
        data: activeProjects,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    getExtras: async (projectId: number): Promise<ApiResponse<ProjectExtra[]>> => {
      await simulateDelay();
      const extras = getMockData('projectExtras', mockProjectExtras);
      const projectExtras = extras.filter(extra => extra.projectID === projectId && extra.isActive);
      
      return {
        success: true,
        data: projectExtras,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    getCostCodes: async (projectId: number, extraId?: number): Promise<ApiResponse<CostCode[]>> => {
      await simulateDelay();
      const mappings = getMockData('projectExtraCostCodes', mockProjectExtraCostCodes);
      const costCodes = getMockData('costCodes', mockCostCodes);
      
      let validCostCodeIds: number[];
      
      if (extraId) {
        // Get cost codes for specific project and extra
        validCostCodeIds = mappings
          .filter(mapping => mapping.projectID === projectId && mapping.extraID === extraId && mapping.isActive)
          .map(mapping => mapping.costCodeID);
      } else {
        // Get all cost codes for project
        validCostCodeIds = mappings
          .filter(mapping => mapping.projectID === projectId && mapping.isActive)
          .map(mapping => mapping.costCodeID);
      }
      
      const projectCostCodes = costCodes.filter(cc => 
        validCostCodeIds.includes(cc.costCodeID) && cc.isActive
      );
      
      return {
        success: true,
        data: projectCostCodes,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    }
  },

  // Timesheet endpoints
  timesheets: {
    getEntries: async (employeeId: string, weekEnding?: string): Promise<ApiResponse<TimesheetEntry[]>> => {
      await simulateDelay();
      const entries = getMockData('timesheetEntries', mockTimesheetEntries);
      let filteredEntries = entries.filter(entry => entry.employeeID === employeeId);
      
      if (weekEnding) {
        // Filter by week ending date (simple date range filter)
        const weekStart = new Date(weekEnding);
        weekStart.setDate(weekStart.getDate() - 6);
        
        filteredEntries = filteredEntries.filter(entry => {
          const entryDate = new Date(entry.dateWorked);
          return entryDate >= weekStart && entryDate <= new Date(weekEnding);
        });
      }
      
      return {
        success: true,
        data: filteredEntries,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    createEntry: async (entry: Omit<TimesheetEntry, 'entryID'>): Promise<ApiResponse<TimesheetEntry>> => {
      await simulateDelay();
      const entries = getMockData('timesheetEntries', mockTimesheetEntries);
      
      const newEntry: TimesheetEntry = {
        ...entry,
        entryID: Math.max(...entries.map(e => e.entryID || 0), 0) + 1,
        createdDate: new Date().toISOString(),
        modifiedDate: null,
        exportedDate: null
      };
      
      const updatedEntries = [...entries, newEntry];
      setMockData('timesheetEntries', updatedEntries);
      
      return {
        success: true,
        data: newEntry,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    updateEntry: async (entryId: number, updates: Partial<TimesheetEntry>): Promise<ApiResponse<TimesheetEntry>> => {
      await simulateDelay();
      const entries = getMockData('timesheetEntries', mockTimesheetEntries);
      const entryIndex = entries.findIndex(entry => entry.entryID === entryId);
      
      if (entryIndex === -1) {
        throw new Error(`Timesheet entry with ID ${entryId} not found`);
      }
      
      const updatedEntry = {
        ...entries[entryIndex],
        ...updates,
        modifiedDate: new Date().toISOString()
      };
      
      const updatedEntries = [...entries];
      updatedEntries[entryIndex] = updatedEntry;
      setMockData('timesheetEntries', updatedEntries);
      
      return {
        success: true,
        data: updatedEntry,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    deleteEntry: async (entryId: number): Promise<ApiResponse<void>> => {
      await simulateDelay();
      const entries = getMockData('timesheetEntries', mockTimesheetEntries);
      const filteredEntries = entries.filter(entry => entry.entryID !== entryId);
      
      if (entries.length === filteredEntries.length) {
        throw new Error(`Timesheet entry with ID ${entryId} not found`);
      }
      
      setMockData('timesheetEntries', filteredEntries);
      
      return {
        success: true,
        data: undefined,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    submitWeek: async (employeeId: string, weekEnding: string): Promise<ApiResponse<TimesheetSubmission>> => {
      await simulateDelay();
      const submissions = getMockData('timesheetSubmissions', mockTimesheetSubmissions);
      const entries = getMockData('timesheetEntries', mockTimesheetEntries);
      
      // Calculate totals for the week
      const weekStart = new Date(weekEnding);
      weekStart.setDate(weekStart.getDate() - 6);
      
      const weekEntries = entries.filter(entry => {
        const entryDate = new Date(entry.dateWorked);
        return entry.employeeID === employeeId && 
               entryDate >= weekStart && 
               entryDate <= new Date(weekEnding);
      });
      
      const totalStandardHours = weekEntries
        .filter(entry => entry.payID === 1)
        .reduce((sum, entry) => sum + entry.hours, 0);
      
      const totalOvertimeHours = weekEntries
        .filter(entry => entry.payID === 2)
        .reduce((sum, entry) => sum + entry.hours, 0);
      
      const newSubmission: TimesheetSubmission = {
        submissionID: Math.max(...submissions.map(s => s.submissionID || 0), 0) + 1,
        employeeID: employeeId,
        weekEndingDate: weekEnding,
        submissionType: 'Self',
        submittedBy: employeeId,
        submittedFor: employeeId,
        submittedOn: new Date().toISOString(),
        totalStandardHours,
        totalOvertimeHours,
        submissionStatus: 'Pending',
        notes: 'Submitted via web portal'
      };
      
      const updatedSubmissions = [...submissions, newSubmission];
      setMockData('timesheetSubmissions', updatedSubmissions);
      
      return {
        success: true,
        data: newSubmission,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    getPendingApprovals: async (managerId?: string): Promise<ApiResponse<TimesheetSubmission[]>> => {
      await simulateDelay();
      const submissions = getMockData('timesheetSubmissions', mockTimesheetSubmissions);
      const pendingSubmissions = submissions.filter(sub => sub.submissionStatus === 'Pending');
      
      return {
        success: true,
        data: pendingSubmissions,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    approve: async (submissionId: number, notes?: string): Promise<ApiResponse<TimesheetApproval>> => {
      await simulateDelay();
      const submissions = getMockData('timesheetSubmissions', mockTimesheetSubmissions);
      const approvals = getMockData('timesheetApprovals', mockTimesheetApprovals);
      
      // Update submission status
      const submissionIndex = submissions.findIndex(sub => sub.submissionID === submissionId);
      if (submissionIndex !== -1) {
        submissions[submissionIndex].submissionStatus = 'Approved';
        setMockData('timesheetSubmissions', submissions);
      }
      
      // Create approval record
      const newApproval: TimesheetApproval = {
        approvalID: Math.max(...approvals.map(a => a.approvalID || 0), 0) + 1,
        submissionID: submissionId,
        approvalLevel: 1,
        approverID: 'EMP004', // Mock manager ID
        approvalAction: 'Approved',
        approvalDate: new Date().toISOString(),
        approvalNotes: notes || 'Approved via web portal'
      };
      
      const updatedApprovals = [...approvals, newApproval];
      setMockData('timesheetApprovals', updatedApprovals);
      
      return {
        success: true,
        data: newApproval,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    reject: async (submissionId: number, reason: string): Promise<ApiResponse<TimesheetApproval>> => {
      await simulateDelay();
      const submissions = getMockData('timesheetSubmissions', mockTimesheetSubmissions);
      const approvals = getMockData('timesheetApprovals', mockTimesheetApprovals);
      
      // Update submission status
      const submissionIndex = submissions.findIndex(sub => sub.submissionID === submissionId);
      if (submissionIndex !== -1) {
        submissions[submissionIndex].submissionStatus = 'Rejected';
        setMockData('timesheetSubmissions', submissions);
      }
      
      // Create approval record
      const newApproval: TimesheetApproval = {
        approvalID: Math.max(...approvals.map(a => a.approvalID || 0), 0) + 1,
        submissionID: submissionId,
        approvalLevel: 1,
        approverID: 'EMP004', // Mock manager ID
        approvalAction: 'Rejected',
        approvalDate: new Date().toISOString(),
        approvalNotes: reason
      };
      
      const updatedApprovals = [...approvals, newApproval];
      setMockData('timesheetApprovals', updatedApprovals);
      
      return {
        success: true,
        data: newApproval,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    requestChanges: async (submissionId: number, notes: string): Promise<ApiResponse<TimesheetApproval>> => {
      await simulateDelay();
      const submissions = getMockData('timesheetSubmissions', mockTimesheetSubmissions);
      const approvals = getMockData('timesheetApprovals', mockTimesheetApprovals);
      
      // Update submission status
      const submissionIndex = submissions.findIndex(sub => sub.submissionID === submissionId);
      if (submissionIndex !== -1) {
        submissions[submissionIndex].submissionStatus = 'Pending';
        setMockData('timesheetSubmissions', submissions);
      }
      
      // Create approval record
      const newApproval: TimesheetApproval = {
        approvalID: Math.max(...approvals.map(a => a.approvalID || 0), 0) + 1,
        submissionID: submissionId,
        approvalLevel: 1,
        approverID: 'EMP004', // Mock manager ID
        approvalAction: 'Returned',
        approvalDate: new Date().toISOString(),
        approvalNotes: notes
      };
      
      const updatedApprovals = [...approvals, newApproval];
      setMockData('timesheetApprovals', updatedApprovals);
      
      return {
        success: true,
        data: newApproval,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    }
  },

  // Cost Code endpoints
  costCodes: {
    getAll: async (): Promise<ApiResponse<CostCode[]>> => {
      await simulateDelay();
      const costCodes = getMockData('costCodes', mockCostCodes);
      return {
        success: true,
        data: costCodes,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    },

    getActive: async (): Promise<ApiResponse<CostCode[]>> => {
      await simulateDelay();
      const costCodes = getMockData('costCodes', mockCostCodes);
      const activeCostCodes = costCodes.filter(cc => cc.isActive);
      
      return {
        success: true,
        data: activeCostCodes,
        meta: { timestamp: new Date().toISOString(), version: '1.0' }
      };
    }
  }
};
