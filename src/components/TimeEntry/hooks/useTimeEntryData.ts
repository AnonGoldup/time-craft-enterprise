
import { useState, useEffect } from 'react';

interface Project {
  id: number;
  code: string;
  description: string;
}

interface ProjectExtra {
  id: number;
  projectId: number;
  description: string;
}

interface CostCode {
  id: number;
  code: string;
  description: string;
}

interface TimeEntryData {
  projects: Project[];
  projectExtras: ProjectExtra[];
  costCodes: CostCode[];
  loadProjectExtras: (projectId: number) => void;
}

interface TimeEntry {
  id: number;
  projectID: string;
  extraID: string;
  costCodeID: string;
  standardHours: string;
  overtimeHours: string;
  dateWorked: string;
  notes: string;
}

interface TimeEntryForm {
  entries: TimeEntry[];
  setEntries: (entries: TimeEntry[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  updateEntry: (id: number, field: string, value: string) => void;
  addEntry: () => void;
  copyLastEntry: () => void;
  removeEntry: (id: number) => void;
  setQuickHours: (hours: number) => void;
}

export const useTimeEntryData = (): TimeEntryData => {
  const [projects] = useState<Project[]>([
    { id: 1, code: 'PROJ001', description: 'Sample Project 1' },
    { id: 2, code: 'PROJ002', description: 'Sample Project 2' }
  ]);
  
  const [projectExtras, setProjectExtras] = useState<ProjectExtra[]>([]);
  const [costCodes] = useState<CostCode[]>([
    { id: 1, code: 'LABOR', description: 'Labor Costs' },
    { id: 2, code: 'MATERIAL', description: 'Material Costs' }
  ]);

  const loadProjectExtras = (projectId: number) => {
    // Mock loading project extras based on selected project
    const mockExtras: ProjectExtra[] = [
      { id: 1, projectId: projectId, description: `Extra for Project ${projectId}` }
    ];
    setProjectExtras(mockExtras);
  };

  return {
    projects,
    projectExtras,
    costCodes,
    loadProjectExtras
  };
};

export const useTimeEntryForm = (): TimeEntryForm => {
  const [entries, setEntries] = useState<TimeEntry[]>([
    {
      id: 1,
      projectID: '',
      extraID: '',
      costCodeID: '',
      standardHours: '',
      overtimeHours: '',
      dateWorked: '',
      notes: ''
    }
  ]);
  const [loading, setLoading] = useState(false);

  const updateEntry = (id: number, field: string, value: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const addEntry = () => {
    const newEntry: TimeEntry = {
      id: Math.max(...entries.map(e => e.id)) + 1,
      projectID: '',
      extraID: '',
      costCodeID: '',
      standardHours: '',
      overtimeHours: '',
      dateWorked: '',
      notes: ''
    };
    setEntries([...entries, newEntry]);
  };

  const copyLastEntry = () => {
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      const newEntry: TimeEntry = {
        ...lastEntry,
        id: Math.max(...entries.map(e => e.id)) + 1,
        notes: ''
      };
      setEntries([...entries, newEntry]);
    }
  };

  const removeEntry = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const setQuickHours = (hours: number) => {
    // Set hours for the first entry
    if (entries.length > 0) {
      updateEntry(entries[0].id, 'standardHours', hours.toString());
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
