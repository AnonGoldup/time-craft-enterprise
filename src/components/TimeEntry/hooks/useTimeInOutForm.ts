
import { useTimeInOutState } from './useTimeInOutState';
import { useTimeInOutActions } from './useTimeInOutActions';
import { useTimeInOutSubmission } from './useTimeInOutSubmission';

export const useTimeInOutForm = () => {
  const { state, updateState } = useTimeInOutState();
  const actions = useTimeInOutActions(state, updateState);

  const resetForm = () => {
    updateState('timeInHour', '');
    updateState('timeInMinute', '');
    updateState('timeOutHour', '');
    updateState('timeOutMinute', '');
    updateState('breakInHour', '');
    updateState('breakInMinute', '');
    updateState('breakOutHour', '');
    updateState('breakOutMinute', '');
    updateState('selectedDates', []);
    updateState('entries', [{ id: 1, notes: '' }]);
  };

  const { handleSubmit } = useTimeInOutSubmission(state, resetForm);

  return {
    // State getters
    ...state,
    // State setters
    setSelectedProject: (value: string) => updateState('selectedProject', value),
    setSelectedExtra: (value: string) => updateState('selectedExtra', value),
    setSelectedCostCode: (value: string) => updateState('selectedCostCode', value),
    setSelectedDate: (value: string) => updateState('selectedDate', value),
    setSelectedDates: (value: Date[]) => updateState('selectedDates', value),
    setSelectedEmployee: (value: string) => updateState('selectedEmployee', value),
    setSelectedEmployees: (value: string[]) => updateState('selectedEmployees', value),
    setTimeInHour: (value: string) => updateState('timeInHour', value),
    setTimeInMinute: (value: string) => updateState('timeInMinute', value),
    setTimeInPeriod: (value: 'AM' | 'PM') => updateState('timeInPeriod', value),
    setTimeOutHour: (value: string) => updateState('timeOutHour', value),
    setTimeOutMinute: (value: string) => updateState('timeOutMinute', value),
    setTimeOutPeriod: (value: 'AM' | 'PM') => updateState('timeOutPeriod', value),
    setBreakInHour: (value: string) => updateState('breakInHour', value),
    setBreakInMinute: (value: string) => updateState('breakInMinute', value),
    setBreakInPeriod: (value: 'AM' | 'PM') => updateState('breakInPeriod', value),
    setBreakOutHour: (value: string) => updateState('breakOutHour', value),
    setBreakOutMinute: (value: string) => updateState('breakOutMinute', value),
    setBreakOutPeriod: (value: 'AM' | 'PM') => updateState('breakOutPeriod', value),
    // Actions
    ...actions,
    handleSubmit
  };
};
