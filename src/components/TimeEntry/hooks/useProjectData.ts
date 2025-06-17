
import { useState, useEffect } from 'react';
import { projectApi, employeeApi, Project, Employee, ProjectExtra, CostCode } from '@/services/api';

export const useProjectData = (selectedProject: string, selectedExtra: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projectExtras, setProjectExtras] = useState<ProjectExtra[]>([]);
  const [costCodes, setCostCodes] = useState<CostCode[]>([]);
  const [loading, setLoading] = useState(false);

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
      setProjects(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Failed to load projects:', error);
      // Fallback to mock data
      setProjects([
        { ProjectID: 1, ProjectCode: "PROJ001", ProjectDescription: "Office Building Renovation", Status: "Active", IsActive: true },
        { ProjectID: 2, ProjectCode: "PROJ002", ProjectDescription: "Shopping Mall Construction", Status: "Active", IsActive: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await employeeApi.getActive();
      const employeeData = Array.isArray(response.data.data) ? response.data.data : [];
      setEmployees(employeeData);
    } catch (error) {
      console.error('Failed to load employees:', error);
      // Fallback to mock data
      const fallbackEmployees: Employee[] = [
        { EmployeeID: "EMP001", FullName: "John Doe", Email: "john.doe@company.com", Class: "Foreman", Department: "Construction", ActiveEmp: true },
        { EmployeeID: "EMP002", FullName: "Jane Smith", Email: "jane.smith@company.com", Class: "Supervisor", Department: "Construction", ActiveEmp: true },
        { EmployeeID: "EMP003", FullName: "Mike Johnson", Email: "mike.johnson@company.com", Class: "Worker", Department: "Construction", ActiveEmp: true }
      ];
      setEmployees(fallbackEmployees);
    }
  };

  const loadProjectExtras = async (projectId: number) => {
    try {
      const response = await projectApi.getExtras(projectId.toString());
      setProjectExtras(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Failed to load project extras:', error);
      // Fallback to mock data
      setProjectExtras([
        { ExtraID: 1, ExtraValue: "Phase 1", Description: "Foundation Work" },
        { ExtraID: 2, ExtraValue: "Phase 2", Description: "Structural Work" },
        { ExtraID: 3, ExtraValue: "Phase 3", Description: "Finishing Work" }
      ]);
    }
  };

  const loadCostCodes = async (projectId: number, extraId?: number) => {
    try {
      const response = await projectApi.getCostCodes(projectId.toString(), extraId?.toString());
      setCostCodes(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Failed to load cost codes:', error);
      // Fallback to mock data
      setCostCodes([
        { CostCodeID: 1, CostCode: "LAB-001-001", Description: "General Labor" },
        { CostCodeID: 2, CostCode: "EQP-001-001", Description: "Equipment Operation" },
        { CostCodeID: 3, CostCode: "MAT-001-001", Description: "Material Handling" }
      ]);
    }
  };

  return {
    projects,
    employees,
    projectExtras,
    costCodes,
    loading
  };
};
