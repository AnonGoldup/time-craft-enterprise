
// Shared types for timesheet components
export interface Employee {
  employeeId: string
  fullName: string
  email?: string
  class?: string
  isActive?: boolean
}

export interface Project {
  projectId: number
  projectCode: string
  projectDescription: string
  isActive: boolean
}

export interface CostCode {
  costCodeId: number
  costCode: string
  description: string
}

export interface TimesheetEntry {
  entryId?: number
  employeeId: string
  dateWorked: string
  projectId: number
  costCodeId: number
  standardHours: number
  overtimeHours: number
  notes?: string
}

export interface BulkTimesheetFormProps {
  employees: Employee[]
  projects: Project[]
  costCodes: CostCode[]
  onSubmit: (entries: TimesheetEntry[]) => Promise<void>
  currentUser?: Employee | null
  userRole?: 'ADMIN' | 'EMPLOYEE'
}
