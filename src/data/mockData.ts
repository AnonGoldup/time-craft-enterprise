
import { format, addDays, subDays, addWeeks } from 'date-fns';

// Employee mock data matching SQL schema
export const mockEmployees = [
  {
    employeeID: "EMP001",
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    email: "john.doe@company.com",
    class: "Foreman",
    department: "Construction",
    unionID: 1,
    activeEmp: true,
    createdDate: "2024-01-15T08:00:00Z",
    modifiedDate: "2024-06-01T10:30:00Z"
  },
  {
    employeeID: "EMP002",
    firstName: "Jane",
    lastName: "Smith",
    fullName: "Jane Smith",
    email: "jane.smith@company.com",
    class: "Supervisor",
    department: "Electrical",
    unionID: 1,
    activeEmp: true,
    createdDate: "2024-02-01T08:00:00Z",
    modifiedDate: "2024-06-01T10:30:00Z"
  },
  {
    employeeID: "EMP003",
    firstName: "Mike",
    lastName: "Johnson",
    fullName: "Mike Johnson",
    email: "mike.johnson@company.com",
    class: "Electrician",
    department: "Electrical",
    unionID: 1,
    activeEmp: true,
    createdDate: "2024-02-15T08:00:00Z",
    modifiedDate: "2024-06-01T10:30:00Z"
  },
  {
    employeeID: "EMP004",
    firstName: "Sarah",
    lastName: "Wilson",
    fullName: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    class: "Project Manager",
    department: "Management",
    unionID: 2,
    activeEmp: true,
    createdDate: "2024-03-01T08:00:00Z",
    modifiedDate: "2024-06-01T10:30:00Z"
  },
  {
    employeeID: "EMP005",
    firstName: "Brad",
    lastName: "Quinn",
    fullName: "Brad Quinn",
    email: "brad.quinn@company.com",
    class: "Foreman",
    department: "Construction",
    unionID: 1,
    activeEmp: true,
    createdDate: "2024-01-10T08:00:00Z",
    modifiedDate: "2024-06-01T10:30:00Z"
  }
];

// Projects mock data matching SQL schema
export const mockProjects = [
  {
    projectID: 1,
    projectCode: "PROJ001",
    projectDescription: "Office Building Renovation",
    status: "Active",
    isActive: true,
    createdDate: "2024-01-15T08:00:00Z",
    modifiedDate: "2024-06-01T10:30:00Z"
  },
  {
    projectID: 2,
    projectCode: "PROJ002",
    projectDescription: "Shopping Mall Construction",
    status: "Active",
    isActive: true,
    createdDate: "2024-02-01T08:00:00Z",
    modifiedDate: "2024-06-01T10:30:00Z"
  },
  {
    projectID: 3,
    projectCode: "PROJ003",
    projectDescription: "Residential Complex Development",
    status: "Active",
    isActive: true,
    createdDate: "2024-03-01T08:00:00Z",
    modifiedDate: "2024-06-01T10:30:00Z"
  },
  {
    projectID: 4,
    projectCode: "PROJ004",
    projectDescription: "Industrial Warehouse",
    status: "Complete",
    isActive: false,
    createdDate: "2023-12-01T08:00:00Z",
    modifiedDate: "2024-05-15T16:30:00Z"
  }
];

// Project Extras mock data
export const mockProjectExtras = [
  { extraID: 1, projectID: 1, extraValue: "Phase 1", description: "Foundation Work", isActive: true },
  { extraID: 2, projectID: 1, extraValue: "Phase 2", description: "Structural Work", isActive: true },
  { extraID: 3, projectID: 1, extraValue: "Phase 3", description: "Finishing Work", isActive: true },
  { extraID: 4, projectID: 2, extraValue: "East Wing", description: "East Wing Construction", isActive: true },
  { extraID: 5, projectID: 2, extraValue: "West Wing", description: "West Wing Construction", isActive: true },
  { extraID: 6, projectID: 2, extraValue: "Common Areas", description: "Mall Common Areas", isActive: true },
  { extraID: 7, projectID: 3, extraValue: "Building A", description: "Residential Building A", isActive: true },
  { extraID: 8, projectID: 3, extraValue: "Building B", description: "Residential Building B", isActive: true },
  { extraID: 9, projectID: 3, extraValue: "Amenities", description: "Community Amenities", isActive: true }
];

// Cost Codes mock data
export const mockCostCodes = [
  {
    costCodeID: 1,
    costCode: "LAB-001-001",
    costCodeForSAGE: "LAB001001",
    description: "General Labor",
    isActive: true,
    createdDate: "2024-01-01T08:00:00Z",
    modifiedDate: null
  },
  {
    costCodeID: 2,
    costCode: "EQP-001-001",
    costCodeForSAGE: "EQP001001",
    description: "Equipment Operation",
    isActive: true,
    createdDate: "2024-01-01T08:00:00Z",
    modifiedDate: null
  },
  {
    costCodeID: 3,
    costCode: "MAT-001-001",
    costCodeForSAGE: "MAT001001",
    description: "Material Handling",
    isActive: true,
    createdDate: "2024-01-01T08:00:00Z",
    modifiedDate: null
  },
  {
    costCodeID: 4,
    costCode: "ELE-001-001",
    costCodeForSAGE: "ELE001001",
    description: "Electrical Installation",
    isActive: true,
    createdDate: "2024-01-01T08:00:00Z",
    modifiedDate: null
  },
  {
    costCodeID: 5,
    costCode: "PLB-001-001",
    costCodeForSAGE: "PLB001001",
    description: "Plumbing Installation",
    isActive: true,
    createdDate: "2024-01-01T08:00:00Z",
    modifiedDate: null
  }
];

// Project Extra Cost Code mappings
export const mockProjectExtraCostCodes = [
  { mappingID: 1, projectID: 1, extraID: 1, costCodeID: 1, isActive: true },
  { mappingID: 2, projectID: 1, extraID: 1, costCodeID: 2, isActive: true },
  { mappingID: 3, projectID: 1, extraID: 2, costCodeID: 3, isActive: true },
  { mappingID: 4, projectID: 1, extraID: 2, costCodeID: 4, isActive: true },
  { mappingID: 5, projectID: 2, extraID: 4, costCodeID: 1, isActive: true },
  { mappingID: 6, projectID: 2, extraID: 4, costCodeID: 5, isActive: true },
  { mappingID: 7, projectID: 2, extraID: 5, costCodeID: 2, isActive: true },
  { mappingID: 8, projectID: 3, extraID: 7, costCodeID: 1, isActive: true },
  { mappingID: 9, projectID: 3, extraID: 7, costCodeID: 3, isActive: true }
];

// Timesheet Entries mock data
export const mockTimesheetEntries = [
  {
    entryID: 1,
    employeeID: "EMP001",
    dateWorked: format(new Date(), 'yyyy-MM-dd'),
    projectID: 1,
    extraID: 1,
    costCodeID: 1,
    payID: 1, // Standard time
    hours: 8.0,
    unionID: 1,
    entryType: "Standard",
    notes: "Regular foundation work",
    status: "Draft" as const,
    createdBy: "EMP001",
    createdDate: format(new Date(), 'yyyy-MM-ddTHH:mm:ssZ'),
    modifiedBy: null,
    modifiedDate: null,
    exportedDate: null,
    startTime: "08:00:00",
    endTime: "17:00:00",
    breakInTime: "12:00:00",
    breakOutTime: "12:30:00",
    timeIn: "08:00:00",
    timeOut: "17:00:00",
    breakIn: "12:00:00",
    breakOut: "12:30:00"
  },
  {
    entryID: 2,
    employeeID: "EMP001",
    dateWorked: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    projectID: 1,
    extraID: 2,
    costCodeID: 3,
    payID: 1,
    hours: 8.0,
    unionID: 1,
    entryType: "Standard",
    notes: "Structural work progress",
    status: "Submitted" as const,
    createdBy: "EMP001",
    createdDate: format(subDays(new Date(), 1), 'yyyy-MM-ddTHH:mm:ssZ'),
    modifiedBy: null,
    modifiedDate: null,
    exportedDate: null,
    startTime: "08:00:00",
    endTime: "17:00:00",
    breakInTime: "12:00:00",
    breakOutTime: "12:30:00",
    timeIn: "08:00:00",
    timeOut: "17:00:00",
    breakIn: "12:00:00",
    breakOut: "12:30:00"
  },
  {
    entryID: 3,
    employeeID: "EMP002",
    dateWorked: format(new Date(), 'yyyy-MM-dd'),
    projectID: 2,
    extraID: 4,
    costCodeID: 4,
    payID: 1,
    hours: 7.5,
    unionID: 1,
    entryType: "Standard",
    notes: "Electrical installation",
    status: "Approved" as const,
    createdBy: "EMP002",
    createdDate: format(new Date(), 'yyyy-MM-ddTHH:mm:ssZ'),
    modifiedBy: null,
    modifiedDate: null,
    exportedDate: null,
    startTime: "08:00:00",
    endTime: "16:30:00",
    breakInTime: "12:00:00",
    breakOutTime: "13:00:00",
    timeIn: "08:00:00",
    timeOut: "16:30:00",
    breakIn: "12:00:00",
    breakOut: "13:00:00"
  },
  {
    entryID: 4,
    employeeID: "EMP003",
    dateWorked: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
    projectID: 2,
    extraID: 5,
    costCodeID: 2,
    payID: 2, // Overtime
    hours: 10.0,
    unionID: 1,
    entryType: "Standard",
    notes: "Overtime for project deadline",
    status: "Submitted" as const,
    createdBy: "EMP003",
    createdDate: format(subDays(new Date(), 2), 'yyyy-MM-ddTHH:mm:ssZ'),
    modifiedBy: null,
    modifiedDate: null,
    exportedDate: null,
    startTime: "07:00:00",
    endTime: "19:00:00",
    breakInTime: "12:00:00",
    breakOutTime: "13:00:00",
    timeIn: "07:00:00",
    timeOut: "19:00:00",
    breakIn: "12:00:00",
    breakOut: "13:00:00"
  }
];

// Timesheet Submissions mock data
export const mockTimesheetSubmissions = [
  {
    submissionID: 1,
    employeeID: "EMP001",
    weekEndingDate: format(addDays(new Date(), 7 - new Date().getDay()), 'yyyy-MM-dd'),
    submissionType: "Self" as const,
    submittedBy: "EMP001",
    submittedFor: "EMP001",
    submittedOn: format(new Date(), 'yyyy-MM-ddTHH:mm:ssZ'),
    totalStandardHours: 40.0,
    totalOvertimeHours: 0.0,
    submissionStatus: "Pending" as const,
    notes: "Regular week submission"
  },
  {
    submissionID: 2,
    employeeID: "EMP002",
    weekEndingDate: format(addDays(new Date(), 7 - new Date().getDay()), 'yyyy-MM-dd'),
    submissionType: "Self" as const,
    submittedBy: "EMP002",
    submittedFor: "EMP002",
    submittedOn: format(subDays(new Date(), 1), 'yyyy-MM-ddTHH:mm:ssZ'),
    totalStandardHours: 37.5,
    totalOvertimeHours: 2.5,
    submissionStatus: "Approved" as const,
    notes: "Good week with some overtime"
  }
];

// Approval mock data
export const mockTimesheetApprovals = [
  {
    approvalID: 1,
    submissionID: 2,
    approvalLevel: 1,
    approverID: "EMP004",
    approvalAction: "Approved" as const,
    approvalDate: format(new Date(), 'yyyy-MM-ddTHH:mm:ssZ'),
    approvalNotes: "All entries look good, approved for payroll"
  }
];

// Utility functions for mock data persistence
export const getMockData = <T>(key: string, defaultData: T[]): T[] => {
  try {
    const stored = localStorage.getItem(`mock_${key}`);
    return stored ? JSON.parse(stored) : defaultData;
  } catch {
    return defaultData;
  }
};

export const setMockData = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(`mock_${key}`, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save mock data for ${key}:`, error);
  }
};

// Initialize mock data
export const initializeMockData = () => {
  if (!localStorage.getItem('mock_employees')) {
    setMockData('employees', mockEmployees);
    setMockData('projects', mockProjects);
    setMockData('projectExtras', mockProjectExtras);
    setMockData('costCodes', mockCostCodes);
    setMockData('projectExtraCostCodes', mockProjectExtraCostCodes);
    setMockData('timesheetEntries', mockTimesheetEntries);
    setMockData('timesheetSubmissions', mockTimesheetSubmissions);
    setMockData('timesheetApprovals', mockTimesheetApprovals);
  }
};
