
import { useState } from 'react';

export interface TimeInOutState {
  selectedProject: string;
  selectedExtra: string;
  selectedCostCode: string;
  selectedDate: string;
  selectedDates: Date[];
  selectedEmployee: string;
  selectedEmployees: string[];
  timeInHour: string;
  timeInMinute: string;
  timeInPeriod: 'AM' | 'PM';
  timeOutHour: string;
  timeOutMinute: string;
  timeOutPeriod: 'AM' | 'PM';
  breakInHour: string;
  breakInMinute: string;
  breakInPeriod: 'AM' | 'PM';
  breakOutHour: string;
  breakOutMinute: string;
  breakOutPeriod: 'AM' | 'PM';
  entries: Array<{ id: number; notes: string }>;
}

export const useTimeInOutState = () => {
  const [state, setState] = useState<TimeInOutState>({
    selectedProject: '',
    selectedExtra: '',
    selectedCostCode: '',
    selectedDate: '',
    selectedDates: [],
    selectedEmployee: '',
    selectedEmployees: [],
    timeInHour: '',
    timeInMinute: '',
    timeInPeriod: 'AM',
    timeOutHour: '',
    timeOutMinute: '',
    timeOutPeriod: 'AM',
    breakInHour: '',
    breakInMinute: '',
    breakInPeriod: 'AM',
    breakOutHour: '',
    breakOutMinute: '',
    breakOutPeriod: 'AM',
    entries: [{ id: 1, notes: '' }]
  });

  const updateState = <K extends keyof TimeInOutState>(key: K, value: TimeInOutState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return { state, updateState };
};
