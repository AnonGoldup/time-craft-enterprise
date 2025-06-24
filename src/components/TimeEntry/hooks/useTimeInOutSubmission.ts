
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTimesheetData } from '@/hooks/useTimesheetData';
import { format } from 'date-fns';
import { calculateWorkHours, formatTime } from '@/utils/timeCalculations';
import { TimeInOutState } from './useTimeInOutState';

export const useTimeInOutSubmission = (
  state: TimeInOutState,
  resetForm: () => void
) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { createEntry } = useTimesheetData(user?.employeeId || '');

  const handleSubmit = async () => {
    if (!state.selectedProject || !state.selectedCostCode || !user) {
      toast({
        title: "Missing Information",
        description: "Please select project, cost code, and enter times.",
        variant: "destructive"
      });
      return;
    }

    const datesToSubmit = state.selectedDates.length > 0 
      ? state.selectedDates.map(date => format(date, 'yyyy-MM-dd'))
      : state.selectedDate ? [state.selectedDate] : [format(new Date(), 'yyyy-MM-dd')];

    const employeesToSubmit = state.selectedEmployees.length > 0 ? state.selectedEmployees : [user.employeeId];

    const timeCalculation = calculateWorkHours(
      { hour: state.timeInHour, minute: state.timeInMinute, period: state.timeInPeriod },
      { hour: state.timeOutHour, minute: state.timeOutMinute, period: state.timeOutPeriod },
      state.breakInHour ? { hour: state.breakInHour, minute: state.breakInMinute, period: state.breakInPeriod } : undefined,
      state.breakOutHour ? { hour: state.breakOutHour, minute: state.breakOutMinute, period: state.breakOutPeriod } : undefined
    );

    if (!timeCalculation.isValid) {
      toast({
        title: "Invalid Times",
        description: timeCalculation.error || "Please enter valid start and end times.",
        variant: "destructive"
      });
      return;
    }

    try {
      for (const employeeId of employeesToSubmit) {
        for (const dateWorked of datesToSubmit) {
          for (const entry of state.entries) {
            await createEntry({
              employeeID: employeeId,
              dateWorked: dateWorked,
              projectID: parseInt(state.selectedProject),
              extraID: state.selectedExtra ? parseInt(state.selectedExtra) : 0,
              costCodeID: parseInt(state.selectedCostCode),
              payID: 1,
              hours: timeCalculation.totalHours,
              unionID: 1,
              entryType: 'TimeInOut',
              notes: entry.notes,
              status: 'Draft',
              createdBy: user.employeeId,
              createdDate: new Date().toISOString(),
              modifiedBy: '',
              modifiedDate: '',
              exportedDate: '',
              startTime: formatTime(state.timeInHour, state.timeInMinute),
              endTime: formatTime(state.timeOutHour, state.timeOutMinute),
              breakInTime: state.breakInHour ? formatTime(state.breakInHour, state.breakInMinute) : '',
              breakOutTime: state.breakOutHour ? formatTime(state.breakOutHour, state.breakOutMinute) : '',
              timeIn: formatTime(state.timeInHour, state.timeInMinute),
              timeOut: formatTime(state.timeOutHour, state.timeOutMinute),
              breakIn: state.breakInHour ? formatTime(state.breakInHour, state.breakInMinute) : '',
              breakOut: state.breakOutHour ? formatTime(state.breakOutHour, state.breakOutMinute) : ''
            });
          }
        }
      }

      resetForm();
      
      toast({
        title: "Success",
        description: `Time entries created for ${employeesToSubmit.length} employee(s) across ${datesToSubmit.length} date(s).`
      });
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: "Error",
        description: "Failed to submit time entries. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { handleSubmit };
};
