
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
import { mockEmployees, projects, costCodes } from "../Timesheet/mockEmployees"

// Types matching your database structure
interface Employee {
  employeeId: string
  fullName: string
  email?: string
  class?: string
  isActive?: boolean
}

interface Project {
  code: string
  name: string
}

interface CostCode {
  costCodeID: number
  costCode: string
  description: string
}

interface TimesheetEntry {
  entryId?: number
  employeeId: string
  dateWorked: string
  projectCode: string
  costCode: string
  standardHours: number
  overtimeHours: number
  notes?: string
}

// Form validation schema with business rules
const timeEntrySchema = z.object({
  selectedEmployees: z.array(z.object({
    employeeId: z.string(),
    fullName: z.string(),
    email: z.string().optional(),
    class: z.string().optional(),
    isActive: z.boolean().optional(),
  })).min(1, "At least one employee must be selected"),
  
  selectedDates: z.array(z.date()).min(1, "At least one date must be selected"),
  
  projectCode: z.string().min(1, "Project is required"),
  
  costCode: z.string().min(1, "Cost code is required"),
  
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
  onSubmit: (entries: TimesheetEntry[]) => Promise<void>
}

export function EnhancedTimeEntryForm({
  onSubmit,
}: EnhancedTimeEntryFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  
  // Convert mock employees to proper format with required fields
  const employees: Employee[] = mockEmployees
    .filter(emp => emp.id && emp.name) // Filter first to ensure we have required data
    .map(emp => ({
      employeeId: emp.id!, // Use non-null assertion since we filtered above
      fullName: emp.name!, // Use non-null assertion since we filtered above
      email: `${emp.id!.toLowerCase()}@company.com`,
      class: emp.class || '',
      isActive: true
    }))

  const currentUser = employees.find(emp => emp.employeeId === 'JSMITH')
  
  const form = useForm<TimeEntryFormValues>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      selectedEmployees: currentUser ? [currentUser] : [],
      selectedDates: [],
      projectCode: "",
      costCode: "",
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
          // Create combined entry with both standard and overtime hours
          const totalHours = values.standardHours + values.overtimeHours
          if (totalHours > 0) {
            entries.push({
              employeeId: employee.employeeId,
              dateWorked: date.toISOString().split('T')[0],
              projectCode: values.projectCode,
              costCode: values.costCode,
              standardHours: values.standardHours,
              overtimeHours: values.overtimeHours,
              notes: values.notes,
            })
          }
        })
      })

      await onSubmit(entries)
      
      toast.success(`Successfully created ${entries.length} timesheet entries`)
      
      // Reset form but keep current user selected
      form.reset({
        selectedEmployees: currentUser ? [currentUser] : [],
        selectedDates: [],
        projectCode: "",
        costCode: "",
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Enhanced Time Entry
          {totalEntries > 1 && (
            <Badge variant="outline">
              {totalEntries} entries will be created
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Select dates and enter your time for projects.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            
            {/* Employee Selection */}
            <FormField
              control={form.control}
              name="selectedEmployees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <FormControl>
                    <MultiEmployeeSelector
                      employees={employees.filter(emp => emp.isActive !== false)}
                      selectedEmployees={field.value}
                      onEmployeeChange={field.onChange}
                      placeholder="Select employee..."
                      maxSelected={1}
                      disabled={!!currentUser}
                    />
                  </FormControl>
                  <FormDescription>
                    Your employee account
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Selection */}
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
                    Select the date(s) when work was performed. Future dates are not allowed.
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
                name="projectCode"
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
                        {projects.map((project) => (
                          <SelectItem 
                            key={project.code} 
                            value={project.code}
                          >
                            {project.code} - {project.name}
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
                name="costCode"
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
                            key={costCode.costCodeID} 
                            value={costCode.costCode}
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
                      Overtime hours will be included in the same entry
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
                    <span className="text-muted-foreground">Entry Type:</span>
                    <div className="font-medium">Employee</div>
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
