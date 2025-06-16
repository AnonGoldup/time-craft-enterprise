
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Building2, Clock } from 'lucide-react';

const TimeEntryStandard = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCostCode, setSelectedCostCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [standardHours, setStandardHours] = useState('');
  const [overtimeHours, setOvertimeHours] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Enter time form
          </h1>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="enter-hours" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="enter-hours" className="text-yellow-600">Enter Hours</TabsTrigger>
              <TabsTrigger value="time-in-out">Time In/Out</TabsTrigger>
            </TabsList>
            
            <TabsContent value="enter-hours" className="space-y-6 mt-6">
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
                  <Select value={selectedCostCode} onValueChange={setSelectedCostCode}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Search Cost Codes..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="labor">Labor</SelectItem>
                      <SelectItem value="materials">Materials</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-yellow-500" />
                  <Input
                    type="date"
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-gray-400 text-sm mb-2">ST</div>
                    <div className="text-4xl font-bold text-gray-300 mb-4">ST</div>
                    <Clock className="h-6 w-6 text-yellow-500 mx-auto mb-4" />
                    <Input
                      type="number"
                      placeholder="0"
                      value={standardHours}
                      onChange={(e) => setStandardHours(e.target.value)}
                      className="text-center text-lg font-semibold"
                    />
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-gray-400 text-sm mb-2">OT</div>
                    <div className="text-4xl font-bold text-gray-300 mb-4">OT</div>
                    <Clock className="h-6 w-6 text-yellow-500 mx-auto mb-4" />
                    <Input
                      type="number"
                      placeholder="0"
                      value={overtimeHours}
                      onChange={(e) => setOvertimeHours(e.target.value)}
                      className="text-center text-lg font-semibold"
                    />
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

export default TimeEntryStandard;
