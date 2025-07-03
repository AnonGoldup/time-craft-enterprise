
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
    ProjectCode: 'PROJ001',
    ExtraValue: 'Phase 1',
    CostCodeID: 1,
    PayID: 1,
    Hours: 8.0,
    Notes: 'Regular work day',
    Status: 'Draft',
    CreatedDate: '2024-06-17T08:00:00Z',
    ModifiedDate: ''
  },
  {
    EntryID: 2,
    EmployeeID: 'EMP001',
    DateWorked: '2024-06-18',
    ProjectCode: 'PROJ001',
    ExtraValue: 'Phase 1',
    CostCodeID: 2,
    PayID: 1,
    Hours: 7.5,
    Notes: 'Carpentry work',
    Status: 'Draft',
    CreatedDate: '2024-06-18T08:00:00Z',
    ModifiedDate: ''
  },
  {
    EntryID: 3,
    EmployeeID: 'EMP002',
    DateWorked: '2024-06-17',
    ProjectCode: 'PROJ002',
    ExtraValue: 'Phase 1',
    CostCodeID: 1,
    PayID: 1,
    Hours: 8.0,
    Notes: 'Site preparation',
    Status: 'Submitted',
    CreatedDate: '2024-06-17T08:00:00Z',
    ModifiedDate: ''
  }
];

// Mock Timesheet Submissions
export const mockTimesheetSubmissions: TimesheetSubmission[] = [
  {
    id: 1,
    employeeName: 'Sarah Johnson',
    projectCode: 'PROJ002',
    projectDescription: 'Shopping Mall Construction',
    weekEnding: '2024-06-23',
    submittedDate: '2024-06-23T17:00:00Z',
    totalHours: 44.0,
    status: 'Pending',
    notes: 'Regular week'
  }
];

// Mock Timesheet Approvals
export const mockTimesheetApprovals: TimesheetApproval[] = [
  {
    id: 1,
    submissionId: 1,
    approvedBy: 'EMP004',
    approvedDate: '2024-06-24T09:00:00Z',
    notes: 'All entries look good'
  }
];
