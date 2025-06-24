
import { useState, useEffect } from 'react';

export interface ProjectExtra {
  extraID: number;
  extraValue: string;
  description: string;
  isActive: boolean;
}

export interface CostCode {
  costCodeID: number;
  costCode: string;
  description: string;
  isActive: boolean;
}

export interface Project {
  projectID: number;
  projectCode: string;
  projectDescription: string;
  isActive: boolean;
}

export const useProjectCostCodes = (projectCode: string) => {
  const [extras, setExtras] = useState<ProjectExtra[]>([]);
  const [costCodes, setCostCodes] = useState<CostCode[]>([]);
  const [selectedExtra, setSelectedExtra] = useState<string>('Default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for development
  const mockExtras: ProjectExtra[] = [
    { extraID: 1, extraValue: 'Default', description: 'Default', isActive: true },
    { extraID: 2, extraValue: '005', description: 'Phase 1', isActive: true },
    { extraID: 3, extraValue: '010', description: 'Phase 2', isActive: true },
    { extraID: 4, extraValue: '015', description: 'Phase 3', isActive: true }
  ];

  const mockCostCodes: CostCode[] = [
    { costCodeID: 1, costCode: '001-040-043', description: 'Direct Labor', isActive: true },
    { costCodeID: 2, costCode: '001-040-054', description: 'Training', isActive: true },
    { costCodeID: 3, costCode: '001-500-501', description: 'Travel', isActive: true },
    { costCodeID: 4, costCode: '002-100-001', description: 'Equipment Operation', isActive: true },
    { costCodeID: 5, costCode: '003-200-002', description: 'Material Handling', isActive: true }
  ];

  // Fetch extras for project
  useEffect(() => {
    if (projectCode) {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      setTimeout(() => {
        try {
          // In real implementation, this would be an API call
          // const extras = await projectApi.getExtras(projectCode);
          
          // For now, use mock data
          const extrasWithDefault = [
            { extraID: 0, extraValue: 'Default', description: 'Default', isActive: true },
            ...mockExtras.filter(e => e.extraValue !== 'Default')
          ];
          
          setExtras(extrasWithDefault);
          setSelectedExtra('Default');
          setLoading(false);
        } catch (err) {
          setError('Failed to load project extras');
          setLoading(false);
        }
      }, 300);
    } else {
      setExtras([]);
      setSelectedExtra('Default');
    }
  }, [projectCode]);

  // Fetch cost codes based on project and extra
  useEffect(() => {
    if (projectCode) {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      setTimeout(() => {
        try {
          // In real implementation:
          // const costCodes = await projectApi.getCostCodes(projectCode, selectedExtra);
          
          // For now, use mock data with some filtering based on extra
          let filteredCostCodes = mockCostCodes;
          
          if (selectedExtra !== 'Default') {
            // Simulate different cost codes for different extras
            filteredCostCodes = mockCostCodes.filter((_, index) => 
              selectedExtra === '005' ? index < 3 : 
              selectedExtra === '010' ? index >= 2 && index < 4 : 
              true
            );
          }
          
          setCostCodes(filteredCostCodes);
          setLoading(false);
        } catch (err) {
          setError('Failed to load cost codes');
          setLoading(false);
        }
      }, 200);
    } else {
      setCostCodes([]);
    }
  }, [projectCode, selectedExtra]);

  const resetSelections = () => {
    setSelectedExtra('Default');
    setCostCodes([]);
  };

  return {
    extras,
    costCodes,
    selectedExtra,
    setSelectedExtra,
    loading,
    error,
    resetSelections
  };
};

// Hook for getting all active projects
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock projects data
  const mockProjects: Project[] = [
    { projectID: 1, projectCode: '21-0066', projectDescription: 'EXPO Solar Installation', isActive: true },
    { projectID: 2, projectCode: '21-0067', projectDescription: 'Office Building Renovation', isActive: true },
    { projectID: 3, projectCode: '21-0068', projectDescription: 'Shopping Mall Construction', isActive: true },
    { projectID: 4, projectCode: '21-0069', projectDescription: 'Residential Complex', isActive: true }
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // In real implementation: const projects = await projectApi.getActive();
        setProjects(mockProjects);
        setLoading(false);
      } catch (err) {
        setError('Failed to load projects');
        setLoading(false);
      }
    }, 500);
  }, []);

  return { projects, loading, error };
};
