
import React from 'react';

interface TimesheetLayoutProps {
  children: React.ReactNode;
}

export const TimesheetLayout: React.FC<TimesheetLayoutProps> = ({
  children
}) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Timesheet Entry
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Enter your daily time and track project hours
        </p>
      </div>
      
      {children}
    </div>
  );
};
