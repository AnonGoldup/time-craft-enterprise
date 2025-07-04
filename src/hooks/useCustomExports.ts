import { useState, useEffect, useCallback } from 'react';

export interface CustomExportFormat {
  id: string;
  name: string;
  headers: string[];
  description: string;
  createdAt: string;
}

export const AVAILABLE_HEADERS = [
  { id: 'employeeId', label: 'Employee ID', required: true },
  { id: 'employeeName', label: 'Employee Name', required: false },
  { id: 'projectCode', label: 'Project Code', required: true },
  { id: 'projectName', label: 'Project Name', required: false },
  { id: 'costCode', label: 'Cost Code', required: true },
  { id: 'costCodeName', label: 'Cost Code Name', required: false },
  { id: 'date', label: 'Date', required: true },
  { id: 'hours', label: 'Hours', required: true },
  { id: 'payType', label: 'Pay Type', required: false },
  { id: 'notes', label: 'Notes', required: false },
  { id: 'extra', label: 'Extra', required: false },
  { id: 'unionId', label: 'Union ID', required: false },
  { id: 'department', label: 'Department', required: false },
  { id: 'supervisor', label: 'Supervisor', required: false }
] as const;

const STORAGE_KEY = 'custom-export-formats';

export const useCustomExports = () => {
  const [customFormats, setCustomFormats] = useState<CustomExportFormat[]>([]);

  // Load custom formats from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCustomFormats(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load custom export formats:', error);
    }
  }, []);

  // Save custom formats to localStorage
  const saveToStorage = useCallback((formats: CustomExportFormat[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formats));
    } catch (error) {
      console.error('Failed to save custom export formats:', error);
    }
  }, []);

  const addCustomFormat = useCallback((format: Omit<CustomExportFormat, 'id' | 'createdAt'>) => {
    const newFormat: CustomExportFormat = {
      ...format,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    
    const updatedFormats = [...customFormats, newFormat];
    setCustomFormats(updatedFormats);
    saveToStorage(updatedFormats);
    return newFormat;
  }, [customFormats, saveToStorage]);

  const updateCustomFormat = useCallback((id: string, updates: Partial<Omit<CustomExportFormat, 'id' | 'createdAt'>>) => {
    const updatedFormats = customFormats.map(format =>
      format.id === id ? { ...format, ...updates } : format
    );
    setCustomFormats(updatedFormats);
    saveToStorage(updatedFormats);
  }, [customFormats, saveToStorage]);

  const deleteCustomFormat = useCallback((id: string) => {
    const updatedFormats = customFormats.filter(format => format.id !== id);
    setCustomFormats(updatedFormats);
    saveToStorage(updatedFormats);
  }, [customFormats, saveToStorage]);

  const getCustomFormat = useCallback((id: string) => {
    return customFormats.find(format => format.id === id);
  }, [customFormats]);

  return {
    customFormats,
    addCustomFormat,
    updateCustomFormat,
    deleteCustomFormat,
    getCustomFormat
  };
};