
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
    EmployeeID: 'EMP001',
    FullName: 'John Smith',
    Email: 'john.smith@company.com',
    Class: 'Foreman',
    Department: 'Construction',
    ActiveEmp: true
  },
  {
    EmployeeID: 'EMP002',
    FullName: 'Sarah Johnson',
    Email: 'sarah.johnson@company.com',
    Class: 'Carpenter',
    Department: 'Construction',
    ActiveEmp: true
  },
  {
    EmployeeID: 'EMP003',
    FullName: 'Mike Wilson',
    Email: 'mike.wilson@company.com',
    Class: 'Laborer',
    Department: 'Construction',
    ActiveEmp: true
  },
  {
    EmployeeID: 'EMP004',
    FullName: 'Lisa Davis',
    Email: 'lisa.davis@company.com',
    Class: 'Project Manager',
    Department: 'Management',
    ActiveEmp: true
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    ProjectID: 1,
    ProjectCode: 'PROJ001',
    ProjectDescription: 'Office Building Renovation',
    IsActive: true,
    CreatedDate: '2024-01-01T00:00:00Z',
    ModifiedDate: '2024-01-01T00:00:00Z'
  },
  {
    ProjectID: 2,
    ProjectCode: 'PROJ002',
    ProjectDescription: 'Shopping Mall Construction',
    IsActive: true,
    CreatedDate: '2024-01-01T00:00:00Z',
    ModifiedDate: '2024-01-01T00:00:00Z'
  },
  {
    ProjectID: 3,
    ProjectCode: 'PROJ003',
    ProjectDescription: 'Residential Complex',
    IsActive: true,
    CreatedDate: '2024-01-01T00:00:00Z',
    ModifiedDate: '2024-01-01T00:00:00Z'
  }
];

// Mock Project Extras
export const mockProjectExtras: ProjectExtra[] = [
  {
    ExtraID: 1,
    ProjectID: 1,
    ExtraValue: 'Phase 1',
    Description: 'Foundation Work',
    IsActive: true
  },
  {
    ExtraID: 2,
    ProjectID: 1,
    ExtraValue: 'Phase 2',
    Description: 'Structural Work',
    IsActive: true
  },
  {
    ExtraID: 3,
    ProjectID: 2,
    ExtraValue: 'Phase 1',
    Description: 'Site Preparation',
    IsActive: true
  },
  {
    ExtraID: 4,
    ProjectID: 2,
    ExtraValue: 'Phase 2',
    Description: 'Foundation Work',
    IsActive: true
  }
];

// Mock Cost Codes
export const mockCostCodes: CostCode[] = [
  {
    CostCodeID: 1,
    CostCode: 'LAB-001-001',
    Description: 'General Labor',
    IsActive: true
  },
  {
    CostCodeID: 2,
    CostCode: 'CAR-001-001',
    Description: 'Carpentry Work',
    IsActive: true
  },
  {
    CostCodeID: 3,
    CostCode: 'EQP-001-001',
    Description: 'Equipment Operation',
    IsActive: true
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
    EntryID: 1,
    EmployeeID: 'EMP001',
    DateWorked: '2024-06-17',
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
    EntryID: 2,
    EmployeeID: 'EMP001',
    DateWorked: '2024-06-18',
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
    EntryID: 3,
    EmployeeID: 'EMP002',
    DateWorked: '2024-06-17',
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
