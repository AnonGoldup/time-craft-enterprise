
import React, { createContext, useContext, useReducer } from 'react';
import { TimesheetEntry } from '../services/api';

interface TimesheetState {
  entries: TimesheetEntry[];
  currentWeek: Date;
  isLoading: boolean;
  error: string | null;
}

type TimesheetAction = 
  | { type: 'SET_ENTRIES'; payload: TimesheetEntry[] }
  | { type: 'UPDATE_ENTRY'; payload: { index: number; entry: TimesheetEntry } }
  | { type: 'ADD_ENTRY'; payload: TimesheetEntry }
  | { type: 'DELETE_ENTRY'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const TimesheetContext = createContext<{
  state: TimesheetState;
  dispatch: React.Dispatch<TimesheetAction>;
} | null>(null);

export const useTimesheet = () => {
  const context = useContext(TimesheetContext);
  if (!context) {
    throw new Error('useTimesheet must be used within TimesheetProvider');
  }
  return context;
};
