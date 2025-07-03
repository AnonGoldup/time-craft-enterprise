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
      const projectsData = await projectApi.getAll();
      setProjects(projectsData || []);
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
      const employeesData = await employeeApi.getAll();
      setEmployees(employeesData || []);
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
      const extrasData = await projectApi.getExtras(projectCode);
      setProjectExtras(extrasData || []);
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
      const costCodesData = await projectApi.getCostCodes(projectCode, extraValue);
      setCostCodes(costCodesData || []);
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