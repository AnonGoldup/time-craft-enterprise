
import { z } from "zod"
import { Employee } from "./types"

// Form validation schema with business rules
export const bulkTimeEntrySchema = z.object({
  selectedEmployees: z.array(z.object({
    employeeId: z.string().min(1, "Employee ID is required"),
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().optional(),
    class: z.string().optional(),
    isActive: z.boolean().optional(),
  })).min(1, "At least one employee must be selected"),
  
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

// Type guard to check if an employee has required fields
const hasRequiredFields = (emp: any): emp is Employee => {
  return typeof emp.employeeId === 'string' && 
         emp.employeeId.length > 0 &&
         typeof emp.fullName === 'string' && 
         emp.fullName.length > 0;
};

// Utility function to filter and validate employees - returns proper Employee type
export const validateEmployees = (employees: any[]): Employee[] => {
  return employees
    .filter(hasRequiredFields)
    .map((emp): Employee => ({
      employeeId: emp.employeeId,
      fullName: emp.fullName,
      email: emp.email,
      class: emp.class,
      isActive: emp.isActive !== false
    }));
}
