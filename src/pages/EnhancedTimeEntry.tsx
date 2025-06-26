import React from 'react';
import EnhancedTimeEntry from '@/components/TimeEntry/EnhancedTimeEntry';

const EnhancedTimeEntryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Time Entry System
        </h1>
        <EnhancedTimeEntry />
      </div>
    </div>
  );
};

export default EnhancedTimeEntryPage;
