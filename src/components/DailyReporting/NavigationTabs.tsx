
import React from 'react';

const NavigationTabs: React.FC = () => {
  return (
    <div className="bg-orange-500 text-white px-6 py-4 rounded-t-lg">
      <div className="flex space-x-8">
        <span className="font-medium cursor-pointer hover:text-orange-100 transition-colors">
          DR Log
        </span>
        <span className="cursor-pointer opacity-75 hover:opacity-100 hover:text-orange-100 transition-all">
          Labor Unit Productivity
        </span>
        <span className="cursor-pointer opacity-75 hover:opacity-100 hover:text-orange-100 transition-all">
          Equipment Usage Summary
        </span>
        <span className="cursor-pointer opacity-75 hover:opacity-100 hover:text-orange-100 transition-all">
          Hours Lost Summary
        </span>
      </div>
    </div>
  );
};

export default NavigationTabs;
