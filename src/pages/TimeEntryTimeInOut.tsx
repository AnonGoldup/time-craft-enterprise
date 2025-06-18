
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { MoreVertical, Plus, Trash2, Clock, Calendar, Building2, Timer, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MultiDatePicker from '@/components/TimeEntry/MultiDatePicker';

interface BreakTime {
  id: string;
  breakInHour: string;
  breakInMinute: string;
  breakInPeriod: string;
  breakOutHour: string;
  breakOutMinute: string;
  breakOutPeriod: string;
}

const TimeEntryTimeInOut = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedExtra, setSelectedExtra] = useState('');
  const [selectedCostCode, setSelectedCostCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
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
  const [additionalBreaks, setAdditionalBreaks] = useState<BreakTime[]>([]);
  const [notes, setNotes] = useState('');
  const [entries, setEntries] = useState([{ id: 1 }]);

  const setQuickTime = (startHour: string, startPeriod: string, endHour: string, endPeriod: string) => {
    setTimeInHour(startHour);
    setTimeInMinute('00');
    setTimeInPeriod(startPeriod);
    setTimeOutHour(endHour);
    setTimeOutMinute('00');
    setTimeOutPeriod(endPeriod);
    setBreakInHour('12');
    setBreakInMinute('00');
    setBreakInPeriod('PM');
    setBreakOutHour('12');
    setBreakOutMinute('30');
    setBreakOutPeriod('PM');
  };

  const addRow = () => {
    setEntries([...entries, { id: entries.length + 1 }]);
  };

  const deleteRow = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const addBreak = () => {
    const newBreak: BreakTime = {
      id: Date.now().toString(),
      breakInHour: '',
      breakInMinute: '00',
      breakInPeriod: 'AM',
      breakOutHour: '',
      breakOutMinute: '00',
      breakOutPeriod: 'AM'
    };
    setAdditionalBreaks([...additionalBreaks, newBreak]);
  };

  const removeBreak = (breakId: string) => {
    setAdditionalBreaks(additionalBreaks.filter(breakTime => breakTime.id !== breakId));
  };

  const updateBreak = (breakId: string, field: keyof Omit<BreakTime, 'id'>, value: string) => {
    setAdditionalBreaks(additionalBreaks.map(breakTime => 
      breakTime.id === breakId ? { ...breakTime, [field]: value } : breakTime
    ));
  };

  const copyPreviousDay = () => {
    console.log('Copy previous day');
  };

  const copyPreviousWeek = () => {
    console.log('Copy previous week');
  };

  const hours = Array.from({length: 12}, (_, i) => i + 1);
  const minutes = ['00', '15', '30', '45'];

  const renderBreakSelector = (
    breakData: {
      breakInHour: string;
      breakInMinute: string;
      breakInPeriod: string;
      breakOutHour: string;
      breakOutMinute: string;
      breakOutPeriod: string;
    },
    onUpdate: (field: string, value: string) => void,
    showDelete: boolean = false,
    onDelete?: () => void
  ) => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600 dark:text-slate-400">Break:</span>
      <div className="flex items-center gap-1">
        <Select value={breakData.breakInHour} onValueChange={(value) => onUpdate('breakInHour', value)}>
          <SelectTrigger className="w-16 h-9 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="--" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            {hours.map(hour => (
              <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>:</span>
        <Select value={breakData.breakInMinute} onValueChange={(value) => onUpdate('breakInMinute', value)}>
          <SelectTrigger className="w-16 h-9 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="--" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            {minutes.map(minute => (
              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={breakData.breakInPeriod} onValueChange={(value) => onUpdate('breakInPeriod', value)}>
          <SelectTrigger className="w-16 h-9 border-slate-300 dark:border-slate-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <span className="text-slate-400">-</span>
      <div className="flex items-center gap-1">
        <Select value={breakData.breakOutHour} onValueChange={(value) => onUpdate('breakOutHour', value)}>
          <SelectTrigger className="w-16 h-9 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="--" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            {hours.map(hour => (
              <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>:</span>
        <Select value={breakData.breakOutMinute} onValueChange={(value) => onUpdate('breakOutMinute', value)}>
          <SelectTrigger className="w-16 h-9 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="--" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            {minutes.map(minute => (
              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={breakData.breakOutPeriod} onValueChange={(value) => onUpdate('breakOutPeriod', value)}>
          <SelectTrigger className="w-16 h-9 border-slate-300 dark:border-slate-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {showDelete && onDelete && (
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

  return (
    <div className="unity-fade-in max-w-6xl mx-auto space-y-6">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Time In/Out</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Log your start and end times</p>
        </div>
        
        <div className="flex items-center gap-2">
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-3">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuItem onClick={copyPreviousDay} className="gap-2">
                <Calendar className="h-4 w-4" />
                Copy previous day
              </ContextMenuItem>
              <ContextMenuItem onClick={copyPreviousWeek} className="gap-2">
                <Calendar className="h-4 w-4" />
                Copy previous week
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          
          <Button onClick={addRow} size="sm" className="h-9 px-3 gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* Compact Tabs */}
      <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
        <Tabs defaultValue="time-in-out" className="w-full">
          <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <TabsList className="h-12 w-full bg-transparent p-0 rounded-none">
              <TabsTrigger 
                value="enter-hours" 
                asChild 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 font-medium gap-2"
              >
                <Link to="/time-entry/standard" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Enter Hours
                </Link>
              </TabsTrigger>
              <TabsTrigger 
                value="time-in-out" 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 font-medium gap-2"
              >
                <Timer className="h-4 w-4" />
                Time In/Out
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="time-in-out" className="mt-0 p-6 space-y-6">
            {entries.map((entry, index) => (
              <div key={entry.id} className="space-y-4">
                {/* Entry Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Entry {index + 1}
                    </h3>
                  </div>
                  
                  {entries.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteRow(entry.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Streamlined Project Info Grid */}
                <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <Building2 className="h-3 w-3 text-blue-500" />
                        Project
                      </div>
                      <select 
                        className="w-full h-9 px-3 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm"
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                      >
                        <option value="">Select project...</option>
                        <option value="proj1">Project 1</option>
                        <option value="proj2">Project 2</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <div className="w-3 h-3 border border-green-500 rounded-sm flex items-center justify-center">
                          <span className="text-green-500 text-xs font-bold leading-none">E</span>
                        </div>
                        Extra
                      </div>
                      <select 
                        className="w-full h-9 px-3 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm"
                        value={selectedExtra}
                        onChange={(e) => setSelectedExtra(e.target.value)}
                      >
                        <option value="">Select extra...</option>
                        <option value="extra1">Extra 1</option>
                        <option value="extra2">Extra 2</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <div className="w-3 h-3 border border-purple-500 rounded-sm flex items-center justify-center">
                          <span className="text-purple-500 text-xs font-bold leading-none">C</span>
                        </div>
                        Cost Code
                      </div>
                      <select 
                        className="w-full h-9 px-3 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm"
                        value={selectedCostCode}
                        onChange={(e) => setSelectedCostCode(e.target.value)}
                      >
                        <option value="">Select code...</option>
                        <option value="code1">Code 1</option>
                        <option value="code2">Code 2</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <Calendar className="h-3 w-3 text-red-500" />
                        Date
                      </div>
                      <MultiDatePicker
                        selectedDates={selectedDates}
                        onDatesChange={setSelectedDates}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <User className="h-3 w-3 text-cyan-500" />
                        Employee
                      </div>
                      <select 
                        className="w-full h-9 px-3 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm"
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                      >
                        <option value="">Select employees...</option>
                        <option value="emp1">Employee 1</option>
                        <option value="emp2">Employee 2</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Streamlined Time Entry */}
                <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Start Time */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[40px]">Start:</span>
                      <div className="flex items-center gap-1">
                        <Select value={timeInHour} onValueChange={setTimeInHour}>
                          <SelectTrigger className="w-16 h-9 border-slate-300 dark:border-slate-600">
                            <SelectValue placeholder="--" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            {hours.map(hour => (
                              <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>:</span>
                        <Select value={timeInMinute} onValueChange={setTimeInMinute}>
                          <SelectTrigger className="w-16 h-9 border-slate-300 dark:border-slate-600">
                            <SelectValue placeholder="--" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            {minutes.map(minute => (
                              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={timeInPeriod} onValueChange={setTimeInPeriod}>
                          <SelectTrigger className="w-16 h-9 border-slate-300 dark:border-slate-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <span className="text-slate-400">-</span>

                    {/* End Time */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[40px]">End:</span>
                      <div className="flex items-center gap-1">
                        <Select value={timeOutHour} onValueChange={setTimeOutHour}>
                          <SelectTrigger className="w-16 h-9 border-slate-300 dark:border-slate-600">
                            <SelectValue placeholder="--" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            {hours.map(hour => (
                              <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>:</span>
                        <Select value={timeOutMinute} onValueChange={setTimeOutMinute}>
                          <SelectTrigger className="w-16 h-9 border-slate-300 dark:border-slate-600">
                            <SelectValue placeholder="--" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            {minutes.map(minute => (
                              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={timeOutPeriod} onValueChange={setTimeOutPeriod}>
                          <SelectTrigger className="w-16 h-9 border-slate-300 dark:border-slate-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Quick Fill Buttons */}
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-xs text-slate-500">Quick:</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuickTime('6', 'AM', '2', 'PM')}
                        className="h-7 px-2 text-xs border-slate-300 dark:border-slate-600 hover:bg-blue-50 hover:border-blue-300"
                      >
                        6-2
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuickTime('7', 'AM', '3', 'PM')}
                        className="h-7 px-2 text-xs border-slate-300 dark:border-slate-600 hover:bg-blue-50 hover:border-blue-300"
                      >
                        7-3
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuickTime('8', 'AM', '4', 'PM')}
                        className="h-7 px-2 text-xs border-slate-300 dark:border-slate-600 hover:bg-blue-50 hover:border-blue-300"
                      >
                        8-4
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuickTime('9', 'AM', '5', 'PM')}
                        className="h-7 px-2 text-xs border-slate-300 dark:border-slate-600 hover:bg-blue-50 hover:border-blue-300"
                      >
                        9-5
                      </Button>
                    </div>
                  </div>

                  {/* Primary Break with Add Button */}
                  <div className="flex items-center gap-2">
                    {renderBreakSelector(
                      {
                        breakInHour,
                        breakInMinute,
                        breakInPeriod,
                        breakOutHour,
                        breakOutMinute,
                        breakOutPeriod
                      },
                      (field, value) => {
                        switch (field) {
                          case 'breakInHour': setBreakInHour(value); break;
                          case 'breakInMinute': setBreakInMinute(value); break;
                          case 'breakInPeriod': setBreakInPeriod(value); break;
                          case 'breakOutHour': setBreakOutHour(value); break;
                          case 'breakOutMinute': setBreakOutMinute(value); break;
                          case 'breakOutPeriod': setBreakOutPeriod(value); break;
                        }
                      }
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addBreak}
                      className="h-8 w-8 p-0 border-slate-300 dark:border-slate-600"
                      title="Add another break"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Additional Breaks */}
                  {additionalBreaks.map((breakTime) => (
                    <div key={breakTime.id} className="ml-4">
                      {renderBreakSelector(
                        breakTime,
                        (field, value) => updateBreak(breakTime.id, field as keyof Omit<BreakTime, 'id'>, value),
                        true,
                        () => removeBreak(breakTime.id)
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Compact Footer */}
            <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4 flex-wrap">
                <Input
                  placeholder="Notes: Add any details about the work performed..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="flex-1 h-9 border-slate-300 dark:border-slate-600 text-sm"
                />
                
                <div className="flex items-center gap-2 ml-auto">
                  <Button variant="outline" size="sm" className="h-9 px-4 border-slate-300 dark:border-slate-600">
                    Save Draft
                  </Button>
                  <Button size="sm" className="h-9 px-6 bg-emerald-600 hover:bg-emerald-700">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TimeEntryTimeInOut;
