
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Building2, ChevronLeft } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/time-entry" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ChevronLeft className="h-4 w-4" />
          <span>Timesheets</span>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Time Entry
          </h1>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="time-in-out" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="enter-hours" asChild>
                <Link to="/time-entry/standard">Enter Hours</Link>
              </TabsTrigger>
              <TabsTrigger value="time-in-out" className="text-yellow-600">Time In/Out</TabsTrigger>
            </TabsList>
            
            <TabsContent value="time-in-out" className="space-y-6 mt-6">
              {/* First Row - Project Details */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 min-w-[60px]">Project:</span>
                  <Input
                    placeholder="Select project..."
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-48"
                  />
                </div>

                <div className="h-6 w-px bg-gray-300"></div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-yellow-500 rounded flex items-center justify-center">
                    <span className="text-yellow-500 text-xs font-bold">C</span>
                  </div>
                  <span className="text-sm text-gray-600 min-w-[80px]">Cost Code:</span>
                  <Input
                    placeholder="Select code..."
                    value={selectedCostCode}
                    onChange={(e) => setSelectedCostCode(e.target.value)}
                    className="w-48"
                  />
                </div>

                <div className="h-6 w-px bg-gray-300"></div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 min-w-[40px]">Date:</span>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-36"
                  />
                </div>

                <div className="h-6 w-px bg-gray-300"></div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 min-w-[70px]">Employee:</span>
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select employee..." />
                    </SelectTrigger>
                    <SelectContent>
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
                  <span className="text-sm text-gray-600 min-w-[40px]">Start:</span>
                  <div className="flex items-center gap-1">
                    <Input
                      placeholder="--"
                      value={timeInHour}
                      onChange={(e) => setTimeInHour(e.target.value)}
                      className="w-12 text-center"
                    />
                    <span>:</span>
                    <Input
                      placeholder="--"
                      value={timeInMinute}
                      onChange={(e) => setTimeInMinute(e.target.value)}
                      className="w-12 text-center"
                    />
                    <Select value={timeInPeriod} onValueChange={setTimeInPeriod}>
                      <SelectTrigger className="w-16">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <span className="text-gray-400">-</span>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 min-w-[30px]">End:</span>
                  <div className="flex items-center gap-1">
                    <Input
                      placeholder="--"
                      value={timeOutHour}
                      onChange={(e) => setTimeOutHour(e.target.value)}
                      className="w-12 text-center"
                    />
                    <span>:</span>
                    <Input
                      placeholder="--"
                      value={timeOutMinute}
                      onChange={(e) => setTimeOutMinute(e.target.value)}
                      className="w-12 text-center"
                    />
                    <Select value={timeOutPeriod} onValueChange={setTimeOutPeriod}>
                      <SelectTrigger className="w-16">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="h-6 w-px bg-gray-300"></div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 min-w-[45px]">Break:</span>
                  <div className="flex items-center gap-1">
                    <Input
                      placeholder="--"
                      value={breakInHour}
                      onChange={(e) => setBreakInHour(e.target.value)}
                      className="w-12 text-center"
                    />
                    <span>:</span>
                    <Input
                      placeholder="--"
                      value={breakInMinute}
                      onChange={(e) => setBreakInMinute(e.target.value)}
                      className="w-12 text-center"
                    />
                    <Select value={breakInPeriod} onValueChange={setBreakInPeriod}>
                      <SelectTrigger className="w-16">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <span className="text-gray-400">-</span>

                <div className="flex items-center gap-1">
                  <Input
                    placeholder="--"
                    value={breakOutHour}
                    onChange={(e) => setBreakOutHour(e.target.value)}
                    className="w-12 text-center"
                  />
                  <span>:</span>
                  <Input
                    placeholder="--"
                    value={breakOutMinute}
                    onChange={(e) => setBreakOutMinute(e.target.value)}
                    className="w-12 text-center"
                  />
                  <Select value={breakOutPeriod} onValueChange={setBreakOutPeriod}>
                    <SelectTrigger className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Third Row - Total Hours, Notes and Submit */}
              <div className="flex items-center gap-4 flex-wrap">
                {/* Total Hours Display */}
                <div className="bg-blue-50 border border-blue-200 rounded px-4 py-2">
                  <span className="text-sm font-medium text-blue-800">Total Hours: 8.0</span>
                </div>

                <div className="h-6 w-px bg-gray-300"></div>

                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm text-gray-600 min-w-[45px]">Notes:</span>
                  <Input
                    placeholder="Add any notes here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="flex-1 max-w-md"
                  />
                </div>

                <Button className="bg-green-500 hover:bg-green-600 text-white px-8">
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
