
import { useToast } from '@/hooks/use-toast';
import { TimeInOutState } from './useTimeInOutState';

export const useTimeInOutActions = (
  state: TimeInOutState,
  updateState: <K extends keyof TimeInOutState>(key: K, value: TimeInOutState[K]) => void
) => {
  const { toast } = useToast();

  const updateEntryNotes = (entryId: number, notes: string) => {
    const updatedEntries = state.entries.map(entry => 
      entry.id === entryId ? { ...entry, notes } : entry
    );
    updateState('entries', updatedEntries);
  };

  const setQuickTime = (startHour: string, startPeriod: 'AM' | 'PM', endHour: string, endPeriod: 'AM' | 'PM') => {
    updateState('timeInHour', startHour);
    updateState('timeInMinute', '00');
    updateState('timeInPeriod', startPeriod);
    updateState('timeOutHour', endHour);
    updateState('timeOutMinute', '30');
    updateState('timeOutPeriod', endPeriod);
    updateState('breakInHour', '12');
    updateState('breakInMinute', '00');
    updateState('breakInPeriod', 'PM');
    updateState('breakOutHour', '12');
    updateState('breakOutMinute', '30');
    updateState('breakOutPeriod', 'PM');
  };

  const addRow = () => {
    const newEntry = { id: state.entries.length + 1, notes: '' };
    updateState('entries', [...state.entries, newEntry]);
  };

  const deleteRow = (id: number) => {
    if (state.entries.length > 1) {
      const filteredEntries = state.entries.filter(entry => entry.id !== id);
      updateState('entries', filteredEntries);
    }
  };

  const copyPreviousDay = () => {
    updateState('selectedProject', '1');
    updateState('selectedExtra', '1');
    updateState('selectedCostCode', '1');
    updateState('timeInHour', '8');
    updateState('timeInMinute', '00');
    updateState('timeInPeriod', 'AM');
    updateState('timeOutHour', '5');
    updateState('timeOutMinute', '00');
    updateState('timeOutPeriod', 'PM');
    updateState('breakInHour', '12');
    updateState('breakInMinute', '00');
    updateState('breakInPeriod', 'PM');
    updateState('breakOutHour', '12');
    updateState('breakOutMinute', '30');
    updateState('breakOutPeriod', 'PM');
    
    updateEntryNotes(state.entries[0].id, 'Continued work from previous day');
    
    toast({
      title: "Previous Day Copied",
      description: "Time entry data from previous day has been copied to the current form."
    });
  };

  const copyPreviousWeek = () => {
    updateState('selectedProject', '2');
    updateState('selectedExtra', '3');
    updateState('selectedCostCode', '2');
    updateState('timeInHour', '7');
    updateState('timeInMinute', '30');
    updateState('timeInPeriod', 'AM');
    updateState('timeOutHour', '4');
    updateState('timeOutMinute', '30');
    updateState('timeOutPeriod', 'PM');
    updateState('breakInHour', '12');
    updateState('breakInMinute', '00');
    updateState('breakInPeriod', 'PM');
    updateState('breakOutHour', '1');
    updateState('breakOutMinute', '00');
    updateState('breakOutPeriod', 'PM');
    
    updateEntryNotes(state.entries[0].id, 'Weekly routine work pattern');
    
    toast({
      title: "Previous Week Copied",
      description: "Time entry data from previous week has been copied to the current form."
    });
  };

  return {
    updateEntryNotes,
    setQuickTime,
    addRow,
    deleteRow,
    copyPreviousDay,
    copyPreviousWeek
  };
};
