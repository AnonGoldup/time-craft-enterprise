
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Employee } from '@/services/api';
import { FormData } from './types';

interface BasicInfoSectionProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  employees: Employee[];
  loadingEmployees: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  setFormData,
  employees,
  loadingEmployees,
  isOpen,
  setIsOpen
}) => {
  // Generate time options in 15-minute intervals
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const ampm = hour < 12 ? 'AM' : 'PM';
        const timeString = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center justify-between">
              <CardTitle>Daily Report Information</CardTitle>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Custom Number:</label>
                <Input
                  value={formData.customNumber}
                  onChange={(e) => setFormData({...formData, customNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Report From:</label>
                <Select 
                  value={formData.reportFrom} 
                  onValueChange={(value) => setFormData({...formData, reportFrom: value})}
                  disabled={loadingEmployees}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingEmployees ? "Loading employees..." : "Select an employee contact"} />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem 
                        key={employee.employeeID} 
                        value={`${employee.department} — ${employee.lastName}, ${employee.firstName}`}
                      >
                        {employee.department} — {employee.lastName}, {employee.firstName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Date:</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">Weather:</label>
                <Select value={formData.weather} onValueChange={(value) => setFormData({...formData, weather: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cloudy">Cloudy</SelectItem>
                    <SelectItem value="Sunny">Sunny</SelectItem>
                    <SelectItem value="Rainy">Rainy</SelectItem>
                    <SelectItem value="Snowy">Snowy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Wind:</label>
                <Select value={formData.wind} onValueChange={(value) => setFormData({...formData, wind: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Light Breeze">Light Breeze</SelectItem>
                    <SelectItem value="Calm">Calm</SelectItem>
                    <SelectItem value="Windy">Windy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Temperature:</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={formData.temperature}
                    onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                  />
                  <span className="text-sm">°C</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Total Workers:</label>
                <Input
                  type="number"
                  value={formData.totalWorkers}
                  onChange={(e) => setFormData({...formData, totalWorkers: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Time On Site:</label>
                <Select value={formData.timeOnSite} onValueChange={(value) => setFormData({...formData, timeOnSite: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Time Off Site:</label>
                <Select value={formData.timeOffSite} onValueChange={(value) => setFormData({...formData, timeOffSite: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default BasicInfoSection;
