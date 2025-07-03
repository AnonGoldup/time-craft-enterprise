// Mock data for development
import { Employee, Project, ProjectExtra, CostCode, TimesheetEntry } from './api';

// Export missing types for backward compatibility
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const mockEmployees: Employee[] = [
  {
    EmployeeID: 'EMP001',
    FullName: 'John Smith',
    Email: 'john.smith@altapro.com',
    Class: 'Manager',
    Department: 'Construction',
    ActiveEmp: true
  },
  {
    EmployeeID: 'EMP002', 
    FullName: 'Sarah Johnson',
    Email: 'sarah.johnson@altapro.com',
    Class: 'Foreman',
    Department: 'Construction',
    ActiveEmp: true
  }
];

export const mockProjects: Project[] = [
  {
    ProjectID: 1,
    ProjectCode: '21-0075',
    ProjectDescription: 'Kamloops RCMP IPD',
    IsActive: true,
    CreatedDate: '2021-01-15'
  },
  {
    ProjectID: 2,
    ProjectCode: '22-0003', 
    ProjectDescription: 'Highland Building Maintenance',
    IsActive: true,
    CreatedDate: '2022-03-10'
  }
];

export const mockProjectExtras: ProjectExtra[] = [
  {
    ExtraID: 1,
    ProjectID: 1,
    ExtraValue: 'E001',
    Description: 'Extra Work 1',
    IsActive: true
  }
];

export const mockCostCodes: CostCode[] = [
  {
    CostCodeID: 1,
    CostCode: 'LAB001',
    Description: 'General Labor',
    IsActive: true
  }
];

export const mockTimesheetEntries: TimesheetEntry[] = [
  {
    EntryID: 1,
    EmployeeID: 'EMP001',
    DateWorked: '2025-01-02',
    ProjectCode: '21-0075',
    CostCodeID: 1,
    PayID: 1,
    Hours: 8.0,
    Status: 'Draft'
  }
];