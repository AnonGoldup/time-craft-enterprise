
import { TimesheetEntry, User, Project } from './types';

export const mockUser: User = {
  employeeId: 'GOLNIC',
  fullName: 'Nicholas Goldup',
  role: 'admin'
};

export const mockProjects: Project[] = [
  {
    projectId: 1,
    projectCode: '21-0066',
    projectDescription: 'Edmonton EXPO SOLAR IPD'
  },
  {
    projectId: 2,
    projectCode: '22-0006',
    projectDescription: 'AltaPro Service Department'
  },
  {
    projectId: 3,
    projectCode: '24-0052',
    projectDescription: 'Grant MacEwan School'
  },
  {
    projectId: 4,
    projectCode: '21-0029',
    projectDescription: 'Edmonton EXPO IPD'
  }
];

export const mockEntries: TimesheetEntry[] = [
  // Current week entries (June 23-29, 2025)
  {
    entryId: 101,
    employeeId: 'GOLNIC',
    dateWorked: '2025-06-23',
    projectCode: '22-0006',
    projectDescription: 'AltaPro Service Department',
    extraValue: 'Default',
    costCode: '001-500-501',
    costCodeDescription: 'GENEXP-Vehicle Travel',
    standardHours: 3,
    overtimeHours: 0,
    totalHours: 3,
    status: 'Draft',
    notes: 'Site visit documentation',
    createdBy: 'GOLNIC',
    createdDate: '2025-06-23T16:25:09'
  },
  {
    entryId: 102,
    employeeId: 'GOLNIC',
    dateWorked: '2025-06-24',
    projectCode: '21-0066',
    projectDescription: 'Edmonton EXPO SOLAR IPD',
    extraValue: 'Phase 1',
    costCode: '001-040-043',
    costCodeDescription: 'INDIRECT LAB-Direct Labor',
    standardHours: 8,
    overtimeHours: 2,
    totalHours: 10,
    status: 'Draft',
    notes: 'Installation work - Panel setup',
    createdBy: 'GOLNIC',
    createdDate: '2025-06-24T08:00:00'
  },
  {
    entryId: 103,
    employeeId: 'GOLNIC',
    dateWorked: '2025-06-25',
    projectCode: '24-0052',
    projectDescription: 'Grant MacEwan School',
    extraValue: 'Default',
    costCode: '001-040-054',
    costCodeDescription: 'INDIRECT LAB-Employee Training',
    standardHours: 8,
    overtimeHours: 0,
    totalHours: 8,
    status: 'Draft',
    notes: 'Safety training session',
    createdBy: 'GOLNIC',
    createdDate: '2025-06-25T09:00:00'
  },
  // Add more mock entries as needed...
  {
    entryId: 91,
    employeeId: 'GOLNIC',
    dateWorked: '2025-06-16',
    projectCode: '21-0066',
    projectDescription: 'Edmonton EXPO SOLAR IPD',
    extraValue: 'Phase 1',
    costCode: '001-040-043',
    costCodeDescription: 'INDIRECT LAB-Direct Labor',
    standardHours: 8,
    overtimeHours: 0,
    totalHours: 8,
    status: 'Submitted',
    notes: 'Phase 1 completion',
    createdBy: 'GOLNIC',
    createdDate: '2025-06-16T08:00:00'
  }
];
