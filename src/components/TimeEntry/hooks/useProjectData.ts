
import { useState, useEffect } from 'react';
import { Project, Employee, ProjectExtra, CostCode } from '@/services/api';

export const useProjectData = (selectedProject?: string, selectedExtra?: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projectExtras, setProjectExtras] = useState<ProjectExtra[]>([]);
  const [costCodes, setCostCodes] = useState<CostCode[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadProjectExtras(selectedProject);
      loadCostCodes(selectedProject);
    }
  }, [selectedProject]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Mock data for projects
      const mockProjects: Project[] = [
        { projectID: 1, projectCode: "PROJ001", projectDescription: "Office Building Renovation", status: "In progress", isActive: true, createdDate: "", modifiedDate: "" },
        { projectID: 2, projectCode: "PROJ002", projectDescription: "Shopping Mall Construction", status: "In progress", isActive: true, createdDate: "", modifiedDate: "" },
        { projectID: 3, projectCode: "PROJ003", projectDescription: "Residential Complex", status: "In progress", isActive: true, createdDate: "", modifiedDate: "" }
      ];

      // Mock data for employees
      const mockEmployees: Employee[] = [
        { 
          employeeID: "EMP001", 
          firstName: "John", 
          lastName: "Doe", 
          fullName: "John Doe", 
          email: "john.doe@company.com", 
          class: "Foreman", 
          department: "Construction", 
          unionID: 1, 
          activeEmp: true, 
          createdDate: "", 
          modifiedDate: "" 
        },
        { 
          employeeID: "EMP002", 
          firstName: "Jane", 
          lastName: "Smith", 
          fullName: "Jane Smith", 
          email: "jane.smith@company.com", 
          class: "Supervisor", 
          department: "Construction", 
          unionID: 1, 
          activeEmp: true, 
          createdDate: "", 
          modifiedDate: "" 
        },
        { 
          employeeID: "EMP003", 
          firstName: "Mike", 
          lastName: "Johnson", 
          fullName: "Mike Johnson", 
          email: "mike.johnson@company.com", 
          class: "Laborer", 
          department: "Construction", 
          unionID: 1, 
          activeEmp: true, 
          createdDate: "", 
          modifiedDate: "" 
        }
      ];

      setProjects(mockProjects);
      setEmployees(mockEmployees);
    } catch (error) {
      console.error('Failed to load initial data:', error);
      // Set empty arrays to prevent undefined errors
      setProjects([]);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const loadProjectExtras = async (projectId: string) => {
    try {
      // Mock data for project extras
      const mockExtras: ProjectExtra[] = [
        { extraID: 1, projectID: parseInt(projectId), extraValue: "Phase 1", description: "Foundation Work", isActive: true },
        { extraID: 2, projectID: parseInt(projectId), extraValue: "Phase 2", description: "Structural Work", isActive: true },
        { extraID: 3, projectID: parseInt(projectId), extraValue: "Phase 3", description: "Finishing Work", isActive: true }
      ];
      
      setProjectExtras(mockExtras);
    } catch (error) {
      console.error('Failed to load project extras:', error);
      setProjectExtras([]);
    }
  };

  const loadCostCodes = async (projectId: string) => {
    try {
      // Mock data for cost codes
      const mockCostCodes: CostCode[] = [
        { costCodeID: 1, costCode: "LAB-001-001", costCodeForSAGE: "LAB001001", description: "General Labor", isActive: true },
        { costCodeID: 2, costCode: "EQP-001-001", costCodeForSAGE: "EQP001001", description: "Equipment Operation", isActive: true },
        { costCodeID: 3, costCode: "MAT-001-001", costCodeForSAGE: "MAT001001", description: "Material Handling", isActive: true }
      ];
      
      setCostCodes(mockCostCodes);
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
