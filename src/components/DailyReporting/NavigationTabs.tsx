
import React from 'react';

const NavigationTabs: React.FC = () => {
  return (
    <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg">
      <div className="flex space-x-6">
        <span className="font-medium cursor-pointer">DR Log</span>
        <span className="cursor-pointer opacity-75 hover:opacity-100">Labor Unit Productivity</span>
        <span className="cursor-pointer opacity-75 hover:opacity-100">Equipment Usage Summary</span>
        <span className="cursor-pointer opacity-75 hover:opacity-100">Hours Lost Summary</span>
      </div>
    </div>
  );
};

export default NavigationTabs;
