
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const MilestoneSection: React.FC = () => {
  return (
    <div className="space-y-4 border-t pt-6">
      <h3 className="text-lg font-medium text-blue-600">Milestone</h3>
      <div className="flex items-center justify-between">
        <Label className="text-red-500">Search by phase:</Label>
        <RadioGroup defaultValue="yes">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="search-phase-yes" />
            <Label htmlFor="search-phase-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="search-phase-no" />
            <Label htmlFor="search-phase-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
