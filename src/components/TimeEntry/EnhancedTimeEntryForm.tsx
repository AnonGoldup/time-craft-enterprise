"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import { MultiDatePicker } from "./MultiDatePicker"
import { MultiEmployeeSelector } from "./MultiEmployeeSelector"

// Types matching your database structure
interface Employee {
  employeeId: string
  fullName: string
  email?: string
  class?: string
  isActive?: boolean
}

interface Project {
  projectId: number
  projectCode: string
  projectDescription: string
  isActive: boolean
}

interface CostCode {
  costCodeId: number
  costCode: string
  description: string
}

interface TimesheetEntry {
  entryId?: number
  employeeId: string
  dateWorked: string
  projectId: number
  costCodeId: number
  standardHours: number
  overtimeHours: number
  notes?: string
}

// Form validation schema with business rules
const timeEntrySchema = z.object({
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

type TimeEntryFormValues = z.infer<typeof timeEntrySchema>

interface EnhancedTimeEntryFormProps {
  employees: Array<{
    employeeId?: string
    fullName?: string
    email?: string
    class?: string
    isActive?: boolean
  }>
  projects: Project[]
  costCodes: CostCode[]
  onSubmit: (entries: TimesheetEntry[]) => Promise<void>
  currentUser?: Employee | null
  userRole?: 'ADMIN' | 'EMPLOYEE'
  title?: string
  description?: string
  defaultEmployees?: Employee[]
  defaultDates?: Date[]
}

export function EnhancedTimeEntryForm({
  employees,
  projects,
  costCodes,
  onSubmit,
  currentUser,
  userRole = 'EMPLOYEE',
  title,
  description,
  defaultEmployees,
  defaultDates,
}: EnhancedTimeEntryFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  
  // Type guard to ensure currentUser has required properties
  const isValidEmployee = (user: any): user is Employee => {
    return user && 
           typeof user.employeeId === 'string' && 
           user.employeeId.length > 0 &&
           typeof user.fullName === 'string' && 
           user.fullName.length > 0;
  }
  
  const validCurrentUser = isValidEmployee(currentUser) ? currentUser : null;
  const isAdmin = userRole === 'ADMIN';

  // Filter employees to ensure they have required properties and convert to proper Employee type
  const validEmployees = React.useMemo((): Employee[] => {
    return employees
      .filter((emp): emp is Required<Pick<typeof emp, 'employeeId' | 'fullName'>> & typeof emp => 
        typeof emp.employeeId === 'string' && 
        emp.employeeId.length > 0 &&
        typeof emp.fullName === 'string' && 
        emp.fullName.length > 0 &&
        emp.isActive !== false
      )
      .map((emp): Employee => ({
        employeeId: emp.employeeId,
        fullName: emp.fullName,
        email: emp.email,
        class: emp.class,
        isActive: emp.isActive
      }));
  }, [employees]);
  
  // Set default employees based on props or current user - ensure proper typing
  const getDefaultEmployees = React.useCallback((): Employee[] => {
    if (defaultEmployees) {
      // Filter defaultEmployees to ensure they match our valid employees
      return defaultEmployees.filter(defaultEmp => 
        validEmployees.some(validEmp => validEmp.employeeId === defaultEmp.employeeId)
      );
    }
    if (validCurrentUser && validEmployees.some(emp => emp.employeeId === validCurrentUser.employeeId)) {
      return [validCurrentUser];
    }
    return [];
  }, [defaultEmployees, validCurrentUser, validEmployees]);

  const form = useForm<TimeEntryFormValues>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      selectedEmployees: getDefaultEmployees(),
      selectedDates: defaultDates || [],
      projectId: "",
      costCodeId: "",
      standardHours: 8,
      overtimeHours: 0,
      notes: "",
    },
  })

  const watchedEmployees = form.watch("selectedEmployees")
  const watchedDates = form.watch("selectedDates")

  // Calculate total entries that will be created
  const totalEntries = watchedEmployees.length * watchedDates.length

  const handleFormSubmit = async (values: TimeEntryFormValues) => {
    setIsLoading(true)
    
    try {
      // Create timesheet entries for each employee and date combination
      const entries: TimesheetEntry[] = []
      
      values.selectedEmployees.forEach(employee => {
        values.selectedDates.forEach(date => {
          // Create standard hours entry if > 0
          if (values.standardHours > 0) {
            entries.push({
              employeeId: employee.employeeId,
              dateWorked: date.toISOString().split('T')[0],
              projectId: parseInt(values.projectId),
              costCodeId: parseInt(values.costCodeId),
              standardHours: values.standardHours,
              overtimeHours: 0,
              notes: isAdmin ? 
                `${values.notes || ''} [Admin Entry by ${validCurrentUser?.employeeId || 'SYSTEM'}]`.trim() :
                values.notes,
            })
          }
          
          // Create overtime entry if > 0
          if (values.overtimeHours > 0) {
            entries.push({
              employeeId: employee.employeeId,
              dateWorked: date.toISOString().split('T')[0],
              projectId: parseInt(values.projectId),
              costCodeId: parseInt(values.costCodeId),
              standardHours: 0,
              overtimeHours: values.overtimeHours,
              notes: isAdmin ? 
                `${values.notes || ''} [Admin Entry by ${validCurrentUser?.employeeId || 'SYSTEM'}]`.trim() :
                values.notes,
            })
          }
        })
      })

      await onSubmit(entries)
      
      toast.success(`Successfully created ${entries.length} timesheet entries`)
      
      // Reset form with defaults
      form.reset({
        selectedEmployees: getDefaultEmployees(),
        selectedDates: defaultDates || [],
        projectId: "",
        costCodeId: "",
        standardHours: 8,
        overtimeHours: 0,
        notes: "",
      })
      
    } catch (error) {
      toast.error("Failed to create timesheet entries")
      console.error("Timesheet entry error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title || "Time Entry Form"}
          {totalEntries > 1 && (
            <Badge variant="outline">
              {totalEntries} entries will be created
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {description || "Select employees, dates, and enter time for projects. Create multiple entries efficiently."}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            
            {/* Employee Selection - Available to Everyone */}
            <FormField
              control={form.control}
              name="selectedEmployees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Employees</FormLabel>
                  <FormControl>
                    <MultiEmployeeSelector
                      employees={validEmployees}
                      selectedEmployees={field.value}
                      onEmployeeChange={field.onChange}
                      placeholder="Select employees..."
                      groupByClass={true}
                      searchPlaceholder="Search by name, ID, or job class..."
                    />
                  </FormControl>
                  <FormDescription>
                    Select one or more employees to create timesheet entries for. Search by name, employee ID, or job class.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Selection - Available to Everyone */}
            <FormField
              control={form.control}
              name="selectedDates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date(s) Worked</FormLabel>
                  <FormControl>
                    <MultiDatePicker
                      selectedDates={field.value}
                      onDateChange={field.onChange}
                      placeholder="Select dates worked..."
                    />
                  </FormControl>
                  <FormDescription>
                    Select the date(s) when work was performed. You can select multiple dates to create entries efficiently.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Project and Cost Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projects
                          .filter(project => project.isActive)
                          .map((project) => (
                            <SelectItem 
                              key={project.projectId} 
                              value={project.projectId.toString()}
                            >
                              {project.projectCode} - {project.projectDescription}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="costCodeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Code</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cost code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {costCodes.map((costCode) => (
                          <SelectItem 
                            key={costCode.costCodeId} 
                            value={costCode.costCodeId.toString()}
                          >
                            {costCode.costCode} - {costCode.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="standardHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Standard Hours</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.25"
                        min="0"
                        max="16"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      Hours in quarter-hour increments (0.25, 0.5, 0.75, etc.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="overtimeHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overtime Hours</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.25"
                        min="0"
                        max="16"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      Overtime hours (separate entry will be created)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional notes..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  {isAdmin && (
                    <FormDescription>
                      Note: All entries will be automatically marked as admin entries.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Summary */}
            {totalEntries > 0 && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Entry Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Employees:</span>
                    <div className="font-medium">{watchedEmployees.length}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Dates:</span>
                    <div className="font-medium">{watchedDates.length}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Entries:</span>
                    <div className="font-medium">{totalEntries}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">User Role:</span>
                    <div className="font-medium">{userRole}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isLoading || totalEntries === 0}>
                {isLoading ? "Creating Entries..." : `Create ${totalEntries} Entries`}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
