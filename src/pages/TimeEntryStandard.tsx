
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Building2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const TimeEntryStandard = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCostCode, setSelectedCostCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [standardHours, setStandardHours] = useState('');
  const [overtimeHours, setOvertimeHours] = useState('');
  const [notes, setNotes] = useState('');

  const setQuickHours = (hours: number) => {
    setStandardHours(hours.toString());
  };

  const totalHours = (parseFloat(standardHours) || 0) + (parseFloat(overtimeHours) || 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Time Entry
          </h1>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="enter-hours" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="enter-hours" className="text-yellow-600">Enter Hours</TabsTrigger>
              <TabsTrigger value="time-in-out" asChild>
                <Link to="/time-entry/time-in-out">Time In/Out</Link>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="enter-hours" className="space-y-6 mt-6">
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
                  <Select value={selectedCostCode} onValueChange={setSelectedCostCode}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select code..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="labor">Labor</SelectItem>
                      <SelectItem value="materials">Materials</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
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

              {/* Second Row - Hours Entry */}
              <div className="flex items-center gap-4 flex-wrap">
                {/* Standard Hours */}
                <div className="flex items-center gap-2">
                  <div className="bg-green-50 border border-green-200 rounded px-4 py-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">ST:</span>
                    <Input
                      type="number"
                      step="0.25"
                      min="0"
                      max="24"
                      value={standardHours}
                      onChange={(e) => setStandardHours(e.target.value)}
                      className="w-16 text-center border-green-300"
                      placeholder="8.0"
                    />
                    <span className="text-sm text-green-600">hrs</span>
                  </div>
                </div>

                {/* Overtime Hours */}
                <div className="flex items-center gap-2">
                  <div className="bg-orange-50 border border-orange-200 rounded px-4 py-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-800 font-medium">OT:</span>
                    <Input
                      type="number"
                      step="0.25"
                      min="0"
                      max="24"
                      value={overtimeHours}
                      onChange={(e) => setOvertimeHours(e.target.value)}
                      className="w-16 text-center border-orange-300"
                      placeholder="0.0"
                    />
                    <span className="text-sm text-orange-600">hrs</span>
                  </div>
                </div>

                {/* Total Hours Display */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded px-4 py-2">
                  <span className="text-sm font-medium text-blue-800">Total: {totalHours.toFixed(1)}h</span>
                </div>

                <div className="h-6 w-px bg-gray-300"></div>

                {/* Quick Fill Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Quick:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuickHours(4)}
                    className="h-8 px-3 text-xs"
                  >
                    4h
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuickHours(8)}
                    className="h-8 px-3 text-xs"
                  >
                    8h
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuickHours(10)}
                    className="h-8 px-3 text-xs"
                  >
                    10h
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuickHours(12)}
                    className="h-8 px-3 text-xs"
                  >
                    12h
                  </Button>
                </div>
              </div>

              {/* Third Row - Notes and Submit */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm text-gray-600 min-w-[45px]">Notes:</span>
                  <Input
                    placeholder="Add any notes or details about the work performed..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="flex-1 max-w-2xl"
                  />
                </div>

                <Button variant="outline" className="px-6">
                  Save Draft
                </Button>

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

export default TimeEntryStandard;
