import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Building2, ChevronLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const TimeEntryTimeInOut = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCostCode, setSelectedCostCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
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
  const [notes, setNotes] = useState('');

  const setQuickTime = (startHour: string, startPeriod: string, endHour: string, endPeriod: string) => {
    setTimeInHour(startHour);
    setTimeInMinute('00');
    setTimeInPeriod(startPeriod);
    setTimeOutHour(endHour);
    setTimeOutMinute('00');
    setTimeOutPeriod(endPeriod);
    // Set default lunch break
    setBreakInHour('12');
    setBreakInMinute('00');
    setBreakInPeriod('PM');
    setBreakOutHour('1');
    setBreakOutMinute('00');
    setBreakOutPeriod('PM');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/time-entry" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Time Entry</span>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Time Entry
          </h1>
        </div>
      </div>

      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <Tabs defaultValue="time-in-out" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-800">
              <TabsTrigger value="enter-hours" asChild>
                <Link to="/time-entry/standard" className="text-slate-600 dark:text-slate-400">Enter Hours</Link>
              </TabsTrigger>
              <TabsTrigger value="time-in-out" className="text-blue-600 dark:text-blue-400">Time In/Out</TabsTrigger>
            </TabsList>
            
            <TabsContent value="time-in-out" className="space-y-6 mt-6">
              {/* First Row - Project Details */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[60px]">Project:</span>
                  <Input
                    placeholder="Select project..."
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-48 border-slate-300 dark:border-slate-600"
                  />
                </div>

                <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-blue-500 rounded flex items-center justify-center">
                    <span className="text-blue-500 text-xs font-bold">C</span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[80px]">Cost Code:</span>
                  <Input
                    placeholder="Select code..."
                    value={selectedCostCode}
                    onChange={(e) => setSelectedCostCode(e.target.value)}
                    className="w-48 border-slate-300 dark:border-slate-600"
                  />
                </div>

                <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[40px]">Date:</span>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-36 border-slate-300 dark:border-slate-600"
                  />
                </div>

                <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[70px]">Employee:</span>
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
                      <SelectValue placeholder="Select employee..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      <SelectItem value="john-doe">John Doe</SelectItem>
                      <SelectItem value="jane-smith">Jane Smith</SelectItem>
                      <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Second Row - Time Details */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[40px]">Start:</span>
                  <div className="flex items-center gap-1">
                    <Select value={timeInHour} onValueChange={setTimeInHour}>
                      <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="--" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        {Array.from({length: 12}, (_, i) => i + 1).map(hour => (
                          <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>:</span>
                    <Select value={timeInMinute} onValueChange={setTimeInMinute}>
                      <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="--" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectItem value="00">00</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="45">45</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={timeInPeriod} onValueChange={setTimeInPeriod}>
                      <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
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

                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[30px]">End:</span>
                  <div className="flex items-center gap-1">
                    <Select value={timeOutHour} onValueChange={setTimeOutHour}>
                      <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="--" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        {Array.from({length: 12}, (_, i) => i + 1).map(hour => (
                          <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>:</span>
                    <Select value={timeOutMinute} onValueChange={setTimeOutMinute}>
                      <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="--" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectItem value="00">00</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="45">45</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={timeOutPeriod} onValueChange={setTimeOutPeriod}>
                      <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[45px]">Break:</span>
                  <div className="flex items-center gap-1">
                    <Select value={breakInHour} onValueChange={setBreakInHour}>
                      <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="--" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        {Array.from({length: 12}, (_, i) => i + 1).map(hour => (
                          <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>:</span>
                    <Select value={breakInMinute} onValueChange={setBreakInMinute}>
                      <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="--" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectItem value="00">00</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="45">45</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={breakInPeriod} onValueChange={setBreakInPeriod}>
                      <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
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

                <div className="flex items-center gap-1">
                  <Select value={breakOutHour} onValueChange={setBreakOutHour}>
                    <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
                      <SelectValue placeholder="--" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      {Array.from({length: 12}, (_, i) => i + 1).map(hour => (
                        <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span>:</span>
                  <Select value={breakOutMinute} onValueChange={setBreakOutMinute}>
                    <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
                      <SelectValue placeholder="--" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      <SelectItem value="00">00</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="45">45</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={breakOutPeriod} onValueChange={setBreakOutPeriod}>
                    <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

                {/* Quick Fill Buttons - Updated */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Quick:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuickTime('6', 'AM', '2', 'PM')}
                    className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
                  >
                    6-2
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuickTime('7', 'AM', '3', 'PM')}
                    className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
                  >
                    7-3
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuickTime('8', 'AM', '4', 'PM')}
                    className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
                  >
                    8-4
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuickTime('9', 'AM', '5', 'PM')}
                    className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
                  >
                    9-5
                  </Button>
                </div>
              </div>

              {/* Third Row - Total Hours, Notes and Submit */}
              <div className="flex items-center gap-4 flex-wrap">
                {/* Total Hours Display */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded px-4 py-2">
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Total Hours: 8.0</span>
                </div>

                <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[45px]">Notes:</span>
                  <Input
                    placeholder="Add any notes here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="flex-1 max-w-md border-slate-300 dark:border-slate-600"
                  />
                </div>

                <Button variant="outline" className="border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-6">
                  Save Draft
                </Button>

                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                  Submit
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeEntryTimeInOut;
