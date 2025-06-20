
import { useState, useEffect } from 'react';
import { mockApiService } from '@/services/mockApiService';
import { Project, Employee, ProjectExtra, CostCode } from '@/services/api';

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
      const response = await mockApiService.projects.getActive();
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await mockApiService.employees.getActive();
      setEmployees(response.data);
    } catch (error) {
      console.error('Failed to load employees:', error);
    }
  };

  const loadProjectExtras = async (projectId: number) => {
    try {
      const response = await mockApiService.projects.getExtras(projectId);
      setProjectExtras(response.data);
    } catch (error) {
      console.error('Failed to load project extras:', error);
    }
  };

  const loadCostCodes = async (projectId: number, extraId?: number) => {
    try {
      const response = await mockApiService.projects.getCostCodes(projectId, extraId);
      setCostCodes(response.data);
    } catch (error) {
      console.error('Failed to load cost codes:', error);
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
