
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
      loadProjectExtras(selectedProject);
      loadCostCodes(selectedProject);
    } else {
      setProjectExtras([]);
      setCostCodes([]);
    }
  }, [selectedProject]);

  // Load cost codes when extra changes
  useEffect(() => {
    if (selectedProject && selectedExtra) {
      loadCostCodes(selectedProject, selectedExtra);
    }
  }, [selectedProject, selectedExtra]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectApi.getAll();
      // Map SQL PascalCase to component's camelCase
      const mappedProjects = response.data.data.map((p: any) => ({
        projectID: p.ProjectID,
        projectCode: p.ProjectCode,
        projectDescription: p.ProjectDescription,
        status: p.Status,
        isActive: p.IsActive,
        createdDate: p.CreatedDate,
        modifiedDate: p.ModifiedDate
      }));
      setProjects(mappedProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await employeeApi.getAll();
      // Map SQL PascalCase to component's camelCase
      const mappedEmployees = response.data.data.map((e: any) => ({
        employeeID: e.EmployeeID,
        firstName: e.FirstName,
        lastName: e.LastName,
        fullName: e.FullName,
        email: e.Email,
        class: e.Class,
        department: e.Department,
        unionID: e.UnionID || 0, // Add missing unionID property with default value
        activeEmp: e.ActiveEmp,
        createdDate: e.CreatedDate,
        modifiedDate: e.ModifiedDate
      }));
      setEmployees(mappedEmployees);
    } catch (error) {
      console.error('Failed to load employees:', error);
      setEmployees([]);
    }
  };

  const loadProjectExtras = async (projectCode: string) => {
    try {
      const projectId = parseInt(projectCode);
      const response = await projectApi.getExtras(projectId);
      // Map the response if needed
      const extras = response.data.data.map((e: any) => ({
        extraID: e.ExtraID,
        projectID: e.ProjectID,
        extraValue: e.ExtraValue,
        description: e.Description,
        isActive: e.IsActive
      }));
      setProjectExtras(extras);
    } catch (error) {
      console.error('Failed to load project extras:', error);
      setProjectExtras([]);
    }
  };

  const loadCostCodes = async (projectCode: string, extraValue?: string) => {
    try {
      const projectId = parseInt(projectCode);
      // Convert extraValue to number if provided, otherwise pass undefined
      const extraId = extraValue ? parseInt(extraValue) : undefined;
      const response = await projectApi.getCostCodes(projectId, extraId);
      // Map the response if needed
      const codes = response.data.data.map((c: any) => ({
        costCodeID: c.CostCodeID,
        costCode: c.CostCode,
        description: c.Description,
        costCodeForSAGE: c.CostCodeForSAGE,
        displayValue: c.DisplayValue || `${c.CostCode} - ${c.Description}`,
        isActive: c.IsActive
      }));
      setCostCodes(codes);
    } catch (error) {
      console.error('Failed to load cost codes:', error);
      setCostCodes([]);
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
