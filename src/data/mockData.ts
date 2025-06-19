
import { Employee, Project, ProjectExtra, CostCode, TimesheetEntry, TimesheetSubmission, TimesheetApproval } from '@/services/api';

// Interface for project extra cost code mappings
export interface ProjectExtraCostCodeMapping {
  mappingID: number;
  projectID: number;
  extraID?: number;
  costCodeID: number;
  isActive: boolean;
}

// Mock data storage
let mockDataStore: { [key: string]: any } = {};

// Initialize mock data
export const initializeMockData = () => {
  if (Object.keys(mockDataStore).length === 0) {
    mockDataStore = {
      employees: [...mockEmployees],
      projects: [...mockProjects],
      projectExtras: [...mockProjectExtras],
      costCodes: [...mockCostCodes],
      projectExtraCostCodes: [...mockProjectExtraCostCodes],
      timesheetEntries: [...mockTimesheetEntries],
      timesheetSubmissions: [...mockTimesheetSubmissions],
      timesheetApprovals: [...mockTimesheetApprovals]
    };
  }
};

// Helper functions for mock data management
export const getMockData = (key: string, fallback: any[] = []) => {
  return mockDataStore[key] || fallback;
};

export const setMockData = (key: string, data: any[]) => {
  mockDataStore[key] = data;
};

// Mock Employees
export const mockEmployees: Employee[] = [
  {
    employeeID: 'EMP001',
    firstName: 'John',
    lastName: 'Smith',
    fullName: 'John Smith',
    email: 'john.smith@company.com',
    class: 'Foreman',
    department: 'Construction',
    unionID: 1,
    activeEmp: true,
    createdDate: '2024-01-01T00:00:00Z',
    modifiedDate: '2024-01-01T00:00:00Z'
  },
  {
    employeeID: 'EMP002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    class: 'Carpenter',
    department: 'Construction',
    unionID: 1,
    activeEmp: true,
    createdDate: '2024-01-01T00:00:00Z',
    modifiedDate: '2024-01-01T00:00:00Z'
  },
  {
    employeeID: 'EMP003',
    firstName: 'Mike',
    lastName: 'Wilson',
    fullName: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    class: 'Laborer',
    department: 'Construction',
    unionID: 1,
    activeEmp: true,
    createdDate: '2024-01-01T00:00:00Z',
    modifiedDate: '2024-01-01T00:00:00Z'
  },
  {
    employeeID: 'EMP004',
    firstName: 'Lisa',
    lastName: 'Davis',
    fullName: 'Lisa Davis',
    email: 'lisa.davis@company.com',
    class: 'Project Manager',
    department: 'Management',
    unionID: 1,
    activeEmp: true,
    createdDate: '2024-01-01T00:00:00Z',
    modifiedDate: '2024-01-01T00:00:00Z'
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    projectID: 1,
    projectCode: 'PROJ001',
    projectDescription: 'Office Building Renovation',
    status: 'Active',
    isActive: true,
    createdDate: '2024-01-01T00:00:00Z',
    modifiedDate: '2024-01-01T00:00:00Z'
  },
  {
    projectID: 2,
    projectCode: 'PROJ002',
    projectDescription: 'Shopping Mall Construction',
    status: 'Active',
    isActive: true,
    createdDate: '2024-01-01T00:00:00Z',
    modifiedDate: '2024-01-01T00:00:00Z'
  },
  {
    projectID: 3,
    projectCode: 'PROJ003',
    projectDescription: 'Residential Complex',
    status: 'Active',
    isActive: true,
    createdDate: '2024-01-01T00:00:00Z',
    modifiedDate: '2024-01-01T00:00:00Z'
  }
];

// Mock Project Extras
export const mockProjectExtras: ProjectExtra[] = [
  {
    extraID: 1,
    projectID: 1,
    extraValue: 'Phase 1',
    description: 'Foundation Work',
    isActive: true
  },
  {
    extraID: 2,
    projectID: 1,
    extraValue: 'Phase 2',
    description: 'Structural Work',
    isActive: true
  },
  {
    extraID: 3,
    projectID: 2,
    extraValue: 'Phase 1',
    description: 'Site Preparation',
    isActive: true
  },
  {
    extraID: 4,
    projectID: 2,
    extraValue: 'Phase 2',
    description: 'Foundation Work',
    isActive: true
  }
];

// Mock Cost Codes
export const mockCostCodes: CostCode[] = [
  {
    costCodeID: 1,
    costCode: 'LAB-001-001',
    costCodeForSAGE: 'LAB001001',
    description: 'General Labor',
    isActive: true
  },
  {
    costCodeID: 2,
    costCode: 'CAR-001-001',
    costCodeForSAGE: 'CAR001001',
    description: 'Carpentry Work',
    isActive: true
  },
  {
    costCodeID: 3,
    costCode: 'EQP-001-001',
    costCodeForSAGE: 'EQP001001',
    description: 'Equipment Operation',
    isActive: true
  }
];

// Mock Project Extra Cost Code Mappings
export const mockProjectExtraCostCodes: ProjectExtraCostCodeMapping[] = [
  {
    mappingID: 1,
    projectID: 1,
    extraID: 1,
    costCodeID: 1,
    isActive: true
  },
  {
    mappingID: 2,
    projectID: 1,
    extraID: 1,
    costCodeID: 2,
    isActive: true
  },
  {
    mappingID: 3,
    projectID: 1,
    extraID: 2,
    costCodeID: 2,
    isActive: true
  },
  {
    mappingID: 4,
    projectID: 1,
    extraID: 2,
    costCodeID: 3,
    isActive: true
  },
  {
    mappingID: 5,
    projectID: 2,
    extraID: 3,
    costCodeID: 1,
    isActive: true
  },
  {
    mappingID: 6,
    projectID: 2,
    extraID: 4,
    costCodeID: 2,
    isActive: true
  }
];

// Mock Timesheet Entries with all required fields
export const mockTimesheetEntries: TimesheetEntry[] = [
  {
    entryID: 1,
    employeeID: 'EMP001',
    dateWorked: '2024-06-17',
    projectID: 1,
    extraID: 1,
    costCodeID: 1,
    payID: 1,
    hours: 8.0,
    unionID: 1,
    entryType: 'Standard',
    notes: 'Regular work day',
    status: 'Draft',
    createdBy: 'EMP001',
    createdDate: '2024-06-17T08:00:00Z',
    modifiedBy: '',
    modifiedDate: '',
    exportedDate: '',
    startTime: '08:00:00',
    endTime: '16:30:00',
    breakInTime: '12:00:00',
    breakOutTime: '12:30:00',
    timeIn: '08:00:00',
    timeOut: '16:30:00',
    breakIn: '12:00:00',
    breakOut: '12:30:00'
  },
  {
    entryID: 2,
    employeeID: 'EMP001',
    dateWorked: '2024-06-18',
    projectID: 1,
    extraID: 1,
    costCodeID: 2,
    payID: 1,
    hours: 7.5,
    unionID: 1,
    entryType: 'Standard',
    notes: 'Carpentry work',
    status: 'Draft',
    createdBy: 'EMP001',
    createdDate: '2024-06-18T08:00:00Z',
    modifiedBy: '',
    modifiedDate: '',
    exportedDate: '',
    startTime: '08:00:00',
    endTime: '16:00:00',
    breakInTime: '12:00:00',
    breakOutTime: '12:30:00',
    timeIn: '08:00:00',
    timeOut: '16:00:00',
    breakIn: '12:00:00',
    breakOut: '12:30:00'
  },
  {
    entryID: 3,
    employeeID: 'EMP002',
    dateWorked: '2024-06-17',
    projectID: 2,
    extraID: 3,
    costCodeID: 1,
    payID: 1,
    hours: 8.0,
    unionID: 1,
    entryType: 'Standard',
    notes: 'Site preparation',
    status: 'Submitted',
    createdBy: 'EMP002',
    createdDate: '2024-06-17T08:00:00Z',
    modifiedBy: '',
    modifiedDate: '',
    exportedDate: '',
    startTime: '07:30:00',
    endTime: '16:00:00',
    breakInTime: '12:00:00',
    breakOutTime: '12:30:00',
    timeIn: '07:30:00',
    timeOut: '16:00:00',
    breakIn: '12:00:00',
    breakOut: '12:30:00'
  }
];

// Mock Timesheet Submissions
export const mockTimesheetSubmissions: TimesheetSubmission[] = [
  {
    submissionID: 1,
    employeeID: 'EMP002',
    weekEndingDate: '2024-06-23',
    submissionType: 'Weekly',
    submittedBy: 'EMP002',
    submittedFor: 'EMP002',
    submittedOn: '2024-06-23T17:00:00Z',
    totalStandardHours: 40.0,
    totalOvertimeHours: 4.0,
    submissionStatus: 'Pending',
    notes: 'Regular week'
  }
];

// Mock Timesheet Approvals
export const mockTimesheetApprovals: TimesheetApproval[] = [
  {
    approvalID: 1,
    submissionID: 1,
    approvalLevel: 1,
    approverID: 'EMP004',
    approvalAction: 'Approved',
    approvalDate: '2024-06-24T09:00:00Z',
    approvalNotes: 'All entries look good'
  }
];
