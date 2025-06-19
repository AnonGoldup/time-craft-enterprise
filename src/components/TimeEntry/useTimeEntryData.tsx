
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Project, CostCode, ProjectExtra } from "@/services/api";
import { EntryFormData } from "./EntryValidation";

export const useTimeEntryData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectExtras, setProjectExtras] = useState<{ [key: string]: ProjectExtra[] }>({});
  const [costCodes, setCostCodes] = useState<{ [key: string]: CostCode[] }>({});

  useEffect(() => {
    loadProjects();
    loadCostCodes();
  }, []);

  const loadProjects = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockProjects: Project[] = [
        { projectID: 1, projectCode: "PROJ001", projectDescription: "Office Building Renovation", status: "In progress", isActive: true, createdDate: "", modifiedDate: "" },
        { projectID: 2, projectCode: "PROJ002", projectDescription: "Shopping Mall Construction", status: "In progress", isActive: true, createdDate: "", modifiedDate: "" },
        { projectID: 3, projectCode: "PROJ003", projectDescription: "Residential Complex", status: "In progress", isActive: true, createdDate: "", modifiedDate: "" }
      ];
      setProjects(mockProjects);
    } catch (error) {
      toast.error("Failed to load projects");
    }
  };

  const loadCostCodes = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockCostCodes: CostCode[] = [
        { costCodeID: 1, costCode: "LAB-001-001", costCodeForSAGE: "LAB001001", description: "General Labor", isActive: true },
        { costCodeID: 2, costCode: "EQP-001-001", costCodeForSAGE: "EQP001001", description: "Equipment Operation", isActive: true },
        { costCodeID: 3, costCode: "MAT-001-001", costCodeForSAGE: "MAT001001", description: "Material Handling", isActive: true }
      ];
      
      // Set cost codes for all projects (simplified for demo)
      const costCodesByProject: { [key: string]: CostCode[] } = {};
      projects.forEach(project => {
        costCodesByProject[project.projectID.toString()] = mockCostCodes;
      });
      setCostCodes(costCodesByProject);
    } catch (error) {
      toast.error("Failed to load cost codes");
    }
  };

  const loadProjectExtras = async (projectId: number) => {
    try {
      // Mock data for now - replace with actual API call
      const mockExtras: ProjectExtra[] = [
        { extraID: 1, projectID: projectId, extraValue: "Phase 1", description: "Foundation Work", isActive: true },
        { extraID: 2, projectID: projectId, extraValue: "Phase 2", description: "Structural Work", isActive: true },
        { extraID: 3, projectID: projectId, extraValue: "Phase 3", description: "Finishing Work", isActive: true }
      ];
      
      setProjectExtras(prev => ({
        ...prev,
        [projectId.toString()]: mockExtras
      }));
    } catch (error) {
      toast.error("Failed to load project extras");
    }
  };

  return {
    projects,
    projectExtras,
    costCodes,
    loadProjectExtras
  };
};

export const useTimeEntryForm = () => {
  const [entries, setEntries] = useState<EntryFormData[]>([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      projectID: "",
      extraID: "",
      costCodeID: "",
      standardHours: "",
      overtimeHours: "",
      notes: "",
      errors: {}
    }
  ]);
  const [loading, setLoading] = useState(false);

  const updateEntry = (id: number, field: string, value: string) => {
    setEntries(entries.map(entry => {
      if (entry.id === id) {
        // Validate time inputs
        if (field === 'standardHours' || field === 'overtimeHours') {
          const numValue = parseFloat(value) || 0;
          if (numValue < 0 || numValue > 16) {
            return entry; // Don't update if invalid
          }
        }

        const updatedEntry = { ...entry, [field]: value };
        
        // Clear related fields when project changes
        if (field === 'projectID') {
          updatedEntry.extraID = "";
          updatedEntry.costCodeID = "";
        }
        
        // Clear validation errors for the changed field
        const newErrors = { ...updatedEntry.errors };
        delete newErrors[field];
        if (field === 'standardHours' || field === 'overtimeHours') {
          delete newErrors.hours;
        }
        updatedEntry.errors = newErrors;
        
        return updatedEntry;
      }
      return entry;
    }));
  };

  const addEntry = () => {
    const newEntry: EntryFormData = {
      id: Math.max(...entries.map(e => e.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      projectID: "",
      extraID: "",
      costCodeID: "",
      standardHours: "",
      overtimeHours: "",
      notes: "",
      errors: {}
    };
    setEntries([...entries, newEntry]);
  };

  const copyLastEntry = () => {
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      const newEntry: EntryFormData = {
        ...lastEntry,
        id: Math.max(...entries.map(e => e.id)) + 1,
        date: new Date().toISOString().split('T')[0],
        standardHours: "",
        overtimeHours: "",
        notes: "",
        errors: {}
      };
      setEntries([...entries, newEntry]);
      toast.success("Copied last entry settings");
    }
  };

  const removeEntry = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const setQuickHours = (entryId: number, hours: number) => {
    if (hours <= 16) {
      updateEntry(entryId, 'standardHours', hours.toString());
    }
  };

  return {
    entries,
    setEntries,
    loading,
    setLoading,
    updateEntry,
    addEntry,
    copyLastEntry,
    removeEntry,
    setQuickHours
  };
};
