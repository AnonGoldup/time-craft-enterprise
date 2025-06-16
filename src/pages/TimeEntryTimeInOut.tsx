
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Building2, Clock, ChevronLeft } from 'lucide-react';
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
            Enter time form
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
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-yellow-500" />
                  <Input
                    placeholder="Search Project..."
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 border-2 border-yellow-500 rounded flex items-center justify-center">
                    <span className="text-yellow-500 text-xs font-bold">C</span>
                  </div>
                  <Input
                    placeholder="Search Cost Codes..."
                    value={selectedCostCode}
                    onChange={(e) => setSelectedCostCode(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-yellow-500" />
                  <Input
                    placeholder="Choose a date(s)"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-yellow-500" />
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Search employees..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john-doe">John Doe</SelectItem>
                      <SelectItem value="jane-smith">Jane Smith</SelectItem>
                      <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-center mb-4">Time</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2 text-center">IN</div>
                        <div className="flex items-center gap-2 justify-center">
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

                      <div>
                        <div className="text-sm text-gray-600 mb-2 text-center">OUT</div>
                        <div className="flex items-center gap-2 justify-center">
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
                    </div>

                    <Clock className="h-6 w-6 text-yellow-500 mx-auto mt-4" />
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-center mb-4">Break</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2 text-center">IN</div>
                        <div className="flex items-center gap-2 justify-center">
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

                      <div>
                        <div className="text-sm text-gray-600 mb-2 text-center">OUT</div>
                        <div className="flex items-center gap-2 justify-center">
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
                    </div>

                    <Clock className="h-6 w-6 text-yellow-500 mx-auto mt-4" />
                  </div>
                </div>

                <div>
                  <Textarea
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8">
                    Create time entries
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeEntryTimeInOut;
