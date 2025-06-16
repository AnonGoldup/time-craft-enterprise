
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, Building2, Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { projectApi, employeeApi, Project, Employee, ProjectExtra, CostCode } from '@/services/api';

interface ProjectDetailsRowProps {
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  selectedExtra: string;
  setSelectedExtra: (value: string) => void;
  selectedCostCode: string;
  setSelectedCostCode: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  selectedEmployee: string;
  setSelectedEmployee: (value: string) => void;
  selectedEmployees?: string[];
  setSelectedEmployees?: (value: string[]) => void;
  useCostCodeInput?: boolean;
}

const ProjectDetailsRow: React.FC<ProjectDetailsRowProps> = ({
  selectedProject,
  setSelectedProject,
  selectedExtra,
  setSelectedExtra,
  selectedCostCode,
  setSelectedCostCode,
  selectedDate,
  setSelectedDate,
  selectedEmployee,
  setSelectedEmployee,
  selectedEmployees = [],
  setSelectedEmployees,
  useCostCodeInput = false
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projectExtras, setProjectExtras] = useState<ProjectExtra[]>([]);
  const [costCodes, setCostCodes] = useState<CostCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [employeePopoverOpen, setEmployeePopoverOpen] = useState(false);

  // Load initial data
  useEffect(() => {
    loadProjects();
    loadEmployees();
  }, []);

  // Load project extras and cost codes when project changes
  useEffect(() => {
    if (selectedProject) {
      loadProjectExtras(parseInt(selectedProject));
      loadCostCodes(parseInt(selectedProject));
    } else {
      setProjectExtras([]);
      setCostCodes([]);
      setSelectedExtra('');
      setSelectedCostCode('');
    }
  }, [selectedProject]);

  // Load cost codes when extra changes
  useEffect(() => {
    if (selectedProject && selectedExtra) {
      loadCostCodes(parseInt(selectedProject), parseInt(selectedExtra));
    }
  }, [selectedProject, selectedExtra]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectApi.getActive();
      setProjects(response.data.data || []);
    } catch (error) {
      console.error('Failed to load projects:', error);
      // Fallback to mock data
      setProjects([
        { projectID: 1, projectCode: "PROJ001", projectDescription: "Office Building Renovation", status: "Active", isActive: true, createdDate: "", modifiedDate: "" },
        { projectID: 2, projectCode: "PROJ002", projectDescription: "Shopping Mall Construction", status: "Active", isActive: true, createdDate: "", modifiedDate: "" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await employeeApi.getActive();
      const employeeData = response.data.data || [];
      setEmployees(employeeData);
    } catch (error) {
      console.error('Failed to load employees:', error);
      // Fallback to mock data
      const fallbackEmployees = [
        { employeeID: "EMP001", firstName: "John", lastName: "Doe", fullName: "John Doe", email: "john.doe@company.com", class: "Foreman", department: "Construction", unionID: 1, activeEmp: true, createdDate: "", modifiedDate: "" },
        { employeeID: "EMP002", firstName: "Jane", lastName: "Smith", fullName: "Jane Smith", email: "jane.smith@company.com", class: "Supervisor", department: "Construction", unionID: 1, activeEmp: true, createdDate: "", modifiedDate: "" },
        { employeeID: "EMP003", firstName: "Mike", lastName: "Johnson", fullName: "Mike Johnson", email: "mike.johnson@company.com", class: "Worker", department: "Construction", unionID: 1, activeEmp: true, createdDate: "", modifiedDate: "" }
      ];
      setEmployees(fallbackEmployees);
    }
  };

  const loadProjectExtras = async (projectId: number) => {
    try {
      const response = await projectApi.getExtras(projectId);
      setProjectExtras(response.data.data || []);
    } catch (error) {
      console.error('Failed to load project extras:', error);
      // Fallback to mock data
      setProjectExtras([
        { extraID: 1, projectID: projectId, extraValue: "Phase 1", description: "Foundation Work", isActive: true },
        { extraID: 2, projectID: projectId, extraValue: "Phase 2", description: "Structural Work", isActive: true },
        { extraID: 3, projectID: projectId, extraValue: "Phase 3", description: "Finishing Work", isActive: true }
      ]);
    }
  };

  const loadCostCodes = async (projectId: number, extraId?: number) => {
    try {
      const response = await projectApi.getCostCodes(projectId, extraId);
      setCostCodes(response.data.data || []);
    } catch (error) {
      console.error('Failed to load cost codes:', error);
      // Fallback to mock data
      setCostCodes([
        { costCodeID: 1, costCode: "LAB-001-001", costCodeForSAGE: "LAB001001", description: "General Labor", isActive: true },
        { costCodeID: 2, costCode: "EQP-001-001", costCodeForSAGE: "EQP001001", description: "Equipment Operation", isActive: true },
        { costCodeID: 3, costCode: "MAT-001-001", costCodeForSAGE: "MAT001001", description: "Material Handling", isActive: true }
      ]);
    }
  };

  const handleEmployeeSelect = (employeeId: string) => {
    if (setSelectedEmployees) {
      // Multi-select mode
      const newSelection = selectedEmployees.includes(employeeId)
        ? selectedEmployees.filter(id => id !== employeeId)
        : [...selectedEmployees, employeeId];
      setSelectedEmployees(newSelection);
    } else {
      // Single select mode (fallback)
      setSelectedEmployee(employeeId);
      setEmployeePopoverOpen(false);
    }
  };

  const removeEmployee = (employeeId: string) => {
    if (setSelectedEmployees) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  const getSelectedEmployeeNames = () => {
    if (!Array.isArray(employees) || !Array.isArray(selectedEmployees)) {
      return [];
    }
    return employees
      .filter(emp => selectedEmployees.includes(emp.employeeID))
      .map(emp => emp.fullName);
  };

  // Ensure arrays are always defined before rendering
  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeEmployees = Array.isArray(employees) ? employees : [];
  const safeProjectExtras = Array.isArray(projectExtras) ? projectExtras : [];
  const safeCostCodes = Array.isArray(costCodes) ? costCodes : [];
  const safeSelectedEmployees = Array.isArray(selectedEmployees) ? selectedEmployees : [];

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-blue-500" />
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[60px]">Project:</span>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="Select project..." />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            {safeProjects.map((project) => (
              <SelectItem key={project.projectID} value={project.projectID.toString()}>
                {project.projectCode} - {project.projectDescription}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 border-2 border-green-500 rounded flex items-center justify-center">
          <span className="text-green-500 text-xs font-bold">E</span>
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[40px]">Extra:</span>
        <Select value={selectedExtra} onValueChange={setSelectedExtra} disabled={!selectedProject}>
          <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="Select extra..." />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            {safeProjectExtras.map((extra) => (
              <SelectItem key={extra.extraID} value={extra.extraID.toString()}>
                {extra.extraValue} - {extra.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 border-2 border-blue-500 rounded flex items-center justify-center">
          <span className="text-blue-500 text-xs font-bold">C</span>
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[80px]">Cost Code:</span>
        {useCostCodeInput ? (
          <Input 
            placeholder="Select code..." 
            value={selectedCostCode} 
            onChange={e => setSelectedCostCode(e.target.value)} 
            className="w-48 border-slate-300 dark:border-slate-600" 
          />
        ) : (
          <Select value={selectedCostCode} onValueChange={setSelectedCostCode} disabled={!selectedProject}>
            <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Select code..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              {safeCostCodes.map((code) => (
                <SelectItem key={code.costCodeID} value={code.costCodeID.toString()}>
                  {code.costCode} - {code.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-blue-500" />
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[40px]">Date:</span>
        <Input 
          type="date" 
          value={selectedDate} 
          onChange={e => setSelectedDate(e.target.value)} 
          className="w-36 border-slate-300 dark:border-slate-600 bg-slate-50" 
        />
      </div>

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-blue-500" />
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[70px]">Employee:</span>
        
        {setSelectedEmployees ? (
          // Multi-select mode
          <Popover open={employeePopoverOpen} onOpenChange={setEmployeePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={employeePopoverOpen}
                className="w-48 justify-between border-slate-300 dark:border-slate-600"
              >
                {safeSelectedEmployees.length === 0
                  ? "Select employees..."
                  : safeSelectedEmployees.length === 1
                  ? getSelectedEmployeeNames()[0]
                  : `${safeSelectedEmployees.length} employees selected`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0">
              <Command>
                <CommandInput placeholder="Search employees..." />
                <CommandEmpty>No employee found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {safeEmployees.map((employee) => (
                    <CommandItem
                      key={employee.employeeID}
                      value={employee.fullName}
                      onSelect={() => handleEmployeeSelect(employee.employeeID)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          safeSelectedEmployees.includes(employee.employeeID) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {employee.fullName}
                      <span className="ml-auto text-xs text-slate-500">
                        {employee.class}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          // Single select mode (fallback)
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Select employee..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              {safeEmployees.map((employee) => (
                <SelectItem key={employee.employeeID} value={employee.employeeID}>
                  {employee.fullName} - {employee.class}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Selected employees badges (for multi-select) */}
      {setSelectedEmployees && safeSelectedEmployees.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2 w-full">
          {getSelectedEmployeeNames().map((name, index) => (
            <Badge
              key={safeSelectedEmployees[index]}
              variant="secondary"
              className="text-xs"
            >
              {name}
              <button
                onClick={() => removeEmployee(safeSelectedEmployees[index])}
                className="ml-1 hover:text-red-500"
                type="button"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsRow;
