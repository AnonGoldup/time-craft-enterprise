
import React from 'react';

const NavigationTabs: React.FC = () => {
  return (
    <div className="bg-primary text-primary-foreground px-6 py-4 rounded-t-lg">
      <div className="flex space-x-8">
        <span className="font-medium cursor-pointer hover:opacity-80 transition-opacity">
          DR Log
        </span>
        <span className="cursor-pointer opacity-75 hover:opacity-100 transition-opacity">
          Labor Unit Productivity
        </span>
        <span className="cursor-pointer opacity-75 hover:opacity-100 transition-opacity">
          Equipment Usage Summary
        </span>
        <span className="cursor-pointer opacity-75 hover:opacity-100 transition-opacity">
          Hours Lost Summary
        </span>
      </div>
    </div>
  );
};

export default NavigationTabs;
