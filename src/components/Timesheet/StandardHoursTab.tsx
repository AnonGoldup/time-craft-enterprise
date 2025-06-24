
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { TabContentProps } from './types';
import { mockEmployees, projects, costCodes } from './mockEmployees';
import { EnhancedTimeEntryForm } from '@/components/TimeEntry/EnhancedTimeEntryForm';

// Employee interface matching the Enhanced form
interface Employee {
  employeeId: string
  fullName: string
  email?: string
  class?: string
  isActive?: boolean
}

// Project interface matching the Enhanced form
interface Project {
  projectId: number
  projectCode: string
  projectDescription: string
  isActive: boolean
}

// CostCode interface matching the Enhanced form
interface CostCode {
  costCodeId: number
  costCode: string
  description: string
}

export const StandardHoursTab: React.FC<TabContentProps> = ({
  entries,
  setEntries,
  onSubmit
}) => {
  // Convert mock employees to proper format
  const employees: Employee[] = mockEmployees
    .filter(emp => emp.id && emp.name)
    .map(emp => ({
      employeeId: emp.id!,
      fullName: emp.name!,
      email: `${emp.id!.toLowerCase()}@company.com`,
      class: emp.class || '',
      isActive: true
    }))

  // Convert projects to proper format
  const enhancedProjects: Project[] = projects.map((project, index) => ({
    projectId: index + 1,
    projectCode: project.code,
    projectDescription: project.name,
    isActive: true
  }))

  // Convert cost codes to proper format
  const enhancedCostCodes: CostCode[] = costCodes.map(code => ({
    costCodeId: code.costCodeID,
    costCode: code.costCode,
    description: code.description
  }))

  // Get current user (defaulting to JSMITH)
  const currentUser = employees.find(emp => emp.employeeId === 'JSMITH') || null

  const handleEnhancedSubmit = async (timesheetEntries: any[]) => {
    console.log('Standard Hours entries submitted:', timesheetEntries);
    // Convert the enhanced entries back to the expected format for compatibility
    const convertedEntries = timesheetEntries.map(entry => ({
      employeeId: entry.employeeId,
      dateWorked: entry.dateWorked,
      projectCode: enhancedProjects.find(p => p.projectId === entry.projectId)?.projectCode || '',
      extraValue: 'Default',
      costCode: enhancedCostCodes.find(c => c.costCodeId === entry.costCodeId)?.costCode || '',
      standardHours: entry.standardHours,
      overtimeHours: entry.overtimeHours,
      notes: entry.notes || ''
    }));
    
    // Update the entries state for compatibility with parent component
    setEntries(convertedEntries);
    
    // Call the original onSubmit if needed
    if (onSubmit) {
      const mockEvent = { preventDefault: () => {} } as React.FormEvent;
      onSubmit(mockEvent);
    }
  };

  return (
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Standard Hours Entry</h3>
          <Badge variant="secondary">Enhanced Form</Badge>
        </div>
      </div>

      <EnhancedTimeEntryForm
        employees={employees}
        projects={enhancedProjects}
        costCodes={enhancedCostCodes}
        onSubmit={handleEnhancedSubmit}
        currentUser={currentUser}
        userRole="EMPLOYEE"
        title="Standard Hours Entry"
        description="Enter standard hours for your timesheet. You can select multiple dates and create entries efficiently."
        defaultEmployees={currentUser ? [currentUser] : []}
      />
    </CardContent>
  );
};
