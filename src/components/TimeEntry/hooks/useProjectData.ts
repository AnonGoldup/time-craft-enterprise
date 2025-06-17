
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
      const employeeData = Array.isArray(response.data.data) ? response.data.data : [];
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
      setProjectExtras(Array.isArray(response.data.data) ? response.data.data : []);
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
      setCostCodes(Array.isArray(response.data.data) ? response.data.data : []);
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

  return {
    projects,
    employees,
    projectExtras,
    costCodes,
    loading
  };
};
