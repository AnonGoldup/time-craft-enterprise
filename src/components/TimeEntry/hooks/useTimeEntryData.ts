import { useState, useEffect } from 'react';
import { Project, ProjectExtra, CostCode } from '@/services/api';
import { EntryFormData } from '../EntryValidation';

interface TimeEntryData {
  projects: Project[];
  projectExtras: { [key: string]: ProjectExtra[] };
  costCodes: { [key: string]: CostCode[] };
  loadProjectExtras: (projectId: number) => void;
}

interface TimeEntryForm {
  entries: EntryFormData[];
  setEntries: (entries: EntryFormData[]) => void;
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
    { 
      projectID: 1, 
      projectCode: 'PROJ001', 
      projectDescription: 'Sample Project 1',
      status: 'Active',
      isActive: true,
      createdDate: '2024-01-01',
      modifiedDate: '2024-01-01'
    },
    { 
      projectID: 2, 
      projectCode: 'PROJ002', 
      projectDescription: 'Sample Project 2',
      status: 'Active',
      isActive: true,
      createdDate: '2024-01-01',
      modifiedDate: '2024-01-01'
    }
  ]);
  
  const [projectExtras, setProjectExtras] = useState<{ [key: string]: ProjectExtra[] }>({});
  const [costCodes] = useState<{ [key: string]: CostCode[] }>({
    '1': [
      { costCodeID: 1, costCode: 'LABOR', description: 'Labor Costs', costCodeForSAGE: 'LAB001', isActive: true },
      { costCodeID: 2, costCode: 'MATERIAL', description: 'Material Costs', costCodeForSAGE: 'MAT001', isActive: true }
    ],
    '2': [
      { costCodeID: 3, costCode: 'LABOR', description: 'Labor Costs', costCodeForSAGE: 'LAB002', isActive: true },
      { costCodeID: 4, costCode: 'EQUIPMENT', description: 'Equipment Costs', costCodeForSAGE: 'EQP001', isActive: true }
    ]
  });

  const loadProjectExtras = (projectId: number) => {
    // Mock loading project extras based on selected project
    const mockExtras: ProjectExtra[] = [
      { 
        extraID: 1, 
        projectID: projectId, 
        extraValue: `Extra-${projectId}`,
        description: `Extra for Project ${projectId}`,
        isActive: true
      }
    ];
    setProjectExtras(prev => ({
      ...prev,
      [projectId.toString()]: mockExtras
    }));
  };

  return {
    projects,
    projectExtras,
    costCodes,
    loadProjectExtras
  };
};

export const useTimeEntryForm = (): TimeEntryForm => {
  const [entries, setEntries] = useState<EntryFormData[]>([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      projectID: '',
      extraID: '',
      costCodeID: '',
      standardHours: '',
      overtimeHours: '',
      notes: '',
      errors: {}
    }
  ]);
  const [loading, setLoading] = useState(false);

  const updateEntry = (id: number, field: string, value: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value, errors: { ...entry.errors } } : entry
    ));
  };

  const addEntry = () => {
    const newEntry: EntryFormData = {
      id: Math.max(...entries.map(e => e.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      projectID: '',
      extraID: '',
      costCodeID: '',
      standardHours: '',
      overtimeHours: '',
      notes: '',
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
        notes: '',
        errors: {}
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
