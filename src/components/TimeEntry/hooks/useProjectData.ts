import { useState, useEffect } from 'react';
import { projectApi, employeeApi } from '@/services/api';
import type { Project, Employee, ProjectExtra, CostCode } from '@/services/api';

export const useProjectData = (selectedProject?: string, selectedExtra?: string) => {
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

  // Load project extras when project changes
  useEffect(() => {
    if (selectedProject) {
      loadProjectExtras(selectedProject);
    } else {
      setProjectExtras([]);
      setCostCodes([]);
    }
  }, [selectedProject]);

  // Load cost codes when project or extra changes
  useEffect(() => {
    if (selectedProject) {
      loadCostCodes(selectedProject, selectedExtra);
    } else {
      setCostCodes([]);
    }
  }, [selectedProject, selectedExtra]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectApi.getAll();
      const projectsData = response.data || [];
      setProjects(Array.isArray(projectsData) ? projectsData : (projectsData?.data || []));
    } catch (error) {
      console.error('Failed to load projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeApi.getAll();
      const employeesData = response.data || [];
      setEmployees(Array.isArray(employeesData) ? employeesData : (employeesData?.data || []));
    } catch (error) {
      console.error('Failed to load employees:', error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const loadProjectExtras = async (projectCode: string) => {
    try {
      setLoading(true);
      const response = await projectApi.getExtras(projectCode);
      const extrasData = response.data || [];
      setProjectExtras(Array.isArray(extrasData) ? extrasData : (extrasData?.data || []));
    } catch (error) {
      console.error('Failed to load project extras:', error);
      setProjectExtras([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCostCodes = async (projectCode: string, extraValue?: string) => {
    try {
      setLoading(true);
      const response = await projectApi.getCostCodes(projectCode, extraValue);
      const costCodesData = response.data || [];
      setCostCodes(Array.isArray(costCodesData) ? costCodesData : (costCodesData?.data || []));
    } catch (error) {
      console.error('Failed to load cost codes:', error);
      setCostCodes([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    employees,
    projectExtras,
    costCodes,
    loading,
    loadProjects,
    loadEmployees,
    loadProjectExtras,
    loadCostCodes,
  };
};