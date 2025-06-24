
import React, { useState } from 'react';
import { TimesheetLayout } from '@/components/Timesheet/TimesheetLayout';
import { TimesheetSidebar } from '@/components/Timesheet/TimesheetSidebar';
import { ComprehensiveTimeEntryForm } from '@/components/Timesheet/ComprehensiveTimeEntryForm';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Timesheet = () => {
  const { hasRole, UserRole } = useAuth();
  const [managerMode, setManagerMode] = useState(false);

  const weekSummary = {
    totalHours: 32.5,
    regularHours: 30.0,
    overtimeHours: 2.5,
    projects: 3,
    daysWorked: 4,
    progress: 81.25,
    dailyTotals: {
      'sunday': 0,
      'monday': 8,
      'tuesday': 8,
      'wednesday': 8,
      'thursday': 8,
      'friday': 0.5,
      'saturday': 0
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'last-entry':
        toast.info('Loading last entry...');
        break;
      case 'copy-last-week':
        toast.info('Copying last week entries...');
        break;
      case 'use-template':
        toast.info('Loading templates...');
        break;
      case 'export-csv':
        toast.info('Exporting CSV...');
        break;
      default:
        toast.info(`Quick action: ${action}`);
    }
  };

  const handleSubmitWeek = () => {
    toast.success('Week submitted for approval!');
  };

  const handleToggleManagerMode = () => {
    setManagerMode(!managerMode);
    toast.info(managerMode ? 'Manager mode disabled' : 'Manager mode enabled');
  };

  const handleTimeEntrySubmit = (data: any) => {
    console.log('Time entry submitted:', data);
    toast.success('Time entry submitted successfully!');
  };

  const isManager = hasRole([UserRole.MANAGER, UserRole.ADMIN]);

  return (
    <TimesheetLayout 
      showManagerAlert={isManager}
      onToggleManagerMode={handleToggleManagerMode}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Form Area */}
        <div className="lg:col-span-3">
          <ComprehensiveTimeEntryForm 
            onSubmit={handleTimeEntrySubmit}
            managerMode={managerMode && isManager}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <TimesheetSidebar
            weekSummary={weekSummary}
            onQuickAction={handleQuickAction}
            onSubmitWeek={handleSubmitWeek}
          />
        </div>
      </div>
    </TimesheetLayout>
  );
};

export default Timesheet;
