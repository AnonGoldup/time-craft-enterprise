
export interface TimesheetEntry {
  entryId: number;
  employeeId: string;
  dateWorked: string;
  projectCode: string;
  projectDescription: string;
  extraValue: string;
  costCode: string;
  costCodeDescription: string;
  standardHours: number;
  overtimeHours: number;
  totalHours: number;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  notes?: string;
  createdBy: string;
  createdDate: string;
}

export interface WeeklySummary {
  weekStart: Date;
  weekEnd: Date;
  days: Record<number, DayData>;
  totalStandard: number;
  totalOvertime: number;
  totalHours: number;
  entries: number;
  projects: Set<string>;
}

export interface DayData {
  standard: number;
  overtime: number;
  entries: TimesheetEntry[];
}

export interface Statistics {
  totalHours: number;
  standardHours: number;
  overtimeHours: number;
  entries: number;
}

export interface User {
  employeeId: string;
  fullName: string;
  role: string;
}

export interface Project {
  projectId: number;
  projectCode: string;
  projectDescription: string;
}
