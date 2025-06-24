
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTimesheetData } from '@/hooks/useTimesheetData';
import { format } from 'date-fns';

export const useTimeInOutForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { createEntry } = useTimesheetData(user?.employeeId || '');

  // Project and selection state
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedExtra, setSelectedExtra] = useState('');
  const [selectedCostCode, setSelectedCostCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Time state
  const [timeInHour, setTimeInHour] = useState('');
  const [timeInMinute, setTimeInMinute] = useState('');
  const [timeInPeriod, setTimeInPeriod] = useState('AM');
  const [timeOutHour, setTimeOutHour] = useState('');
  const [timeOutMinute, setTimeOutMinute] = useState('');
  const [timeOutPeriod, setTimeOutPeriod] = useState('AM');
  const [breakInHour, setBreakInHour] = useState('');
  const [breakInMinute, setBreakInMinute] = useState('');
  const [breakInPeriod, setBreakInPeriod] = useState('AM');
  const [breakOutHour, setBreakOutHour] = useState('');
  const [breakOutMinute, setBreakOutMinute] = useState('');
  const [breakOutPeriod, setBreakOutPeriod] = useState('AM');

  // Entries state
  const [entries, setEntries] = useState([{ id: 1, notes: '' }]);

  const updateEntryNotes = (entryId: number, notes: string) => {
    setEntries(entries.map(entry => entry.id === entryId ? { ...entry, notes } : entry));
  };

  const setQuickTime = (startHour: string, startPeriod: string, endHour: string, endPeriod: string) => {
    setTimeInHour(startHour);
    setTimeInMinute('00');
    setTimeInPeriod(startPeriod);
    setTimeOutHour(endHour);
    setTimeOutMinute('30');
    setTimeOutPeriod(endPeriod);
    setBreakInHour('12');
    setBreakInMinute('00');
    setBreakInPeriod('PM');
    setBreakOutHour('12');
    setBreakOutMinute('30');
    setBreakOutPeriod('PM');
  };

  const addRow = () => {
    setEntries([...entries, { id: entries.length + 1, notes: '' }]);
  };

  const deleteRow = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const copyPreviousDay = () => {
    const previousDayData = {
      project: '1',
      extra: '1',
      costCode: '1',
      timeInHour: '8',
      timeInMinute: '00',
      timeInPeriod: 'AM',
      timeOutHour: '5',
      timeOutMinute: '00',
      timeOutPeriod: 'PM',
      breakInHour: '12',
      breakInMinute: '00',
      breakInPeriod: 'PM',
      breakOutHour: '12',
      breakOutMinute: '30',
      breakOutPeriod: 'PM',
      notes: 'Continued work from previous day'
    };
    
    setSelectedProject(previousDayData.project);
    setSelectedExtra(previousDayData.extra);
    setSelectedCostCode(previousDayData.costCode);
    setTimeInHour(previousDayData.timeInHour);
    setTimeInMinute(previousDayData.timeInMinute);
    setTimeInPeriod(previousDayData.timeInPeriod);
    setTimeOutHour(previousDayData.timeOutHour);
    setTimeOutMinute(previousDayData.timeOutMinute);
    setTimeOutPeriod(previousDayData.timeOutPeriod);
    setBreakInHour(previousDayData.breakInHour);
    setBreakInMinute(previousDayData.breakInMinute);
    setBreakInPeriod(previousDayData.breakInPeriod);
    setBreakOutHour(previousDayData.breakOutHour);
    setBreakOutMinute(previousDayData.breakOutMinute);
    setBreakOutPeriod(previousDayData.breakOutPeriod);
    updateEntryNotes(entries[0].id, previousDayData.notes);
    
    toast({
      title: "Previous Day Copied",
      description: "Time entry data from previous day has been copied to the current form."
    });
  };

  const copyPreviousWeek = () => {
    const previousWeekData = {
      project: '2',
      extra: '3',
      costCode: '2',
      timeInHour: '7',
      timeInMinute: '30',
      timeInPeriod: 'AM',
      timeOutHour: '4',
      timeOutMinute: '30',
      timeOutPeriod: 'PM',
      breakInHour: '12',
      breakInMinute: '00',
      breakInPeriod: 'PM',
      breakOutHour: '1',
      breakOutMinute: '00',
      breakOutPeriod: 'PM',
      notes: 'Weekly routine work pattern'
    };
    
    setSelectedProject(previousWeekData.project);
    setSelectedExtra(previousWeekData.extra);
    setSelectedCostCode(previousWeekData.costCode);
    setTimeInHour(previousWeekData.timeInHour);
    setTimeInMinute(previousWeekData.timeInMinute);
    setTimeInPeriod(previousWeekData.timeInPeriod);
    setTimeOutHour(previousWeekData.timeOutHour);
    setTimeOutMinute(previousWeekData.timeOutMinute);
    setTimeOutPeriod(previousWeekData.timeOutPeriod);
    setBreakInHour(previousWeekData.breakInHour);
    setBreakInMinute(previousWeekData.breakInMinute);
    setBreakInPeriod(previousWeekData.breakInPeriod);
    setBreakOutHour(previousWeekData.breakOutHour);
    setBreakOutMinute(previousWeekData.breakOutMinute);
    setBreakOutPeriod(previousWeekData.breakOutPeriod);
    updateEntryNotes(entries[0].id, previousWeekData.notes);
    
    toast({
      title: "Previous Week Copied",
      description: "Time entry data from previous week has been copied to the current form."
    });
  };

  const calculateHours = () => {
    if (!timeInHour || !timeOutHour) return 0;
    
    const timeInHour12 = parseInt(timeInHour);
    const timeOutHour12 = parseInt(timeOutHour);
    const timeInMinutes = parseInt(timeInMinute) || 0;
    const timeOutMinutes = parseInt(timeOutMinute) || 0;
    
    // Convert to 24-hour format
    let timeIn24 = timeInHour12;
    let timeOut24 = timeOutHour12;
    
    if (timeInPeriod === 'PM' && timeInHour12 !== 12) timeIn24 += 12;
    if (timeInPeriod === 'AM' && timeInHour12 === 12) timeIn24 = 0;
    if (timeOutPeriod === 'PM' && timeOutHour12 !== 12) timeOut24 += 12;
    if (timeOutPeriod === 'AM' && timeOutHour12 === 12) timeOut24 = 0;
    
    const startTime = timeIn24 * 60 + timeInMinutes;
    const endTime = timeOut24 * 60 + timeOutMinutes;
    
    let totalMinutes = endTime - startTime;
    if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle next day
    
    // Subtract break time if provided
    if (breakInHour && breakOutHour) {
      const breakInHour12 = parseInt(breakInHour);
      const breakOutHour12 = parseInt(breakOutHour);
      const breakInMinutes = parseInt(breakInMinute) || 0;
      const breakOutMinutes = parseInt(breakOutMinute) || 0;
      
      let breakIn24 = breakInHour12;
      let breakOut24 = breakOutHour12;
      
      if (breakInPeriod === 'PM' && breakInHour12 !== 12) breakIn24 += 12;
      if (breakInPeriod === 'AM' && breakInHour12 === 12) breakIn24 = 0;
      if (breakOutPeriod === 'PM' && breakOutHour12 !== 12) breakOut24 += 12;
      if (breakOutPeriod === 'AM' && breakOutHour12 === 12) breakOut24 = 0;
      
      const breakStart = breakIn24 * 60 + breakInMinutes;
      const breakEnd = breakOut24 * 60 + breakOutMinutes;
      const breakDuration = breakEnd - breakStart;
      
      if (breakDuration > 0) {
        totalMinutes -= breakDuration;
      }
    }
    
    return Math.max(0, totalMinutes / 60);
  };

  const handleSubmit = async () => {
    if (!selectedProject || !selectedCostCode || !user) {
      toast({
        title: "Missing Information",
        description: "Please select project, cost code, and enter times.",
        variant: "destructive"
      });
      return;
    }

    const datesToSubmit = selectedDates.length > 0 
      ? selectedDates.map(date => format(date, 'yyyy-MM-dd'))
      : selectedDate ? [selectedDate] : [format(new Date(), 'yyyy-MM-dd')];

    const employeesToSubmit = selectedEmployees.length > 0 ? selectedEmployees : [user.employeeId];
    const calculatedHours = calculateHours();

    if (calculatedHours === 0) {
      toast({
        title: "Invalid Times",
        description: "Please enter valid start and end times.",
        variant: "destructive"
      });
      return;
    }

    try {
      for (const employeeId of employeesToSubmit) {
        for (const dateWorked of datesToSubmit) {
          for (const entry of entries) {
            await createEntry({
              employeeID: employeeId,
              dateWorked: dateWorked,
              projectID: parseInt(selectedProject),
              extraID: selectedExtra ? parseInt(selectedExtra) : 0,
              costCodeID: parseInt(selectedCostCode),
              payID: 1,
              hours: calculatedHours,
              unionID: 1,
              entryType: 'TimeInOut',
              notes: entry.notes,
              status: 'Draft',
              createdBy: user.employeeId,
              createdDate: new Date().toISOString(),
              modifiedBy: '',
              modifiedDate: '',
              exportedDate: '',
              startTime: `${timeInHour.padStart(2, '0')}:${timeInMinute.padStart(2, '0')}:00`,
              endTime: `${timeOutHour.padStart(2, '0')}:${timeOutMinute.padStart(2, '0')}:00`,
              breakInTime: breakInHour ? `${breakInHour.padStart(2, '0')}:${breakInMinute.padStart(2, '0')}:00` : '',
              breakOutTime: breakOutHour ? `${breakOutHour.padStart(2, '0')}:${breakOutMinute.padStart(2, '0')}:00` : '',
              timeIn: `${timeInHour.padStart(2, '0')}:${timeInMinute.padStart(2, '0')}:00`,
              timeOut: `${timeOutHour.padStart(2, '0')}:${timeOutMinute.padStart(2, '0')}:00`,
              breakIn: breakInHour ? `${breakInHour.padStart(2, '0')}:${breakInMinute.padStart(2, '0')}:00` : '',
              breakOut: breakOutHour ? `${breakOutHour.padStart(2, '0')}:${breakOutMinute.padStart(2, '0')}:00` : ''
            });
          }
        }
      }

      // Reset form
      setTimeInHour('');
      setTimeInMinute('');
      setTimeOutHour('');
      setTimeOutMinute('');
      setBreakInHour('');
      setBreakInMinute('');
      setBreakOutHour('');
      setBreakOutMinute('');
      setSelectedDates([]);
      setEntries([{ id: 1, notes: '' }]);
      
      toast({
        title: "Success",
        description: `Time entries created for ${employeesToSubmit.length} employee(s) across ${datesToSubmit.length} date(s).`
      });
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return {
    // State
    selectedProject, setSelectedProject,
    selectedExtra, setSelectedExtra,
    selectedCostCode, setSelectedCostCode,
    selectedDate, setSelectedDate,
    selectedDates, setSelectedDates,
    selectedEmployee, setSelectedEmployee,
    selectedEmployees, setSelectedEmployees,
    timeInHour, setTimeInHour,
    timeInMinute, setTimeInMinute,
    timeInPeriod, setTimeInPeriod,
    timeOutHour, setTimeOutHour,
    timeOutMinute, setTimeOutMinute,
    timeOutPeriod, setTimeOutPeriod,
    breakInHour, setBreakInHour,
    breakInMinute, setBreakInMinute,
    breakInPeriod, setBreakInPeriod,
    breakOutHour, setBreakOutHour,
    breakOutMinute, setBreakOutMinute,
    breakOutPeriod, setBreakOutPeriod,
    entries,
    // Actions
    updateEntryNotes,
    setQuickTime,
    addRow,
    deleteRow,
    copyPreviousDay,
    copyPreviousWeek,
    handleSubmit
  };
};
