
import { z } from "zod"
import { Employee } from "./types"

// Employee validation schema that matches the Employee interface exactly
const employeeSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().default(undefined).optional(),
  class: z.string().default(undefined).optional(),
  isActive: z.boolean().default(true).optional(),
}).transform((data): Employee => ({
  employeeId: data.employeeId,
  fullName: data.fullName,
  email: data.email,
  class: data.class,
  isActive: data.isActive,
}))

// Form validation schema with business rules
export const bulkTimeEntrySchema = z.object({
  selectedEmployees: z.array(employeeSchema).min(1, "At least one employee must be selected"),
  
  selectedDates: z.array(z.date()).min(1, "At least one date must be selected"),
  
  projectId: z.string().min(1, "Project is required"),
  
  costCodeId: z.string().min(1, "Cost code is required"),
  
  standardHours: z.number()
    .min(0, "Standard hours cannot be negative")
    .max(16, "Cannot exceed 16 hours per day")
    .multipleOf(0.25, "Hours must be in quarter-hour increments"),
    
  overtimeHours: z.number()
    .min(0, "Overtime hours cannot be negative")
    .max(16, "Cannot exceed 16 hours per day")
    .multipleOf(0.25, "Hours must be in quarter-hour increments"),
    
  notes: z.string().optional(),
}).refine((data) => {
  return (data.standardHours + data.overtimeHours) <= 16
}, {
  message: "Total hours cannot exceed 16 per day",
  path: ["overtimeHours"],
})

export type BulkTimeEntryFormValues = z.infer<typeof bulkTimeEntrySchema>

// Utility function to filter and validate employees - returns proper Employee type
export const validateEmployees = (employees: any[]): Employee[] => {
  return employees
    .filter((emp): emp is Employee => {
      return typeof emp?.employeeId === 'string' && 
             emp.employeeId.length > 0 &&
             typeof emp?.fullName === 'string' && 
             emp.fullName.length > 0;
    })
    .map((emp): Employee => ({
      employeeId: emp.employeeId,
      fullName: emp.fullName,
      email: emp.email || undefined,
      class: emp.class || undefined,
      isActive: emp.isActive !== false
    }));
}
