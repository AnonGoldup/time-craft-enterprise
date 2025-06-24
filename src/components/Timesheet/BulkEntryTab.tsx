import React, { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Building, Hash, Plus, Trash2, FileSpreadsheet } from 'lucide-react';
import MultiDatePicker from '@/components/TimeEntry/MultiDatePicker';
import EmployeeSelector from '@/components/TimeEntry/EmployeeSelector';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Employee } from '@/services/api';

interface BulkEntryTabProps {
  onSubmit: (entries: any[]) => void;
}

export const BulkEntryTab: React.FC<BulkEntryTabProps> = ({ onSubmit }) => {
  const { user, hasRole, UserRole } = useAuth();
  const isManager = hasRole([UserRole.MANAGER, UserRole.ADMIN]);
  
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [bulkData, setBulkData] = useState({
    projectCode: '',
    extraValue: 'Default',
    costCode: '',
    standardHours: 8,
    overtimeHours: 0,
    notes: ''
  });

  // Complete mock employees data matching Employee interface
  const mockEmployees: Employee[] = [
    {
      employeeID: 'EMP001',
      firstName: 'John',
      lastName: 'Smith',
      fullName: 'John Smith',
      email: 'john.smith@company.com',
      class: 'Foreman',
      department: 'Construction',
      unionID: 1,
      activeEmp: true,
      createdDate: '2024-01-01T00:00:00Z',
      modifiedDate: '2024-01-01T00:00:00Z'
    },
    {
      employeeID: 'EMP002',
      firstName: 'Mary',
      lastName: 'Jones',
      fullName: 'Mary Jones',
      email: 'mary.jones@company.com',
      class: 'Journeyman',
      department: 'Construction',
      unionID: 1,
      activeEmp: true,
      createdDate: '2024-01-01T00:00:00Z',
      modifiedDate: '2024-01-01T00:00:00Z'
    },
    {
      employeeID: 'EMP003',
      firstName: 'Bob',
      lastName: 'Wilson',
      fullName: 'Bob Wilson',
      email: 'bob.wilson@company.com',
      class: 'Apprentice',
      department: 'Construction',
      unionID: 1,
      activeEmp: true,
      createdDate: '2024-01-01T00:00:00Z',
      modifiedDate: '2024-01-01T00:00:00Z'
    }
  ];

  const totalEntries = selectedDates.length * (isManager ? selectedEmployees.length : 1);

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isManager) {
      toast.error('Bulk entry is only available for managers');
      return;
    }

    if (selectedDates.length === 0) {
      toast.error('Please select at least one date');
      return;
    }

    if (selectedEmployees.length === 0) {
      toast.error('Please select at least one employee');
      return;
    }

    if (!bulkData.projectCode || !bulkData.costCode) {
      toast.error('Please select project and cost code');
      return;
    }

    const entries: any[] = [];
    selectedDates.forEach(date => {
      selectedEmployees.forEach(employeeId => {
        entries.push({
          employeeId,
          dateWorked: date.toISOString().split('T')[0],
          projectCode: bulkData.projectCode,
          extraValue: bulkData.extraValue,
          costCode: bulkData.costCode,
          standardHours: bulkData.standardHours,
          overtimeHours: bulkData.overtimeHours,
          notes: bulkData.notes
        });
      });
    });

    onSubmit(entries);
    toast.success(`${entries.length} bulk entries created successfully!`);
    
    // Reset form
    setSelectedDates([]);
    setSelectedEmployees([]);
    setBulkData({
      projectCode: '',
      extraValue: 'Default',
      costCode: '',
      standardHours: 8,
      overtimeHours: 0,
      notes: ''
    });
  };

  if (!isManager) {
    return (
      <CardContent className="p-6">
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Manager Access Required</h3>
          <p className="text-gray-600">
            Bulk entry functionality is only available for managers and administrators.
          </p>
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FileSpreadsheet className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Bulk Entry</h3>
          {totalEntries > 0 && (
            <Badge variant="secondary">
              {totalEntries} entries will be created
            </Badge>
          )}
        </div>
      </div>

      <form onSubmit={handleBulkSubmit} className="space-y-6">
        {/* Employee Selection */}
        <div>
          <Label className="flex items-center space-x-1 mb-2">
            <Users className="w-4 h-4" />
            <span>Employees *</span>
          </Label>
          <EmployeeSelector
            selectedEmployee=""
            setSelectedEmployee={() => {}}
            selectedEmployees={selectedEmployees}
            setSelectedEmployees={setSelectedEmployees}
            employees={mockEmployees}
          />
        </div>

        {/* Date Selection */}
        <div>
          <Label className="flex items-center space-x-1 mb-2">
            <Calendar className="w-4 h-4" />
            <span>Dates *</span>
          </Label>
          <MultiDatePicker
            selectedDates={selectedDates}
            onDatesChange={setSelectedDates}
          />
        </div>

        {/* Project Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="flex items-center space-x-1">
              <Building className="w-4 h-4" />
              <span>Project *</span>
            </Label>
            <Select 
              value={bulkData.projectCode} 
              onValueChange={(value) => setBulkData({...bulkData, projectCode: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="21-0066">21-0066 - Edmonton EXPO SOLAR IPD</SelectItem>
                <SelectItem value="22-0006">22-0006 - AltaPro Service Department</SelectItem>
                <SelectItem value="23-0004">23-0004 - Office and Shop OH</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Extra</Label>
            <Select 
              value={bulkData.extraValue} 
              onValueChange={(value) => setBulkData({...bulkData, extraValue: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default">Default</SelectItem>
                <SelectItem value="005">005 - Phase 1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cost Code */}
        <div>
          <Label className="flex items-center space-x-1">
            <Hash className="w-4 h-4" />
            <span>Cost Code *</span>
          </Label>
          <Select 
            value={bulkData.costCode} 
            onValueChange={(value) => setBulkData({...bulkData, costCode: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Cost Code" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="001-040-043">001-040-043 - Direct Labor</SelectItem>
              <SelectItem value="002-050-053">002-050-053 - Equipment Operation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Standard Hours</Label>
            <Input
              type="number"
              step="0.25"
              min="0"
              max="16"
              value={bulkData.standardHours}
              onChange={(e) => setBulkData({...bulkData, standardHours: parseFloat(e.target.value) || 0})}
            />
          </div>
          <div>
            <Label>Overtime Hours</Label>
            <Input
              type="number"
              step="0.25"
              min="0"
              max="16"
              value={bulkData.overtimeHours}
              onChange={(e) => setBulkData({...bulkData, overtimeHours: parseFloat(e.target.value) || 0})}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label>Notes</Label>
          <Textarea
            rows={3}
            placeholder="Enter notes that will apply to all entries..."
            value={bulkData.notes}
            onChange={(e) => setBulkData({...bulkData, notes: e.target.value})}
          />
        </div>

        <Button type="submit" className="w-full" disabled={totalEntries === 0}>
          Create {totalEntries === 0 ? 'Bulk' : totalEntries} Entr{totalEntries === 1 ? 'y' : 'ies'}
        </Button>
      </form>
    </CardContent>
  );
};
